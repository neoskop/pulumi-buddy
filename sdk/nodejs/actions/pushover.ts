import { AsInputs } from '@pulumi-utils/sdk';
import { PipelineProps } from '../pipeline';
import { CustomResource, Input, Output, ID, CustomResourceOptions, Inputs, output } from '@pulumi/pulumi';
import { IntegrationRef, TriggerCondition, Variable } from '../common';
import { Integration } from '../integration';

export interface PushoverState {
    project_name: string;
    pipeline_id: number;
    /**
     * The content of the notification.
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
     * Specifies when the action should be executed. Can be one of `ON_EVERY_EXECUTION`, `ON_FAILURE` or `ON_BACK_TO_SUCCESS`. The default value is `ON_EVERY_EXECUTION`.
     */
    trigger_time: 'ON_EVERY_EXECUTION' | 'ON_FAILURE' | 'ON_BACK_TO_SUCCESS';

    /**
     * The numerical ID of the action, after which this action should be added.
     */
    after_action_id?: number;

    /**
     * The name of the device to whick notification will be sent.
     */
    device?: string;

    /**
     * When set to `true` the action is disabled.  By default it is set to `false`.
     */
    disabled?: boolean;

    /**
     * If set to `true` the execution will proceed, mark action as a warning and jump to the next action. Doesn't apply to deployment actions.
     */
    ignore_errors?: boolean;

    /**
     * The link of the notification.
     */
    link?: string;

    /**
     * The title of the notification link.
     */
    link_title?: string;

    /**
     * Specifies the priority of the notification. Can be one of `LOW`, `NORMAL` or `HIGH`.
     */
    priority?: 'LOW' | 'NORMAL' | 'HIGH';

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
     * The timeout in seconds.
     */
    timeout?: number;

    /**
     * The title of the notification.
     */
    title?: string;

    /**
     * The list of trigger conditions to meet so that the action can be triggered.
     */
    trigger_conditions?: TriggerCondition[];

    /**
     * The list of variables you can use the action.
     */
    variables: Variable[];
}

export type PushoverArgs = AsInputs<PushoverState>;

export interface PushoverProps {
    url: string;
    html_url: string;
    action_id: number;
    content: string;
    integration: IntegrationRef | Integration;
    name: string;
    trigger_time: 'ON_EVERY_EXECUTION' | 'ON_FAILURE' | 'ON_BACK_TO_SUCCESS';
    type: 'PUSHOVER';
    after_action_id?: number;
    device?: string;
    disabled?: boolean;
    ignore_errors?: boolean;
    link?: string;
    link_title?: string;
    priority?: 'LOW' | 'NORMAL' | 'HIGH';
    retry_count?: number;
    retry_interval?: number;
    run_next_parallel?: boolean;
    run_only_on_first_failure?: boolean;
    timeout?: number;
    title?: string;
    trigger_conditions?: TriggerCondition[];
    variables: Variable[];
    pipeline: PipelineProps;
    project_name: string;
    pipeline_id: number;
}

/**
 * Required scopes in Buddy API: `WORKSPACE`, `EXECUTION_MANAGE`, `EXECUTION_INFO`
 */
export class Pushover extends CustomResource {
    static __pulumiType = 'buddy:action:Pushover';

    static get(name: string, id: Input<ID>, state?: Partial<PushoverState>, opts?: CustomResourceOptions) {
        return new Pushover(name, state as any, { ...opts, id });
    }

    static isInstance(obj: any): obj is Pushover {
        if (null == obj) {
            return false;
        }

        return obj['__pulumiType'] === Pushover.__pulumiType;
    }

