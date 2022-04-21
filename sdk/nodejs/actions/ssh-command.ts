import { AsInputs } from '@pulumi-utils/sdk';
import { PipelineProps } from '../pipeline';
import { CustomResource, Input, Output, ID, CustomResourceOptions, Inputs } from '@pulumi/pulumi';
import { Variable, TriggerCondition } from '../common';

export interface SSHCommandState {
    project_name: string;
    pipeline_id: number;
    /**
     * The authentication mode for SSH. Should be set to `PASS`.
     */
    authentication_mode: 'PASS';

    /**
     * The array of commands invoked on the remote server.
     */
    commands: string;

    /**
     * The host for the connection.
     */
    host: string;

    /**
     * The username required to connect to the server.
     */
    login: string;

    /**
     * The name of the action.
     */
    name: string;

    /**
     * The password required to connect to the server.
     */
    password: string;

    /**
     * The port for the connection.
     */
    port: string;

    /**
     * Specifies when the action should be executed. Can be one of `ON_EVERY_EXECUTION`, `ON_FAILURE` or `ON_BACK_TO_SUCCESS`. The default value is `ON_EVERY_EXECUTION`.
     */
    trigger_time: 'ON_EVERY_EXECUTION' | 'ON_FAILURE' | 'ON_BACK_TO_SUCCESS';

    /**
     * The list of variables you can use the action.
     */
    variables: Variable[];

    /**
     * The numerical ID of the action, after which this action should be added.
     */
    after_action_id?: number;

    /**
     * When set to `true` the action is disabled.  By default it is set to `false`.
     */
    disabled?: boolean;

    /**
     * If set to `true` all commands will be executed regardless of the result of the previous command.
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
     * Delay time between auto retries in seconds.
     */
    retry_interval?: number;

    /**
     * If set to `true`, commands are executed as a regular script. If set to false, the commands will be executed one by one, in non-interactive mode.
     */
    run_as_script?: boolean;

    /**
     * When set to `true`, the subsequent action defined in the pipeline will run in parallel to the current action.
     */
    run_next_parallel?: boolean;

    /**
     * Defines whether the action should be executed on each failure. Restricted to and required if the `trigger_time` is `ON_FAILURE`.
     */
    run_only_on_first_failure?: boolean;

    /**
     * The name of the shell that will be used to execute commands. Can be one of `SH` (default) or `BASH`.
     */
    shell?: 'SH' | 'BASH';

    /**
     * The timeout in seconds.
     */
    timeout?: number;

    /**
     * The list of trigger conditions to meet so that the action can be triggered.
     */
    trigger_conditions?: TriggerCondition[];

    /**
     * The absolute or relative path on the remote server.
     */
    working_directory?: string;
}

export type SSHCommandArgs = AsInputs<SSHCommandState>;

export interface SSHCommandProps {
    url: string;
    html_url: string;
    action_id: number;
    authentication_mode: 'PASS';
    commands: string;
    host: string;
    login: string;
    name: string;
    password: string;
    port: string;
    trigger_time: 'ON_EVERY_EXECUTION' | 'ON_FAILURE' | 'ON_BACK_TO_SUCCESS';
    type: 'SSH_COMMAND';
    variables: Variable[];
    after_action_id?: number;
    disabled?: boolean;
    execute_every_command?: boolean;
    ignore_errors?: boolean;
    retry_count?: number;
    retry_interval?: number;
    run_as_script?: boolean;
    run_next_parallel?: boolean;
    run_only_on_first_failure?: boolean;
    shell?: 'SH' | 'BASH';
    timeout?: number;
    trigger_conditions?: TriggerCondition[];
    working_directory?: string;
    pipeline: PipelineProps;
    project_name: string;
    pipeline_id: number;
}

/**
 * Required scopes in Buddy API: `WORKSPACE`, `EXECUTION_MANAGE`, `EXECUTION_INFO`
 */
export class SSHCommand extends CustomResource {
    static __pulumiType = 'buddy:action:SSHCommand';

    static get(name: string, id: Input<ID>, state?: Partial<SSHCommandState>, opts?: CustomResourceOptions) {
        return new SSHCommand(name, state as any, { ...opts, id });
    }

    static isInstance(obj: any): obj is SSHCommand {
        if (null == obj) {
            return false;
        }

        return obj['__pulumiType'] === SSHCommand.__pulumiType;
    }

