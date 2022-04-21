import { AsInputs } from '@pulumi-utils/sdk';
import { PipelineProps } from '../pipeline';
import { CustomResource, Input, Output, ID, CustomResourceOptions, Inputs, output } from '@pulumi/pulumi';
import { IntegrationRef, TriggerCondition, Variable } from '../common';
import { Integration } from '../integration';

export interface DatadogNotificationState {
    project_name: string;
    pipeline_id: number;
    /**
     * The type of the alert. Can be one of `SUCCESS`, `WARNING` or `ERROR`.
     */
    alert_type: 'SUCCESS' | 'WARNING' | 'ERROR';

    /**
     * The content of the posted event.
     */
    content: string;

    /**
     * The integration.
     */
    integration: IntegrationRef | Integration;

    /**
     * The name of the action.
     */
    name: string;

    /**
     * The title of the posted event.
     */
    title: string;

    /**
     * Specifies when the action should be executed. Can be one of `ON_EVERY_EXECUTION`, `ON_FAILURE` or `ON_BACK_TO_SUCCESS`. The default value is `ON_EVERY_EXECUTION`.
     */
    trigger_time: 'ON_EVERY_EXECUTION' | 'ON_FAILURE' | 'ON_BACK_TO_SUCCESS';

    /**
     * The numerical ID of the action, after which this action should be added.
     */
    after_action_id?: number;

    /**
     * An arbitrary string to use for aggregation, max length of 100 characters. If you specify a key, all events using that key will be grouped together in the Event Stream.
     */
    aggregation_key?: string;

    /**
     * When set to `true` the action is disabled.  By default it is set to `false`.
     */
    disabled?: boolean;

    /**
     * The Host name to associate with the event. Any tags associated with the host will also be applied to this event.
     */
    host?: string;

    /**
     * If set to `true` the execution will proceed, mark action as a warning and jump to the next action. Doesn't apply to deployment actions.
     */
    ignore_errors?: boolean;

    /**
     * The Datadog region. Can be one of `NA` or `EU`. If not set, the default is `NA`.
     */
    region?: 'NA' | 'EU';

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
     * The list of tags to apply to the event.
     */
    tags?: string[];

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

export type DatadogNotificationArgs = AsInputs<DatadogNotificationState>;

export interface DatadogNotificationProps {
    url: string;
    html_url: string;
    action_id: number;
    alert_type: 'SUCCESS' | 'WARNING' | 'ERROR';
    content: string;
    integration: IntegrationRef | Integration;
    name: string;
    title: string;
    trigger_time: 'ON_EVERY_EXECUTION' | 'ON_FAILURE' | 'ON_BACK_TO_SUCCESS';
    type: 'DATADOG';
    after_action_id?: number;
    aggregation_key?: string;
    disabled?: boolean;
    host?: string;
    ignore_errors?: boolean;
    region?: 'NA' | 'EU';
    retry_count?: number;
    retry_interval?: number;
    run_next_parallel?: boolean;
    run_only_on_first_failure?: boolean;
    tags?: string[];
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
export class DatadogNotification extends CustomResource {
    static __pulumiType = 'buddy:action:DatadogNotification';

    static get(name: string, id: Input<ID>, state?: Partial<DatadogNotificationState>, opts?: CustomResourceOptions) {
        return new DatadogNotification(name, state as any, { ...opts, id });
    }

    static isInstance(obj: any): obj is DatadogNotification {
        if (null == obj) {
            return false;
        }

        return obj['__pulumiType'] === DatadogNotification.__pulumiType;
    }

    project_name!: Output<string>;
    pipeline_id!: Output<number>;
    action_id!: Output<number>;
    alert_type!: Output<'SUCCESS' | 'WARNING' | 'ERROR'>;
    content!: Output<string>;
    integration!: Output<IntegrationRef | Integration>;
    name!: Output<string>;
    title!: Output<string>;
    trigger_time!: Output<'ON_EVERY_EXECUTION' | 'ON_FAILURE' | 'ON_BACK_TO_SUCCESS'>;
    type!: Output<'DATADOG'>;
    after_action_id!: Output<number | undefined>;
    aggregation_key!: Output<string | undefined>;
    disabled!: Output<boolean | undefined>;
    host!: Output<string | undefined>;
    ignore_errors!: Output<boolean | undefined>;
    region!: Output<'NA' | 'EU' | undefined>;
    retry_count!: Output<number | undefined>;
    retry_interval!: Output<number | undefined>;
    run_next_parallel!: Output<boolean | undefined>;
    run_only_on_first_failure!: Output<boolean | undefined>;
    tags!: Output<string[] | undefined>;
    timeout!: Output<number | undefined>;
    trigger_conditions!: Output<TriggerCondition[] | undefined>;
    variables!: Output<Variable[] | undefined>;

