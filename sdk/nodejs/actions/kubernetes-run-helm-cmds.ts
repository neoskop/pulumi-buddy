import { AsInputs } from '@pulumi-utils/sdk';
import { PipelineProps } from '../pipeline';
import { CustomResource, Input, Output, ID, CustomResourceOptions, Inputs, output } from '@pulumi/pulumi';
import { IntegrationRef, TriggerCondition, Variable } from '../common';
import { Integration } from '../integration';

export interface KubernetesRunHelmCMDsState {
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
     * The Helm version.
     */
    helm_version: string;

    /**
     * The name of the action.
     */
    name: string;

    /**
     * The host for the connection.
     */
    server: string;

    /**
     * Specifies when the action should be executed. Can be one of `ON_EVERY_EXECUTION`, `ON_FAILURE` or `ON_BACK_TO_SUCCESS`. The default value is `ON_EVERY_EXECUTION`.
     */
    trigger_time: 'ON_EVERY_EXECUTION' | 'ON_FAILURE' | 'ON_BACK_TO_SUCCESS';

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
     * When set to 'true' the action is disabled.  By default it is set to 'false'.
     */
    disabled?: boolean;

    /**
     * Amazon integration ID. Set it if Helm repository is on AWS S3.
     */
    helm_repository_integration?: IntegrationRef | Integration;

    /**
     * Service Account Key from Google Cloud Storage. Set it if Helm repository is on GCS.
     */
    helm_repository_key?: string;

    /**
     * Helm repository region. Set it if Helm repository is on AWS S3.
     */
    helm_repository_region?: string;

    /**
     * If set to 'true' the execution will proceed, mark action as a warning and jump to the next action. Doesn't apply to deployment actions.
     */
    ignore_errors?: boolean;

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
     * Allow you to install Helm plugins.
     */
    setup_commands?: string[];

    /**
     * The name of the shell that will be used to execute commands. Can be one of `SH` (default) or `BASH`.
     */
    shell?: 'SH' | 'BASH';

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

export type KubernetesRunHelmCMDsArgs = AsInputs<KubernetesRunHelmCMDsState>;

export interface KubernetesRunHelmCMDsProps {
    url: string;
    html_url: string;
    action_id: number;
    auth_type: 'BASIC' | 'TOKEN' | 'CERTS';
    execute_commands: string[];
    helm_version: string;
    name: string;
    server: string;
    trigger_time: 'ON_EVERY_EXECUTION' | 'ON_FAILURE' | 'ON_BACK_TO_SUCCESS';
    type: 'HELM';
    after_action_id?: number;
    client_ca?: string;
    client_cert?: string;
    client_key?: string;
    disabled?: boolean;
    helm_repository_integration?: IntegrationRef | Integration;
    helm_repository_key?: string;
    helm_repository_region?: string;
    ignore_errors?: boolean;
    kubectl_version?: string;
    login?: string;
    password?: string;
    retry_count?: number;
    retry_interval?: number;
    run_next_parallel?: boolean;
    run_only_on_first_failure?: boolean;
    setup_commands?: string[];
    shell?: 'SH' | 'BASH';
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
export class KubernetesRunHelmCMDs extends CustomResource {
    static __pulumiType = 'buddy:action:KubernetesRunHelmCMDs';

    static get(name: string, id: Input<ID>, state?: Partial<KubernetesRunHelmCMDsState>, opts?: CustomResourceOptions) {
        return new KubernetesRunHelmCMDs(name, state as any, { ...opts, id });
    }

    static isInstance(obj: any): obj is KubernetesRunHelmCMDs {
        if (null == obj) {
            return false;
        }

        return obj['__pulumiType'] === KubernetesRunHelmCMDs.__pulumiType;
    }

    project_name!: Output<string>;
    pipeline_id!: Output<number>;
    action_id!: Output<number>;
    auth_type!: Output<'BASIC' | 'TOKEN' | 'CERTS'>;
    execute_commands!: Output<string[]>;
    helm_version!: Output<string>;
    name!: Output<string>;
    server!: Output<string>;
    trigger_time!: Output<'ON_EVERY_EXECUTION' | 'ON_FAILURE' | 'ON_BACK_TO_SUCCESS'>;
    type!: Output<'HELM'>;
    after_action_id!: Output<number | undefined>;
    client_ca!: Output<string | undefined>;
    client_cert!: Output<string | undefined>;
    client_key!: Output<string | undefined>;
    disabled!: Output<boolean | undefined>;
    helm_repository_integration!: Output<IntegrationRef | Integration | undefined>;
    helm_repository_key!: Output<string | undefined>;
    helm_repository_region!: Output<string | undefined>;
    ignore_errors!: Output<boolean | undefined>;
    kubectl_version!: Output<string | undefined>;
    login!: Output<string | undefined>;
    password!: Output<string | undefined>;
    retry_count!: Output<number | undefined>;
    retry_interval!: Output<number | undefined>;
    run_next_parallel!: Output<boolean | undefined>;
    run_only_on_first_failure!: Output<boolean | undefined>;
    setup_commands!: Output<string[] | undefined>;
    shell!: Output<'SH' | 'BASH' | undefined>;
    timeout!: Output<number | undefined>;
    token!: Output<string | undefined>;
    trigger_conditions!: Output<TriggerCondition[] | undefined>;
    variables!: Output<Variable[] | undefined>;

