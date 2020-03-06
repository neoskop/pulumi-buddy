import Axios from 'axios';
import * as cheerio from 'cheerio';
import { Observable, from, of } from 'rxjs';
import { switchMap, mergeMap, toArray } from 'rxjs/operators';
import { format } from 'util';

export type ParamaterTypeScalar = { scalar: 'String' | 'Number' | 'Boolean'; isArray?: boolean };
export type ParamaterTypeText = { text: string[]; isArray?: boolean };
export type ParameterTypeRef = { ref: string; isArray?: boolean };

export type ParameterType = ParamaterTypeScalar | ParamaterTypeText | ParameterTypeRef;

export interface ActionParameter {
    name: string;
    required: boolean;
    type: ParameterType;
    description: string;
}

export interface Action {
    name: string;
    type: string;
    parameters: ActionParameter[];
}

export class Scraper {
    protected commonParameters?: ActionParameter[];

    constructor(
        private readonly baseUrl: string,
        private readonly index: string,
        private readonly common: string,
        private readonly details: string
    ) {}

    async getActionList(): Promise<Action[]> {
        const response = await Axios.get<string>(`${this.baseUrl}${this.index}`);
        const $ = cheerio.load(response.data);
        return Promise.all(
            $('li.list__card-element a')
                .toArray()
                .map($)
                .map(el => this.getDetails(el.attr('href')!.toString()))
        );
    }

    async getCommonParameters(): Promise<ActionParameter[]> {
        if (!this.commonParameters) {
            const response = await Axios.get(`${this.baseUrl}${this.common}`);
            const $ = cheerio.load(response.data);
            this.commonParameters = $(`article.post-content > table:nth-of-type(2) tr:has(> td)`)
                .toArray()
                .map(parseParameter);
        }

        return this.commonParameters;
    }

    async getDetails(url: string): Promise<Action> {
        const response = await Axios.get(`${this.baseUrl}${url}`);
        const $ = cheerio.load(response.data);
        const name = $('h1').text().replace(/ with YAML$/i, '');
        const parameters = $('article.post-content > table:nth-of-type(1) tr:has(> td)')
            .toArray()
            .map(parseParameter);
        const type = (parameters.find(p => p.name === 'type')!.type as ParamaterTypeText).text[0];
        return { name, type, parameters };
    }
}

export class BuddyScraper {
    static readonly API_ROOT_PAGE = '/docs/api/pipelines/create-manage-actions/add-action';
    static readonly API_COMMON_PARAMETERS = '/docs/api/pipelines/create-manage-actions/add-action';
    static readonly API_ACTION_PAGE = '/docs/api/pipelines/create-manage-actions/add-action/%s';
    static readonly YAML_ROOT_PAGE = '/docs/yaml/yaml-actions';
    static readonly YAML_COMMON_PARAMETERS = '/docs/yaml/yaml-schema';
    static readonly YAML_ACTION_PAGE = '/docs/yaml/yaml-actions/%s';

    protected commonParameters?: ActionParameter[];

    readonly warnings: string[] = [];
    readonly errors: string[] = [];

    readonly apiScraper: Scraper;
    readonly yamlScraper: Scraper;

    constructor(protected readonly baseUrl = 'https://buddy.works') {
        this.apiScraper = new Scraper(
            baseUrl,
            BuddyScraper.API_ROOT_PAGE,
            BuddyScraper.API_COMMON_PARAMETERS,
            BuddyScraper.API_ACTION_PAGE
        );
        this.yamlScraper = new Scraper(
            baseUrl,
            BuddyScraper.YAML_ROOT_PAGE,
            BuddyScraper.YAML_COMMON_PARAMETERS,
            BuddyScraper.YAML_ACTION_PAGE
        );
    }

    // async getActionDetailUrls(): Promise<string[]> {
    //     const response = await Axios.get<string>(`${this.baseUrl}${BuddyScraper.API_ROOT_PAGE}`);
    //     const $ = cheerio.load(response.data);
    //     return $('li.list__card-element a')
    //         .toArray()
    //         .map(
    //             el =>
    //                 this.baseUrl +
    //                 $(el)
    //                     .attr('href')!
    //                     .toString()
    //         );
    // }

