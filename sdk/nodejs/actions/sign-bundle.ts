import { AsInputs } from '../utils';
import { PipelineProps } from '../pipeline';
import { CustomResource, Input, Output, ID, CustomResourceOptions, Inputs } from '@pulumi/pulumi';
import { Variable } from '../common';

export interface ActionSignBundleState {
    project_name: string;
    pipeline_id: number;
    /**
     * The name of the signed APK file.
     */
    application_name: string;

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
     * The numerical ID of the action, after which this action should be added.
     */
    after_action_id?: number;

    /**
     * When set to `true` the action is disabled.  By default it is set to `false`.
     */
    disabled?: boolean;

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
     * When set to `true`, the subsequent action defined in the pipeline will run in parallel to the current action.
     */
    run_next_parallel?: boolean;

    /**
     * Defines whether the action should be executed on each failure. Restricted to and required if the `trigger_time` is `ON_FAILURE`.
     */
    run_only_on_first_failure?: boolean;

    /**
     * The timeout in seconds.
     */
    timeout?: number;

    /**
     * Defines when the build action should be run. Can be one of `ALWAYS`, `ON_CHANGE`, `ON_CHANGE_AT_PATH`, `VAR_IS`, `VAR_IS_NOT` or `VAR_CONTAINS` or `VAR_NOT_CONTAINS`. Can't be used in deployment actions.
     */
    trigger_condition?: 'ALWAYS' | 'ON_CHANGE' | 'ON_CHANGE_AT_PATH' | 'VAR_IS' | 'VAR_IS_NOT' | 'VAR_CONTAINS';

    /**
     * Required when `trigger_condition` is set to `ON_CHANGE_AT_PATH`.
     */
    trigger_condition_paths?: string[];

    /**
     * Specifies when the action should be executed. Can be one of `ON_EVERY_EXECUTION`, `ON_FAILURE` or `ON_BACK_TO_SUCCESS`. The default value is `ON_EVERY_EXECUTION`.
     */
    trigger_time?: 'ON_EVERY_EXECUTION' | 'ON_FAILURE' | 'ON_BACK_TO_SUCCESS';

    /**
     * Required when `trigger_condition` is set to `VAR_IS`, `VAR_IS_NOT` or `VAR_CONTAINS` or `VAR_NOT_CONTAINS`. Defines the name of the desired variable.
     */
    trigger_variable_key?: string;

    /**
     * Required when `trigger_condition` is set to `VAR_IS`, `VAR_IS_NOT` or `VAR_CONTAINS`. Defines the value of the desired variable which will be compared with its current value.
     */
    trigger_variable_value?: string;

    /**
     * The list of variables you can use the action.
     */
    variables?: Variable[];
}

export type ActionSignBundleArgs = AsInputs<ActionSignBundleState>;

export interface ActionSignBundleProps {
    url: string;
    html_url: string;
    action_id: number;
    application_name: string;
    key_path: string;
    keystore_password: string;
    local_path: string;
    name: string;
    type: 'ANDROID_SIGN_BUNDLE';
    after_action_id?: number;
    disabled?: boolean;
    key_alias?: string;
    key_password?: string;
    output_dir?: string;
    run_next_parallel?: boolean;
    run_only_on_first_failure?: boolean;
    timeout?: number;
    trigger_condition?: 'ALWAYS' | 'ON_CHANGE' | 'ON_CHANGE_AT_PATH' | 'VAR_IS' | 'VAR_IS_NOT' | 'VAR_CONTAINS';
    trigger_condition_paths?: string[];
    trigger_time?: 'ON_EVERY_EXECUTION' | 'ON_FAILURE' | 'ON_BACK_TO_SUCCESS';
    trigger_variable_key?: string;
    trigger_variable_value?: string;
    variables?: Variable[];
    pipeline: PipelineProps;
    project_name: string;
    pipeline_id: number;
}

/**
 * Required scopes in Buddy API: `WORKSPACE`, `EXECUTION_MANAGE`, `EXECUTION_INFO`
 */
export class SignBundle extends CustomResource {
    static __pulumiType = 'buddy:action:SignBundle';

    static get(name: string, id: Input<ID>, state?: Partial<ActionSignBundleState>, opts?: CustomResourceOptions) {
        return new SignBundle(name, state as any, { ...opts, id });
    }

    static isInstance(obj: any): obj is SignBundle {
        if (null == obj) {
            return false;
        }

        return obj['__pulumiType'] === SignBundle.__pulumiType;
    }

