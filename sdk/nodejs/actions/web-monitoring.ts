import { AsInputs } from '@pulumi-utils/sdk';
import { PipelineProps } from '../pipeline';
import { CustomResource, Input, Output, ID, CustomResourceOptions, Inputs } from '@pulumi/pulumi';
import { Header, TriggerCondition, Variable } from '../common';

export interface WebMonitoringState {
    project_name: string;
    pipeline_id: number;
    /**
     * The target URL.
     */
    destination: string;

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
     * When set to 'true' the action is disabled.  By default it is set to 'false'.
     */
    disabled?: boolean;

    /**
     * The headers that will be sent with the request.
     */
    headers?: Header[];

    /**
     * If set to 'true' the execution will proceed, mark action as a warning and jump to the next action. Doesn't apply to deployment actions.
     */
    ignore_errors?: boolean;

    /**
     * The username required to connect to the server.
     */
    login?: string;

    /**
     * The password required to connect to the server.
     */
    password?: string;

    /**
     * The port for the connection.
     */
    port?: string;

    /**
     * The data that will be sent.
     */
    post_data?: string;

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
     * The text that should or should not be present in the response.
     */
    text?: string;

    /**
     * Defines whether the response should or should not contain given text. If set, the `text` argument is required.
     */
    text_existence?: boolean;

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

export type WebMonitoringArgs = AsInputs<WebMonitoringState>;

export interface WebMonitoringProps {
    url: string;
    html_url: string;
    action_id: number;
    destination: string;
    name: string;
    trigger_time: 'ON_EVERY_EXECUTION' | 'ON_FAILURE' | 'ON_BACK_TO_SUCCESS';
    type: 'WEB';
    after_action_id?: number;
    disabled?: boolean;
    headers?: Header[];
    ignore_errors?: boolean;
    login?: string;
    password?: string;
    port?: string;
    post_data?: string;
    retry_count?: number;
    retry_interval?: number;
    run_next_parallel?: boolean;
    run_only_on_first_failure?: boolean;
    text?: string;
    text_existence?: boolean;
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
export class WebMonitoring extends CustomResource {
    static __pulumiType = 'buddy:action:WebMonitoring';

    static get(name: string, id: Input<ID>, state?: Partial<WebMonitoringState>, opts?: CustomResourceOptions) {
        return new WebMonitoring(name, state as any, { ...opts, id });
    }

    static isInstance(obj: any): obj is WebMonitoring {
        if (null == obj) {
            return false;
        }

        return obj['__pulumiType'] === WebMonitoring.__pulumiType;
    }

    project_name!: Output<string>;
    pipeline_id!: Output<number>;
    action_id!: Output<number>;
    destination!: Output<string>;
    name!: Output<string>;
    trigger_time!: Output<'ON_EVERY_EXECUTION' | 'ON_FAILURE' | 'ON_BACK_TO_SUCCESS'>;
    type!: Output<'WEB'>;
    after_action_id!: Output<number | undefined>;
    disabled!: Output<boolean | undefined>;
    headers!: Output<Header[] | undefined>;
    ignore_errors!: Output<boolean | undefined>;
    login!: Output<string | undefined>;
    password!: Output<string | undefined>;
    port!: Output<string | undefined>;
    post_data!: Output<string | undefined>;
    retry_count!: Output<number | undefined>;
    retry_interval!: Output<number | undefined>;
    run_next_parallel!: Output<boolean | undefined>;
    run_only_on_first_failure!: Output<boolean | undefined>;
    text!: Output<string | undefined>;
    text_existence!: Output<boolean | undefined>;
    timeout!: Output<number | undefined>;
    trigger_conditions!: Output<TriggerCondition[] | undefined>;
    variables!: Output<Variable[] | undefined>;

    constructor(name: string, argsOrState: WebMonitoringArgs | WebMonitoringState, opts?: CustomResourceOptions) {
        const inputs: Inputs = {};
        if (!opts) {
            opts = {};
        }

        if (opts.id) {
            const state = argsOrState as WebMonitoringState | undefined;
            inputs['project_name'] = state?.project_name;
            inputs['pipeline_id'] = state?.pipeline_id;
            inputs['destination'] = state?.destination;
            inputs['name'] = state?.name;
            inputs['trigger_time'] = state?.trigger_time;
            inputs['after_action_id'] = state?.after_action_id;
            inputs['disabled'] = state?.disabled;
            inputs['headers'] = state?.headers;
            inputs['ignore_errors'] = state?.ignore_errors;
            inputs['login'] = state?.login;
            inputs['password'] = state?.password;
            inputs['port'] = state?.port;
            inputs['post_data'] = state?.post_data;
            inputs['retry_count'] = state?.retry_count;
            inputs['retry_interval'] = state?.retry_interval;
            inputs['run_next_parallel'] = state?.run_next_parallel;
            inputs['run_only_on_first_failure'] = state?.run_only_on_first_failure;
            inputs['text'] = state?.text;
            inputs['text_existence'] = state?.text_existence;
            inputs['timeout'] = state?.timeout;
            inputs['trigger_conditions'] = state?.trigger_conditions;
            inputs['variables'] = state?.variables;
        } else {
            const args = argsOrState as WebMonitoringArgs | undefined;
            if (!args?.project_name) {
                throw new Error('Missing required property "project_name"');
            }

            if (!args?.pipeline_id) {
                throw new Error('Missing required property "pipeline_id"');
            }

            if (!args?.destination) {
                throw new Error('Missing required property "destination"');
            }

            if (!args?.name) {
                throw new Error('Missing required property "name"');
            }

            if (!args?.trigger_time) {
                throw new Error('Missing required property "trigger_time"');
            }

            inputs['destination'] = args.destination;
            inputs['name'] = args.name;
            inputs['trigger_time'] = args.trigger_time;
            inputs['after_action_id'] = args.after_action_id;
            inputs['disabled'] = args.disabled;
            inputs['headers'] = args.headers;
            inputs['ignore_errors'] = args.ignore_errors;
            inputs['login'] = args.login;
            inputs['password'] = args.password;
            inputs['port'] = args.port;
            inputs['post_data'] = args.post_data;
            inputs['retry_count'] = args.retry_count;
            inputs['retry_interval'] = args.retry_interval;
            inputs['run_next_parallel'] = args.run_next_parallel;
            inputs['run_only_on_first_failure'] = args.run_only_on_first_failure;
            inputs['text'] = args.text;
            inputs['text_existence'] = args.text_existence;
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

        inputs['type'] = 'WEB';
        inputs['url'] = undefined;
        inputs['html_url'] = undefined;
        inputs['action_id'] = undefined;

        super(WebMonitoring.__pulumiType, name, inputs, opts);
    }
}
