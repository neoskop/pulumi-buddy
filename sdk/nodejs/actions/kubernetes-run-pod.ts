import { AsInputs } from '@pulumi-utils/sdk';
import { PipelineProps } from '../pipeline';
import { CustomResource, Input, Output, ID, CustomResourceOptions, Inputs } from '@pulumi/pulumi';
import { TriggerCondition, Variable } from '../common';

export interface KubernetesRunPodState {
    project_name: string;
    pipeline_id: number;
    /**
     * Authorization type. Can be one of `BASIC`, `TOKEN` or `CERTS`.
     */
    auth_type: 'BASIC' | 'TOKEN' | 'CERTS';

    /**
     * The name of the action.
     */
    name: string;

    /**
     * The host for the connection.
     */
    server: string;

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
     * The repository path to the configuration file. One of `config_path` or `content` must be specified.
     */
    config_path?: string;

    /**
     * The configuration content. One of `config_path` or `content` must be specified.
     */
    content?: string;

    /**
     * When set to `true` the action is disabled.  By default it is set to `false`.
     */
    disabled?: boolean;

    /**
     * If set to `true` the execution will proceed, mark action as a warning and jump to the next action. Doesn't apply to deployment actions.
     */
    ignore_errors?: boolean;

    /**
     * Version of the kubectl used in the action. Default is “latest”.
     */
    kubectl_version?: string;

    /**
     * Defines whether to leave the Pod or delete it after the action finishes.
     */
    leave_after?: boolean;

    /**
     * The username required when `auth_type` is set to `BASIC`.
     */
    login?: string;

    /**
     * The password required when `auth_type` is set to `BASIC`.
     */
    password?: string;

    /**
     * Record current kubectl command in the resource annotation. Can be one of `TRUE`, `FALSE` or `NOT_SET`. If set to false, do not record the command. If set to `true`, record the command. If not set, default to updating the existing annotation value only if one already exists.
     */
    record_arg?: 'TRUE' | 'FALSE' | 'NOT_SET';

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
     * The token required when `auth_type` is set to `TOKEN`.
     */
    token?: string;

    /**
     * The list of trigger conditions to meet so that the action can be triggered.
     */
    trigger_conditions?: TriggerCondition[];

    /**
     * The list of variables you can use the action.
     */
    variables?: Variable[];
}

export type KubernetesRunPodArgs = AsInputs<KubernetesRunPodState>;

export interface KubernetesRunPodProps {
    url: string;
    html_url: string;
    action_id: number;
    auth_type: 'BASIC' | 'TOKEN' | 'CERTS';
    name: string;
    server: string;
    type: 'KUBERNETES_RUN_POD';
    client_ca?: string;
    client_cert?: string;
    client_key?: string;
    config_path?: string;
    content?: string;
    disabled?: boolean;
    ignore_errors?: boolean;
    kubectl_version?: string;
    leave_after?: boolean;
    login?: string;
    password?: string;
    record_arg?: 'TRUE' | 'FALSE' | 'NOT_SET';
    retry_count?: number;
    retry_delay?: number;
    run_next_parallel?: boolean;
    run_only_on_first_failure?: boolean;
    timeout?: number;
    token?: string;
    trigger_conditions?: TriggerCondition[];
    variables?: Variable[];
    pipeline: PipelineProps;
    project_name: string;
    pipeline_id: number;
}

/**
 * Required scopes in Buddy API: `WORKSPACE`, `EXECUTION_MANAGE`, `EXECUTION_INFO`
 */
export class KubernetesRunPod extends CustomResource {
    static __pulumiType = 'buddy:action:KubernetesRunPod';

    static get(name: string, id: Input<ID>, state?: Partial<KubernetesRunPodState>, opts?: CustomResourceOptions) {
        return new KubernetesRunPod(name, state as any, { ...opts, id });
    }

    static isInstance(obj: any): obj is KubernetesRunPod {
        if (null == obj) {
            return false;
        }

        return obj['__pulumiType'] === KubernetesRunPod.__pulumiType;
    }

