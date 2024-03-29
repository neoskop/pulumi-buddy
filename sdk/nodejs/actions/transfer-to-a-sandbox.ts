import { AsInputs } from '@pulumi-utils/sdk';
import { PipelineProps } from '../pipeline';
import { CustomResource, Input, Output, ID, CustomResourceOptions, Inputs } from '@pulumi/pulumi';
import { TriggerCondition, Variable } from '../common';

export interface TransferToASandboxState {
    project_name: string;
    pipeline_id: number;
    /**
     * Defines the sandbox selection method. Available values: `BY_TAGS`, `BY_NAME`, `BY_PROJECT`, `BY_DAYS`, `BY_ID`, `BY_ACTION`.
     */
    sandbox_references: string;

    /**
     * Specifies when the action should be executed. Can be one of `ON_EVERY_EXECUTION`, `ON_FAILURE` or `ON_BACK_TO_SUCCESS`. The default value is `ON_EVERY_EXECUTION`.
     */
    trigger_time: 'ON_EVERY_EXECUTION' | 'ON_FAILURE' | 'ON_BACK_TO_SUCCESS';

    /**
     * The numerical ID of the action, after which this action should be added.
     */
    after_action_id?: number;

    /**
     * Number of days passed since the creation of the target sandbox. One of `1`, `2`, `3`, `7`, `14`, `30`. Required when `sandbox_references` is set to `BY_DAYS`.
     */
    days?: number;

    /**
     * When set to `false`, deletes files on the server that were deleted between revisions.
     */
    deletion_disabled?: boolean;

    /**
     * The paths and/or files that excluded from the upload.
     */
    deployment_excludes?: string[];

    /**
     * The exceptions from the ignore patterns set in `deployment_excludes`.
     */
    deployment_includes?: string[];

    /**
     * When set to 'true' the action is disabled.  By default it is set to 'false'.
     */
    disabled?: boolean;

    /**
     * If set to 'true' the execution will proceed, mark action as a warning and jump to the next action. Doesn't apply to deployment actions.
     */
    ignore_errors?: boolean;

    /**
     * Defines whether the files are uploaded from the repository or from the pipeline filesystem. Can be one of `SCM_REPOSITORY` or `BUILD_ARTIFACTS`.
     */
    input_type?: 'SCM_REPOSITORY' | 'BUILD_ARTIFACTS';

    /**
     * The source path of the files to be uploaded.
     */
    local_path?: string;

    /**
     * ID of the action that creates the target sandbox.Required when `sandbox_references` is set to `BY_ACTION`.
     */
    referenced_action_id?: number;

    /**
     * Name of the target sandbox. Required when `sandbox_references` is set to `BY_NAME`.
     */
    referenced_sanbox_name?: string;

    /**
     * The absolute or relative path on the sandbox where the files are uploaded.
     */
    remote_path?: string;

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
     * ID of the sandbox to which the files are uploaded. Required when `sandbox_references` is set to `BY_ID`.
     */
    sandbox_id?: string;

    /**
     * ID of the project with the target sandbox. Required when `sandbox_references` is set to `BY_PROJECT`.
     */
    sandbox_project_id?: number;

    /**
     * List of tags applied to the target sandbox. Required when `sandbox_references` is set to `BY_TAGS`.
     */
    tags?: string[];

    /**
     * The timeout in seconds.
     */
    timeout?: number;

    /**
     * The list of trigger conditions to meet so that the action can be triggered.
     */
    trigger_conditions?: TriggerCondition[];

    /**
     * The files will be uploaded with a "tmp" suffix that will be removed once the upload has finished.
     */
    use_temporary_files?: boolean;

    /**
     * The name of the local (to the sandbox server) user who uploads the files.
     */
    user?: string;

    /**
     * The list of variables you can use the action.
     */
    variables?: Variable[];
}

export type TransferToASandboxArgs = AsInputs<TransferToASandboxState>;

export interface TransferToASandboxProps {
    url: string;
    html_url: string;
    action_id: number;
    sandbox_references: string;
    trigger_time: 'ON_EVERY_EXECUTION' | 'ON_FAILURE' | 'ON_BACK_TO_SUCCESS';
    type: 'DEPLOY_TO_SANDBOX';
    after_action_id?: number;
    days?: number;
    deletion_disabled?: boolean;
    deployment_excludes?: string[];
    deployment_includes?: string[];
    disabled?: boolean;
    ignore_errors?: boolean;
    input_type?: 'SCM_REPOSITORY' | 'BUILD_ARTIFACTS';
    local_path?: string;
    referenced_action_id?: number;
    referenced_sanbox_name?: string;
    remote_path?: string;
    retry_count?: number;
    retry_interval?: number;
    run_next_parallel?: boolean;
    run_only_on_first_failure?: boolean;
    sandbox_id?: string;
    sandbox_project_id?: number;
    tags?: string[];
    timeout?: number;
    trigger_conditions?: TriggerCondition[];
    use_temporary_files?: boolean;
    user?: string;
    variables?: Variable[];
    pipeline: PipelineProps;
    project_name: string;
    pipeline_id: number;
}

/**
 * Required scopes in Buddy API: `WORKSPACE`, `EXECUTION_MANAGE`, `EXECUTION_INFO`
 */
export class TransferToASandbox extends CustomResource {
    static __pulumiType = 'buddy:action:TransferToASandbox';

    static get(name: string, id: Input<ID>, state?: Partial<TransferToASandboxState>, opts?: CustomResourceOptions) {
        return new TransferToASandbox(name, state as any, { ...opts, id });
    }

    static isInstance(obj: any): obj is TransferToASandbox {
        if (null == obj) {
            return false;
        }

        return obj['__pulumiType'] === TransferToASandbox.__pulumiType;
    }

