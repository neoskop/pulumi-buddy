import { AsInputs } from '@pulumi-utils/sdk';
import { PipelineProps } from '../pipeline';
import { CustomResource, Input, Output, ID, CustomResourceOptions, Inputs, output } from '@pulumi/pulumi';
import { IntegrationRef, TriggerCondition, Variable } from '../common';
import { Integration } from '../integration';

export interface ElasticBeanstalkMonitorState {
    project_name: string;
    pipeline_id: number;
    /**
     * The name of the application.
     */
    application_name: string;

    /**
     * The Amazon S3 environment.
     */
    environment: string;

    /**
     * The integration.
     */
    integration: IntegrationRef | Integration;

    /**
     * The name of the action.
     */
    name: string;

    /**
     * The name of the Amazon S3 region. The full list of regions is available here.
     */
    region: string;

    /**
     * When set to `true` the action is disabled.  By default it is set to `false`.
     */
    disabled?: boolean;

    /**
     * Defines whether or not the action should be marked as failed when Amazon returns ‘yellow’ health status.
     */
    fail_on_yellow?: boolean;

    /**
     * If set to `true` the execution will proceed, mark action as a warning and jump to the next action. Doesn't apply to deployment actions.
     */
    ignore_errors?: boolean;

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

    /**
     * Defines whether or not to show verbose logs.
     */
    verbose?: boolean;
}

export type ElasticBeanstalkMonitorArgs = AsInputs<ElasticBeanstalkMonitorState>;

export interface ElasticBeanstalkMonitorProps {
    url: string;
    html_url: string;
    action_id: number;
    application_name: string;
    environment: string;
    integration: IntegrationRef | Integration;
    name: string;
    region: string;
    type: 'MONITOR';
    disabled?: boolean;
    fail_on_yellow?: boolean;
    ignore_errors?: boolean;
    retry_count?: number;
    retry_delay?: number;
    run_next_parallel?: boolean;
    run_only_on_first_failure?: boolean;
    timeout?: number;
    trigger_conditions?: TriggerCondition[];
    variables?: Variable[];
    verbose?: boolean;
    pipeline: PipelineProps;
    project_name: string;
    pipeline_id: number;
}

/**
 * Required scopes in Buddy API: `WORKSPACE`, `EXECUTION_MANAGE`, `EXECUTION_INFO`
 */
export class ElasticBeanstalkMonitor extends CustomResource {
    static __pulumiType = 'buddy:action:ElasticBeanstalkMonitor';

    static get(name: string, id: Input<ID>, state?: Partial<ElasticBeanstalkMonitorState>, opts?: CustomResourceOptions) {
        return new ElasticBeanstalkMonitor(name, state as any, { ...opts, id });
    }

    static isInstance(obj: any): obj is ElasticBeanstalkMonitor {
        if (null == obj) {
            return false;
        }

        return obj['__pulumiType'] === ElasticBeanstalkMonitor.__pulumiType;
    }

    project_name!: Output<string>;
    pipeline_id!: Output<number>;
    action_id!: Output<number>;
    application_name!: Output<string>;
    environment!: Output<string>;
    integration!: Output<IntegrationRef | Integration>;
    name!: Output<string>;
    region!: Output<string>;
    type!: Output<'MONITOR'>;
    disabled!: Output<boolean | undefined>;
    fail_on_yellow!: Output<boolean | undefined>;
    ignore_errors!: Output<boolean | undefined>;
    retry_count!: Output<number | undefined>;
    retry_delay!: Output<number | undefined>;
    run_next_parallel!: Output<boolean | undefined>;
    run_only_on_first_failure!: Output<boolean | undefined>;
    timeout!: Output<number | undefined>;
    trigger_conditions!: Output<TriggerCondition[] | undefined>;
    variables!: Output<Variable[] | undefined>;
    verbose!: Output<boolean | undefined>;

    constructor(name: string, argsOrState: ElasticBeanstalkMonitorArgs | ElasticBeanstalkMonitorState, opts?: CustomResourceOptions) {
        const inputs: Inputs = {};
        if (!opts) {
            opts = {};
        }

        if (opts.id) {
            const state = argsOrState as ElasticBeanstalkMonitorState | undefined;
            inputs['project_name'] = state?.project_name;
            inputs['pipeline_id'] = state?.pipeline_id;
            inputs['application_name'] = state?.application_name;
            inputs['environment'] = state?.environment;
            inputs['integration'] = state?.integration instanceof Integration ? { hash_id: state.integration.hash_id } : state?.integration;
            inputs['name'] = state?.name;
            inputs['region'] = state?.region;
            inputs['disabled'] = state?.disabled;
            inputs['fail_on_yellow'] = state?.fail_on_yellow;
            inputs['ignore_errors'] = state?.ignore_errors;
            inputs['retry_count'] = state?.retry_count;
            inputs['retry_delay'] = state?.retry_delay;
            inputs['run_next_parallel'] = state?.run_next_parallel;
            inputs['run_only_on_first_failure'] = state?.run_only_on_first_failure;
            inputs['timeout'] = state?.timeout;
            inputs['trigger_conditions'] = state?.trigger_conditions;
            inputs['variables'] = state?.variables;
            inputs['verbose'] = state?.verbose;
        } else {
            const args = argsOrState as ElasticBeanstalkMonitorArgs | undefined;
            if (!args?.project_name) {
                throw new Error('Missing required property "project_name"');
            }

            if (!args?.pipeline_id) {
                throw new Error('Missing required property "pipeline_id"');
            }

            if (!args?.application_name) {
                throw new Error('Missing required property "application_name"');
            }

            if (!args?.environment) {
                throw new Error('Missing required property "environment"');
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

            inputs['application_name'] = args.application_name;
            inputs['environment'] = args.environment;
            inputs['integration'] = output(args.integration as Output<IntegrationRef | Integration>).apply(integration =>
                integration instanceof Integration ? { hash_id: integration.hash_id } : integration
            );
            inputs['name'] = args.name;
            inputs['region'] = args.region;
            inputs['disabled'] = args.disabled;
            inputs['fail_on_yellow'] = args.fail_on_yellow;
            inputs['ignore_errors'] = args.ignore_errors;
            inputs['retry_count'] = args.retry_count;
            inputs['retry_delay'] = args.retry_delay;
            inputs['run_next_parallel'] = args.run_next_parallel;
            inputs['run_only_on_first_failure'] = args.run_only_on_first_failure;
            inputs['timeout'] = args.timeout;
            inputs['trigger_conditions'] = args.trigger_conditions;
            inputs['variables'] = args.variables;
            inputs['verbose'] = args.verbose;
            inputs['project_name'] = args.project_name;
            inputs['pipeline_id'] = args.pipeline_id;
        }

        if (!opts.version) {
            opts.version = require('../package').version;
        }

        opts.ignoreChanges = ['project_name', 'pipeline_id', ...(opts.ignoreChanges || [])];

        inputs['type'] = 'MONITOR';
        inputs['url'] = undefined;
        inputs['html_url'] = undefined;
        inputs['action_id'] = undefined;

        super(ElasticBeanstalkMonitor.__pulumiType, name, inputs, opts);
    }
}
