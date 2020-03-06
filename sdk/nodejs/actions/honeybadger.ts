import { AsInputs } from '../utils';
import { PipelineProps } from '../pipeline';
import { CustomResource, Input, Output, ID, CustomResourceOptions, Inputs } from '@pulumi/pulumi';

export interface ActionHoneybadgerState {
    project_name: string;
    pipeline_id: number;
}

export type ActionHoneybadgerArgs = AsInputs<ActionHoneybadgerState>;

export interface ActionHoneybadgerProps {
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
export class Honeybadger extends CustomResource {
    static __pulumiType = 'buddy:action:Honeybadger';

    static get(name: string, id: Input<ID>, state?: Partial<ActionHoneybadgerState>, opts?: CustomResourceOptions) {
        return new Honeybadger(name, state as any, { ...opts, id });
    }

    static isInstance(obj: any): obj is Honeybadger {
        if (null == obj) {
            return false;
        }

        return obj['__pulumiType'] === Honeybadger.__pulumiType;
    }

    project_name!: Output<string>;
    pipeline_id!: Output<number>;
    action_id!: Output<number>;

    constructor(name: string, argsOrState: ActionHoneybadgerArgs | ActionHoneybadgerState, opts?: CustomResourceOptions) {
        const inputs: Inputs = {};
        if (!opts) {
            opts = {};
        }

        if (opts.id) {
            const state = argsOrState as ActionHoneybadgerState | undefined;
            inputs['project_name'] = state?.project_name;
            inputs['pipeline_id'] = state?.pipeline_id;
        } else {
            const args = argsOrState as ActionHoneybadgerArgs | undefined;
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

        inputs['type'] = 'HONEYBADGER';
        inputs['url'] = undefined;
        inputs['html_url'] = undefined;
        inputs['action_id'] = undefined;

        super(Honeybadger.__pulumiType, name, inputs, opts);
    }
}
