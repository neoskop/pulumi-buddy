import { AsInputs } from '@pulumi-utils/sdk';
import { PipelineProps } from '../pipeline';
import { CustomResource, Input, Output, ID, CustomResourceOptions, Inputs } from '@pulumi/pulumi';
import { SyncPath, TriggerCondition, Variable } from '../common';

export interface MacOSState {
    project_name: string;
    pipeline_id: number;
    /**
     * The commands that will be executed.
     */
    commands: string[];

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
     * The list of variables added to the MacOS keychain.
     */
    certificates?: string[];

    /**
     * When set to `true` the action is disabled.  By default it is set to `false`.
     */
    disabled?: boolean;

    /**
     * If set to `true` the execution will proceed, mark action as a warning and jump to the next action. Doesn't apply to deployment actions.
     */
    ignore_errors?: boolean;

    /**
     * The list of simulators initiated before the action runs.
     */
    pre_start_simulators?: string[];

    /**
     * The list of variables added as MacOS Provisioning Profiles.
     */
    provision_profiles?: string[];

    /**
     * Number of retries if the action fails.
     */
    retry_count?: number;

    /**
     * Delay time between auto retries in seconds.
     */
    retry_interval?: number;

    /**
     * When set to `true`, the subsequent action defined in the pipeline will run in parallel to the current action.
     */
    run_next_parallel?: boolean;

    /**
     * Defines whether the action should be executed on each failure. Restricted to and required if the `trigger_time` is `ON_FAILURE`.
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
    variables: Variable[];

    /**
     * Defines the Xcode version.
     */
    xcode_version?: string;
}

export type MacOSArgs = AsInputs<MacOSState>;

export interface MacOSProps {
    url: string;
    html_url: string;
    action_id: number;
    commands: string[];
    trigger_time: 'ON_EVERY_EXECUTION' | 'ON_FAILURE' | 'ON_BACK_TO_SUCCESS';
    type: 'NATIVE_BUILD_MAC';
    working_directory: string;
    after_action_id?: number;
    certificates?: string[];
    disabled?: boolean;
    ignore_errors?: boolean;
    pre_start_simulators?: string[];
    provision_profiles?: string[];
    retry_count?: number;
    retry_interval?: number;
    run_next_parallel?: boolean;
    run_only_on_first_failure?: boolean;
    sync_paths?: SyncPath[];
    timeout?: number;
    trigger_conditions?: TriggerCondition[];
    variables: Variable[];
    xcode_version?: string;
    pipeline: PipelineProps;
    project_name: string;
    pipeline_id: number;
}

/**
 * Required scopes in Buddy API: `WORKSPACE`, `EXECUTION_MANAGE`, `EXECUTION_INFO`
 */
export class MacOS extends CustomResource {
    static __pulumiType = 'buddy:action:MacOS';

    static get(name: string, id: Input<ID>, state?: Partial<MacOSState>, opts?: CustomResourceOptions) {
        return new MacOS(name, state as any, { ...opts, id });
    }

    static isInstance(obj: any): obj is MacOS {
        if (null == obj) {
            return false;
        }

        return obj['__pulumiType'] === MacOS.__pulumiType;
    }

    project_name!: Output<string>;
    pipeline_id!: Output<number>;
    action_id!: Output<number>;
    commands!: Output<string[]>;
    trigger_time!: Output<'ON_EVERY_EXECUTION' | 'ON_FAILURE' | 'ON_BACK_TO_SUCCESS'>;
    type!: Output<'NATIVE_BUILD_MAC'>;
    working_directory!: Output<string>;
    after_action_id!: Output<number | undefined>;
    certificates!: Output<string[] | undefined>;
    disabled!: Output<boolean | undefined>;
    ignore_errors!: Output<boolean | undefined>;
    pre_start_simulators!: Output<string[] | undefined>;
    provision_profiles!: Output<string[] | undefined>;
    retry_count!: Output<number | undefined>;
    retry_interval!: Output<number | undefined>;
    run_next_parallel!: Output<boolean | undefined>;
    run_only_on_first_failure!: Output<boolean | undefined>;
    sync_paths!: Output<SyncPath[] | undefined>;
    timeout!: Output<number | undefined>;
    trigger_conditions!: Output<TriggerCondition[] | undefined>;
    variables!: Output<Variable[]>;
    xcode_version!: Output<string | undefined>;

