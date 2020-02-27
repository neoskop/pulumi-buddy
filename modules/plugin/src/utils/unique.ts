export namespace Unique {

    export function name(prefix: string, suffixLength: number = 8) {
        let name = `${prefix}-`;

        while(suffixLength--) {
            name += (Math.random() * 36 | 0).toString(36);
        }

        return name;
    }
}