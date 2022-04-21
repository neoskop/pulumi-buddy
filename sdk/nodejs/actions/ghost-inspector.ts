import { AsInputs } from '@pulumi-utils/sdk';
import { PipelineProps } from '../pipeline';
import { CustomResource, Input, Output, ID, CustomResourceOptions, Inputs, output } from '@pulumi/pulumi';
import { IntegrationRef, TriggerCondition, Variable } from '../common';
import { Integration } from '../integration';

export interface GhostInspectorState {
    project_name: string;
    pipeline_id: number;
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
     * Alternate browser to use for this execution. The following options are available: `firefox` (default), `firefox-` specific version of Firefox, for example `firefox-57`, `chrome` (paid plans only), `phantomjs`.
     */
    browser?: string;

    /**
     * Specify the Slack channel to notify for this suite run. Note that the value must be `myChannel` or `%23myChannel` and not `#myChannel`.
     */
    channel?: string;

    /**
     * A CSV file containing a row of variable values for each suite run. A POST request must be used when sending this file. When included, an array of suite results will be returned instead of an array of test result.
     */
    data_file?: string;

    /**
     * Use to disable all notifications for this execution only.
     */
    disable_notifications?: boolean;

    /**
     * When set to `true` the action is disabled.  By default it is set to `false`.
     */
    disabled?: boolean;

    /**
     * The ID of the folder to execute.
     */
    folder_id?: string;

    /**
     * If set to `true` the execution will proceed, mark action as a warning and jump to the next action. Doesn't apply to deployment actions.
     */
    ignore_errors?: boolean;

    /**
     * Use to initiate the execution, then immediate return a response (without results).
     */
    immediate?: boolean;

    /**
     * The password to associate with the event.
     */
    password?: string;

    /**
     * Geo-location for test execution. The following options are available: `us-east-1`, `us-west-1`, `ca-central-1`, `eu-central-1`, `eu-west-1`, `eu-west-2`, `eu-west-3`, `eu-north-1`, `ap-northeast-1`, `ap-northeast-2`, `ap-southeast-1`, `ap-southeast-2`, `ap-south-1`, `sa-east-1`.
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
     * When set to `true`, the subsequent action defined in the pipeline will run in parallel to the current action.
     */
    run_next_parallel?: boolean;

    /**
     * Defines whether the action should be executed on each failure. Restricted to and required if the `trigger_time` is `ON_FAILURE`.
     */
    run_only_on_first_failure?: boolean;

    /**
     * Alternate start URL to use for all tests in this execution only.
     */
    start_url?: string;

    /**
     * The ID of the suite to execute.
     */
    suite_id?: string;

    /**
     * The name of the suite to execute.
     */
    suite_name?: string;

    /**
     * The timeout in seconds.
     */
    timeout?: number;

    /**
     * The list of trigger conditions to meet so that the action can be triggered.
     */
    trigger_conditions?: TriggerCondition[];

    /**
     * The name to associate with the event.
     */
    user?: string;

    /**
     * Alternate user agent to use for all tests in this execution only.
     */
    user_agent?: string;

    /**
     * The list of variables you can use the action.
     */
    variables: Variable[];

    /**
     * Alternate screen size to use for all tests in this execution only. This should be a string formatted as `{width}x{height}`, for example `1024x768`.
     */
    viewport?: string;
}

export type GhostInspectorArgs = AsInputs<GhostInspectorState>;

export interface GhostInspectorProps {
    url: string;
    html_url: string;
    action_id: number;
    integration: IntegrationRef | Integration;
    name: string;
    trigger_time: 'ON_EVERY_EXECUTION' | 'ON_FAILURE' | 'ON_BACK_TO_SUCCESS';
    type: 'GHOST_INSPECTOR';
    after_action_id?: number;
    browser?: string;
    channel?: string;
    data_file?: string;
    disable_notifications?: boolean;
    disabled?: boolean;
    folder_id?: string;
    ignore_errors?: boolean;
    immediate?: boolean;
    password?: string;
    region?: string;
    retry_count?: number;
    retry_interval?: number;
    run_next_parallel?: boolean;
    run_only_on_first_failure?: boolean;
    start_url?: string;
    suite_id?: string;
    suite_name?: string;
    timeout?: number;
    trigger_conditions?: TriggerCondition[];
    user?: string;
    user_agent?: string;
    variables: Variable[];
    viewport?: string;
    pipeline: PipelineProps;
    project_name: string;
    pipeline_id: number;
}

/**
 * Required scopes in Buddy API: `WORKSPACE`, `EXECUTION_MANAGE`, `EXECUTION_INFO`
 */
export class GhostInspector extends CustomResource {
    static __pulumiType = 'buddy:action:GhostInspector';

    static get(name: string, id: Input<ID>, state?: Partial<GhostInspectorState>, opts?: CustomResourceOptions) {
        return new GhostInspector(name, state as any, { ...opts, id });
    }

    static isInstance(obj: any): obj is GhostInspector {
        if (null == obj) {
            return false;
        }

        return obj['__pulumiType'] === GhostInspector.__pulumiType;
    }

