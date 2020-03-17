import { AsInputs } from '@neoskop/pulumi-utils-sdk';
import { PipelineProps } from '../pipeline';
import { CustomResource, Input, Output, ID, CustomResourceOptions, Inputs } from '@pulumi/pulumi';
import { IntegrationRef, Variable } from '../common';

export interface ActionFirebaseState {
    project_name: string;
    pipeline_id: number;
    /**
     * The ID of the Firebase application.
     */
    application_id: string;

    /**
     * Commands that will be executed.
     */
    execute_commands: string[];

    /**
     * The integration.
     */
    integration: IntegrationRef;

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

    /**
     * The path preceding the colon is the filesystem path (the folder from the filesystem to be mounted in the container). The path after the colon is the container path (the path in the container, where this filesystem will be located).
     */
    volume_mappings?: string[];

    /**
     * The directory in which the commands are executed. Available when `type` is set to `CUSTOM`.
     */
    working_directory?: string;
}

export type ActionFirebaseArgs = AsInputs<ActionFirebaseState>;

export interface ActionFirebaseProps {
    url: string;
    html_url: string;
    action_id: number;
    application_id: string;
    execute_commands: string[];
    integration: IntegrationRef;
    name: string;
    trigger_time: 'ON_EVERY_EXECUTION' | 'ON_FAILURE' | 'ON_BACK_TO_SUCCESS';
    type: 'FIREBASE';
    after_action_id?: number;
    disabled?: boolean;
    run_next_parallel?: boolean;
    run_only_on_first_failure?: boolean;
    timeout?: number;
    trigger_condition?: 'ALWAYS' | 'ON_CHANGE' | 'ON_CHANGE_AT_PATH' | 'VAR_IS' | 'VAR_IS_NOT' | 'VAR_CONTAINS';
    trigger_condition_paths?: string[];
    trigger_variable_key?: string;
    trigger_variable_value?: string;
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
export class Firebase extends CustomResource {
    static __pulumiType = 'buddy:action:Firebase';

    static get(name: string, id: Input<ID>, state?: Partial<ActionFirebaseState>, opts?: CustomResourceOptions) {
        return new Firebase(name, state as any, { ...opts, id });
    }

    static isInstance(obj: any): obj is Firebase {
        if (null == obj) {
            return false;
        }

        return obj['__pulumiType'] === Firebase.__pulumiType;
    }

    project_name!: Output<string>;
    pipeline_id!: Output<number>;
    action_id!: Output<number>;
    application_id!: Output<string>;
    execute_commands!: Output<string[]>;
    integration!: Output<IntegrationRef>;
    name!: Output<string>;
    trigger_time!: Output<'ON_EVERY_EXECUTION' | 'ON_FAILURE' | 'ON_BACK_TO_SUCCESS'>;
    type!: Output<'FIREBASE'>;
    after_action_id!: Output<number | undefined>;
    disabled!: Output<boolean | undefined>;
    run_next_parallel!: Output<boolean | undefined>;
    run_only_on_first_failure!: Output<boolean | undefined>;
    timeout!: Output<number | undefined>;
    trigger_condition!: Output<'ALWAYS' | 'ON_CHANGE' | 'ON_CHANGE_AT_PATH' | 'VAR_IS' | 'VAR_IS_NOT' | 'VAR_CONTAINS' | undefined>;
    trigger_condition_paths!: Output<string[] | undefined>;
    trigger_variable_key!: Output<string | undefined>;
    trigger_variable_value!: Output<string | undefined>;
    variables!: Output<Variable[] | undefined>;
    volume_mappings!: Output<string[] | undefined>;
    working_directory!: Output<string | undefined>;

    constructor(name: string, argsOrState: ActionFirebaseArgs | ActionFirebaseState, opts?: CustomResourceOptions) {
        const inputs: Inputs = {};
        if (!opts) {
            opts = {};
        }

        if (opts.id) {
            const state = argsOrState as ActionFirebaseState | undefined;
            inputs['project_name'] = state?.project_name;
            inputs['pipeline_id'] = state?.pipeline_id;
            inputs['application_id'] = state?.application_id;
            inputs['execute_commands'] = state?.execute_commands;
            inputs['integration'] = state?.integration;
            inputs['name'] = state?.name;
            inputs['trigger_time'] = state?.trigger_time;
            inputs['after_action_id'] = state?.after_action_id;
            inputs['disabled'] = state?.disabled;
            inputs['run_next_parallel'] = state?.run_next_parallel;
            inputs['run_only_on_first_failure'] = state?.run_only_on_first_failure;
            inputs['timeout'] = state?.timeout;
            inputs['trigger_condition'] = state?.trigger_condition;
            inputs['trigger_condition_paths'] = state?.trigger_condition_paths;
            inputs['trigger_variable_key'] = state?.trigger_variable_key;
            inputs['trigger_variable_value'] = state?.trigger_variable_value;
            inputs['variables'] = state?.variables;
            inputs['volume_mappings'] = state?.volume_mappings;
            inputs['working_directory'] = state?.working_directory;
        } else {
            const args = argsOrState as ActionFirebaseArgs | undefined;
            if (!args?.project_name) {
                throw new Error('Missing required property "project_name"');
            }

            if (!args?.pipeline_id) {
                throw new Error('Missing required property "pipeline_id"');
            }

            if (!args?.application_id) {
                throw new Error('Missing required property "application_id"');
            }

            if (!args?.execute_commands) {
                throw new Error('Missing required property "execute_commands"');
            }

            if (!args?.integration) {
                throw new Error('Missing required property "integration"');
            }

            if (!args?.name) {
                throw new Error('Missing required property "name"');
            }

            if (!args?.trigger_time) {
                throw new Error('Missing required property "trigger_time"');
            }

            inputs['application_id'] = args.application_id;
            inputs['execute_commands'] = args.execute_commands;
            inputs['integration'] = args.integration;
            inputs['name'] = args.name;
            inputs['trigger_time'] = args.trigger_time;
            inputs['after_action_id'] = args.after_action_id;
            inputs['disabled'] = args.disabled;
            inputs['run_next_parallel'] = args.run_next_parallel;
            inputs['run_only_on_first_failure'] = args.run_only_on_first_failure;
            inputs['timeout'] = args.timeout;
            inputs['trigger_condition'] = args.trigger_condition;
            inputs['trigger_condition_paths'] = args.trigger_condition_paths;
            inputs['trigger_variable_key'] = args.trigger_variable_key;
            inputs['trigger_variable_value'] = args.trigger_variable_value;
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

        inputs['type'] = 'FIREBASE';
        inputs['url'] = undefined;
        inputs['html_url'] = undefined;
        inputs['action_id'] = undefined;

        super(Firebase.__pulumiType, name, inputs, opts);
    }
}
