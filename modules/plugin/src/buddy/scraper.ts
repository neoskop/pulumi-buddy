import Axios from 'axios';
import * as cheerio from 'cheerio';

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

export class BuddyScraper {
    static readonly ROOT_PAGE = '/docs/api/pipelines/create-manage-actions/add-action';

    protected defaultParameters?: ActionParameter[];

    constructor(protected readonly baseUrl = 'https://buddy.works') {}

    async getActionDetailUrls(): Promise<string[]> {
        const response = await Axios.get<string>(`${this.baseUrl}${BuddyScraper.ROOT_PAGE}`);
        const $ = cheerio.load(response.data);
        return $('li.list__card-element a')
            .toArray()
            .map(el => this.baseUrl + $(el).attr('href')!.toString());
    }

    parseType(name: string, type: string, description: string): ParameterType {
        const isArray = type.endsWith('[]') || undefined;
        if(isArray) {
            type = type.substr(0, type.length - 2);
        }
        if('ISO-8601 UTC date' === type) {
            return { scalar: 'String' };
        } else if('Integer' === type || 'Float' === type) {
            return { scalar: 'Number', isArray };
        } else if ('String' === type || 'Boolean' === type) {
            const exact = /Should be set to ([\w-]+)/.exec(description);
            const oneOf = /Can be one of ([\w-]+(?:\s?,\s?[\w-]+)* or [\w-]+)/.exec(description);
            if ('String' === type && exact) {
                return { text: [ exact[1]! ], isArray };
            } else if ('String' === type && oneOf) {
                return { text: oneOf[1].split(/\s*(?:,|or)\s*/), isArray }
            } else {
                return { scalar: type, isArray };
            }
        } else if(type) {
            return { ref: type, isArray };
        } else {
            if('integration' === name) {
                return { ref: 'Integration' };
            }
            throw new Error(`Unkown parameter type '${type}' for '${name}'`)
        }
    }

    parseParameter(tr: CheerioElement): ActionParameter {
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
            type: this.parseType(name,
                $(tds[1])
                    .text()
                    .trim(),
                $(tds[2]).text()
            ),
            description: $(tds[2]).clone().find('code').each((_, e) => $(e).replaceWith(`\`${$(e).text()}\``)).end().text()
        };
    }

    async getDefaultParameters(): Promise<ActionParameter[]> {
        if(!this.defaultParameters) {
            const response = await Axios.get(`${this.baseUrl}${BuddyScraper.ROOT_PAGE}`);
            const $ = cheerio.load(response.data);
            this.defaultParameters = $(`article.post-content > table:nth-of-type(2) tr:has(> td)`)
                .toArray()
                .map(p => this.parseParameter(p));
        }

        return this.defaultParameters;
    }

    protected mergeParameters(defaults: ActionParameter[], params: ActionParameter[]): ActionParameter[] {
        const names = new Set(params.map(p => p.name));

        return [
            ...defaults.filter(d => !names.has(d.name)),
            ...params
        ].sort((a, b) => {
            if(a.required === b.required) {
                return a.name.localeCompare(b.name);
            }

            return a.required ? -1 : 1;
        }).filter((c, i, a) => a.findIndex(e => e.name === c.name) === i)
    }

    async getActionDetails(url: string): Promise<Action> {
        const response = await Axios.get(url);
        const $ = cheerio.load(response.data);
        const name = $('h1').text();
        const parameters = $('article.post-content > table:nth-of-type(1) tr:has(> td)')
            .toArray()
            .map(p => this.parseParameter(p));
        const type = (parameters.find(p => p.name === 'type')!.type as ParamaterTypeText).text[0];
        return { name, type, parameters: this.mergeParameters(await this.getDefaultParameters(), parameters) };
    }

    async getActions(): Promise<Action[]> {
        const urls = await this.getActionDetailUrls();

        return Promise.all(urls.map(url => this.getActionDetails(url)));
    }
}
