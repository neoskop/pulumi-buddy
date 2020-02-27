type NonUndefined<T> = T extends undefined ? never : T;

export type WithoutUndefined<T extends {}> = {
    [P in keyof T]-?: T[P] extends (infer C)[]
        ? WithoutUndefined<C>[]
        : T[P] extends string | number | boolean | null
        ? NonUndefined<T[P]>
        : WithoutUndefined<NonUndefined<T[P]>>;
};

export function deleteUndefined<T extends {}>(obj: T): WithoutUndefined<T> {
    const result: any = {};

    for (const key of Object.keys(obj) as (keyof T)[]) {
        const value = obj[key];
        if (undefined !== value) {
            if (Array.isArray(value)) {
                result[key] = value.map(deleteUndefined);
            } else if (null != value && typeof value === 'object') {
                result[key] = deleteUndefined(value);
            }
            result[key] = value;
        }
    }

    return result;
}
