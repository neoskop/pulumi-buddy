import { AsInputs } from '@pulumi-utils/sdk';
import { PipelineProps } from '../pipeline';
import { CustomResource, Input, Output, ID, CustomResourceOptions, Inputs } from '@pulumi/pulumi';
import { Ami, SyncPath, TriggerCondition, Variable } from '../common';

export interface LinuxState {
    project_name: string;
    pipeline_id: number;
    /**
     * The commands that will be executed.
     */
    commands: string[];

    /**
     * Defines the image used to create the VM. Use `UBUNTU_20_04` for the default image, `AMI` for a custom AMI.
     */
    distribution: string;

    /**
     * Specifies when the action should be executed. Can be one of `ON_EVERY_EXECUTION`, `ON_FAILURE` or `ON_BACK_TO_SUCCESS`. The default value is `ON_EVERY_EXECUTION`.
     */
    trigger_time: 'ON_EVERY_EXECUTION' | 'ON_FAILURE' | 'ON_BACK_TO_SUCCESS';

    /**
     * The directory in which the pipeline filesystem will be mounted.
     */
    working_directory: string;

    /**
     * The numerical ID of the action, after which this action should be added.
     */
    after_action_id?: number;

    /**
     * Set if `distribution` is set to `AMI`.
     */
    ami?: Ami;

    /**
     * When set to 'true' the action is disabled.  By default it is set to 'false'.
     */
    disabled?: boolean;

    /**
     * If set to `true` all commands will be executed regardless of the result of the previous command.
     */
    execute_every_command?: boolean;

    /**
     * If set to 'true' the execution will proceed, mark action as a warning and jump to the next action. Doesn't apply to deployment actions.
     */
    ignore_errors?: boolean;

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
     * Define file paths that should be copied before (`PIPELINE_TO_VM`) and after the execution (`VM_TO_PIPELINE`).
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

    /**
     * The name of the action from which the VM is reused (if `vm_from_prev_action` is set to `true`). If not set, the previous one will be used.
     */
    vm_action_name?: string;

    /**
     * Set to `true` if you want the action to use the VM from the previous Linux action.
     */
    vm_from_prev_action?: boolean;
}

export type LinuxArgs = AsInputs<LinuxState>;

export interface LinuxProps {
    url: string;
    html_url: string;
    action_id: number;
    commands: string[];
    distribution: string;
    trigger_time: 'ON_EVERY_EXECUTION' | 'ON_FAILURE' | 'ON_BACK_TO_SUCCESS';
    type: 'NATIVE_BUILD_LINUX';
    working_directory: string;
    after_action_id?: number;
    ami?: Ami;
    disabled?: boolean;
    execute_every_command?: boolean;
    ignore_errors?: boolean;
    retry_count?: number;
    retry_interval?: number;
    run_next_parallel?: boolean;
    run_only_on_first_failure?: boolean;
    sync_paths?: SyncPath[];
    timeout?: number;
    trigger_conditions?: TriggerCondition[];
    variables?: Variable[];
    vm_action_name?: string;
    vm_from_prev_action?: boolean;
    pipeline: PipelineProps;
    project_name: string;
    pipeline_id: number;
}

/**
 * Required scopes in Buddy API: `WORKSPACE`, `EXECUTION_MANAGE`, `EXECUTION_INFO`
 */
export class Linux extends CustomResource {
    static __pulumiType = 'buddy:action:Linux';

    static get(name: string, id: Input<ID>, state?: Partial<LinuxState>, opts?: CustomResourceOptions) {
        return new Linux(name, state as any, { ...opts, id });
    }

    static isInstance(obj: any): obj is Linux {
        if (null == obj) {
            return false;
        }

        return obj['__pulumiType'] === Linux.__pulumiType;
    }

