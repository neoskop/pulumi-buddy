import { AsInputs } from '@pulumi-utils/sdk';
import { PipelineProps } from '../pipeline';
import { CustomResource, Input, Output, ID, CustomResourceOptions, Inputs } from '@pulumi/pulumi';
import { Asset, TriggerCondition, Variable } from '../common';

export interface GitHubReleaseState {
    project_name: string;
    pipeline_id: number;
    /**
     * The name of the repository. The name is not case-sensitive. Created from the field 'organization/repository name.'
     */
    external_project_id: string;

    /**
     * The ID of the integration.
     */
    integration_hash: string;

    /**
     * The name of the action.
     */
    name: string;

    /**
     * The account owner of the repository. The name is not case-sensitive.
     */
    organization: string;

    /**
     * The name of the tag.
     */
    tag_name: string;

    /**
     * Specifies when the action should be executed. Can be one of `ON_EVERY_EXECUTION`, `ON_FAILURE` or `ON_BACK_TO_SUCCESS`. The default value is `ON_EVERY_EXECUTION`.
     */
    trigger_time: 'ON_EVERY_EXECUTION' | 'ON_FAILURE' | 'ON_BACK_TO_SUCCESS';

    /**
     * The numerical ID of the action, after which this action should be added.
     */
    after_action_id?: number;

    /**
     * The package of assets for this release. The path has to be provided in the `source_path` field and the label name in the `label` field.
     */
    assets?: Asset[];

    /**
     * Text describing the contents of the tag.
     */
    body?: string;

    /**
     * When set to 'true' the action is disabled.  By default it is set to 'false'.
     */
    disabled?: boolean;

    /**
     * Set to `true` to create a draft (unpublished) release or to `false` to create a published one. By default, it's set to `false`.
     */
    draft?: boolean;

    /**
     * If set to 'true' the execution will proceed, mark action as a warning and jump to the next action. Doesn't apply to deployment actions.
     */
    ignore_errors?: boolean;

    /**
     * Set to `true` to identify the release as a prerelease. Set to `false` to identify the release as a full release. By default, it's set to `false`.
     */
    prerelease?: boolean;

    /**
     * The name of the release.
     */
    release_name?: string;

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
     * Specifies the commitish value that determines where the Git tag is created from. Can be any branch or commit SHA. Unused if the Git tag already exists. Default: the repository's default branch.
     */
    target_commitish?: string;

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

export type GitHubReleaseArgs = AsInputs<GitHubReleaseState>;

export interface GitHubReleaseProps {
    url: string;
    html_url: string;
    action_id: number;
    external_project_id: string;
    integration_hash: string;
    name: string;
    organization: string;
    tag_name: string;
    trigger_time: 'ON_EVERY_EXECUTION' | 'ON_FAILURE' | 'ON_BACK_TO_SUCCESS';
    type: 'GIT_HUB_RELEASE';
    after_action_id?: number;
    assets?: Asset[];
    body?: string;
    disabled?: boolean;
    draft?: boolean;
    ignore_errors?: boolean;
    prerelease?: boolean;
    release_name?: string;
    retry_count?: number;
    retry_interval?: number;
    run_next_parallel?: boolean;
    run_only_on_first_failure?: boolean;
    target_commitish?: string;
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
export class GitHubRelease extends CustomResource {
    static __pulumiType = 'buddy:action:GitHubRelease';

    static get(name: string, id: Input<ID>, state?: Partial<GitHubReleaseState>, opts?: CustomResourceOptions) {
        return new GitHubRelease(name, state as any, { ...opts, id });
    }

    static isInstance(obj: any): obj is GitHubRelease {
        if (null == obj) {
            return false;
        }

        return obj['__pulumiType'] === GitHubRelease.__pulumiType;
    }

