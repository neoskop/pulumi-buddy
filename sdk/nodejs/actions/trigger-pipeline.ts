import { AsInputs } from '@pulumi-utils/sdk';
import { PipelineProps } from '../pipeline';
import { CustomResource, Input, Output, ID, CustomResourceOptions, Inputs } from '@pulumi/pulumi';
import { PipelineRef, ExecutionPriority, TriggerCondition, Variable } from '../common';

export interface TriggerPipelineState {
    project_name: string;
    pipeline_id: number;
    /**
     * The name of the action.
     */
    name: string;

    /**
     * The next pipeline that will be executed.
     */
    next_pipeline: PipelineRef;

    /**
     * Specifies when the action should be executed. Can be one of `ON_EVERY_EXECUTION`, `ON_FAILURE` or `ON_BACK_TO_SUCCESS`. The default value is `ON_EVERY_EXECUTION`.
     */
    trigger_time: 'ON_EVERY_EXECUTION' | 'ON_FAILURE' | 'ON_BACK_TO_SUCCESS';

    /**
     * The numerical ID of the action, after which this action should be added.
     */
    after_action_id?: number;

    /**
     * Set to `true` if you want the execution to run with the `clear_cache` flag. Default is `false`.
     */
    clear_cache?: boolean;

    /**
     * The next pipeline execution comment.
     */
    comment?: string;

    /**
     * When set to 'true' the action is disabled.  By default it is set to 'false'.
     */
    disabled?: boolean;

    /**
     * If set to 'true' the execution will proceed, mark action as a warning and jump to the next action. Doesn't apply to deployment actions.
     */
    ignore_errors?: boolean;

    /**
     * Set if you want the execution to run with priority other than set in the next pipeline. Can be one of `LOW`, `NORMAL` or `HIGH`.
     */
    priority?: ExecutionPriority;

    /**
     * Set to `true` if you want the execution to run from scratch. Default is `false`.
     */
    refresh?: boolean;

    /**
     * Number of retries if the action fails.
     */
    retry_count?: number;

    /**
     * Delay time between auto retries in seconds.
     */
    retry_interval?: number;

    /**
     * Can be one of `HEAD`, `INHERIT`or `SPECIFIC`. Default is `HEAD`.
     */
    revision?: string;

    /**
     * When set to 'true', the subsequent action defined in the pipeline will run in parallel to the current action.
     */
    run_next_parallel?: boolean;

    /**
     * Defines whether the action should be executed on each failure. Restricted to and required if the 'trigger_time' is 'ON_FAILURE'.
     */
    run_only_on_first_failure?: boolean;

    /**
     * Set if you want to run the pipeline for a specific revision or ref.
     */
    specific_revision?: string;

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

    /**
     * Pause execution until triggered pipeline has finished
     */
    wait?: boolean;
}

export type TriggerPipelineArgs = AsInputs<TriggerPipelineState>;

export interface TriggerPipelineProps {
    url: string;
    html_url: string;
    action_id: number;
    name: string;
    next_pipeline: PipelineRef;
    trigger_time: 'ON_EVERY_EXECUTION' | 'ON_FAILURE' | 'ON_BACK_TO_SUCCESS';
    type: 'RUN_NEXT_PIPELINE';
    after_action_id?: number;
    clear_cache?: boolean;
    comment?: string;
    disabled?: boolean;
    ignore_errors?: boolean;
    priority?: ExecutionPriority;
    refresh?: boolean;
    retry_count?: number;
    retry_interval?: number;
    revision?: string;
    run_next_parallel?: boolean;
    run_only_on_first_failure?: boolean;
    specific_revision?: string;
    timeout?: number;
    trigger_conditions?: TriggerCondition[];
    variables?: Variable[];
    wait?: boolean;
    pipeline: PipelineProps;
    project_name: string;
    pipeline_id: number;
}

/**
 * Required scopes in Buddy API: `WORKSPACE`, `EXECUTION_MANAGE`, `EXECUTION_INFO`
 */
export class TriggerPipeline extends CustomResource {
    static __pulumiType = 'buddy:action:TriggerPipeline';

    static get(name: string, id: Input<ID>, state?: Partial<TriggerPipelineState>, opts?: CustomResourceOptions) {
        return new TriggerPipeline(name, state as any, { ...opts, id });
    }

    static isInstance(obj: any): obj is TriggerPipeline {
        if (null == obj) {
            return false;
        }

        return obj['__pulumiType'] === TriggerPipeline.__pulumiType;
    }

