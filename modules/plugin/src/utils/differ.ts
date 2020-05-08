import { DiffResponse, PropertyDiff } from '@pulumi-utils/grpc';

export class Differ<T, P> {
    protected readonly response = new DiffResponse();

    protected hasChanged = false;

    constructor(protected readonly olds: T, protected readonly news: T, protected readonly props: P) {}

    setDeleteBeforeReplace(value: boolean): this {
        this.response.setDeletebeforereplace(value);
        return this;
    }

    diff<
        K1 extends keyof T,
        K2 extends keyof T[K1],
        K3 extends keyof T[K1][K2],
        PK1 extends keyof P,
        PK2 extends keyof P[PK1],
        PK3 extends keyof P[PK1][PK2]
    >(
        key: K1 | [K1] | [K1, K2] | [K1, K2, K3],
        propKey?: PK1 | [PK1] | [PK1, PK2] | [PK1, PK2, PK3] | null,
        triggerReplacement?: boolean
    ): this;
    diff<K1 extends keyof T, K2 extends keyof T[K1], K3 extends keyof T[K1][K2]>(
        key: string | string[],
        propKey?: string | string[] | null,
        triggerReplacement?: boolean
    ): this {
        if (!Array.isArray(key)) {
            key = [key];
        }
        if (propKey != null && !Array.isArray(propKey)) {
            propKey = [propKey];
        }

        const oldValue = JSON.stringify(this.resolveValue(this.olds, key));
        const newValue = JSON.stringify(this.resolveValue(this.news, key));
        const propValue = propKey ? JSON.stringify(this.resolveValue(this.props, propKey)) : undefined;
        if (oldValue !== newValue) {
            this.addDiff(oldValue, newValue, key[0], !!triggerReplacement, true);
        } else if (propKey && propValue != null && newValue != null && newValue !== propValue) {
            this.addDiff(propValue, newValue, key[0], !!triggerReplacement, false);
        }

        return this;
    }
    protected resolveValue(obj: any, keys: string[]): any {
        return keys.reduce((o, k) => {
            if (o == null) {
                return o;
            }

            return o[k];
        }, obj);
    }

    protected addDiff(
        oldValue: string | undefined,
        newValue: string | undefined,
        key: string,
        triggerReplacement: boolean,
        inputDiff: boolean
    ) {
        this.hasChanged = true;
        const diff = new PropertyDiff();
        if (triggerReplacement) {
            this.response.addReplaces(key);
            diff.setKind(
                null == oldValue
                    ? PropertyDiff.Kind.ADD_REPLACE
                    : null == newValue
                    ? PropertyDiff.Kind.DELETE_REPLACE
                    : PropertyDiff.Kind.UPDATE_REPLACE
            );
        } else {
            diff.setKind(null == oldValue ? PropertyDiff.Kind.ADD : null == newValue ? PropertyDiff.Kind.DELETE : PropertyDiff.Kind.UPDATE);
        }
        diff.setInputdiff(inputDiff);
        this.response.getDetaileddiffMap().set(key, diff);
        this.response.addDiffs(key);
    }

    addStable(...keys: string[]) {
        for (const key of keys) {
            this.response.addStables(key);
        }
        return this;
    }

    toResponse(): DiffResponse {
        if (!this.hasChanged) {
            this.response.setChanges(DiffResponse.DiffChanges.DIFF_NONE);
        } else {
            this.response.setChanges(DiffResponse.DiffChanges.DIFF_SOME);
        }
        return this.response;
    }
}
