import { AsInputs } from '@pulumi-utils/sdk';
import { PipelineProps } from '../pipeline';
import { CustomResource, Input, Output, ID, CustomResourceOptions, Inputs } from '@pulumi/pulumi';
import { Service, TriggerCondition, Variable } from '../common';

export interface BuildFlutterAppState {
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
     * The dependencies & directories to be cached and available to every execution in this pipeline.
     */
    cached_dirs?: string[];

    /**
     * When set to `true` the action is disabled.  By default it is set to `false`.
     */
    disabled?: boolean;

    /**
     * If set to `true` the execution will proceed, mark action as a warning and jump to the next action. Doesn't apply to deployment actions.
     */
    ignore_errors?: boolean;

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
     * The containers with the services that will be attached to this environment. Available types: `MYSQL`, `MONGO_DB`, `MARIADB`, `POSTGRE_SQL`, `REDIS`, `MEMCACHED`, `ELASTICSEARCH`, `CUSTOM`.
     */
    services?: Service[];

    /**
     * The command that will be executed only on the first run.
     */
    setup_commands?: string[];

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

export type BuildFlutterAppArgs = AsInputs<BuildFlutterAppState>;

export interface BuildFlutterAppProps {
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
    cached_dirs?: string[];
    disabled?: boolean;
    ignore_errors?: boolean;
    retry_count?: number;
    retry_delay?: number;
    run_next_parallel?: boolean;
    run_only_on_first_failure?: boolean;
    services?: Service[];
    setup_commands?: string[];
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
export class BuildFlutterApp extends CustomResource {
    static __pulumiType = 'buddy:action:BuildFlutterApp';

    static get(name: string, id: Input<ID>, state?: Partial<BuildFlutterAppState>, opts?: CustomResourceOptions) {
        return new BuildFlutterApp(name, state as any, { ...opts, id });
    }

    static isInstance(obj: any): obj is BuildFlutterApp {
        if (null == obj) {
            return false;
        }

        return obj['__pulumiType'] === BuildFlutterApp.__pulumiType;
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
    cached_dirs!: Output<string[] | undefined>;
    disabled!: Output<boolean | undefined>;
    ignore_errors!: Output<boolean | undefined>;
    retry_count!: Output<number | undefined>;
    retry_delay!: Output<number | undefined>;
    run_next_parallel!: Output<boolean | undefined>;
    run_only_on_first_failure!: Output<boolean | undefined>;
    services!: Output<Service[] | undefined>;
    setup_commands!: Output<string[] | undefined>;
    timeout!: Output<number | undefined>;
    trigger_conditions!: Output<TriggerCondition[] | undefined>;
    variables!: Output<Variable[] | undefined>;
    volume_mappings!: Output<string[] | undefined>;
    working_directory!: Output<string | undefined>;

    constructor(name: string, argsOrState: BuildFlutterAppArgs | BuildFlutterAppState, opts?: CustomResourceOptions) {
        const inputs: Inputs = {};
        if (!opts) {
            opts = {};
        }

        if (opts.id) {
            const state = argsOrState as BuildFlutterAppState | undefined;
            inputs['project_name'] = state?.project_name;
            inputs['pipeline_id'] = state?.pipeline_id;
            inputs['docker_image_name'] = state?.docker_image_name;
            inputs['docker_image_tag'] = state?.docker_image_tag;
            inputs['execute_commands'] = state?.execute_commands;
            inputs['name'] = state?.name;
            inputs['trigger_time'] = state?.trigger_time;
            inputs['after_action_id'] = state?.after_action_id;
            inputs['cached_dirs'] = state?.cached_dirs;
            inputs['disabled'] = state?.disabled;
            inputs['ignore_errors'] = state?.ignore_errors;
            inputs['retry_count'] = state?.retry_count;
            inputs['retry_delay'] = state?.retry_delay;
            inputs['run_next_parallel'] = state?.run_next_parallel;
            inputs['run_only_on_first_failure'] = state?.run_only_on_first_failure;
            inputs['services'] = state?.services;
            inputs['setup_commands'] = state?.setup_commands;
            inputs['timeout'] = state?.timeout;
            inputs['trigger_conditions'] = state?.trigger_conditions;
            inputs['variables'] = state?.variables;
            inputs['volume_mappings'] = state?.volume_mappings;
            inputs['working_directory'] = state?.working_directory;
        } else {
            const args = argsOrState as BuildFlutterAppArgs | undefined;
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
            inputs['cached_dirs'] = args.cached_dirs;
            inputs['disabled'] = args.disabled;
            inputs['ignore_errors'] = args.ignore_errors;
            inputs['retry_count'] = args.retry_count;
            inputs['retry_delay'] = args.retry_delay;
            inputs['run_next_parallel'] = args.run_next_parallel;
            inputs['run_only_on_first_failure'] = args.run_only_on_first_failure;
            inputs['services'] = args.services;
            inputs['setup_commands'] = args.setup_commands;
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

        super(BuildFlutterApp.__pulumiType, name, inputs, opts);
    }
}
