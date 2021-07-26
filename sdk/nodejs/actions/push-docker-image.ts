import { AsInputs } from '@pulumi-utils/sdk';
import { PipelineProps } from '../pipeline';
import { CustomResource, Input, Output, ID, CustomResourceOptions, Inputs, output } from '@pulumi/pulumi';
import { IntegrationRef, TriggerCondition, Variable } from '../common';
import { Integration } from '../integration';

export interface PushDockerImageState {
    project_name: string;
    pipeline_id: number;
    /**
     * The name of the action.
     */
    name: string;

    /**
     * Specifies when the action should be executed. Can be one of `ON_EVERY_EXECUTION`, `ON_FAILURE` or `ON_BACK_TO_SUCCESS`. The default value is `ON_EVERY_EXECUTION`.
     */
    trigger_time: 'ON_EVERY_EXECUTION' | 'ON_FAILURE' | 'ON_BACK_TO_SUCCESS';

    /**
     * The numerical ID of the action, after which this action should be added.
     */
    after_action_id?: number;

    /**
     * When set to `true` the action is disabled.  By default it is set to `false`.
     */
    disabled?: boolean;

    /**
     * The ID of the action which built the desired Docker image. If set to 0, the image will be taken from previous pipeline action. Can be used instead of `docker_build_action_name.`
     */
    docker_build_action_id?: number;

    /**
     * The name of the action which built the desired Docker image. Can be used instead of `docker_build_action_id`.
     */
    docker_build_action_name?: string;

    /**
     * The tag of the Docker image.
     */
    docker_image_tag?: string;

    /**
     * If set to `true` the execution will proceed, mark action as a warning and jump to the next action. Doesn't apply to deployment actions.
     */
    ignore_errors?: boolean;

    /**
     * The integration. Required for delivering the Dockerfile to the Amazon ECR, Google GCR and Docker Hub.
     */
    integration?: IntegrationRef | Integration;

    /**
     * The username required to connect to the server. Required for delivering the Dockerfile to a private registry.
     */
    login?: string;

    /**
     * The password required to connect to the server. Required for delivering the Dockerfile to a private registry.
     */
    password?: string;

    /**
     * The name of the Amazon S3 region. Required for delivering the Dockerfile to the Amazon ECR. The full list of regions is available here.
     */
    region?: string;

    /**
     * The url to the GCR. Can be one of gcr.io, us.gcr.io , eu.gcr.io or asia.gcr.io. Required for Google GCR.
     */
    registry?: string;

    /**
     * The location of the Docker repository.
     */
    repository?: string;

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

export type PushDockerImageArgs = AsInputs<PushDockerImageState>;

export interface PushDockerImageProps {
    url: string;
    html_url: string;
    action_id: number;
    name: string;
    trigger_time: 'ON_EVERY_EXECUTION' | 'ON_FAILURE' | 'ON_BACK_TO_SUCCESS';
    type: 'DOCKER_PUSH';
    after_action_id?: number;
    disabled?: boolean;
    docker_build_action_id?: number;
    docker_build_action_name?: string;
    docker_image_tag?: string;
    ignore_errors?: boolean;
    integration?: IntegrationRef | Integration;
    login?: string;
    password?: string;
    region?: string;
    registry?: string;
    repository?: string;
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
export class PushDockerImage extends CustomResource {
    static __pulumiType = 'buddy:action:PushDockerImage';

    static get(name: string, id: Input<ID>, state?: Partial<PushDockerImageState>, opts?: CustomResourceOptions) {
        return new PushDockerImage(name, state as any, { ...opts, id });
    }

    static isInstance(obj: any): obj is PushDockerImage {
        if (null == obj) {
            return false;
        }

        return obj['__pulumiType'] === PushDockerImage.__pulumiType;
    }

