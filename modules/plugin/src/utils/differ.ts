import { DiffResponse, PropertyDiff } from '../grpc/provider_pb';

export class Differ<T, P> {
    protected readonly response = new DiffResponse();

    protected hasChanged = false;

    constructor(protected readonly olds: T|undefined, protected readonly news: T, protected readonly props: P) {}

    diff<K1 extends keyof T, K2 extends keyof P>(key: K1 & string, propKey?: (K2 & string) | null, triggerReplacement?: boolean): this {
        const oldValue = this.olds && JSON.stringify(this.olds[key]);
        const newValue = JSON.stringify(this.news[key]);
        const propsValue = null != propKey ? JSON.stringify(this.props[propKey]) : undefined;
        if (this.olds && 0 < Object.keys(this.olds).length && oldValue !== newValue) {
            this.addDiff(oldValue, newValue, key, !!triggerReplacement);
        } else if (propKey && propsValue !== newValue && newValue !== undefined) {
            this.addDiff(propsValue, newValue, key, !!triggerReplacement);
        }

        return this;
    }

    protected addDiff(oldValue: string | undefined, newValue: string | undefined, key: string, triggerReplacement: boolean) {
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
        diff.setInputdiff(true);
        this.response.getDetaileddiffMap().set(key, diff);
        this.response.addDiffs(key);
    }

    toResponse(): DiffResponse {
        if (!this.hasChanged) {
            this.response.setChanges(DiffResponse.DiffChanges.DIFF_NONE);
        }
        return this.response;
    }
}
