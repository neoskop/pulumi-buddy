import { AsInputs } from '@pulumi-utils/sdk';
import { PipelineProps } from '../pipeline';
import { CustomResource, Input, Output, ID, CustomResourceOptions, Inputs } from '@pulumi/pulumi';
import { Variable, PipelinePermissions, TriggerCondition } from '../common';

export interface SetVariablesState {
    project_name: string;
    pipeline_id: number;
    /**
     * The name of the variable.
     */
    key: string;

    /**
     * The name of the action.
     */
    name: string;

    /**
     * Specifies when the action should be executed. Can be one of `ON_EVERY_EXECUTION`, `ON_FAILURE` or `ON_BACK_TO_SUCCESS`. The default value is `ON_EVERY_EXECUTION`.
     */
    trigger_time: 'ON_EVERY_EXECUTION' | 'ON_FAILURE' | 'ON_BACK_TO_SUCCESS';

    /**
     * The list of existing settable variables.
     */
    variables: Variable[];

    /**
     * The numerical ID of the action, after which this action should be added.
     */
    after_action_id?: number;

    /**
     * The custom comment that will be displayed upon passing arguments.
     */
    comment?: string;

    /**
     * The value of the variable.
     */
    defaults?: string;

    /**
     * When set to 'true' the action is disabled.  By default it is set to 'false'.
     */
    disabled?: boolean;

    /**
     * Encrypted values will not be visible once saved. Can be used for things like passwords.
     */
    encrypted?: boolean;

    /**
     * If set to 'true' the execution will proceed, mark action as a warning and jump to the next action. Doesn't apply to deployment actions.
     */
    ignore_errors?: boolean;

    /**
     * Path to the file with options.
     */
    init_path?: string;

    /**
     * Define to set permissions for the action.
     */
    permissions?: PipelinePermissions;

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
}

export type SetVariablesArgs = AsInputs<SetVariablesState>;

export interface SetVariablesProps {
    url: string;
    html_url: string;
    action_id: number;
    key: string;
    name: string;
    trigger_time: 'ON_EVERY_EXECUTION' | 'ON_FAILURE' | 'ON_BACK_TO_SUCCESS';
    type: 'SET_VARIABLES';
    variables: Variable[];
    after_action_id?: number;
    comment?: string;
    defaults?: string;
    disabled?: boolean;
    encrypted?: boolean;
    ignore_errors?: boolean;
    init_path?: string;
    permissions?: PipelinePermissions;
    retry_count?: number;
    retry_interval?: number;
    run_next_parallel?: boolean;
    run_only_on_first_failure?: boolean;
    timeout?: number;
    trigger_conditions?: TriggerCondition[];
    pipeline: PipelineProps;
    project_name: string;
    pipeline_id: number;
}

/**
 * Required scopes in Buddy API: `WORKSPACE`, `EXECUTION_MANAGE`, `EXECUTION_INFO`
 */
export class SetVariables extends CustomResource {
    static __pulumiType = 'buddy:action:SetVariables';

    static get(name: string, id: Input<ID>, state?: Partial<SetVariablesState>, opts?: CustomResourceOptions) {
        return new SetVariables(name, state as any, { ...opts, id });
    }

    static isInstance(obj: any): obj is SetVariables {
        if (null == obj) {
            return false;
        }

        return obj['__pulumiType'] === SetVariables.__pulumiType;
    }

    project_name!: Output<string>;
    pipeline_id!: Output<number>;
    action_id!: Output<number>;
    key!: Output<string>;
    name!: Output<string>;
    trigger_time!: Output<'ON_EVERY_EXECUTION' | 'ON_FAILURE' | 'ON_BACK_TO_SUCCESS'>;
    type!: Output<'SET_VARIABLES'>;
    variables!: Output<Variable[]>;
    after_action_id!: Output<number | undefined>;
    comment!: Output<string | undefined>;
    defaults!: Output<string | undefined>;
    disabled!: Output<boolean | undefined>;
    encrypted!: Output<boolean | undefined>;
    ignore_errors!: Output<boolean | undefined>;
    init_path!: Output<string | undefined>;
    permissions!: Output<PipelinePermissions | undefined>;
    retry_count!: Output<number | undefined>;
    retry_interval!: Output<number | undefined>;
    run_next_parallel!: Output<boolean | undefined>;
    run_only_on_first_failure!: Output<boolean | undefined>;
    timeout!: Output<number | undefined>;
    trigger_conditions!: Output<TriggerCondition[] | undefined>;

