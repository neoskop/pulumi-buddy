import { AsInputs } from '@pulumi-utils/sdk';
import { PipelineProps } from '../pipeline';
import { CustomResource, Input, Output, ID, CustomResourceOptions, Inputs } from '@pulumi/pulumi';
import { TriggerCondition, Variable } from '../common';

export interface DeployToAppStoreConnectState {
    project_name: string;
    pipeline_id: number;
    /**
     * The filesystem path of the signed archive file.
     */
    archive_location: string;

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
     * If set to 'true' the execution will proceed, mark action as a warning and jump to the next action. Doesn't apply to deployment actions.
     */
    ignore_errors?: boolean;

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
     * Defines if the app version is increased.
     */
    skip_app_version_update?: boolean;

    /**
     * Defines if the app metadata is updated.
     */
    skip_metadata?: boolean;

    /**
     * Defines is the app screenshots are updated.
     */
    skip_screenshots?: boolean;

    /**
     * Defines if the app is sent to review.
     */
    submit_for_review?: boolean;

    /**
     * The timeout in seconds.
     */
    timeout?: number;

    /**
     * The list of trigger conditions to meet so that the action can be triggered.
     */
    trigger_conditions?: TriggerCondition[];

    /**
     * Defines if the app is submitted to Fastlane pre-check before sending for review.
     */
    validate_before_upload?: string;

    /**
     * The list of variables you can use the action.
     */
    variables?: Variable[];
}

export type DeployToAppStoreConnectArgs = AsInputs<DeployToAppStoreConnectState>;

export interface DeployToAppStoreConnectProps {
    url: string;
    html_url: string;
    action_id: number;
    archive_location: string;
    trigger_time: 'ON_EVERY_EXECUTION' | 'ON_FAILURE' | 'ON_BACK_TO_SUCCESS';
    type: 'NATIVE_BUILD_MAC_DEPLOY';
    after_action_id?: number;
    disabled?: boolean;
    ignore_errors?: boolean;
    retry_count?: number;
    retry_interval?: number;
    run_next_parallel?: boolean;
    run_only_on_first_failure?: boolean;
    skip_app_version_update?: boolean;
    skip_metadata?: boolean;
    skip_screenshots?: boolean;
    submit_for_review?: boolean;
    timeout?: number;
    trigger_conditions?: TriggerCondition[];
    validate_before_upload?: string;
    variables?: Variable[];
    pipeline: PipelineProps;
    project_name: string;
    pipeline_id: number;
}

/**
 * Required scopes in Buddy API: `WORKSPACE`, `EXECUTION_MANAGE`, `EXECUTION_INFO`
 */
export class DeployToAppStoreConnect extends CustomResource {
    static __pulumiType = 'buddy:action:DeployToAppStoreConnect';

    static get(name: string, id: Input<ID>, state?: Partial<DeployToAppStoreConnectState>, opts?: CustomResourceOptions) {
        return new DeployToAppStoreConnect(name, state as any, { ...opts, id });
    }

    static isInstance(obj: any): obj is DeployToAppStoreConnect {
        if (null == obj) {
            return false;
        }

        return obj['__pulumiType'] === DeployToAppStoreConnect.__pulumiType;
    }

    project_name!: Output<string>;
    pipeline_id!: Output<number>;
    action_id!: Output<number>;
    archive_location!: Output<string>;
    trigger_time!: Output<'ON_EVERY_EXECUTION' | 'ON_FAILURE' | 'ON_BACK_TO_SUCCESS'>;
    type!: Output<'NATIVE_BUILD_MAC_DEPLOY'>;
    after_action_id!: Output<number | undefined>;
    disabled!: Output<boolean | undefined>;
    ignore_errors!: Output<boolean | undefined>;
    retry_count!: Output<number | undefined>;
    retry_interval!: Output<number | undefined>;
    run_next_parallel!: Output<boolean | undefined>;
    run_only_on_first_failure!: Output<boolean | undefined>;
    skip_app_version_update!: Output<boolean | undefined>;
    skip_metadata!: Output<boolean | undefined>;
    skip_screenshots!: Output<boolean | undefined>;
    submit_for_review!: Output<boolean | undefined>;
    timeout!: Output<number | undefined>;
    trigger_conditions!: Output<TriggerCondition[] | undefined>;
    validate_before_upload!: Output<string | undefined>;
    variables!: Output<Variable[] | undefined>;

    constructor(name: string, argsOrState: DeployToAppStoreConnectArgs | DeployToAppStoreConnectState, opts?: CustomResourceOptions) {
        const inputs: Inputs = {};
        if (!opts) {
            opts = {};
        }

        if (opts.id) {
            const state = argsOrState as DeployToAppStoreConnectState | undefined;
            inputs['project_name'] = state?.project_name;
            inputs['pipeline_id'] = state?.pipeline_id;
            inputs['archive_location'] = state?.archive_location;
            inputs['trigger_time'] = state?.trigger_time;
            inputs['after_action_id'] = state?.after_action_id;
            inputs['disabled'] = state?.disabled;
            inputs['ignore_errors'] = state?.ignore_errors;
            inputs['retry_count'] = state?.retry_count;
            inputs['retry_interval'] = state?.retry_interval;
            inputs['run_next_parallel'] = state?.run_next_parallel;
            inputs['run_only_on_first_failure'] = state?.run_only_on_first_failure;
            inputs['skip_app_version_update'] = state?.skip_app_version_update;
            inputs['skip_metadata'] = state?.skip_metadata;
            inputs['skip_screenshots'] = state?.skip_screenshots;
            inputs['submit_for_review'] = state?.submit_for_review;
            inputs['timeout'] = state?.timeout;
            inputs['trigger_conditions'] = state?.trigger_conditions;
            inputs['validate_before_upload'] = state?.validate_before_upload;
            inputs['variables'] = state?.variables;
        } else {
            const args = argsOrState as DeployToAppStoreConnectArgs | undefined;
            if (!args?.project_name) {
                throw new Error('Missing required property "project_name"');
            }

            if (!args?.pipeline_id) {
                throw new Error('Missing required property "pipeline_id"');
            }

            if (!args?.archive_location) {
                throw new Error('Missing required property "archive_location"');
            }

            if (!args?.trigger_time) {
                throw new Error('Missing required property "trigger_time"');
            }

            inputs['archive_location'] = args.archive_location;
            inputs['trigger_time'] = args.trigger_time;
            inputs['after_action_id'] = args.after_action_id;
            inputs['disabled'] = args.disabled;
            inputs['ignore_errors'] = args.ignore_errors;
            inputs['retry_count'] = args.retry_count;
            inputs['retry_interval'] = args.retry_interval;
            inputs['run_next_parallel'] = args.run_next_parallel;
            inputs['run_only_on_first_failure'] = args.run_only_on_first_failure;
            inputs['skip_app_version_update'] = args.skip_app_version_update;
            inputs['skip_metadata'] = args.skip_metadata;
            inputs['skip_screenshots'] = args.skip_screenshots;
            inputs['submit_for_review'] = args.submit_for_review;
            inputs['timeout'] = args.timeout;
            inputs['trigger_conditions'] = args.trigger_conditions;
            inputs['validate_before_upload'] = args.validate_before_upload;
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

        inputs['type'] = 'NATIVE_BUILD_MAC_DEPLOY';
        inputs['url'] = undefined;
        inputs['html_url'] = undefined;
        inputs['action_id'] = undefined;

        super(DeployToAppStoreConnect.__pulumiType, name, inputs, opts);
    }
}
