import { AsInputs } from '@pulumi-utils/sdk';
import { PipelineProps } from '../pipeline';
import { CustomResource, Input, Output, ID, CustomResourceOptions, Inputs } from '@pulumi/pulumi';
import { TriggerCondition, Variable } from '../common';

export interface BuildMultiArchImageState {
    project_name: string;
    pipeline_id: number;
    /**
     * The path of the desired dockerfile in the repository.
     */
    dockerfile_path: string;

    /**
     * Specifies when the action should be executed. Can be one of `ON_EVERY_EXECUTION`, `ON_FAILURE` or `ON_BACK_TO_SUCCESS`. The default value is `ON_EVERY_EXECUTION`.
     */
    trigger_time: 'ON_EVERY_EXECUTION' | 'ON_FAILURE' | 'ON_BACK_TO_SUCCESS';

    /**
     * The numerical ID of the action, after which this action should be added.
     */
    after_action_id?: number;

    /**
     * The arguments used when building the image from the Dockerfile.
     */
    build_args?: string[];

    /**
     * The docker build image context path.
     */
    context_path?: string;

    /**
     * When set to `true` the action is disabled.  By default it is set to `false`.
     */
    disabled?: boolean;

    /**
     * The tag of the Docker image.
     */
    docker_image_tag?: string;

    /**
     * If set to `true` the execution will proceed, mark action as a warning and jump to the next action. Doesn't apply to deployment actions.
     */
    ignore_errors?: boolean;

    /**
     * The ID of the integration. Required for delivering the Dockerfile to the Amazon ECR, Google GCR and Docker Hub.
     */
    integration_hash?: string;

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
     * The url to GCR. Can be one of gcr.io, us.gcr.io, eu.gcr.io or asia.gcr.io. Required for Google GCR.
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
     * The identifier to pass into the `docker build --secret`. This identifier is associated with the `RUN --mount` identifier to use in the Dockerfile.
     */
    secret_id?: string;

    /**
     * Renames the secret file to a specific file in the Dockerfile RUN command to use.
     */
    secret_src?: string;

    /**
     * Specifies the target platform for the build output. You can set multiple target platforms. Default value: `linux/amd64`. Available values: `linux/amd64`, `linux/arm64`, `linux/riscv64`, `linux/ppc64le`, `linux/s390x`, `linux/386`, `linux/arm/v7`, `linux/arm/v`.
     */
    target_platform?: string[];

    /**
     * Specifes an intermediate build stage by name as a final stage for the resulting image. Commands after the target stage are skipped.
     */
    target_stage?: string;

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

    /**
     * If set to `true`, the output of the logs will be default. If set to `false`, the output of the logs will be displayed in the plain mode.
     */
    without_progress?: boolean;
}

export type BuildMultiArchImageArgs = AsInputs<BuildMultiArchImageState>;

export interface BuildMultiArchImageProps {
    url: string;
    html_url: string;
    action_id: number;
    dockerfile_path: string;
    trigger_time: 'ON_EVERY_EXECUTION' | 'ON_FAILURE' | 'ON_BACK_TO_SUCCESS';
    type: 'DOCKER_BUILD_MULTI_ARCH';
    after_action_id?: number;
    build_args?: string[];
    context_path?: string;
    disabled?: boolean;
    docker_image_tag?: string;
    ignore_errors?: boolean;
    integration_hash?: string;
    login?: string;
    password?: string;
    region?: string;
    registry?: string;
    repository?: string;
    retry_count?: number;
    retry_interval?: number;
    run_next_parallel?: boolean;
    run_only_on_first_failure?: boolean;
    secret_id?: string;
    secret_src?: string;
    target_platform?: string[];
    target_stage?: string;
    timeout?: number;
    trigger_conditions?: TriggerCondition[];
    variables?: Variable[];
    without_progress?: boolean;
    pipeline: PipelineProps;
    project_name: string;
    pipeline_id: number;
}

/**
 * Required scopes in Buddy API: `WORKSPACE`, `EXECUTION_MANAGE`, `EXECUTION_INFO`
 */
export class BuildMultiArchImage extends CustomResource {
    static __pulumiType = 'buddy:action:BuildMultiArchImage';

    static get(name: string, id: Input<ID>, state?: Partial<BuildMultiArchImageState>, opts?: CustomResourceOptions) {
        return new BuildMultiArchImage(name, state as any, { ...opts, id });
    }

    static isInstance(obj: any): obj is BuildMultiArchImage {
        if (null == obj) {
            return false;
        }

        return obj['__pulumiType'] === BuildMultiArchImage.__pulumiType;
    }