    constructor(name: string, argsOrState: SetVariablesArgs | SetVariablesState, opts?: CustomResourceOptions) {
        const inputs: Inputs = {};
        if (!opts) {
            opts = {};
        }

        if (opts.id) {
            const state = argsOrState as SetVariablesState | undefined;
            inputs['project_name'] = state?.project_name;
            inputs['pipeline_id'] = state?.pipeline_id;
            inputs['key'] = state?.key;
            inputs['name'] = state?.name;
            inputs['trigger_time'] = state?.trigger_time;
            inputs['variables'] = state?.variables;
            inputs['after_action_id'] = state?.after_action_id;
            inputs['comment'] = state?.comment;
            inputs['defaults'] = state?.defaults;
            inputs['disabled'] = state?.disabled;
            inputs['encrypted'] = state?.encrypted;
            inputs['ignore_errors'] = state?.ignore_errors;
            inputs['init_path'] = state?.init_path;
            inputs['permissions'] = state?.permissions;
            inputs['retry_count'] = state?.retry_count;
            inputs['retry_interval'] = state?.retry_interval;
            inputs['run_next_parallel'] = state?.run_next_parallel;
            inputs['run_only_on_first_failure'] = state?.run_only_on_first_failure;
            inputs['timeout'] = state?.timeout;
            inputs['trigger_conditions'] = state?.trigger_conditions;
        } else {
            const args = argsOrState as SetVariablesArgs | undefined;
            if (!args?.project_name) {
                throw new Error('Missing required property "project_name"');
            }

            if (!args?.pipeline_id) {
                throw new Error('Missing required property "pipeline_id"');
            }

            if (!args?.key) {
                throw new Error('Missing required property "key"');
            }

            if (!args?.name) {
                throw new Error('Missing required property "name"');
            }

            if (!args?.trigger_time) {
                throw new Error('Missing required property "trigger_time"');
            }

            if (!args?.variables) {
                throw new Error('Missing required property "variables"');
            }

            inputs['key'] = args.key;
            inputs['name'] = args.name;
            inputs['trigger_time'] = args.trigger_time;
            inputs['variables'] = args.variables;
            inputs['after_action_id'] = args.after_action_id;
            inputs['comment'] = args.comment;
            inputs['defaults'] = args.defaults;
            inputs['disabled'] = args.disabled;
            inputs['encrypted'] = args.encrypted;
            inputs['ignore_errors'] = args.ignore_errors;
            inputs['init_path'] = args.init_path;
            inputs['permissions'] = args.permissions;
            inputs['retry_count'] = args.retry_count;
            inputs['retry_interval'] = args.retry_interval;
            inputs['run_next_parallel'] = args.run_next_parallel;
            inputs['run_only_on_first_failure'] = args.run_only_on_first_failure;
            inputs['timeout'] = args.timeout;
            inputs['trigger_conditions'] = args.trigger_conditions;
            inputs['project_name'] = args.project_name;
            inputs['pipeline_id'] = args.pipeline_id;
        }

        if (!opts.version) {
            opts.version = require('../package').version;
        }

        opts.ignoreChanges = ['project_name', 'pipeline_id', ...(opts.ignoreChanges || [])];

        inputs['type'] = 'SET_VARIABLES';
        inputs['url'] = undefined;
        inputs['html_url'] = undefined;
        inputs['action_id'] = undefined;

        super(SetVariables.__pulumiType, name, inputs, opts);
    }
}
