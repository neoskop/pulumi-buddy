export namespace Tok {
    export interface Parsed {
        plugin: string;
        provider: string;
        method: string;
    }

    const URN_REGEXP = /^(.+):(.+):(.+)$/;

    export function parse(urn: string): Parsed {
        const match = URN_REGEXP.exec(urn);

        if(!match) {
            throw new InvalidTokError(urn);
        }

        return {
            plugin: match[1],
            provider: match[2],
            method: match[3]
        }
    }

    export class InvalidTokError extends Error {
        constructor(urn: string) {
            super(`Invalid tok '${urn}'`);
        }
    }
}