    // async getActionNames(): Promise<{ name: string; id: string }[]> {
    //     const response = await Axios.get<string>(`${this.baseUrl}${BuddyScraper.API_ROOT_PAGE}`);
    //     const $ = cheerio.load(response.data);
    //     return $('li.list__card-element a')
    //         .toArray()
    //         .map($)
    //         .map(el => ({
    //             name: el.text(),
    //             id: el
    //                 .attr('href')!
    //                 .toString()
    //                 .replace(/^.*\//, '')
    //         }));
    // }

    async getActionList() {
        const api = await this.apiScraper.getActionList();
        const yaml = await this.yamlScraper.getActionList();
        const result = new Map<string, Action>();

        for (const action of api) {
            const yamlAction = yaml.find(a => a.type === action.type);
            if (!yamlAction) {
                this.errors.push(`Cannot find action "${action.name}" with type "${action.type}" in YAML documentation.`);
            } else {
                if (yamlAction.name.toLowerCase() !== action.name.toLowerCase()) {
                    this.warnings.push(`Name missmatch between YAML "${yamlAction.name}" and API "${action.name}" action`);
                }
                result.set(action.type, {
                    name: action.name,
                    type: action.type,
                    parameters: this.compareAndMergeParameters(action.type, action.parameters, yamlAction.parameters)
                });
            }
        }

        for (const action of yaml) {
            const apiAction = yaml.find(a => a.type === action.type);
            if (!apiAction) {
                this.errors.push(`Cannot find action "${action.name}" with type "${action.type}" in API documentation.`);
            }
        }

        return result;
    }

    async getCommonParameters(): Promise<ActionParameter[]> {
        if (!this.commonParameters) {
            const api = await this.apiScraper.getCommonParameters();
            const yaml = await this.yamlScraper.getCommonParameters();

            this.commonParameters = this.compareAndMergeParameters('common', api, yaml);
        }

        return this.commonParameters;
    }

    protected compareAndMergeParameters(name: string, api: ActionParameter[], yaml: ActionParameter[]) {
        const result: ActionParameter[] = [];

        for (const param of api) {
            const yamlParam = yaml.find(p => p.name === param.name);
            if (!yamlParam) {
                this.errors.push(`Cannot find ${name} parameter "${param.name}" in YAML documentation.`);
            } else {
                // if(JSON.stringify(param) !== JSON.stringify(yamlParam)) {
                //     this.warnings.push(`Common parameter mismatch between YAML ${JSON.stringify(yamlParam)} and API ${JSON.stringify(param)}`)
                // }
            }
        }

        for (const param of yaml) {
            const apiParam = yaml.find(p => p.name === param.name);
            if (!apiParam) {
                this.errors.push(`Cannot find common parameter "${param.name}" in API documentation.`);
            }
        }

        return result;
    }

    // protected async getActionDetails(id: string): Promise<Action> {
    //     const api = await this.apiScraper.getDetails(id);
    //     const yaml = await this.yamlScraper.getDetails(id);

    //     return {
    //         name: api.name,
    //         type: api.type,
    //         parameters: this.mergeParameters(
    //             api.name,
    //             await this.getCommonParameters(),
    //             this.compareAndMergeParameters(api.type, api.parameters, yaml.parameters)
    //         )
    //     };
    // }

    protected async mergeWithCommonParameters(action: Action): Promise<Action> {
        return {
            ...action,
            parameters: this.mergeParameters(action.name, await this.getCommonParameters(), action.parameters)
        };
    }

    // async getDefaultParameters(): Promise<ActionParameter[]> {
    //     if (!this.defaultParameters) {
    //         const response = await Axios.get(`${this.baseUrl}${BuddyScraper.API_ROOT_PAGE}`);
    //         const $ = cheerio.load(response.data);
    //         this.defaultParameters = $(`article.post-content > table:nth-of-type(2) tr:has(> td)`)
    //             .toArray()
    //             .map(parseParameter);
    //     }

