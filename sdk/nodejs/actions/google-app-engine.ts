import { AsInputs } from '../utils';
import { PipelineProps } from '../pipeline';
import { CustomResource, Input, Output, ID, CustomResourceOptions, Inputs } from '@pulumi/pulumi';
import { Variable } from '../common';

export interface ActionGoogleAppEngineState {
    project_name: string;
    pipeline_id: number;
    /**
     * The name of the GAE application.
     */
    application_name: string;

    /**
     * The name of the GAE Bucket.
     */
    bucket_name: string;

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
     * The URL address to the desired image.
     */
    image_url?: string;

    /**
     * Defines whether the files are deployed from the repository or from the build filesystem. Can be one of `SCM_REPOSITORY` or `BUILD_ARTIFACTS`.
     */
    input_type?: 'SCM_REPOSITORY' | 'BUILD_ARTIFACTS';

    /**
     * The path in the repository.
     */
    local_path?: string;

    /**
     * Specifies whether or not to send all traffic to the new version immediately.
     */
    promote_all_traffic?: boolean;

    /**
     * When set to `true`, the subsequent action defined in the pipeline will run in parallel to the current action.
     */
    run_next_parallel?: boolean;

    /**
     * Defines whether the action should be executed on each failure. Restricted to and required if the `trigger_time` is `ON_FAILURE`.
     */
    run_only_on_first_failure?: boolean;

    /**
     * The GAE server key (base64 encoded).
     */
    server_key?: string;

    /**
     * Specifies whether or not to stop previous version instances.
     */
    stop_previous_version?: boolean;

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

    /**
     * The verbosity level. Default level is `warning`. Can be one of `critical`, `debug`, `error`, `info`, `none` or `warning`.
     */
    verbosity?: 'critical' | 'debug' | 'err' | '' | 'info' | 'none' | 'warning';

    /**
     * The label of the image version.
     */
    version_label?: string;
}

export type ActionGoogleAppEngineArgs = AsInputs<ActionGoogleAppEngineState>;

export interface ActionGoogleAppEngineProps {
    url: string;
    html_url: string;
    action_id: number;
    application_name: string;
    bucket_name: string;
    name: string;
    type: 'GOOGLE_APP_ENGINE';
    after_action_id?: number;
    disabled?: boolean;
    image_url?: string;
    input_type?: 'SCM_REPOSITORY' | 'BUILD_ARTIFACTS';
    local_path?: string;
    promote_all_traffic?: boolean;
    run_next_parallel?: boolean;
    run_only_on_first_failure?: boolean;
    server_key?: string;
    stop_previous_version?: boolean;
    timeout?: number;
    trigger_condition?: 'ALWAYS' | 'ON_CHANGE' | 'ON_CHANGE_AT_PATH' | 'VAR_IS' | 'VAR_IS_NOT' | 'VAR_CONTAINS';
    trigger_condition_paths?: string[];
    trigger_time?: 'ON_EVERY_EXECUTION' | 'ON_FAILURE' | 'ON_BACK_TO_SUCCESS';
    trigger_variable_key?: string;
    trigger_variable_value?: string;
    variables?: Variable[];
    verbosity?: 'critical' | 'debug' | 'err' | '' | 'info' | 'none' | 'warning';
    version_label?: string;
    pipeline: PipelineProps;
    project_name: string;
    pipeline_id: number;
}

/**
 * Required scopes in Buddy API: `WORKSPACE`, `EXECUTION_MANAGE`, `EXECUTION_INFO`
 */
export class GoogleAppEngine extends CustomResource {
    static __pulumiType = 'buddy:action:GoogleAppEngine';

    static get(name: string, id: Input<ID>, state?: Partial<ActionGoogleAppEngineState>, opts?: CustomResourceOptions) {
        return new GoogleAppEngine(name, state as any, { ...opts, id });
    }

    static isInstance(obj: any): obj is GoogleAppEngine {
        if (null == obj) {
            return false;
        }

        return obj['__pulumiType'] === GoogleAppEngine.__pulumiType;
    }

    project_name!: Output<string>;
    pipeline_id!: Output<number>;
    action_id!: Output<number>;
    application_name!: Output<string>;
    bucket_name!: Output<string>;
    name!: Output<string>;
    type!: Output<'GOOGLE_APP_ENGINE'>;
    after_action_id!: Output<number | undefined>;
    disabled!: Output<boolean | undefined>;
    image_url!: Output<string | undefined>;
    input_type!: Output<'SCM_REPOSITORY' | 'BUILD_ARTIFACTS' | undefined>;
    local_path!: Output<string | undefined>;
    promote_all_traffic!: Output<boolean | undefined>;
    run_next_parallel!: Output<boolean | undefined>;
    run_only_on_first_failure!: Output<boolean | undefined>;
    server_key!: Output<string | undefined>;
    stop_previous_version!: Output<boolean | undefined>;
    timeout!: Output<number | undefined>;
    trigger_condition!: Output<'ALWAYS' | 'ON_CHANGE' | 'ON_CHANGE_AT_PATH' | 'VAR_IS' | 'VAR_IS_NOT' | 'VAR_CONTAINS' | undefined>;
    trigger_condition_paths!: Output<string[] | undefined>;
    trigger_time!: Output<'ON_EVERY_EXECUTION' | 'ON_FAILURE' | 'ON_BACK_TO_SUCCESS' | undefined>;
    trigger_variable_key!: Output<string | undefined>;
    trigger_variable_value!: Output<string | undefined>;
    variables!: Output<Variable[] | undefined>;
    verbosity!: Output<'critical' | 'debug' | 'err' | '' | 'info' | 'none' | 'warning' | undefined>;
    version_label!: Output<string | undefined>;

