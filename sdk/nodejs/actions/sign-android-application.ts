import { AsInputs } from '@pulumi-utils/sdk';
import { PipelineProps } from '../pipeline';
import { CustomResource, Input, Output, ID, CustomResourceOptions, Inputs } from '@pulumi/pulumi';
import { TriggerCondition, Variable } from '../common';

export interface SignAndroidApplicationState {
    project_name: string;
    pipeline_id: number;
    /**
     * The name of the signed APK file.
     */
    application_name: string;

    /**
     * The version of the Android Build Tools.
     */
    build_tool_version: string;

    /**
     * The path to the private key in JSON format with permissions to Google Play Developer Console.
     */
    key_path: string;

    /**
     * The keystore password.
     */
    keystore_password: string;

    /**
     * The path to the generated .apk file.
     */
    local_path: string;

    /**
     * The name of the action.
     */
    name: string;

    /**
     * Specifies when the action should be executed. Can be one of `ON_EVERY_EXECUTION`, `ON_FAILURE` or `ON_BACK_TO_SUCCESS`. The default value is `ON_EVERY_EXECUTION`.
     */
    trigger_time: 'ON_EVERY_EXECUTION' | 'ON_FAILURE' | 'ON_BACK_TO_SUCCESS';

    /**
     * The numerical ID of the action, after which this action should be added.
     */
    after_action_id?: number;

    /**
     * When set to 'true' the action is disabled.  By default it is set to 'false'.
     */
    disabled?: boolean;

    /**
     * If set to 'true' the execution will proceed, mark action as a warning and jump to the next action. Doesn't apply to deployment actions.
     */
    ignore_errors?: boolean;

    /**
     * The key alias name.
     */
    key_alias?: string;

    /**
     * The key password.
     */
    key_password?: string;

    /**
     * The directory in which the signed APK will be stored.
     */
    output_dir?: string;

    /**
     * Number of retries if the action fails.
     */
    retry_count?: number;

    /**
     * Delay time between auto retries in seconds.
     */
    retry_interval?: number;

    /**
     * When set to 'true', the subsequent action defined in the pipeline will run in parallel to the current action.
     */
    run_next_parallel?: boolean;

    /**
     * Defines whether the action should be executed on each failure. Restricted to and required if the 'trigger_time' is 'ON_FAILURE'.
     */
    run_only_on_first_failure?: boolean;

    /**
     * The timeout in seconds.
     */
    timeout?: number;

    /**
     * The list of trigger conditions to meet so that the action can be triggered.
     */
    trigger_conditions?: TriggerCondition[];

    /**
     * The list of variables you can use the action.
     */
    variables?: Variable[];
}

export type SignAndroidApplicationArgs = AsInputs<SignAndroidApplicationState>;

export interface SignAndroidApplicationProps {
    url: string;
    html_url: string;
    action_id: number;
    application_name: string;
    build_tool_version: string;
    key_path: string;
    keystore_password: string;
    local_path: string;
    name: string;
    trigger_time: 'ON_EVERY_EXECUTION' | 'ON_FAILURE' | 'ON_BACK_TO_SUCCESS';
    type: 'ANDROID_SIGN';
    after_action_id?: number;
    disabled?: boolean;
    ignore_errors?: boolean;
    key_alias?: string;
    key_password?: string;
    output_dir?: string;
    retry_count?: number;
    retry_interval?: number;
    run_next_parallel?: boolean;
    run_only_on_first_failure?: boolean;
    timeout?: number;
    trigger_conditions?: TriggerCondition[];
    variables?: Variable[];
    pipeline: PipelineProps;
    project_name: string;
    pipeline_id: number;
}

/**
 * Required scopes in Buddy API: `WORKSPACE`, `EXECUTION_MANAGE`, `EXECUTION_INFO`
 */
export class SignAndroidApplication extends CustomResource {
    static __pulumiType = 'buddy:action:SignAndroidApplication';

    static get(name: string, id: Input<ID>, state?: Partial<SignAndroidApplicationState>, opts?: CustomResourceOptions) {
        return new SignAndroidApplication(name, state as any, { ...opts, id });
    }

    static isInstance(obj: any): obj is SignAndroidApplication {
        if (null == obj) {
            return false;
        }

        return obj['__pulumiType'] === SignAndroidApplication.__pulumiType;
    }

