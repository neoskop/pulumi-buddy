import { AsInputs } from '../utils';
import { PipelineProps } from '../pipeline';
import { CustomResource, Input, Output, ID, CustomResourceOptions, Inputs } from '@pulumi/pulumi';
import { Variable } from '../common';

export interface ActionSplitTestsState {
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
     * The numerical ID of the action, after which this action should be added.
     */
    after_action_id?: number;

    /**
     * When set to `true` the action is disabled.  By default it is set to `false`.
     */
    disabled?: boolean;

    /**
     * Defines how test files should be split. Can be one of `BY_FILE_SIZE` or `ALPHABETICALLY`.
     */
    files_order?: 'BY_FILE_SIZE' | 'ALPHABETICALLY';

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

export type ActionSplitTestsArgs = AsInputs<ActionSplitTestsState>;

export interface ActionSplitTestsProps {
    url: string;
    html_url: string;
    action_id: number;
    groups_count: number;
    name: string;
    source_path: string;
    type: 'SPLIT_TESTS';
    after_action_id?: number;
    disabled?: boolean;
    files_order?: 'BY_FILE_SIZE' | 'ALPHABETICALLY';
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
export class SplitTests extends CustomResource {
    static __pulumiType = 'buddy:action:SplitTests';

    static get(name: string, id: Input<ID>, state?: Partial<ActionSplitTestsState>, opts?: CustomResourceOptions) {
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
    after_action_id!: Output<number | undefined>;
    disabled!: Output<boolean | undefined>;
    files_order!: Output<'BY_FILE_SIZE' | 'ALPHABETICALLY' | undefined>;
    run_next_parallel!: Output<boolean | undefined>;
    run_only_on_first_failure!: Output<boolean | undefined>;
    timeout!: Output<number | undefined>;
    trigger_condition!: Output<'ALWAYS' | 'ON_CHANGE' | 'ON_CHANGE_AT_PATH' | 'VAR_IS' | 'VAR_IS_NOT' | 'VAR_CONTAINS' | undefined>;
    trigger_condition_paths!: Output<string[] | undefined>;
    trigger_time!: Output<'ON_EVERY_EXECUTION' | 'ON_FAILURE' | 'ON_BACK_TO_SUCCESS' | undefined>;
    trigger_variable_key!: Output<string | undefined>;
    trigger_variable_value!: Output<string | undefined>;
    variables!: Output<Variable[] | undefined>;

    constructor(name: string, argsOrState: ActionSplitTestsArgs | ActionSplitTestsState, opts?: CustomResourceOptions) {
        const inputs: Inputs = {};
        if (!opts) {
            opts = {};
        }

        if (opts.id) {
            const state = argsOrState as ActionSplitTestsState | undefined;
            inputs['project_name'] = state?.project_name;
            inputs['pipeline_id'] = state?.pipeline_id;
            inputs['groups_count'] = state?.groups_count;
            inputs['name'] = state?.name;
            inputs['source_path'] = state?.source_path;
            inputs['after_action_id'] = state?.after_action_id;
            inputs['disabled'] = state?.disabled;
            inputs['files_order'] = state?.files_order;
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
            const args = argsOrState as ActionSplitTestsArgs | undefined;
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
            inputs['after_action_id'] = args.after_action_id;
            inputs['disabled'] = args.disabled;
            inputs['files_order'] = args.files_order;
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

        inputs['type'] = 'SPLIT_TESTS';
        inputs['url'] = undefined;
        inputs['html_url'] = undefined;
        inputs['action_id'] = undefined;

        super(SplitTests.__pulumiType, name, inputs, opts);
    }
}