    project_name!: Output<string>;
    pipeline_id!: Output<number>;
    action_id!: Output<number>;
    name!: Output<string>;
    trigger_time!: Output<'ON_EVERY_EXECUTION' | 'ON_FAILURE' | 'ON_BACK_TO_SUCCESS'>;
    type!: Output<'DOCKER_PUSH'>;
    after_action_id!: Output<number | undefined>;
    disabled!: Output<boolean | undefined>;
    docker_build_action_id!: Output<number | undefined>;
    docker_build_action_name!: Output<string | undefined>;
    docker_image_tag!: Output<string | undefined>;
    ignore_errors!: Output<boolean | undefined>;
    integration!: Output<IntegrationRef | Integration | undefined>;
    login!: Output<string | undefined>;
    password!: Output<string | undefined>;
    region!: Output<string | undefined>;
    registry!: Output<string | undefined>;
    repository!: Output<string | undefined>;
    retry_count!: Output<number | undefined>;
    retry_delay!: Output<number | undefined>;
    run_next_parallel!: Output<boolean | undefined>;
    run_only_on_first_failure!: Output<boolean | undefined>;
    timeout!: Output<number | undefined>;
    trigger_conditions!: Output<TriggerCondition[] | undefined>;
    variables!: Output<Variable[] | undefined>;

    constructor(name: string, argsOrState: PushDockerImageArgs | PushDockerImageState, opts?: CustomResourceOptions) {
        const inputs: Inputs = {};
        if (!opts) {
            opts = {};
        }

        if (opts.id) {
            const state = argsOrState as PushDockerImageState | undefined;
            inputs['project_name'] = state?.project_name;
            inputs['pipeline_id'] = state?.pipeline_id;
            inputs['name'] = state?.name;
            inputs['trigger_time'] = state?.trigger_time;
            inputs['after_action_id'] = state?.after_action_id;
            inputs['disabled'] = state?.disabled;
            inputs['docker_build_action_id'] = state?.docker_build_action_id;
            inputs['docker_build_action_name'] = state?.docker_build_action_name;
            inputs['docker_image_tag'] = state?.docker_image_tag;
            inputs['ignore_errors'] = state?.ignore_errors;
            inputs['integration'] = state?.integration instanceof Integration ? { hash_id: state.integration.hash_id } : state?.integration;
            inputs['login'] = state?.login;
            inputs['password'] = state?.password;
            inputs['region'] = state?.region;
            inputs['registry'] = state?.registry;
            inputs['repository'] = state?.repository;
            inputs['retry_count'] = state?.retry_count;
            inputs['retry_delay'] = state?.retry_delay;
            inputs['run_next_parallel'] = state?.run_next_parallel;
            inputs['run_only_on_first_failure'] = state?.run_only_on_first_failure;
            inputs['timeout'] = state?.timeout;
            inputs['trigger_conditions'] = state?.trigger_conditions;
            inputs['variables'] = state?.variables;
        } else {
            const args = argsOrState as PushDockerImageArgs | undefined;
            if (!args?.project_name) {
                throw new Error('Missing required property "project_name"');
            }

            if (!args?.pipeline_id) {
                throw new Error('Missing required property "pipeline_id"');
            }

            if (!args?.name) {
                throw new Error('Missing required property "name"');
            }

            if (!args?.trigger_time) {
                throw new Error('Missing required property "trigger_time"');
            }

            inputs['name'] = args.name;
            inputs['trigger_time'] = args.trigger_time;
            inputs['after_action_id'] = args.after_action_id;
            inputs['disabled'] = args.disabled;
            inputs['docker_build_action_id'] = args.docker_build_action_id;
            inputs['docker_build_action_name'] = args.docker_build_action_name;
            inputs['docker_image_tag'] = args.docker_image_tag;
            inputs['ignore_errors'] = args.ignore_errors;
            inputs['integration'] = output(args.integration as Output<IntegrationRef | Integration>).apply(integration =>
                integration instanceof Integration ? { hash_id: integration.hash_id } : integration
            );
            inputs['login'] = args.login;
            inputs['password'] = args.password;
            inputs['region'] = args.region;
            inputs['registry'] = args.registry;
            inputs['repository'] = args.repository;
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

        inputs['type'] = 'DOCKER_PUSH';
        inputs['url'] = undefined;
        inputs['html_url'] = undefined;
        inputs['action_id'] = undefined;

        super(PushDockerImage.__pulumiType, name, inputs, opts);
    }
}