    project_name!: Output<string>;
    pipeline_id!: Output<number>;
    action_id!: Output<number>;
    sandbox_references!: Output<string>;
    trigger_time!: Output<'ON_EVERY_EXECUTION' | 'ON_FAILURE' | 'ON_BACK_TO_SUCCESS'>;
    type!: Output<'DEPLOY_TO_SANDBOX'>;
    after_action_id!: Output<number | undefined>;
    days!: Output<number | undefined>;
    deletion_disabled!: Output<boolean | undefined>;
    deployment_excludes!: Output<string[] | undefined>;
    deployment_includes!: Output<string[] | undefined>;
    disabled!: Output<boolean | undefined>;
    ignore_errors!: Output<boolean | undefined>;
    input_type!: Output<'SCM_REPOSITORY' | 'BUILD_ARTIFACTS' | undefined>;
    local_path!: Output<string | undefined>;
    referenced_action_id!: Output<number | undefined>;
    referenced_sanbox_name!: Output<string | undefined>;
    remote_path!: Output<string | undefined>;
    retry_count!: Output<number | undefined>;
    retry_interval!: Output<number | undefined>;
    run_next_parallel!: Output<boolean | undefined>;
    run_only_on_first_failure!: Output<boolean | undefined>;
    sandbox_id!: Output<string | undefined>;
    sandbox_project_id!: Output<number | undefined>;
    tags!: Output<string[] | undefined>;
    timeout!: Output<number | undefined>;
    trigger_conditions!: Output<TriggerCondition[] | undefined>;
    use_temporary_files!: Output<boolean | undefined>;
    user!: Output<string | undefined>;
    variables!: Output<Variable[] | undefined>;

    constructor(name: string, argsOrState: TransferToASandboxArgs | TransferToASandboxState, opts?: CustomResourceOptions) {
        const inputs: Inputs = {};
        if (!opts) {
            opts = {};
        }

        if (opts.id) {
            const state = argsOrState as TransferToASandboxState | undefined;
            inputs['project_name'] = state?.project_name;
            inputs['pipeline_id'] = state?.pipeline_id;
            inputs['sandbox_references'] = state?.sandbox_references;
            inputs['trigger_time'] = state?.trigger_time;
            inputs['after_action_id'] = state?.after_action_id;
            inputs['days'] = state?.days;
            inputs['deletion_disabled'] = state?.deletion_disabled;
            inputs['deployment_excludes'] = state?.deployment_excludes;
            inputs['deployment_includes'] = state?.deployment_includes;
            inputs['disabled'] = state?.disabled;
            inputs['ignore_errors'] = state?.ignore_errors;
            inputs['input_type'] = state?.input_type;
            inputs['local_path'] = state?.local_path;
            inputs['referenced_action_id'] = state?.referenced_action_id;
            inputs['referenced_sanbox_name'] = state?.referenced_sanbox_name;
            inputs['remote_path'] = state?.remote_path;
            inputs['retry_count'] = state?.retry_count;
            inputs['retry_interval'] = state?.retry_interval;
            inputs['run_next_parallel'] = state?.run_next_parallel;
            inputs['run_only_on_first_failure'] = state?.run_only_on_first_failure;
            inputs['sandbox_id'] = state?.sandbox_id;
            inputs['sandbox_project_id'] = state?.sandbox_project_id;
            inputs['tags'] = state?.tags;
            inputs['timeout'] = state?.timeout;
            inputs['trigger_conditions'] = state?.trigger_conditions;
            inputs['use_temporary_files'] = state?.use_temporary_files;
            inputs['user'] = state?.user;
            inputs['variables'] = state?.variables;
        } else {
            const args = argsOrState as TransferToASandboxArgs | undefined;
            if (!args?.project_name) {
                throw new Error('Missing required property "project_name"');
            }

            if (!args?.pipeline_id) {
                throw new Error('Missing required property "pipeline_id"');
            }

            if (!args?.sandbox_references) {
                throw new Error('Missing required property "sandbox_references"');
            }

            if (!args?.trigger_time) {
                throw new Error('Missing required property "trigger_time"');
            }

            inputs['sandbox_references'] = args.sandbox_references;
            inputs['trigger_time'] = args.trigger_time;
            inputs['after_action_id'] = args.after_action_id;
            inputs['days'] = args.days;
            inputs['deletion_disabled'] = args.deletion_disabled;
            inputs['deployment_excludes'] = args.deployment_excludes;
            inputs['deployment_includes'] = args.deployment_includes;
            inputs['disabled'] = args.disabled;
            inputs['ignore_errors'] = args.ignore_errors;
            inputs['input_type'] = args.input_type;
            inputs['local_path'] = args.local_path;
            inputs['referenced_action_id'] = args.referenced_action_id;
            inputs['referenced_sanbox_name'] = args.referenced_sanbox_name;
            inputs['remote_path'] = args.remote_path;
            inputs['retry_count'] = args.retry_count;
            inputs['retry_interval'] = args.retry_interval;
            inputs['run_next_parallel'] = args.run_next_parallel;
            inputs['run_only_on_first_failure'] = args.run_only_on_first_failure;
            inputs['sandbox_id'] = args.sandbox_id;
            inputs['sandbox_project_id'] = args.sandbox_project_id;
            inputs['tags'] = args.tags;
            inputs['timeout'] = args.timeout;
            inputs['trigger_conditions'] = args.trigger_conditions;
            inputs['use_temporary_files'] = args.use_temporary_files;
            inputs['user'] = args.user;
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

        inputs['type'] = 'DEPLOY_TO_SANDBOX';
        inputs['url'] = undefined;
        inputs['html_url'] = undefined;
        inputs['action_id'] = undefined;

        super(TransferToASandbox.__pulumiType, name, inputs, opts);
    }
}
