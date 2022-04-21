import { AsInputs } from '@pulumi-utils/sdk';
import { PipelineProps } from '../pipeline';
import { CustomResource, Input, Output, ID, CustomResourceOptions, Inputs } from '@pulumi/pulumi';
import { Variable, TriggerCondition } from '../common';

export interface TCPMonitoringState {
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
     * The list of variables you can use the action.
     */
    variables: Variable[];

    /**
     * The numerical ID of the action, after which this action should be added.
     */
    after_action_id?: number;

    /**
     * When set to `true` the action is disabled.  By default it is set to `false`.
     */
    disabled?: boolean;

    /**
     * If set to `true` the execution will proceed, mark action as a warning and jump to the next action. Doesn't apply to deployment actions.
     */
    ignore_errors?: boolean;

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
     * When set to `true`, the subsequent action defined in the pipeline will run in parallel to the current action.
     */
    run_next_parallel?: boolean;

    /**
     * Defines whether the action should be executed on each failure. Restricted to and required if the `trigger_time` is `ON_FAILURE`.
     */
    run_only_on_first_failure?: boolean;

    /**
     * Text that should or should not be present in the response.
     */
    text?: string;

    /**
     * The timeout in seconds.
     */
    timeout?: number;

    /**
     * The list of trigger conditions to meet so that the action can be triggered.
     */
    trigger_conditions?: TriggerCondition[];
}

export type TCPMonitoringArgs = AsInputs<TCPMonitoringState>;

export interface TCPMonitoringProps {
    url: string;
    html_url: string;
    action_id: number;
    destination: string;
    name: string;
    trigger_time: 'ON_EVERY_EXECUTION' | 'ON_FAILURE' | 'ON_BACK_TO_SUCCESS';
    type: 'TCP';
    variables: Variable[];
    after_action_id?: number;
    disabled?: boolean;
    ignore_errors?: boolean;
    port?: string;
    post_data?: string;
    retry_count?: number;
    retry_interval?: number;
    run_next_parallel?: boolean;
    run_only_on_first_failure?: boolean;
    text?: string;
    timeout?: number;
    trigger_conditions?: TriggerCondition[];
    pipeline: PipelineProps;
    project_name: string;
    pipeline_id: number;
}

/**
 * Required scopes in Buddy API: `WORKSPACE`, `EXECUTION_MANAGE`, `EXECUTION_INFO`
 */
export class TCPMonitoring extends CustomResource {
    static __pulumiType = 'buddy:action:TCPMonitoring';

    static get(name: string, id: Input<ID>, state?: Partial<TCPMonitoringState>, opts?: CustomResourceOptions) {
        return new TCPMonitoring(name, state as any, { ...opts, id });
    }

    static isInstance(obj: any): obj is TCPMonitoring {
        if (null == obj) {
            return false;
        }

        return obj['__pulumiType'] === TCPMonitoring.__pulumiType;
    }

    project_name!: Output<string>;
    pipeline_id!: Output<number>;
    action_id!: Output<number>;
    destination!: Output<string>;
    name!: Output<string>;
    trigger_time!: Output<'ON_EVERY_EXECUTION' | 'ON_FAILURE' | 'ON_BACK_TO_SUCCESS'>;
    type!: Output<'TCP'>;
    variables!: Output<Variable[]>;
    after_action_id!: Output<number | undefined>;
    disabled!: Output<boolean | undefined>;
    ignore_errors!: Output<boolean | undefined>;
    port!: Output<string | undefined>;
    post_data!: Output<string | undefined>;
    retry_count!: Output<number | undefined>;
    retry_interval!: Output<number | undefined>;
    run_next_parallel!: Output<boolean | undefined>;
    run_only_on_first_failure!: Output<boolean | undefined>;
    text!: Output<string | undefined>;
    timeout!: Output<number | undefined>;
    trigger_conditions!: Output<TriggerCondition[] | undefined>;

    constructor(name: string, argsOrState: TCPMonitoringArgs | TCPMonitoringState, opts?: CustomResourceOptions) {
        const inputs: Inputs = {};
        if (!opts) {
            opts = {};
        }

        if (opts.id) {
            const state = argsOrState as TCPMonitoringState | undefined;
            inputs['project_name'] = state?.project_name;
            inputs['pipeline_id'] = state?.pipeline_id;
            inputs['destination'] = state?.destination;
            inputs['name'] = state?.name;
            inputs['trigger_time'] = state?.trigger_time;
            inputs['variables'] = state?.variables;
            inputs['after_action_id'] = state?.after_action_id;
            inputs['disabled'] = state?.disabled;
            inputs['ignore_errors'] = state?.ignore_errors;
            inputs['port'] = state?.port;
            inputs['post_data'] = state?.post_data;
            inputs['retry_count'] = state?.retry_count;
            inputs['retry_interval'] = state?.retry_interval;
            inputs['run_next_parallel'] = state?.run_next_parallel;
            inputs['run_only_on_first_failure'] = state?.run_only_on_first_failure;
            inputs['text'] = state?.text;
            inputs['timeout'] = state?.timeout;
            inputs['trigger_conditions'] = state?.trigger_conditions;
        } else {
            const args = argsOrState as TCPMonitoringArgs | undefined;
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

            if (!args?.variables) {
                throw new Error('Missing required property "variables"');
            }

            inputs['destination'] = args.destination;
            inputs['name'] = args.name;
            inputs['trigger_time'] = args.trigger_time;
            inputs['variables'] = args.variables;
            inputs['after_action_id'] = args.after_action_id;
            inputs['disabled'] = args.disabled;
            inputs['ignore_errors'] = args.ignore_errors;
            inputs['port'] = args.port;
            inputs['post_data'] = args.post_data;
            inputs['retry_count'] = args.retry_count;
            inputs['retry_interval'] = args.retry_interval;
            inputs['run_next_parallel'] = args.run_next_parallel;
            inputs['run_only_on_first_failure'] = args.run_only_on_first_failure;
            inputs['text'] = args.text;
            inputs['timeout'] = args.timeout;
            inputs['trigger_conditions'] = args.trigger_conditions;
            inputs['project_name'] = args.project_name;
            inputs['pipeline_id'] = args.pipeline_id;
        }

        if (!opts.version) {
            opts.version = require('../package').version;
        }

        opts.ignoreChanges = ['project_name', 'pipeline_id', ...(opts.ignoreChanges || [])];

        inputs['type'] = 'TCP';
        inputs['url'] = undefined;
        inputs['html_url'] = undefined;
        inputs['action_id'] = undefined;

        super(TCPMonitoring.__pulumiType, name, inputs, opts);
    }
}
