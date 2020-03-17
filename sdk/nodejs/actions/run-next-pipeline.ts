import { AsInputs } from '@neoskop/pulumi-utils-sdk';
import { PipelineProps } from '../pipeline';
import { CustomResource, Input, Output, ID, CustomResourceOptions, Inputs } from '@pulumi/pulumi';
import { PipelineRef, Variable } from '../common';

export interface ActionRunNextPipelineState {
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
     * Can be one of `HEAD` or `INHERIT`.
     */
    revision: 'HEAD' | 'INHERIT';

    /**
     * Specifies when the action should be executed. Can be one of `ON_EVERY_EXECUTION`, `ON_FAILURE` or `ON_BACK_TO_SUCCESS`. The default value is `ON_EVERY_EXECUTION`.
     */
    trigger_time: 'ON_EVERY_EXECUTION' | 'ON_FAILURE' | 'ON_BACK_TO_SUCCESS';

    /**
     * The numerical ID of the action, after which this action should be added.
     */
    after_action_id?: number;

    /**
     * The next pipeline execution comment.
     */
    comment?: string;

    /**
     * When set to `true` the action is disabled.  By default it is set to `false`.
     */
    disabled?: boolean;

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

export type ActionRunNextPipelineArgs = AsInputs<ActionRunNextPipelineState>;

export interface ActionRunNextPipelineProps {
    url: string;
    html_url: string;
    action_id: number;
    name: string;
    next_pipeline: PipelineRef;
    revision: 'HEAD' | 'INHERIT';
    trigger_time: 'ON_EVERY_EXECUTION' | 'ON_FAILURE' | 'ON_BACK_TO_SUCCESS';
    type: 'RUN_NEXT_PIPELINE';
    after_action_id?: number;
    comment?: string;
    disabled?: boolean;
    run_next_parallel?: boolean;
    run_only_on_first_failure?: boolean;
    timeout?: number;
    trigger_condition?: 'ALWAYS' | 'ON_CHANGE' | 'ON_CHANGE_AT_PATH' | 'VAR_IS' | 'VAR_IS_NOT' | 'VAR_CONTAINS';
    trigger_condition_paths?: string[];
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
export class RunNextPipeline extends CustomResource {
    static __pulumiType = 'buddy:action:RunNextPipeline';

    static get(name: string, id: Input<ID>, state?: Partial<ActionRunNextPipelineState>, opts?: CustomResourceOptions) {
        return new RunNextPipeline(name, state as any, { ...opts, id });
    }

    static isInstance(obj: any): obj is RunNextPipeline {
        if (null == obj) {
            return false;
        }

        return obj['__pulumiType'] === RunNextPipeline.__pulumiType;
    }

    project_name!: Output<string>;
    pipeline_id!: Output<number>;
    action_id!: Output<number>;
    name!: Output<string>;
    next_pipeline!: Output<PipelineRef>;
    revision!: Output<'HEAD' | 'INHERIT'>;
    trigger_time!: Output<'ON_EVERY_EXECUTION' | 'ON_FAILURE' | 'ON_BACK_TO_SUCCESS'>;
    type!: Output<'RUN_NEXT_PIPELINE'>;
    after_action_id!: Output<number | undefined>;
    comment!: Output<string | undefined>;
    disabled!: Output<boolean | undefined>;
    run_next_parallel!: Output<boolean | undefined>;
    run_only_on_first_failure!: Output<boolean | undefined>;
    timeout!: Output<number | undefined>;
    trigger_condition!: Output<'ALWAYS' | 'ON_CHANGE' | 'ON_CHANGE_AT_PATH' | 'VAR_IS' | 'VAR_IS_NOT' | 'VAR_CONTAINS' | undefined>;
    trigger_condition_paths!: Output<string[] | undefined>;
    trigger_variable_key!: Output<string | undefined>;
    trigger_variable_value!: Output<string | undefined>;
    variables!: Output<Variable[] | undefined>;

    constructor(name: string, argsOrState: ActionRunNextPipelineArgs | ActionRunNextPipelineState, opts?: CustomResourceOptions) {
        const inputs: Inputs = {};
        if (!opts) {
            opts = {};
        }

        if (opts.id) {
            const state = argsOrState as ActionRunNextPipelineState | undefined;
            inputs['project_name'] = state?.project_name;
            inputs['pipeline_id'] = state?.pipeline_id;
            inputs['name'] = state?.name;
            inputs['next_pipeline'] = state?.next_pipeline;
            inputs['revision'] = state?.revision;
            inputs['trigger_time'] = state?.trigger_time;
            inputs['after_action_id'] = state?.after_action_id;
            inputs['comment'] = state?.comment;
            inputs['disabled'] = state?.disabled;
            inputs['run_next_parallel'] = state?.run_next_parallel;
            inputs['run_only_on_first_failure'] = state?.run_only_on_first_failure;
            inputs['timeout'] = state?.timeout;
            inputs['trigger_condition'] = state?.trigger_condition;
            inputs['trigger_condition_paths'] = state?.trigger_condition_paths;
            inputs['trigger_variable_key'] = state?.trigger_variable_key;
            inputs['trigger_variable_value'] = state?.trigger_variable_value;
            inputs['variables'] = state?.variables;
        } else {
            const args = argsOrState as ActionRunNextPipelineArgs | undefined;
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

            if (!args?.revision) {
                throw new Error('Missing required property "revision"');
            }

            if (!args?.trigger_time) {
                throw new Error('Missing required property "trigger_time"');
            }

            inputs['name'] = args.name;
            inputs['next_pipeline'] = args.next_pipeline;
            inputs['revision'] = args.revision;
            inputs['trigger_time'] = args.trigger_time;
            inputs['after_action_id'] = args.after_action_id;
            inputs['comment'] = args.comment;
            inputs['disabled'] = args.disabled;
            inputs['run_next_parallel'] = args.run_next_parallel;
            inputs['run_only_on_first_failure'] = args.run_only_on_first_failure;
            inputs['timeout'] = args.timeout;
            inputs['trigger_condition'] = args.trigger_condition;
            inputs['trigger_condition_paths'] = args.trigger_condition_paths;
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

        inputs['type'] = 'RUN_NEXT_PIPELINE';
        inputs['url'] = undefined;
        inputs['html_url'] = undefined;
        inputs['action_id'] = undefined;

        super(RunNextPipeline.__pulumiType, name, inputs, opts);
    }
}
