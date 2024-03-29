import { AsInputs } from '@pulumi-utils/sdk';
import { PipelineProps } from '../pipeline';
import { CustomResource, Input, Output, ID, CustomResourceOptions, Inputs, output } from '@pulumi/pulumi';
import { IntegrationRef, TriggerCondition, Variable } from '../common';
import { Integration } from '../integration';

export interface GoogleCloudRunState {
    project_name: string;
    pipeline_id: number;
    /**
     * The display name of the application.
     */
    application_display_name: string;

    /**
     * The name of the application.
     */
    application_name: string;

    /**
     * The name of the image.
     */
    image: string;

    /**
     * The integration.
     */
    integration: IntegrationRef | Integration;

    /**
     * The name of the action.
     */
    name: string;

    /**
     * The name of the service.
     */
    service: string;

    /**
     * Specifies when the action should be executed. Can be one of `ON_EVERY_EXECUTION`, `ON_FAILURE` or `ON_BACK_TO_SUCCESS`. The default value is `ON_EVERY_EXECUTION`.
     */
    trigger_time: 'ON_EVERY_EXECUTION' | 'ON_FAILURE' | 'ON_BACK_TO_SUCCESS';

    /**
     * The numerical ID of the action, after which this action should be added.
     */
    after_action_id?: number;

    /**
     * The ID of the cluster or fully qualified identifier for the cluster. Required when the platform is set to `GKE`.
     */
    cluster?: string;

    /**
     * The zone in which the cluster is located. Required when the platform is set to `GKE`.
     */
    cluster_location?: string;

    /**
     * Kubectl configuration file. Required when the platform is set to `KUBERNETES`.
     */
    config_path?: string;

    /**
     * The name of the context in your kubectl config file to use for connecting. Required when the platform is set to `KUBERNETES`.
     */
    context?: string;

    /**
     * When set to 'true' the action is disabled.  By default it is set to 'false'.
     */
    disabled?: boolean;

    /**
     * If set to 'true' the execution will proceed, mark action as a warning and jump to the next action. Doesn't apply to deployment actions.
     */
    ignore_errors?: boolean;

    /**
     * Target platform for running commands. Can be set to: `MANAGED`, `GKE` or `KUBERNETES`.
     */
    platform?: string;

    /**
     * The region in which the resource can be found. Required when platform is set to `MANAGED`.
     */
    region?: string;

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

export type GoogleCloudRunArgs = AsInputs<GoogleCloudRunState>;

export interface GoogleCloudRunProps {
    url: string;
    html_url: string;
    action_id: number;
    application_display_name: string;
    application_name: string;
    image: string;
    integration: IntegrationRef | Integration;
    name: string;
    service: string;
    trigger_time: 'ON_EVERY_EXECUTION' | 'ON_FAILURE' | 'ON_BACK_TO_SUCCESS';
    type: 'GOOGLE_CLOUD_RUN_DEPLOY';
    after_action_id?: number;
    cluster?: string;
    cluster_location?: string;
    config_path?: string;
    context?: string;
    disabled?: boolean;
    ignore_errors?: boolean;
    platform?: string;
    region?: string;
    retry_count?: number;
    retry_interval?: number;
    run_next_parallel?: boolean;
    run_only_on_first_failure?: boolean;
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
export class GoogleCloudRun extends CustomResource {
    static __pulumiType = 'buddy:action:GoogleCloudRun';

    static get(name: string, id: Input<ID>, state?: Partial<GoogleCloudRunState>, opts?: CustomResourceOptions) {
        return new GoogleCloudRun(name, state as any, { ...opts, id });
    }

    static isInstance(obj: any): obj is GoogleCloudRun {
        if (null == obj) {
            return false;
        }

        return obj['__pulumiType'] === GoogleCloudRun.__pulumiType;
    }

    project_name!: Output<string>;
    pipeline_id!: Output<number>;
    action_id!: Output<number>;
    application_display_name!: Output<string>;
    application_name!: Output<string>;
    image!: Output<string>;
    integration!: Output<IntegrationRef | Integration>;
    name!: Output<string>;
    service!: Output<string>;
    trigger_time!: Output<'ON_EVERY_EXECUTION' | 'ON_FAILURE' | 'ON_BACK_TO_SUCCESS'>;
    type!: Output<'GOOGLE_CLOUD_RUN_DEPLOY'>;
    after_action_id!: Output<number | undefined>;
    cluster!: Output<string | undefined>;
    cluster_location!: Output<string | undefined>;
    config_path!: Output<string | undefined>;
    context!: Output<string | undefined>;
    disabled!: Output<boolean | undefined>;
    ignore_errors!: Output<boolean | undefined>;
    platform!: Output<string | undefined>;
    region!: Output<string | undefined>;
    retry_count!: Output<number | undefined>;
    retry_interval!: Output<number | undefined>;
    run_next_parallel!: Output<boolean | undefined>;
    run_only_on_first_failure!: Output<boolean | undefined>;
    timeout!: Output<number | undefined>;
    trigger_conditions!: Output<TriggerCondition[] | undefined>;
    variables!: Output<Variable[] | undefined>;

