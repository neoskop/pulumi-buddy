import { AsInputs } from '@pulumi-utils/sdk';
import { PipelineProps } from '../pipeline';
import { CustomResource, Input, Output, ID, CustomResourceOptions, Inputs } from '@pulumi/pulumi';
import { Variable } from '../common';

export interface ActionRsyncState {
    project_name: string;
    pipeline_id: number;
    /**
     * The authentication mode for SSH. Should be set to `PASS`.
     */
    authentication_mode: 'PASS';

    /**
     * The host for the connection.
     */
    host: string;

    /**
     * The username required to connect to the server.
     */
    login: string;

    /**
     * The name of the action.
     */
    name: string;

    /**
     * The password required to connect to the server.
     */
    password: string;

    /**
     * The port for the connection.
     */
    port: string;

    /**
     * Specifies when the action should be executed. Can be one of `ON_EVERY_EXECUTION`, `ON_FAILURE` or `ON_BACK_TO_SUCCESS`. The default value is `ON_EVERY_EXECUTION`.
     */
    trigger_time: 'ON_EVERY_EXECUTION' | 'ON_FAILURE' | 'ON_BACK_TO_SUCCESS';

    /**
     * The numerical ID of the action, after which this action should be added.
     */
    after_action_id?: number;

    /**
     * An equivalent for `rsync -a` option. See here.
     */
    archive?: boolean;

    /**
     * An equivalent for `rsync -z` option. See here.
     */
    compress?: boolean;

    /**
     * Defines whether additional files on the server (that are not present in repository or in the filesystem), should be deleted.
     */
    delete_extra_files?: boolean;

    /**
     * The paths and/or files that will be left out during the deployment.
     */
    deployment_excludes?: string[];

    /**
     * The exceptions from the ignore patterns set in `deployment_excludes`.
     */
    deployment_includes?: string[];

    /**
     * An equivalent for `rsync -d` option. See here.
     */
    dirs?: boolean;

    /**
     * When set to `true` the action is disabled.  By default it is set to `false`.
     */
    disabled?: boolean;

    /**
     * Defines whether the files are deployed from the repository or from the build filesystem. Can be one of `SCM_REPOSITORY` or `BUILD_ARTIFACTS`.
     */
    input_type?: 'SCM_REPOSITORY' | 'BUILD_ARTIFACTS';

    /**
     * The path in the repository.
     */
    local_path?: string;

    /**
     * An equivalent for `rsync -r` option. See here.
     */
    recursive?: boolean;

    /**
     * The absolute or relative path on the remote server.
     */
    remote_path?: string;

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
     * Defines when the build action should be run. Can be one of `ALWAYS`, `ON_CHANGE`, `ON_CHANGE_AT_PATH`, `VAR_IS`, `VAR_IS_NOT` or `VAR_CONTAINS` or `VAR_NOT_CONTAINS`. Can't be used in deployment actions.
     */
    trigger_condition?: 'ALWAYS' | 'ON_CHANGE' | 'ON_CHANGE_AT_PATH' | 'VAR_IS' | 'VAR_IS_NOT' | 'VAR_CONTAINS';

    /**
     * Required when `trigger_condition` is set to `ON_CHANGE_AT_PATH`.
     */
    trigger_condition_paths?: string[];

    /**
     * Required when `trigger_condition` is set to `VAR_IS`, `VAR_IS_NOT` or `VAR_CONTAINS` or `VAR_NOT_CONTAINS`. Defines the name of the desired variable.
     */
    trigger_variable_key?: string;

    /**
     * Required when `trigger_condition` is set to `VAR_IS`, `VAR_IS_NOT` or `VAR_CONTAINS`. Defines the value of the desired variable which will be compared with its current value.
     */
    trigger_variable_value?: string;

    /**
     * The list of variables you can use the action.
     */
    variables?: Variable[];
}

export type ActionRsyncArgs = AsInputs<ActionRsyncState>;