    project_name!: Output<string>;
    pipeline_id!: Output<number>;
    action_id!: Output<number>;
    commands!: Output<string[]>;
    distribution!: Output<string>;
    trigger_time!: Output<'ON_EVERY_EXECUTION' | 'ON_FAILURE' | 'ON_BACK_TO_SUCCESS'>;
    type!: Output<'NATIVE_BUILD_LINUX'>;
    working_directory!: Output<string>;
    after_action_id!: Output<number | undefined>;
    ami!: Output<Ami | undefined>;
    disabled!: Output<boolean | undefined>;
    execute_every_command!: Output<boolean | undefined>;
    ignore_errors!: Output<boolean | undefined>;
    retry_count!: Output<number | undefined>;
    retry_interval!: Output<number | undefined>;
    run_next_parallel!: Output<boolean | undefined>;
    run_only_on_first_failure!: Output<boolean | undefined>;
    sync_paths!: Output<SyncPath[] | undefined>;
    timeout!: Output<number | undefined>;
    trigger_conditions!: Output<TriggerCondition[] | undefined>;
    variables!: Output<Variable[] | undefined>;
    vm_action_name!: Output<string | undefined>;
    vm_from_prev_action!: Output<boolean | undefined>;

    constructor(name: string, argsOrState: LinuxArgs | LinuxState, opts?: CustomResourceOptions) {
        const inputs: Inputs = {};
        if (!opts) {
            opts = {};
        }

        if (opts.id) {
            const state = argsOrState as LinuxState | undefined;
            inputs['project_name'] = state?.project_name;
            inputs['pipeline_id'] = state?.pipeline_id;
            inputs['commands'] = state?.commands;
            inputs['distribution'] = state?.distribution;
            inputs['trigger_time'] = state?.trigger_time;
            inputs['working_directory'] = state?.working_directory;
            inputs['after_action_id'] = state?.after_action_id;
            inputs['ami'] = state?.ami;
            inputs['disabled'] = state?.disabled;
            inputs['execute_every_command'] = state?.execute_every_command;
            inputs['ignore_errors'] = state?.ignore_errors;
            inputs['retry_count'] = state?.retry_count;
            inputs['retry_interval'] = state?.retry_interval;
            inputs['run_next_parallel'] = state?.run_next_parallel;
            inputs['run_only_on_first_failure'] = state?.run_only_on_first_failure;
            inputs['sync_paths'] = state?.sync_paths;
            inputs['timeout'] = state?.timeout;
            inputs['trigger_conditions'] = state?.trigger_conditions;
            inputs['variables'] = state?.variables;
            inputs['vm_action_name'] = state?.vm_action_name;
            inputs['vm_from_prev_action'] = state?.vm_from_prev_action;
        } else {
            const args = argsOrState as LinuxArgs | undefined;
            if (!args?.project_name) {
                throw new Error('Missing required property "project_name"');
            }

            if (!args?.pipeline_id) {
                throw new Error('Missing required property "pipeline_id"');
            }

            if (!args?.commands) {
                throw new Error('Missing required property "commands"');
            }

            if (!args?.distribution) {
                throw new Error('Missing required property "distribution"');
            }

            if (!args?.trigger_time) {
                throw new Error('Missing required property "trigger_time"');
            }

            if (!args?.working_directory) {
                throw new Error('Missing required property "working_directory"');
            }

            inputs['commands'] = args.commands;
            inputs['distribution'] = args.distribution;
            inputs['trigger_time'] = args.trigger_time;
            inputs['working_directory'] = args.working_directory;
            inputs['after_action_id'] = args.after_action_id;
            inputs['ami'] = args.ami;
            inputs['disabled'] = args.disabled;
            inputs['execute_every_command'] = args.execute_every_command;
            inputs['ignore_errors'] = args.ignore_errors;
            inputs['retry_count'] = args.retry_count;
            inputs['retry_interval'] = args.retry_interval;
            inputs['run_next_parallel'] = args.run_next_parallel;
            inputs['run_only_on_first_failure'] = args.run_only_on_first_failure;
            inputs['sync_paths'] = args.sync_paths;
            inputs['timeout'] = args.timeout;
            inputs['trigger_conditions'] = args.trigger_conditions;
            inputs['variables'] = args.variables;
            inputs['vm_action_name'] = args.vm_action_name;
            inputs['vm_from_prev_action'] = args.vm_from_prev_action;
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

        inputs['type'] = 'NATIVE_BUILD_LINUX';
        inputs['url'] = undefined;
        inputs['html_url'] = undefined;
        inputs['action_id'] = undefined;

        super(Linux.__pulumiType, name, inputs, opts);
    }
}