    constructor(name: string, argsOrState: GoogleCloudRunArgs | GoogleCloudRunState, opts?: CustomResourceOptions) {
        const inputs: Inputs = {};
        if (!opts) {
            opts = {};
        }

        if (opts.id) {
            const state = argsOrState as GoogleCloudRunState | undefined;
            inputs['project_name'] = state?.project_name;
            inputs['pipeline_id'] = state?.pipeline_id;
            inputs['application_display_name'] = state?.application_display_name;
            inputs['application_name'] = state?.application_name;
            inputs['image'] = state?.image;
            inputs['integration'] = state?.integration instanceof Integration ? { hash_id: state.integration.hash_id } : state?.integration;
            inputs['name'] = state?.name;
            inputs['service'] = state?.service;
            inputs['trigger_time'] = state?.trigger_time;
            inputs['after_action_id'] = state?.after_action_id;
            inputs['cluster'] = state?.cluster;
            inputs['cluster_location'] = state?.cluster_location;
            inputs['config_path'] = state?.config_path;
            inputs['context'] = state?.context;
            inputs['disabled'] = state?.disabled;
            inputs['ignore_errors'] = state?.ignore_errors;
            inputs['platform'] = state?.platform;
            inputs['region'] = state?.region;
            inputs['retry_count'] = state?.retry_count;
            inputs['retry_interval'] = state?.retry_interval;
            inputs['run_next_parallel'] = state?.run_next_parallel;
            inputs['run_only_on_first_failure'] = state?.run_only_on_first_failure;
            inputs['timeout'] = state?.timeout;
            inputs['trigger_conditions'] = state?.trigger_conditions;
            inputs['variables'] = state?.variables;
        } else {
            const args = argsOrState as GoogleCloudRunArgs | undefined;
            if (!args?.project_name) {
                throw new Error('Missing required property "project_name"');
            }

            if (!args?.pipeline_id) {
                throw new Error('Missing required property "pipeline_id"');
            }

            if (!args?.application_display_name) {
                throw new Error('Missing required property "application_display_name"');
            }

            if (!args?.application_name) {
                throw new Error('Missing required property "application_name"');
            }

            if (!args?.image) {
                throw new Error('Missing required property "image"');
            }

            if (!args?.integration) {
                throw new Error('Missing required property "integration"');
            }

            if (!args?.name) {
                throw new Error('Missing required property "name"');
            }

            if (!args?.service) {
                throw new Error('Missing required property "service"');
            }

            if (!args?.trigger_time) {
                throw new Error('Missing required property "trigger_time"');
            }

            inputs['application_display_name'] = args.application_display_name;
            inputs['application_name'] = args.application_name;
            inputs['image'] = args.image;
            inputs['integration'] = output(args.integration as Output<IntegrationRef | Integration>).apply(integration =>
                integration instanceof Integration ? { hash_id: integration.hash_id } : integration
            );
            inputs['name'] = args.name;
            inputs['service'] = args.service;
            inputs['trigger_time'] = args.trigger_time;
            inputs['after_action_id'] = args.after_action_id;
            inputs['cluster'] = args.cluster;
            inputs['cluster_location'] = args.cluster_location;
            inputs['config_path'] = args.config_path;
            inputs['context'] = args.context;
            inputs['disabled'] = args.disabled;
            inputs['ignore_errors'] = args.ignore_errors;
            inputs['platform'] = args.platform;
            inputs['region'] = args.region;
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

        if (null == opts.deleteBeforeReplace) {
            opts.deleteBeforeReplace = true;
        }

        opts.ignoreChanges = ['project_name', 'pipeline_id', ...(opts.ignoreChanges || [])];

        inputs['type'] = 'GOOGLE_CLOUD_RUN_DEPLOY';
        inputs['url'] = undefined;
        inputs['html_url'] = undefined;
        inputs['action_id'] = undefined;

        super(GoogleCloudRun.__pulumiType, name, inputs, opts);
    }
}
