import { AsInputs } from '@pulumi-utils/sdk';
import { PipelineProps } from '../pipeline';
import { CustomResource, Input, Output, ID, CustomResourceOptions, Inputs, output } from '@pulumi/pulumi';
import { IntegrationRef, Variable } from '../common';
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
     * Defines the export path of the container’s filesystem as a tar archive.
     */
    export_container_path?: string;

    /**
     * If set to `true` the execution will proceed, mark action as a warning and jump to the next action. Doesn't apply to deployment actions.
     */
    ignore_errors?: boolean;

    /**
     * The integration. Required for using the image from the Amazon ECR.
     */
    integration?: IntegrationRef | Integration;

    /**
     * The username required to connect to the Dockerhub, private registry or GCR.
     */
    login?: string;

    /**
     * Defines whether or not to mount the filesystem to the running container.
     */
    mount_filesystem_disable?: boolean;

    /**
     * The password required to connect to the Dockerhub, private registry or GCR.
     */
    password?: string;

    /**
     * The name of the Amazon S3 region. Required for using the image from the Amazon ECR. The full list of regions is available here.
     */
    region?: string;

    /**
     * The url to the Docker registry or GCR.
     */
    registry?: string;

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
     * Defines when the build action should be run. Can be one of `ALWAYS`, `ON_CHANGE`, `ON_CHANGE_AT_PATH`, `VAR_IS`, `VAR_IS_NOT`, `VAR_CONTAINS`, `VAR_NOT_CONTAINS`, `DATETIME` or `SUCCESS_PIPELINE`. Can't be used in deployment actions.
     */
    trigger_condition?:
        | 'ALWAYS'
        | 'ON_CHANGE'
        | 'ON_CHANGE_AT_PATH'
        | 'VAR_IS'
        | 'VAR_IS_NOT'
        | 'VAR_CONTAINS'
        | 'VAR_NOT_CONTAINS'
        | 'DATETIME'
        | 'SUCCESS_PIPELINE';

    /**
     * Required when `trigger_condition` is set to `ON_CHANGE_AT_PATH`.
     */
    trigger_condition_paths?: string[];

    /**
     * Available when `trigger_condition` is set to `DATETIME`. Defines the days running from 1 to 7 where 1 is for Monday.
     */
    trigger_days?: number[];

    /**
     * Available when `trigger_condition` is set to `DATETIME`. Defines the time – by default running from 1 to 24.
     */
    trigger_hours?: number[];

    /**
     * Required when `trigger_condition` is set to `SUCCESS_PIPELINE`. Defines the name of the pipeline.
     */
    trigger_pipeline_name?: string;

    /**
     * Required when `trigger_condition` is set to `SUCCESS_PIPELINE`. Defines the name of the project in which the `trigger_pipeline_name` is.
     */
    trigger_project_name?: string;

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

    /**
     * The path preceding the colon is the filesystem path (the folder from the filesystem to be mounted in the container). The path after the colon is the container path (the path in the container, where this filesystem will be located).
     */
    volume_mappings?: string[];

    /**
     * Available when `trigger_condition` is set to `DATETIME`. Defines the timezone (by default it is UTC) and takes values from here.
     */
    zone_id?: string;
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
    export_container_path?: string;
    ignore_errors?: boolean;
    integration?: IntegrationRef | Integration;
    login?: string;
    mount_filesystem_disable?: boolean;
    password?: string;
    region?: string;
    registry?: string;
    run_as_user?: string;
    run_next_parallel?: boolean;
    run_only_on_first_failure?: boolean;
    timeout?: number;
    trigger_condition?:
        | 'ALWAYS'
        | 'ON_CHANGE'
        | 'ON_CHANGE_AT_PATH'
        | 'VAR_IS'
        | 'VAR_IS_NOT'
        | 'VAR_CONTAINS'
        | 'VAR_NOT_CONTAINS'
        | 'DATETIME'
        | 'SUCCESS_PIPELINE';
    trigger_condition_paths?: string[];
    trigger_days?: number[];
    trigger_hours?: number[];
    trigger_pipeline_name?: string;
    trigger_project_name?: string;
    trigger_variable_key?: string;
    trigger_variable_value?: string;
    variables?: Variable[];
    volume_mappings?: string[];
    zone_id?: string;
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
    export_container_path!: Output<string | undefined>;
    ignore_errors!: Output<boolean | undefined>;
    integration!: Output<IntegrationRef | Integration | undefined>;
    login!: Output<string | undefined>;
    mount_filesystem_disable!: Output<boolean | undefined>;
    password!: Output<string | undefined>;
    region!: Output<string | undefined>;
    registry!: Output<string | undefined>;
    run_as_user!: Output<string | undefined>;
    run_next_parallel!: Output<boolean | undefined>;
    run_only_on_first_failure!: Output<boolean | undefined>;
    timeout!: Output<number | undefined>;
    trigger_condition!: Output<
        | 'ALWAYS'
        | 'ON_CHANGE'
        | 'ON_CHANGE_AT_PATH'
        | 'VAR_IS'
        | 'VAR_IS_NOT'
        | 'VAR_CONTAINS'
        | 'VAR_NOT_CONTAINS'
        | 'DATETIME'
        | 'SUCCESS_PIPELINE'
        | undefined
    >;
    trigger_condition_paths!: Output<string[] | undefined>;
    trigger_days!: Output<number[] | undefined>;
    trigger_hours!: Output<number[] | undefined>;
    trigger_pipeline_name!: Output<string | undefined>;
    trigger_project_name!: Output<string | undefined>;
    trigger_variable_key!: Output<string | undefined>;
    trigger_variable_value!: Output<string | undefined>;
    variables!: Output<Variable[] | undefined>;
    volume_mappings!: Output<string[] | undefined>;
    zone_id!: Output<string | undefined>;

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
            inputs['export_container_path'] = state?.export_container_path;
            inputs['ignore_errors'] = state?.ignore_errors;
            inputs['integration'] = state?.integration instanceof Integration ? { hash_id: state.integration.hash_id } : state?.integration;
            inputs['login'] = state?.login;
            inputs['mount_filesystem_disable'] = state?.mount_filesystem_disable;
            inputs['password'] = state?.password;
            inputs['region'] = state?.region;
            inputs['registry'] = state?.registry;
            inputs['run_as_user'] = state?.run_as_user;
            inputs['run_next_parallel'] = state?.run_next_parallel;
            inputs['run_only_on_first_failure'] = state?.run_only_on_first_failure;
            inputs['timeout'] = state?.timeout;
            inputs['trigger_condition'] = state?.trigger_condition;
            inputs['trigger_condition_paths'] = state?.trigger_condition_paths;
            inputs['trigger_days'] = state?.trigger_days;
            inputs['trigger_hours'] = state?.trigger_hours;
            inputs['trigger_pipeline_name'] = state?.trigger_pipeline_name;
            inputs['trigger_project_name'] = state?.trigger_project_name;
            inputs['trigger_variable_key'] = state?.trigger_variable_key;
            inputs['trigger_variable_value'] = state?.trigger_variable_value;
            inputs['variables'] = state?.variables;
            inputs['volume_mappings'] = state?.volume_mappings;
            inputs['zone_id'] = state?.zone_id;
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

            inputs['docker_image_name'] = args.docker_image_name;
            inputs['docker_image_tag'] = args.docker_image_tag;
            inputs['inline_commands'] = args.inline_commands;
            inputs['name'] = args.name;
            inputs['trigger_time'] = args.trigger_time;
            inputs['after_action_id'] = args.after_action_id;
            inputs['disabled'] = args.disabled;
            inputs['export_container_path'] = args.export_container_path;
            inputs['ignore_errors'] = args.ignore_errors;
            inputs['integration'] = output(args.integration).apply(integration =>
                integration instanceof Integration ? { hash_id: integration.hash_id } : integration
            );
            inputs['login'] = args.login;
            inputs['mount_filesystem_disable'] = args.mount_filesystem_disable;
            inputs['password'] = args.password;
            inputs['region'] = args.region;
            inputs['registry'] = args.registry;
            inputs['run_as_user'] = args.run_as_user;
            inputs['run_next_parallel'] = args.run_next_parallel;
            inputs['run_only_on_first_failure'] = args.run_only_on_first_failure;
            inputs['timeout'] = args.timeout;
            inputs['trigger_condition'] = args.trigger_condition;
            inputs['trigger_condition_paths'] = args.trigger_condition_paths;
            inputs['trigger_days'] = args.trigger_days;
            inputs['trigger_hours'] = args.trigger_hours;
            inputs['trigger_pipeline_name'] = args.trigger_pipeline_name;
            inputs['trigger_project_name'] = args.trigger_project_name;
            inputs['trigger_variable_key'] = args.trigger_variable_key;
            inputs['trigger_variable_value'] = args.trigger_variable_value;
            inputs['variables'] = args.variables;
            inputs['volume_mappings'] = args.volume_mappings;
            inputs['zone_id'] = args.zone_id;
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
