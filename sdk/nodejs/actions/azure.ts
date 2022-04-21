import { AsInputs } from '@pulumi-utils/sdk';
import { PipelineProps } from '../pipeline';
import { CustomResource, Input, Output, ID, CustomResourceOptions, Inputs } from '@pulumi/pulumi';
import { TriggerCondition, Variable } from '../common';

export interface AzureState {
    project_name: string;
    pipeline_id: number;
    /**
     * The authentication mode for Git Push. Should always be set to `HTTP`.
     */
    git_auth_mode: string;

    /**
     * The name of the action.
     */
    name: string;

    /**
     * The url to the repository.
     */
    push_url: string;

    /**
     * Specifies when the action should be executed. Can be one of `ON_EVERY_EXECUTION`, `ON_FAILURE` or `ON_BACK_TO_SUCCESS`. The default value is `ON_EVERY_EXECUTION`.
     */
    trigger_time: 'ON_EVERY_EXECUTION' | 'ON_FAILURE' | 'ON_BACK_TO_SUCCESS';

    /**
     * The numerical ID of the action, after which this action should be added.
     */
    after_action_id?: number;

    /**
     * The paths and/or files that will be left out during the push. Only works when `use_custom_gitignore` is set to `true`.
     */
    deployment_excludes?: string[];

    /**
     * The exceptions from the ignore patterns set in `deployment_excludes`.
     */
    deployment_includes?: string[];

    /**
     * When set to `true` the action is disabled.  By default it is set to `false`.
     */
    disabled?: boolean;

    /**
     * If set to `true` the execution will proceed, mark action as a warning and jump to the next action. Doesn't apply to deployment actions.
     */
    ignore_errors?: boolean;

    /**
     * When set to `true`, action will push only repository files (without artifacts).
     */
    isolated?: boolean;

    /**
     * The username required to connect to the server.
     */
    login?: string;

    /**
     * The password required to connect to the server.
     */
    password?: string;

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
     * Defines the remote branch to which the push will be performed. If empty, files will be pushed to the same branch.
     */
    target_branch?: string;

    /**
     * The timeout in seconds.
     */
    timeout?: number;

    /**
     * The list of trigger conditions to meet so that the action can be triggered.
     */
    trigger_conditions?: TriggerCondition[];

    /**
     * When set to `false` the push will ignore paths listed in .gitignore file.
     */
    use_custom_gitignore?: boolean;

    /**
     * The list of variables you can use the action.
     */
    variables?: Variable[];

    /**
     * Defines whether the `--force` flag should be used when invoking the git push command or not.
     */
    without_force?: boolean;
}

export type AzureArgs = AsInputs<AzureState>;

export interface AzureProps {
    url: string;
    html_url: string;
    action_id: number;
    git_auth_mode: string;
    name: string;
    push_url: string;
    trigger_time: 'ON_EVERY_EXECUTION' | 'ON_FAILURE' | 'ON_BACK_TO_SUCCESS';
    type: 'AZURE';
    after_action_id?: number;
    deployment_excludes?: string[];
    deployment_includes?: string[];
    disabled?: boolean;
    ignore_errors?: boolean;
    isolated?: boolean;
    login?: string;
    password?: string;
    retry_count?: number;
    retry_interval?: number;
    run_next_parallel?: boolean;
    run_only_on_first_failure?: boolean;
    target_branch?: string;
    timeout?: number;
    trigger_conditions?: TriggerCondition[];
    use_custom_gitignore?: boolean;
    variables?: Variable[];
    without_force?: boolean;
    pipeline: PipelineProps;
    project_name: string;
    pipeline_id: number;
}

/**
 * Required scopes in Buddy API: `WORKSPACE`, `EXECUTION_MANAGE`, `EXECUTION_INFO`
 */
export class Azure extends CustomResource {
    static __pulumiType = 'buddy:action:Azure';

    static get(name: string, id: Input<ID>, state?: Partial<AzureState>, opts?: CustomResourceOptions) {
        return new Azure(name, state as any, { ...opts, id });
    }

    static isInstance(obj: any): obj is Azure {
        if (null == obj) {
            return false;
        }

        return obj['__pulumiType'] === Azure.__pulumiType;
    }

