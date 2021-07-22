import { AsInputs } from '@pulumi-utils/sdk';
import { PipelineProps } from '../pipeline';
import { CustomResource, Input, Output, ID, CustomResourceOptions, Inputs } from '@pulumi/pulumi';
import { SyncPath, TriggerCondition, Variable } from '../common';

export interface WindowsState {
    project_name: string;
    pipeline_id: number;
    /**
     * The commands that will be executed.
     */
    commands: string[];

    /**
     * The name of the action.
     */
    name: string;

    /**
     * The directory in which the pipeline filesystem will be mounted.
     */
    working_directory: string;

    /**
     * When set to `true` the action is disabled.  By default it is set to `false`.
     */
    disabled?: boolean;

    /**
     * If set to `true` all commands will be executed regardless of the result of the previous command.
     */
    execute_every_command?: boolean;

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
     * Define file paths that should be copied before `PIPELINE_TO_VM` and after the execution `VM_TO_PIPELINE`.
     */
    sync_paths?: SyncPath[];

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

export type WindowsArgs = AsInputs<WindowsState>;

export interface WindowsProps {
    url: string;
    html_url: string;
    action_id: number;
    commands: string[];
    name: string;
    type: 'NATIVE_BUILD_WINDOWS';
    working_directory: string;
    disabled?: boolean;
    execute_every_command?: boolean;
    ignore_errors?: boolean;
    retry_count?: number;
    retry_delay?: number;
    run_next_parallel?: boolean;
    run_only_on_first_failure?: boolean;
    sync_paths?: SyncPath[];
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
export class Windows extends CustomResource {
    static __pulumiType = 'buddy:action:Windows';

    static get(name: string, id: Input<ID>, state?: Partial<WindowsState>, opts?: CustomResourceOptions) {
        return new Windows(name, state as any, { ...opts, id });
    }

    static isInstance(obj: any): obj is Windows {
        if (null == obj) {
            return false;
        }

        return obj['__pulumiType'] === Windows.__pulumiType;
    }

    project_name!: Output<string>;
    pipeline_id!: Output<number>;
    action_id!: Output<number>;
    commands!: Output<string[]>;
    name!: Output<string>;
    type!: Output<'NATIVE_BUILD_WINDOWS'>;
    working_directory!: Output<string>;
    disabled!: Output<boolean | undefined>;
    execute_every_command!: Output<boolean | undefined>;
    ignore_errors!: Output<boolean | undefined>;
    retry_count!: Output<number | undefined>;
    retry_delay!: Output<number | undefined>;
    run_next_parallel!: Output<boolean | undefined>;
    run_only_on_first_failure!: Output<boolean | undefined>;
    sync_paths!: Output<SyncPath[] | undefined>;
    timeout!: Output<number | undefined>;
    trigger_conditions!: Output<TriggerCondition[] | undefined>;
    variables!: Output<Variable[] | undefined>;

    constructor(name: string, argsOrState: WindowsArgs | WindowsState, opts?: CustomResourceOptions) {
        const inputs: Inputs = {};
        if (!opts) {
            opts = {};
        }

        if (opts.id) {
            const state = argsOrState as WindowsState | undefined;
            inputs['project_name'] = state?.project_name;
            inputs['pipeline_id'] = state?.pipeline_id;
            inputs['commands'] = state?.commands;
            inputs['name'] = state?.name;
            inputs['working_directory'] = state?.working_directory;
            inputs['disabled'] = state?.disabled;
            inputs['execute_every_command'] = state?.execute_every_command;
            inputs['ignore_errors'] = state?.ignore_errors;
            inputs['retry_count'] = state?.retry_count;
            inputs['retry_delay'] = state?.retry_delay;
            inputs['run_next_parallel'] = state?.run_next_parallel;
            inputs['run_only_on_first_failure'] = state?.run_only_on_first_failure;
            inputs['sync_paths'] = state?.sync_paths;
            inputs['timeout'] = state?.timeout;
            inputs['trigger_conditions'] = state?.trigger_conditions;
            inputs['variables'] = state?.variables;
        } else {
            const args = argsOrState as WindowsArgs | undefined;
            if (!args?.project_name) {
                throw new Error('Missing required property "project_name"');
            }

            if (!args?.pipeline_id) {
                throw new Error('Missing required property "pipeline_id"');
            }

            if (!args?.commands) {
                throw new Error('Missing required property "commands"');
            }

            if (!args?.name) {
                throw new Error('Missing required property "name"');
            }

            if (!args?.working_directory) {
                throw new Error('Missing required property "working_directory"');
            }

            inputs['commands'] = args.commands;
            inputs['name'] = args.name;
            inputs['working_directory'] = args.working_directory;
            inputs['disabled'] = args.disabled;
            inputs['execute_every_command'] = args.execute_every_command;
            inputs['ignore_errors'] = args.ignore_errors;
            inputs['retry_count'] = args.retry_count;
            inputs['retry_delay'] = args.retry_delay;
            inputs['run_next_parallel'] = args.run_next_parallel;
            inputs['run_only_on_first_failure'] = args.run_only_on_first_failure;
            inputs['sync_paths'] = args.sync_paths;
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

        inputs['type'] = 'NATIVE_BUILD_WINDOWS';
        inputs['url'] = undefined;
        inputs['html_url'] = undefined;
        inputs['action_id'] = undefined;

        super(Windows.__pulumiType, name, inputs, opts);
    }
}
