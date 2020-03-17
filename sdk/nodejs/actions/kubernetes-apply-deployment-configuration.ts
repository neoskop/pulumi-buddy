import { AsInputs } from '@neoskop/pulumi-utils-sdk';
import { PipelineProps } from '../pipeline';
import { CustomResource, Input, Output, ID, CustomResourceOptions, Inputs } from '@pulumi/pulumi';
import { Variable } from '../common';

export interface ActionKubernetesApplyDeploymentConfigurationState {
    project_name: string;
    pipeline_id: number;
    /**
     * Authorization type. Can be one of `BASIC`, `TOKEN` or `CERTS`.
     */
    auth_type: 'BASIC' | 'TOKEN' | 'CERTS';

    /**
     * The path to the configuration file.
     */
    config_path: string;

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
     * Defines whether to select all the specified resources.
     */
    all_arg?: boolean;

    /**
     * Only relevant during a prune or a force apply. If `true`, cascade the deletion of the resources managed by pruned or deleted resources (e.g. Pods created by a ReplicationController).
     */
    cascade_arg?: boolean;

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
     * Delete and re-create the specified resource, when PATCH encounters conflict and has retried for 5 times.
     */
    force_arg?: boolean;

    /**
     * Only relevant during a prune or a force apply. Period of time in seconds given to pruned or deleted resources to terminate gracefully. Ignored if negative.
     */
    grace_period_arg?: number;

    /**
     * Version of the kubectl used in the action. Default is “latest”.
     */
    kubectl_version?: string;

    /**
     * The username required when `auth_type` is set to `BASIC`.
     */
    login?: string;

    /**
     * Automatically resolve conflicts between the modified and live configuration by using values from the modified configuration.
     */
    overwrite_arg?: boolean;

    /**
     * The password required when `auth_type` is set to `BASIC`.
     */
    password?: string;

    /**
     * Automatically delete resource objects that do not appear in the configs and are created by either apply or create –save-config. Should be used with either -l or –all.
     */
    prune_arg?: boolean;

    /**
     * Overwrite the default whitelist with <group/version/kind> for –prune.
     */
    prune_whitelist_arg?: string;

    /**
     * Record current kubectl command in the resource annotation. Can be one of `TRUE`, `FALSE` or `NOT_SET`. If set to false, do not record the command. If set to `true`, record the command. If not set, default to updating the existing annotation value only if one already exists.
     */
    record_arg?: 'TRUE' | 'FALSE' | 'NOT_SET';

    /**
     * When set to `true`, the subsequent action defined in the pipeline will run in parallel to the current action.
     */
    run_next_parallel?: boolean;

    /**
     * Defines whether the action should be executed on each failure. Restricted to and required if the `trigger_time` is `ON_FAILURE`.
     */
    run_only_on_first_failure?: boolean;

    /**
     * If `true`, the configuration of current object will be saved in its annotation. Otherwise, the annotation will be unchanged. This flag is useful when you want to perform kubectl apply on this object in the future.
     */
    save_config_arg?: boolean;

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

export type ActionKubernetesApplyDeploymentConfigurationArgs = AsInputs<ActionKubernetesApplyDeploymentConfigurationState>;

export interface ActionKubernetesApplyDeploymentConfigurationProps {
    url: string;
    html_url: string;
    action_id: number;
    auth_type: 'BASIC' | 'TOKEN' | 'CERTS';
    config_path: string;
    name: string;
    server: string;
    trigger_time: 'ON_EVERY_EXECUTION' | 'ON_FAILURE' | 'ON_BACK_TO_SUCCESS';
    type: 'KUBERNETES_APPLY';
    after_action_id?: number;
    all_arg?: boolean;
    cascade_arg?: boolean;
    client_ca?: string;
    client_cert?: string;
    client_key?: string;
    disabled?: boolean;
    force_arg?: boolean;
    grace_period_arg?: number;
    kubectl_version?: string;
    login?: string;
    overwrite_arg?: boolean;
    password?: string;
    prune_arg?: boolean;
    prune_whitelist_arg?: string;
    record_arg?: 'TRUE' | 'FALSE' | 'NOT_SET';
    run_next_parallel?: boolean;
    run_only_on_first_failure?: boolean;
    save_config_arg?: boolean;
    timeout?: number;
    token?: string;
    trigger_condition?: 'ALWAYS' | 'ON_CHANGE' | 'ON_CHANGE_AT_PATH' | 'VAR_IS' | 'VAR_IS_NOT' | 'VAR_CONTAINS';
    trigger_condition_paths?: string[];
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
export class KubernetesApplyDeploymentConfiguration extends CustomResource {
    static __pulumiType = 'buddy:action:KubernetesApplyDeploymentConfiguration';

