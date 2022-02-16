import { AsInputs } from '@pulumi-utils/sdk';
import { PipelineProps } from '../pipeline';
import { CustomResource, Input, Output, ID, CustomResourceOptions, Inputs } from '@pulumi/pulumi';
import { TriggerCondition, Variable } from '../common';

export interface CodeSignAndExportAnIOSAppState {
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
     * The list of variables added to the iOS keychain.
     */
    certificates?: string[];

    /**
     * When set to `true` the action is disabled.  By default it is set to `false`.
     */
    disabled?: boolean;

    /**
     * Defines the distribution method from one of the available: `APP_STORE`, `ENTERPRISE`, `AD_HOC`, `DEVELOPMENT`.
     */
    distribution_method?: string;

    /**
     * Defines the filesystem path to which the signed file is exported.
     */
    export_location?: string;

    /**
     * If set to `true` the execution will proceed, mark action as a warning and jump to the next action. Doesn't apply to deployment actions.
     */
    ignore_errors?: boolean;

    /**
     * Filesystem path of the properties file or the list of properties separated by the newline character `\n`.
     */
    property_list?: string;

    /**
     * Defines the source of the `property_list` used by the action. Available options: `ACTION`, `GENERATED`,`PIPELINE_VOLUME`.
     */
    property_list_source?: string;

    /**
     * The list of variables added as iOS Provisioning Profiles.
     */
    provision_profiles?: string[];

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

export type CodeSignAndExportAnIOSAppArgs = AsInputs<CodeSignAndExportAnIOSAppState>;

export interface CodeSignAndExportAnIOSAppProps {
    url: string;
    html_url: string;
    action_id: number;
    archive_location: string;
    trigger_time: 'ON_EVERY_EXECUTION' | 'ON_FAILURE' | 'ON_BACK_TO_SUCCESS';
    type: 'NATIVE_BUILD_MAC_SIGN';
    after_action_id?: number;
    certificates?: string[];
    disabled?: boolean;
    distribution_method?: string;
    export_location?: string;
    ignore_errors?: boolean;
    property_list?: string;
    property_list_source?: string;
    provision_profiles?: string[];
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
export class CodeSignAndExportAnIOSApp extends CustomResource {
    static __pulumiType = 'buddy:action:CodeSignAndExportAnIOSApp';

    static get(name: string, id: Input<ID>, state?: Partial<CodeSignAndExportAnIOSAppState>, opts?: CustomResourceOptions) {
        return new CodeSignAndExportAnIOSApp(name, state as any, { ...opts, id });
    }

    static isInstance(obj: any): obj is CodeSignAndExportAnIOSApp {
        if (null == obj) {
            return false;
        }

        return obj['__pulumiType'] === CodeSignAndExportAnIOSApp.__pulumiType;
    }

    project_name!: Output<string>;
    pipeline_id!: Output<number>;
    action_id!: Output<number>;
    archive_location!: Output<string>;
    trigger_time!: Output<'ON_EVERY_EXECUTION' | 'ON_FAILURE' | 'ON_BACK_TO_SUCCESS'>;
    type!: Output<'NATIVE_BUILD_MAC_SIGN'>;
    after_action_id!: Output<number | undefined>;
    certificates!: Output<string[] | undefined>;
    disabled!: Output<boolean | undefined>;
    distribution_method!: Output<string | undefined>;
    export_location!: Output<string | undefined>;
    ignore_errors!: Output<boolean | undefined>;
    property_list!: Output<string | undefined>;
    property_list_source!: Output<string | undefined>;
    provision_profiles!: Output<string[] | undefined>;
    retry_count!: Output<number | undefined>;
    retry_delay!: Output<number | undefined>;
    run_next_parallel!: Output<boolean | undefined>;
    run_only_on_first_failure!: Output<boolean | undefined>;
    timeout!: Output<number | undefined>;
    trigger_conditions!: Output<TriggerCondition[] | undefined>;
    variables!: Output<Variable[] | undefined>;

    constructor(name: string, argsOrState: CodeSignAndExportAnIOSAppArgs | CodeSignAndExportAnIOSAppState, opts?: CustomResourceOptions) {
        const inputs: Inputs = {};
        if (!opts) {
            opts = {};
        }

        if (opts.id) {
            const state = argsOrState as CodeSignAndExportAnIOSAppState | undefined;
            inputs['project_name'] = state?.project_name;
            inputs['pipeline_id'] = state?.pipeline_id;
            inputs['archive_location'] = state?.archive_location;
            inputs['trigger_time'] = state?.trigger_time;
            inputs['after_action_id'] = state?.after_action_id;
            inputs['certificates'] = state?.certificates;
            inputs['disabled'] = state?.disabled;
            inputs['distribution_method'] = state?.distribution_method;
            inputs['export_location'] = state?.export_location;
            inputs['ignore_errors'] = state?.ignore_errors;
            inputs['property_list'] = state?.property_list;
            inputs['property_list_source'] = state?.property_list_source;
            inputs['provision_profiles'] = state?.provision_profiles;
            inputs['retry_count'] = state?.retry_count;
            inputs['retry_delay'] = state?.retry_delay;
            inputs['run_next_parallel'] = state?.run_next_parallel;
            inputs['run_only_on_first_failure'] = state?.run_only_on_first_failure;
            inputs['timeout'] = state?.timeout;
            inputs['trigger_conditions'] = state?.trigger_conditions;
            inputs['variables'] = state?.variables;
        } else {
            const args = argsOrState as CodeSignAndExportAnIOSAppArgs | undefined;
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
            inputs['certificates'] = args.certificates;
            inputs['disabled'] = args.disabled;
            inputs['distribution_method'] = args.distribution_method;
            inputs['export_location'] = args.export_location;
            inputs['ignore_errors'] = args.ignore_errors;
            inputs['property_list'] = args.property_list;
            inputs['property_list_source'] = args.property_list_source;
            inputs['provision_profiles'] = args.provision_profiles;
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

        inputs['type'] = 'NATIVE_BUILD_MAC_SIGN';
        inputs['url'] = undefined;
        inputs['html_url'] = undefined;
        inputs['action_id'] = undefined;

        super(CodeSignAndExportAnIOSApp.__pulumiType, name, inputs, opts);
    }
}
