import { AsInputs } from '@pulumi-utils/sdk';
import { PipelineProps } from '../pipeline';
import { CustomResource, Input, Output, ID, CustomResourceOptions, Inputs } from '@pulumi/pulumi';
import { Service, TriggerCondition, Variable } from '../common';

export interface BuildState {
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
    execute_commands: string[];

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
     * If set to `true`, the cached version of the image is used, instead of being pulled each time.
     */
    cache_base_image?: boolean;

    /**
     * The dependencies & directories to be cached and available to every execution in this pipeline.
     */
    cached_dirs?: string[];

    /**
     * When set to `true` the action is disabled.  By default it is set to `false`.
     */
    disabled?: boolean;

    /**
     * If set to `true`, all commands will be executed regardless of the result of the previous command.
     */
    execute_every_command?: boolean;

    /**
     * If set to `true` the execution will proceed, mark action as a warning and jump to the next action. Doesn't apply to deployment actions.
     */
    ignore_errors?: boolean;

    /**
     * The hostname of the container in which the action is run. The container will be available under this name in the docker network for services defined in the `services` field.
     */
    main_service_name?: string;

    /**
     * If set to `true`, resets the default entrypoint set by the image. Default value: `false`.
     */
    reset_entrypoint?: boolean;

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
     * The containers with the services that will be attached to this environment. Available types: `MYSQL`, `MONGO_DB`, `MARIADB`, `POSTGRE_SQL`, `REDIS`, `MEMCACHED`, `ELASTICSEARCH`, `CUSTOM`.
     */
    services?: Service[];

    /**
     * The command that will be executed only on the first run.
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

    /**
     * The path preceding the colon is the filesystem path (the folder from the filesystem to be mounted in the container). The path after the colon is the container path (the path in the container, where this filesystem will be located).
     */
    volume_mappings?: string[];

    /**
     * The directory in which the pipeline filesystem will be mounted.
     */
    working_directory?: string;
}

export type BuildArgs = AsInputs<BuildState>;

export interface BuildProps {
    url: string;
    html_url: string;
    action_id: number;
    docker_image_name: string;
    docker_image_tag: string;
    execute_commands: string[];
    name: string;
    trigger_time: 'ON_EVERY_EXECUTION' | 'ON_FAILURE' | 'ON_BACK_TO_SUCCESS';
    type: 'BUILD';
    after_action_id?: number;
    cache_base_image?: boolean;
    cached_dirs?: string[];
    disabled?: boolean;
    execute_every_command?: boolean;
    ignore_errors?: boolean;
    main_service_name?: string;
    reset_entrypoint?: boolean;
    retry_count?: number;
    retry_interval?: number;
    run_as_user?: string;
    run_next_parallel?: boolean;
    run_only_on_first_failure?: boolean;
    services?: Service[];
    setup_commands?: string[];
    shell?: 'SH' | 'BASH';
    timeout?: number;
    trigger_conditions?: TriggerCondition[];
    variables?: Variable[];
    volume_mappings?: string[];
    working_directory?: string;
    pipeline: PipelineProps;
    project_name: string;
    pipeline_id: number;
}

/**
 * Required scopes in Buddy API: `WORKSPACE`, `EXECUTION_MANAGE`, `EXECUTION_INFO`
 */
export class Build extends CustomResource {
    static __pulumiType = 'buddy:action:Build';

    static get(name: string, id: Input<ID>, state?: Partial<BuildState>, opts?: CustomResourceOptions) {
        return new Build(name, state as any, { ...opts, id });
    }

    static isInstance(obj: any): obj is Build {
        if (null == obj) {
            return false;
        }

        return obj['__pulumiType'] === Build.__pulumiType;
    }

    project_name!: Output<string>;
    pipeline_id!: Output<number>;
    action_id!: Output<number>;
    docker_image_name!: Output<string>;
    docker_image_tag!: Output<string>;
    execute_commands!: Output<string[]>;
    name!: Output<string>;
    trigger_time!: Output<'ON_EVERY_EXECUTION' | 'ON_FAILURE' | 'ON_BACK_TO_SUCCESS'>;
    type!: Output<'BUILD'>;
    after_action_id!: Output<number | undefined>;
    cache_base_image!: Output<boolean | undefined>;
    cached_dirs!: Output<string[] | undefined>;
    disabled!: Output<boolean | undefined>;
    execute_every_command!: Output<boolean | undefined>;
    ignore_errors!: Output<boolean | undefined>;
    main_service_name!: Output<string | undefined>;
    reset_entrypoint!: Output<boolean | undefined>;
    retry_count!: Output<number | undefined>;
    retry_interval!: Output<number | undefined>;
    run_as_user!: Output<string | undefined>;
    run_next_parallel!: Output<boolean | undefined>;
    run_only_on_first_failure!: Output<boolean | undefined>;
    services!: Output<Service[] | undefined>;
    setup_commands!: Output<string[] | undefined>;
    shell!: Output<'SH' | 'BASH' | undefined>;
    timeout!: Output<number | undefined>;
    trigger_conditions!: Output<TriggerCondition[] | undefined>;
    variables!: Output<Variable[] | undefined>;
    volume_mappings!: Output<string[] | undefined>;
    working_directory!: Output<string | undefined>;