    constructor(name: string, argsOrState: ActionGoogleAppEngineArgs | ActionGoogleAppEngineState, opts?: CustomResourceOptions) {
        const inputs: Inputs = {};
        if (!opts) {
            opts = {};
        }

        if (opts.id) {
            const state = argsOrState as ActionGoogleAppEngineState | undefined;
            inputs['project_name'] = state?.project_name;
            inputs['pipeline_id'] = state?.pipeline_id;
            inputs['application_name'] = state?.application_name;
            inputs['bucket_name'] = state?.bucket_name;
            inputs['name'] = state?.name;
            inputs['after_action_id'] = state?.after_action_id;
            inputs['disabled'] = state?.disabled;
            inputs['image_url'] = state?.image_url;
            inputs['input_type'] = state?.input_type;
            inputs['local_path'] = state?.local_path;
            inputs['promote_all_traffic'] = state?.promote_all_traffic;
            inputs['run_next_parallel'] = state?.run_next_parallel;
            inputs['run_only_on_first_failure'] = state?.run_only_on_first_failure;
            inputs['server_key'] = state?.server_key;
            inputs['stop_previous_version'] = state?.stop_previous_version;
            inputs['timeout'] = state?.timeout;
            inputs['trigger_condition'] = state?.trigger_condition;
            inputs['trigger_condition_paths'] = state?.trigger_condition_paths;
            inputs['trigger_time'] = state?.trigger_time;
            inputs['trigger_variable_key'] = state?.trigger_variable_key;
            inputs['trigger_variable_value'] = state?.trigger_variable_value;
            inputs['variables'] = state?.variables;
            inputs['verbosity'] = state?.verbosity;
            inputs['version_label'] = state?.version_label;
        } else {
            const args = argsOrState as ActionGoogleAppEngineArgs | undefined;
            if (!args?.project_name) {
                throw new Error('Missing required property "project_name"');
            }

            if (!args?.pipeline_id) {
                throw new Error('Missing required property "pipeline_id"');
            }

            if (!args?.application_name) {
                throw new Error('Missing required property "application_name"');
            }

            if (!args?.bucket_name) {
                throw new Error('Missing required property "bucket_name"');
            }

            if (!args?.name) {
                throw new Error('Missing required property "name"');
            }

            inputs['application_name'] = args.application_name;
            inputs['bucket_name'] = args.bucket_name;
            inputs['name'] = args.name;
            inputs['after_action_id'] = args.after_action_id;
            inputs['disabled'] = args.disabled;
            inputs['image_url'] = args.image_url;
            inputs['input_type'] = args.input_type;
            inputs['local_path'] = args.local_path;
            inputs['promote_all_traffic'] = args.promote_all_traffic;
            inputs['run_next_parallel'] = args.run_next_parallel;
            inputs['run_only_on_first_failure'] = args.run_only_on_first_failure;
            inputs['server_key'] = args.server_key;
            inputs['stop_previous_version'] = args.stop_previous_version;
            inputs['timeout'] = args.timeout;
            inputs['trigger_condition'] = args.trigger_condition;
            inputs['trigger_condition_paths'] = args.trigger_condition_paths;
            inputs['trigger_time'] = args.trigger_time;
            inputs['trigger_variable_key'] = args.trigger_variable_key;
            inputs['trigger_variable_value'] = args.trigger_variable_value;
            inputs['variables'] = args.variables;
            inputs['verbosity'] = args.verbosity;
            inputs['version_label'] = args.version_label;
            inputs['project_name'] = args.project_name;
            inputs['pipeline_id'] = args.pipeline_id;
        }

        if (!opts.version) {
            opts.version = require('../package').version;
        }

        opts.ignoreChanges = ['project_name', 'pipeline_id', ...(opts.ignoreChanges || [])];

        inputs['type'] = 'GOOGLE_APP_ENGINE';
        inputs['url'] = undefined;
        inputs['html_url'] = undefined;
        inputs['action_id'] = undefined;

        super(GoogleAppEngine.__pulumiType, name, inputs, opts);
    }
}