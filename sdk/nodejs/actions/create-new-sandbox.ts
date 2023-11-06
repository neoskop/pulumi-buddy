import { AsInputs } from '@pulumi-utils/sdk';
import { PipelineProps } from '../pipeline';
import { CustomResource, Input, Output, ID, CustomResourceOptions, Inputs } from '@pulumi/pulumi';
import { Mapping, SandboxPlaybook, TriggerCondition, Variable } from '../common';

export interface CreateNewSandboxState {
    project_name: string;
    pipeline_id: number;
    /**
     * Defines the number of vCPUs of the sandbox. Can be one of `1` or `2`.
     */
    cpu_limit: number;

    /**
     * Defines the sandbox disk size. Expressed in GB. Can be one of `5` or `10`.
     */
    disk_size_limit: number;

    /**
     * Defines the port-subdomain mappings that allow to access exposed resources on the sandbox.
     */
    mappings: Mapping[];

    /**
     * Defines the amount of RAM available to the sandbox. Can be one of `2` or `4`.
     */
    ram_limit: number;

    /**
     * Defines the OS distro of the sandbox. Can be one of `ubuntu/focal` or `debian/buster`.
     */
    sandbox_distribution: string;

    /**
     * Defines the name of the created sandbox.
     */
    sandbox_name: string;

    /**
     * Specifies when the action should be executed. Can be one of `ON_EVERY_EXECUTION`, `ON_FAILURE` or `ON_BACK_TO_SUCCESS`. The default value is `ON_EVERY_EXECUTION`.
     */
    trigger_time: 'ON_EVERY_EXECUTION' | 'ON_FAILURE' | 'ON_BACK_TO_SUCCESS';

    /**
     * The numerical ID of the action, after which this action should be added.
     */
    after_action_id?: number;

    /**
     * Defines the port used in the mapping.
     */
    application_port?: number;

    /**
     * If set to `true`, it allows you to use basic authorization in mappings
     */
    basic_auth?: boolean;

    /**
     * When set to 'true' the action is disabled.  By default it is set to 'false'.
     */
    disabled?: boolean;

    /**
     * If set to 'true' the execution will proceed, mark action as a warning and jump to the next action. Doesn't apply to deployment actions.
     */
    ignore_errors?: boolean;

    /**
     * Defines the basic auth password required to access the exposed resources.
     */
    mappings_password?: string;

    /**
     * Defines the basic auth username required to access the exposed resources.
     */
    mappings_username?: string;

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
     * Defines the list of playbooks to install during the sandbox creation.
     */
    sandbox_playbooks?: SandboxPlaybook[];

    /**
     * Defines the subdomain used in the mapping.
     */
    subdomain?: string;

    /**
     * The list of tags applied to the sandbox.
     */
    tags?: string[];

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

export type CreateNewSandboxArgs = AsInputs<CreateNewSandboxState>;

export interface CreateNewSandboxProps {
    url: string;
    html_url: string;
    action_id: number;
    cpu_limit: number;
    disk_size_limit: number;
    mappings: Mapping[];
    ram_limit: number;
    sandbox_distribution: string;
    sandbox_name: string;
    trigger_time: 'ON_EVERY_EXECUTION' | 'ON_FAILURE' | 'ON_BACK_TO_SUCCESS';
    type: 'SANDBOX_CREATE_NEW';
    after_action_id?: number;
    application_port?: number;
    basic_auth?: boolean;
    disabled?: boolean;
    ignore_errors?: boolean;
    mappings_password?: string;
    mappings_username?: string;
    retry_count?: number;
    retry_interval?: number;
    run_next_parallel?: boolean;
    run_only_on_first_failure?: boolean;
    sandbox_playbooks?: SandboxPlaybook[];
    subdomain?: string;
    tags?: string[];
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
export class CreateNewSandbox extends CustomResource {
    static __pulumiType = 'buddy:action:CreateNewSandbox';

    static get(name: string, id: Input<ID>, state?: Partial<CreateNewSandboxState>, opts?: CustomResourceOptions) {
        return new CreateNewSandbox(name, state as any, { ...opts, id });
    }

    static isInstance(obj: any): obj is CreateNewSandbox {
        if (null == obj) {
            return false;
        }

        return obj['__pulumiType'] === CreateNewSandbox.__pulumiType;
    }

    project_name!: Output<string>;
    pipeline_id!: Output<number>;
    action_id!: Output<number>;
    cpu_limit!: Output<number>;
    disk_size_limit!: Output<number>;
    mappings!: Output<Mapping[]>;
    ram_limit!: Output<number>;
    sandbox_distribution!: Output<string>;
    sandbox_name!: Output<string>;
    trigger_time!: Output<'ON_EVERY_EXECUTION' | 'ON_FAILURE' | 'ON_BACK_TO_SUCCESS'>;
    type!: Output<'SANDBOX_CREATE_NEW'>;
    after_action_id!: Output<number | undefined>;
    application_port!: Output<number | undefined>;
    basic_auth!: Output<boolean | undefined>;
    disabled!: Output<boolean | undefined>;
    ignore_errors!: Output<boolean | undefined>;
    mappings_password!: Output<string | undefined>;
    mappings_username!: Output<string | undefined>;
    retry_count!: Output<number | undefined>;
    retry_interval!: Output<number | undefined>;
    run_next_parallel!: Output<boolean | undefined>;
    run_only_on_first_failure!: Output<boolean | undefined>;
    sandbox_playbooks!: Output<SandboxPlaybook[] | undefined>;
    subdomain!: Output<string | undefined>;
    tags!: Output<string[] | undefined>;
    timeout!: Output<number | undefined>;
    trigger_conditions!: Output<TriggerCondition[] | undefined>;
    variables!: Output<Variable[] | undefined>;

