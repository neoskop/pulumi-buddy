import { AsInputs } from '../utils';
import { PipelineProps } from '../pipeline';
import { CustomResource, Input, Output, ID, CustomResourceOptions, Inputs } from '@pulumi/pulumi';
import { Variable } from '../common';

export interface ActionSSHCommandState {
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
     * The numerical ID of the action, after which this action should be added.
     */
    after_action_id?: number;

    /**
     * When set to `true` the action is disabled.  By default it is set to `false`.
     */
    disabled?: boolean;

    /**
     * Defines whether to ignore the executed command’s errors or to continue executing.
     */
    ignore_errors?: boolean;

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
     * The name of the shell that will be used to execute commands. Can be one of `SH` or `BASH` (default).
     */
    shell?: 'SH' | 'BASH';

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

    /**
     * The absolute or relative path on the remote server.
     */
    working_directory?: string;
}

export type ActionSSHCommandArgs = AsInputs<ActionSSHCommandState>;

export interface ActionSSHCommandProps {
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
    type: 'SSH_COMMAND';
    after_action_id?: number;
    disabled?: boolean;
    ignore_errors?: boolean;
    run_as_script?: boolean;
    run_next_parallel?: boolean;
    run_only_on_first_failure?: boolean;
    shell?: 'SH' | 'BASH';
    timeout?: number;
    trigger_condition?: 'ALWAYS' | 'ON_CHANGE' | 'ON_CHANGE_AT_PATH' | 'VAR_IS' | 'VAR_IS_NOT' | 'VAR_CONTAINS';
    trigger_condition_paths?: string[];
    trigger_time?: 'ON_EVERY_EXECUTION' | 'ON_FAILURE' | 'ON_BACK_TO_SUCCESS';
    trigger_variable_key?: string;
    trigger_variable_value?: string;
    variables?: Variable[];
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

    static get(name: string, id: Input<ID>, state?: Partial<ActionSSHCommandState>, opts?: CustomResourceOptions) {
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
    type!: Output<'SSH_COMMAND'>;
    after_action_id!: Output<number | undefined>;
    disabled!: Output<boolean | undefined>;
    ignore_errors!: Output<boolean | undefined>;
    run_as_script!: Output<boolean | undefined>;
    run_next_parallel!: Output<boolean | undefined>;
    run_only_on_first_failure!: Output<boolean | undefined>;
    shell!: Output<'SH' | 'BASH' | undefined>;
    timeout!: Output<number | undefined>;
    trigger_condition!: Output<'ALWAYS' | 'ON_CHANGE' | 'ON_CHANGE_AT_PATH' | 'VAR_IS' | 'VAR_IS_NOT' | 'VAR_CONTAINS' | undefined>;
    trigger_condition_paths!: Output<string[] | undefined>;
    trigger_time!: Output<'ON_EVERY_EXECUTION' | 'ON_FAILURE' | 'ON_BACK_TO_SUCCESS' | undefined>;
    trigger_variable_key!: Output<string | undefined>;
    trigger_variable_value!: Output<string | undefined>;
    variables!: Output<Variable[] | undefined>;
    working_directory!: Output<string | undefined>;

    constructor(name: string, argsOrState: ActionSSHCommandArgs | ActionSSHCommandState, opts?: CustomResourceOptions) {
        const inputs: Inputs = {};
        if (!opts) {
            opts = {};
        }

        if (opts.id) {
            const state = argsOrState as ActionSSHCommandState | undefined;
            inputs['project_name'] = state?.project_name;
            inputs['pipeline_id'] = state?.pipeline_id;
            inputs['authentication_mode'] = state?.authentication_mode;
            inputs['commands'] = state?.commands;
            inputs['host'] = state?.host;
            inputs['login'] = state?.login;
            inputs['name'] = state?.name;
            inputs['password'] = state?.password;
            inputs['port'] = state?.port;
            inputs['after_action_id'] = state?.after_action_id;
            inputs['disabled'] = state?.disabled;
            inputs['ignore_errors'] = state?.ignore_errors;
            inputs['run_as_script'] = state?.run_as_script;
            inputs['run_next_parallel'] = state?.run_next_parallel;
            inputs['run_only_on_first_failure'] = state?.run_only_on_first_failure;
            inputs['shell'] = state?.shell;
            inputs['timeout'] = state?.timeout;
            inputs['trigger_condition'] = state?.trigger_condition;
            inputs['trigger_condition_paths'] = state?.trigger_condition_paths;
            inputs['trigger_time'] = state?.trigger_time;
            inputs['trigger_variable_key'] = state?.trigger_variable_key;
            inputs['trigger_variable_value'] = state?.trigger_variable_value;
            inputs['variables'] = state?.variables;
            inputs['working_directory'] = state?.working_directory;
        } else {
            const args = argsOrState as ActionSSHCommandArgs | undefined;
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

            inputs['authentication_mode'] = args.authentication_mode;
            inputs['commands'] = args.commands;
            inputs['host'] = args.host;
            inputs['login'] = args.login;
            inputs['name'] = args.name;
            inputs['password'] = args.password;
            inputs['port'] = args.port;
            inputs['after_action_id'] = args.after_action_id;
            inputs['disabled'] = args.disabled;
            inputs['ignore_errors'] = args.ignore_errors;
            inputs['run_as_script'] = args.run_as_script;
            inputs['run_next_parallel'] = args.run_next_parallel;
            inputs['run_only_on_first_failure'] = args.run_only_on_first_failure;
            inputs['shell'] = args.shell;
            inputs['timeout'] = args.timeout;
            inputs['trigger_condition'] = args.trigger_condition;
            inputs['trigger_condition_paths'] = args.trigger_condition_paths;
            inputs['trigger_time'] = args.trigger_time;
            inputs['trigger_variable_key'] = args.trigger_variable_key;
            inputs['trigger_variable_value'] = args.trigger_variable_value;
            inputs['variables'] = args.variables;
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
