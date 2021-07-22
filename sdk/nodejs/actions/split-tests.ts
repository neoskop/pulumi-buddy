import { AsInputs } from '@pulumi-utils/sdk';
import { PipelineProps } from '../pipeline';
import { CustomResource, Input, Output, ID, CustomResourceOptions, Inputs } from '@pulumi/pulumi';
import { TriggerCondition, Variable } from '../common';

export interface SplitTestsState {
    project_name: string;
    pipeline_id: number;
    /**
     * The amount of groups to split.
     */
    groups_count: number;

    /**
     * The name of the action.
     */
    name: string;

    /**
     * The path in the filesystem containing files with tests.
     */
    source_path: string;

    /**
     * When set to `true` the action is disabled.  By default it is set to `false`.
     */
    disabled?: boolean;

    /**
     * Defines how test files should be split. Can be one of `BY_FILE_SIZE` or `ALPHABETICALLY`.
     */
    files_order?: 'BY_FILE_SIZE' | 'ALPHABETICALLY';

    /**
     * If set to `true` the execution will proceed, mark action as a warning and jump to the next action. Doesn't apply to deployment actions.
     */
    ignore_errors?: boolean;

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
     * The list of trigger conditions to meet so that the action can be triggered.
     */
    trigger_conditions?: TriggerCondition[];

    /**
     * The list of variables you can use the action.
     */
    variables?: Variable[];
}

export type SplitTestsArgs = AsInputs<SplitTestsState>;

export interface SplitTestsProps {
    url: string;
    html_url: string;
    action_id: number;
    groups_count: number;
    name: string;
    source_path: string;
    type: 'SPLIT_TESTS';
    disabled?: boolean;
    files_order?: 'BY_FILE_SIZE' | 'ALPHABETICALLY';
    ignore_errors?: boolean;
    retry_count?: number;
    retry_delay?: number;
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
export class SplitTests extends CustomResource {
    static __pulumiType = 'buddy:action:SplitTests';

    static get(name: string, id: Input<ID>, state?: Partial<SplitTestsState>, opts?: CustomResourceOptions) {
        return new SplitTests(name, state as any, { ...opts, id });
    }

    static isInstance(obj: any): obj is SplitTests {
        if (null == obj) {
            return false;
        }

        return obj['__pulumiType'] === SplitTests.__pulumiType;
    }

    project_name!: Output<string>;
    pipeline_id!: Output<number>;
    action_id!: Output<number>;
    groups_count!: Output<number>;
    name!: Output<string>;
    source_path!: Output<string>;
    type!: Output<'SPLIT_TESTS'>;
    disabled!: Output<boolean | undefined>;
    files_order!: Output<'BY_FILE_SIZE' | 'ALPHABETICALLY' | undefined>;
    ignore_errors!: Output<boolean | undefined>;
    retry_count!: Output<number | undefined>;
    retry_delay!: Output<number | undefined>;
    run_next_parallel!: Output<boolean | undefined>;
    run_only_on_first_failure!: Output<boolean | undefined>;
    timeout!: Output<number | undefined>;
    trigger_conditions!: Output<TriggerCondition[] | undefined>;
    variables!: Output<Variable[] | undefined>;

    constructor(name: string, argsOrState: SplitTestsArgs | SplitTestsState, opts?: CustomResourceOptions) {
        const inputs: Inputs = {};
        if (!opts) {
            opts = {};
        }

        if (opts.id) {
            const state = argsOrState as SplitTestsState | undefined;
            inputs['project_name'] = state?.project_name;
            inputs['pipeline_id'] = state?.pipeline_id;
            inputs['groups_count'] = state?.groups_count;
            inputs['name'] = state?.name;
            inputs['source_path'] = state?.source_path;
            inputs['disabled'] = state?.disabled;
            inputs['files_order'] = state?.files_order;
            inputs['ignore_errors'] = state?.ignore_errors;
            inputs['retry_count'] = state?.retry_count;
            inputs['retry_delay'] = state?.retry_delay;
            inputs['run_next_parallel'] = state?.run_next_parallel;
            inputs['run_only_on_first_failure'] = state?.run_only_on_first_failure;
            inputs['timeout'] = state?.timeout;
            inputs['trigger_conditions'] = state?.trigger_conditions;
            inputs['variables'] = state?.variables;
        } else {
            const args = argsOrState as SplitTestsArgs | undefined;
            if (!args?.project_name) {
                throw new Error('Missing required property "project_name"');
            }

            if (!args?.pipeline_id) {
                throw new Error('Missing required property "pipeline_id"');
            }

            if (!args?.groups_count) {
                throw new Error('Missing required property "groups_count"');
            }

            if (!args?.name) {
                throw new Error('Missing required property "name"');
            }

            if (!args?.source_path) {
                throw new Error('Missing required property "source_path"');
            }

            inputs['groups_count'] = args.groups_count;
            inputs['name'] = args.name;
            inputs['source_path'] = args.source_path;
            inputs['disabled'] = args.disabled;
            inputs['files_order'] = args.files_order;
            inputs['ignore_errors'] = args.ignore_errors;
            inputs['retry_count'] = args.retry_count;
            inputs['retry_delay'] = args.retry_delay;
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

        inputs['type'] = 'SPLIT_TESTS';
        inputs['url'] = undefined;
        inputs['html_url'] = undefined;
        inputs['action_id'] = undefined;

        super(SplitTests.__pulumiType, name, inputs, opts);
    }
}
