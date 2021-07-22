import { AsInputs } from '@pulumi-utils/sdk';
import { PipelineProps } from '../pipeline';
import { CustomResource, Input, Output, ID, CustomResourceOptions, Inputs } from '@pulumi/pulumi';
import { Header, TriggerCondition, Variable } from '../common';

export interface HTTPRequestState {
    project_name: string;
    pipeline_id: number;
    /**
     * The desired HTTP method. Available values are `GET`, `POST`, `PUT`, `PATCH` or `DELETE`.
     */
    method: string;

    /**
     * The name of the action.
     */
    name: string;

    /**
     * The target URL.
     */
    notification_url: string;

    /**
     * The content of the request.
     */
    content?: string;

    /**
     * When set to `true` the action is disabled.  By default it is set to `false`.
     */
    disabled?: boolean;

    /**
     * The headers that will be sent with the request.
     */
    headers?: Header[];

    /**
     * If set to `true` the execution will proceed, mark action as a warning and jump to the next action. Doesn't apply to deployment actions.
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

export type HTTPRequestArgs = AsInputs<HTTPRequestState>;

export interface HTTPRequestProps {
    url: string;
    html_url: string;
    action_id: number;
    method: string;
    name: string;
    notification_url: string;
    type: 'HTTP';
    content?: string;
    disabled?: boolean;
    headers?: Header[];
    ignore_errors?: boolean;
    login?: string;
    password?: string;
    port?: string;
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
export class HTTPRequest extends CustomResource {
    static __pulumiType = 'buddy:action:HTTPRequest';

    static get(name: string, id: Input<ID>, state?: Partial<HTTPRequestState>, opts?: CustomResourceOptions) {
        return new HTTPRequest(name, state as any, { ...opts, id });
    }

    static isInstance(obj: any): obj is HTTPRequest {
        if (null == obj) {
            return false;
        }

        return obj['__pulumiType'] === HTTPRequest.__pulumiType;
    }

    project_name!: Output<string>;
    pipeline_id!: Output<number>;
    action_id!: Output<number>;
    method!: Output<string>;
    name!: Output<string>;
    notification_url!: Output<string>;
    type!: Output<'HTTP'>;
    content!: Output<string | undefined>;
    disabled!: Output<boolean | undefined>;
    headers!: Output<Header[] | undefined>;
    ignore_errors!: Output<boolean | undefined>;
    login!: Output<string | undefined>;
    password!: Output<string | undefined>;
    port!: Output<string | undefined>;
    retry_count!: Output<number | undefined>;
    retry_delay!: Output<number | undefined>;
    run_next_parallel!: Output<boolean | undefined>;
    run_only_on_first_failure!: Output<boolean | undefined>;
    timeout!: Output<number | undefined>;
    trigger_conditions!: Output<TriggerCondition[] | undefined>;
    variables!: Output<Variable[] | undefined>;

    constructor(name: string, argsOrState: HTTPRequestArgs | HTTPRequestState, opts?: CustomResourceOptions) {
        const inputs: Inputs = {};
        if (!opts) {
            opts = {};
        }

        if (opts.id) {
            const state = argsOrState as HTTPRequestState | undefined;
            inputs['project_name'] = state?.project_name;
            inputs['pipeline_id'] = state?.pipeline_id;
            inputs['method'] = state?.method;
            inputs['name'] = state?.name;
            inputs['notification_url'] = state?.notification_url;
            inputs['content'] = state?.content;
            inputs['disabled'] = state?.disabled;
            inputs['headers'] = state?.headers;
            inputs['ignore_errors'] = state?.ignore_errors;
            inputs['login'] = state?.login;
            inputs['password'] = state?.password;
            inputs['port'] = state?.port;
            inputs['retry_count'] = state?.retry_count;
            inputs['retry_delay'] = state?.retry_delay;
            inputs['run_next_parallel'] = state?.run_next_parallel;
            inputs['run_only_on_first_failure'] = state?.run_only_on_first_failure;
            inputs['timeout'] = state?.timeout;
            inputs['trigger_conditions'] = state?.trigger_conditions;
            inputs['variables'] = state?.variables;
        } else {
            const args = argsOrState as HTTPRequestArgs | undefined;
            if (!args?.project_name) {
                throw new Error('Missing required property "project_name"');
            }

            if (!args?.pipeline_id) {
                throw new Error('Missing required property "pipeline_id"');
            }

            if (!args?.method) {
                throw new Error('Missing required property "method"');
            }

            if (!args?.name) {
                throw new Error('Missing required property "name"');
            }

            if (!args?.notification_url) {
                throw new Error('Missing required property "notification_url"');
            }

            inputs['method'] = args.method;
            inputs['name'] = args.name;
            inputs['notification_url'] = args.notification_url;
            inputs['content'] = args.content;
            inputs['disabled'] = args.disabled;
            inputs['headers'] = args.headers;
            inputs['ignore_errors'] = args.ignore_errors;
            inputs['login'] = args.login;
            inputs['password'] = args.password;
            inputs['port'] = args.port;
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

        inputs['type'] = 'HTTP';
        inputs['url'] = undefined;
        inputs['html_url'] = undefined;
        inputs['action_id'] = undefined;

        super(HTTPRequest.__pulumiType, name, inputs, opts);
    }
}
