import { AsInputs } from '@pulumi-utils/sdk';
import { PipelineProps } from '../pipeline';
import { CustomResource, Input, Output, ID, CustomResourceOptions, Inputs, output } from '@pulumi/pulumi';
import { IntegrationRef, TriggerCondition, Variable } from '../common';
import { Integration } from '../integration';

export interface GoogleFunctionsDeployState {
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
    integration: IntegrationRef | Integration;

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
     * Additional arguments sent upon deploying the function.
     */
    command_args?: string;

    /**
     * When set to 'true' the action is disabled.  By default it is set to 'false'.
     */
    disabled?: boolean;

    /**
     * If set to 'true' the execution will proceed, mark action as a warning and jump to the next action. Doesn't apply to deployment actions.
     */
    ignore_errors?: boolean;

    /**
     * The path in the repository.
     */
    local_path?: string;

    /**
     * Region in which function can be found or will be created.
     */
    region?: string;

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
     * The Cloud Functions execution environment. Options: `nodejs6`, `nodejs8`, `nodejs10`, `nodejs12`, `python37`, `go111`.
     */
    runtime?: string;

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

export type GoogleFunctionsDeployArgs = AsInputs<GoogleFunctionsDeployState>;

export interface GoogleFunctionsDeployProps {
    url: string;
    html_url: string;
    action_id: number;
    application_id: string;
    function_name: string;
    integration: IntegrationRef | Integration;
    name: string;
    trigger_time: 'ON_EVERY_EXECUTION' | 'ON_FAILURE' | 'ON_BACK_TO_SUCCESS';
    type: 'GOOGLE_FUNCTION_DEPLOY';
    after_action_id?: number;
    command_args?: string;
    disabled?: boolean;
    ignore_errors?: boolean;
    local_path?: string;
    region?: string;
    retry_count?: number;
    retry_interval?: number;
    run_next_parallel?: boolean;
    run_only_on_first_failure?: boolean;
    runtime?: string;
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
export class GoogleFunctionsDeploy extends CustomResource {
    static __pulumiType = 'buddy:action:GoogleFunctionsDeploy';

    static get(name: string, id: Input<ID>, state?: Partial<GoogleFunctionsDeployState>, opts?: CustomResourceOptions) {
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
    integration!: Output<IntegrationRef | Integration>;
    name!: Output<string>;
    trigger_time!: Output<'ON_EVERY_EXECUTION' | 'ON_FAILURE' | 'ON_BACK_TO_SUCCESS'>;
    type!: Output<'GOOGLE_FUNCTION_DEPLOY'>;
    after_action_id!: Output<number | undefined>;
    command_args!: Output<string | undefined>;
    disabled!: Output<boolean | undefined>;
    ignore_errors!: Output<boolean | undefined>;
    local_path!: Output<string | undefined>;
    region!: Output<string | undefined>;
    retry_count!: Output<number | undefined>;
    retry_interval!: Output<number | undefined>;
    run_next_parallel!: Output<boolean | undefined>;
    run_only_on_first_failure!: Output<boolean | undefined>;
    runtime!: Output<string | undefined>;
    timeout!: Output<number | undefined>;
    trigger_conditions!: Output<TriggerCondition[] | undefined>;
    variables!: Output<Variable[] | undefined>;

    constructor(name: string, argsOrState: GoogleFunctionsDeployArgs | GoogleFunctionsDeployState, opts?: CustomResourceOptions) {
        const inputs: Inputs = {};
        if (!opts) {
            opts = {};
        }

        if (opts.id) {
            const state = argsOrState as GoogleFunctionsDeployState | undefined;
            inputs['project_name'] = state?.project_name;
            inputs['pipeline_id'] = state?.pipeline_id;
            inputs['application_id'] = state?.application_id;
            inputs['function_name'] = state?.function_name;
            inputs['integration'] = state?.integration instanceof Integration ? { hash_id: state.integration.hash_id } : state?.integration;
            inputs['name'] = state?.name;
            inputs['trigger_time'] = state?.trigger_time;
            inputs['after_action_id'] = state?.after_action_id;
            inputs['command_args'] = state?.command_args;
            inputs['disabled'] = state?.disabled;
            inputs['ignore_errors'] = state?.ignore_errors;
            inputs['local_path'] = state?.local_path;
            inputs['region'] = state?.region;
            inputs['retry_count'] = state?.retry_count;
            inputs['retry_interval'] = state?.retry_interval;
            inputs['run_next_parallel'] = state?.run_next_parallel;
            inputs['run_only_on_first_failure'] = state?.run_only_on_first_failure;
            inputs['runtime'] = state?.runtime;
            inputs['timeout'] = state?.timeout;
            inputs['trigger_conditions'] = state?.trigger_conditions;
            inputs['variables'] = state?.variables;
        } else {
            const args = argsOrState as GoogleFunctionsDeployArgs | undefined;
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

            if (!args?.trigger_time) {
                throw new Error('Missing required property "trigger_time"');
            }

            inputs['application_id'] = args.application_id;
            inputs['function_name'] = args.function_name;
            inputs['integration'] = output(args.integration as Output<IntegrationRef | Integration>).apply(integration =>
                integration instanceof Integration ? { hash_id: integration.hash_id } : integration
            );
            inputs['name'] = args.name;
            inputs['trigger_time'] = args.trigger_time;
            inputs['after_action_id'] = args.after_action_id;
            inputs['command_args'] = args.command_args;
            inputs['disabled'] = args.disabled;
            inputs['ignore_errors'] = args.ignore_errors;
            inputs['local_path'] = args.local_path;
            inputs['region'] = args.region;
            inputs['retry_count'] = args.retry_count;
            inputs['retry_interval'] = args.retry_interval;
            inputs['run_next_parallel'] = args.run_next_parallel;
            inputs['run_only_on_first_failure'] = args.run_only_on_first_failure;
            inputs['runtime'] = args.runtime;
            inputs['timeout'] = args.timeout;
            inputs['trigger_conditions'] = args.trigger_conditions;
            inputs['variables'] = args.variables;
            inputs['project_name'] = args.project_name;
            inputs['pipeline_id'] = args.pipeline_id;
        }

        if (!opts.version) {
            opts.version = require('../package').version;
        }

        if (null == opts.deleteBeforeReplace) {
            opts.deleteBeforeReplace = true;
        }

        opts.ignoreChanges = ['project_name', 'pipeline_id', ...(opts.ignoreChanges || [])];

        inputs['type'] = 'GOOGLE_FUNCTION_DEPLOY';
        inputs['url'] = undefined;
        inputs['html_url'] = undefined;
        inputs['action_id'] = undefined;

        super(GoogleFunctionsDeploy.__pulumiType, name, inputs, opts);
    }
}
