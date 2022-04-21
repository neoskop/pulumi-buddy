import { AsInputs } from '@pulumi-utils/sdk';
import { PipelineProps } from '../pipeline';
import { CustomResource, Input, Output, ID, CustomResourceOptions, Inputs, output } from '@pulumi/pulumi';
import { IntegrationRef, TriggerCondition, Variable } from '../common';
import { Integration } from '../integration';

export interface GKERunHelmState {
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
     * The commands that will be executed.
     */
    execute_commands: string[];

    /**
     * The Helm version.
     */
    helm_version: string;

    /**
     * The ID of the Google integration.
     */
    integration_hash: IntegrationRef | Integration;

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
     * When set to `true` the action is disabled.  By default it is set to `false`.
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
     * If set to `true` the execution will proceed, mark action as a warning and jump to the next action. Doesn't apply to deployment actions.
     */
    ignore_errors?: boolean;

    /**
     * Version of the kubectl used in the action. Default is “latest”.
     */
    kubectl_version?: string;

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
     * The list of trigger conditions to meet so that the action can be triggered.
     */
    trigger_conditions?: TriggerCondition[];

    /**
     * The list of variables you can use the action.
     */
    variables?: Variable[];
}

export type GKERunHelmArgs = AsInputs<GKERunHelmState>;

export interface GKERunHelmProps {
    url: string;
    html_url: string;
    action_id: number;
    application_id: string;
    cluster: string;
    execute_commands: string[];
    helm_version: string;
    integration_hash: IntegrationRef | Integration;
    name: string;
    trigger_time: 'ON_EVERY_EXECUTION' | 'ON_FAILURE' | 'ON_BACK_TO_SUCCESS';
    type: 'HELM';
    zone_id: string;
    after_action_id?: number;
    disabled?: boolean;
    helm_repository_integration?: IntegrationRef | Integration;
    helm_repository_key?: string;
    helm_repository_region?: string;
    ignore_errors?: boolean;
    kubectl_version?: string;
    retry_count?: number;
    retry_interval?: number;
    run_next_parallel?: boolean;
    run_only_on_first_failure?: boolean;
    setup_commands?: string[];
    shell?: 'SH' | 'BASH';
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
export class GKERunHelm extends CustomResource {
    static __pulumiType = 'buddy:action:GKERunHelm';

    static get(name: string, id: Input<ID>, state?: Partial<GKERunHelmState>, opts?: CustomResourceOptions) {
        return new GKERunHelm(name, state as any, { ...opts, id });
    }

    static isInstance(obj: any): obj is GKERunHelm {
        if (null == obj) {
            return false;
        }

        return obj['__pulumiType'] === GKERunHelm.__pulumiType;
    }

    project_name!: Output<string>;
    pipeline_id!: Output<number>;
    action_id!: Output<number>;
    application_id!: Output<string>;
    cluster!: Output<string>;
    execute_commands!: Output<string[]>;
    helm_version!: Output<string>;
    integration_hash!: Output<IntegrationRef | Integration>;
    name!: Output<string>;
    trigger_time!: Output<'ON_EVERY_EXECUTION' | 'ON_FAILURE' | 'ON_BACK_TO_SUCCESS'>;
    type!: Output<'HELM'>;
    zone_id!: Output<string>;
    after_action_id!: Output<number | undefined>;
    disabled!: Output<boolean | undefined>;
    helm_repository_integration!: Output<IntegrationRef | Integration | undefined>;
    helm_repository_key!: Output<string | undefined>;
    helm_repository_region!: Output<string | undefined>;
    ignore_errors!: Output<boolean | undefined>;
    kubectl_version!: Output<string | undefined>;
    retry_count!: Output<number | undefined>;
    retry_interval!: Output<number | undefined>;
    run_next_parallel!: Output<boolean | undefined>;
    run_only_on_first_failure!: Output<boolean | undefined>;
    setup_commands!: Output<string[] | undefined>;
    shell!: Output<'SH' | 'BASH' | undefined>;
    timeout!: Output<number | undefined>;
    trigger_conditions!: Output<TriggerCondition[] | undefined>;
    variables!: Output<Variable[] | undefined>;

    constructor(name: string, argsOrState: GKERunHelmArgs | GKERunHelmState, opts?: CustomResourceOptions) {
        const inputs: Inputs = {};
        if (!opts) {
            opts = {};
        }

        if (opts.id) {
            const state = argsOrState as GKERunHelmState | undefined;
            inputs['project_name'] = state?.project_name;
            inputs['pipeline_id'] = state?.pipeline_id;
            inputs['application_id'] = state?.application_id;
            inputs['cluster'] = state?.cluster;
            inputs['execute_commands'] = state?.execute_commands;
            inputs['helm_version'] = state?.helm_version;
            inputs['integration_hash'] =
                state?.integration_hash instanceof Integration ? { hash_id: state.integration_hash.hash_id } : state?.integration_hash;
            inputs['name'] = state?.name;
            inputs['trigger_time'] = state?.trigger_time;
            inputs['zone_id'] = state?.zone_id;
            inputs['after_action_id'] = state?.after_action_id;
            inputs['disabled'] = state?.disabled;
            inputs['helm_repository_integration'] =
                state?.helm_repository_integration instanceof Integration
                    ? { hash_id: state.helm_repository_integration.hash_id }
                    : state?.helm_repository_integration;
            inputs['helm_repository_key'] = state?.helm_repository_key;
            inputs['helm_repository_region'] = state?.helm_repository_region;
            inputs['ignore_errors'] = state?.ignore_errors;
            inputs['kubectl_version'] = state?.kubectl_version;
            inputs['retry_count'] = state?.retry_count;
            inputs['retry_interval'] = state?.retry_interval;
            inputs['run_next_parallel'] = state?.run_next_parallel;
            inputs['run_only_on_first_failure'] = state?.run_only_on_first_failure;
            inputs['setup_commands'] = state?.setup_commands;
            inputs['shell'] = state?.shell;
            inputs['timeout'] = state?.timeout;
            inputs['trigger_conditions'] = state?.trigger_conditions;
            inputs['variables'] = state?.variables;
        } else {
            const args = argsOrState as GKERunHelmArgs | undefined;
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

            if (!args?.execute_commands) {
                throw new Error('Missing required property "execute_commands"');
            }

            if (!args?.helm_version) {
                throw new Error('Missing required property "helm_version"');
            }

            if (!args?.integration_hash) {
                throw new Error('Missing required property "integration_hash"');
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
            inputs['execute_commands'] = args.execute_commands;
            inputs['helm_version'] = args.helm_version;
            inputs['integration_hash'] = output(args.integration_hash as Output<IntegrationRef | Integration>).apply(integration_hash =>
                integration_hash instanceof Integration ? { hash_id: integration_hash.hash_id } : integration_hash
            );
            inputs['name'] = args.name;
            inputs['trigger_time'] = args.trigger_time;
            inputs['zone_id'] = args.zone_id;
            inputs['after_action_id'] = args.after_action_id;
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
            inputs['retry_count'] = args.retry_count;
            inputs['retry_interval'] = args.retry_interval;
            inputs['run_next_parallel'] = args.run_next_parallel;
            inputs['run_only_on_first_failure'] = args.run_only_on_first_failure;
            inputs['setup_commands'] = args.setup_commands;
            inputs['shell'] = args.shell;
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

        inputs['type'] = 'HELM';
        inputs['url'] = undefined;
        inputs['html_url'] = undefined;
        inputs['action_id'] = undefined;

        super(GKERunHelm.__pulumiType, name, inputs, opts);
    }
}
