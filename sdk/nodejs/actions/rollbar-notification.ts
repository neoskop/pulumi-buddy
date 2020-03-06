import { AsInputs } from '../utils';
import { PipelineProps } from '../pipeline';
import { CustomResource, Input, Output, ID, CustomResourceOptions, Inputs } from '@pulumi/pulumi';
import { IntegrationRef, Variable } from '../common';

export interface ActionRollbarNotificationState {
    project_name: string;
    pipeline_id: number;
    /**
     * The ID of the Rollbar application.
     */
    application_id: string;

    /**
     * The name of the application.
     */
    application_name: string;

    /**
     * The name of the environment being deployed.
     */
    environment: string;

    /**
     * The integration.
     */
    integration: IntegrationRef;

    /**
     * The name of the action.
     */
    name: string;

    /**
     * The post_server_item-scope project access token.
     */
    token: string;

    /**
     * The numerical ID of the action, after which this action should be added.
     */
    after_action_id?: number;

    /**
     * The additional text data to record with this deploy.
     */
    comment?: string;

    /**
     * When set to `true` the action is disabled.  By default it is set to `false`.
     */
    disabled?: boolean;

    /**
     * The Rollbar username of the user who deployed.
     */
    rollbar_username?: string;

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
     * The name of the project access token.
     */
    token_name?: string;

    /**
     * Defines when the build action should be run. Can be one of `ALWAYS`, `ON_CHANGE`, `ON_CHANGE_AT_PATH`, `VAR_IS`, `VAR_IS_NOT` or `VAR_CONTAINS` or `VAR_NOT_CONTAINS`. Can't be used in deployment actions.
     */
    trigger_condition?: 'ALWAYS' | 'ON_CHANGE' | 'ON_CHANGE_AT_PATH' | 'VAR_IS' | 'VAR_IS_NOT' | 'VAR_CONTAINS';

    /**
     * Required when `trigger_condition` is set to `ON_CHANGE_AT_PATH`.
     */
    trigger_condition_paths?: string[];

    /**
     * Specifies when the action should be executed. Can be one of `ON_EVERY_EXECUTION`, `ON_FAILURE` or `ON_BACK_TO_SUCCESS`. The default value is `ON_EVERY_EXECUTION`.
     */
    trigger_time?: 'ON_EVERY_EXECUTION' | 'ON_FAILURE' | 'ON_BACK_TO_SUCCESS';

    /**
     * Required when `trigger_condition` is set to `VAR_IS`, `VAR_IS_NOT` or `VAR_CONTAINS` or `VAR_NOT_CONTAINS`. Defines the name of the desired variable.
     */
    trigger_variable_key?: string;

    /**
     * Required when `trigger_condition` is set to `VAR_IS`, `VAR_IS_NOT` or `VAR_CONTAINS`. Defines the value of the desired variable which will be compared with its current value.
     */
    trigger_variable_value?: string;

    /**
     * The local Username who deployed.
     */
    user?: string;

    /**
     * The list of variables you can use the action.
     */
    variables?: Variable[];
}

export type ActionRollbarNotificationArgs = AsInputs<ActionRollbarNotificationState>;

export interface ActionRollbarNotificationProps {
    url: string;
    html_url: string;
    action_id: number;
    application_id: string;
    application_name: string;
    environment: string;
    integration: IntegrationRef;
    name: string;
    token: string;
    type: 'ROLLBAR';
    after_action_id?: number;
    comment?: string;
    disabled?: boolean;
    rollbar_username?: string;
    run_next_parallel?: boolean;
    run_only_on_first_failure?: boolean;
    timeout?: number;
    token_name?: string;
    trigger_condition?: 'ALWAYS' | 'ON_CHANGE' | 'ON_CHANGE_AT_PATH' | 'VAR_IS' | 'VAR_IS_NOT' | 'VAR_CONTAINS';
    trigger_condition_paths?: string[];
    trigger_time?: 'ON_EVERY_EXECUTION' | 'ON_FAILURE' | 'ON_BACK_TO_SUCCESS';
    trigger_variable_key?: string;
    trigger_variable_value?: string;
    user?: string;
    variables?: Variable[];
    pipeline: PipelineProps;
    project_name: string;
    pipeline_id: number;
}

/**
 * Required scopes in Buddy API: `WORKSPACE`, `EXECUTION_MANAGE`, `EXECUTION_INFO`
 */
export class RollbarNotification extends CustomResource {
    static __pulumiType = 'buddy:action:RollbarNotification';

    static get(name: string, id: Input<ID>, state?: Partial<ActionRollbarNotificationState>, opts?: CustomResourceOptions) {
        return new RollbarNotification(name, state as any, { ...opts, id });
    }

    static isInstance(obj: any): obj is RollbarNotification {
        if (null == obj) {
            return false;
        }

        return obj['__pulumiType'] === RollbarNotification.__pulumiType;
    }

