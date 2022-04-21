import { AsInputs } from '@pulumi-utils/sdk';
import { PipelineProps } from '../pipeline';
import { CustomResource, Input, Output, ID, CustomResourceOptions, Inputs, output } from '@pulumi/pulumi';
import { IntegrationRef, TriggerCondition, Variable } from '../common';
import { Integration } from '../integration';

export interface RunDockerContainerState {
    project_name: string;
    pipeline_id: number;
    /**
     * The name of the Docker image.
     */
    docker_image_name: string;

    /**
     * The tag of the Docker image.
     */
    docker_image_tag: string;

    /**
     * The commands that will be executed.
     */
    inline_commands: string;

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
     * The ID of the action which built the desired Docker image. If set to 0, the image will be taken from previous pipeline action. Can be used instead of `docker_build_action_name`.
     */
    docker_build_action_id?: number;

    /**
     * The name of the action which built the desired Docker image. Can be used instead of `docker_build_action_id`.
     */
    docker_build_action_name?: string;

    /**
     * Default command to execute at runtime. Overwrites the default entrypoint set by the image.
     */
    entrypoint?: string;

    /**
     * Defines the export path of the container’s filesystem as a tar archive.
     */
    export_container_path?: string;

    /**
     * If set to `true` the execution will proceed, mark action as a warning and jump to the next action. Doesn't apply to deployment actions.
     */
    ignore_errors?: boolean;

    /**
     * The integration. Required for using the image from the Amazon ECR, Google GCR and Docker Hub.
     */
    integration?: IntegrationRef | Integration;

    /**
     * The username required to connect to a private registry.
     */
    login?: string;

    /**
     * Defines whether or not to mount the filesystem to the running container.
     */
    mount_filesystem_disable?: boolean;

    /**
     * The password required to connect to a private registry.
     */
    password?: string;

    /**
     * The name of the Amazon S3 region. Required for using the image from the Amazon ECR. The full list of regions is available here.
     */
    region?: string;

    /**
     * The url to the Docker registry or GCR. Required for Google GCR.
     */
    registry?: string;

    /**
     * Number of retries if the action fails.
     */
    retry_count?: number;

    /**
     * Delay time between auto retries in seconds.
     */
    retry_interval?: number;

    /**
     * All build commands are run as the default user defined in the selected Docker image. Can be set to another username (on the condition that this user exists in the selected image).
     */
    run_as_user?: string;

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
     * If set to `true` the Docker image will be taken from action defined by `docker_build_action_id`.
     */
    use_image_from_action?: boolean;

    /**
     * The list of variables you can use the action.
     */
    variables: Variable[];

    /**
     * The path preceding the colon is the filesystem path (the folder from the filesystem to be mounted in the container). The path after the colon is the container path (the path in the container, where this filesystem will be located).
     */
    volume_mappings?: string[];
}

export type RunDockerContainerArgs = AsInputs<RunDockerContainerState>;

export interface RunDockerContainerProps {
    url: string;
    html_url: string;
    action_id: number;
    docker_image_name: string;
    docker_image_tag: string;
    inline_commands: string;
    name: string;
    trigger_time: 'ON_EVERY_EXECUTION' | 'ON_FAILURE' | 'ON_BACK_TO_SUCCESS';
    type: 'RUN_DOCKER_CONTAINER';
    after_action_id?: number;
    disabled?: boolean;
    docker_build_action_id?: number;
    docker_build_action_name?: string;
    entrypoint?: string;
    export_container_path?: string;
    ignore_errors?: boolean;
    integration?: IntegrationRef | Integration;
    login?: string;
    mount_filesystem_disable?: boolean;
    password?: string;
    region?: string;
    registry?: string;
    retry_count?: number;
    retry_interval?: number;
    run_as_user?: string;
    run_next_parallel?: boolean;
    run_only_on_first_failure?: boolean;
    timeout?: number;
    trigger_conditions?: TriggerCondition[];
    use_image_from_action?: boolean;
    variables: Variable[];
    volume_mappings?: string[];
    pipeline: PipelineProps;
    project_name: string;
    pipeline_id: number;
}