    project_name!: Output<string>;
    pipeline_id!: Output<number>;
    action_id!: Output<number>;
    external_project_id!: Output<string>;
    integration_hash!: Output<string>;
    name!: Output<string>;
    organization!: Output<string>;
    tag_name!: Output<string>;
    trigger_time!: Output<'ON_EVERY_EXECUTION' | 'ON_FAILURE' | 'ON_BACK_TO_SUCCESS'>;
    type!: Output<'GIT_HUB_RELEASE'>;
    after_action_id!: Output<number | undefined>;
    assets!: Output<Asset[] | undefined>;
    body!: Output<string | undefined>;
    disabled!: Output<boolean | undefined>;
    draft!: Output<boolean | undefined>;
    ignore_errors!: Output<boolean | undefined>;
    prerelease!: Output<boolean | undefined>;
    release_name!: Output<string | undefined>;
    retry_count!: Output<number | undefined>;
    retry_interval!: Output<number | undefined>;
    run_next_parallel!: Output<boolean | undefined>;
    run_only_on_first_failure!: Output<boolean | undefined>;
    target_commitish!: Output<string | undefined>;
    timeout!: Output<number | undefined>;
    trigger_conditions!: Output<TriggerCondition[] | undefined>;
    variables!: Output<Variable[] | undefined>;

    constructor(name: string, argsOrState: GitHubReleaseArgs | GitHubReleaseState, opts?: CustomResourceOptions) {
        const inputs: Inputs = {};
        if (!opts) {
            opts = {};
        }

        if (opts.id) {
            const state = argsOrState as GitHubReleaseState | undefined;
            inputs['project_name'] = state?.project_name;
            inputs['pipeline_id'] = state?.pipeline_id;
            inputs['external_project_id'] = state?.external_project_id;
            inputs['integration_hash'] = state?.integration_hash;
            inputs['name'] = state?.name;
            inputs['organization'] = state?.organization;
            inputs['tag_name'] = state?.tag_name;
            inputs['trigger_time'] = state?.trigger_time;
            inputs['after_action_id'] = state?.after_action_id;
            inputs['assets'] = state?.assets;
            inputs['body'] = state?.body;
            inputs['disabled'] = state?.disabled;
            inputs['draft'] = state?.draft;
            inputs['ignore_errors'] = state?.ignore_errors;
            inputs['prerelease'] = state?.prerelease;
            inputs['release_name'] = state?.release_name;
            inputs['retry_count'] = state?.retry_count;
            inputs['retry_interval'] = state?.retry_interval;
            inputs['run_next_parallel'] = state?.run_next_parallel;
            inputs['run_only_on_first_failure'] = state?.run_only_on_first_failure;
            inputs['target_commitish'] = state?.target_commitish;
            inputs['timeout'] = state?.timeout;
            inputs['trigger_conditions'] = state?.trigger_conditions;
            inputs['variables'] = state?.variables;
        } else {
            const args = argsOrState as GitHubReleaseArgs | undefined;
            if (!args?.project_name) {
                throw new Error('Missing required property "project_name"');
            }

            if (!args?.pipeline_id) {
                throw new Error('Missing required property "pipeline_id"');
            }

            if (!args?.external_project_id) {
                throw new Error('Missing required property "external_project_id"');
            }

            if (!args?.integration_hash) {
                throw new Error('Missing required property "integration_hash"');
            }

            if (!args?.name) {
                throw new Error('Missing required property "name"');
            }

            if (!args?.organization) {
                throw new Error('Missing required property "organization"');
            }

            if (!args?.tag_name) {
                throw new Error('Missing required property "tag_name"');
            }

            if (!args?.trigger_time) {
                throw new Error('Missing required property "trigger_time"');
            }

            inputs['external_project_id'] = args.external_project_id;
            inputs['integration_hash'] = args.integration_hash;
            inputs['name'] = args.name;
            inputs['organization'] = args.organization;
            inputs['tag_name'] = args.tag_name;
            inputs['trigger_time'] = args.trigger_time;
            inputs['after_action_id'] = args.after_action_id;
            inputs['assets'] = args.assets;
            inputs['body'] = args.body;
            inputs['disabled'] = args.disabled;
            inputs['draft'] = args.draft;
            inputs['ignore_errors'] = args.ignore_errors;
            inputs['prerelease'] = args.prerelease;
            inputs['release_name'] = args.release_name;
            inputs['retry_count'] = args.retry_count;
            inputs['retry_interval'] = args.retry_interval;
            inputs['run_next_parallel'] = args.run_next_parallel;
            inputs['run_only_on_first_failure'] = args.run_only_on_first_failure;
            inputs['target_commitish'] = args.target_commitish;
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

        inputs['type'] = 'GIT_HUB_RELEASE';
        inputs['url'] = undefined;
        inputs['html_url'] = undefined;
        inputs['action_id'] = undefined;

        super(GitHubRelease.__pulumiType, name, inputs, opts);
    }
}
