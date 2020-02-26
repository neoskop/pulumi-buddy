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
    constructor(protected readonly baseUrl = 'https://buddy.works') {}

    async getActionDetailUrls(): Promise<string[]> {
        const response = await Axios.get<string>(`${this.baseUrl}/docs/api/pipelines/create-manage-actions/add-action`);
        const $ = cheerio.load(response.data);
        return $('li.list__card-element a')
            .toArray()
            .map(el => this.baseUrl + $(el).attr('href')!.toString());
    }

    parseType(type: string, description: string): ParameterType {
        const isArray = type.endsWith('[]') || undefined;
        if(isArray) {
            type = type.substr(0, type.length - 2);
        }
        if ('String' === type || 'Number' === type || 'Boolean' === type) {
            const exact = /Should be set to ([\w-]+)/.exec(description);
            const oneOf = /Can be one of ([\w-]+(?:\s?,\s?[\w-]+)* or [\w-]+)/.exec(description);
            if ('String' === type && exact) {
                return { text: [ exact[1]! ], isArray };
            } else if ('String' === type && oneOf) {
                return { text: oneOf[1].split(/\s*(?:,|or)\s*/), isArray }
            } else {
                return { scalar: type, isArray };
            }
        } else {
            return { ref: type, isArray };
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
            .trim();
        return {
            name,
            required,
            type: this.parseType(
                $(tds[1])
                    .text()
                    .trim(),
                $(tds[2]).text()
            ),
            description: $(tds[2]).clone().find('code').each((_, e) => $(e).replaceWith(`\`${$(e).text()}\``)).end().text()
        };
    }

    async getActionDetails(url: string): Promise<Action> {
        const response = await Axios.get(url);
        const $ = cheerio.load(response.data);
        const name = $('h1').text();
        const type = name.replace(/\s+/, '_').toUpperCase();
        const parameters = $('article.post-content > table tr:has(> td)')
            .toArray()
            .map(p => this.parseParameter(p));
        return { name, type, parameters };
    }

    async getActions(): Promise<Action[]> {
        const urls = await this.getActionDetailUrls();

        return Promise.all(urls.map(url => this.getActionDetails(url)));
    }
}
