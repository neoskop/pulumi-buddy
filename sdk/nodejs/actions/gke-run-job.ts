import { AsInputs } from '@pulumi-utils/sdk';
import { PipelineProps } from '../pipeline';
import { CustomResource, Input, Output, ID, CustomResourceOptions, Inputs, output } from '@pulumi/pulumi';
import { IntegrationRef, TriggerCondition, Variable } from '../common';
import { Integration } from '../integration';

export interface GKERunJobState {
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
     * Authorization type. Set to `SERVICE_ACCOUNT`.
     */
    gke_auth_type: string;

    /**
     * The integration.
     */
    integration: IntegrationRef | Integration;

    /**
     * The name of the action.
     */
    name: string;

    /**
     * Specifies when the action should be executed. Can be one of `ON_EVERY_EXECUTION`, `ON_FAILURE` or `ON_BACK_TO_SUCCESS`. The default value is `ON_EVERY_EXECUTION`.
     */
    trigger_time: 'ON_EVERY_EXECUTION' | 'ON_FAILURE' | 'ON_BACK_TO_SUCCESS';

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
     * If set to `true` the execution will proceed, mark action as a warning and jump to the next action. Doesn't apply to deployment actions.
     */
    ignore_errors?: boolean;

    /**
     * Defines whether to leave the Job or delete it after the action finishes.
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
}

export type GKERunJobArgs = AsInputs<GKERunJobState>;

export interface GKERunJobProps {
    url: string;
    html_url: string;
    action_id: number;
    application_id: string;
    cluster: string;
    gke_auth_type: string;
    integration: IntegrationRef | Integration;
    name: string;
    trigger_time: 'ON_EVERY_EXECUTION' | 'ON_FAILURE' | 'ON_BACK_TO_SUCCESS';
    type: 'KUBERNETES_RUN_JOB';
    zone_id: string;
    after_action_id?: number;
    config_path?: string;
    content?: string;
    disabled?: boolean;
    ignore_errors?: boolean;
    leave_after?: boolean;
    not_wait?: boolean;
    record_arg?: 'TRUE' | 'FALSE' | 'NOT_SET';
    retry_count?: number;
    retry_interval?: number;
    run_next_parallel?: boolean;
    run_only_on_first_failure?: boolean;
    timeout?: number;
    trigger_conditions?: TriggerCondition[];
    variables: Variable[];
    pipeline: PipelineProps;
    project_name: string;
    pipeline_id: number;
}

/**
 * Required scopes in Buddy API: `WORKSPACE`, `EXECUTION_MANAGE`, `EXECUTION_INFO`
 */
export class GKERunJob extends CustomResource {
    static __pulumiType = 'buddy:action:GKERunJob';

    static get(name: string, id: Input<ID>, state?: Partial<GKERunJobState>, opts?: CustomResourceOptions) {
        return new GKERunJob(name, state as any, { ...opts, id });
    }

    static isInstance(obj: any): obj is GKERunJob {
        if (null == obj) {
            return false;
        }

        return obj['__pulumiType'] === GKERunJob.__pulumiType;
    }

    project_name!: Output<string>;
    pipeline_id!: Output<number>;
    action_id!: Output<number>;
    application_id!: Output<string>;
    cluster!: Output<string>;
    gke_auth_type!: Output<string>;
    integration!: Output<IntegrationRef | Integration>;
    name!: Output<string>;
    trigger_time!: Output<'ON_EVERY_EXECUTION' | 'ON_FAILURE' | 'ON_BACK_TO_SUCCESS'>;
    type!: Output<'KUBERNETES_RUN_JOB'>;
    zone_id!: Output<string>;
    after_action_id!: Output<number | undefined>;
    config_path!: Output<string | undefined>;
    content!: Output<string | undefined>;
    disabled!: Output<boolean | undefined>;
    ignore_errors!: Output<boolean | undefined>;
    leave_after!: Output<boolean | undefined>;
    not_wait!: Output<boolean | undefined>;
    record_arg!: Output<'TRUE' | 'FALSE' | 'NOT_SET' | undefined>;
    retry_count!: Output<number | undefined>;
    retry_interval!: Output<number | undefined>;
    run_next_parallel!: Output<boolean | undefined>;
    run_only_on_first_failure!: Output<boolean | undefined>;
    timeout!: Output<number | undefined>;
    trigger_conditions!: Output<TriggerCondition[] | undefined>;
    variables!: Output<Variable[]>;