    project_name!: Output<string>;
    pipeline_id!: Output<number>;
    action_id!: Output<number>;
    dockerfile_path!: Output<string>;
    trigger_time!: Output<'ON_EVERY_EXECUTION' | 'ON_FAILURE' | 'ON_BACK_TO_SUCCESS'>;
    type!: Output<'DOCKER_BUILD_MULTI_ARCH'>;
    after_action_id!: Output<number | undefined>;
    build_args!: Output<string[] | undefined>;
    context_path!: Output<string | undefined>;
    disabled!: Output<boolean | undefined>;
    docker_image_tag!: Output<string | undefined>;
    ignore_errors!: Output<boolean | undefined>;
    integration_hash!: Output<string | undefined>;
    login!: Output<string | undefined>;
    password!: Output<string | undefined>;
    region!: Output<string | undefined>;
    registry!: Output<string | undefined>;
    repository!: Output<string | undefined>;
    retry_count!: Output<number | undefined>;
    retry_interval!: Output<number | undefined>;
    run_next_parallel!: Output<boolean | undefined>;
    run_only_on_first_failure!: Output<boolean | undefined>;
    secret_id!: Output<string | undefined>;
    secret_src!: Output<string | undefined>;
    target_platform!: Output<string[] | undefined>;
    target_stage!: Output<string | undefined>;
    timeout!: Output<number | undefined>;
    trigger_conditions!: Output<TriggerCondition[] | undefined>;
    variables!: Output<Variable[] | undefined>;
    without_progress!: Output<boolean | undefined>;

    constructor(name: string, argsOrState: BuildMultiArchImageArgs | BuildMultiArchImageState, opts?: CustomResourceOptions) {
        const inputs: Inputs = {};
        if (!opts) {
            opts = {};
        }

        if (opts.id) {
            const state = argsOrState as BuildMultiArchImageState | undefined;
            inputs['project_name'] = state?.project_name;
            inputs['pipeline_id'] = state?.pipeline_id;
            inputs['dockerfile_path'] = state?.dockerfile_path;
            inputs['trigger_time'] = state?.trigger_time;
            inputs['after_action_id'] = state?.after_action_id;
            inputs['build_args'] = state?.build_args;
            inputs['context_path'] = state?.context_path;
            inputs['disabled'] = state?.disabled;
            inputs['docker_image_tag'] = state?.docker_image_tag;
            inputs['ignore_errors'] = state?.ignore_errors;
            inputs['integration_hash'] = state?.integration_hash;
            inputs['login'] = state?.login;
            inputs['password'] = state?.password;
            inputs['region'] = state?.region;
            inputs['registry'] = state?.registry;
            inputs['repository'] = state?.repository;
            inputs['retry_count'] = state?.retry_count;
            inputs['retry_interval'] = state?.retry_interval;
            inputs['run_next_parallel'] = state?.run_next_parallel;
            inputs['run_only_on_first_failure'] = state?.run_only_on_first_failure;
            inputs['secret_id'] = state?.secret_id;
            inputs['secret_src'] = state?.secret_src;
            inputs['target_platform'] = state?.target_platform;
            inputs['target_stage'] = state?.target_stage;
            inputs['timeout'] = state?.timeout;
            inputs['trigger_conditions'] = state?.trigger_conditions;
            inputs['variables'] = state?.variables;
            inputs['without_progress'] = state?.without_progress;
        } else {
            const args = argsOrState as BuildMultiArchImageArgs | undefined;
            if (!args?.project_name) {
                throw new Error('Missing required property "project_name"');
            }

            if (!args?.pipeline_id) {
                throw new Error('Missing required property "pipeline_id"');
            }

            if (!args?.dockerfile_path) {
                throw new Error('Missing required property "dockerfile_path"');
            }

            if (!args?.trigger_time) {
                throw new Error('Missing required property "trigger_time"');
            }

            inputs['dockerfile_path'] = args.dockerfile_path;
            inputs['trigger_time'] = args.trigger_time;
            inputs['after_action_id'] = args.after_action_id;
            inputs['build_args'] = args.build_args;
            inputs['context_path'] = args.context_path;
            inputs['disabled'] = args.disabled;
            inputs['docker_image_tag'] = args.docker_image_tag;
            inputs['ignore_errors'] = args.ignore_errors;
            inputs['integration_hash'] = args.integration_hash;
            inputs['login'] = args.login;
            inputs['password'] = args.password;
            inputs['region'] = args.region;
            inputs['registry'] = args.registry;
            inputs['repository'] = args.repository;
            inputs['retry_count'] = args.retry_count;
            inputs['retry_interval'] = args.retry_interval;
            inputs['run_next_parallel'] = args.run_next_parallel;
            inputs['run_only_on_first_failure'] = args.run_only_on_first_failure;
            inputs['secret_id'] = args.secret_id;
            inputs['secret_src'] = args.secret_src;
            inputs['target_platform'] = args.target_platform;
            inputs['target_stage'] = args.target_stage;
            inputs['timeout'] = args.timeout;
            inputs['trigger_conditions'] = args.trigger_conditions;
            inputs['variables'] = args.variables;
            inputs['without_progress'] = args.without_progress;
            inputs['project_name'] = args.project_name;
            inputs['pipeline_id'] = args.pipeline_id;
        }

        if (!opts.version) {
            opts.version = require('../package').version;
        }

        opts.ignoreChanges = ['project_name', 'pipeline_id', ...(opts.ignoreChanges || [])];

        inputs['type'] = 'DOCKER_BUILD_MULTI_ARCH';
        inputs['url'] = undefined;
        inputs['html_url'] = undefined;
        inputs['action_id'] = undefined;

        super(BuildMultiArchImage.__pulumiType, name, inputs, opts);
    }
}
