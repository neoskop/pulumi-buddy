import { AsInputs } from '@pulumi-utils/sdk';
import { PipelineProps } from '../pipeline';
import { CustomResource, Input, Output, ID, CustomResourceOptions, Inputs } from '@pulumi/pulumi';
import { Variable } from '../common';

export interface SSLVerifyState {
    project_name: string;
    pipeline_id: number;
    /**
     * The name of the action.
     */
    name: string;

    /**
     * Specifies when the action should be executed. Can be one of `ON_EVERY_EXECUTION`, `ON_FAILURE` or `ON_BACK_TO_SUCCESS`. The default value is `ON_EVERY_EXECUTION`.
     */
    trigger_time: 'ON_EVERY_EXECUTION' | 'ON_FAILURE' | 'ON_BACK_TO_SUCCESS';

    /**
     * Validation period for SSL certificate.
     */
    valid_for_days: number;

    /**
     * The URL of the website to be monitored.
     */
    website: string;

    /**
     * The numerical ID of the action, after which this action should be added.
     */
    after_action_id?: number;

    /**
     * When set to `true` the action is disabled.  By default it is set to `false`.
     */
    disabled?: boolean;

    /**
     * If set to `true` the execution will proceed, mark action as a warning and jump to the next action. Doesn't apply to deployment actions.
     */
    ignore_errors?: boolean;

    /**
     * The port for the connection. By default it is 443.
     */
    port?: string;

    /**
     * Number of retries if the action fails.
     */
    retry_count?: number;

    /**
     * Delay time between auto retries in minutes.
     */
    retry_delay?: number;

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
     * Defines when the build action should be run. Can be one of `ALWAYS`, `ON_CHANGE`, `ON_CHANGE_AT_PATH`, `VAR_IS`, `VAR_IS_NOT`, `VAR_CONTAINS`, `VAR_NOT_CONTAINS`, `DATETIME` or `SUCCESS_PIPELINE`. Can't be used in deployment actions.
     */
    trigger_condition?:
        | 'ALWAYS'
        | 'ON_CHANGE'
        | 'ON_CHANGE_AT_PATH'
        | 'VAR_IS'
        | 'VAR_IS_NOT'
        | 'VAR_CONTAINS'
        | 'VAR_NOT_CONTAINS'
        | 'DATETIME'
        | 'SUCCESS_PIPELINE';

    /**
     * Required when `trigger_condition` is set to `ON_CHANGE_AT_PATH`.
     */
    trigger_condition_paths?: string[];

    /**
     * Available when `trigger_condition` is set to `DATETIME`. Defines the days running from 1 to 7 where 1 is for Monday.
     */
    trigger_days?: number[];

    /**
     * Available when `trigger_condition` is set to `DATETIME`. Defines the time – by default running from 1 to 24.
     */
    trigger_hours?: number[];

    /**
     * Required when `trigger_condition` is set to `SUCCESS_PIPELINE`. Defines the name of the pipeline.
     */
    trigger_pipeline_name?: string;

    /**
     * Required when `trigger_condition` is set to `SUCCESS_PIPELINE`. Defines the name of the project in which the `trigger_pipeline_name` is.
     */
    trigger_project_name?: string;

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
     * Available when `trigger_condition` is set to `DATETIME`. Defines the timezone (by default it is UTC) and takes values from here.
     */
    zone_id?: string;
}

export type SSLVerifyArgs = AsInputs<SSLVerifyState>;

export interface SSLVerifyProps {
    url: string;
    html_url: string;
    action_id: number;
    name: string;
    trigger_time: 'ON_EVERY_EXECUTION' | 'ON_FAILURE' | 'ON_BACK_TO_SUCCESS';
    type: 'SSL_VERIFY';
    valid_for_days: number;
    website: string;
    after_action_id?: number;
    disabled?: boolean;
    ignore_errors?: boolean;
    port?: string;
    retry_count?: number;
    retry_delay?: number;
    run_next_parallel?: boolean;
    run_only_on_first_failure?: boolean;
    timeout?: number;
    trigger_condition?:
        | 'ALWAYS'
        | 'ON_CHANGE'
        | 'ON_CHANGE_AT_PATH'
        | 'VAR_IS'
        | 'VAR_IS_NOT'
        | 'VAR_CONTAINS'
        | 'VAR_NOT_CONTAINS'
        | 'DATETIME'
        | 'SUCCESS_PIPELINE';
    trigger_condition_paths?: string[];
    trigger_days?: number[];
    trigger_hours?: number[];
    trigger_pipeline_name?: string;
    trigger_project_name?: string;
    trigger_variable_key?: string;
    trigger_variable_value?: string;
    variables?: Variable[];
    zone_id?: string;
    pipeline: PipelineProps;
    project_name: string;
    pipeline_id: number;
}

/**
 * Required scopes in Buddy API: `WORKSPACE`, `EXECUTION_MANAGE`, `EXECUTION_INFO`
 */
export class SSLVerify extends CustomResource {
    static __pulumiType = 'buddy:action:SSLVerify';

    static get(name: string, id: Input<ID>, state?: Partial<SSLVerifyState>, opts?: CustomResourceOptions) {
        return new SSLVerify(name, state as any, { ...opts, id });
    }

    static isInstance(obj: any): obj is SSLVerify {
        if (null == obj) {
            return false;
        }

        return obj['__pulumiType'] === SSLVerify.__pulumiType;
    }

