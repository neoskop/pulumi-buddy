import { AsInputs } from '@pulumi-utils/sdk';
import { PipelineProps } from '../pipeline';
import { CustomResource, Input, Output, ID, CustomResourceOptions, Inputs, output } from '@pulumi/pulumi';
import { IntegrationRef, TriggerCondition, Variable } from '../common';
import { Integration } from '../integration';

export interface DownloadGCSState {
    project_name: string;
    pipeline_id: number;
    /**
     * The name of the GCS Bucket.
     */
    bucket_name: string;

    /**
     * The path in which the file will be saved.
     */
    destination_path: string;

    /**
     * The ID of the integration.
     */
    integration_hash: IntegrationRef | Integration;

    /**
     * The name of the action.
     */
    name: string;

    /**
     * The path from which the file will be downloaded.
     */
    source_path: string;

    /**
     * Specifies when the action should be executed. Can be one of `ON_EVERY_EXECUTION`, `ON_FAILURE` or `ON_BACK_TO_SUCCESS`. The default value is `ON_EVERY_EXECUTION`.
     */
    trigger_time: 'ON_EVERY_EXECUTION' | 'ON_FAILURE' | 'ON_BACK_TO_SUCCESS';

    /**
     * The numerical ID of the action, after which this action should be added.
     */
    after_action_id?: number;

    /**
     * The name of the GCS application.
     */
    application_name?: string;

    /**
     * When set to 'true' the action is disabled.  By default it is set to 'false'.
     */
    disabled?: boolean;

    /**
     * The paths and/or files that will be left out during the download.
     */
    download_excludes?: string[];

    /**
     * The exceptions from the ignore patterns set in `download_excludes`.
     */
    download_includes?: string[];

    /**
     * If set to 'true' the execution will proceed, mark action as a warning and jump to the next action. Doesn't apply to deployment actions.
     */
    ignore_errors?: boolean;

    /**
     * Replace files if they already exist.
     */
    overwrite?: boolean;

    /**
     * If set to `true`, the whole directory tree is downloaded, otherwise only the files from the path are downloaded.
     */
    recursive?: boolean;

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
     * The list of variables you can use the action.
     */
    variables?: Variable[];
}

export type DownloadGCSArgs = AsInputs<DownloadGCSState>;

export interface DownloadGCSProps {
    url: string;
    html_url: string;
    action_id: number;
    bucket_name: string;
    destination_path: string;
    integration_hash: IntegrationRef | Integration;
    name: string;
    source_path: string;
    trigger_time: 'ON_EVERY_EXECUTION' | 'ON_FAILURE' | 'ON_BACK_TO_SUCCESS';
    type: 'DOWNLOAD_GCS';
    after_action_id?: number;
    application_name?: string;
    disabled?: boolean;
    download_excludes?: string[];
    download_includes?: string[];
    ignore_errors?: boolean;
    overwrite?: boolean;
    recursive?: boolean;
    retry_count?: number;
    retry_interval?: number;
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
export class DownloadGCS extends CustomResource {
    static __pulumiType = 'buddy:action:DownloadGCS';

    static get(name: string, id: Input<ID>, state?: Partial<DownloadGCSState>, opts?: CustomResourceOptions) {
        return new DownloadGCS(name, state as any, { ...opts, id });
    }

    static isInstance(obj: any): obj is DownloadGCS {
        if (null == obj) {
            return false;
        }

        return obj['__pulumiType'] === DownloadGCS.__pulumiType;
    }

    project_name!: Output<string>;
    pipeline_id!: Output<number>;
    action_id!: Output<number>;
    bucket_name!: Output<string>;
    destination_path!: Output<string>;
    integration_hash!: Output<IntegrationRef | Integration>;
    name!: Output<string>;
    source_path!: Output<string>;
    trigger_time!: Output<'ON_EVERY_EXECUTION' | 'ON_FAILURE' | 'ON_BACK_TO_SUCCESS'>;
    type!: Output<'DOWNLOAD_GCS'>;
    after_action_id!: Output<number | undefined>;
    application_name!: Output<string | undefined>;
    disabled!: Output<boolean | undefined>;
    download_excludes!: Output<string[] | undefined>;
    download_includes!: Output<string[] | undefined>;
    ignore_errors!: Output<boolean | undefined>;
    overwrite!: Output<boolean | undefined>;
    recursive!: Output<boolean | undefined>;
    retry_count!: Output<number | undefined>;
    retry_interval!: Output<number | undefined>;
    run_next_parallel!: Output<boolean | undefined>;
    run_only_on_first_failure!: Output<boolean | undefined>;
    timeout!: Output<number | undefined>;
    trigger_conditions!: Output<TriggerCondition[] | undefined>;
    variables!: Output<Variable[] | undefined>;