    static get(
        name: string,
        id: Input<ID>,
        state?: Partial<ActionKubernetesApplyDeploymentConfigurationState>,
        opts?: CustomResourceOptions
    ) {
        return new KubernetesApplyDeploymentConfiguration(name, state as any, { ...opts, id });
    }

    static isInstance(obj: any): obj is KubernetesApplyDeploymentConfiguration {
        if (null == obj) {
            return false;
        }

        return obj['__pulumiType'] === KubernetesApplyDeploymentConfiguration.__pulumiType;
    }

    project_name!: Output<string>;
    pipeline_id!: Output<number>;
    action_id!: Output<number>;
    auth_type!: Output<'BASIC' | 'TOKEN' | 'CERTS'>;
    config_path!: Output<string>;
    name!: Output<string>;
    server!: Output<string>;
    trigger_time!: Output<'ON_EVERY_EXECUTION' | 'ON_FAILURE' | 'ON_BACK_TO_SUCCESS'>;
    type!: Output<'KUBERNETES_APPLY'>;
    after_action_id!: Output<number | undefined>;
    all_arg!: Output<boolean | undefined>;
    cascade_arg!: Output<boolean | undefined>;
    client_ca!: Output<string | undefined>;
    client_cert!: Output<string | undefined>;
    client_key!: Output<string | undefined>;
    disabled!: Output<boolean | undefined>;
    force_arg!: Output<boolean | undefined>;
    grace_period_arg!: Output<number | undefined>;
    kubectl_version!: Output<string | undefined>;
    login!: Output<string | undefined>;
    overwrite_arg!: Output<boolean | undefined>;
    password!: Output<string | undefined>;
    prune_arg!: Output<boolean | undefined>;
    prune_whitelist_arg!: Output<string | undefined>;
    record_arg!: Output<'TRUE' | 'FALSE' | 'NOT_SET' | undefined>;
    run_next_parallel!: Output<boolean | undefined>;
    run_only_on_first_failure!: Output<boolean | undefined>;
    save_config_arg!: Output<boolean | undefined>;
    timeout!: Output<number | undefined>;
    token!: Output<string | undefined>;
    trigger_condition!: Output<'ALWAYS' | 'ON_CHANGE' | 'ON_CHANGE_AT_PATH' | 'VAR_IS' | 'VAR_IS_NOT' | 'VAR_CONTAINS' | undefined>;
    trigger_condition_paths!: Output<string[] | undefined>;
    trigger_variable_key!: Output<string | undefined>;
    trigger_variable_value!: Output<string | undefined>;
    variables!: Output<Variable[] | undefined>;

