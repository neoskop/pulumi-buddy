import Axios from 'axios';
import * as cheerio from 'cheerio';
import { Observable, from } from 'rxjs';
import { switchMap, mergeMap, toArray } from 'rxjs/operators';

export type ParamaterTypeScalar = { scalar: 'String' | 'Number' | 'Boolean'; isArray?: boolean };
export type ParamaterTypeText = { text: string[]; isArray?: boolean; default?: string };
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
    static readonly DEFAULT_BASE_URL = 'https://buddy.works';

    protected defaultParameters?: ActionParameter[];

    readonly warnings: string[] = [];
    readonly errors: string[] = [];

    constructor(
        protected readonly options: {
            baseUrl?: string;
            patchAction?(action: Readonly<Action>): Action | void;
            patchParameter?(actionName: string, parameter: Readonly<ActionParameter>): ActionParameter | void;
        } = {}
    ) {}

    protected patchAction(action: Readonly<Action>): Action {
        if (this.options.patchAction) {
            const result = this.options.patchAction(action);

            if (result) {
                const diff = this.diff(action, result);

                if (diff.length) {
                    this.warnings.push(`Patch actions "${action.name}" (${diff.join(',')})"`);

                    return result;
                }
            }
        }
        return action;
    }

    protected patchParameter(actionName: string, parameter: Readonly<ActionParameter>): ActionParameter {
        if (this.options.patchParameter) {
            const result = this.options.patchParameter(actionName, parameter);

            if (result) {
                const diff = this.diff(parameter, result);

                if (diff.length) {
                    this.warnings.push(`Patch parameter "${parameter.name}" for action "${actionName}" (${diff.join(',')})"`);

                    return result;
                }
            }
        }
        return parameter;
    }

    protected diff<T extends Action | ActionParameter>(olds: T, news: T): string[] {
        const changes: string[] = [];

        const oldKeys = Object.keys(olds) as (keyof T)[];
        const newKeys = Object.keys(news) as (keyof T)[];

        for (const key of oldKeys) {
            if (undefined === news[key]) {
                changes.push(`-${key}`);
            }
            if ('parameters' !== key && JSON.stringify(olds[key]) !== JSON.stringify(news[key])) {
                changes.push(`~${key}`);
            }
        }

        for (const key of newKeys) {
            if (undefined === olds[key]) {
                changes.push(`+${key}`);
            }
        }

        if ('parameters' in olds) {
            for (const oldParam of (olds as Action).parameters) {
                const newParam = (news as Action).parameters.find(p => p.name === oldParam.name);

                if (!newParam) {
                    changes.push(`-parameters[${oldParam.name}]`);
                } else if (JSON.stringify(oldParam) !== JSON.stringify(newParam)) {
                    changes.push(`~parameters[${oldParam.name}]`);
                }
            }

            for (const newParam of (news as Action).parameters) {
                const oldParam = (olds as Action).parameters.find(p => p.name === newParam.name);
                if (!oldParam) {
                    changes.push(`+parameters[${newParam.name}]`);
                }
            }
        }

        return changes;
    }

    async getActionDetailUrls(): Promise<string[]> {
        const response = await Axios.get<string>(`${this.options?.baseUrl || BuddyScraper.DEFAULT_BASE_URL}${BuddyScraper.ROOT_PAGE}`);
        const $ = cheerio.load(response.data);
        return $('li.list__card-element a')
            .toArray()
            .map(el => this.options?.baseUrl || BuddyScraper.DEFAULT_BASE_URL + $(el).attr('href')!.toString());
    }

    parseType(name: string, type: string, description: string): ParameterType {
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
            const oneOf = /Can be one of ([\w-]+(?: \(default\))?(?:\s?,\s?[\w-]+)* or [\w-]+(?: \(default\))?)/.exec(description);
            if ('String' === type && exact) {
                return { text: [exact[1]!], isArray };
            } else if ('String' === type && oneOf) {
                let defaultValue: string | undefined;
                const text = oneOf[1].split(/\s*(?:,|or)\s*/).map(t => {
                    if (t.endsWith(' (default)')) {
                        t = t.substr(0, t.length - 10);
                        defaultValue = t;
                    }
                    return t;
                });
                return { text, isArray, default: defaultValue };
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

    parseParameter(tr: CheerioElement): ActionParameter {
        const $ = cheerio.load(tr);
        const tds = $('td').toArray();
        const required = $(tds[0]).text().includes('Required');
        $(tds[0]).children().remove();
        const name = $(tds[0]).text().replace(/[^\w]/g, '');
        return {
            name,
            required,
            type: this.parseType(name, $(tds[1]).text().trim(), $(tds[2]).text()),
            description: $(tds[2])
                .clone()
                .find('code')
                .each((_, e) => $(e).replaceWith(`\`${$(e).text()}\``))
                .end()
                .text()
        };
    }

    async getDefaultParameters(): Promise<ActionParameter[]> {
        if (!this.defaultParameters) {
            const response = await Axios.get(`${this.options?.baseUrl || BuddyScraper.DEFAULT_BASE_URL}${BuddyScraper.ROOT_PAGE}`);
            const $ = cheerio.load(response.data);
            this.defaultParameters = $(`article.post-content > table:nth-of-type(2) tr:has(> td)`)
                .toArray()
                .map(p => this.parseParameter(p));
        }

        return this.defaultParameters;
    }

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
            })
            .map(action => {
                return this.patchParameter(actionName, action) || action;
            });
    }

    async getActionDetails(url: string): Promise<Action> {
        const response = await Axios.get(url);
        const $ = cheerio.load(response.data);
        const name = $('h1').text();
        const parameters = $('article.post-content > table:nth-of-type(1) tr:has(> td)')
            .toArray()
            .map(p => this.parseParameter(p));
        const type = (parameters.find(p => p.name === 'type')!.type as ParamaterTypeText).text[0];
        const action = { name, type, parameters: this.mergeParameters(name, await this.getDefaultParameters(), parameters) };

        return this.patchAction(action) || action;
    }

    getActions(): Promise<Action[]> {
        return this.getActionsAsStream().pipe(toArray()).toPromise();
    }

    getActionsAsStream(): Observable<Action> {
        return from(this.getActionDetailUrls()).pipe(
            switchMap(urls => from(urls)),
            mergeMap(url => from(this.getActionDetails(url)), 4)
        );
    }
}