    project_name!: Output<string>;
    pipeline_id!: Output<number>;
    action_id!: Output<number>;
    git_auth_mode!: Output<string>;
    name!: Output<string>;
    push_url!: Output<string>;
    trigger_time!: Output<'ON_EVERY_EXECUTION' | 'ON_FAILURE' | 'ON_BACK_TO_SUCCESS'>;
    type!: Output<'AZURE'>;
    after_action_id!: Output<number | undefined>;
    deployment_excludes!: Output<string[] | undefined>;
    deployment_includes!: Output<string[] | undefined>;
    disabled!: Output<boolean | undefined>;
    ignore_errors!: Output<boolean | undefined>;
    isolated!: Output<boolean | undefined>;
    login!: Output<string | undefined>;
    password!: Output<string | undefined>;
    retry_count!: Output<number | undefined>;
    retry_interval!: Output<number | undefined>;
    run_next_parallel!: Output<boolean | undefined>;
    run_only_on_first_failure!: Output<boolean | undefined>;
    target_branch!: Output<string | undefined>;
    timeout!: Output<number | undefined>;
    trigger_conditions!: Output<TriggerCondition[] | undefined>;
    use_custom_gitignore!: Output<boolean | undefined>;
    variables!: Output<Variable[] | undefined>;
    without_force!: Output<boolean | undefined>;

    constructor(name: string, argsOrState: AzureArgs | AzureState, opts?: CustomResourceOptions) {
        const inputs: Inputs = {};
        if (!opts) {
            opts = {};
        }

        if (opts.id) {
            const state = argsOrState as AzureState | undefined;
            inputs['project_name'] = state?.project_name;
            inputs['pipeline_id'] = state?.pipeline_id;
            inputs['git_auth_mode'] = state?.git_auth_mode;
            inputs['name'] = state?.name;
            inputs['push_url'] = state?.push_url;
            inputs['trigger_time'] = state?.trigger_time;
            inputs['after_action_id'] = state?.after_action_id;
            inputs['deployment_excludes'] = state?.deployment_excludes;
            inputs['deployment_includes'] = state?.deployment_includes;
            inputs['disabled'] = state?.disabled;
            inputs['ignore_errors'] = state?.ignore_errors;
            inputs['isolated'] = state?.isolated;
            inputs['login'] = state?.login;
            inputs['password'] = state?.password;
            inputs['retry_count'] = state?.retry_count;
            inputs['retry_interval'] = state?.retry_interval;
            inputs['run_next_parallel'] = state?.run_next_parallel;
            inputs['run_only_on_first_failure'] = state?.run_only_on_first_failure;
            inputs['target_branch'] = state?.target_branch;
            inputs['timeout'] = state?.timeout;
            inputs['trigger_conditions'] = state?.trigger_conditions;
            inputs['use_custom_gitignore'] = state?.use_custom_gitignore;
            inputs['variables'] = state?.variables;
            inputs['without_force'] = state?.without_force;
        } else {
            const args = argsOrState as AzureArgs | undefined;
            if (!args?.project_name) {
                throw new Error('Missing required property "project_name"');
            }

            if (!args?.pipeline_id) {
                throw new Error('Missing required property "pipeline_id"');
            }

            if (!args?.git_auth_mode) {
                throw new Error('Missing required property "git_auth_mode"');
            }

            if (!args?.name) {
                throw new Error('Missing required property "name"');
            }

            if (!args?.push_url) {
                throw new Error('Missing required property "push_url"');
            }

            if (!args?.trigger_time) {
                throw new Error('Missing required property "trigger_time"');
            }

            inputs['git_auth_mode'] = args.git_auth_mode;
            inputs['name'] = args.name;
            inputs['push_url'] = args.push_url;
            inputs['trigger_time'] = args.trigger_time;
            inputs['after_action_id'] = args.after_action_id;
            inputs['deployment_excludes'] = args.deployment_excludes;
            inputs['deployment_includes'] = args.deployment_includes;
            inputs['disabled'] = args.disabled;
            inputs['ignore_errors'] = args.ignore_errors;
            inputs['isolated'] = args.isolated;
            inputs['login'] = args.login;
            inputs['password'] = args.password;
            inputs['retry_count'] = args.retry_count;
            inputs['retry_interval'] = args.retry_interval;
            inputs['run_next_parallel'] = args.run_next_parallel;
            inputs['run_only_on_first_failure'] = args.run_only_on_first_failure;
            inputs['target_branch'] = args.target_branch;
            inputs['timeout'] = args.timeout;
            inputs['trigger_conditions'] = args.trigger_conditions;
            inputs['use_custom_gitignore'] = args.use_custom_gitignore;
            inputs['variables'] = args.variables;
            inputs['without_force'] = args.without_force;
            inputs['project_name'] = args.project_name;
            inputs['pipeline_id'] = args.pipeline_id;
        }

        if (!opts.version) {
            opts.version = require('../package').version;
        }

        opts.ignoreChanges = ['project_name', 'pipeline_id', ...(opts.ignoreChanges || [])];

        inputs['type'] = 'AZURE';
        inputs['url'] = undefined;
        inputs['html_url'] = undefined;
        inputs['action_id'] = undefined;

        super(Azure.__pulumiType, name, inputs, opts);
    }
}
