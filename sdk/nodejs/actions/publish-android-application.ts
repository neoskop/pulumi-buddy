import { AsInputs } from '@pulumi-utils/sdk';
import { PipelineProps } from '../pipeline';
import { CustomResource, Input, Output, ID, CustomResourceOptions, Inputs } from '@pulumi/pulumi';
import { APKs, TriggerCondition, Variable } from '../common';

export interface PublishAndroidApplicationState {
    project_name: string;
    pipeline_id: number;
    /**
     * The list of sets of paths to the APKs.
     */
    apk_files: APKs[];

    /**
     * The ID of the Android Application.
     */
    application_id: string;

    /**
     * The ID of the integration.
     */
    integration_hash: string;

    /**
     * The name of the action.
     */
    name: string;

    /**
     * The track type to read or modify. Can be one of `production`, `alpha`, `beta`, `rollout`, `internal` or custom track as configured in Google Play Console.
     */
    track: string;

    /**
     * Specifies when the action should be executed. Can be one of `ON_EVERY_EXECUTION`, `ON_FAILURE` or `ON_BACK_TO_SUCCESS`. The default value is `ON_EVERY_EXECUTION`.
     */
    trigger_time: 'ON_EVERY_EXECUTION' | 'ON_FAILURE' | 'ON_BACK_TO_SUCCESS';

    /**
     * The numerical ID of the action, after which this action should be added.
     */
    after_action_id?: number;

    /**
     * The path to the changelog file.
     */
    changes_path?: string;

    /**
     * When set to `true` the action is disabled.  By default it is set to `false`.
     */
    disabled?: boolean;

    /**
     * Set to `true` to publish as a draft.
     */
    draft?: boolean;

    /**
     * If set to `true` the execution will proceed, mark action as a warning and jump to the next action. Doesn't apply to deployment actions.
     */
    ignore_errors?: boolean;

    /**
     * The path to the deobfuscated file of the specified APK.
     */
    mapping_path?: string;

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
     * Check and disable superseded versions in other tracks (if any).
     */
    supersede_versions?: boolean;

    /**
     * The timeout in seconds.
     */
    timeout?: number;

    /**
     * The list of trigger conditions to meet so that the action can be triggered.
     */
    trigger_conditions?: TriggerCondition[];

    /**
     * Portion of the users who should get the staged rollout version of the APK (range 0.0 - 1.0). Required if `track` is set to `rollout`.
     */
    user_fraction?: number;

    /**
     * The list of variables you can use the action.
     */
    variables?: Variable[];
}

export type PublishAndroidApplicationArgs = AsInputs<PublishAndroidApplicationState>;

export interface PublishAndroidApplicationProps {
    url: string;
    html_url: string;
    action_id: number;
    apk_files: APKs[];
    application_id: string;
    integration_hash: string;
    name: string;
    track: string;
    trigger_time: 'ON_EVERY_EXECUTION' | 'ON_FAILURE' | 'ON_BACK_TO_SUCCESS';
    type: 'ANDROID_PUBLISH_APK';
    after_action_id?: number;
    changes_path?: string;
    disabled?: boolean;
    draft?: boolean;
    ignore_errors?: boolean;
    mapping_path?: string;
    retry_count?: number;
    retry_delay?: number;
    run_next_parallel?: boolean;
    run_only_on_first_failure?: boolean;
    supersede_versions?: boolean;
    timeout?: number;
    trigger_conditions?: TriggerCondition[];
    user_fraction?: number;
    variables?: Variable[];
    pipeline: PipelineProps;
    project_name: string;
    pipeline_id: number;
}

/**
 * Required scopes in Buddy API: `WORKSPACE`, `EXECUTION_MANAGE`, `EXECUTION_INFO`
 */
export class PublishAndroidApplication extends CustomResource {
    static __pulumiType = 'buddy:action:PublishAndroidApplication';

    static get(name: string, id: Input<ID>, state?: Partial<PublishAndroidApplicationState>, opts?: CustomResourceOptions) {
        return new PublishAndroidApplication(name, state as any, { ...opts, id });
    }

    static isInstance(obj: any): obj is PublishAndroidApplication {
        if (null == obj) {
            return false;
        }

        return obj['__pulumiType'] === PublishAndroidApplication.__pulumiType;
    }

