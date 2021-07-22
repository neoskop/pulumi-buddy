import { AsInputs } from '@pulumi-utils/sdk';
import { PipelineProps } from '../pipeline';
import { CustomResource, Input, Output, ID, CustomResourceOptions, Inputs } from '@pulumi/pulumi';
import { TriggerCondition, Variable } from '../common';

export interface DockerfileLinterState {
    project_name: string;
    pipeline_id: number;
    /**
     * The name of the action.
     */
    name: string;

    /**
     * When set to `true` the action is disabled.  By default it is set to `false`.
     */
    disabled?: boolean;

    /**
     * The errors that will be ignored by linter. You can find the error codes below or use ShellCheck.
     */
    ignore_codes?: string;

    /**
     * If set to `true` the execution will proceed, mark action as a warning and jump to the next action. Doesn't apply to deployment actions.
     */
    ignore_errors?: boolean;

    /**
     * The path to the yaml file with ignores.
     */
    ignores_path?: string;

    /**
     * The path from which a Dockerfile is chosen.
     */
    local_path?: string;

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
     * Type of shell in which the errors will be detected. Available values: `sh`, `bash`, `dash`, `ksh`
     */
    shell_type?: string;

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

export type DockerfileLinterArgs = AsInputs<DockerfileLinterState>;

export interface DockerfileLinterProps {
    url: string;
    html_url: string;
    action_id: number;
    name: string;
    type: 'DOCKERFILE_LINTER';
    disabled?: boolean;
    ignore_codes?: string;
    ignore_errors?: boolean;
    ignores_path?: string;
    local_path?: string;
    retry_count?: number;
    retry_delay?: number;
    run_next_parallel?: boolean;
    run_only_on_first_failure?: boolean;
    shell_type?: string;
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
export class DockerfileLinter extends CustomResource {
    static __pulumiType = 'buddy:action:DockerfileLinter';

    static get(name: string, id: Input<ID>, state?: Partial<DockerfileLinterState>, opts?: CustomResourceOptions) {
        return new DockerfileLinter(name, state as any, { ...opts, id });
    }

    static isInstance(obj: any): obj is DockerfileLinter {
        if (null == obj) {
            return false;
        }

        return obj['__pulumiType'] === DockerfileLinter.__pulumiType;
    }

    project_name!: Output<string>;
    pipeline_id!: Output<number>;
    action_id!: Output<number>;
    name!: Output<string>;
    type!: Output<'DOCKERFILE_LINTER'>;
    disabled!: Output<boolean | undefined>;
    ignore_codes!: Output<string | undefined>;
    ignore_errors!: Output<boolean | undefined>;
    ignores_path!: Output<string | undefined>;
    local_path!: Output<string | undefined>;
    retry_count!: Output<number | undefined>;
    retry_delay!: Output<number | undefined>;
    run_next_parallel!: Output<boolean | undefined>;
    run_only_on_first_failure!: Output<boolean | undefined>;
    shell_type!: Output<string | undefined>;
    timeout!: Output<number | undefined>;
    trigger_conditions!: Output<TriggerCondition[] | undefined>;
    variables!: Output<Variable[] | undefined>;

    constructor(name: string, argsOrState: DockerfileLinterArgs | DockerfileLinterState, opts?: CustomResourceOptions) {
        const inputs: Inputs = {};
        if (!opts) {
            opts = {};
        }

        if (opts.id) {
            const state = argsOrState as DockerfileLinterState | undefined;
            inputs['project_name'] = state?.project_name;
            inputs['pipeline_id'] = state?.pipeline_id;
            inputs['name'] = state?.name;
            inputs['disabled'] = state?.disabled;
            inputs['ignore_codes'] = state?.ignore_codes;
            inputs['ignore_errors'] = state?.ignore_errors;
            inputs['ignores_path'] = state?.ignores_path;
            inputs['local_path'] = state?.local_path;
            inputs['retry_count'] = state?.retry_count;
            inputs['retry_delay'] = state?.retry_delay;
            inputs['run_next_parallel'] = state?.run_next_parallel;
            inputs['run_only_on_first_failure'] = state?.run_only_on_first_failure;
            inputs['shell_type'] = state?.shell_type;
            inputs['timeout'] = state?.timeout;
            inputs['trigger_conditions'] = state?.trigger_conditions;
            inputs['variables'] = state?.variables;
        } else {
            const args = argsOrState as DockerfileLinterArgs | undefined;
            if (!args?.project_name) {
                throw new Error('Missing required property "project_name"');
            }

            if (!args?.pipeline_id) {
                throw new Error('Missing required property "pipeline_id"');
            }

            if (!args?.name) {
                throw new Error('Missing required property "name"');
            }

            inputs['name'] = args.name;
            inputs['disabled'] = args.disabled;
            inputs['ignore_codes'] = args.ignore_codes;
            inputs['ignore_errors'] = args.ignore_errors;
            inputs['ignores_path'] = args.ignores_path;
            inputs['local_path'] = args.local_path;
            inputs['retry_count'] = args.retry_count;
            inputs['retry_delay'] = args.retry_delay;
            inputs['run_next_parallel'] = args.run_next_parallel;
            inputs['run_only_on_first_failure'] = args.run_only_on_first_failure;
            inputs['shell_type'] = args.shell_type;
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

        inputs['type'] = 'DOCKERFILE_LINTER';
        inputs['url'] = undefined;
        inputs['html_url'] = undefined;
        inputs['action_id'] = undefined;

        super(DockerfileLinter.__pulumiType, name, inputs, opts);
    }
}