    project_name!: Output<string>;
    pipeline_id!: Output<number>;
    action_id!: Output<number>;
    content!: Output<string>;
    integration!: Output<IntegrationRef | Integration>;
    name!: Output<string>;
    trigger_time!: Output<'ON_EVERY_EXECUTION' | 'ON_FAILURE' | 'ON_BACK_TO_SUCCESS'>;
    type!: Output<'PUSHOVER'>;
    after_action_id!: Output<number | undefined>;
    device!: Output<string | undefined>;
    disabled!: Output<boolean | undefined>;
    ignore_errors!: Output<boolean | undefined>;
    link!: Output<string | undefined>;
    link_title!: Output<string | undefined>;
    priority!: Output<'LOW' | 'NORMAL' | 'HIGH' | undefined>;
    retry_count!: Output<number | undefined>;
    retry_interval!: Output<number | undefined>;
    run_next_parallel!: Output<boolean | undefined>;
    run_only_on_first_failure!: Output<boolean | undefined>;
    timeout!: Output<number | undefined>;
    title!: Output<string | undefined>;
    trigger_conditions!: Output<TriggerCondition[] | undefined>;
    variables!: Output<Variable[]>;

    constructor(name: string, argsOrState: PushoverArgs | PushoverState, opts?: CustomResourceOptions) {
        const inputs: Inputs = {};
        if (!opts) {
            opts = {};
        }

        if (opts.id) {
            const state = argsOrState as PushoverState | undefined;
            inputs['project_name'] = state?.project_name;
            inputs['pipeline_id'] = state?.pipeline_id;
            inputs['content'] = state?.content;
            inputs['integration'] = state?.integration instanceof Integration ? { hash_id: state.integration.hash_id } : state?.integration;
            inputs['name'] = state?.name;
            inputs['trigger_time'] = state?.trigger_time;
            inputs['after_action_id'] = state?.after_action_id;
            inputs['device'] = state?.device;
            inputs['disabled'] = state?.disabled;
            inputs['ignore_errors'] = state?.ignore_errors;
            inputs['link'] = state?.link;
            inputs['link_title'] = state?.link_title;
            inputs['priority'] = state?.priority;
            inputs['retry_count'] = state?.retry_count;
            inputs['retry_interval'] = state?.retry_interval;
            inputs['run_next_parallel'] = state?.run_next_parallel;
            inputs['run_only_on_first_failure'] = state?.run_only_on_first_failure;
            inputs['timeout'] = state?.timeout;
            inputs['title'] = state?.title;
            inputs['trigger_conditions'] = state?.trigger_conditions;
            inputs['variables'] = state?.variables;
        } else {
            const args = argsOrState as PushoverArgs | undefined;
            if (!args?.project_name) {
                throw new Error('Missing required property "project_name"');
            }

            if (!args?.pipeline_id) {
                throw new Error('Missing required property "pipeline_id"');
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

            if (!args?.trigger_time) {
                throw new Error('Missing required property "trigger_time"');
            }

            if (!args?.variables) {
                throw new Error('Missing required property "variables"');
            }

            inputs['content'] = args.content;
            inputs['integration'] = output(args.integration as Output<IntegrationRef | Integration>).apply(integration =>
                integration instanceof Integration ? { hash_id: integration.hash_id } : integration
            );
            inputs['name'] = args.name;
            inputs['trigger_time'] = args.trigger_time;
            inputs['after_action_id'] = args.after_action_id;
            inputs['device'] = args.device;
            inputs['disabled'] = args.disabled;
            inputs['ignore_errors'] = args.ignore_errors;
            inputs['link'] = args.link;
            inputs['link_title'] = args.link_title;
            inputs['priority'] = args.priority;
            inputs['retry_count'] = args.retry_count;
            inputs['retry_interval'] = args.retry_interval;
            inputs['run_next_parallel'] = args.run_next_parallel;
            inputs['run_only_on_first_failure'] = args.run_only_on_first_failure;
            inputs['timeout'] = args.timeout;
            inputs['title'] = args.title;
            inputs['trigger_conditions'] = args.trigger_conditions;
            inputs['variables'] = args.variables;
            inputs['project_name'] = args.project_name;
            inputs['pipeline_id'] = args.pipeline_id;
        }

        if (!opts.version) {
            opts.version = require('../package').version;
        }

        opts.ignoreChanges = ['project_name', 'pipeline_id', ...(opts.ignoreChanges || [])];

        inputs['type'] = 'PUSHOVER';
        inputs['url'] = undefined;
        inputs['html_url'] = undefined;
        inputs['action_id'] = undefined;

        super(Pushover.__pulumiType, name, inputs, opts);
    }
}
