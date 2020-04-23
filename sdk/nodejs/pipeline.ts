import { CustomResource, CustomResourceOptions, ID, Input, Inputs, Output } from '@pulumi/pulumi';
import { AsInputs, AsOutputs } from '@pulumi-utils/sdk';
import { ProjectProps } from './project';
import { MemberProps } from './member';
import { ActionProps } from './actions';

export type TriggerMode = 'MANUAL' | 'SCHEDULED' | 'ON_EVERY_PUSH';
export type RefType = 'BRANCH' | 'TAG' | 'WILDCARD' | 'PULL_REQUEST' | 'NONE';

export interface PipelineState {
    project_name: string;
    name: string;
    ref_name: string;
    trigger_mode: TriggerMode;
    ref_type?: RefType;
    always_from_scratch?: boolean;
    auto_clear_cache?: boolean;
    no_skip_to_most_recent?: boolean;
    do_not_create_commit_status?: boolean;
    start_date?: string;
    delay?: number;
    cron?: string;
    run_always?: boolean;
    paused?: boolean;
    ignore_fail_on_project_status?: boolean;
    execution_message_template?: string;
}

export type PipelineArgs = AsInputs<PipelineState>;

export interface PipelineProps {
    url: string;
    html_url: string;
    name: string;
    trigger_mode: string;
    ref_type: string;
    ref_name: string;
    execution_message_template: string;
    last_execution_status: string;
    last_execution_revision: string | null;
    create_date: string;
    always_from_scratch: boolean;
    auto_clear_cache: boolean;
    no_skip_to_most_recent: boolean;
    do_not_create_commit_status: boolean;
    ignore_fail_on_project_status: boolean;
    start_date?: string;
    delay?: number;
    cron?: string;
    run_always?: boolean;
    paused?: boolean;
    project: ProjectProps;
    creator: MemberProps;
    actions: ActionProps[];

    pipeline_id: number;
    project_name: string;
}

/**
 * Required scopes in Buddy API: `WORKSPACE`, `EXECUTION_MANAGE`, `EXECUTION_INFO`
 */
export class Pipeline extends CustomResource implements AsOutputs<PipelineProps> {
    static __pulumiType = 'buddy:pipeline:Pipeline';

    static get(name: string, id: Input<ID>, state?: Partial<PipelineState>, opts?: CustomResourceOptions) {
        return new Pipeline(name, state as any, { ...opts, id });
    }

    static isInstance(obj: any): obj is Pipeline {
        if (null == obj) {
            return false;
        }
        return obj['__pulumiType'] === Pipeline.__pulumiType;
    }

    readonly url!: Output<string>;
    readonly html_url!: Output<string>;
    readonly name!: Output<string>;
    readonly pipeline_id!: Output<number>;
    readonly always_from_scratch!: Output<boolean>;
    readonly auto_clear_cache!: Output<boolean>;
    readonly cron!: Output<string | undefined>;
    readonly delay!: Output<number | undefined>;
    readonly do_not_create_commit_status!: Output<boolean>;
    readonly execution_message_template!: Output<string>;
    readonly ignore_fail_on_project_status!: Output<boolean>;
    readonly no_skip_to_most_recent!: Output<boolean>;
    readonly paused!: Output<boolean | undefined>;
    readonly project_name!: Output<string>;
    readonly ref_name!: Output<string>;
    readonly ref_type!: Output<RefType>;
    readonly run_always!: Output<boolean | undefined>;
    readonly start_date!: Output<string | undefined>;
    readonly trigger_mode!: Output<TriggerMode>;
    readonly create_date!: Output<string>;
    readonly last_execution_status!: Output<string>;
    readonly last_execution_revision!: Output<string>;
    readonly project!: Output<PipelineProps['project']>;
    readonly creator!: Output<PipelineProps['creator']>;
    readonly actions!: Output<PipelineProps['actions']>;

    constructor(name: string, argsOrState: PipelineArgs | PipelineState, opts?: CustomResourceOptions) {
        const inputs: Inputs = {};
        if (!opts) {
            opts = {};
        }
        if (opts.id) {
            const state = argsOrState as PipelineState | undefined;
            inputs['project_name'] = state?.project_name;
            inputs['name'] = state?.name;
            inputs['ref_name'] = state?.ref_name;
            inputs['trigger_mode'] = state?.trigger_mode;
            inputs['ref_type'] = state?.ref_type;
            inputs['always_from_scratch'] = state?.always_from_scratch;
            inputs['auto_clear_cache'] = state?.auto_clear_cache;
            inputs['no_skip_to_most_recent'] = state?.no_skip_to_most_recent;
            inputs['do_not_create_commit_status'] = state?.do_not_create_commit_status;
            inputs['start_date'] = state?.start_date;
            inputs['delay'] = state?.delay;
            inputs['cron'] = state?.cron;
            inputs['run_always'] = state?.run_always;
            inputs['paused'] = state?.paused;
            inputs['ignore_fail_on_project_status'] = state?.ignore_fail_on_project_status;
            inputs['execution_message_template'] = state?.execution_message_template;
        } else {
            const args = argsOrState as PipelineState | undefined;
            if (!args || !args.project_name) {
                throw new Error('Missing required property "project_name"');
            }
            if (!args.name) {
                throw new Error('Missing required property "name"');
            }
            if (!args.ref_name) {
                throw new Error('Missing required property "ref_name"');
            }
            if (!args.trigger_mode) {
                throw new Error('Missing required property "trigger_mode"');
            }
            if (args.trigger_mode === 'SCHEDULED' && !args.cron && (!args.start_date || !args.delay)) {
                throw new Error('Missing required property "cron" or "start_date" and "delay"');
            }
            inputs['project_name'] = args?.project_name;
            inputs['name'] = args?.name;
            inputs['ref_name'] = args?.ref_name;
            inputs['trigger_mode'] = args?.trigger_mode;
            inputs['ref_type'] = args?.ref_type;
            inputs['always_from_scratch'] = args?.always_from_scratch;
            inputs['auto_clear_cache'] = args?.auto_clear_cache;
            inputs['no_skip_to_most_recent'] = args?.no_skip_to_most_recent;
            inputs['do_not_create_commit_status'] = args?.do_not_create_commit_status;
            inputs['start_date'] = args?.start_date;
            inputs['delay'] = args?.delay;
            inputs['cron'] = args?.cron;
            inputs['run_always'] = args?.run_always;
            inputs['paused'] = args?.paused;
            inputs['ignore_fail_on_project_status'] = args?.ignore_fail_on_project_status;
            inputs['execution_message_template'] = args?.execution_message_template;
        }

        if (!opts.version) {
            opts.version = require('./package').version;
        }

        opts.ignoreChanges = ['project_name', ...(opts.ignoreChanges || [])];

        inputs['url'] = undefined;
        inputs['html_url'] = undefined;
        inputs['pipeline_id'] = undefined;
        inputs['create_date'] = undefined;
        inputs['last_execution_status'] = undefined;
        inputs['last_execution_revision'] = undefined;
        inputs['project'] = undefined;
        inputs['creator'] = undefined;
        inputs['actions'] = undefined;

        super(Pipeline.__pulumiType, name, inputs, opts);
    }
}