    project_name!: Output<string>;
    pipeline_id!: Output<number>;
    action_id!: Output<number>;
    authentication_mode!: Output<'PASS'>;
    commands!: Output<string>;
    host!: Output<string>;
    login!: Output<string>;
    name!: Output<string>;
    password!: Output<string>;
    port!: Output<string>;
    trigger_time!: Output<'ON_EVERY_EXECUTION' | 'ON_FAILURE' | 'ON_BACK_TO_SUCCESS'>;
    type!: Output<'SSH_COMMAND'>;
    variables!: Output<Variable[]>;
    after_action_id!: Output<number | undefined>;
    disabled!: Output<boolean | undefined>;
    execute_every_command!: Output<boolean | undefined>;
    ignore_errors!: Output<boolean | undefined>;
    retry_count!: Output<number | undefined>;
    retry_interval!: Output<number | undefined>;
    run_as_script!: Output<boolean | undefined>;
    run_next_parallel!: Output<boolean | undefined>;
    run_only_on_first_failure!: Output<boolean | undefined>;
    shell!: Output<'SH' | 'BASH' | undefined>;
    timeout!: Output<number | undefined>;
    trigger_conditions!: Output<TriggerCondition[] | undefined>;
    working_directory!: Output<string | undefined>;

    constructor(name: string, argsOrState: SSHCommandArgs | SSHCommandState, opts?: CustomResourceOptions) {
        const inputs: Inputs = {};
        if (!opts) {
            opts = {};
        }

        if (opts.id) {
            const state = argsOrState as SSHCommandState | undefined;
            inputs['project_name'] = state?.project_name;
            inputs['pipeline_id'] = state?.pipeline_id;
            inputs['authentication_mode'] = state?.authentication_mode;
            inputs['commands'] = state?.commands;
            inputs['host'] = state?.host;
            inputs['login'] = state?.login;
            inputs['name'] = state?.name;
            inputs['password'] = state?.password;
            inputs['port'] = state?.port;
            inputs['trigger_time'] = state?.trigger_time;
            inputs['variables'] = state?.variables;
            inputs['after_action_id'] = state?.after_action_id;
            inputs['disabled'] = state?.disabled;
            inputs['execute_every_command'] = state?.execute_every_command;
            inputs['ignore_errors'] = state?.ignore_errors;
            inputs['retry_count'] = state?.retry_count;
            inputs['retry_interval'] = state?.retry_interval;
            inputs['run_as_script'] = state?.run_as_script;
            inputs['run_next_parallel'] = state?.run_next_parallel;
            inputs['run_only_on_first_failure'] = state?.run_only_on_first_failure;
            inputs['shell'] = state?.shell;
            inputs['timeout'] = state?.timeout;
            inputs['trigger_conditions'] = state?.trigger_conditions;
            inputs['working_directory'] = state?.working_directory;
        } else {
            const args = argsOrState as SSHCommandArgs | undefined;
            if (!args?.project_name) {
                throw new Error('Missing required property "project_name"');
            }

            if (!args?.pipeline_id) {
                throw new Error('Missing required property "pipeline_id"');
            }

            if (!args?.authentication_mode) {
                throw new Error('Missing required property "authentication_mode"');
            }

            if (!args?.commands) {
                throw new Error('Missing required property "commands"');
            }

            if (!args?.host) {
                throw new Error('Missing required property "host"');
            }

            if (!args?.login) {
                throw new Error('Missing required property "login"');
            }

            if (!args?.name) {
                throw new Error('Missing required property "name"');
            }

            if (!args?.password) {
                throw new Error('Missing required property "password"');
            }

            if (!args?.port) {
                throw new Error('Missing required property "port"');
            }

            if (!args?.trigger_time) {
                throw new Error('Missing required property "trigger_time"');
            }

            if (!args?.variables) {
                throw new Error('Missing required property "variables"');
            }

            inputs['authentication_mode'] = args.authentication_mode;
            inputs['commands'] = args.commands;
            inputs['host'] = args.host;
            inputs['login'] = args.login;
            inputs['name'] = args.name;
            inputs['password'] = args.password;
            inputs['port'] = args.port;
            inputs['trigger_time'] = args.trigger_time;
            inputs['variables'] = args.variables;
            inputs['after_action_id'] = args.after_action_id;
            inputs['disabled'] = args.disabled;
            inputs['execute_every_command'] = args.execute_every_command;
            inputs['ignore_errors'] = args.ignore_errors;
            inputs['retry_count'] = args.retry_count;
            inputs['retry_interval'] = args.retry_interval;
            inputs['run_as_script'] = args.run_as_script;
            inputs['run_next_parallel'] = args.run_next_parallel;
            inputs['run_only_on_first_failure'] = args.run_only_on_first_failure;
            inputs['shell'] = args.shell;
            inputs['timeout'] = args.timeout;
            inputs['trigger_conditions'] = args.trigger_conditions;
            inputs['working_directory'] = args.working_directory;
            inputs['project_name'] = args.project_name;
            inputs['pipeline_id'] = args.pipeline_id;
        }

        if (!opts.version) {
            opts.version = require('../package').version;
        }

        opts.ignoreChanges = ['project_name', 'pipeline_id', ...(opts.ignoreChanges || [])];

        inputs['type'] = 'SSH_COMMAND';
        inputs['url'] = undefined;
        inputs['html_url'] = undefined;
        inputs['action_id'] = undefined;

        super(SSHCommand.__pulumiType, name, inputs, opts);
    }
}
