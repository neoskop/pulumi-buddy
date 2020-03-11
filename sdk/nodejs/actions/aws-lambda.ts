import { AsInputs } from '../utils';
import { PipelineProps } from '../pipeline';
import { CustomResource, Input, Output, ID, CustomResourceOptions, Inputs } from '@pulumi/pulumi';
import { IntegrationRef, Variable } from '../common';

export interface ActionAWSLambdaState {
    project_name: string;
    pipeline_id: number;
    /**
     * The name of the Lambda function.
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
     * The Amazon region.
     */
    region: string;

    /**
     * The numerical ID of the action, after which this action should be added.
     */
    after_action_id?: number;

    /**
     * The type of log data produced by the Lambda function. More info here.
     */
    client_context?: string;

    /**
     * When set to `true` the action is disabled.  By default it is set to `false`.
     */
    disabled?: boolean;

    /**
     * The way in which the Lambda function will be invoked. More info here.
     */
    invocation_type?: string;

    /**
     * Logging type. Can be one of `TAIL` or `NONE`.
     */
    log_type?: 'TAIL' | 'NONE';

    /**
     * The JSON that will be provided as input to the Lambda function. More info here.
     */
    payload?: string;

    /**
     * The Lambda function version or the alias name. More info here.
     */
    qualifier?: string;

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
     * Specifies when the action should be executed. Can be one of `ON_EVERY_EXECUTION`, `ON_FAILURE` or `ON_BACK_TO_SUCCESS`. The default value is `ON_EVERY_EXECUTION`.
     */
    trigger_time: 'ON_EVERY_EXECUTION' | 'ON_FAILURE' | 'ON_BACK_TO_SUCCESS';

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

export type ActionAWSLambdaArgs = AsInputs<ActionAWSLambdaState>;

export interface ActionAWSLambdaProps {
    url: string;
    html_url: string;
    action_id: number;
    function_name: string;
    integration: IntegrationRef;
    name: string;
    region: string;
    type: 'LAMBDA';
    after_action_id?: number;
    client_context?: string;
    disabled?: boolean;
    invocation_type?: string;
    log_type?: 'TAIL' | 'NONE';
    payload?: string;
    qualifier?: string;
    run_next_parallel?: boolean;
    run_only_on_first_failure?: boolean;
    timeout?: number;
    trigger_condition?: 'ALWAYS' | 'ON_CHANGE' | 'ON_CHANGE_AT_PATH' | 'VAR_IS' | 'VAR_IS_NOT' | 'VAR_CONTAINS';
    trigger_condition_paths?: string[];
    trigger_time: 'ON_EVERY_EXECUTION' | 'ON_FAILURE' | 'ON_BACK_TO_SUCCESS';
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
export class AWSLambda extends CustomResource {
    static __pulumiType = 'buddy:action:AWSLambda';

    static get(name: string, id: Input<ID>, state?: Partial<ActionAWSLambdaState>, opts?: CustomResourceOptions) {
        return new AWSLambda(name, state as any, { ...opts, id });
    }

    static isInstance(obj: any): obj is AWSLambda {
        if (null == obj) {
            return false;
        }

        return obj['__pulumiType'] === AWSLambda.__pulumiType;
    }