    project_name!: Output<string>;
    pipeline_id!: Output<number>;
    action_id!: Output<number>;
    name!: Output<string>;
    trigger_time!: Output<'ON_EVERY_EXECUTION' | 'ON_FAILURE' | 'ON_BACK_TO_SUCCESS'>;
    type!: Output<'SSL_VERIFY'>;
    valid_for_days!: Output<number>;
    website!: Output<string>;
    after_action_id!: Output<number | undefined>;
    disabled!: Output<boolean | undefined>;
    ignore_errors!: Output<boolean | undefined>;
    port!: Output<string | undefined>;
    retry_count!: Output<number | undefined>;
    retry_delay!: Output<number | undefined>;
    run_next_parallel!: Output<boolean | undefined>;
    run_only_on_first_failure!: Output<boolean | undefined>;
    timeout!: Output<number | undefined>;
    trigger_condition!: Output<
        | 'ALWAYS'
        | 'ON_CHANGE'
        | 'ON_CHANGE_AT_PATH'
        | 'VAR_IS'
        | 'VAR_IS_NOT'
        | 'VAR_CONTAINS'
        | 'VAR_NOT_CONTAINS'
        | 'DATETIME'
        | 'SUCCESS_PIPELINE'
        | undefined
    >;
    trigger_condition_paths!: Output<string[] | undefined>;
    trigger_days!: Output<number[] | undefined>;
    trigger_hours!: Output<number[] | undefined>;
    trigger_pipeline_name!: Output<string | undefined>;
    trigger_project_name!: Output<string | undefined>;
    trigger_variable_key!: Output<string | undefined>;
    trigger_variable_value!: Output<string | undefined>;
    variables!: Output<Variable[] | undefined>;
    zone_id!: Output<string | undefined>;

    constructor(name: string, argsOrState: SSLVerifyArgs | SSLVerifyState, opts?: CustomResourceOptions) {
        const inputs: Inputs = {};
        if (!opts) {
            opts = {};
        }

        if (opts.id) {
            const state = argsOrState as SSLVerifyState | undefined;
            inputs['project_name'] = state?.project_name;
            inputs['pipeline_id'] = state?.pipeline_id;
            inputs['name'] = state?.name;
            inputs['trigger_time'] = state?.trigger_time;
            inputs['valid_for_days'] = state?.valid_for_days;
            inputs['website'] = state?.website;
            inputs['after_action_id'] = state?.after_action_id;
            inputs['disabled'] = state?.disabled;
            inputs['ignore_errors'] = state?.ignore_errors;
            inputs['port'] = state?.port;
            inputs['retry_count'] = state?.retry_count;
            inputs['retry_delay'] = state?.retry_delay;
            inputs['run_next_parallel'] = state?.run_next_parallel;
            inputs['run_only_on_first_failure'] = state?.run_only_on_first_failure;
            inputs['timeout'] = state?.timeout;
            inputs['trigger_condition'] = state?.trigger_condition;
            inputs['trigger_condition_paths'] = state?.trigger_condition_paths;
            inputs['trigger_days'] = state?.trigger_days;
            inputs['trigger_hours'] = state?.trigger_hours;
            inputs['trigger_pipeline_name'] = state?.trigger_pipeline_name;
            inputs['trigger_project_name'] = state?.trigger_project_name;
            inputs['trigger_variable_key'] = state?.trigger_variable_key;
            inputs['trigger_variable_value'] = state?.trigger_variable_value;
            inputs['variables'] = state?.variables;
            inputs['zone_id'] = state?.zone_id;
        } else {
            const args = argsOrState as SSLVerifyArgs | undefined;
            if (!args?.project_name) {
                throw new Error('Missing required property "project_name"');
            }

            if (!args?.pipeline_id) {
                throw new Error('Missing required property "pipeline_id"');
            }

            if (!args?.name) {
                throw new Error('Missing required property "name"');
            }

            if (!args?.trigger_time) {
                throw new Error('Missing required property "trigger_time"');
            }

            if (!args?.valid_for_days) {
                throw new Error('Missing required property "valid_for_days"');
            }

            if (!args?.website) {
                throw new Error('Missing required property "website"');
            }

            inputs['name'] = args.name;
            inputs['trigger_time'] = args.trigger_time;
            inputs['valid_for_days'] = args.valid_for_days;
            inputs['website'] = args.website;
            inputs['after_action_id'] = args.after_action_id;
            inputs['disabled'] = args.disabled;
            inputs['ignore_errors'] = args.ignore_errors;
            inputs['port'] = args.port;
            inputs['retry_count'] = args.retry_count;
            inputs['retry_delay'] = args.retry_delay;
            inputs['run_next_parallel'] = args.run_next_parallel;
            inputs['run_only_on_first_failure'] = args.run_only_on_first_failure;
            inputs['timeout'] = args.timeout;
            inputs['trigger_condition'] = args.trigger_condition;
            inputs['trigger_condition_paths'] = args.trigger_condition_paths;
            inputs['trigger_days'] = args.trigger_days;
            inputs['trigger_hours'] = args.trigger_hours;
            inputs['trigger_pipeline_name'] = args.trigger_pipeline_name;
            inputs['trigger_project_name'] = args.trigger_project_name;
            inputs['trigger_variable_key'] = args.trigger_variable_key;
            inputs['trigger_variable_value'] = args.trigger_variable_value;
            inputs['variables'] = args.variables;
            inputs['zone_id'] = args.zone_id;
            inputs['project_name'] = args.project_name;
            inputs['pipeline_id'] = args.pipeline_id;
        }

        if (!opts.version) {
            opts.version = require('../package').version;
        }

        opts.ignoreChanges = ['project_name', 'pipeline_id', ...(opts.ignoreChanges || [])];

        inputs['type'] = 'SSL_VERIFY';
        inputs['url'] = undefined;
        inputs['html_url'] = undefined;
        inputs['action_id'] = undefined;

        super(SSLVerify.__pulumiType, name, inputs, opts);
    }
}