    project_name!: Output<string>;
    pipeline_id!: Output<number>;
    action_id!: Output<number>;
    apk_files!: Output<APKs[]>;
    application_id!: Output<string>;
    integration_hash!: Output<string>;
    name!: Output<string>;
    track!: Output<string>;
    trigger_time!: Output<'ON_EVERY_EXECUTION' | 'ON_FAILURE' | 'ON_BACK_TO_SUCCESS'>;
    type!: Output<'ANDROID_PUBLISH_APK'>;
    after_action_id!: Output<number | undefined>;
    changes_path!: Output<string | undefined>;
    disabled!: Output<boolean | undefined>;
    draft!: Output<boolean | undefined>;
    ignore_errors!: Output<boolean | undefined>;
    mapping_path!: Output<string | undefined>;
    retry_count!: Output<number | undefined>;
    retry_delay!: Output<number | undefined>;
    run_next_parallel!: Output<boolean | undefined>;
    run_only_on_first_failure!: Output<boolean | undefined>;
    supersede_versions!: Output<boolean | undefined>;
    timeout!: Output<number | undefined>;
    trigger_conditions!: Output<TriggerCondition[] | undefined>;
    user_fraction!: Output<number | undefined>;
    variables!: Output<Variable[] | undefined>;

    constructor(name: string, argsOrState: PublishAndroidApplicationArgs | PublishAndroidApplicationState, opts?: CustomResourceOptions) {
        const inputs: Inputs = {};
        if (!opts) {
            opts = {};
        }

        if (opts.id) {
            const state = argsOrState as PublishAndroidApplicationState | undefined;
            inputs['project_name'] = state?.project_name;
            inputs['pipeline_id'] = state?.pipeline_id;
            inputs['apk_files'] = state?.apk_files;
            inputs['application_id'] = state?.application_id;
            inputs['integration_hash'] = state?.integration_hash;
            inputs['name'] = state?.name;
            inputs['track'] = state?.track;
            inputs['trigger_time'] = state?.trigger_time;
            inputs['after_action_id'] = state?.after_action_id;
            inputs['changes_path'] = state?.changes_path;
            inputs['disabled'] = state?.disabled;
            inputs['draft'] = state?.draft;
            inputs['ignore_errors'] = state?.ignore_errors;
            inputs['mapping_path'] = state?.mapping_path;
            inputs['retry_count'] = state?.retry_count;
            inputs['retry_delay'] = state?.retry_delay;
            inputs['run_next_parallel'] = state?.run_next_parallel;
            inputs['run_only_on_first_failure'] = state?.run_only_on_first_failure;
            inputs['supersede_versions'] = state?.supersede_versions;
            inputs['timeout'] = state?.timeout;
            inputs['trigger_conditions'] = state?.trigger_conditions;
            inputs['user_fraction'] = state?.user_fraction;
            inputs['variables'] = state?.variables;
        } else {
            const args = argsOrState as PublishAndroidApplicationArgs | undefined;
            if (!args?.project_name) {
                throw new Error('Missing required property "project_name"');
            }

            if (!args?.pipeline_id) {
                throw new Error('Missing required property "pipeline_id"');
            }

            if (!args?.apk_files) {
                throw new Error('Missing required property "apk_files"');
            }

            if (!args?.application_id) {
                throw new Error('Missing required property "application_id"');
            }

            if (!args?.integration_hash) {
                throw new Error('Missing required property "integration_hash"');
            }

            if (!args?.name) {
                throw new Error('Missing required property "name"');
            }

            if (!args?.track) {
                throw new Error('Missing required property "track"');
            }

            if (!args?.trigger_time) {
                throw new Error('Missing required property "trigger_time"');
            }

            inputs['apk_files'] = args.apk_files;
            inputs['application_id'] = args.application_id;
            inputs['integration_hash'] = args.integration_hash;
            inputs['name'] = args.name;
            inputs['track'] = args.track;
            inputs['trigger_time'] = args.trigger_time;
            inputs['after_action_id'] = args.after_action_id;
            inputs['changes_path'] = args.changes_path;
            inputs['disabled'] = args.disabled;
            inputs['draft'] = args.draft;
            inputs['ignore_errors'] = args.ignore_errors;
            inputs['mapping_path'] = args.mapping_path;
            inputs['retry_count'] = args.retry_count;
            inputs['retry_delay'] = args.retry_delay;
            inputs['run_next_parallel'] = args.run_next_parallel;
            inputs['run_only_on_first_failure'] = args.run_only_on_first_failure;
            inputs['supersede_versions'] = args.supersede_versions;
            inputs['timeout'] = args.timeout;
            inputs['trigger_conditions'] = args.trigger_conditions;
            inputs['user_fraction'] = args.user_fraction;
            inputs['variables'] = args.variables;
            inputs['project_name'] = args.project_name;
            inputs['pipeline_id'] = args.pipeline_id;
        }

        if (!opts.version) {
            opts.version = require('../package').version;
        }

        opts.ignoreChanges = ['project_name', 'pipeline_id', ...(opts.ignoreChanges || [])];

        inputs['type'] = 'ANDROID_PUBLISH_APK';
        inputs['url'] = undefined;
        inputs['html_url'] = undefined;
        inputs['action_id'] = undefined;

        super(PublishAndroidApplication.__pulumiType, name, inputs, opts);
    }
}