    constructor(
        name: string,
        argsOrState: ActionKubernetesApplyDeploymentConfigurationArgs | ActionKubernetesApplyDeploymentConfigurationState,
        opts?: CustomResourceOptions
    ) {
        const inputs: Inputs = {};
        if (!opts) {
            opts = {};
        }

        if (opts.id) {
            const state = argsOrState as ActionKubernetesApplyDeploymentConfigurationState | undefined;
            inputs['project_name'] = state?.project_name;
            inputs['pipeline_id'] = state?.pipeline_id;
            inputs['auth_type'] = state?.auth_type;
            inputs['config_path'] = state?.config_path;
            inputs['name'] = state?.name;
            inputs['server'] = state?.server;
            inputs['trigger_time'] = state?.trigger_time;
            inputs['after_action_id'] = state?.after_action_id;
            inputs['all_arg'] = state?.all_arg;
            inputs['cascade_arg'] = state?.cascade_arg;
            inputs['client_ca'] = state?.client_ca;
            inputs['client_cert'] = state?.client_cert;
            inputs['client_key'] = state?.client_key;
            inputs['disabled'] = state?.disabled;
            inputs['force_arg'] = state?.force_arg;
            inputs['grace_period_arg'] = state?.grace_period_arg;
            inputs['kubectl_version'] = state?.kubectl_version;
            inputs['login'] = state?.login;
            inputs['overwrite_arg'] = state?.overwrite_arg;
            inputs['password'] = state?.password;
            inputs['prune_arg'] = state?.prune_arg;
            inputs['prune_whitelist_arg'] = state?.prune_whitelist_arg;
            inputs['record_arg'] = state?.record_arg;
            inputs['run_next_parallel'] = state?.run_next_parallel;
            inputs['run_only_on_first_failure'] = state?.run_only_on_first_failure;
            inputs['save_config_arg'] = state?.save_config_arg;
            inputs['timeout'] = state?.timeout;
            inputs['token'] = state?.token;
            inputs['trigger_condition'] = state?.trigger_condition;
            inputs['trigger_condition_paths'] = state?.trigger_condition_paths;
            inputs['trigger_variable_key'] = state?.trigger_variable_key;
            inputs['trigger_variable_value'] = state?.trigger_variable_value;
            inputs['variables'] = state?.variables;
        } else {
            const args = argsOrState as ActionKubernetesApplyDeploymentConfigurationArgs | undefined;
            if (!args?.project_name) {
                throw new Error('Missing required property "project_name"');
            }

            if (!args?.pipeline_id) {
                throw new Error('Missing required property "pipeline_id"');
            }

            if (!args?.auth_type) {
                throw new Error('Missing required property "auth_type"');
            }

            if (!args?.config_path) {
                throw new Error('Missing required property "config_path"');
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
            inputs['config_path'] = args.config_path;
            inputs['name'] = args.name;
            inputs['server'] = args.server;
            inputs['trigger_time'] = args.trigger_time;
            inputs['after_action_id'] = args.after_action_id;
            inputs['all_arg'] = args.all_arg;
            inputs['cascade_arg'] = args.cascade_arg;
            inputs['client_ca'] = args.client_ca;
            inputs['client_cert'] = args.client_cert;
            inputs['client_key'] = args.client_key;
            inputs['disabled'] = args.disabled;
            inputs['force_arg'] = args.force_arg;
            inputs['grace_period_arg'] = args.grace_period_arg;
            inputs['kubectl_version'] = args.kubectl_version;
            inputs['login'] = args.login;
            inputs['overwrite_arg'] = args.overwrite_arg;
            inputs['password'] = args.password;
            inputs['prune_arg'] = args.prune_arg;
            inputs['prune_whitelist_arg'] = args.prune_whitelist_arg;
            inputs['record_arg'] = args.record_arg;
            inputs['run_next_parallel'] = args.run_next_parallel;
            inputs['run_only_on_first_failure'] = args.run_only_on_first_failure;
            inputs['save_config_arg'] = args.save_config_arg;
            inputs['timeout'] = args.timeout;
            inputs['token'] = args.token;
            inputs['trigger_condition'] = args.trigger_condition;
            inputs['trigger_condition_paths'] = args.trigger_condition_paths;
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

        inputs['type'] = 'KUBERNETES_APPLY';
        inputs['url'] = undefined;
        inputs['html_url'] = undefined;
        inputs['action_id'] = undefined;

        super(KubernetesApplyDeploymentConfiguration.__pulumiType, name, inputs, opts);
    }
}