    constructor(name: string, argsOrState: DatadogNotificationArgs | DatadogNotificationState, opts?: CustomResourceOptions) {
        const inputs: Inputs = {};
        if (!opts) {
            opts = {};
        }

        if (opts.id) {
            const state = argsOrState as DatadogNotificationState | undefined;
            inputs['project_name'] = state?.project_name;
            inputs['pipeline_id'] = state?.pipeline_id;
            inputs['alert_type'] = state?.alert_type;
            inputs['content'] = state?.content;
            inputs['integration'] = state?.integration instanceof Integration ? { hash_id: state.integration.hash_id } : state?.integration;
            inputs['name'] = state?.name;
            inputs['title'] = state?.title;
            inputs['trigger_time'] = state?.trigger_time;
            inputs['after_action_id'] = state?.after_action_id;
            inputs['aggregation_key'] = state?.aggregation_key;
            inputs['disabled'] = state?.disabled;
            inputs['host'] = state?.host;
            inputs['ignore_errors'] = state?.ignore_errors;
            inputs['region'] = state?.region;
            inputs['retry_count'] = state?.retry_count;
            inputs['retry_interval'] = state?.retry_interval;
            inputs['run_next_parallel'] = state?.run_next_parallel;
            inputs['run_only_on_first_failure'] = state?.run_only_on_first_failure;
            inputs['tags'] = state?.tags;
            inputs['timeout'] = state?.timeout;
            inputs['trigger_conditions'] = state?.trigger_conditions;
            inputs['variables'] = state?.variables;
        } else {
            const args = argsOrState as DatadogNotificationArgs | undefined;
            if (!args?.project_name) {
                throw new Error('Missing required property "project_name"');
            }

            if (!args?.pipeline_id) {
                throw new Error('Missing required property "pipeline_id"');
            }

            if (!args?.alert_type) {
                throw new Error('Missing required property "alert_type"');
            }

            if (!args?.content) {
                throw new Error('Missing required property "content"');
            }

            if (!args?.integration) {
                throw new Error('Missing required property "integration"');
            }

            if (!args?.name) {
                throw new Error('Missing required property "name"');
            }

            if (!args?.title) {
                throw new Error('Missing required property "title"');
            }

            if (!args?.trigger_time) {
                throw new Error('Missing required property "trigger_time"');
            }

            inputs['alert_type'] = args.alert_type;
            inputs['content'] = args.content;
            inputs['integration'] = output(args.integration as Output<IntegrationRef | Integration>).apply(integration =>
                integration instanceof Integration ? { hash_id: integration.hash_id } : integration
            );
            inputs['name'] = args.name;
            inputs['title'] = args.title;
            inputs['trigger_time'] = args.trigger_time;
            inputs['after_action_id'] = args.after_action_id;
            inputs['aggregation_key'] = args.aggregation_key;
            inputs['disabled'] = args.disabled;
            inputs['host'] = args.host;
            inputs['ignore_errors'] = args.ignore_errors;
            inputs['region'] = args.region;
            inputs['retry_count'] = args.retry_count;
            inputs['retry_interval'] = args.retry_interval;
            inputs['run_next_parallel'] = args.run_next_parallel;
            inputs['run_only_on_first_failure'] = args.run_only_on_first_failure;
            inputs['tags'] = args.tags;
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

        inputs['type'] = 'DATADOG';
        inputs['url'] = undefined;
        inputs['html_url'] = undefined;
        inputs['action_id'] = undefined;

        super(DatadogNotification.__pulumiType, name, inputs, opts);
    }
}