    project_name!: Output<string>;
    pipeline_id!: Output<number>;
    action_id!: Output<number>;
    auth_type!: Output<'BASIC' | 'TOKEN' | 'CERTS'>;
    name!: Output<string>;
    server!: Output<string>;
    type!: Output<'KUBERNETES_RUN_POD'>;
    client_ca!: Output<string | undefined>;
    client_cert!: Output<string | undefined>;
    client_key!: Output<string | undefined>;
    config_path!: Output<string | undefined>;
    content!: Output<string | undefined>;
    disabled!: Output<boolean | undefined>;
    ignore_errors!: Output<boolean | undefined>;
    kubectl_version!: Output<string | undefined>;
    leave_after!: Output<boolean | undefined>;
    login!: Output<string | undefined>;
    password!: Output<string | undefined>;
    record_arg!: Output<'TRUE' | 'FALSE' | 'NOT_SET' | undefined>;
    retry_count!: Output<number | undefined>;
    retry_delay!: Output<number | undefined>;
    run_next_parallel!: Output<boolean | undefined>;
    run_only_on_first_failure!: Output<boolean | undefined>;
    timeout!: Output<number | undefined>;
    token!: Output<string | undefined>;
    trigger_conditions!: Output<TriggerCondition[] | undefined>;
    variables!: Output<Variable[] | undefined>;

    constructor(name: string, argsOrState: KubernetesRunPodArgs | KubernetesRunPodState, opts?: CustomResourceOptions) {
        const inputs: Inputs = {};
        if (!opts) {
            opts = {};
        }

        if (opts.id) {
            const state = argsOrState as KubernetesRunPodState | undefined;
            inputs['project_name'] = state?.project_name;
            inputs['pipeline_id'] = state?.pipeline_id;
            inputs['auth_type'] = state?.auth_type;
            inputs['name'] = state?.name;
            inputs['server'] = state?.server;
            inputs['client_ca'] = state?.client_ca;
            inputs['client_cert'] = state?.client_cert;
            inputs['client_key'] = state?.client_key;
            inputs['config_path'] = state?.config_path;
            inputs['content'] = state?.content;
            inputs['disabled'] = state?.disabled;
            inputs['ignore_errors'] = state?.ignore_errors;
            inputs['kubectl_version'] = state?.kubectl_version;
            inputs['leave_after'] = state?.leave_after;
            inputs['login'] = state?.login;
            inputs['password'] = state?.password;
            inputs['record_arg'] = state?.record_arg;
            inputs['retry_count'] = state?.retry_count;
            inputs['retry_delay'] = state?.retry_delay;
            inputs['run_next_parallel'] = state?.run_next_parallel;
            inputs['run_only_on_first_failure'] = state?.run_only_on_first_failure;
            inputs['timeout'] = state?.timeout;
            inputs['token'] = state?.token;
            inputs['trigger_conditions'] = state?.trigger_conditions;
            inputs['variables'] = state?.variables;
        } else {
            const args = argsOrState as KubernetesRunPodArgs | undefined;
            if (!args?.project_name) {
                throw new Error('Missing required property "project_name"');
            }

            if (!args?.pipeline_id) {
                throw new Error('Missing required property "pipeline_id"');
            }

            if (!args?.auth_type) {
                throw new Error('Missing required property "auth_type"');
            }

            if (!args?.name) {
                throw new Error('Missing required property "name"');
            }

            if (!args?.server) {
                throw new Error('Missing required property "server"');
            }

            inputs['auth_type'] = args.auth_type;
            inputs['name'] = args.name;
            inputs['server'] = args.server;
            inputs['client_ca'] = args.client_ca;
            inputs['client_cert'] = args.client_cert;
            inputs['client_key'] = args.client_key;
            inputs['config_path'] = args.config_path;
            inputs['content'] = args.content;
            inputs['disabled'] = args.disabled;
            inputs['ignore_errors'] = args.ignore_errors;
            inputs['kubectl_version'] = args.kubectl_version;
            inputs['leave_after'] = args.leave_after;
            inputs['login'] = args.login;
            inputs['password'] = args.password;
            inputs['record_arg'] = args.record_arg;
            inputs['retry_count'] = args.retry_count;
            inputs['retry_delay'] = args.retry_delay;
            inputs['run_next_parallel'] = args.run_next_parallel;
            inputs['run_only_on_first_failure'] = args.run_only_on_first_failure;
            inputs['timeout'] = args.timeout;
            inputs['token'] = args.token;
            inputs['trigger_conditions'] = args.trigger_conditions;
            inputs['variables'] = args.variables;
            inputs['project_name'] = args.project_name;
            inputs['pipeline_id'] = args.pipeline_id;
        }

        if (!opts.version) {
            opts.version = require('../package').version;
        }

        opts.ignoreChanges = ['project_name', 'pipeline_id', ...(opts.ignoreChanges || [])];

        inputs['type'] = 'KUBERNETES_RUN_POD';
        inputs['url'] = undefined;
        inputs['html_url'] = undefined;
        inputs['action_id'] = undefined;

        super(KubernetesRunPod.__pulumiType, name, inputs, opts);
    }
}