    project_name!: Output<string>;
    pipeline_id!: Output<number>;
    action_id!: Output<number>;
    application_name!: Output<string>;
    build_tool_version!: Output<string>;
    key_path!: Output<string>;
    keystore_password!: Output<string>;
    local_path!: Output<string>;
    name!: Output<string>;
    trigger_time!: Output<'ON_EVERY_EXECUTION' | 'ON_FAILURE' | 'ON_BACK_TO_SUCCESS'>;
    type!: Output<'ANDROID_SIGN'>;
    after_action_id!: Output<number | undefined>;
    disabled!: Output<boolean | undefined>;
    ignore_errors!: Output<boolean | undefined>;
    key_alias!: Output<string | undefined>;
    key_password!: Output<string | undefined>;
    output_dir!: Output<string | undefined>;
    retry_count!: Output<number | undefined>;
    retry_interval!: Output<number | undefined>;
    run_next_parallel!: Output<boolean | undefined>;
    run_only_on_first_failure!: Output<boolean | undefined>;
    timeout!: Output<number | undefined>;
    trigger_conditions!: Output<TriggerCondition[] | undefined>;
    variables!: Output<Variable[] | undefined>;

    constructor(name: string, argsOrState: SignAndroidApplicationArgs | SignAndroidApplicationState, opts?: CustomResourceOptions) {
        const inputs: Inputs = {};
        if (!opts) {
            opts = {};
        }

        if (opts.id) {
            const state = argsOrState as SignAndroidApplicationState | undefined;
            inputs['project_name'] = state?.project_name;
            inputs['pipeline_id'] = state?.pipeline_id;
            inputs['application_name'] = state?.application_name;
            inputs['build_tool_version'] = state?.build_tool_version;
            inputs['key_path'] = state?.key_path;
            inputs['keystore_password'] = state?.keystore_password;
            inputs['local_path'] = state?.local_path;
            inputs['name'] = state?.name;
            inputs['trigger_time'] = state?.trigger_time;
            inputs['after_action_id'] = state?.after_action_id;
            inputs['disabled'] = state?.disabled;
            inputs['ignore_errors'] = state?.ignore_errors;
            inputs['key_alias'] = state?.key_alias;
            inputs['key_password'] = state?.key_password;
            inputs['output_dir'] = state?.output_dir;
            inputs['retry_count'] = state?.retry_count;
            inputs['retry_interval'] = state?.retry_interval;
            inputs['run_next_parallel'] = state?.run_next_parallel;
            inputs['run_only_on_first_failure'] = state?.run_only_on_first_failure;
            inputs['timeout'] = state?.timeout;
            inputs['trigger_conditions'] = state?.trigger_conditions;
            inputs['variables'] = state?.variables;
        } else {
            const args = argsOrState as SignAndroidApplicationArgs | undefined;
            if (!args?.project_name) {
                throw new Error('Missing required property "project_name"');
            }

            if (!args?.pipeline_id) {
                throw new Error('Missing required property "pipeline_id"');
            }

            if (!args?.application_name) {
                throw new Error('Missing required property "application_name"');
            }

            if (!args?.build_tool_version) {
                throw new Error('Missing required property "build_tool_version"');
            }

            if (!args?.key_path) {
                throw new Error('Missing required property "key_path"');
            }

            if (!args?.keystore_password) {
                throw new Error('Missing required property "keystore_password"');
            }

            if (!args?.local_path) {
                throw new Error('Missing required property "local_path"');
            }

            if (!args?.name) {
                throw new Error('Missing required property "name"');
            }

            if (!args?.trigger_time) {
                throw new Error('Missing required property "trigger_time"');
            }

            inputs['application_name'] = args.application_name;
            inputs['build_tool_version'] = args.build_tool_version;
            inputs['key_path'] = args.key_path;
            inputs['keystore_password'] = args.keystore_password;
            inputs['local_path'] = args.local_path;
            inputs['name'] = args.name;
            inputs['trigger_time'] = args.trigger_time;
            inputs['after_action_id'] = args.after_action_id;
            inputs['disabled'] = args.disabled;
            inputs['ignore_errors'] = args.ignore_errors;
            inputs['key_alias'] = args.key_alias;
            inputs['key_password'] = args.key_password;
            inputs['output_dir'] = args.output_dir;
            inputs['retry_count'] = args.retry_count;
            inputs['retry_interval'] = args.retry_interval;
            inputs['run_next_parallel'] = args.run_next_parallel;
            inputs['run_only_on_first_failure'] = args.run_only_on_first_failure;
            inputs['timeout'] = args.timeout;
            inputs['trigger_conditions'] = args.trigger_conditions;
            inputs['variables'] = args.variables;
            inputs['project_name'] = args.project_name;
            inputs['pipeline_id'] = args.pipeline_id;
        }

        if (!opts.version) {
            opts.version = require('../package').version;
        }

        opts.ignoreChanges = ['project_name', 'pipeline_id', ...(opts.ignoreChanges || [])];

        inputs['type'] = 'ANDROID_SIGN';
        inputs['url'] = undefined;
        inputs['html_url'] = undefined;
        inputs['action_id'] = undefined;

        super(SignAndroidApplication.__pulumiType, name, inputs, opts);
    }
}