    project_name!: Output<string>;
    pipeline_id!: Output<number>;
    action_id!: Output<number>;
    application_id!: Output<string>;
    application_name!: Output<string>;
    environment!: Output<string>;
    integration!: Output<IntegrationRef>;
    name!: Output<string>;
    token!: Output<string>;
    type!: Output<'ROLLBAR'>;
    after_action_id!: Output<number | undefined>;
    comment!: Output<string | undefined>;
    disabled!: Output<boolean | undefined>;
    rollbar_username!: Output<string | undefined>;
    run_next_parallel!: Output<boolean | undefined>;
    run_only_on_first_failure!: Output<boolean | undefined>;
    timeout!: Output<number | undefined>;
    token_name!: Output<string | undefined>;
    trigger_condition!: Output<'ALWAYS' | 'ON_CHANGE' | 'ON_CHANGE_AT_PATH' | 'VAR_IS' | 'VAR_IS_NOT' | 'VAR_CONTAINS' | undefined>;
    trigger_condition_paths!: Output<string[] | undefined>;
    trigger_time!: Output<'ON_EVERY_EXECUTION' | 'ON_FAILURE' | 'ON_BACK_TO_SUCCESS' | undefined>;
    trigger_variable_key!: Output<string | undefined>;
    trigger_variable_value!: Output<string | undefined>;
    user!: Output<string | undefined>;
    variables!: Output<Variable[] | undefined>;

    constructor(name: string, argsOrState: ActionRollbarNotificationArgs | ActionRollbarNotificationState, opts?: CustomResourceOptions) {
        const inputs: Inputs = {};
        if (!opts) {
            opts = {};
        }

        if (opts.id) {
            const state = argsOrState as ActionRollbarNotificationState | undefined;
            inputs['project_name'] = state?.project_name;
            inputs['pipeline_id'] = state?.pipeline_id;
            inputs['application_id'] = state?.application_id;
            inputs['application_name'] = state?.application_name;
            inputs['environment'] = state?.environment;
            inputs['integration'] = state?.integration;
            inputs['name'] = state?.name;
            inputs['token'] = state?.token;
            inputs['after_action_id'] = state?.after_action_id;
            inputs['comment'] = state?.comment;
            inputs['disabled'] = state?.disabled;
            inputs['rollbar_username'] = state?.rollbar_username;
            inputs['run_next_parallel'] = state?.run_next_parallel;
            inputs['run_only_on_first_failure'] = state?.run_only_on_first_failure;
            inputs['timeout'] = state?.timeout;
            inputs['token_name'] = state?.token_name;
            inputs['trigger_condition'] = state?.trigger_condition;
            inputs['trigger_condition_paths'] = state?.trigger_condition_paths;
            inputs['trigger_time'] = state?.trigger_time;
            inputs['trigger_variable_key'] = state?.trigger_variable_key;
            inputs['trigger_variable_value'] = state?.trigger_variable_value;
            inputs['user'] = state?.user;
            inputs['variables'] = state?.variables;
        } else {
            const args = argsOrState as ActionRollbarNotificationArgs | undefined;
            if (!args?.project_name) {
                throw new Error('Missing required property "project_name"');
            }

            if (!args?.pipeline_id) {
                throw new Error('Missing required property "pipeline_id"');
            }

            if (!args?.application_id) {
                throw new Error('Missing required property "application_id"');
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

            if (!args?.token) {
                throw new Error('Missing required property "token"');
            }

            inputs['application_id'] = args.application_id;
            inputs['application_name'] = args.application_name;
            inputs['environment'] = args.environment;
            inputs['integration'] = args.integration;
            inputs['name'] = args.name;
            inputs['token'] = args.token;
            inputs['after_action_id'] = args.after_action_id;
            inputs['comment'] = args.comment;
            inputs['disabled'] = args.disabled;
            inputs['rollbar_username'] = args.rollbar_username;
            inputs['run_next_parallel'] = args.run_next_parallel;
            inputs['run_only_on_first_failure'] = args.run_only_on_first_failure;
            inputs['timeout'] = args.timeout;
            inputs['token_name'] = args.token_name;
            inputs['trigger_condition'] = args.trigger_condition;
            inputs['trigger_condition_paths'] = args.trigger_condition_paths;
            inputs['trigger_time'] = args.trigger_time;
            inputs['trigger_variable_key'] = args.trigger_variable_key;
            inputs['trigger_variable_value'] = args.trigger_variable_value;
            inputs['user'] = args.user;
            inputs['variables'] = args.variables;
            inputs['project_name'] = args.project_name;
            inputs['pipeline_id'] = args.pipeline_id;
        }

        if (!opts.version) {
            opts.version = require('../package').version;
        }

        opts.ignoreChanges = ['project_name', 'pipeline_id', ...(opts.ignoreChanges || [])];

        inputs['type'] = 'ROLLBAR';
        inputs['url'] = undefined;
        inputs['html_url'] = undefined;
        inputs['action_id'] = undefined;

        super(RollbarNotification.__pulumiType, name, inputs, opts);
    }
}