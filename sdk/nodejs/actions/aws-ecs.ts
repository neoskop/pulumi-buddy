import { AsInputs } from '@pulumi-utils/sdk';
import { PipelineProps } from '../pipeline';
import { CustomResource, Input, Output, ID, CustomResourceOptions, Inputs, output } from '@pulumi/pulumi';
import { IntegrationRef, TriggerCondition, Variable } from '../common';
import { Integration } from '../integration';

export interface AWSECSState {
    project_name: string;
    pipeline_id: number;
    /**
     * The paths and/or files that will be left out during the deployment.
     */
    cluster: string;

    /**
     * The integration.
     */
    integration: IntegrationRef | Integration;

    /**
     * The path to the JSON file with task definition.
     */
    local_path: string;

    /**
     * The name of the action.
     */
    name: string;

    /**
     * The Amazon region.
     */
    region: string;

    /**
     * The ID of the ECS service.
     */
    service: string;

    /**
     * When set to `true` the action is disabled.  By default it is set to `false`.
     */
    disabled?: boolean;

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
}

export type AWSECSArgs = AsInputs<AWSECSState>;

export interface AWSECSProps {
    url: string;
    html_url: string;
    action_id: number;
    cluster: string;
    integration: IntegrationRef | Integration;
    local_path: string;
    name: string;
    region: string;
    service: string;
    type: 'AWS_ECS';
    disabled?: boolean;
    ignore_errors?: boolean;
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
export class AWSECS extends CustomResource {
    static __pulumiType = 'buddy:action:AWSECS';

    static get(name: string, id: Input<ID>, state?: Partial<AWSECSState>, opts?: CustomResourceOptions) {
        return new AWSECS(name, state as any, { ...opts, id });
    }

    static isInstance(obj: any): obj is AWSECS {
        if (null == obj) {
            return false;
        }

        return obj['__pulumiType'] === AWSECS.__pulumiType;
    }

    project_name!: Output<string>;
    pipeline_id!: Output<number>;
    action_id!: Output<number>;
    cluster!: Output<string>;
    integration!: Output<IntegrationRef | Integration>;
    local_path!: Output<string>;
    name!: Output<string>;
    region!: Output<string>;
    service!: Output<string>;
    type!: Output<'AWS_ECS'>;
    disabled!: Output<boolean | undefined>;
    ignore_errors!: Output<boolean | undefined>;
    retry_count!: Output<number | undefined>;
    retry_delay!: Output<number | undefined>;
    run_next_parallel!: Output<boolean | undefined>;
    run_only_on_first_failure!: Output<boolean | undefined>;
    timeout!: Output<number | undefined>;
    trigger_conditions!: Output<TriggerCondition[] | undefined>;
    variables!: Output<Variable[] | undefined>;

    constructor(name: string, argsOrState: AWSECSArgs | AWSECSState, opts?: CustomResourceOptions) {
        const inputs: Inputs = {};
        if (!opts) {
            opts = {};
        }

        if (opts.id) {
            const state = argsOrState as AWSECSState | undefined;
            inputs['project_name'] = state?.project_name;
            inputs['pipeline_id'] = state?.pipeline_id;
            inputs['cluster'] = state?.cluster;
            inputs['integration'] = state?.integration instanceof Integration ? { hash_id: state.integration.hash_id } : state?.integration;
            inputs['local_path'] = state?.local_path;
            inputs['name'] = state?.name;
            inputs['region'] = state?.region;
            inputs['service'] = state?.service;
            inputs['disabled'] = state?.disabled;
            inputs['ignore_errors'] = state?.ignore_errors;
            inputs['retry_count'] = state?.retry_count;
            inputs['retry_delay'] = state?.retry_delay;
            inputs['run_next_parallel'] = state?.run_next_parallel;
            inputs['run_only_on_first_failure'] = state?.run_only_on_first_failure;
            inputs['timeout'] = state?.timeout;
            inputs['trigger_conditions'] = state?.trigger_conditions;
            inputs['variables'] = state?.variables;
        } else {
            const args = argsOrState as AWSECSArgs | undefined;
            if (!args?.project_name) {
                throw new Error('Missing required property "project_name"');
            }

            if (!args?.pipeline_id) {
                throw new Error('Missing required property "pipeline_id"');
            }

            if (!args?.cluster) {
                throw new Error('Missing required property "cluster"');
            }

            if (!args?.integration) {
                throw new Error('Missing required property "integration"');
            }

            if (!args?.local_path) {
                throw new Error('Missing required property "local_path"');
            }

            if (!args?.name) {
                throw new Error('Missing required property "name"');
            }

            if (!args?.region) {
                throw new Error('Missing required property "region"');
            }

            if (!args?.service) {
                throw new Error('Missing required property "service"');
            }

            inputs['cluster'] = args.cluster;
            inputs['integration'] = output(args.integration as Output<IntegrationRef | Integration>).apply(integration =>
                integration instanceof Integration ? { hash_id: integration.hash_id } : integration
            );
            inputs['local_path'] = args.local_path;
            inputs['name'] = args.name;
            inputs['region'] = args.region;
            inputs['service'] = args.service;
            inputs['disabled'] = args.disabled;
            inputs['ignore_errors'] = args.ignore_errors;
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

        inputs['type'] = 'AWS_ECS';
        inputs['url'] = undefined;
        inputs['html_url'] = undefined;
        inputs['action_id'] = undefined;

        super(AWSECS.__pulumiType, name, inputs, opts);
    }
}
