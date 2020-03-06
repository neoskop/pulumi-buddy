import { AsInputs } from '../utils';
import { PipelineProps } from '../pipeline';
import { CustomResource, Input, Output, ID, CustomResourceOptions, Inputs } from '@pulumi/pulumi';

export interface ActionBugsnagState {
    project_name: string;
    pipeline_id: number;
}

export type ActionBugsnagArgs = AsInputs<ActionBugsnagState>;

export interface ActionBugsnagProps {
    url: string;
    html_url: string;
    action_id: number;
    pipeline: PipelineProps;
    project_name: string;
    pipeline_id: number;
}

/**
 * Required scopes in Buddy API: `WORKSPACE`, `EXECUTION_MANAGE`, `EXECUTION_INFO`
 */
export class Bugsnag extends CustomResource {
    static __pulumiType = 'buddy:action:Bugsnag';

    static get(name: string, id: Input<ID>, state?: Partial<ActionBugsnagState>, opts?: CustomResourceOptions) {
        return new Bugsnag(name, state as any, { ...opts, id });
    }

    static isInstance(obj: any): obj is Bugsnag {
        if (null == obj) {
            return false;
        }

        return obj['__pulumiType'] === Bugsnag.__pulumiType;
    }

    project_name!: Output<string>;
    pipeline_id!: Output<number>;
    action_id!: Output<number>;

    constructor(name: string, argsOrState: ActionBugsnagArgs | ActionBugsnagState, opts?: CustomResourceOptions) {
        const inputs: Inputs = {};
        if (!opts) {
            opts = {};
        }

        if (opts.id) {
            const state = argsOrState as ActionBugsnagState | undefined;
            inputs['project_name'] = state?.project_name;
            inputs['pipeline_id'] = state?.pipeline_id;
        } else {
            const args = argsOrState as ActionBugsnagArgs | undefined;
            if (!args?.project_name) {
                throw new Error('Missing required property "project_name"');
            }

            if (!args?.pipeline_id) {
                throw new Error('Missing required property "pipeline_id"');
            }

            inputs['project_name'] = args.project_name;
            inputs['pipeline_id'] = args.pipeline_id;
        }

        if (!opts.version) {
            opts.version = require('../package').version;
        }

        opts.ignoreChanges = ['project_name', 'pipeline_id', ...(opts.ignoreChanges || [])];

        inputs['type'] = 'BUGSNAG';
        inputs['url'] = undefined;
        inputs['html_url'] = undefined;
        inputs['action_id'] = undefined;

        super(Bugsnag.__pulumiType, name, inputs, opts);
    }
}
