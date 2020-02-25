import { DiffResponse, PropertyDiff } from '../grpc/provider_pb';

export class Differ<T> {
    protected readonly response = new DiffResponse();

    constructor(protected readonly olds: T, protected readonly news: T) {}

    diff<K extends keyof T>(key: K & string, triggerReplacement?: boolean): this {
        const oldValue = JSON.stringify(this.olds[key]);
        const newValue = JSON.stringify(this.news[key]);
        if (oldValue !== newValue) {
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
                diff.setKind(
                    null == oldValue ? PropertyDiff.Kind.ADD : null == newValue ? PropertyDiff.Kind.DELETE : PropertyDiff.Kind.UPDATE
                );
            }
            diff.setInputdiff(true);
            this.response.getDetaileddiffMap().set(key, diff);
            this.response.addDiffs(key);
        }

        return this;
    }

    toResponse(): DiffResponse {
        return this.response;
    }
}