export interface ActionRsyncProps {
    url: string;
    html_url: string;
    action_id: number;
    authentication_mode: 'PASS';
    host: string;
    login: string;
    name: string;
    password: string;
    port: string;
    trigger_time: 'ON_EVERY_EXECUTION' | 'ON_FAILURE' | 'ON_BACK_TO_SUCCESS';
    type: 'RSYNC';
    after_action_id?: number;
    archive?: boolean;
    compress?: boolean;
    delete_extra_files?: boolean;
    deployment_excludes?: string[];
    deployment_includes?: string[];
    dirs?: boolean;
    disabled?: boolean;
    input_type?: 'SCM_REPOSITORY' | 'BUILD_ARTIFACTS';
    local_path?: string;
    recursive?: boolean;
    remote_path?: string;
    run_next_parallel?: boolean;
    run_only_on_first_failure?: boolean;
    timeout?: number;
    trigger_condition?: 'ALWAYS' | 'ON_CHANGE' | 'ON_CHANGE_AT_PATH' | 'VAR_IS' | 'VAR_IS_NOT' | 'VAR_CONTAINS';
    trigger_condition_paths?: string[];
    trigger_variable_key?: string;
    trigger_variable_value?: string;
    variables?: Variable[];
    pipeline: PipelineProps;
    project_name: string;
    pipeline_id: number;
}

/**
 * Required scopes in Buddy API: `WORKSPACE`, `EXECUTION_MANAGE`, `EXECUTION_INFO`
 */
export class Rsync extends CustomResource {
    static __pulumiType = 'buddy:action:Rsync';

    static get(name: string, id: Input<ID>, state?: Partial<ActionRsyncState>, opts?: CustomResourceOptions) {
        return new Rsync(name, state as any, { ...opts, id });
    }

    static isInstance(obj: any): obj is Rsync {
        if (null == obj) {
            return false;
        }

        return obj['__pulumiType'] === Rsync.__pulumiType;
    }

    project_name!: Output<string>;
    pipeline_id!: Output<number>;
    action_id!: Output<number>;
    authentication_mode!: Output<'PASS'>;
    host!: Output<string>;
    login!: Output<string>;
    name!: Output<string>;
    password!: Output<string>;
    port!: Output<string>;
    trigger_time!: Output<'ON_EVERY_EXECUTION' | 'ON_FAILURE' | 'ON_BACK_TO_SUCCESS'>;
    type!: Output<'RSYNC'>;
    after_action_id!: Output<number | undefined>;
    archive!: Output<boolean | undefined>;
    compress!: Output<boolean | undefined>;
    delete_extra_files!: Output<boolean | undefined>;
    deployment_excludes!: Output<string[] | undefined>;
    deployment_includes!: Output<string[] | undefined>;
    dirs!: Output<boolean | undefined>;
    disabled!: Output<boolean | undefined>;
    input_type!: Output<'SCM_REPOSITORY' | 'BUILD_ARTIFACTS' | undefined>;
    local_path!: Output<string | undefined>;
    recursive!: Output<boolean | undefined>;
    remote_path!: Output<string | undefined>;
    run_next_parallel!: Output<boolean | undefined>;
    run_only_on_first_failure!: Output<boolean | undefined>;
    timeout!: Output<number | undefined>;
    trigger_condition!: Output<'ALWAYS' | 'ON_CHANGE' | 'ON_CHANGE_AT_PATH' | 'VAR_IS' | 'VAR_IS_NOT' | 'VAR_CONTAINS' | undefined>;
    trigger_condition_paths!: Output<string[] | undefined>;
    trigger_variable_key!: Output<string | undefined>;
    trigger_variable_value!: Output<string | undefined>;
    variables!: Output<Variable[] | undefined>;

