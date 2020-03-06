import { AsInputs } from '../utils';
import { PipelineProps } from '../pipeline';
import { CustomResource, Input, Output, ID, CustomResourceOptions, Inputs } from '@pulumi/pulumi';
import { APKs, Variable } from '../common';

export interface ActionPublishAndroidApplicationState {
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
     * The path to the private key in JSON format with permissions to Google Play Developer Console.
     */
    key_path: string;

    /**
     * The name of the action.
     */
    name: string;

    /**
     * The track type to read or modify. Can be one of `production`, `alpha`, `beta`, `rollout`, `internal`.
     */
    track: string;

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
     * The path to the deobfuscated file of the specified APK.
     */
    mapping_path?: string;

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
     * Portion of the users who should get the staged rollout version of the APK (range 0.0 - 1.0). Required if `track` is set to `rollout`.
     */
    user_fraction?: number;

    /**
     * The list of variables you can use the action.
     */
    variables?: Variable[];
}

export type ActionPublishAndroidApplicationArgs = AsInputs<ActionPublishAndroidApplicationState>;

export interface ActionPublishAndroidApplicationProps {
    url: string;
    html_url: string;
    action_id: number;
    apk_files: APKs[];
    application_id: string;
    key_path: string;
    name: string;
    track: string;
    type: 'ANDROID_PLAY';
    after_action_id?: number;
    changes_path?: string;
    disabled?: boolean;
    mapping_path?: string;
    run_next_parallel?: boolean;
    run_only_on_first_failure?: boolean;
    supersede_versions?: boolean;
    timeout?: number;
    trigger_condition?: 'ALWAYS' | 'ON_CHANGE' | 'ON_CHANGE_AT_PATH' | 'VAR_IS' | 'VAR_IS_NOT' | 'VAR_CONTAINS';
    trigger_condition_paths?: string[];
    trigger_time?: 'ON_EVERY_EXECUTION' | 'ON_FAILURE' | 'ON_BACK_TO_SUCCESS';
    trigger_variable_key?: string;
    trigger_variable_value?: string;
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

    static get(name: string, id: Input<ID>, state?: Partial<ActionPublishAndroidApplicationState>, opts?: CustomResourceOptions) {
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
    key_path!: Output<string>;
    name!: Output<string>;
    track!: Output<string>;
    type!: Output<'ANDROID_PLAY'>;
    after_action_id!: Output<number | undefined>;
    changes_path!: Output<string | undefined>;
    disabled!: Output<boolean | undefined>;
    mapping_path!: Output<string | undefined>;
    run_next_parallel!: Output<boolean | undefined>;
    run_only_on_first_failure!: Output<boolean | undefined>;
    supersede_versions!: Output<boolean | undefined>;
    timeout!: Output<number | undefined>;
    trigger_condition!: Output<'ALWAYS' | 'ON_CHANGE' | 'ON_CHANGE_AT_PATH' | 'VAR_IS' | 'VAR_IS_NOT' | 'VAR_CONTAINS' | undefined>;
    trigger_condition_paths!: Output<string[] | undefined>;
    trigger_time!: Output<'ON_EVERY_EXECUTION' | 'ON_FAILURE' | 'ON_BACK_TO_SUCCESS' | undefined>;
    trigger_variable_key!: Output<string | undefined>;
    trigger_variable_value!: Output<string | undefined>;
    user_fraction!: Output<number | undefined>;
    variables!: Output<Variable[] | undefined>;

    constructor(
        name: string,
        argsOrState: ActionPublishAndroidApplicationArgs | ActionPublishAndroidApplicationState,
        opts?: CustomResourceOptions
    ) {
        const inputs: Inputs = {};
        if (!opts) {
            opts = {};
        }

        if (opts.id) {
            const state = argsOrState as ActionPublishAndroidApplicationState | undefined;
            inputs['project_name'] = state?.project_name;
            inputs['pipeline_id'] = state?.pipeline_id;
            inputs['apk_files'] = state?.apk_files;
            inputs['application_id'] = state?.application_id;
            inputs['key_path'] = state?.key_path;
            inputs['name'] = state?.name;
            inputs['track'] = state?.track;
            inputs['after_action_id'] = state?.after_action_id;
            inputs['changes_path'] = state?.changes_path;
            inputs['disabled'] = state?.disabled;
            inputs['mapping_path'] = state?.mapping_path;
            inputs['run_next_parallel'] = state?.run_next_parallel;
            inputs['run_only_on_first_failure'] = state?.run_only_on_first_failure;
            inputs['supersede_versions'] = state?.supersede_versions;
            inputs['timeout'] = state?.timeout;
            inputs['trigger_condition'] = state?.trigger_condition;
            inputs['trigger_condition_paths'] = state?.trigger_condition_paths;
            inputs['trigger_time'] = state?.trigger_time;
            inputs['trigger_variable_key'] = state?.trigger_variable_key;
            inputs['trigger_variable_value'] = state?.trigger_variable_value;
            inputs['user_fraction'] = state?.user_fraction;
            inputs['variables'] = state?.variables;
        } else {
            const args = argsOrState as ActionPublishAndroidApplicationArgs | undefined;
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

            if (!args?.key_path) {
                throw new Error('Missing required property "key_path"');
            }

            if (!args?.name) {
                throw new Error('Missing required property "name"');
            }

            if (!args?.track) {
                throw new Error('Missing required property "track"');
            }

            inputs['apk_files'] = args.apk_files;
            inputs['application_id'] = args.application_id;
            inputs['key_path'] = args.key_path;
            inputs['name'] = args.name;
            inputs['track'] = args.track;
            inputs['after_action_id'] = args.after_action_id;
            inputs['changes_path'] = args.changes_path;
            inputs['disabled'] = args.disabled;
            inputs['mapping_path'] = args.mapping_path;
            inputs['run_next_parallel'] = args.run_next_parallel;
            inputs['run_only_on_first_failure'] = args.run_only_on_first_failure;
            inputs['supersede_versions'] = args.supersede_versions;
            inputs['timeout'] = args.timeout;
            inputs['trigger_condition'] = args.trigger_condition;
            inputs['trigger_condition_paths'] = args.trigger_condition_paths;
            inputs['trigger_time'] = args.trigger_time;
            inputs['trigger_variable_key'] = args.trigger_variable_key;
            inputs['trigger_variable_value'] = args.trigger_variable_value;
            inputs['user_fraction'] = args.user_fraction;
            inputs['variables'] = args.variables;
            inputs['project_name'] = args.project_name;
            inputs['pipeline_id'] = args.pipeline_id;
        }

        if (!opts.version) {
            opts.version = require('../package').version;
        }

        opts.ignoreChanges = ['project_name', 'pipeline_id', ...(opts.ignoreChanges || [])];

        inputs['type'] = 'ANDROID_PLAY';
        inputs['url'] = undefined;
        inputs['html_url'] = undefined;
        inputs['action_id'] = undefined;

        super(PublishAndroidApplication.__pulumiType, name, inputs, opts);
    }
}