    constructor(name: string, argsOrState: MacOSArgs | MacOSState, opts?: CustomResourceOptions) {
        const inputs: Inputs = {};
        if (!opts) {
            opts = {};
        }

        if (opts.id) {
            const state = argsOrState as MacOSState | undefined;
            inputs['project_name'] = state?.project_name;
            inputs['pipeline_id'] = state?.pipeline_id;
            inputs['commands'] = state?.commands;
            inputs['trigger_time'] = state?.trigger_time;
            inputs['working_directory'] = state?.working_directory;
            inputs['after_action_id'] = state?.after_action_id;
            inputs['certificates'] = state?.certificates;
            inputs['disabled'] = state?.disabled;
            inputs['ignore_errors'] = state?.ignore_errors;
            inputs['pre_start_simulators'] = state?.pre_start_simulators;
            inputs['provision_profiles'] = state?.provision_profiles;
            inputs['retry_count'] = state?.retry_count;
            inputs['retry_interval'] = state?.retry_interval;
            inputs['run_next_parallel'] = state?.run_next_parallel;
            inputs['run_only_on_first_failure'] = state?.run_only_on_first_failure;
            inputs['sync_paths'] = state?.sync_paths;
            inputs['timeout'] = state?.timeout;
            inputs['trigger_conditions'] = state?.trigger_conditions;
            inputs['variables'] = state?.variables;
            inputs['xcode_version'] = state?.xcode_version;
        } else {
            const args = argsOrState as MacOSArgs | undefined;
            if (!args?.project_name) {
                throw new Error('Missing required property "project_name"');
            }

            if (!args?.pipeline_id) {
                throw new Error('Missing required property "pipeline_id"');
            }

            if (!args?.commands) {
                throw new Error('Missing required property "commands"');
            }

            if (!args?.trigger_time) {
                throw new Error('Missing required property "trigger_time"');
            }

            if (!args?.working_directory) {
                throw new Error('Missing required property "working_directory"');
            }

            if (!args?.variables) {
                throw new Error('Missing required property "variables"');
            }

            inputs['commands'] = args.commands;
            inputs['trigger_time'] = args.trigger_time;
            inputs['working_directory'] = args.working_directory;
            inputs['after_action_id'] = args.after_action_id;
            inputs['certificates'] = args.certificates;
            inputs['disabled'] = args.disabled;
            inputs['ignore_errors'] = args.ignore_errors;
            inputs['pre_start_simulators'] = args.pre_start_simulators;
            inputs['provision_profiles'] = args.provision_profiles;
            inputs['retry_count'] = args.retry_count;
            inputs['retry_interval'] = args.retry_interval;
            inputs['run_next_parallel'] = args.run_next_parallel;
            inputs['run_only_on_first_failure'] = args.run_only_on_first_failure;
            inputs['sync_paths'] = args.sync_paths;
            inputs['timeout'] = args.timeout;
            inputs['trigger_conditions'] = args.trigger_conditions;
            inputs['variables'] = args.variables;
            inputs['xcode_version'] = args.xcode_version;
            inputs['project_name'] = args.project_name;
            inputs['pipeline_id'] = args.pipeline_id;
        }

        if (!opts.version) {
            opts.version = require('../package').version;
        }

        opts.ignoreChanges = ['project_name', 'pipeline_id', ...(opts.ignoreChanges || [])];

        inputs['type'] = 'NATIVE_BUILD_MAC';
        inputs['url'] = undefined;
        inputs['html_url'] = undefined;
        inputs['action_id'] = undefined;

        super(MacOS.__pulumiType, name, inputs, opts);
    }
}
