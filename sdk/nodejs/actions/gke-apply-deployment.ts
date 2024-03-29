import { AsInputs } from '@pulumi-utils/sdk';
import { PipelineProps } from '../pipeline';
import { CustomResource, Input, Output, ID, CustomResourceOptions, Inputs, output } from '@pulumi/pulumi';
import { IntegrationRef, TriggerCondition, Variable } from '../common';
import { Integration } from '../integration';

export interface GKEApplyDeploymentState {
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
     * The path to the configuration file.
     */
    config_path: string;

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
     * Defines whether to select all the specified resources.
     */
    all_arg?: boolean;

    /**
     * Only relevant during a prune or a force apply. If `true`, cascade the deletion of the resources managed by pruned or deleted resources (e.g. Pods created by a ReplicationController).
     */
    cascade_arg?: boolean;

    /**
     * When set to 'true' the action is disabled.  By default it is set to 'false'.
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
     * If set to 'true' the execution will proceed, mark action as a warning and jump to the next action. Doesn't apply to deployment actions.
     */
    ignore_errors?: boolean;

    /**
     * Version of the kubectl used in the action. Default is <latest<.
     */
    kubectl_version?: string;

    /**
     * Automatically resolve conflicts between the modified and live configuration by using values from the modified configuration.
     */
    overwrite_arg?: boolean;

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
     * If `true`, the configuration of current object will be saved in its annotation. Otherwise, the annotation will be unchanged. This flag is useful when you want to perform kubectl apply on this object in the future.
     */
    save_config_arg?: boolean;

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

export type GKEApplyDeploymentArgs = AsInputs<GKEApplyDeploymentState>;

export interface GKEApplyDeploymentProps {
    url: string;
    html_url: string;
    action_id: number;
    application_id: string;
    cluster: string;
    config_path: string;
    gke_auth_type: string;
    integration: IntegrationRef | Integration;
    name: string;
    trigger_time: 'ON_EVERY_EXECUTION' | 'ON_FAILURE' | 'ON_BACK_TO_SUCCESS';
    type: 'KUBERNETES_APPLY';
    zone_id: string;
    after_action_id?: number;
    all_arg?: boolean;
    cascade_arg?: boolean;
    disabled?: boolean;
    force_arg?: boolean;
    grace_period_arg?: number;
    ignore_errors?: boolean;
    kubectl_version?: string;
    overwrite_arg?: boolean;
    prune_arg?: boolean;
    prune_whitelist_arg?: string;
    record_arg?: 'TRUE' | 'FALSE' | 'NOT_SET';
    retry_count?: number;
    retry_interval?: number;
    run_next_parallel?: boolean;
    run_only_on_first_failure?: boolean;
    save_config_arg?: boolean;
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
export class GKEApplyDeployment extends CustomResource {
    static __pulumiType = 'buddy:action:GKEApplyDeployment';

    static get(name: string, id: Input<ID>, state?: Partial<GKEApplyDeploymentState>, opts?: CustomResourceOptions) {
        return new GKEApplyDeployment(name, state as any, { ...opts, id });
    }

    static isInstance(obj: any): obj is GKEApplyDeployment {
        if (null == obj) {
            return false;
        }

        return obj['__pulumiType'] === GKEApplyDeployment.__pulumiType;
    }

    project_name!: Output<string>;
    pipeline_id!: Output<number>;
    action_id!: Output<number>;
    application_id!: Output<string>;
    cluster!: Output<string>;
    config_path!: Output<string>;
    gke_auth_type!: Output<string>;
    integration!: Output<IntegrationRef | Integration>;
    name!: Output<string>;
    trigger_time!: Output<'ON_EVERY_EXECUTION' | 'ON_FAILURE' | 'ON_BACK_TO_SUCCESS'>;
    type!: Output<'KUBERNETES_APPLY'>;
    zone_id!: Output<string>;
    after_action_id!: Output<number | undefined>;
    all_arg!: Output<boolean | undefined>;
    cascade_arg!: Output<boolean | undefined>;
    disabled!: Output<boolean | undefined>;
    force_arg!: Output<boolean | undefined>;
    grace_period_arg!: Output<number | undefined>;
    ignore_errors!: Output<boolean | undefined>;
    kubectl_version!: Output<string | undefined>;
    overwrite_arg!: Output<boolean | undefined>;
    prune_arg!: Output<boolean | undefined>;
    prune_whitelist_arg!: Output<string | undefined>;
    record_arg!: Output<'TRUE' | 'FALSE' | 'NOT_SET' | undefined>;
    retry_count!: Output<number | undefined>;
    retry_interval!: Output<number | undefined>;
    run_next_parallel!: Output<boolean | undefined>;
    run_only_on_first_failure!: Output<boolean | undefined>;
    save_config_arg!: Output<boolean | undefined>;
    timeout!: Output<number | undefined>;
    trigger_conditions!: Output<TriggerCondition[] | undefined>;
    variables!: Output<Variable[] | undefined>;