    constructor(name: string, argsOrState: DownloadGCSArgs | DownloadGCSState, opts?: CustomResourceOptions) {
        const inputs: Inputs = {};
        if (!opts) {
            opts = {};
        }

        if (opts.id) {
            const state = argsOrState as DownloadGCSState | undefined;
            inputs['project_name'] = state?.project_name;
            inputs['pipeline_id'] = state?.pipeline_id;
            inputs['bucket_name'] = state?.bucket_name;
            inputs['destination_path'] = state?.destination_path;
            inputs['integration_hash'] =
                state?.integration_hash instanceof Integration ? { hash_id: state.integration_hash.hash_id } : state?.integration_hash;
            inputs['name'] = state?.name;
            inputs['source_path'] = state?.source_path;
            inputs['trigger_time'] = state?.trigger_time;
            inputs['after_action_id'] = state?.after_action_id;
            inputs['application_name'] = state?.application_name;
            inputs['disabled'] = state?.disabled;
            inputs['download_excludes'] = state?.download_excludes;
            inputs['download_includes'] = state?.download_includes;
            inputs['ignore_errors'] = state?.ignore_errors;
            inputs['overwrite'] = state?.overwrite;
            inputs['recursive'] = state?.recursive;
            inputs['retry_count'] = state?.retry_count;
            inputs['retry_interval'] = state?.retry_interval;
            inputs['run_next_parallel'] = state?.run_next_parallel;
            inputs['run_only_on_first_failure'] = state?.run_only_on_first_failure;
            inputs['timeout'] = state?.timeout;
            inputs['trigger_conditions'] = state?.trigger_conditions;
            inputs['variables'] = state?.variables;
        } else {
            const args = argsOrState as DownloadGCSArgs | undefined;
            if (!args?.project_name) {
                throw new Error('Missing required property "project_name"');
            }

            if (!args?.pipeline_id) {
                throw new Error('Missing required property "pipeline_id"');
            }

            if (!args?.bucket_name) {
                throw new Error('Missing required property "bucket_name"');
            }

            if (!args?.destination_path) {
                throw new Error('Missing required property "destination_path"');
            }

            if (!args?.integration_hash) {
                throw new Error('Missing required property "integration_hash"');
            }

            if (!args?.name) {
                throw new Error('Missing required property "name"');
            }

            if (!args?.source_path) {
                throw new Error('Missing required property "source_path"');
            }

            if (!args?.trigger_time) {
                throw new Error('Missing required property "trigger_time"');
            }

            inputs['bucket_name'] = args.bucket_name;
            inputs['destination_path'] = args.destination_path;
            inputs['integration_hash'] = output(args.integration_hash as Output<IntegrationRef | Integration>).apply(integration_hash =>
                integration_hash instanceof Integration ? { hash_id: integration_hash.hash_id } : integration_hash
            );
            inputs['name'] = args.name;
            inputs['source_path'] = args.source_path;
            inputs['trigger_time'] = args.trigger_time;
            inputs['after_action_id'] = args.after_action_id;
            inputs['application_name'] = args.application_name;
            inputs['disabled'] = args.disabled;
            inputs['download_excludes'] = args.download_excludes;
            inputs['download_includes'] = args.download_includes;
            inputs['ignore_errors'] = args.ignore_errors;
            inputs['overwrite'] = args.overwrite;
            inputs['recursive'] = args.recursive;
            inputs['retry_count'] = args.retry_count;
            inputs['retry_interval'] = args.retry_interval;
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

        if (null == opts.deleteBeforeReplace) {
            opts.deleteBeforeReplace = true;
        }

        opts.ignoreChanges = ['project_name', 'pipeline_id', ...(opts.ignoreChanges || [])];

        inputs['type'] = 'DOWNLOAD_GCS';
        inputs['url'] = undefined;
        inputs['html_url'] = undefined;
        inputs['action_id'] = undefined;

        super(DownloadGCS.__pulumiType, name, inputs, opts);
    }
}
