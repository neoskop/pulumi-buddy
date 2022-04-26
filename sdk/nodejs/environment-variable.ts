import { CustomResource, CustomResourceOptions, ID, Input, Inputs, Output } from '@pulumi/pulumi';
import { AsInputs, AsOutputs } from '@pulumi-utils/sdk';

export interface EnvironmentVariableState {
    key: string;
    value: string;
    description?: string;
    type?: 'SSH_KEY' | 'VAR';
    settable?: boolean;
    encrypted?: boolean;
    project_name?: string;
    pipeline_id?: number;
    action_id?: number;
    file_place?: 'CONTAINER' | 'NONE';
    file_name?: string;
    file_path?: string;
    file_chmod?: string;
}

export type EnvironmentVariableArgs = AsInputs<EnvironmentVariableState>;

export interface EnvironmentVariableProps {
    url: string;
    variable_id: number;
    key: string;
    value: string;
    description?: string;
    type?: 'SSH_KEY' | 'VAR';
    settable?: boolean;
    encrypted?: boolean;
    file_place?: 'CONTAINER' | 'NONE';
    file_name?: string;
    file_path?: string;
    file_chmod?: string;
}

/**
 * Required scopes in Buddy API: `WORKSPACE`, `VARIABLE_ADD`, `VARIABLE_MANAGE`, `VARIABLE_INFO`
 */
export class EnvironmentVariable extends CustomResource implements AsOutputs<EnvironmentVariableProps> {
    static __pulumiType = 'buddy:environment-variable:EnvironmentVariable';

    static get(name: string, id: Input<ID>, state?: Partial<EnvironmentVariableState>, opts?: CustomResourceOptions) {
        return new EnvironmentVariable(name, state as any, { ...opts, id });
    }

    static isInstance(obj: any): obj is EnvironmentVariable {
        if (null == obj) {
            return false;
        }
        return obj['__pulumiType'] === EnvironmentVariable.__pulumiType;
    }

    readonly url!: Output<string>;
    readonly variable_id!: Output<number>;
    readonly key!: Output<string>;
    readonly value!: Output<string>;
    readonly description!: Output<string | undefined>;
    readonly type!: Output<'SSH_KEY' | 'VAR' | undefined>;
    readonly settable!: Output<boolean | undefined>;
    readonly encrypted!: Output<boolean | undefined>;
    readonly file_place!: Output<'CONTAINER' | 'NONE' | undefined>;
    readonly file_name!: Output<string | undefined>;
    readonly file_path!: Output<string | undefined>;
    readonly file_chmod!: Output<string | undefined>;

    constructor(name: string, argsOrState: EnvironmentVariableArgs | EnvironmentVariableState, opts?: CustomResourceOptions) {
        const inputs: Inputs = {};
        if (!opts) {
            opts = {};
        }
        if (opts.id) {
            const state = argsOrState as EnvironmentVariableState | undefined;
            inputs['key'] = state?.key;
            inputs['value'] = state?.value;
            inputs['description'] = state?.description;
            inputs['type'] = state?.type;
            inputs['settable'] = state?.settable;
            inputs['encrypted'] = state?.encrypted;
            inputs['project_name'] = state?.project_name;
            inputs['pipeline_id'] = state?.pipeline_id;
            inputs['action_id'] = state?.action_id;
            inputs['file_place'] = state?.file_place;
            inputs['file_name'] = state?.file_name;
            inputs['file_path'] = state?.file_path;
            inputs['file_chmod'] = state?.file_chmod;
        } else {
            const args = argsOrState as EnvironmentVariableArgs | undefined;
            if (!args || !args.key) {
                throw new Error('Missing required property "key"');
            }
            if (!args || !args.value) {
                throw new Error('Missing required property "value"');
            }
            inputs['key'] = args.key;
            inputs['value'] = args.value;
            inputs['description'] = args.description;
            inputs['type'] = args.type;
            inputs['settable'] = args.settable;
            inputs['encrypted'] = args.encrypted;
            inputs['project_name'] = args.project_name;
            inputs['pipeline_id'] = args.pipeline_id;
            inputs['action_id'] = args.action_id;
            inputs['file_place'] = args.file_place;
            inputs['file_name'] = args.file_name;
            inputs['file_path'] = args.file_path;
            inputs['file_chmod'] = args.file_chmod;
        }

        if (!opts.version) {
            opts.version = require('./package').version;
        }

        inputs['url'] = undefined;
        inputs['variable_id'] = undefined;

        super(EnvironmentVariable.__pulumiType, name, inputs, opts);
    }
}