    constructor(name: string, argsOrState: KubernetesRunHelmCMDsArgs | KubernetesRunHelmCMDsState, opts?: CustomResourceOptions) {
        const inputs: Inputs = {};
        if (!opts) {
            opts = {};
        }

        if (opts.id) {
            const state = argsOrState as KubernetesRunHelmCMDsState | undefined;
            inputs['project_name'] = state?.project_name;
            inputs['pipeline_id'] = state?.pipeline_id;
            inputs['auth_type'] = state?.auth_type;
            inputs['execute_commands'] = state?.execute_commands;
            inputs['helm_version'] = state?.helm_version;
            inputs['name'] = state?.name;
            inputs['server'] = state?.server;
            inputs['trigger_time'] = state?.trigger_time;
            inputs['after_action_id'] = state?.after_action_id;
            inputs['client_ca'] = state?.client_ca;
            inputs['client_cert'] = state?.client_cert;
            inputs['client_key'] = state?.client_key;
            inputs['disabled'] = state?.disabled;
            inputs['helm_repository_integration'] =
                state?.helm_repository_integration instanceof Integration
                    ? { hash_id: state.helm_repository_integration.hash_id }
                    : state?.helm_repository_integration;
            inputs['helm_repository_key'] = state?.helm_repository_key;
            inputs['helm_repository_region'] = state?.helm_repository_region;
            inputs['ignore_errors'] = state?.ignore_errors;
            inputs['kubectl_version'] = state?.kubectl_version;
            inputs['login'] = state?.login;
            inputs['password'] = state?.password;
            inputs['retry_count'] = state?.retry_count;
            inputs['retry_interval'] = state?.retry_interval;
            inputs['run_next_parallel'] = state?.run_next_parallel;
            inputs['run_only_on_first_failure'] = state?.run_only_on_first_failure;
            inputs['setup_commands'] = state?.setup_commands;
            inputs['shell'] = state?.shell;
            inputs['timeout'] = state?.timeout;
            inputs['token'] = state?.token;
            inputs['trigger_conditions'] = state?.trigger_conditions;
            inputs['variables'] = state?.variables;
        } else {
            const args = argsOrState as KubernetesRunHelmCMDsArgs | undefined;
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

            if (!args?.helm_version) {
                throw new Error('Missing required property "helm_version"');
            }

            if (!args?.name) {
                throw new Error('Missing required property "name"');
            }

            if (!args?.server) {
                throw new Error('Missing required property "server"');
            }

            if (!args?.trigger_time) {
                throw new Error('Missing required property "trigger_time"');
            }

            inputs['auth_type'] = args.auth_type;
            inputs['execute_commands'] = args.execute_commands;
            inputs['helm_version'] = args.helm_version;
            inputs['name'] = args.name;
            inputs['server'] = args.server;
            inputs['trigger_time'] = args.trigger_time;
            inputs['after_action_id'] = args.after_action_id;
            inputs['client_ca'] = args.client_ca;
            inputs['client_cert'] = args.client_cert;
            inputs['client_key'] = args.client_key;
            inputs['disabled'] = args.disabled;
            inputs['helm_repository_integration'] = output(
                args.helm_repository_integration as Output<IntegrationRef | Integration>
            ).apply(helm_repository_integration =>
                helm_repository_integration instanceof Integration
                    ? { hash_id: helm_repository_integration.hash_id }
                    : helm_repository_integration
            );
            inputs['helm_repository_key'] = args.helm_repository_key;
            inputs['helm_repository_region'] = args.helm_repository_region;
            inputs['ignore_errors'] = args.ignore_errors;
            inputs['kubectl_version'] = args.kubectl_version;
            inputs['login'] = args.login;
            inputs['password'] = args.password;
            inputs['retry_count'] = args.retry_count;
            inputs['retry_interval'] = args.retry_interval;
            inputs['run_next_parallel'] = args.run_next_parallel;
            inputs['run_only_on_first_failure'] = args.run_only_on_first_failure;
            inputs['setup_commands'] = args.setup_commands;
            inputs['shell'] = args.shell;
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

        if (null == opts.deleteBeforeReplace) {
            opts.deleteBeforeReplace = true;
        }

        opts.ignoreChanges = ['project_name', 'pipeline_id', ...(opts.ignoreChanges || [])];

        inputs['type'] = 'HELM';
        inputs['url'] = undefined;
        inputs['html_url'] = undefined;
        inputs['action_id'] = undefined;

        super(KubernetesRunHelmCMDs.__pulumiType, name, inputs, opts);
    }
}