    constructor(name: string, argsOrState: ActionRsyncArgs | ActionRsyncState, opts?: CustomResourceOptions) {
        const inputs: Inputs = {};
        if (!opts) {
            opts = {};
        }

        if (opts.id) {
            const state = argsOrState as ActionRsyncState | undefined;
            inputs['project_name'] = state?.project_name;
            inputs['pipeline_id'] = state?.pipeline_id;
            inputs['authentication_mode'] = state?.authentication_mode;
            inputs['host'] = state?.host;
            inputs['login'] = state?.login;
            inputs['name'] = state?.name;
            inputs['password'] = state?.password;
            inputs['port'] = state?.port;
            inputs['trigger_time'] = state?.trigger_time;
            inputs['after_action_id'] = state?.after_action_id;
            inputs['archive'] = state?.archive;
            inputs['compress'] = state?.compress;
            inputs['delete_extra_files'] = state?.delete_extra_files;
            inputs['deployment_excludes'] = state?.deployment_excludes;
            inputs['deployment_includes'] = state?.deployment_includes;
            inputs['dirs'] = state?.dirs;
            inputs['disabled'] = state?.disabled;
            inputs['input_type'] = state?.input_type;
            inputs['local_path'] = state?.local_path;
            inputs['recursive'] = state?.recursive;
            inputs['remote_path'] = state?.remote_path;
            inputs['run_next_parallel'] = state?.run_next_parallel;
            inputs['run_only_on_first_failure'] = state?.run_only_on_first_failure;
            inputs['timeout'] = state?.timeout;
            inputs['trigger_condition'] = state?.trigger_condition;
            inputs['trigger_condition_paths'] = state?.trigger_condition_paths;
            inputs['trigger_variable_key'] = state?.trigger_variable_key;
            inputs['trigger_variable_value'] = state?.trigger_variable_value;
            inputs['variables'] = state?.variables;
        } else {
            const args = argsOrState as ActionRsyncArgs | undefined;
            if (!args?.project_name) {
                throw new Error('Missing required property "project_name"');
            }

            if (!args?.pipeline_id) {
                throw new Error('Missing required property "pipeline_id"');
            }

            if (!args?.authentication_mode) {
                throw new Error('Missing required property "authentication_mode"');
            }

            if (!args?.host) {
                throw new Error('Missing required property "host"');
            }

            if (!args?.login) {
                throw new Error('Missing required property "login"');
            }

            if (!args?.name) {
                throw new Error('Missing required property "name"');
            }

            if (!args?.password) {
                throw new Error('Missing required property "password"');
            }

            if (!args?.port) {
                throw new Error('Missing required property "port"');
            }

            if (!args?.trigger_time) {
                throw new Error('Missing required property "trigger_time"');
            }

            inputs['authentication_mode'] = args.authentication_mode;
            inputs['host'] = args.host;
            inputs['login'] = args.login;
            inputs['name'] = args.name;
            inputs['password'] = args.password;
            inputs['port'] = args.port;
            inputs['trigger_time'] = args.trigger_time;
            inputs['after_action_id'] = args.after_action_id;
            inputs['archive'] = args.archive;
            inputs['compress'] = args.compress;
            inputs['delete_extra_files'] = args.delete_extra_files;
            inputs['deployment_excludes'] = args.deployment_excludes;
            inputs['deployment_includes'] = args.deployment_includes;
            inputs['dirs'] = args.dirs;
            inputs['disabled'] = args.disabled;
            inputs['input_type'] = args.input_type;
            inputs['local_path'] = args.local_path;
            inputs['recursive'] = args.recursive;
            inputs['remote_path'] = args.remote_path;
            inputs['run_next_parallel'] = args.run_next_parallel;
            inputs['run_only_on_first_failure'] = args.run_only_on_first_failure;
            inputs['timeout'] = args.timeout;
            inputs['trigger_condition'] = args.trigger_condition;
            inputs['trigger_condition_paths'] = args.trigger_condition_paths;
            inputs['trigger_variable_key'] = args.trigger_variable_key;
            inputs['trigger_variable_value'] = args.trigger_variable_value;
            inputs['variables'] = args.variables;
            inputs['project_name'] = args.project_name;
            inputs['pipeline_id'] = args.pipeline_id;
        }

        if (!opts.version) {
            opts.version = require('../package').version;
        }

        opts.ignoreChanges = ['project_name', 'pipeline_id', ...(opts.ignoreChanges || [])];

        inputs['type'] = 'RSYNC';
        inputs['url'] = undefined;
        inputs['html_url'] = undefined;
        inputs['action_id'] = undefined;

        super(Rsync.__pulumiType, name, inputs, opts);
    }
}
