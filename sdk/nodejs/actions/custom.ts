import { AsInputs } from '@pulumi-utils/sdk';
import { PipelineProps } from '../pipeline';
import { CustomResource, Input, Output, ID, CustomResourceOptions, Inputs } from '@pulumi/pulumi';
import { CustomInput, TriggerCondition, Variable } from '../common';

export interface CustomState {
    project_name: string;
    pipeline_id: number;
    /**
     * The action's name from the Custom Action definition. Can include tag (see: example). If not included, it's set to latest on default.
     */
    custom_type: string;

    /**
     * The name of the action.
     */
    name: string;

    /**
     * Specifies when the action should be executed. Can be one of `ON_EVERY_EXECUTION`, `ON_FAILURE` or `ON_BACK_TO_SUCCESS`. The default value is `ON_EVERY_EXECUTION`.
     */
    trigger_time: 'ON_EVERY_EXECUTION' | 'ON_FAILURE' | 'ON_BACK_TO_SUCCESS';

    /**
     * The numerical ID of the action, after which this action should be added.
     */
    after_action_id?: number;

    /**
     * When set to 'true' the action is disabled.  By default it is set to 'false'.
     */
    disabled?: boolean;

    /**
     * Defines whether the action has access to the filesystem. `Required` if `volume_mappings` is defined within the action's definition. Set to `false` on default.
     */
    filesystem_access?: boolean;

    /**
     * If set to 'true' the execution will proceed, mark action as a warning and jump to the next action. Doesn't apply to deployment actions.
     */
    ignore_errors?: boolean;

    /**
     * The list of objects including fields `id` and `value` with the input's name and its value.
     */
    inputs?: CustomInput[];

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
     * Defines whether the action has access to the environment variables. Set to `true` on default.
     */
    variable_access?: boolean;

    /**
     * The list of variables you can use the action.
     */
    variables?: Variable[];
}

export type CustomArgs = AsInputs<CustomState>;

export interface CustomProps {
    url: string;
    html_url: string;
    action_id: number;
    custom_type: string;
    name: string;
    trigger_time: 'ON_EVERY_EXECUTION' | 'ON_FAILURE' | 'ON_BACK_TO_SUCCESS';
    type: 'CUSTOM';
    after_action_id?: number;
    disabled?: boolean;
    filesystem_access?: boolean;
    ignore_errors?: boolean;
    inputs?: CustomInput[];
    retry_count?: number;
    retry_interval?: number;
    run_next_parallel?: boolean;
    run_only_on_first_failure?: boolean;
    timeout?: number;
    trigger_conditions?: TriggerCondition[];
    variable_access?: boolean;
    variables?: Variable[];
    pipeline: PipelineProps;
    project_name: string;
    pipeline_id: number;
}

/**
 * Required scopes in Buddy API: `WORKSPACE`, `EXECUTION_MANAGE`, `EXECUTION_INFO`
 */
export class Custom extends CustomResource {
    static __pulumiType = 'buddy:action:Custom';

    static get(name: string, id: Input<ID>, state?: Partial<CustomState>, opts?: CustomResourceOptions) {
        return new Custom(name, state as any, { ...opts, id });
    }

    static isInstance(obj: any): obj is Custom {
        if (null == obj) {
            return false;
        }

        return obj['__pulumiType'] === Custom.__pulumiType;
    }

    project_name!: Output<string>;
    pipeline_id!: Output<number>;
    action_id!: Output<number>;
    custom_type!: Output<string>;
    name!: Output<string>;
    trigger_time!: Output<'ON_EVERY_EXECUTION' | 'ON_FAILURE' | 'ON_BACK_TO_SUCCESS'>;
    type!: Output<'CUSTOM'>;
    after_action_id!: Output<number | undefined>;
    disabled!: Output<boolean | undefined>;
    filesystem_access!: Output<boolean | undefined>;
    ignore_errors!: Output<boolean | undefined>;
    inputs!: Output<CustomInput[] | undefined>;
    retry_count!: Output<number | undefined>;
    retry_interval!: Output<number | undefined>;
    run_next_parallel!: Output<boolean | undefined>;
    run_only_on_first_failure!: Output<boolean | undefined>;
    timeout!: Output<number | undefined>;
    trigger_conditions!: Output<TriggerCondition[] | undefined>;
    variable_access!: Output<boolean | undefined>;
    variables!: Output<Variable[] | undefined>;

    constructor(name: string, argsOrState: CustomArgs | CustomState, opts?: CustomResourceOptions) {
        const inputs: Inputs = {};
        if (!opts) {
            opts = {};
        }

        if (opts.id) {
            const state = argsOrState as CustomState | undefined;
            inputs['project_name'] = state?.project_name;
            inputs['pipeline_id'] = state?.pipeline_id;
            inputs['custom_type'] = state?.custom_type;
            inputs['name'] = state?.name;
            inputs['trigger_time'] = state?.trigger_time;
            inputs['after_action_id'] = state?.after_action_id;
            inputs['disabled'] = state?.disabled;
            inputs['filesystem_access'] = state?.filesystem_access;
            inputs['ignore_errors'] = state?.ignore_errors;
            inputs['inputs'] = state?.inputs;
            inputs['retry_count'] = state?.retry_count;
            inputs['retry_interval'] = state?.retry_interval;
            inputs['run_next_parallel'] = state?.run_next_parallel;
            inputs['run_only_on_first_failure'] = state?.run_only_on_first_failure;
            inputs['timeout'] = state?.timeout;
            inputs['trigger_conditions'] = state?.trigger_conditions;
            inputs['variable_access'] = state?.variable_access;
            inputs['variables'] = state?.variables;
        } else {
            const args = argsOrState as CustomArgs | undefined;
            if (!args?.project_name) {
                throw new Error('Missing required property "project_name"');
            }

            if (!args?.pipeline_id) {
                throw new Error('Missing required property "pipeline_id"');
            }

            if (!args?.custom_type) {
                throw new Error('Missing required property "custom_type"');
            }

            if (!args?.name) {
                throw new Error('Missing required property "name"');
            }

            if (!args?.trigger_time) {
                throw new Error('Missing required property "trigger_time"');
            }

            inputs['custom_type'] = args.custom_type;
            inputs['name'] = args.name;
            inputs['trigger_time'] = args.trigger_time;
            inputs['after_action_id'] = args.after_action_id;
            inputs['disabled'] = args.disabled;
            inputs['filesystem_access'] = args.filesystem_access;
            inputs['ignore_errors'] = args.ignore_errors;
            inputs['inputs'] = args.inputs;
            inputs['retry_count'] = args.retry_count;
            inputs['retry_interval'] = args.retry_interval;
            inputs['run_next_parallel'] = args.run_next_parallel;
            inputs['run_only_on_first_failure'] = args.run_only_on_first_failure;
            inputs['timeout'] = args.timeout;
            inputs['trigger_conditions'] = args.trigger_conditions;
            inputs['variable_access'] = args.variable_access;
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

        inputs['type'] = 'CUSTOM';
        inputs['url'] = undefined;
        inputs['html_url'] = undefined;
        inputs['action_id'] = undefined;

        super(Custom.__pulumiType, name, inputs, opts);
    }
}
