import { AsInputs } from '@pulumi-utils/sdk';
import { PipelineProps } from '../pipeline';
import { CustomResource, Input, Output, ID, CustomResourceOptions, Inputs } from '@pulumi/pulumi';
import { TriggerCondition, Variable } from '../common';

export interface RsyncState {
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
     * If set to `true` the execution will proceed, mark action as a warning and jump to the next action. Doesn't apply to deployment actions.
     */
    ignore_errors?: boolean;

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

export type RsyncArgs = AsInputs<RsyncState>;

export interface RsyncProps {
    url: string;
    html_url: string;
    action_id: number;
    authentication_mode: 'PASS';
    host: string;
    login: string;
    name: string;
    password: string;
    port: string;
    type: 'RSYNC';
    archive?: boolean;
    compress?: boolean;
    delete_extra_files?: boolean;
    deployment_excludes?: string[];
    deployment_includes?: string[];
    dirs?: boolean;
    disabled?: boolean;
    ignore_errors?: boolean;
    input_type?: 'SCM_REPOSITORY' | 'BUILD_ARTIFACTS';
    local_path?: string;
    recursive?: boolean;
    remote_path?: string;
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
export class Rsync extends CustomResource {
    static __pulumiType = 'buddy:action:Rsync';

    static get(name: string, id: Input<ID>, state?: Partial<RsyncState>, opts?: CustomResourceOptions) {
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
    type!: Output<'RSYNC'>;
    archive!: Output<boolean | undefined>;
    compress!: Output<boolean | undefined>;
    delete_extra_files!: Output<boolean | undefined>;
    deployment_excludes!: Output<string[] | undefined>;
    deployment_includes!: Output<string[] | undefined>;
    dirs!: Output<boolean | undefined>;
    disabled!: Output<boolean | undefined>;
    ignore_errors!: Output<boolean | undefined>;
    input_type!: Output<'SCM_REPOSITORY' | 'BUILD_ARTIFACTS' | undefined>;
    local_path!: Output<string | undefined>;
    recursive!: Output<boolean | undefined>;
    remote_path!: Output<string | undefined>;
    retry_count!: Output<number | undefined>;
    retry_delay!: Output<number | undefined>;
    run_next_parallel!: Output<boolean | undefined>;
    run_only_on_first_failure!: Output<boolean | undefined>;
    timeout!: Output<number | undefined>;
    trigger_conditions!: Output<TriggerCondition[] | undefined>;
    variables!: Output<Variable[] | undefined>;

    constructor(name: string, argsOrState: RsyncArgs | RsyncState, opts?: CustomResourceOptions) {
        const inputs: Inputs = {};
        if (!opts) {
            opts = {};
        }

        if (opts.id) {
            const state = argsOrState as RsyncState | undefined;
            inputs['project_name'] = state?.project_name;
            inputs['pipeline_id'] = state?.pipeline_id;
            inputs['authentication_mode'] = state?.authentication_mode;
            inputs['host'] = state?.host;
            inputs['login'] = state?.login;
            inputs['name'] = state?.name;
            inputs['password'] = state?.password;
            inputs['port'] = state?.port;
            inputs['archive'] = state?.archive;
            inputs['compress'] = state?.compress;
            inputs['delete_extra_files'] = state?.delete_extra_files;
            inputs['deployment_excludes'] = state?.deployment_excludes;
            inputs['deployment_includes'] = state?.deployment_includes;
            inputs['dirs'] = state?.dirs;
            inputs['disabled'] = state?.disabled;
            inputs['ignore_errors'] = state?.ignore_errors;
            inputs['input_type'] = state?.input_type;
            inputs['local_path'] = state?.local_path;
            inputs['recursive'] = state?.recursive;
            inputs['remote_path'] = state?.remote_path;
            inputs['retry_count'] = state?.retry_count;
            inputs['retry_delay'] = state?.retry_delay;
            inputs['run_next_parallel'] = state?.run_next_parallel;
            inputs['run_only_on_first_failure'] = state?.run_only_on_first_failure;
            inputs['timeout'] = state?.timeout;
            inputs['trigger_conditions'] = state?.trigger_conditions;
            inputs['variables'] = state?.variables;
        } else {
            const args = argsOrState as RsyncArgs | undefined;
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

            inputs['authentication_mode'] = args.authentication_mode;
            inputs['host'] = args.host;
            inputs['login'] = args.login;
            inputs['name'] = args.name;
            inputs['password'] = args.password;
            inputs['port'] = args.port;
            inputs['archive'] = args.archive;
            inputs['compress'] = args.compress;
            inputs['delete_extra_files'] = args.delete_extra_files;
            inputs['deployment_excludes'] = args.deployment_excludes;
            inputs['deployment_includes'] = args.deployment_includes;
            inputs['dirs'] = args.dirs;
            inputs['disabled'] = args.disabled;
            inputs['ignore_errors'] = args.ignore_errors;
            inputs['input_type'] = args.input_type;
            inputs['local_path'] = args.local_path;
            inputs['recursive'] = args.recursive;
            inputs['remote_path'] = args.remote_path;
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

        inputs['type'] = 'RSYNC';
        inputs['url'] = undefined;
        inputs['html_url'] = undefined;
        inputs['action_id'] = undefined;

        super(Rsync.__pulumiType, name, inputs, opts);
    }
}
