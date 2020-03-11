import { AsInputs } from '../utils';
import { PipelineProps } from '../pipeline';
import { CustomResource, Input, Output, ID, CustomResourceOptions, Inputs } from '@pulumi/pulumi';
import { IntegrationRef, Variable } from '../common';

export interface ActionGKERunPodState {
    project_name: string;
    pipeline_id: number;
    /**
     * The ID of the GKE application.
     */
    application_id: string;

    /**
     * The ID of the GKE cluster.
     */
    cluster: string;

    /**
     * Authorization type. Can be one of `BASIC`, `SERVICE_ACCOUNT` or `CERTS`.
     */
    gke_auth_type: 'BASIC' | 'SERVICE_ACCOUNT' | 'CERTS';

    /**
     * The integration.
     */
    integration: IntegrationRef;

    /**
     * The name of the action.
     */
    name: string;

    /**
     * The ID of the GKE zone.
     */
    zone_id: string;

    /**
     * The numerical ID of the action, after which this action should be added.
     */
    after_action_id?: number;

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
     * Defines whether to leave the Pod or delete it after the action finishes.
     */
    leave_after?: boolean;

    /**
     * Defines whether the execution should or should not wait for job to end.
     */
    not_wait?: boolean;

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
     * The server key required when `gke_auth_type` is set to `SERVICE_ACCOUNT`.
     */
    server_key?: string;

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
    trigger_time: 'ON_EVERY_EXECUTION' | 'ON_FAILURE' | 'ON_BACK_TO_SUCCESS';

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

export type ActionGKERunPodArgs = AsInputs<ActionGKERunPodState>;

export interface ActionGKERunPodProps {
    url: string;
    html_url: string;
    action_id: number;
    application_id: string;
    cluster: string;
    gke_auth_type: 'BASIC' | 'SERVICE_ACCOUNT' | 'CERTS';
    integration: IntegrationRef;
    name: string;
    type: 'KUBERNETES_RUN_POD';
    zone_id: string;
    after_action_id?: number;
    config_path?: string;
    content?: string;
    disabled?: boolean;
    leave_after?: boolean;
    not_wait?: boolean;
    record_arg?: 'TRUE' | 'FALSE' | 'NOT_SET';
    run_next_parallel?: boolean;
    run_only_on_first_failure?: boolean;
    server_key?: string;
    timeout?: number;
    trigger_condition?: 'ALWAYS' | 'ON_CHANGE' | 'ON_CHANGE_AT_PATH' | 'VAR_IS' | 'VAR_IS_NOT' | 'VAR_CONTAINS';
    trigger_condition_paths?: string[];
    trigger_time: 'ON_EVERY_EXECUTION' | 'ON_FAILURE' | 'ON_BACK_TO_SUCCESS';
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
export class GKERunPod extends CustomResource {
    static __pulumiType = 'buddy:action:GKERunPod';

    static get(name: string, id: Input<ID>, state?: Partial<ActionGKERunPodState>, opts?: CustomResourceOptions) {
        return new GKERunPod(name, state as any, { ...opts, id });
    }

    static isInstance(obj: any): obj is GKERunPod {
        if (null == obj) {
            return false;
        }

        return obj['__pulumiType'] === GKERunPod.__pulumiType;
    }

    project_name!: Output<string>;
    pipeline_id!: Output<number>;
    action_id!: Output<number>;
    application_id!: Output<string>;
    cluster!: Output<string>;
    gke_auth_type!: Output<'BASIC' | 'SERVICE_ACCOUNT' | 'CERTS'>;
    integration!: Output<IntegrationRef>;
    name!: Output<string>;
    type!: Output<'KUBERNETES_RUN_POD'>;
    zone_id!: Output<string>;
    after_action_id!: Output<number | undefined>;
    config_path!: Output<string | undefined>;
    content!: Output<string | undefined>;
    disabled!: Output<boolean | undefined>;
    leave_after!: Output<boolean | undefined>;
    not_wait!: Output<boolean | undefined>;
    record_arg!: Output<'TRUE' | 'FALSE' | 'NOT_SET' | undefined>;
    run_next_parallel!: Output<boolean | undefined>;
    run_only_on_first_failure!: Output<boolean | undefined>;
    server_key!: Output<string | undefined>;
    timeout!: Output<number | undefined>;
    trigger_condition!: Output<'ALWAYS' | 'ON_CHANGE' | 'ON_CHANGE_AT_PATH' | 'VAR_IS' | 'VAR_IS_NOT' | 'VAR_CONTAINS' | undefined>;
    trigger_condition_paths!: Output<string[] | undefined>;
    trigger_time!: Output<'ON_EVERY_EXECUTION' | 'ON_FAILURE' | 'ON_BACK_TO_SUCCESS'>;
    trigger_variable_key!: Output<string | undefined>;
    trigger_variable_value!: Output<string | undefined>;
    variables!: Output<Variable[] | undefined>;

