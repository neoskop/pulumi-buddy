import { AsInputs } from '../utils';
import { PipelineProps } from '../pipeline';
import { CustomResource, Input, Output, ID, CustomResourceOptions, Inputs } from '@pulumi/pulumi';
import { Variable } from '../common';

export interface ActionGitPushState {
    project_name: string;
    pipeline_id: number;
    /**
     * The name of the action.
     */
    name: string;

    /**
     * The url to the repository.
     */
    push_url: string;

    /**
     * The numerical ID of the action, after which this action should be added.
     */
    after_action_id?: number;

    /**
     * Optional custom git commit message.
     */
    comment?: string;

    /**
     * The paths and/or files that will be left out during the push. Only works  when `use_custom_gitignore` is set to `true`.
     */
    deployment_excludes?: string[];

    /**
     * When set to `true` the action is disabled.  By default it is set to `false`.
     */
    disabled?: boolean;

    /**
     * When set to `true`, action will push only repository files (without  artifacts).
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
     * Defines whether the tags should be pushed to the remote repository or  not.
     */
    push_tags?: boolean;

    /**
     * When set to `true`, the subsequent action defined in the pipeline will run in parallel to the current action.
     */
    run_next_parallel?: boolean;

    /**
     * Defines whether the action should be executed on each failure. Restricted to and required if the `trigger_time` is `ON_FAILURE`.
     */
    run_only_on_first_failure?: boolean;

    /**
     * The name of the branch in the remote repository.
     */
    target_branch?: string;

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
    trigger_time: 'ON_EVERY_EXECUTION' | 'ON_FAILURE' | 'ON_BACK_TO_SUCCESS';

    /**
     * Required when `trigger_condition` is set to `VAR_IS`, `VAR_IS_NOT` or `VAR_CONTAINS` or `VAR_NOT_CONTAINS`. Defines the name of the desired variable.
     */
    trigger_variable_key?: string;

    /**
     * Required when `trigger_condition` is set to `VAR_IS`, `VAR_IS_NOT` or `VAR_CONTAINS`. Defines the value of the desired variable which will be compared with its current value.
     */
    trigger_variable_value?: string;

    /**
     * When set to `false` the push will ignore paths listed in .gitignore  file.
     */
    use_custom_gitignore?: boolean;

    /**
     * The list of variables you can use the action.
     */
    variables?: Variable[];

    /**
     * Defines whether the `--force` flag should be used when invoking  the git push command or not.
     */
    without_force?: boolean;
}

export type ActionGitPushArgs = AsInputs<ActionGitPushState>;

export interface ActionGitPushProps {
    url: string;
    html_url: string;
    action_id: number;
    name: string;
    push_url: string;
    type: 'PUSH';
    after_action_id?: number;
    comment?: string;
    deployment_excludes?: string[];
    disabled?: boolean;
    isolated?: boolean;
    login?: string;
    password?: string;
    push_tags?: boolean;
    run_next_parallel?: boolean;
    run_only_on_first_failure?: boolean;
    target_branch?: string;
    timeout?: number;
    trigger_condition?: 'ALWAYS' | 'ON_CHANGE' | 'ON_CHANGE_AT_PATH' | 'VAR_IS' | 'VAR_IS_NOT' | 'VAR_CONTAINS';
    trigger_condition_paths?: string[];
    trigger_time: 'ON_EVERY_EXECUTION' | 'ON_FAILURE' | 'ON_BACK_TO_SUCCESS';
    trigger_variable_key?: string;
    trigger_variable_value?: string;
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
export class GitPush extends CustomResource {
    static __pulumiType = 'buddy:action:GitPush';

    static get(name: string, id: Input<ID>, state?: Partial<ActionGitPushState>, opts?: CustomResourceOptions) {
        return new GitPush(name, state as any, { ...opts, id });
    }

    static isInstance(obj: any): obj is GitPush {
        if (null == obj) {
            return false;
        }

        return obj['__pulumiType'] === GitPush.__pulumiType;
    }