    constructor(name: string, argsOrState: CreateNewSandboxArgs | CreateNewSandboxState, opts?: CustomResourceOptions) {
        const inputs: Inputs = {};
        if (!opts) {
            opts = {};
        }

        if (opts.id) {
            const state = argsOrState as CreateNewSandboxState | undefined;
            inputs['project_name'] = state?.project_name;
            inputs['pipeline_id'] = state?.pipeline_id;
            inputs['cpu_limit'] = state?.cpu_limit;
            inputs['disk_size_limit'] = state?.disk_size_limit;
            inputs['mappings'] = state?.mappings;
            inputs['ram_limit'] = state?.ram_limit;
            inputs['sandbox_distribution'] = state?.sandbox_distribution;
            inputs['sandbox_name'] = state?.sandbox_name;
            inputs['trigger_time'] = state?.trigger_time;
            inputs['after_action_id'] = state?.after_action_id;
            inputs['application_port'] = state?.application_port;
            inputs['basic_auth'] = state?.basic_auth;
            inputs['disabled'] = state?.disabled;
            inputs['ignore_errors'] = state?.ignore_errors;
            inputs['mappings_password'] = state?.mappings_password;
            inputs['mappings_username'] = state?.mappings_username;
            inputs['retry_count'] = state?.retry_count;
            inputs['retry_interval'] = state?.retry_interval;
            inputs['run_next_parallel'] = state?.run_next_parallel;
            inputs['run_only_on_first_failure'] = state?.run_only_on_first_failure;
            inputs['sandbox_playbooks'] = state?.sandbox_playbooks;
            inputs['subdomain'] = state?.subdomain;
            inputs['tags'] = state?.tags;
            inputs['timeout'] = state?.timeout;
            inputs['trigger_conditions'] = state?.trigger_conditions;
            inputs['variables'] = state?.variables;
        } else {
            const args = argsOrState as CreateNewSandboxArgs | undefined;
            if (!args?.project_name) {
                throw new Error('Missing required property "project_name"');
            }

            if (!args?.pipeline_id) {
                throw new Error('Missing required property "pipeline_id"');
            }

            if (!args?.cpu_limit) {
                throw new Error('Missing required property "cpu_limit"');
            }

            if (!args?.disk_size_limit) {
                throw new Error('Missing required property "disk_size_limit"');
            }

            if (!args?.mappings) {
                throw new Error('Missing required property "mappings"');
            }

            if (!args?.ram_limit) {
                throw new Error('Missing required property "ram_limit"');
            }

            if (!args?.sandbox_distribution) {
                throw new Error('Missing required property "sandbox_distribution"');
            }

            if (!args?.sandbox_name) {
                throw new Error('Missing required property "sandbox_name"');
            }

            if (!args?.trigger_time) {
                throw new Error('Missing required property "trigger_time"');
            }

            inputs['cpu_limit'] = args.cpu_limit;
            inputs['disk_size_limit'] = args.disk_size_limit;
            inputs['mappings'] = args.mappings;
            inputs['ram_limit'] = args.ram_limit;
            inputs['sandbox_distribution'] = args.sandbox_distribution;
            inputs['sandbox_name'] = args.sandbox_name;
            inputs['trigger_time'] = args.trigger_time;
            inputs['after_action_id'] = args.after_action_id;
            inputs['application_port'] = args.application_port;
            inputs['basic_auth'] = args.basic_auth;
            inputs['disabled'] = args.disabled;
            inputs['ignore_errors'] = args.ignore_errors;
            inputs['mappings_password'] = args.mappings_password;
            inputs['mappings_username'] = args.mappings_username;
            inputs['retry_count'] = args.retry_count;
            inputs['retry_interval'] = args.retry_interval;
            inputs['run_next_parallel'] = args.run_next_parallel;
            inputs['run_only_on_first_failure'] = args.run_only_on_first_failure;
            inputs['sandbox_playbooks'] = args.sandbox_playbooks;
            inputs['subdomain'] = args.subdomain;
            inputs['tags'] = args.tags;
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

        inputs['type'] = 'SANDBOX_CREATE_NEW';
        inputs['url'] = undefined;
        inputs['html_url'] = undefined;
        inputs['action_id'] = undefined;

        super(CreateNewSandbox.__pulumiType, name, inputs, opts);
    }
}