    project_name!: Output<string>;
    pipeline_id!: Output<number>;
    action_id!: Output<number>;
    name!: Output<string>;
    next_pipeline!: Output<PipelineRef>;
    trigger_time!: Output<'ON_EVERY_EXECUTION' | 'ON_FAILURE' | 'ON_BACK_TO_SUCCESS'>;
    type!: Output<'RUN_NEXT_PIPELINE'>;
    after_action_id!: Output<number | undefined>;
    clear_cache!: Output<boolean | undefined>;
    comment!: Output<string | undefined>;
    disabled!: Output<boolean | undefined>;
    ignore_errors!: Output<boolean | undefined>;
    priority!: Output<ExecutionPriority | undefined>;
    refresh!: Output<boolean | undefined>;
    retry_count!: Output<number | undefined>;
    retry_interval!: Output<number | undefined>;
    revision!: Output<string | undefined>;
    run_next_parallel!: Output<boolean | undefined>;
    run_only_on_first_failure!: Output<boolean | undefined>;
    specific_revision!: Output<string | undefined>;
    timeout!: Output<number | undefined>;
    trigger_conditions!: Output<TriggerCondition[] | undefined>;
    variables!: Output<Variable[] | undefined>;
    wait!: Output<boolean | undefined>;

    constructor(name: string, argsOrState: TriggerPipelineArgs | TriggerPipelineState, opts?: CustomResourceOptions) {
        const inputs: Inputs = {};
        if (!opts) {
            opts = {};
        }

        if (opts.id) {
            const state = argsOrState as TriggerPipelineState | undefined;
            inputs['project_name'] = state?.project_name;
            inputs['pipeline_id'] = state?.pipeline_id;
            inputs['name'] = state?.name;
            inputs['next_pipeline'] = state?.next_pipeline;
            inputs['trigger_time'] = state?.trigger_time;
            inputs['after_action_id'] = state?.after_action_id;
            inputs['clear_cache'] = state?.clear_cache;
            inputs['comment'] = state?.comment;
            inputs['disabled'] = state?.disabled;
            inputs['ignore_errors'] = state?.ignore_errors;
            inputs['priority'] = state?.priority;
            inputs['refresh'] = state?.refresh;
            inputs['retry_count'] = state?.retry_count;
            inputs['retry_interval'] = state?.retry_interval;
            inputs['revision'] = state?.revision;
            inputs['run_next_parallel'] = state?.run_next_parallel;
            inputs['run_only_on_first_failure'] = state?.run_only_on_first_failure;
            inputs['specific_revision'] = state?.specific_revision;
            inputs['timeout'] = state?.timeout;
            inputs['trigger_conditions'] = state?.trigger_conditions;
            inputs['variables'] = state?.variables;
            inputs['wait'] = state?.wait;
        } else {
            const args = argsOrState as TriggerPipelineArgs | undefined;
            if (!args?.project_name) {
                throw new Error('Missing required property "project_name"');
            }

            if (!args?.pipeline_id) {
                throw new Error('Missing required property "pipeline_id"');
            }

            if (!args?.name) {
                throw new Error('Missing required property "name"');
            }

            if (!args?.next_pipeline) {
                throw new Error('Missing required property "next_pipeline"');
            }

            if (!args?.trigger_time) {
                throw new Error('Missing required property "trigger_time"');
            }

            inputs['name'] = args.name;
            inputs['next_pipeline'] = args.next_pipeline;
            inputs['trigger_time'] = args.trigger_time;
            inputs['after_action_id'] = args.after_action_id;
            inputs['clear_cache'] = args.clear_cache;
            inputs['comment'] = args.comment;
            inputs['disabled'] = args.disabled;
            inputs['ignore_errors'] = args.ignore_errors;
            inputs['priority'] = args.priority;
            inputs['refresh'] = args.refresh;
            inputs['retry_count'] = args.retry_count;
            inputs['retry_interval'] = args.retry_interval;
            inputs['revision'] = args.revision;
            inputs['run_next_parallel'] = args.run_next_parallel;
            inputs['run_only_on_first_failure'] = args.run_only_on_first_failure;
            inputs['specific_revision'] = args.specific_revision;
            inputs['timeout'] = args.timeout;
            inputs['trigger_conditions'] = args.trigger_conditions;
            inputs['variables'] = args.variables;
            inputs['wait'] = args.wait;
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

        inputs['type'] = 'RUN_NEXT_PIPELINE';
        inputs['url'] = undefined;
        inputs['html_url'] = undefined;
        inputs['action_id'] = undefined;

        super(TriggerPipeline.__pulumiType, name, inputs, opts);
    }
}