    project_name!: Output<string>;
    pipeline_id!: Output<number>;
    action_id!: Output<number>;
    application_name!: Output<string>;
    key_path!: Output<string>;
    keystore_password!: Output<string>;
    local_path!: Output<string>;
    name!: Output<string>;
    type!: Output<'ANDROID_SIGN_BUNDLE'>;
    after_action_id!: Output<number | undefined>;
    disabled!: Output<boolean | undefined>;
    key_alias!: Output<string | undefined>;
    key_password!: Output<string | undefined>;
    output_dir!: Output<string | undefined>;
    run_next_parallel!: Output<boolean | undefined>;
    run_only_on_first_failure!: Output<boolean | undefined>;
    timeout!: Output<number | undefined>;
    trigger_condition!: Output<'ALWAYS' | 'ON_CHANGE' | 'ON_CHANGE_AT_PATH' | 'VAR_IS' | 'VAR_IS_NOT' | 'VAR_CONTAINS' | undefined>;
    trigger_condition_paths!: Output<string[] | undefined>;
    trigger_time!: Output<'ON_EVERY_EXECUTION' | 'ON_FAILURE' | 'ON_BACK_TO_SUCCESS' | undefined>;
    trigger_variable_key!: Output<string | undefined>;
    trigger_variable_value!: Output<string | undefined>;
    variables!: Output<Variable[] | undefined>;

    constructor(name: string, argsOrState: ActionSignBundleArgs | ActionSignBundleState, opts?: CustomResourceOptions) {
        const inputs: Inputs = {};
        if (!opts) {
            opts = {};
        }

        if (opts.id) {
            const state = argsOrState as ActionSignBundleState | undefined;
            inputs['project_name'] = state?.project_name;
            inputs['pipeline_id'] = state?.pipeline_id;
            inputs['application_name'] = state?.application_name;
            inputs['key_path'] = state?.key_path;
            inputs['keystore_password'] = state?.keystore_password;
            inputs['local_path'] = state?.local_path;
            inputs['name'] = state?.name;
            inputs['after_action_id'] = state?.after_action_id;
            inputs['disabled'] = state?.disabled;
            inputs['key_alias'] = state?.key_alias;
            inputs['key_password'] = state?.key_password;
            inputs['output_dir'] = state?.output_dir;
            inputs['run_next_parallel'] = state?.run_next_parallel;
            inputs['run_only_on_first_failure'] = state?.run_only_on_first_failure;
            inputs['timeout'] = state?.timeout;
            inputs['trigger_condition'] = state?.trigger_condition;
            inputs['trigger_condition_paths'] = state?.trigger_condition_paths;
            inputs['trigger_time'] = state?.trigger_time;
            inputs['trigger_variable_key'] = state?.trigger_variable_key;
            inputs['trigger_variable_value'] = state?.trigger_variable_value;
            inputs['variables'] = state?.variables;
        } else {
            const args = argsOrState as ActionSignBundleArgs | undefined;
            if (!args?.project_name) {
                throw new Error('Missing required property "project_name"');
            }

            if (!args?.pipeline_id) {
                throw new Error('Missing required property "pipeline_id"');
            }

            if (!args?.application_name) {
                throw new Error('Missing required property "application_name"');
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

            inputs['application_name'] = args.application_name;
            inputs['key_path'] = args.key_path;
            inputs['keystore_password'] = args.keystore_password;
            inputs['local_path'] = args.local_path;
            inputs['name'] = args.name;
            inputs['after_action_id'] = args.after_action_id;
            inputs['disabled'] = args.disabled;
            inputs['key_alias'] = args.key_alias;
            inputs['key_password'] = args.key_password;
            inputs['output_dir'] = args.output_dir;
            inputs['run_next_parallel'] = args.run_next_parallel;
            inputs['run_only_on_first_failure'] = args.run_only_on_first_failure;
            inputs['timeout'] = args.timeout;
            inputs['trigger_condition'] = args.trigger_condition;
            inputs['trigger_condition_paths'] = args.trigger_condition_paths;
            inputs['trigger_time'] = args.trigger_time;
            inputs['trigger_variable_key'] = args.trigger_variable_key;
            inputs['trigger_variable_value'] = args.trigger_variable_value;
            inputs['variables'] = args.variables;
            inputs['project_name'] = args.project_name;
            inputs['pipeline_id'] = args.pipeline_id;
        }

        if (!opts.version) {
            opts.version = require('../package').version;
        }

        opts.ignoreChanges = ['project_name', 'pipeline_id', ...(opts.ignoreChanges || [])];

        inputs['type'] = 'ANDROID_SIGN_BUNDLE';
        inputs['url'] = undefined;
        inputs['html_url'] = undefined;
        inputs['action_id'] = undefined;

        super(SignBundle.__pulumiType, name, inputs, opts);
    }
}
