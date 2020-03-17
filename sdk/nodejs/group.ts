import { CustomResource, CustomResourceOptions, ID, Input, Inputs, Output } from '@pulumi/pulumi';
import { AsInputs, AsOutputs } from '@neoskop/pulumi-utils-sdk';

export interface GroupState {
    name: string;
    description?: string;
}

export type GroupArgs = AsInputs<GroupState>;

export interface GroupProps {
    url: string;
    html_url: string;
    group_id: number;
    name: string;
    description: string | null;
}

export class Group extends CustomResource implements AsOutputs<GroupProps> {
    static __pulumiType = 'buddy:group:Group';

    static get(name: string, id: Input<ID>, state?: Partial<GroupState>, opts?: CustomResourceOptions) {
        return new Group(name, state as any, { ...opts, id });
    }

    static isInstance(obj: any): obj is Group {
        if (null == obj) {
            return false;
        }
        return obj['__pulumiType'] === Group.__pulumiType;
    }

    readonly url!: Output<string>;
    readonly html_url!: Output<string>;
    readonly group_id!: Output<number>;
    readonly name!: Output<string>;
    readonly description!: Output<string | null>;

    constructor(name: string, argsOrState: GroupArgs | GroupState, opts?: CustomResourceOptions) {
        const inputs: Inputs = {};
        if (!opts) {
            opts = {};
        }
        if (opts.id) {
            const state = argsOrState as GroupState | undefined;
            inputs['name'] = state?.name;
            inputs['description'] = state?.description;
        } else {
            const args = argsOrState as GroupArgs | undefined;
            if (!args || !args.name) {
                throw new Error('Missing required property "name"');
            }
            inputs['name'] = args?.name;
            inputs['description'] = args?.description;
        }

        if (!opts.version) {
            opts.version = require('./package').version;
        }

        inputs['url'] = undefined;
        inputs['html_url'] = undefined;
        inputs['group_id'] = undefined;

        super(Group.__pulumiType, name, inputs, opts);
    }
}
