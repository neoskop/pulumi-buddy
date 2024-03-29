import { AsInputs } from '@pulumi-utils/sdk';
import { PipelineProps } from '../pipeline';
import { CustomResource, Input, Output, ID, CustomResourceOptions, Inputs, output } from '@pulumi/pulumi';
import { IntegrationRef, TriggerCondition, Variable } from '../common';
import { Integration } from '../integration';

export interface CodeDeployState {
    project_name: string;
    pipeline_id: number;
    /**
     * The name of the application.
     */
    application_name: string;

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
     * Specifies when the action should be executed. Can be one of `ON_EVERY_EXECUTION`, `ON_FAILURE` or `ON_BACK_TO_SUCCESS`. The default value is `ON_EVERY_EXECUTION`.
     */
    trigger_time: 'ON_EVERY_EXECUTION' | 'ON_FAILURE' | 'ON_BACK_TO_SUCCESS';

    /**
     * The numerical ID of the action, after which this action should be added.
     */
    after_action_id?: number;

    /**
     * The name of the CodeDeploy configuration.
     */
    config_name?: string;

    /**
     * The paths and/or files that will be left out during the deployment.
     */
    deployment_excludes?: string[];

    /**
     * The exceptions from the ignore patterns set in `deployment_excludes`.
     */
    deployment_includes?: string[];

    /**
     * The comment about the deployment.
     */
    description?: string;

    /**
     * When set to 'true' the action is disabled.  By default it is set to 'false'.
     */
    disabled?: boolean;

    /**
     * Information about how AWS CodeDeploy handles files that already exist in a deployment target location but weren't part of the previous successful deployment. Can be one of `DISALLOW`, `OVERWRITE`, `RETAIN`. See here.
     */
    file_exist_behavior?: string;

    /**
     * The Amazon S3 group name.
     */
    group_name?: string;

    /**
     * See here.
     */
    ignore_application_stop_failures?: boolean;

    /**
     * If set to 'true' the execution will proceed, mark action as a warning and jump to the next action. Doesn't apply to deployment actions.
     */
    ignore_errors?: boolean;

    /**
     * The path in the repository.
     */
    local_path?: string;

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
     * The timeout in seconds.
     */
    timeout?: number;

    /**
     * The list of trigger conditions to meet so that the action can be triggered.
     */
    trigger_conditions?: TriggerCondition[];

    /**
     * See here.
     */
    update_outdated_instances_only?: boolean;

    /**
     * The list of variables you can use the action.
     */
    variables?: Variable[];

    /**
     * Defines whether to wait for the finish of the deployment in Amazon Code Deploy.
     */
    wait_for_finish_deployment?: boolean;
}

export type CodeDeployArgs = AsInputs<CodeDeployState>;

export interface CodeDeployProps {
    url: string;
    html_url: string;
    action_id: number;
    application_name: string;
    integration: IntegrationRef | Integration;
    name: string;
    region: string;
    trigger_time: 'ON_EVERY_EXECUTION' | 'ON_FAILURE' | 'ON_BACK_TO_SUCCESS';
    type: 'CODE_DEPLOY';
    after_action_id?: number;
    config_name?: string;
    deployment_excludes?: string[];
    deployment_includes?: string[];
    description?: string;
    disabled?: boolean;
    file_exist_behavior?: string;
    group_name?: string;
    ignore_application_stop_failures?: boolean;
    ignore_errors?: boolean;
    local_path?: string;
    retry_count?: number;
    retry_interval?: number;
    run_next_parallel?: boolean;
    run_only_on_first_failure?: boolean;
    timeout?: number;
    trigger_conditions?: TriggerCondition[];
    update_outdated_instances_only?: boolean;
    variables?: Variable[];
    wait_for_finish_deployment?: boolean;
    pipeline: PipelineProps;
    project_name: string;
    pipeline_id: number;
}

/**
 * Required scopes in Buddy API: `WORKSPACE`, `EXECUTION_MANAGE`, `EXECUTION_INFO`
 */
export class CodeDeploy extends CustomResource {
    static __pulumiType = 'buddy:action:CodeDeploy';

    static get(name: string, id: Input<ID>, state?: Partial<CodeDeployState>, opts?: CustomResourceOptions) {
        return new CodeDeploy(name, state as any, { ...opts, id });
    }

    static isInstance(obj: any): obj is CodeDeploy {
        if (null == obj) {
            return false;
        }

        return obj['__pulumiType'] === CodeDeploy.__pulumiType;
    }

