import { Kind } from '@neoskop/pulumi-buddy';

export namespace Id {
    export function stringify(ids: [Kind, string][]): string {
        return ids.map(([ k, i ]) => `${k}:${i}`).join('/');
    }

    export function parse(id: string): [Kind, string][] {
        return id.split(/\//).map(pair => {
            return pair.split(/:/, 2) as [Kind, string];
        })
    }
}