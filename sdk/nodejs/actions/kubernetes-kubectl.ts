import { AsInputs } from '../utils';
import { PipelineProps } from '../pipeline';
import { CustomResource, Input, Output, ID, CustomResourceOptions, Inputs } from '@pulumi/pulumi';
import { Variable } from '../common';

export interface ActionKubernetesKubectlState {
    project_name: string;
    pipeline_id: number;
    /**
     * Authorization type. Can be one of `BASIC`, `TOKEN` or `CERTS`.
     */
    auth_type: 'BASIC' | 'TOKEN' | 'CERTS';

    /**
     * The commands that will be executed.
     */
    execute_commands: string[];

    /**
     * The name of the action.
     */
    name: string;

    /**
     * The host for the connection.
     */
    server: string;

    /**
     * The numerical ID of the action, after which this action should be added.
     */
    after_action_id?: number;

    /**
     * The certificate authority required when `auth_type` is set to `CERTS`.
     */
    client_ca?: string;

    /**
     * The client certificate required when `auth_type` is set to `CERTS`.
     */
    client_cert?: string;

    /**
     * The client key required when `auth_type` is set to `CERTS`.
     */
    client_key?: string;

    /**
     * When set to `true` the action is disabled.  By default it is set to `false`.
     */
    disabled?: boolean;

    /**
     * Version of the kubectl used in the action. Default is “latest”.
     */
    kubectl_version?: string;

    /**
     * The username required when `auth_type` is set to `BASIC`.
     */
    login?: string;

    /**
     * The password required when `auth_type` is set to `BASIC`.
     */
    password?: string;

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
     * The token required when `auth_type` is set to `TOKEN`.
     */
    token?: string;

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

export type ActionKubernetesKubectlArgs = AsInputs<ActionKubernetesKubectlState>;

export interface ActionKubernetesKubectlProps {
    url: string;
    html_url: string;
    action_id: number;
    auth_type: 'BASIC' | 'TOKEN' | 'CERTS';
    execute_commands: string[];
    name: string;
    server: string;
    type: 'KUBERNETES_CLI';
    after_action_id?: number;
    client_ca?: string;
    client_cert?: string;
    client_key?: string;
    disabled?: boolean;
    kubectl_version?: string;
    login?: string;
    password?: string;
    run_next_parallel?: boolean;
    run_only_on_first_failure?: boolean;
    timeout?: number;
    token?: string;
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
export class KubernetesKubectl extends CustomResource {
    static __pulumiType = 'buddy:action:KubernetesKubectl';

    static get(name: string, id: Input<ID>, state?: Partial<ActionKubernetesKubectlState>, opts?: CustomResourceOptions) {
        return new KubernetesKubectl(name, state as any, { ...opts, id });
    }

    static isInstance(obj: any): obj is KubernetesKubectl {
        if (null == obj) {
            return false;
        }

        return obj['__pulumiType'] === KubernetesKubectl.__pulumiType;
    }

    project_name!: Output<string>;
    pipeline_id!: Output<number>;
    action_id!: Output<number>;
    auth_type!: Output<'BASIC' | 'TOKEN' | 'CERTS'>;
    execute_commands!: Output<string[]>;
    name!: Output<string>;
    server!: Output<string>;
    type!: Output<'KUBERNETES_CLI'>;
    after_action_id!: Output<number | undefined>;
    client_ca!: Output<string | undefined>;
    client_cert!: Output<string | undefined>;
    client_key!: Output<string | undefined>;
    disabled!: Output<boolean | undefined>;
    kubectl_version!: Output<string | undefined>;
    login!: Output<string | undefined>;
    password!: Output<string | undefined>;
    run_next_parallel!: Output<boolean | undefined>;
    run_only_on_first_failure!: Output<boolean | undefined>;
    timeout!: Output<number | undefined>;
    token!: Output<string | undefined>;
    trigger_condition!: Output<'ALWAYS' | 'ON_CHANGE' | 'ON_CHANGE_AT_PATH' | 'VAR_IS' | 'VAR_IS_NOT' | 'VAR_CONTAINS' | undefined>;
    trigger_condition_paths!: Output<string[] | undefined>;
    trigger_time!: Output<'ON_EVERY_EXECUTION' | 'ON_FAILURE' | 'ON_BACK_TO_SUCCESS' | undefined>;
    trigger_variable_key!: Output<string | undefined>;
    trigger_variable_value!: Output<string | undefined>;
    variables!: Output<Variable[] | undefined>;

