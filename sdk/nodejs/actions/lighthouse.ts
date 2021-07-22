import { AsInputs } from '@pulumi-utils/sdk';
import { PipelineProps } from '../pipeline';
import { CustomResource, Input, Output, ID, CustomResourceOptions, Inputs } from '@pulumi/pulumi';
import { TriggerCondition, Variable } from '../common';

export interface LighthouseState {
    project_name: string;
    pipeline_id: number;
    /**
     * Values from 0 to 100 are accepted. The action returns an error if the score is below the values that are set.
     */
    accessibility: number;

    /**
     * Values from 0 to 100 are accepted. The action returns an error if the score is below the values that are set.
     */
    best_practices: number;

    /**
     * The device on which the audit will be run. Can be one of `mobile`, `desktop` and `mobileDesktop`.
     */
    device: string;

    /**
     * The name of the action.
     */
    name: string;

    /**
     * Values from 0 to 100 are accepted. The action returns an error if the score is below the values that are set.
     */
    performance: number;

    /**
     * Values from 0 to 100 are accepted. The action returns an error if the score is below the values that are set.
     */
    seo: number;

    /**
     * The address of the site on which the audit should run.
     */
    website: string;

    /**
     * When set to `true` the action is disabled.  By default it is set to `false`.
     */
    disabled?: boolean;

    /**
     * If set to `true` the execution will proceed, mark action as a warning and jump to the next action. Doesn't apply to deployment actions.
     */
    ignore_errors?: boolean;

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

export type LighthouseArgs = AsInputs<LighthouseState>;

export interface LighthouseProps {
    url: string;
    html_url: string;
    action_id: number;
    accessibility: number;
    best_practices: number;
    device: string;
    name: string;
    performance: number;
    seo: number;
    type: 'LIGHTHOUSE';
    website: string;
    disabled?: boolean;
    ignore_errors?: boolean;
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
export class Lighthouse extends CustomResource {
    static __pulumiType = 'buddy:action:Lighthouse';

    static get(name: string, id: Input<ID>, state?: Partial<LighthouseState>, opts?: CustomResourceOptions) {
        return new Lighthouse(name, state as any, { ...opts, id });
    }

    static isInstance(obj: any): obj is Lighthouse {
        if (null == obj) {
            return false;
        }

        return obj['__pulumiType'] === Lighthouse.__pulumiType;
    }

    project_name!: Output<string>;
    pipeline_id!: Output<number>;
    action_id!: Output<number>;
    accessibility!: Output<number>;
    best_practices!: Output<number>;
    device!: Output<string>;
    name!: Output<string>;
    performance!: Output<number>;
    seo!: Output<number>;
    type!: Output<'LIGHTHOUSE'>;
    website!: Output<string>;
    disabled!: Output<boolean | undefined>;
    ignore_errors!: Output<boolean | undefined>;
    retry_count!: Output<number | undefined>;
    retry_delay!: Output<number | undefined>;
    run_next_parallel!: Output<boolean | undefined>;
    run_only_on_first_failure!: Output<boolean | undefined>;
    timeout!: Output<number | undefined>;
    trigger_conditions!: Output<TriggerCondition[] | undefined>;
    variables!: Output<Variable[] | undefined>;

    constructor(name: string, argsOrState: LighthouseArgs | LighthouseState, opts?: CustomResourceOptions) {
        const inputs: Inputs = {};
        if (!opts) {
            opts = {};
        }

        if (opts.id) {
            const state = argsOrState as LighthouseState | undefined;
            inputs['project_name'] = state?.project_name;
            inputs['pipeline_id'] = state?.pipeline_id;
            inputs['accessibility'] = state?.accessibility;
            inputs['best_practices'] = state?.best_practices;
            inputs['device'] = state?.device;
            inputs['name'] = state?.name;
            inputs['performance'] = state?.performance;
            inputs['seo'] = state?.seo;
            inputs['website'] = state?.website;
            inputs['disabled'] = state?.disabled;
            inputs['ignore_errors'] = state?.ignore_errors;
            inputs['retry_count'] = state?.retry_count;
            inputs['retry_delay'] = state?.retry_delay;
            inputs['run_next_parallel'] = state?.run_next_parallel;
            inputs['run_only_on_first_failure'] = state?.run_only_on_first_failure;
            inputs['timeout'] = state?.timeout;
            inputs['trigger_conditions'] = state?.trigger_conditions;
            inputs['variables'] = state?.variables;
        } else {
            const args = argsOrState as LighthouseArgs | undefined;
            if (!args?.project_name) {
                throw new Error('Missing required property "project_name"');
            }

            if (!args?.pipeline_id) {
                throw new Error('Missing required property "pipeline_id"');
            }

            if (!args?.accessibility) {
                throw new Error('Missing required property "accessibility"');
            }

            if (!args?.best_practices) {
                throw new Error('Missing required property "best_practices"');
            }

            if (!args?.device) {
                throw new Error('Missing required property "device"');
            }

            if (!args?.name) {
                throw new Error('Missing required property "name"');
            }

            if (!args?.performance) {
                throw new Error('Missing required property "performance"');
            }

            if (!args?.seo) {
                throw new Error('Missing required property "seo"');
            }

            if (!args?.website) {
                throw new Error('Missing required property "website"');
            }

            inputs['accessibility'] = args.accessibility;
            inputs['best_practices'] = args.best_practices;
            inputs['device'] = args.device;
            inputs['name'] = args.name;
            inputs['performance'] = args.performance;
            inputs['seo'] = args.seo;
            inputs['website'] = args.website;
            inputs['disabled'] = args.disabled;
            inputs['ignore_errors'] = args.ignore_errors;
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

        inputs['type'] = 'LIGHTHOUSE';
        inputs['url'] = undefined;
        inputs['html_url'] = undefined;
        inputs['action_id'] = undefined;

        super(Lighthouse.__pulumiType, name, inputs, opts);
    }
}
