import { AsInputs } from '@pulumi-utils/sdk';
import { PipelineProps } from '../pipeline';
import { CustomResource, Input, Output, ID, CustomResourceOptions, Inputs, output } from '@pulumi/pulumi';
import { IntegrationRef, TriggerCondition, Variable } from '../common';
import { Integration } from '../integration';

export interface GoogleAppEngineState {
    project_name: string;
    pipeline_id: number;
    /**
     * The name of the GAE application.
     */
    application_name: string;

    /**
     * The name of the GAE Bucket.
     */
    bucket_name: string;

    /**
     * The integration.
     */
    integration: IntegrationRef | Integration;

    /**
     * The name of the action.
     */
    name: string;

    /**
     * YAML configuration file.
     */
    config_path?: string;

    /**
     * When set to `true` the action is disabled.  By default it is set to `false`.
     */
    disabled?: boolean;

    /**
     * If set to `true` the execution will proceed, mark action as a warning and jump to the next action. Doesn't apply to deployment actions.
     */
    ignore_errors?: boolean;

    /**
     * The URL address to the desired image.
     */
    image_url?: string;

    /**
     * Defines whether the files are deployed from the repository or from the build filesystem. Can be one of `SCM_REPOSITORY` or `BUILD_ARTIFACTS`.
     */
    input_type?: 'SCM_REPOSITORY' | 'BUILD_ARTIFACTS';

    /**
     * The path in the repository.
     */
    local_path?: string;

    /**
     * Specifies whether or not to send all traffic to the new version immediately.
     */
    promote_all_traffic?: boolean;

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
     * Specifies whether or not to stop previous version instances.
     */
    stop_previous_version?: boolean;

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
     * The verbosity level. Default level is `warning`. Can be one of `critical`, `debug`, `error`, `info`, `none` or `warning`.
     */
    verbosity?: 'critical' | 'debug' | 'err' | '' | 'info' | 'none' | 'warning';

    /**
     * The label of the image version.
     */
    version_label?: string;
}

export type GoogleAppEngineArgs = AsInputs<GoogleAppEngineState>;

export interface GoogleAppEngineProps {
    url: string;
    html_url: string;
    action_id: number;
    application_name: string;
    bucket_name: string;
    integration: IntegrationRef | Integration;
    name: string;
    type: 'GOOGLE_APP_DEPLOY';
    config_path?: string;
    disabled?: boolean;
    ignore_errors?: boolean;
    image_url?: string;
    input_type?: 'SCM_REPOSITORY' | 'BUILD_ARTIFACTS';
    local_path?: string;
    promote_all_traffic?: boolean;
    retry_count?: number;
    retry_delay?: number;
    run_next_parallel?: boolean;
    run_only_on_first_failure?: boolean;
    stop_previous_version?: boolean;
    timeout?: number;
    trigger_conditions?: TriggerCondition[];
    variables?: Variable[];
    verbosity?: 'critical' | 'debug' | 'err' | '' | 'info' | 'none' | 'warning';
    version_label?: string;
    pipeline: PipelineProps;
    project_name: string;
    pipeline_id: number;
}

/**
 * Required scopes in Buddy API: `WORKSPACE`, `EXECUTION_MANAGE`, `EXECUTION_INFO`
 */
export class GoogleAppEngine extends CustomResource {
    static __pulumiType = 'buddy:action:GoogleAppEngine';

    static get(name: string, id: Input<ID>, state?: Partial<GoogleAppEngineState>, opts?: CustomResourceOptions) {
        return new GoogleAppEngine(name, state as any, { ...opts, id });
    }

    static isInstance(obj: any): obj is GoogleAppEngine {
        if (null == obj) {
            return false;
        }

        return obj['__pulumiType'] === GoogleAppEngine.__pulumiType;
    }

    project_name!: Output<string>;
    pipeline_id!: Output<number>;
    action_id!: Output<number>;
    application_name!: Output<string>;
    bucket_name!: Output<string>;
    integration!: Output<IntegrationRef | Integration>;
    name!: Output<string>;
    type!: Output<'GOOGLE_APP_DEPLOY'>;
    config_path!: Output<string | undefined>;
    disabled!: Output<boolean | undefined>;
    ignore_errors!: Output<boolean | undefined>;
    image_url!: Output<string | undefined>;
    input_type!: Output<'SCM_REPOSITORY' | 'BUILD_ARTIFACTS' | undefined>;
    local_path!: Output<string | undefined>;
    promote_all_traffic!: Output<boolean | undefined>;
    retry_count!: Output<number | undefined>;
    retry_delay!: Output<number | undefined>;
    run_next_parallel!: Output<boolean | undefined>;
    run_only_on_first_failure!: Output<boolean | undefined>;
    stop_previous_version!: Output<boolean | undefined>;
    timeout!: Output<number | undefined>;
    trigger_conditions!: Output<TriggerCondition[] | undefined>;
    variables!: Output<Variable[] | undefined>;
    verbosity!: Output<'critical' | 'debug' | 'err' | '' | 'info' | 'none' | 'warning' | undefined>;
    version_label!: Output<string | undefined>;

