import { AsInputs } from '@pulumi-utils/sdk';
import { PipelineProps } from '../pipeline';
import { CustomResource, Input, Output, ID, CustomResourceOptions, Inputs, output } from '@pulumi/pulumi';
import { IntegrationRef, TriggerCondition, Variable } from '../common';
import { Integration } from '../integration';

export interface GKESetImageState {
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
     * The name of the container.
     */
    container: string;

    /**
     * The name of the deployment from the namespace.
     */
    deployment: string;

    /**
     * Authorization type. Set to `SERVICE_ACCOUNT`.
     */
    gke_auth_type: string;

    /**
     * The name of the image to set.
     */
    image_name: string;

    /**
     * The tag of the chosen image.
     */
    image_tag: string;

    /**
     * The integration.
     */
    integration: IntegrationRef | Integration;

    /**
     * The name of the action.
     */
    name: string;

    /**
     * The name of the namespace.
     */
    namespace: string;

    /**
     * The ID of the GKE zone.
     */
    zone_id: string;

    /**
     * When set to `true` the action is disabled.  By default it is set to `false`.
     */
    disabled?: boolean;

    /**
     * If set to `true` the execution will proceed, mark action as a warning and jump to the next action. Doesn't apply to deployment actions.
     */
    ignore_errors?: boolean;

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
     * The list of trigger conditions to meet so that the action can be triggered.
     */
    trigger_conditions?: TriggerCondition[];

    /**
     * The list of variables you can use the action.
     */
    variables?: Variable[];
}

export type GKESetImageArgs = AsInputs<GKESetImageState>;

export interface GKESetImageProps {
    url: string;
    html_url: string;
    action_id: number;
    application_id: string;
    cluster: string;
    container: string;
    deployment: string;
    gke_auth_type: string;
    image_name: string;
    image_tag: string;
    integration: IntegrationRef | Integration;
    name: string;
    namespace: string;
    type: 'KUBERNETES_SET_IMAGE';
    zone_id: string;
    disabled?: boolean;
    ignore_errors?: boolean;
    record_arg?: 'TRUE' | 'FALSE' | 'NOT_SET';
    retry_count?: number;
    retry_delay?: number;
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
export class GKESetImage extends CustomResource {
    static __pulumiType = 'buddy:action:GKESetImage';

    static get(name: string, id: Input<ID>, state?: Partial<GKESetImageState>, opts?: CustomResourceOptions) {
        return new GKESetImage(name, state as any, { ...opts, id });
    }

    static isInstance(obj: any): obj is GKESetImage {
        if (null == obj) {
            return false;
        }

        return obj['__pulumiType'] === GKESetImage.__pulumiType;
    }

    project_name!: Output<string>;
    pipeline_id!: Output<number>;
    action_id!: Output<number>;
    application_id!: Output<string>;
    cluster!: Output<string>;
    container!: Output<string>;
    deployment!: Output<string>;
    gke_auth_type!: Output<string>;
    image_name!: Output<string>;
    image_tag!: Output<string>;
    integration!: Output<IntegrationRef | Integration>;
    name!: Output<string>;
    namespace!: Output<string>;
    type!: Output<'KUBERNETES_SET_IMAGE'>;
    zone_id!: Output<string>;
    disabled!: Output<boolean | undefined>;
    ignore_errors!: Output<boolean | undefined>;
    record_arg!: Output<'TRUE' | 'FALSE' | 'NOT_SET' | undefined>;
    retry_count!: Output<number | undefined>;
    retry_delay!: Output<number | undefined>;
    run_next_parallel!: Output<boolean | undefined>;
    run_only_on_first_failure!: Output<boolean | undefined>;
    timeout!: Output<number | undefined>;
    trigger_conditions!: Output<TriggerCondition[] | undefined>;
    variables!: Output<Variable[] | undefined>;

    constructor(name: string, argsOrState: GKESetImageArgs | GKESetImageState, opts?: CustomResourceOptions) {
        const inputs: Inputs = {};
        if (!opts) {
            opts = {};
        }

        if (opts.id) {
            const state = argsOrState as GKESetImageState | undefined;
            inputs['project_name'] = state?.project_name;
            inputs['pipeline_id'] = state?.pipeline_id;
            inputs['application_id'] = state?.application_id;
            inputs['cluster'] = state?.cluster;
            inputs['container'] = state?.container;
            inputs['deployment'] = state?.deployment;
            inputs['gke_auth_type'] = state?.gke_auth_type;
            inputs['image_name'] = state?.image_name;
            inputs['image_tag'] = state?.image_tag;
            inputs['integration'] = state?.integration instanceof Integration ? { hash_id: state.integration.hash_id } : state?.integration;
            inputs['name'] = state?.name;
            inputs['namespace'] = state?.namespace;
            inputs['zone_id'] = state?.zone_id;
            inputs['disabled'] = state?.disabled;
            inputs['ignore_errors'] = state?.ignore_errors;
            inputs['record_arg'] = state?.record_arg;
            inputs['retry_count'] = state?.retry_count;
            inputs['retry_delay'] = state?.retry_delay;
            inputs['run_next_parallel'] = state?.run_next_parallel;
            inputs['run_only_on_first_failure'] = state?.run_only_on_first_failure;
            inputs['timeout'] = state?.timeout;
            inputs['trigger_conditions'] = state?.trigger_conditions;
            inputs['variables'] = state?.variables;
        } else {
            const args = argsOrState as GKESetImageArgs | undefined;
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

            if (!args?.container) {
                throw new Error('Missing required property "container"');
            }

            if (!args?.deployment) {
                throw new Error('Missing required property "deployment"');
            }

            if (!args?.gke_auth_type) {
                throw new Error('Missing required property "gke_auth_type"');
            }

            if (!args?.image_name) {
                throw new Error('Missing required property "image_name"');
            }

            if (!args?.image_tag) {
                throw new Error('Missing required property "image_tag"');
            }

            if (!args?.integration) {
                throw new Error('Missing required property "integration"');
            }

            if (!args?.name) {
                throw new Error('Missing required property "name"');
            }

            if (!args?.namespace) {
                throw new Error('Missing required property "namespace"');
            }

            if (!args?.zone_id) {
                throw new Error('Missing required property "zone_id"');
            }

            inputs['application_id'] = args.application_id;
            inputs['cluster'] = args.cluster;
            inputs['container'] = args.container;
            inputs['deployment'] = args.deployment;
            inputs['gke_auth_type'] = args.gke_auth_type;
            inputs['image_name'] = args.image_name;
            inputs['image_tag'] = args.image_tag;
            inputs['integration'] = output(args.integration as Output<IntegrationRef | Integration>).apply(integration =>
                integration instanceof Integration ? { hash_id: integration.hash_id } : integration
            );
            inputs['name'] = args.name;
            inputs['namespace'] = args.namespace;
            inputs['zone_id'] = args.zone_id;
            inputs['disabled'] = args.disabled;
            inputs['ignore_errors'] = args.ignore_errors;
            inputs['record_arg'] = args.record_arg;
            inputs['retry_count'] = args.retry_count;
            inputs['retry_delay'] = args.retry_delay;
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

        inputs['type'] = 'KUBERNETES_SET_IMAGE';
        inputs['url'] = undefined;
        inputs['html_url'] = undefined;
        inputs['action_id'] = undefined;

        super(GKESetImage.__pulumiType, name, inputs, opts);
    }
}
