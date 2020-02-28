import { CustomResource, CustomResourceOptions, ID, Input, Inputs, Output } from '@pulumi/pulumi';

import { AsInputs, AsOutputs } from './utils';

export interface BuddyEnvironmentVariableState {
    key: string;
    value: string;
    description?: string;
    ssh_key?: boolean;
    settable?: boolean;
    encrypted?: boolean;
    project_name?: string;
    pipeline_id?: number;
    action_id?: number;
}

export type BuddyEnvironmentVariableArgs = AsInputs<BuddyEnvironmentVariableState>;

export interface BuddyEnvironmentVariableProps {
    url: string;
    variable_id: number;
    key: string;
    value: string;
    description?: string;
    ssh_key?: boolean;
    settable?: boolean;
    encrypted?: boolean;
}

export class BuddyEnvironmentVariable extends CustomResource implements AsOutputs<BuddyEnvironmentVariableProps> {
    static __pulumiType = 'buddy:environment-variable:BuddyEnvironmentVariable';

    static get(name: string, id: Input<ID>, state?: Partial<BuddyEnvironmentVariableState>, opts?: CustomResourceOptions) {
        return new BuddyEnvironmentVariable(name, state as any, { ...opts, id });
    }

    static isInstance(obj: any): obj is BuddyEnvironmentVariable {
        if (null == obj) {
            return false;
        }
        return obj['__pulumiType'] === BuddyEnvironmentVariable.__pulumiType;
    }

    readonly url!: Output<string>;
    readonly variable_id!: Output<number>;
    readonly key!: Output<string>;
    readonly value!: Output<string>;
    readonly description!: Output<string|undefined>;
    readonly ssh_key!: Output<boolean|undefined>;
    readonly settable!: Output<boolean|undefined>;
    readonly encrypted!: Output<boolean|undefined>;

    constructor(name: string, argsOrState: BuddyEnvironmentVariableArgs | BuddyEnvironmentVariableState, opts?: CustomResourceOptions) {
        const inputs: Inputs = {};
        if (!opts) {
            opts = {};
        }
        if (opts.id) {
            const state = argsOrState as BuddyEnvironmentVariableState | undefined;
            inputs['key'] = state?.key;
            inputs['value'] = state?.value;
            inputs['description'] = state?.description;
            inputs['ssh_key'] = state?.ssh_key;
            inputs['settable'] = state?.settable;
            inputs['encrypted'] = state?.encrypted;
            inputs['project_name'] = state?.project_name;
            inputs['pipeline_id'] = state?.pipeline_id;
            inputs['action_id'] = state?.action_id;
        } else {
            const args = argsOrState as BuddyEnvironmentVariableArgs | undefined;
            if (!args || !args.key) {
                throw new Error('Missing required property "key"');
            }
            if (!args || !args.value) {
                throw new Error('Missing required property "value"');
            }
            if(args.pipeline_id && !args.project_name) {
                throw new Error('Missing required property "project_name"');
            }
            if(args.action_id && !args.pipeline_id) {
                throw new Error('Missing required property "pipeline_id"');
            }
            inputs['key'] = args.key;
            inputs['value'] = args.value;
            inputs['description'] = args.description;
            inputs['ssh_key'] = args.ssh_key;
            inputs['settable'] = args.settable;
            inputs['encrypted'] = args.encrypted;
            inputs['project_name'] = args.project_name;
            inputs['pipeline_id'] = args.pipeline_id;
            inputs['action_id'] = args.action_id;
        }

        if (!opts.version) {
            opts.version = require('./package').version;
        }

        inputs['url'] = undefined;
        inputs['variable_id'] = undefined;

        super(BuddyEnvironmentVariable.__pulumiType, name, inputs, opts);
    }
}
