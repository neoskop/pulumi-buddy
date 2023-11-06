import { AsInputs } from '@pulumi-utils/sdk';
import { PipelineProps } from '../pipeline';
import { CustomResource, Input, Output, ID, CustomResourceOptions, Inputs, output } from '@pulumi/pulumi';
import { IntegrationRef, TriggerCondition, Variable } from '../common';
import { Integration } from '../integration';

export interface BuildDockerImageState {
    project_name: string;
    pipeline_id: number;
    /**
     * The path to the desired Dockerfile in the repository. Default is `DOCKERFILE`.
     */
    dockerfile_path: string;

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
     * The arguments used when building the image from the Dockerfile.
     */
    build_args?: string[];

    /**
     * The Docker BuildKit will be activated while invoking the `docker build` command. By default, it is set to `true`.
     */
    buildkit?: boolean;

    /**
     * The docker build image context path.
     */
    context_path?: string;

    /**
     * When set to 'true' the action is disabled.  By default it is set to 'false'.
     */
    disabled?: boolean;

    /**
     * If set to `true`, dangling images will not be pruned after the build.
     */
    do_not_prune_images?: boolean;

    /**
     * The tag of the Docker image.
     */
    docker_image_tag?: string;

    /**
     * If set to 'true' the execution will proceed, mark action as a warning and jump to the next action. Doesn't apply to deployment actions.
     */
    ignore_errors?: boolean;

    /**
     * If set to `true`, ignore SSL errors upon connecting to the Docker registry.
     */
    insecure_registry?: boolean;

    /**
     * The integration. Required for delivering the Dockerfile to the Amazon  ECR, Google GCR and Docker Hub.
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
     * The name of the Amazon S3 region. Required for delivering the Dockerfile  to the Amazon ECR. The full list of regions is available here.
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
     * When set to 'true', the subsequent action defined in the pipeline will run in parallel to the current action.
     */
    run_next_parallel?: boolean;

    /**
     * Defines whether the action should be executed on each failure. Restricted to and required if the 'trigger_time' is 'ON_FAILURE'.
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

export type BuildDockerImageArgs = AsInputs<BuildDockerImageState>;

export interface BuildDockerImageProps {
    url: string;
    html_url: string;
    action_id: number;
    dockerfile_path: string;
    name: string;
    trigger_time: 'ON_EVERY_EXECUTION' | 'ON_FAILURE' | 'ON_BACK_TO_SUCCESS';
    type: 'DOCKERFILE';
    after_action_id?: number;
    build_args?: string[];
    buildkit?: boolean;
    context_path?: string;
    disabled?: boolean;
    do_not_prune_images?: boolean;
    docker_image_tag?: string;
    ignore_errors?: boolean;
    insecure_registry?: boolean;
    integration?: IntegrationRef | Integration;
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
export class BuildDockerImage extends CustomResource {
    static __pulumiType = 'buddy:action:BuildDockerImage';

    static get(name: string, id: Input<ID>, state?: Partial<BuildDockerImageState>, opts?: CustomResourceOptions) {
        return new BuildDockerImage(name, state as any, { ...opts, id });
    }

    static isInstance(obj: any): obj is BuildDockerImage {
        if (null == obj) {
            return false;
        }

        return obj['__pulumiType'] === BuildDockerImage.__pulumiType;
    }

    project_name!: Output<string>;
    pipeline_id!: Output<number>;
    action_id!: Output<number>;
    dockerfile_path!: Output<string>;
    name!: Output<string>;
    trigger_time!: Output<'ON_EVERY_EXECUTION' | 'ON_FAILURE' | 'ON_BACK_TO_SUCCESS'>;
    type!: Output<'DOCKERFILE'>;
    after_action_id!: Output<number | undefined>;
    build_args!: Output<string[] | undefined>;
    buildkit!: Output<boolean | undefined>;
    context_path!: Output<string | undefined>;
    disabled!: Output<boolean | undefined>;
    do_not_prune_images!: Output<boolean | undefined>;
    docker_image_tag!: Output<string | undefined>;
    ignore_errors!: Output<boolean | undefined>;
    insecure_registry!: Output<boolean | undefined>;
    integration!: Output<IntegrationRef | Integration | undefined>;
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
    timeout!: Output<number | undefined>;
    trigger_conditions!: Output<TriggerCondition[] | undefined>;
    variables!: Output<Variable[] | undefined>;

    constructor(name: string, argsOrState: BuildDockerImageArgs | BuildDockerImageState, opts?: CustomResourceOptions) {
        const inputs: Inputs = {};
        if (!opts) {
            opts = {};
        }

        if (opts.id) {
            const state = argsOrState as BuildDockerImageState | undefined;
            inputs['project_name'] = state?.project_name;
            inputs['pipeline_id'] = state?.pipeline_id;
            inputs['dockerfile_path'] = state?.dockerfile_path;
            inputs['name'] = state?.name;
            inputs['trigger_time'] = state?.trigger_time;
            inputs['after_action_id'] = state?.after_action_id;
            inputs['build_args'] = state?.build_args;
            inputs['buildkit'] = state?.buildkit;
            inputs['context_path'] = state?.context_path;
            inputs['disabled'] = state?.disabled;
            inputs['do_not_prune_images'] = state?.do_not_prune_images;
            inputs['docker_image_tag'] = state?.docker_image_tag;
            inputs['ignore_errors'] = state?.ignore_errors;
            inputs['insecure_registry'] = state?.insecure_registry;
            inputs['integration'] = state?.integration instanceof Integration ? { hash_id: state.integration.hash_id } : state?.integration;
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
            inputs['timeout'] = state?.timeout;
            inputs['trigger_conditions'] = state?.trigger_conditions;
            inputs['variables'] = state?.variables;
        } else {
            const args = argsOrState as BuildDockerImageArgs | undefined;
            if (!args?.project_name) {
                throw new Error('Missing required property "project_name"');
            }

            if (!args?.pipeline_id) {
                throw new Error('Missing required property "pipeline_id"');
            }

            if (!args?.dockerfile_path) {
                throw new Error('Missing required property "dockerfile_path"');
            }

            if (!args?.name) {
                throw new Error('Missing required property "name"');
            }

            if (!args?.trigger_time) {
                throw new Error('Missing required property "trigger_time"');
            }

            inputs['dockerfile_path'] = args.dockerfile_path;
            inputs['name'] = args.name;
            inputs['trigger_time'] = args.trigger_time;
            inputs['after_action_id'] = args.after_action_id;
            inputs['build_args'] = args.build_args;
            inputs['buildkit'] = args.buildkit;
            inputs['context_path'] = args.context_path;
            inputs['disabled'] = args.disabled;
            inputs['do_not_prune_images'] = args.do_not_prune_images;
            inputs['docker_image_tag'] = args.docker_image_tag;
            inputs['ignore_errors'] = args.ignore_errors;
            inputs['insecure_registry'] = args.insecure_registry;
            inputs['integration'] = output(args.integration as Output<IntegrationRef | Integration>).apply(integration =>
                integration instanceof Integration ? { hash_id: integration.hash_id } : integration
            );
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

        inputs['type'] = 'DOCKERFILE';
        inputs['url'] = undefined;
        inputs['html_url'] = undefined;
        inputs['action_id'] = undefined;

        super(BuildDockerImage.__pulumiType, name, inputs, opts);
    }
}