    constructor(name: string, argsOrState: BuildArgs | BuildState, opts?: CustomResourceOptions) {
        const inputs: Inputs = {};
        if (!opts) {
            opts = {};
        }

        if (opts.id) {
            const state = argsOrState as BuildState | undefined;
            inputs['project_name'] = state?.project_name;
            inputs['pipeline_id'] = state?.pipeline_id;
            inputs['docker_image_name'] = state?.docker_image_name;
            inputs['docker_image_tag'] = state?.docker_image_tag;
            inputs['execute_commands'] = state?.execute_commands;
            inputs['name'] = state?.name;
            inputs['trigger_time'] = state?.trigger_time;
            inputs['after_action_id'] = state?.after_action_id;
            inputs['cache_base_image'] = state?.cache_base_image;
            inputs['cached_dirs'] = state?.cached_dirs;
            inputs['disabled'] = state?.disabled;
            inputs['execute_every_command'] = state?.execute_every_command;
            inputs['ignore_errors'] = state?.ignore_errors;
            inputs['main_service_name'] = state?.main_service_name;
            inputs['reset_entrypoint'] = state?.reset_entrypoint;
            inputs['retry_count'] = state?.retry_count;
            inputs['retry_interval'] = state?.retry_interval;
            inputs['run_as_user'] = state?.run_as_user;
            inputs['run_next_parallel'] = state?.run_next_parallel;
            inputs['run_only_on_first_failure'] = state?.run_only_on_first_failure;
            inputs['services'] = state?.services;
            inputs['setup_commands'] = state?.setup_commands;
            inputs['shell'] = state?.shell;
            inputs['timeout'] = state?.timeout;
            inputs['trigger_conditions'] = state?.trigger_conditions;
            inputs['variables'] = state?.variables;
            inputs['volume_mappings'] = state?.volume_mappings;
            inputs['working_directory'] = state?.working_directory;
        } else {
            const args = argsOrState as BuildArgs | undefined;
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

            if (!args?.execute_commands) {
                throw new Error('Missing required property "execute_commands"');
            }

            if (!args?.name) {
                throw new Error('Missing required property "name"');
            }

            if (!args?.trigger_time) {
                throw new Error('Missing required property "trigger_time"');
            }

            inputs['docker_image_name'] = args.docker_image_name;
            inputs['docker_image_tag'] = args.docker_image_tag;
            inputs['execute_commands'] = args.execute_commands;
            inputs['name'] = args.name;
            inputs['trigger_time'] = args.trigger_time;
            inputs['after_action_id'] = args.after_action_id;
            inputs['cache_base_image'] = args.cache_base_image;
            inputs['cached_dirs'] = args.cached_dirs;
            inputs['disabled'] = args.disabled;
            inputs['execute_every_command'] = args.execute_every_command;
            inputs['ignore_errors'] = args.ignore_errors;
            inputs['main_service_name'] = args.main_service_name;
            inputs['reset_entrypoint'] = args.reset_entrypoint;
            inputs['retry_count'] = args.retry_count;
            inputs['retry_interval'] = args.retry_interval;
            inputs['run_as_user'] = args.run_as_user;
            inputs['run_next_parallel'] = args.run_next_parallel;
            inputs['run_only_on_first_failure'] = args.run_only_on_first_failure;
            inputs['services'] = args.services;
            inputs['setup_commands'] = args.setup_commands;
            inputs['shell'] = args.shell;
            inputs['timeout'] = args.timeout;
            inputs['trigger_conditions'] = args.trigger_conditions;
            inputs['variables'] = args.variables;
            inputs['volume_mappings'] = args.volume_mappings;
            inputs['working_directory'] = args.working_directory;
            inputs['project_name'] = args.project_name;
            inputs['pipeline_id'] = args.pipeline_id;
        }

        if (!opts.version) {
            opts.version = require('../package').version;
        }

        opts.ignoreChanges = ['project_name', 'pipeline_id', ...(opts.ignoreChanges || [])];

        inputs['type'] = 'BUILD';
        inputs['url'] = undefined;
        inputs['html_url'] = undefined;
        inputs['action_id'] = undefined;

        super(Build.__pulumiType, name, inputs, opts);
    }
}
