import { AsInputs } from '@pulumi-utils/sdk';
import { PipelineProps } from '../pipeline';
import { CustomResource, Input, Output, ID, CustomResourceOptions, Inputs } from '@pulumi/pulumi';
import { Variable } from '../common';

export interface LighthouseState {
    project_name: string;
    pipeline_id: number;
    /**
     * Values from 0 to 100 are accepted. The action returns an error if the score is below the values that are set.
     */
    accessibility: number;

    /**
     * Values from 0 to 100 are accepted. The action returns an error if the score is below the values that are set.
     */
    best_practices: number;

    /**
     * The device on which the audit will be run. Can be one of `mobile`, `desktop` and `mobileDesktop`.
     */
    device: string;

    /**
     * The name of the action.
     */
    name: string;

    /**
     * Values from 0 to 100 are accepted. The action returns an error if the score is below the values that are set.
     */
    performance: number;

    /**
     * Values from 0 to 100 are accepted. The action returns an error if the score is below the values that are set.
     */
    seo: number;

    /**
     * Specifies when the action should be executed. Can be one of `ON_EVERY_EXECUTION`, `ON_FAILURE` or `ON_BACK_TO_SUCCESS`. The default value is `ON_EVERY_EXECUTION`.
     */
    trigger_time: 'ON_EVERY_EXECUTION' | 'ON_FAILURE' | 'ON_BACK_TO_SUCCESS';

    /**
     * The address of the site on which the audit should run.
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

export type LighthouseArgs = AsInputs<LighthouseState>;

export interface LighthouseProps {
    url: string;
    html_url: string;
    action_id: number;
    accessibility: number;
    best_practices: number;
    device: string;
    name: string;
    performance: number;
    seo: number;
    trigger_time: 'ON_EVERY_EXECUTION' | 'ON_FAILURE' | 'ON_BACK_TO_SUCCESS';
    type: 'LIGHTHOUSE';
    website: string;
    after_action_id?: number;
    disabled?: boolean;
    ignore_errors?: boolean;
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
export class Lighthouse extends CustomResource {
    static __pulumiType = 'buddy:action:Lighthouse';

    static get(name: string, id: Input<ID>, state?: Partial<LighthouseState>, opts?: CustomResourceOptions) {
        return new Lighthouse(name, state as any, { ...opts, id });
    }

    static isInstance(obj: any): obj is Lighthouse {
        if (null == obj) {
            return false;
        }

        return obj['__pulumiType'] === Lighthouse.__pulumiType;
    }

    project_name!: Output<string>;
    pipeline_id!: Output<number>;
    action_id!: Output<number>;
    accessibility!: Output<number>;
    best_practices!: Output<number>;
    device!: Output<string>;
    name!: Output<string>;
    performance!: Output<number>;
    seo!: Output<number>;
    trigger_time!: Output<'ON_EVERY_EXECUTION' | 'ON_FAILURE' | 'ON_BACK_TO_SUCCESS'>;
    type!: Output<'LIGHTHOUSE'>;
    website!: Output<string>;
    after_action_id!: Output<number | undefined>;
    disabled!: Output<boolean | undefined>;
    ignore_errors!: Output<boolean | undefined>;
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

    constructor(name: string, argsOrState: LighthouseArgs | LighthouseState, opts?: CustomResourceOptions) {
        const inputs: Inputs = {};
        if (!opts) {
            opts = {};
        }

        if (opts.id) {
            const state = argsOrState as LighthouseState | undefined;
            inputs['project_name'] = state?.project_name;
            inputs['pipeline_id'] = state?.pipeline_id;
            inputs['accessibility'] = state?.accessibility;
            inputs['best_practices'] = state?.best_practices;
            inputs['device'] = state?.device;
            inputs['name'] = state?.name;
            inputs['performance'] = state?.performance;
            inputs['seo'] = state?.seo;
            inputs['trigger_time'] = state?.trigger_time;
            inputs['website'] = state?.website;
            inputs['after_action_id'] = state?.after_action_id;
            inputs['disabled'] = state?.disabled;
            inputs['ignore_errors'] = state?.ignore_errors;
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
            const args = argsOrState as LighthouseArgs | undefined;
            if (!args?.project_name) {
                throw new Error('Missing required property "project_name"');
            }

            if (!args?.pipeline_id) {
                throw new Error('Missing required property "pipeline_id"');
            }

            if (!args?.accessibility) {
                throw new Error('Missing required property "accessibility"');
            }

            if (!args?.best_practices) {
                throw new Error('Missing required property "best_practices"');
            }

            if (!args?.device) {
                throw new Error('Missing required property "device"');
            }

            if (!args?.name) {
                throw new Error('Missing required property "name"');
            }

            if (!args?.performance) {
                throw new Error('Missing required property "performance"');
            }

            if (!args?.seo) {
                throw new Error('Missing required property "seo"');
            }

            if (!args?.trigger_time) {
                throw new Error('Missing required property "trigger_time"');
            }

            if (!args?.website) {
                throw new Error('Missing required property "website"');
            }

            inputs['accessibility'] = args.accessibility;
            inputs['best_practices'] = args.best_practices;
            inputs['device'] = args.device;
            inputs['name'] = args.name;
            inputs['performance'] = args.performance;
            inputs['seo'] = args.seo;
            inputs['trigger_time'] = args.trigger_time;
            inputs['website'] = args.website;
            inputs['after_action_id'] = args.after_action_id;
            inputs['disabled'] = args.disabled;
            inputs['ignore_errors'] = args.ignore_errors;
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

        inputs['type'] = 'LIGHTHOUSE';
        inputs['url'] = undefined;
        inputs['html_url'] = undefined;
        inputs['action_id'] = undefined;

        super(Lighthouse.__pulumiType, name, inputs, opts);
    }
}
