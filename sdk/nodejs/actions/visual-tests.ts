import { AsInputs } from '@pulumi-utils/sdk';
import { PipelineProps } from '../pipeline';
import { CustomResource, Input, Output, ID, CustomResourceOptions, Inputs } from '@pulumi/pulumi';
import { Screenshot, Header, PipelinePermissions, TriggerCondition, Variable } from '../common';

export interface VisualTestsState {
    project_name: string;
    pipeline_id: number;
    /**
     * Defines which browser will be used in tests. Can be one of `CHROME` or `FIREFOX`.
     */
    browser_type: 'CHROME' | 'FIREFOX';

    /**
     * The number of items that should be kept in history.
     */
    images_history_limit: number;

    /**
     * The name of the action.
     */
    name: string;

    /**
     * The acceptable level of pixel tolerance. Allowed number of decimal places is two.
     */
    pixel_tolerance_level: number;

    /**
     * Resolution height.
     */
    resolution_height: number;

    /**
     * Resolution width.
     */
    resolution_width: number;

    /**
     * Defines the URLs of the sites that will be tested. Contains information about baseline, headers and excluded areas.
     */
    screenshots: Screenshot[];

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
     * The headers that will be sent with the request.
     */
    headers?: Header[];

    /**
     * If set to 'true' the execution will proceed, mark action as a warning and jump to the next action. Doesn't apply to deployment actions.
     */
    ignore_errors?: boolean;

    /**
     * Define to set permissions for the action.
     */
    permissions?: PipelinePermissions;

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

export type VisualTestsArgs = AsInputs<VisualTestsState>;

export interface VisualTestsProps {
    url: string;
    html_url: string;
    action_id: number;
    browser_type: 'CHROME' | 'FIREFOX';
    images_history_limit: number;
    name: string;
    pixel_tolerance_level: number;
    resolution_height: number;
    resolution_width: number;
    screenshots: Screenshot[];
    trigger_time: 'ON_EVERY_EXECUTION' | 'ON_FAILURE' | 'ON_BACK_TO_SUCCESS';
    type: 'VISUAL_TESTS';
    after_action_id?: number;
    disabled?: boolean;
    headers?: Header[];
    ignore_errors?: boolean;
    permissions?: PipelinePermissions;
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
export class VisualTests extends CustomResource {
    static __pulumiType = 'buddy:action:VisualTests';

    static get(name: string, id: Input<ID>, state?: Partial<VisualTestsState>, opts?: CustomResourceOptions) {
        return new VisualTests(name, state as any, { ...opts, id });
    }

    static isInstance(obj: any): obj is VisualTests {
        if (null == obj) {
            return false;
        }

        return obj['__pulumiType'] === VisualTests.__pulumiType;
    }

    project_name!: Output<string>;
    pipeline_id!: Output<number>;
    action_id!: Output<number>;
    browser_type!: Output<'CHROME' | 'FIREFOX'>;
    images_history_limit!: Output<number>;
    name!: Output<string>;
    pixel_tolerance_level!: Output<number>;
    resolution_height!: Output<number>;
    resolution_width!: Output<number>;
    screenshots!: Output<Screenshot[]>;
    trigger_time!: Output<'ON_EVERY_EXECUTION' | 'ON_FAILURE' | 'ON_BACK_TO_SUCCESS'>;
    type!: Output<'VISUAL_TESTS'>;
    after_action_id!: Output<number | undefined>;
    disabled!: Output<boolean | undefined>;
    headers!: Output<Header[] | undefined>;
    ignore_errors!: Output<boolean | undefined>;
    permissions!: Output<PipelinePermissions | undefined>;
    retry_count!: Output<number | undefined>;
    retry_interval!: Output<number | undefined>;
    run_next_parallel!: Output<boolean | undefined>;
    run_only_on_first_failure!: Output<boolean | undefined>;
    timeout!: Output<number | undefined>;
    trigger_conditions!: Output<TriggerCondition[] | undefined>;
    variables!: Output<Variable[] | undefined>;

