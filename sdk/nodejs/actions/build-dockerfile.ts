import { AsInputs } from '@pulumi-utils/sdk';
import { PipelineProps } from '../pipeline';
import { CustomResource, Input, Output, ID, CustomResourceOptions, Inputs } from '@pulumi/pulumi';
import { IntegrationRef, Variable } from '../common';

export interface ActionBuildDockerfileState {
    project_name: string;
    pipeline_id: number;
    /**
     * The path to the desired Dockerfile in the filesystem.
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
     * If set to `true`, the Docker BuildKit will be activated while invoking the `docker build` command.
     */
    buildkit?: boolean;

    /**
     * The docker build image context path.
     */
    context_path?: string;

    /**
     * When set to `true` the action is disabled.  By default it is set to `false`.
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
     * If set to `true`, ignore SSL errors upon connecting to the Docker registry.
     */
    insecure_registry?: boolean;

    /**
     * The integration. Required for delivering the Dockerfile to the Amazon  ECR.
     */
    integration?: IntegrationRef;

    /**
     * The username required to connect to the server. Required for delivering  the Dockerfile to the Docker Hub or a private registry.
     */
    login?: string;

    /**
     * The password required to connect to the server. Required for delivering  the Dockerfile to the Docker Hub or a private registry.
     */
    password?: string;

    /**
     * The name of the Amazon S3 region. Required for delivering the Dockerfile  to the Amazon ECR. The full list of regions is available here.
     */
    region?: string;

    /**
     * The location of the Docker repository.
     */
    repository?: string;

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
     * Defines when the build action should be run. Can be one of `ALWAYS`, `ON_CHANGE`, `ON_CHANGE_AT_PATH`, `VAR_IS`, `VAR_IS_NOT` or `VAR_CONTAINS` or `VAR_NOT_CONTAINS`. Can't be used in deployment actions.
     */
    trigger_condition?: 'ALWAYS' | 'ON_CHANGE' | 'ON_CHANGE_AT_PATH' | 'VAR_IS' | 'VAR_IS_NOT' | 'VAR_CONTAINS';

    /**
     * Required when `trigger_condition` is set to `ON_CHANGE_AT_PATH`.
     */
    trigger_condition_paths?: string[];

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

export type ActionBuildDockerfileArgs = AsInputs<ActionBuildDockerfileState>;

export interface ActionBuildDockerfileProps {
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
    insecure_registry?: boolean;
    integration?: IntegrationRef;
    login?: string;
    password?: string;
    region?: string;
    repository?: string;
    run_next_parallel?: boolean;
    run_only_on_first_failure?: boolean;
    timeout?: number;
    trigger_condition?: 'ALWAYS' | 'ON_CHANGE' | 'ON_CHANGE_AT_PATH' | 'VAR_IS' | 'VAR_IS_NOT' | 'VAR_CONTAINS';
    trigger_condition_paths?: string[];
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
export class BuildDockerfile extends CustomResource {
    static __pulumiType = 'buddy:action:BuildDockerfile';

    static get(name: string, id: Input<ID>, state?: Partial<ActionBuildDockerfileState>, opts?: CustomResourceOptions) {
        return new BuildDockerfile(name, state as any, { ...opts, id });
    }

    static isInstance(obj: any): obj is BuildDockerfile {
        if (null == obj) {
            return false;
        }

        return obj['__pulumiType'] === BuildDockerfile.__pulumiType;
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
    insecure_registry!: Output<boolean | undefined>;
    integration!: Output<IntegrationRef | undefined>;
    login!: Output<string | undefined>;
    password!: Output<string | undefined>;
    region!: Output<string | undefined>;
    repository!: Output<string | undefined>;
    run_next_parallel!: Output<boolean | undefined>;
    run_only_on_first_failure!: Output<boolean | undefined>;
    timeout!: Output<number | undefined>;
    trigger_condition!: Output<'ALWAYS' | 'ON_CHANGE' | 'ON_CHANGE_AT_PATH' | 'VAR_IS' | 'VAR_IS_NOT' | 'VAR_CONTAINS' | undefined>;
    trigger_condition_paths!: Output<string[] | undefined>;
    trigger_variable_key!: Output<string | undefined>;
    trigger_variable_value!: Output<string | undefined>;
    variables!: Output<Variable[] | undefined>;

    constructor(name: string, argsOrState: ActionBuildDockerfileArgs | ActionBuildDockerfileState, opts?: CustomResourceOptions) {
        const inputs: Inputs = {};
        if (!opts) {
            opts = {};
        }

        if (opts.id) {
            const state = argsOrState as ActionBuildDockerfileState | undefined;
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
            inputs['insecure_registry'] = state?.insecure_registry;
            inputs['integration'] = state?.integration;
            inputs['login'] = state?.login;
            inputs['password'] = state?.password;
            inputs['region'] = state?.region;
            inputs['repository'] = state?.repository;
            inputs['run_next_parallel'] = state?.run_next_parallel;
            inputs['run_only_on_first_failure'] = state?.run_only_on_first_failure;
            inputs['timeout'] = state?.timeout;
            inputs['trigger_condition'] = state?.trigger_condition;
            inputs['trigger_condition_paths'] = state?.trigger_condition_paths;
            inputs['trigger_variable_key'] = state?.trigger_variable_key;
            inputs['trigger_variable_value'] = state?.trigger_variable_value;
            inputs['variables'] = state?.variables;
        } else {
            const args = argsOrState as ActionBuildDockerfileArgs | undefined;
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
            inputs['insecure_registry'] = args.insecure_registry;
            inputs['integration'] = args.integration;
            inputs['login'] = args.login;
            inputs['password'] = args.password;
            inputs['region'] = args.region;
            inputs['repository'] = args.repository;
            inputs['run_next_parallel'] = args.run_next_parallel;
            inputs['run_only_on_first_failure'] = args.run_only_on_first_failure;
            inputs['timeout'] = args.timeout;
            inputs['trigger_condition'] = args.trigger_condition;
            inputs['trigger_condition_paths'] = args.trigger_condition_paths;
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

        inputs['type'] = 'DOCKERFILE';
        inputs['url'] = undefined;
        inputs['html_url'] = undefined;
        inputs['action_id'] = undefined;

        super(BuildDockerfile.__pulumiType, name, inputs, opts);
    }
}