    project_name!: Output<string>;
    pipeline_id!: Output<number>;
    action_id!: Output<number>;
    function_name!: Output<string>;
    integration!: Output<IntegrationRef>;
    name!: Output<string>;
    region!: Output<string>;
    type!: Output<'LAMBDA'>;
    after_action_id!: Output<number | undefined>;
    client_context!: Output<string | undefined>;
    disabled!: Output<boolean | undefined>;
    invocation_type!: Output<string | undefined>;
    log_type!: Output<'TAIL' | 'NONE' | undefined>;
    payload!: Output<string | undefined>;
    qualifier!: Output<string | undefined>;
    run_next_parallel!: Output<boolean | undefined>;
    run_only_on_first_failure!: Output<boolean | undefined>;
    timeout!: Output<number | undefined>;
    trigger_condition!: Output<'ALWAYS' | 'ON_CHANGE' | 'ON_CHANGE_AT_PATH' | 'VAR_IS' | 'VAR_IS_NOT' | 'VAR_CONTAINS' | undefined>;
    trigger_condition_paths!: Output<string[] | undefined>;
    trigger_time!: Output<'ON_EVERY_EXECUTION' | 'ON_FAILURE' | 'ON_BACK_TO_SUCCESS'>;
    trigger_variable_key!: Output<string | undefined>;
    trigger_variable_value!: Output<string | undefined>;
    variables!: Output<Variable[] | undefined>;

    constructor(name: string, argsOrState: ActionAWSLambdaArgs | ActionAWSLambdaState, opts?: CustomResourceOptions) {
        const inputs: Inputs = {};
        if (!opts) {
            opts = {};
        }

        if (opts.id) {
            const state = argsOrState as ActionAWSLambdaState | undefined;
            inputs['project_name'] = state?.project_name;
            inputs['pipeline_id'] = state?.pipeline_id;
            inputs['function_name'] = state?.function_name;
            inputs['integration'] = state?.integration;
            inputs['name'] = state?.name;
            inputs['region'] = state?.region;
            inputs['after_action_id'] = state?.after_action_id;
            inputs['client_context'] = state?.client_context;
            inputs['disabled'] = state?.disabled;
            inputs['invocation_type'] = state?.invocation_type;
            inputs['log_type'] = state?.log_type;
            inputs['payload'] = state?.payload;
            inputs['qualifier'] = state?.qualifier;
            inputs['run_next_parallel'] = state?.run_next_parallel;
            inputs['run_only_on_first_failure'] = state?.run_only_on_first_failure;
            inputs['timeout'] = state?.timeout;
            inputs['trigger_condition'] = state?.trigger_condition;
            inputs['trigger_condition_paths'] = state?.trigger_condition_paths;
            inputs['trigger_time'] = state?.trigger_time;
            inputs['trigger_variable_key'] = state?.trigger_variable_key;
            inputs['trigger_variable_value'] = state?.trigger_variable_value;
            inputs['variables'] = state?.variables;
        } else {
            const args = argsOrState as ActionAWSLambdaArgs | undefined;
            if (!args?.project_name) {
                throw new Error('Missing required property "project_name"');
            }

            if (!args?.pipeline_id) {
                throw new Error('Missing required property "pipeline_id"');
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

            if (!args?.region) {
                throw new Error('Missing required property "region"');
            }

            if (!args?.trigger_time) {
                throw new Error('Missing required property "trigger_time"');
            }

            inputs['function_name'] = args.function_name;
            inputs['integration'] = args.integration;
            inputs['name'] = args.name;
            inputs['region'] = args.region;
            inputs['after_action_id'] = args.after_action_id;
            inputs['client_context'] = args.client_context;
            inputs['disabled'] = args.disabled;
            inputs['invocation_type'] = args.invocation_type;
            inputs['log_type'] = args.log_type;
            inputs['payload'] = args.payload;
            inputs['qualifier'] = args.qualifier;
            inputs['run_next_parallel'] = args.run_next_parallel;
            inputs['run_only_on_first_failure'] = args.run_only_on_first_failure;
            inputs['timeout'] = args.timeout;
            inputs['trigger_condition'] = args.trigger_condition;
            inputs['trigger_condition_paths'] = args.trigger_condition_paths;
            inputs['trigger_time'] = args.trigger_time;
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

        inputs['type'] = 'LAMBDA';
        inputs['url'] = undefined;
        inputs['html_url'] = undefined;
        inputs['action_id'] = undefined;

        super(AWSLambda.__pulumiType, name, inputs, opts);
    }
}