    project_name!: Output<string>;
    pipeline_id!: Output<number>;
    action_id!: Output<number>;
    application_name!: Output<string>;
    integration!: Output<IntegrationRef | Integration>;
    name!: Output<string>;
    region!: Output<string>;
    trigger_time!: Output<'ON_EVERY_EXECUTION' | 'ON_FAILURE' | 'ON_BACK_TO_SUCCESS'>;
    type!: Output<'CODE_DEPLOY'>;
    after_action_id!: Output<number | undefined>;
    config_name!: Output<string | undefined>;
    deployment_excludes!: Output<string[] | undefined>;
    deployment_includes!: Output<string[] | undefined>;
    description!: Output<string | undefined>;
    disabled!: Output<boolean | undefined>;
    file_exist_behavior!: Output<string | undefined>;
    group_name!: Output<string | undefined>;
    ignore_application_stop_failures!: Output<boolean | undefined>;
    ignore_errors!: Output<boolean | undefined>;
    local_path!: Output<string | undefined>;
    retry_count!: Output<number | undefined>;
    retry_interval!: Output<number | undefined>;
    run_next_parallel!: Output<boolean | undefined>;
    run_only_on_first_failure!: Output<boolean | undefined>;
    timeout!: Output<number | undefined>;
    trigger_conditions!: Output<TriggerCondition[] | undefined>;
    update_outdated_instances_only!: Output<boolean | undefined>;
    variables!: Output<Variable[] | undefined>;
    wait_for_finish_deployment!: Output<boolean | undefined>;

    constructor(name: string, argsOrState: CodeDeployArgs | CodeDeployState, opts?: CustomResourceOptions) {
        const inputs: Inputs = {};
        if (!opts) {
            opts = {};
        }

        if (opts.id) {
            const state = argsOrState as CodeDeployState | undefined;
            inputs['project_name'] = state?.project_name;
            inputs['pipeline_id'] = state?.pipeline_id;
            inputs['application_name'] = state?.application_name;
            inputs['integration'] = state?.integration instanceof Integration ? { hash_id: state.integration.hash_id } : state?.integration;
            inputs['name'] = state?.name;
            inputs['region'] = state?.region;
            inputs['trigger_time'] = state?.trigger_time;
            inputs['after_action_id'] = state?.after_action_id;
            inputs['config_name'] = state?.config_name;
            inputs['deployment_excludes'] = state?.deployment_excludes;
            inputs['deployment_includes'] = state?.deployment_includes;
            inputs['description'] = state?.description;
            inputs['disabled'] = state?.disabled;
            inputs['file_exist_behavior'] = state?.file_exist_behavior;
            inputs['group_name'] = state?.group_name;
            inputs['ignore_application_stop_failures'] = state?.ignore_application_stop_failures;
            inputs['ignore_errors'] = state?.ignore_errors;
            inputs['local_path'] = state?.local_path;
            inputs['retry_count'] = state?.retry_count;
            inputs['retry_interval'] = state?.retry_interval;
            inputs['run_next_parallel'] = state?.run_next_parallel;
            inputs['run_only_on_first_failure'] = state?.run_only_on_first_failure;
            inputs['timeout'] = state?.timeout;
            inputs['trigger_conditions'] = state?.trigger_conditions;
            inputs['update_outdated_instances_only'] = state?.update_outdated_instances_only;
            inputs['variables'] = state?.variables;
            inputs['wait_for_finish_deployment'] = state?.wait_for_finish_deployment;
        } else {
            const args = argsOrState as CodeDeployArgs | undefined;
            if (!args?.project_name) {
                throw new Error('Missing required property "project_name"');
            }

            if (!args?.pipeline_id) {
                throw new Error('Missing required property "pipeline_id"');
            }

            if (!args?.application_name) {
                throw new Error('Missing required property "application_name"');
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

            inputs['application_name'] = args.application_name;
            inputs['integration'] = output(args.integration as Output<IntegrationRef | Integration>).apply(integration =>
                integration instanceof Integration ? { hash_id: integration.hash_id } : integration
            );
            inputs['name'] = args.name;
            inputs['region'] = args.region;
            inputs['trigger_time'] = args.trigger_time;
            inputs['after_action_id'] = args.after_action_id;
            inputs['config_name'] = args.config_name;
            inputs['deployment_excludes'] = args.deployment_excludes;
            inputs['deployment_includes'] = args.deployment_includes;
            inputs['description'] = args.description;
            inputs['disabled'] = args.disabled;
            inputs['file_exist_behavior'] = args.file_exist_behavior;
            inputs['group_name'] = args.group_name;
            inputs['ignore_application_stop_failures'] = args.ignore_application_stop_failures;
            inputs['ignore_errors'] = args.ignore_errors;
            inputs['local_path'] = args.local_path;
            inputs['retry_count'] = args.retry_count;
            inputs['retry_interval'] = args.retry_interval;
            inputs['run_next_parallel'] = args.run_next_parallel;
            inputs['run_only_on_first_failure'] = args.run_only_on_first_failure;
            inputs['timeout'] = args.timeout;
            inputs['trigger_conditions'] = args.trigger_conditions;
            inputs['update_outdated_instances_only'] = args.update_outdated_instances_only;
            inputs['variables'] = args.variables;
            inputs['wait_for_finish_deployment'] = args.wait_for_finish_deployment;
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

        inputs['type'] = 'CODE_DEPLOY';
        inputs['url'] = undefined;
        inputs['html_url'] = undefined;
        inputs['action_id'] = undefined;

        super(CodeDeploy.__pulumiType, name, inputs, opts);
    }
}
