import { AsInputs } from '@neoskop/pulumi-utils-sdk';
import { PipelineProps } from '../pipeline';
import { CustomResource, Input, Output, ID, CustomResourceOptions, Inputs } from '@pulumi/pulumi';
import { IntegrationRef, Variable } from '../common';

export interface ActionGoogleFunctionsDeployState {
    project_name: string;
    pipeline_id: number;
    /**
     * The id of the Google Cloud project.
     */
    application_id: string;

    /**
     * The name of the Google function.
     */
    function_name: string;

    /**
     * The integration.
     */
    integration: IntegrationRef;

    /**
     * The name of the action.
     */
    name: string;

    /**
     * The Google server key (base64 encoded).
     */
    server_key: string;

    /**
     * Specifies when the action should be executed. Can be one of `ON_EVERY_EXECUTION`, `ON_FAILURE` or `ON_BACK_TO_SUCCESS`. The default value is `ON_EVERY_EXECUTION`.
     */
    trigger_time: 'ON_EVERY_EXECUTION' | 'ON_FAILURE' | 'ON_BACK_TO_SUCCESS';

    /**
     * The numerical ID of the action, after which this action should be added.
     */
    after_action_id?: number;

    /**
     * Additional arguments send upon deploying the function.
     */
    command_args?: string;

    /**
     * When set to `true` the action is disabled.  By default it is set to `false`.
     */
    disabled?: boolean;

    /**
     * The path in the repository.
     */
    local_path?: string;

    /**
     * When set to `true`, the subsequent action defined in the pipeline will run in parallel to the current action.
     */
    run_next_parallel?: boolean;

    /**
     * Defines whether the action should be executed on each failure. Restricted to and required if the `trigger_time` is `ON_FAILURE`.
     */
    run_only_on_first_failure?: boolean;

    /**
     * The Cloud Functions execution environment.
     */
    runtime?: string;

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

export type ActionGoogleFunctionsDeployArgs = AsInputs<ActionGoogleFunctionsDeployState>;

export interface ActionGoogleFunctionsDeployProps {
    url: string;
    html_url: string;
    action_id: number;
    application_id: string;
    function_name: string;
    integration: IntegrationRef;
    name: string;
    server_key: string;
    trigger_time: 'ON_EVERY_EXECUTION' | 'ON_FAILURE' | 'ON_BACK_TO_SUCCESS';
    type: 'GOOGLE_FUNCTIONS_DEPLOY';
    after_action_id?: number;
    command_args?: string;
    disabled?: boolean;
    local_path?: string;
    run_next_parallel?: boolean;
    run_only_on_first_failure?: boolean;
    runtime?: string;
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
export class GoogleFunctionsDeploy extends CustomResource {
    static __pulumiType = 'buddy:action:GoogleFunctionsDeploy';

    static get(name: string, id: Input<ID>, state?: Partial<ActionGoogleFunctionsDeployState>, opts?: CustomResourceOptions) {
        return new GoogleFunctionsDeploy(name, state as any, { ...opts, id });
    }

    static isInstance(obj: any): obj is GoogleFunctionsDeploy {
        if (null == obj) {
            return false;
        }

        return obj['__pulumiType'] === GoogleFunctionsDeploy.__pulumiType;
    }

    project_name!: Output<string>;
    pipeline_id!: Output<number>;
    action_id!: Output<number>;
    application_id!: Output<string>;
    function_name!: Output<string>;
    integration!: Output<IntegrationRef>;
    name!: Output<string>;
    server_key!: Output<string>;
    trigger_time!: Output<'ON_EVERY_EXECUTION' | 'ON_FAILURE' | 'ON_BACK_TO_SUCCESS'>;
    type!: Output<'GOOGLE_FUNCTIONS_DEPLOY'>;
    after_action_id!: Output<number | undefined>;
    command_args!: Output<string | undefined>;
    disabled!: Output<boolean | undefined>;
    local_path!: Output<string | undefined>;
    run_next_parallel!: Output<boolean | undefined>;
    run_only_on_first_failure!: Output<boolean | undefined>;
    runtime!: Output<string | undefined>;
    timeout!: Output<number | undefined>;
    trigger_condition!: Output<'ALWAYS' | 'ON_CHANGE' | 'ON_CHANGE_AT_PATH' | 'VAR_IS' | 'VAR_IS_NOT' | 'VAR_CONTAINS' | undefined>;
    trigger_condition_paths!: Output<string[] | undefined>;
    trigger_variable_key!: Output<string | undefined>;
    trigger_variable_value!: Output<string | undefined>;
    variables!: Output<Variable[] | undefined>;