    project_name!: Output<string>;
    pipeline_id!: Output<number>;
    action_id!: Output<number>;
    integration!: Output<IntegrationRef | Integration>;
    name!: Output<string>;
    trigger_time!: Output<'ON_EVERY_EXECUTION' | 'ON_FAILURE' | 'ON_BACK_TO_SUCCESS'>;
    type!: Output<'GHOST_INSPECTOR'>;
    after_action_id!: Output<number | undefined>;
    browser!: Output<string | undefined>;
    channel!: Output<string | undefined>;
    data_file!: Output<string | undefined>;
    disable_notifications!: Output<boolean | undefined>;
    disabled!: Output<boolean | undefined>;
    folder_id!: Output<string | undefined>;
    ignore_errors!: Output<boolean | undefined>;
    immediate!: Output<boolean | undefined>;
    password!: Output<string | undefined>;
    region!: Output<string | undefined>;
    retry_count!: Output<number | undefined>;
    retry_interval!: Output<number | undefined>;
    run_next_parallel!: Output<boolean | undefined>;
    run_only_on_first_failure!: Output<boolean | undefined>;
    start_url!: Output<string | undefined>;
    suite_id!: Output<string | undefined>;
    suite_name!: Output<string | undefined>;
    timeout!: Output<number | undefined>;
    trigger_conditions!: Output<TriggerCondition[] | undefined>;
    user!: Output<string | undefined>;
    user_agent!: Output<string | undefined>;
    variables!: Output<Variable[]>;
    viewport!: Output<string | undefined>;

    constructor(name: string, argsOrState: GhostInspectorArgs | GhostInspectorState, opts?: CustomResourceOptions) {
        const inputs: Inputs = {};
        if (!opts) {
            opts = {};
        }

        if (opts.id) {
            const state = argsOrState as GhostInspectorState | undefined;
            inputs['project_name'] = state?.project_name;
            inputs['pipeline_id'] = state?.pipeline_id;
            inputs['integration'] = state?.integration instanceof Integration ? { hash_id: state.integration.hash_id } : state?.integration;
            inputs['name'] = state?.name;
            inputs['trigger_time'] = state?.trigger_time;
            inputs['after_action_id'] = state?.after_action_id;
            inputs['browser'] = state?.browser;
            inputs['channel'] = state?.channel;
            inputs['data_file'] = state?.data_file;
            inputs['disable_notifications'] = state?.disable_notifications;
            inputs['disabled'] = state?.disabled;
            inputs['folder_id'] = state?.folder_id;
            inputs['ignore_errors'] = state?.ignore_errors;
            inputs['immediate'] = state?.immediate;
            inputs['password'] = state?.password;
            inputs['region'] = state?.region;
            inputs['retry_count'] = state?.retry_count;
            inputs['retry_interval'] = state?.retry_interval;
            inputs['run_next_parallel'] = state?.run_next_parallel;
            inputs['run_only_on_first_failure'] = state?.run_only_on_first_failure;
            inputs['start_url'] = state?.start_url;
            inputs['suite_id'] = state?.suite_id;
            inputs['suite_name'] = state?.suite_name;
            inputs['timeout'] = state?.timeout;
            inputs['trigger_conditions'] = state?.trigger_conditions;
            inputs['user'] = state?.user;
            inputs['user_agent'] = state?.user_agent;
            inputs['variables'] = state?.variables;
            inputs['viewport'] = state?.viewport;
        } else {
            const args = argsOrState as GhostInspectorArgs | undefined;
            if (!args?.project_name) {
                throw new Error('Missing required property "project_name"');
            }

            if (!args?.pipeline_id) {
                throw new Error('Missing required property "pipeline_id"');
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

            inputs['integration'] = output(args.integration as Output<IntegrationRef | Integration>).apply(integration =>
                integration instanceof Integration ? { hash_id: integration.hash_id } : integration
            );
            inputs['name'] = args.name;
            inputs['trigger_time'] = args.trigger_time;
            inputs['after_action_id'] = args.after_action_id;
            inputs['browser'] = args.browser;
            inputs['channel'] = args.channel;
            inputs['data_file'] = args.data_file;
            inputs['disable_notifications'] = args.disable_notifications;
            inputs['disabled'] = args.disabled;
            inputs['folder_id'] = args.folder_id;
            inputs['ignore_errors'] = args.ignore_errors;
            inputs['immediate'] = args.immediate;
            inputs['password'] = args.password;
            inputs['region'] = args.region;
            inputs['retry_count'] = args.retry_count;
            inputs['retry_interval'] = args.retry_interval;
            inputs['run_next_parallel'] = args.run_next_parallel;
            inputs['run_only_on_first_failure'] = args.run_only_on_first_failure;
            inputs['start_url'] = args.start_url;
            inputs['suite_id'] = args.suite_id;
            inputs['suite_name'] = args.suite_name;
            inputs['timeout'] = args.timeout;
            inputs['trigger_conditions'] = args.trigger_conditions;
            inputs['user'] = args.user;
            inputs['user_agent'] = args.user_agent;
            inputs['variables'] = args.variables;
            inputs['viewport'] = args.viewport;
            inputs['project_name'] = args.project_name;
            inputs['pipeline_id'] = args.pipeline_id;
        }

        if (!opts.version) {
            opts.version = require('../package').version;
        }

        opts.ignoreChanges = ['project_name', 'pipeline_id', ...(opts.ignoreChanges || [])];

        inputs['type'] = 'GHOST_INSPECTOR';
        inputs['url'] = undefined;
        inputs['html_url'] = undefined;
        inputs['action_id'] = undefined;

        super(GhostInspector.__pulumiType, name, inputs, opts);
    }
}