    constructor(name: string, argsOrState: VisualTestsArgs | VisualTestsState, opts?: CustomResourceOptions) {
        const inputs: Inputs = {};
        if (!opts) {
            opts = {};
        }

        if (opts.id) {
            const state = argsOrState as VisualTestsState | undefined;
            inputs['project_name'] = state?.project_name;
            inputs['pipeline_id'] = state?.pipeline_id;
            inputs['browser_type'] = state?.browser_type;
            inputs['images_history_limit'] = state?.images_history_limit;
            inputs['name'] = state?.name;
            inputs['pixel_tolerance_level'] = state?.pixel_tolerance_level;
            inputs['resolution_height'] = state?.resolution_height;
            inputs['resolution_width'] = state?.resolution_width;
            inputs['screenshots'] = state?.screenshots;
            inputs['trigger_time'] = state?.trigger_time;
            inputs['after_action_id'] = state?.after_action_id;
            inputs['disabled'] = state?.disabled;
            inputs['headers'] = state?.headers;
            inputs['ignore_errors'] = state?.ignore_errors;
            inputs['permissions'] = state?.permissions;
            inputs['retry_count'] = state?.retry_count;
            inputs['retry_interval'] = state?.retry_interval;
            inputs['run_next_parallel'] = state?.run_next_parallel;
            inputs['run_only_on_first_failure'] = state?.run_only_on_first_failure;
            inputs['timeout'] = state?.timeout;
            inputs['trigger_conditions'] = state?.trigger_conditions;
            inputs['variables'] = state?.variables;
        } else {
            const args = argsOrState as VisualTestsArgs | undefined;
            if (!args?.project_name) {
                throw new Error('Missing required property "project_name"');
            }

            if (!args?.pipeline_id) {
                throw new Error('Missing required property "pipeline_id"');
            }

            if (!args?.browser_type) {
                throw new Error('Missing required property "browser_type"');
            }

            if (!args?.images_history_limit) {
                throw new Error('Missing required property "images_history_limit"');
            }

            if (!args?.name) {
                throw new Error('Missing required property "name"');
            }

            if (!args?.pixel_tolerance_level) {
                throw new Error('Missing required property "pixel_tolerance_level"');
            }

            if (!args?.resolution_height) {
                throw new Error('Missing required property "resolution_height"');
            }

            if (!args?.resolution_width) {
                throw new Error('Missing required property "resolution_width"');
            }

            if (!args?.screenshots) {
                throw new Error('Missing required property "screenshots"');
            }

            if (!args?.trigger_time) {
                throw new Error('Missing required property "trigger_time"');
            }

            inputs['browser_type'] = args.browser_type;
            inputs['images_history_limit'] = args.images_history_limit;
            inputs['name'] = args.name;
            inputs['pixel_tolerance_level'] = args.pixel_tolerance_level;
            inputs['resolution_height'] = args.resolution_height;
            inputs['resolution_width'] = args.resolution_width;
            inputs['screenshots'] = args.screenshots;
            inputs['trigger_time'] = args.trigger_time;
            inputs['after_action_id'] = args.after_action_id;
            inputs['disabled'] = args.disabled;
            inputs['headers'] = args.headers;
            inputs['ignore_errors'] = args.ignore_errors;
            inputs['permissions'] = args.permissions;
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

        if (null == opts.deleteBeforeReplace) {
            opts.deleteBeforeReplace = true;
        }

        opts.ignoreChanges = ['project_name', 'pipeline_id', ...(opts.ignoreChanges || [])];

        inputs['type'] = 'VISUAL_TESTS';
        inputs['url'] = undefined;
        inputs['html_url'] = undefined;
        inputs['action_id'] = undefined;

        super(VisualTests.__pulumiType, name, inputs, opts);
    }
}