/**
 * Required scopes in Buddy API: `WORKSPACE`, `EXECUTION_MANAGE`, `EXECUTION_INFO`
 */
export class RunDockerContainer extends CustomResource {
    static __pulumiType = 'buddy:action:RunDockerContainer';

    static get(name: string, id: Input<ID>, state?: Partial<RunDockerContainerState>, opts?: CustomResourceOptions) {
        return new RunDockerContainer(name, state as any, { ...opts, id });
    }

    static isInstance(obj: any): obj is RunDockerContainer {
        if (null == obj) {
            return false;
        }

        return obj['__pulumiType'] === RunDockerContainer.__pulumiType;
    }

    project_name!: Output<string>;
    pipeline_id!: Output<number>;
    action_id!: Output<number>;
    docker_image_name!: Output<string>;
    docker_image_tag!: Output<string>;
    inline_commands!: Output<string>;
    name!: Output<string>;
    trigger_time!: Output<'ON_EVERY_EXECUTION' | 'ON_FAILURE' | 'ON_BACK_TO_SUCCESS'>;
    type!: Output<'RUN_DOCKER_CONTAINER'>;
    after_action_id!: Output<number | undefined>;
    disabled!: Output<boolean | undefined>;
    docker_build_action_id!: Output<number | undefined>;
    docker_build_action_name!: Output<string | undefined>;
    entrypoint!: Output<string | undefined>;
    export_container_path!: Output<string | undefined>;
    ignore_errors!: Output<boolean | undefined>;
    integration!: Output<IntegrationRef | Integration | undefined>;
    login!: Output<string | undefined>;
    mount_filesystem_disable!: Output<boolean | undefined>;
    password!: Output<string | undefined>;
    region!: Output<string | undefined>;
    registry!: Output<string | undefined>;
    retry_count!: Output<number | undefined>;
    retry_interval!: Output<number | undefined>;
    run_as_user!: Output<string | undefined>;
    run_next_parallel!: Output<boolean | undefined>;
    run_only_on_first_failure!: Output<boolean | undefined>;
    timeout!: Output<number | undefined>;
    trigger_conditions!: Output<TriggerCondition[] | undefined>;
    use_image_from_action!: Output<boolean | undefined>;
    variables!: Output<Variable[]>;
    volume_mappings!: Output<string[] | undefined>;