    //     return this.defaultParameters;
    // }

    protected mergeParameters(actionName: string, defaults: ActionParameter[], params: ActionParameter[]): ActionParameter[] {
        const names = new Set(params.map(p => p.name));

        return [...defaults.filter(d => !names.has(d.name)), ...params]
            .sort((a, b) => {
                if (a.required === b.required) {
                    return a.name.localeCompare(b.name);
                }

                return a.required ? -1 : 1;
            })
            .filter((c, i, a) => {
                const first = a.findIndex(e => e.name === c.name) === i;
                if (!first) {
                    this.warnings.push(`Duplicate parameter "${c.name}" in action "${actionName}"`);
                }

                return first;
            });
    }

    // async getActionDetails(url: string): Promise<Action> {
    //     const response = await Axios.get(url);
    //     const $ = cheerio.load(response.data);
    //     const name = $('h1').text();
    //     const parameters = $('article.post-content > table:nth-of-type(1) tr:has(> td)')
    //         .toArray()
    //         .map(parseParameter);
    //     const type = (parameters.find(p => p.name === 'type')!.type as ParamaterTypeText).text[0];
    //     return { name, type, parameters: this.mergeParameters(name, await this.getDefaultParameters(), parameters) };
    // }

    getActions(): Promise<Action[]> {
        return this.getActionsAsStream()
            .pipe(toArray())
            .toPromise();
    }

    getActionsAsStream(): Observable<Action> {
        return from(this.getActionList()).pipe(
            switchMap(list => from([...list.values()])),
            mergeMap(action => from(this.mergeWithCommonParameters(action)), 1)
        );
        // return from(this.getActionDetailUrls()).pipe(
        //     switchMap(urls => from(urls)),
        //     mergeMap(url => from(this.getActionDetails(url)), 1)
        // );

        // const urls = await this.getActionDetailUrls();

        // return Promise.all(urls.map(url => this.getActionDetails(url)));
    }
}

function parseType(name: string, type: string, description: string): ParameterType {
    const isArray = type.endsWith('[]') || undefined;
    if (isArray) {
        type = type.substr(0, type.length - 2);
    }
    if ('ISO-8601 UTC date' === type) {
        return { scalar: 'String' };
    } else if ('Integer' === type || 'Float' === type) {
        return { scalar: 'Number', isArray };
    } else if ('String' === type || 'Boolean' === type) {
        const exact = /Should be set to ([\w-]+)/.exec(description);
        const oneOf = /Can be one of ([\w-]+(?:\s?,\s?[\w-]+)* or [\w-]+)/.exec(description);
        if ('String' === type && exact) {
            return { text: [exact[1]!], isArray };
        } else if ('String' === type && oneOf) {
            return { text: oneOf[1].split(/\s*(?:,|or)\s*/), isArray };
        } else {
            return { scalar: type, isArray };
        }
    } else if (type) {
        return { ref: type, isArray };
    } else {
        if ('integration' === name) {
            return { ref: 'Integration' };
        }
        throw new Error(`Unkown parameter type '${type}' for '${name}'`);
    }
}

function parseParameter(tr: CheerioElement): ActionParameter {
    const $ = cheerio.load(tr);
    const tds = $('td').toArray();
    const required = $(tds[0])
        .text()
        .includes('Required');
    $(tds[0])
        .children()
        .remove();
    const name = $(tds[0])
        .text()
        .replace(/[^\w]/g, '');
    return {
        name,
        required,
        type: parseType(
            name,
            $(tds[1])
                .text()
                .trim(),
            $(tds[2]).text()
        ),
        description: $(tds[2])
            .clone()
            .find('code')
            .each((_, e) => $(e).replaceWith(`\`${$(e).text()}\``))
            .end()
            .text()
    };
}
