import { AsInputs } from '../utils';
import { PipelineProps } from '../pipeline';
import { CustomResource, Input, Output, ID, CustomResourceOptions, Inputs } from '@pulumi/pulumi';

export interface ActionGitPushState {
    project_name: string;
    pipeline_id: number;
}

export type ActionGitPushArgs = AsInputs<ActionGitPushState>;

export interface ActionGitPushProps {
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

    constructor(name: string, argsOrState: ActionGitPushArgs | ActionGitPushState, opts?: CustomResourceOptions) {
        const inputs: Inputs = {};
        if (!opts) {
            opts = {};
        }

        if (opts.id) {
            const state = argsOrState as ActionGitPushState | undefined;
            inputs['project_name'] = state?.project_name;
            inputs['pipeline_id'] = state?.pipeline_id;
        } else {
            const args = argsOrState as ActionGitPushArgs | undefined;
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

        inputs['type'] = 'PUSH';
        inputs['url'] = undefined;
        inputs['html_url'] = undefined;
        inputs['action_id'] = undefined;

        super(GitPush.__pulumiType, name, inputs, opts);
    }
}