    constructor(
        name: string,
        argsOrState: ActionGoogleFunctionsDeployArgs | ActionGoogleFunctionsDeployState,
        opts?: CustomResourceOptions
    ) {
        const inputs: Inputs = {};
        if (!opts) {
            opts = {};
        }

        if (opts.id) {
            const state = argsOrState as ActionGoogleFunctionsDeployState | undefined;
            inputs['project_name'] = state?.project_name;
            inputs['pipeline_id'] = state?.pipeline_id;
            inputs['application_id'] = state?.application_id;
            inputs['function_name'] = state?.function_name;
            inputs['integration'] = state?.integration;
            inputs['name'] = state?.name;
            inputs['server_key'] = state?.server_key;
            inputs['trigger_time'] = state?.trigger_time;
            inputs['after_action_id'] = state?.after_action_id;
            inputs['command_args'] = state?.command_args;
            inputs['disabled'] = state?.disabled;
            inputs['local_path'] = state?.local_path;
            inputs['run_next_parallel'] = state?.run_next_parallel;
            inputs['run_only_on_first_failure'] = state?.run_only_on_first_failure;
            inputs['runtime'] = state?.runtime;
            inputs['timeout'] = state?.timeout;
            inputs['trigger_condition'] = state?.trigger_condition;
            inputs['trigger_condition_paths'] = state?.trigger_condition_paths;
            inputs['trigger_variable_key'] = state?.trigger_variable_key;
            inputs['trigger_variable_value'] = state?.trigger_variable_value;
            inputs['variables'] = state?.variables;
        } else {
            const args = argsOrState as ActionGoogleFunctionsDeployArgs | undefined;
            if (!args?.project_name) {
                throw new Error('Missing required property "project_name"');
            }

            if (!args?.pipeline_id) {
                throw new Error('Missing required property "pipeline_id"');
            }

            if (!args?.application_id) {
                throw new Error('Missing required property "application_id"');
            }

            if (!args?.function_name) {
                throw new Error('Missing required property "function_name"');
            }

            if (!args?.integration) {
                throw new Error('Missing required property "integration"');
            }

            if (!args?.name) {
                throw new Error('Missing required property "name"');
            }

            if (!args?.server_key) {
                throw new Error('Missing required property "server_key"');
            }

            if (!args?.trigger_time) {
                throw new Error('Missing required property "trigger_time"');
            }

            inputs['application_id'] = args.application_id;
            inputs['function_name'] = args.function_name;
            inputs['integration'] = args.integration;
            inputs['name'] = args.name;
            inputs['server_key'] = args.server_key;
            inputs['trigger_time'] = args.trigger_time;
            inputs['after_action_id'] = args.after_action_id;
            inputs['command_args'] = args.command_args;
            inputs['disabled'] = args.disabled;
            inputs['local_path'] = args.local_path;
            inputs['run_next_parallel'] = args.run_next_parallel;
            inputs['run_only_on_first_failure'] = args.run_only_on_first_failure;
            inputs['runtime'] = args.runtime;
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

        inputs['type'] = 'GOOGLE_FUNCTIONS_DEPLOY';
        inputs['url'] = undefined;
        inputs['html_url'] = undefined;
        inputs['action_id'] = undefined;

        super(GoogleFunctionsDeploy.__pulumiType, name, inputs, opts);
    }
}