    constructor(name: string, argsOrState: GoogleAppEngineArgs | GoogleAppEngineState, opts?: CustomResourceOptions) {
        const inputs: Inputs = {};
        if (!opts) {
            opts = {};
        }

        if (opts.id) {
            const state = argsOrState as GoogleAppEngineState | undefined;
            inputs['project_name'] = state?.project_name;
            inputs['pipeline_id'] = state?.pipeline_id;
            inputs['application_name'] = state?.application_name;
            inputs['bucket_name'] = state?.bucket_name;
            inputs['integration'] = state?.integration instanceof Integration ? { hash_id: state.integration.hash_id } : state?.integration;
            inputs['name'] = state?.name;
            inputs['config_path'] = state?.config_path;
            inputs['disabled'] = state?.disabled;
            inputs['ignore_errors'] = state?.ignore_errors;
            inputs['image_url'] = state?.image_url;
            inputs['input_type'] = state?.input_type;
            inputs['local_path'] = state?.local_path;
            inputs['promote_all_traffic'] = state?.promote_all_traffic;
            inputs['retry_count'] = state?.retry_count;
            inputs['retry_delay'] = state?.retry_delay;
            inputs['run_next_parallel'] = state?.run_next_parallel;
            inputs['run_only_on_first_failure'] = state?.run_only_on_first_failure;
            inputs['stop_previous_version'] = state?.stop_previous_version;
            inputs['timeout'] = state?.timeout;
            inputs['trigger_conditions'] = state?.trigger_conditions;
            inputs['variables'] = state?.variables;
            inputs['verbosity'] = state?.verbosity;
            inputs['version_label'] = state?.version_label;
        } else {
            const args = argsOrState as GoogleAppEngineArgs | undefined;
            if (!args?.project_name) {
                throw new Error('Missing required property "project_name"');
            }

            if (!args?.pipeline_id) {
                throw new Error('Missing required property "pipeline_id"');
            }

            if (!args?.application_name) {
                throw new Error('Missing required property "application_name"');
            }

            if (!args?.bucket_name) {
                throw new Error('Missing required property "bucket_name"');
            }

            if (!args?.integration) {
                throw new Error('Missing required property "integration"');
            }

            if (!args?.name) {
                throw new Error('Missing required property "name"');
            }

            inputs['application_name'] = args.application_name;
            inputs['bucket_name'] = args.bucket_name;
            inputs['integration'] = output(args.integration as Output<IntegrationRef | Integration>).apply(integration =>
                integration instanceof Integration ? { hash_id: integration.hash_id } : integration
            );
            inputs['name'] = args.name;
            inputs['config_path'] = args.config_path;
            inputs['disabled'] = args.disabled;
            inputs['ignore_errors'] = args.ignore_errors;
            inputs['image_url'] = args.image_url;
            inputs['input_type'] = args.input_type;
            inputs['local_path'] = args.local_path;
            inputs['promote_all_traffic'] = args.promote_all_traffic;
            inputs['retry_count'] = args.retry_count;
            inputs['retry_delay'] = args.retry_delay;
            inputs['run_next_parallel'] = args.run_next_parallel;
            inputs['run_only_on_first_failure'] = args.run_only_on_first_failure;
            inputs['stop_previous_version'] = args.stop_previous_version;
            inputs['timeout'] = args.timeout;
            inputs['trigger_conditions'] = args.trigger_conditions;
            inputs['variables'] = args.variables;
            inputs['verbosity'] = args.verbosity;
            inputs['version_label'] = args.version_label;
            inputs['project_name'] = args.project_name;
            inputs['pipeline_id'] = args.pipeline_id;
        }

        if (!opts.version) {
            opts.version = require('../package').version;
        }

        opts.ignoreChanges = ['project_name', 'pipeline_id', ...(opts.ignoreChanges || [])];

        inputs['type'] = 'GOOGLE_APP_DEPLOY';
        inputs['url'] = undefined;
        inputs['html_url'] = undefined;
        inputs['action_id'] = undefined;

        super(GoogleAppEngine.__pulumiType, name, inputs, opts);
    }
}
