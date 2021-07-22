import { AsInputs } from '@pulumi-utils/sdk';
import { PipelineProps } from '../pipeline';
import { CustomResource, Input, Output, ID, CustomResourceOptions, Inputs, output } from '@pulumi/pulumi';
import { IntegrationRef, TriggerCondition, Variable } from '../common';
import { Integration } from '../integration';

export interface AWSLambdaState {
    project_name: string;
    pipeline_id: number;
    /**
     * The name of the Lambda function.
     */
    function_name: string;

    /**
     * The integration.
     */
    integration: IntegrationRef | Integration;

    /**
     * The name of the action.
     */
    name: string;

    /**
     * The Amazon region.
     */
    region: string;

    /**
     * The type of log data produced by the Lambda function. More info here.
     */
    client_context?: string;

    /**
     * When set to `true` the action is disabled.  By default it is set to `false`.
     */
    disabled?: boolean;

    /**
     * If set to `true` the execution will proceed, mark action as a warning and jump to the next action. Doesn't apply to deployment actions.
     */
    ignore_errors?: boolean;

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

export type AWSLambdaArgs = AsInputs<AWSLambdaState>;

export interface AWSLambdaProps {
    url: string;
    html_url: string;
    action_id: number;
    function_name: string;
    integration: IntegrationRef | Integration;
    name: string;
    region: string;
    type: 'LAMBDA';
    client_context?: string;
    disabled?: boolean;
    ignore_errors?: boolean;
    invocation_type?: string;
    log_type?: 'TAIL' | 'NONE';
    payload?: string;
    qualifier?: string;
    retry_count?: number;
    retry_delay?: number;
    run_next_parallel?: boolean;
    run_only_on_first_failure?: boolean;
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
export class AWSLambda extends CustomResource {
    static __pulumiType = 'buddy:action:AWSLambda';

    static get(name: string, id: Input<ID>, state?: Partial<AWSLambdaState>, opts?: CustomResourceOptions) {
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
    integration!: Output<IntegrationRef | Integration>;
    name!: Output<string>;
    region!: Output<string>;
    type!: Output<'LAMBDA'>;
    client_context!: Output<string | undefined>;
    disabled!: Output<boolean | undefined>;
    ignore_errors!: Output<boolean | undefined>;
    invocation_type!: Output<string | undefined>;
    log_type!: Output<'TAIL' | 'NONE' | undefined>;
    payload!: Output<string | undefined>;
    qualifier!: Output<string | undefined>;
    retry_count!: Output<number | undefined>;
    retry_delay!: Output<number | undefined>;
    run_next_parallel!: Output<boolean | undefined>;
    run_only_on_first_failure!: Output<boolean | undefined>;
    timeout!: Output<number | undefined>;
    trigger_conditions!: Output<TriggerCondition[] | undefined>;
    variables!: Output<Variable[] | undefined>;

    constructor(name: string, argsOrState: AWSLambdaArgs | AWSLambdaState, opts?: CustomResourceOptions) {
        const inputs: Inputs = {};
        if (!opts) {
            opts = {};
        }

        if (opts.id) {
            const state = argsOrState as AWSLambdaState | undefined;
            inputs['project_name'] = state?.project_name;
            inputs['pipeline_id'] = state?.pipeline_id;
            inputs['function_name'] = state?.function_name;
            inputs['integration'] = state?.integration instanceof Integration ? { hash_id: state.integration.hash_id } : state?.integration;
            inputs['name'] = state?.name;
            inputs['region'] = state?.region;
            inputs['client_context'] = state?.client_context;
            inputs['disabled'] = state?.disabled;
            inputs['ignore_errors'] = state?.ignore_errors;
            inputs['invocation_type'] = state?.invocation_type;
            inputs['log_type'] = state?.log_type;
            inputs['payload'] = state?.payload;
            inputs['qualifier'] = state?.qualifier;
            inputs['retry_count'] = state?.retry_count;
            inputs['retry_delay'] = state?.retry_delay;
            inputs['run_next_parallel'] = state?.run_next_parallel;
            inputs['run_only_on_first_failure'] = state?.run_only_on_first_failure;
            inputs['timeout'] = state?.timeout;
            inputs['trigger_conditions'] = state?.trigger_conditions;
            inputs['variables'] = state?.variables;
        } else {
            const args = argsOrState as AWSLambdaArgs | undefined;
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

            inputs['function_name'] = args.function_name;
            inputs['integration'] = output(args.integration as Output<IntegrationRef | Integration>).apply(integration =>
                integration instanceof Integration ? { hash_id: integration.hash_id } : integration
            );
            inputs['name'] = args.name;
            inputs['region'] = args.region;
            inputs['client_context'] = args.client_context;
            inputs['disabled'] = args.disabled;
            inputs['ignore_errors'] = args.ignore_errors;
            inputs['invocation_type'] = args.invocation_type;
            inputs['log_type'] = args.log_type;
            inputs['payload'] = args.payload;
            inputs['qualifier'] = args.qualifier;
            inputs['retry_count'] = args.retry_count;
            inputs['retry_delay'] = args.retry_delay;
            inputs['run_next_parallel'] = args.run_next_parallel;
            inputs['run_only_on_first_failure'] = args.run_only_on_first_failure;
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

        inputs['type'] = 'LAMBDA';
        inputs['url'] = undefined;
        inputs['html_url'] = undefined;
        inputs['action_id'] = undefined;

        super(AWSLambda.__pulumiType, name, inputs, opts);
    }
}