    constructor(name: string, argsOrState: ActionKubernetesKubectlArgs | ActionKubernetesKubectlState, opts?: CustomResourceOptions) {
        const inputs: Inputs = {};
        if (!opts) {
            opts = {};
        }

        if (opts.id) {
            const state = argsOrState as ActionKubernetesKubectlState | undefined;
            inputs['project_name'] = state?.project_name;
            inputs['pipeline_id'] = state?.pipeline_id;
            inputs['auth_type'] = state?.auth_type;
            inputs['execute_commands'] = state?.execute_commands;
            inputs['name'] = state?.name;
            inputs['server'] = state?.server;
            inputs['after_action_id'] = state?.after_action_id;
            inputs['client_ca'] = state?.client_ca;
            inputs['client_cert'] = state?.client_cert;
            inputs['client_key'] = state?.client_key;
            inputs['disabled'] = state?.disabled;
            inputs['kubectl_version'] = state?.kubectl_version;
            inputs['login'] = state?.login;
            inputs['password'] = state?.password;
            inputs['run_next_parallel'] = state?.run_next_parallel;
            inputs['run_only_on_first_failure'] = state?.run_only_on_first_failure;
            inputs['timeout'] = state?.timeout;
            inputs['token'] = state?.token;
            inputs['trigger_condition'] = state?.trigger_condition;
            inputs['trigger_condition_paths'] = state?.trigger_condition_paths;
            inputs['trigger_time'] = state?.trigger_time;
            inputs['trigger_variable_key'] = state?.trigger_variable_key;
            inputs['trigger_variable_value'] = state?.trigger_variable_value;
            inputs['variables'] = state?.variables;
        } else {
            const args = argsOrState as ActionKubernetesKubectlArgs | undefined;
            if (!args?.project_name) {
                throw new Error('Missing required property "project_name"');
            }

            if (!args?.pipeline_id) {
                throw new Error('Missing required property "pipeline_id"');
            }

            if (!args?.auth_type) {
                throw new Error('Missing required property "auth_type"');
            }

            if (!args?.execute_commands) {
                throw new Error('Missing required property "execute_commands"');
            }

            if (!args?.name) {
                throw new Error('Missing required property "name"');
            }

            if (!args?.server) {
                throw new Error('Missing required property "server"');
            }

            inputs['auth_type'] = args.auth_type;
            inputs['execute_commands'] = args.execute_commands;
            inputs['name'] = args.name;
            inputs['server'] = args.server;
            inputs['after_action_id'] = args.after_action_id;
            inputs['client_ca'] = args.client_ca;
            inputs['client_cert'] = args.client_cert;
            inputs['client_key'] = args.client_key;
            inputs['disabled'] = args.disabled;
            inputs['kubectl_version'] = args.kubectl_version;
            inputs['login'] = args.login;
            inputs['password'] = args.password;
            inputs['run_next_parallel'] = args.run_next_parallel;
            inputs['run_only_on_first_failure'] = args.run_only_on_first_failure;
            inputs['timeout'] = args.timeout;
            inputs['token'] = args.token;
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

        inputs['type'] = 'KUBERNETES_CLI';
        inputs['url'] = undefined;
        inputs['html_url'] = undefined;
        inputs['action_id'] = undefined;

        super(KubernetesKubectl.__pulumiType, name, inputs, opts);
    }
}
