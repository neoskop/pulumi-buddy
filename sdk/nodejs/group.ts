import { CustomResource, CustomResourceOptions, ID, Input, Inputs, Output } from '@pulumi/pulumi';

import { AsInputs, AsOutputs } from './utils';

export interface BuddyGroupState {
    name: string;
    description?: string;
}

export type BuddyGroupArgs = AsInputs<BuddyGroupState>;

export interface BuddyGroupProps {
    url: string;
    html_url: string;
    group_id: number;
    name: string;
    description: string|null;
}

export class BuddyGroup extends CustomResource implements AsOutputs<BuddyGroupProps> {
    static __pulumiType = 'buddy:group:BuddyGroup';

    static get(name: string, id: Input<ID>, state?: Partial<BuddyGroupState>, opts?: CustomResourceOptions) {
        return new BuddyGroup(name, state as any, { ...opts, id });
    }

    static isInstance(obj: any): obj is BuddyGroup {
        if (null == obj) {
            return false;
        }
        return obj['__pulumiType'] === BuddyGroup.__pulumiType;
    }

    readonly url!: Output<string>;
    readonly html_url!: Output<string>;
    readonly group_id!: Output<number>;
    readonly name!: Output<string>;
    readonly description!: Output<string|null>;

    constructor(name: string, argsOrState: BuddyGroupArgs | BuddyGroupState, opts?: CustomResourceOptions) {
        const inputs: Inputs = {};
        if (!opts) {
            opts = {};
        }
        if (opts.id) {
            const state = argsOrState as BuddyGroupState | undefined;
            inputs['name'] = state?.name;
            inputs['description'] = state?.description;
        } else {
            const args = argsOrState as BuddyGroupArgs | undefined;
            if (!args || !args.name) {
                throw new Error('Missing required property "name"');
            }
            inputs['name'] = args?.name;
            inputs['description'] = args?.description;
        }

        if (!opts.version) {
            opts.version = require('./package').version;
        }

        if (null == opts.deleteBeforeReplace) {
            opts.deleteBeforeReplace = true;
        }

        inputs['url'] = undefined;
        inputs['html_url'] = undefined;
        inputs['group_id'] = undefined;

        super(BuddyGroup.__pulumiType, name, inputs, opts);
    }
}