    constructor(name: string, argsOrState: GKERunJobArgs | GKERunJobState, opts?: CustomResourceOptions) {
        const inputs: Inputs = {};
        if (!opts) {
            opts = {};
        }

        if (opts.id) {
            const state = argsOrState as GKERunJobState | undefined;
            inputs['project_name'] = state?.project_name;
            inputs['pipeline_id'] = state?.pipeline_id;
            inputs['application_id'] = state?.application_id;
            inputs['cluster'] = state?.cluster;
            inputs['gke_auth_type'] = state?.gke_auth_type;
            inputs['integration'] = state?.integration instanceof Integration ? { hash_id: state.integration.hash_id } : state?.integration;
            inputs['name'] = state?.name;
            inputs['trigger_time'] = state?.trigger_time;
            inputs['zone_id'] = state?.zone_id;
            inputs['after_action_id'] = state?.after_action_id;
            inputs['config_path'] = state?.config_path;
            inputs['content'] = state?.content;
            inputs['disabled'] = state?.disabled;
            inputs['ignore_errors'] = state?.ignore_errors;
            inputs['leave_after'] = state?.leave_after;
            inputs['not_wait'] = state?.not_wait;
            inputs['record_arg'] = state?.record_arg;
            inputs['retry_count'] = state?.retry_count;
            inputs['retry_interval'] = state?.retry_interval;
            inputs['run_next_parallel'] = state?.run_next_parallel;
            inputs['run_only_on_first_failure'] = state?.run_only_on_first_failure;
            inputs['timeout'] = state?.timeout;
            inputs['trigger_conditions'] = state?.trigger_conditions;
            inputs['variables'] = state?.variables;
        } else {
            const args = argsOrState as GKERunJobArgs | undefined;
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

            if (!args?.trigger_time) {
                throw new Error('Missing required property "trigger_time"');
            }

            if (!args?.zone_id) {
                throw new Error('Missing required property "zone_id"');
            }

            if (!args?.variables) {
                throw new Error('Missing required property "variables"');
            }

            inputs['application_id'] = args.application_id;
            inputs['cluster'] = args.cluster;
            inputs['gke_auth_type'] = args.gke_auth_type;
            inputs['integration'] = output(args.integration as Output<IntegrationRef | Integration>).apply(integration =>
                integration instanceof Integration ? { hash_id: integration.hash_id } : integration
            );
            inputs['name'] = args.name;
            inputs['trigger_time'] = args.trigger_time;
            inputs['zone_id'] = args.zone_id;
            inputs['after_action_id'] = args.after_action_id;
            inputs['config_path'] = args.config_path;
            inputs['content'] = args.content;
            inputs['disabled'] = args.disabled;
            inputs['ignore_errors'] = args.ignore_errors;
            inputs['leave_after'] = args.leave_after;
            inputs['not_wait'] = args.not_wait;
            inputs['record_arg'] = args.record_arg;
            inputs['retry_count'] = args.retry_count;
            inputs['retry_interval'] = args.retry_interval;
            inputs['run_next_parallel'] = args.run_next_parallel;
            inputs['run_only_on_first_failure'] = args.run_only_on_first_failure;
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

        inputs['type'] = 'KUBERNETES_RUN_JOB';
        inputs['url'] = undefined;
        inputs['html_url'] = undefined;
        inputs['action_id'] = undefined;

        super(GKERunJob.__pulumiType, name, inputs, opts);
    }
}