    constructor(name: string, argsOrState: RunDockerContainerArgs | RunDockerContainerState, opts?: CustomResourceOptions) {
        const inputs: Inputs = {};
        if (!opts) {
            opts = {};
        }

        if (opts.id) {
            const state = argsOrState as RunDockerContainerState | undefined;
            inputs['project_name'] = state?.project_name;
            inputs['pipeline_id'] = state?.pipeline_id;
            inputs['docker_image_name'] = state?.docker_image_name;
            inputs['docker_image_tag'] = state?.docker_image_tag;
            inputs['inline_commands'] = state?.inline_commands;
            inputs['name'] = state?.name;
            inputs['trigger_time'] = state?.trigger_time;
            inputs['after_action_id'] = state?.after_action_id;
            inputs['disabled'] = state?.disabled;
            inputs['docker_build_action_id'] = state?.docker_build_action_id;
            inputs['docker_build_action_name'] = state?.docker_build_action_name;
            inputs['entrypoint'] = state?.entrypoint;
            inputs['export_container_path'] = state?.export_container_path;
            inputs['ignore_errors'] = state?.ignore_errors;
            inputs['integration'] = state?.integration instanceof Integration ? { hash_id: state.integration.hash_id } : state?.integration;
            inputs['login'] = state?.login;
            inputs['mount_filesystem_disable'] = state?.mount_filesystem_disable;
            inputs['password'] = state?.password;
            inputs['region'] = state?.region;
            inputs['registry'] = state?.registry;
            inputs['retry_count'] = state?.retry_count;
            inputs['retry_interval'] = state?.retry_interval;
            inputs['run_as_user'] = state?.run_as_user;
            inputs['run_next_parallel'] = state?.run_next_parallel;
            inputs['run_only_on_first_failure'] = state?.run_only_on_first_failure;
            inputs['timeout'] = state?.timeout;
            inputs['trigger_conditions'] = state?.trigger_conditions;
            inputs['use_image_from_action'] = state?.use_image_from_action;
            inputs['variables'] = state?.variables;
            inputs['volume_mappings'] = state?.volume_mappings;
        } else {
            const args = argsOrState as RunDockerContainerArgs | undefined;
            if (!args?.project_name) {
                throw new Error('Missing required property "project_name"');
            }

            if (!args?.pipeline_id) {
                throw new Error('Missing required property "pipeline_id"');
            }

            if (!args?.docker_image_name) {
                throw new Error('Missing required property "docker_image_name"');
            }

            if (!args?.docker_image_tag) {
                throw new Error('Missing required property "docker_image_tag"');
            }

            if (!args?.inline_commands) {
                throw new Error('Missing required property "inline_commands"');
            }

            if (!args?.name) {
                throw new Error('Missing required property "name"');
            }

            if (!args?.trigger_time) {
                throw new Error('Missing required property "trigger_time"');
            }

            if (!args?.variables) {
                throw new Error('Missing required property "variables"');
            }

            inputs['docker_image_name'] = args.docker_image_name;
            inputs['docker_image_tag'] = args.docker_image_tag;
            inputs['inline_commands'] = args.inline_commands;
            inputs['name'] = args.name;
            inputs['trigger_time'] = args.trigger_time;
            inputs['after_action_id'] = args.after_action_id;
            inputs['disabled'] = args.disabled;
            inputs['docker_build_action_id'] = args.docker_build_action_id;
            inputs['docker_build_action_name'] = args.docker_build_action_name;
            inputs['entrypoint'] = args.entrypoint;
            inputs['export_container_path'] = args.export_container_path;
            inputs['ignore_errors'] = args.ignore_errors;
            inputs['integration'] = output(args.integration as Output<IntegrationRef | Integration>).apply(integration =>
                integration instanceof Integration ? { hash_id: integration.hash_id } : integration
            );
            inputs['login'] = args.login;
            inputs['mount_filesystem_disable'] = args.mount_filesystem_disable;
            inputs['password'] = args.password;
            inputs['region'] = args.region;
            inputs['registry'] = args.registry;
            inputs['retry_count'] = args.retry_count;
            inputs['retry_interval'] = args.retry_interval;
            inputs['run_as_user'] = args.run_as_user;
            inputs['run_next_parallel'] = args.run_next_parallel;
            inputs['run_only_on_first_failure'] = args.run_only_on_first_failure;
            inputs['timeout'] = args.timeout;
            inputs['trigger_conditions'] = args.trigger_conditions;
            inputs['use_image_from_action'] = args.use_image_from_action;
            inputs['variables'] = args.variables;
            inputs['volume_mappings'] = args.volume_mappings;
            inputs['project_name'] = args.project_name;
            inputs['pipeline_id'] = args.pipeline_id;
        }

        if (!opts.version) {
            opts.version = require('../package').version;
        }

        opts.ignoreChanges = ['project_name', 'pipeline_id', ...(opts.ignoreChanges || [])];

        inputs['type'] = 'RUN_DOCKER_CONTAINER';
        inputs['url'] = undefined;
        inputs['html_url'] = undefined;
        inputs['action_id'] = undefined;

        super(RunDockerContainer.__pulumiType, name, inputs, opts);
    }
}