    constructor(name: string, argsOrState: GKEApplyDeploymentArgs | GKEApplyDeploymentState, opts?: CustomResourceOptions) {
        const inputs: Inputs = {};
        if (!opts) {
            opts = {};
        }

        if (opts.id) {
            const state = argsOrState as GKEApplyDeploymentState | undefined;
            inputs['project_name'] = state?.project_name;
            inputs['pipeline_id'] = state?.pipeline_id;
            inputs['application_id'] = state?.application_id;
            inputs['cluster'] = state?.cluster;
            inputs['config_path'] = state?.config_path;
            inputs['gke_auth_type'] = state?.gke_auth_type;
            inputs['integration'] = state?.integration instanceof Integration ? { hash_id: state.integration.hash_id } : state?.integration;
            inputs['name'] = state?.name;
            inputs['trigger_time'] = state?.trigger_time;
            inputs['zone_id'] = state?.zone_id;
            inputs['after_action_id'] = state?.after_action_id;
            inputs['all_arg'] = state?.all_arg;
            inputs['cascade_arg'] = state?.cascade_arg;
            inputs['disabled'] = state?.disabled;
            inputs['force_arg'] = state?.force_arg;
            inputs['grace_period_arg'] = state?.grace_period_arg;
            inputs['ignore_errors'] = state?.ignore_errors;
            inputs['kubectl_version'] = state?.kubectl_version;
            inputs['overwrite_arg'] = state?.overwrite_arg;
            inputs['prune_arg'] = state?.prune_arg;
            inputs['prune_whitelist_arg'] = state?.prune_whitelist_arg;
            inputs['record_arg'] = state?.record_arg;
            inputs['retry_count'] = state?.retry_count;
            inputs['retry_interval'] = state?.retry_interval;
            inputs['run_next_parallel'] = state?.run_next_parallel;
            inputs['run_only_on_first_failure'] = state?.run_only_on_first_failure;
            inputs['save_config_arg'] = state?.save_config_arg;
            inputs['timeout'] = state?.timeout;
            inputs['trigger_conditions'] = state?.trigger_conditions;
            inputs['variables'] = state?.variables;
        } else {
            const args = argsOrState as GKEApplyDeploymentArgs | undefined;
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

            if (!args?.config_path) {
                throw new Error('Missing required property "config_path"');
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

            inputs['application_id'] = args.application_id;
            inputs['cluster'] = args.cluster;
            inputs['config_path'] = args.config_path;
            inputs['gke_auth_type'] = args.gke_auth_type;
            inputs['integration'] = output(args.integration as Output<IntegrationRef | Integration>).apply(integration =>
                integration instanceof Integration ? { hash_id: integration.hash_id } : integration
            );
            inputs['name'] = args.name;
            inputs['trigger_time'] = args.trigger_time;
            inputs['zone_id'] = args.zone_id;
            inputs['after_action_id'] = args.after_action_id;
            inputs['all_arg'] = args.all_arg;
            inputs['cascade_arg'] = args.cascade_arg;
            inputs['disabled'] = args.disabled;
            inputs['force_arg'] = args.force_arg;
            inputs['grace_period_arg'] = args.grace_period_arg;
            inputs['ignore_errors'] = args.ignore_errors;
            inputs['kubectl_version'] = args.kubectl_version;
            inputs['overwrite_arg'] = args.overwrite_arg;
            inputs['prune_arg'] = args.prune_arg;
            inputs['prune_whitelist_arg'] = args.prune_whitelist_arg;
            inputs['record_arg'] = args.record_arg;
            inputs['retry_count'] = args.retry_count;
            inputs['retry_interval'] = args.retry_interval;
            inputs['run_next_parallel'] = args.run_next_parallel;
            inputs['run_only_on_first_failure'] = args.run_only_on_first_failure;
            inputs['save_config_arg'] = args.save_config_arg;
            inputs['timeout'] = args.timeout;
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

        inputs['type'] = 'KUBERNETES_APPLY';
        inputs['url'] = undefined;
        inputs['html_url'] = undefined;
        inputs['action_id'] = undefined;

        super(GKEApplyDeployment.__pulumiType, name, inputs, opts);
    }
}