    constructor(name: string, argsOrState: ActionGKERunPodArgs | ActionGKERunPodState, opts?: CustomResourceOptions) {
        const inputs: Inputs = {};
        if (!opts) {
            opts = {};
        }

        if (opts.id) {
            const state = argsOrState as ActionGKERunPodState | undefined;
            inputs['project_name'] = state?.project_name;
            inputs['pipeline_id'] = state?.pipeline_id;
            inputs['application_id'] = state?.application_id;
            inputs['cluster'] = state?.cluster;
            inputs['gke_auth_type'] = state?.gke_auth_type;
            inputs['integration'] = state?.integration;
            inputs['name'] = state?.name;
            inputs['zone_id'] = state?.zone_id;
            inputs['after_action_id'] = state?.after_action_id;
            inputs['config_path'] = state?.config_path;
            inputs['content'] = state?.content;
            inputs['disabled'] = state?.disabled;
            inputs['leave_after'] = state?.leave_after;
            inputs['not_wait'] = state?.not_wait;
            inputs['record_arg'] = state?.record_arg;
            inputs['run_next_parallel'] = state?.run_next_parallel;
            inputs['run_only_on_first_failure'] = state?.run_only_on_first_failure;
            inputs['server_key'] = state?.server_key;
            inputs['timeout'] = state?.timeout;
            inputs['trigger_condition'] = state?.trigger_condition;
            inputs['trigger_condition_paths'] = state?.trigger_condition_paths;
            inputs['trigger_time'] = state?.trigger_time;
            inputs['trigger_variable_key'] = state?.trigger_variable_key;
            inputs['trigger_variable_value'] = state?.trigger_variable_value;
            inputs['variables'] = state?.variables;
        } else {
            const args = argsOrState as ActionGKERunPodArgs | undefined;
            if (!args?.project_name) {
                throw new Error('Missing required property "project_name"');
            }

            if (!args?.pipeline_id) {
                throw new Error('Missing required property "pipeline_id"');
            }

            if (!args?.application_id) {
                throw new Error('Missing required property "application_id"');
            }

            if (!args?.cluster) {
                throw new Error('Missing required property "cluster"');
            }

            if (!args?.gke_auth_type) {
                throw new Error('Missing required property "gke_auth_type"');
            }

            if (!args?.integration) {
                throw new Error('Missing required property "integration"');
            }

            if (!args?.name) {
                throw new Error('Missing required property "name"');
            }

            if (!args?.zone_id) {
                throw new Error('Missing required property "zone_id"');
            }

            if (!args?.trigger_time) {
                throw new Error('Missing required property "trigger_time"');
            }

            inputs['application_id'] = args.application_id;
            inputs['cluster'] = args.cluster;
            inputs['gke_auth_type'] = args.gke_auth_type;
            inputs['integration'] = args.integration;
            inputs['name'] = args.name;
            inputs['zone_id'] = args.zone_id;
            inputs['after_action_id'] = args.after_action_id;
            inputs['config_path'] = args.config_path;
            inputs['content'] = args.content;
            inputs['disabled'] = args.disabled;
            inputs['leave_after'] = args.leave_after;
            inputs['not_wait'] = args.not_wait;
            inputs['record_arg'] = args.record_arg;
            inputs['run_next_parallel'] = args.run_next_parallel;
            inputs['run_only_on_first_failure'] = args.run_only_on_first_failure;
            inputs['server_key'] = args.server_key;
            inputs['timeout'] = args.timeout;
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

        inputs['type'] = 'KUBERNETES_RUN_POD';
        inputs['url'] = undefined;
        inputs['html_url'] = undefined;
        inputs['action_id'] = undefined;

        super(GKERunPod.__pulumiType, name, inputs, opts);
    }
}