    project_name!: Output<string>;
    pipeline_id!: Output<number>;
    action_id!: Output<number>;
    name!: Output<string>;
    push_url!: Output<string>;
    type!: Output<'PUSH'>;
    after_action_id!: Output<number | undefined>;
    comment!: Output<string | undefined>;
    deployment_excludes!: Output<string[] | undefined>;
    disabled!: Output<boolean | undefined>;
    isolated!: Output<boolean | undefined>;
    login!: Output<string | undefined>;
    password!: Output<string | undefined>;
    push_tags!: Output<boolean | undefined>;
    run_next_parallel!: Output<boolean | undefined>;
    run_only_on_first_failure!: Output<boolean | undefined>;
    target_branch!: Output<string | undefined>;
    timeout!: Output<number | undefined>;
    trigger_condition!: Output<'ALWAYS' | 'ON_CHANGE' | 'ON_CHANGE_AT_PATH' | 'VAR_IS' | 'VAR_IS_NOT' | 'VAR_CONTAINS' | undefined>;
    trigger_condition_paths!: Output<string[] | undefined>;
    trigger_time!: Output<'ON_EVERY_EXECUTION' | 'ON_FAILURE' | 'ON_BACK_TO_SUCCESS'>;
    trigger_variable_key!: Output<string | undefined>;
    trigger_variable_value!: Output<string | undefined>;
    use_custom_gitignore!: Output<boolean | undefined>;
    variables!: Output<Variable[] | undefined>;
    without_force!: Output<boolean | undefined>;

    constructor(name: string, argsOrState: ActionGitPushArgs | ActionGitPushState, opts?: CustomResourceOptions) {
        const inputs: Inputs = {};
        if (!opts) {
            opts = {};
        }

        if (opts.id) {
            const state = argsOrState as ActionGitPushState | undefined;
            inputs['project_name'] = state?.project_name;
            inputs['pipeline_id'] = state?.pipeline_id;
            inputs['name'] = state?.name;
            inputs['push_url'] = state?.push_url;
            inputs['after_action_id'] = state?.after_action_id;
            inputs['comment'] = state?.comment;
            inputs['deployment_excludes'] = state?.deployment_excludes;
            inputs['disabled'] = state?.disabled;
            inputs['isolated'] = state?.isolated;
            inputs['login'] = state?.login;
            inputs['password'] = state?.password;
            inputs['push_tags'] = state?.push_tags;
            inputs['run_next_parallel'] = state?.run_next_parallel;
            inputs['run_only_on_first_failure'] = state?.run_only_on_first_failure;
            inputs['target_branch'] = state?.target_branch;
            inputs['timeout'] = state?.timeout;
            inputs['trigger_condition'] = state?.trigger_condition;
            inputs['trigger_condition_paths'] = state?.trigger_condition_paths;
            inputs['trigger_time'] = state?.trigger_time;
            inputs['trigger_variable_key'] = state?.trigger_variable_key;
            inputs['trigger_variable_value'] = state?.trigger_variable_value;
            inputs['use_custom_gitignore'] = state?.use_custom_gitignore;
            inputs['variables'] = state?.variables;
            inputs['without_force'] = state?.without_force;
        } else {
            const args = argsOrState as ActionGitPushArgs | undefined;
            if (!args?.project_name) {
                throw new Error('Missing required property "project_name"');
            }

            if (!args?.pipeline_id) {
                throw new Error('Missing required property "pipeline_id"');
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

            inputs['name'] = args.name;
            inputs['push_url'] = args.push_url;
            inputs['after_action_id'] = args.after_action_id;
            inputs['comment'] = args.comment;
            inputs['deployment_excludes'] = args.deployment_excludes;
            inputs['disabled'] = args.disabled;
            inputs['isolated'] = args.isolated;
            inputs['login'] = args.login;
            inputs['password'] = args.password;
            inputs['push_tags'] = args.push_tags;
            inputs['run_next_parallel'] = args.run_next_parallel;
            inputs['run_only_on_first_failure'] = args.run_only_on_first_failure;
            inputs['target_branch'] = args.target_branch;
            inputs['timeout'] = args.timeout;
            inputs['trigger_condition'] = args.trigger_condition;
            inputs['trigger_condition_paths'] = args.trigger_condition_paths;
            inputs['trigger_time'] = args.trigger_time;
            inputs['trigger_variable_key'] = args.trigger_variable_key;
            inputs['trigger_variable_value'] = args.trigger_variable_value;
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

        inputs['type'] = 'PUSH';
        inputs['url'] = undefined;
        inputs['html_url'] = undefined;
        inputs['action_id'] = undefined;

        super(GitPush.__pulumiType, name, inputs, opts);
    }
}
