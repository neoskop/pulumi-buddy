export namespace Urn {
    export interface Parsed {
        domain: "pulumi";
        stackName: string;
        pluginName: string;
        typePrefix: string;
        typeGroup: string;
        typeInstance: string;
        name: string;
    }

    const URN_REGEXP = /^urn:pulumi:(.+)::(.+)::(.+):(.+):(.+)::(.+)$/;

    export function parse(urn: string): Parsed {
        const match = URN_REGEXP.exec(urn);

        if(!match) {
            throw new InvalidUrnError(urn);
        }

        return {
            domain: 'pulumi',
            stackName: match[1],
            pluginName: match[2],
            typePrefix: match[3],
            typeGroup: match[4],
            typeInstance: match[5],
            name: match[6],
        }
    }

    export class InvalidUrnError extends Error {
        constructor(urn: string) {
            super(`Invalid urn '${urn}'`);
        }
    }
}