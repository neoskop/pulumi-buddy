import { AsInputs } from '../utils';
import { PipelineProps } from '../pipeline';
import { CustomResource, Input, Output, ID, CustomResourceOptions, Inputs } from '@pulumi/pulumi';

export interface ActionBuildDockerfileState {
    project_name: string;
    pipeline_id: number;
}

export type ActionBuildDockerfileArgs = AsInputs<ActionBuildDockerfileState>;

export interface ActionBuildDockerfileProps {
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
export class BuildDockerfile extends CustomResource {
    static __pulumiType = 'buddy:action:BuildDockerfile';

    static get(name: string, id: Input<ID>, state?: Partial<ActionBuildDockerfileState>, opts?: CustomResourceOptions) {
        return new BuildDockerfile(name, state as any, { ...opts, id });
    }

    static isInstance(obj: any): obj is BuildDockerfile {
        if (null == obj) {
            return false;
        }

        return obj['__pulumiType'] === BuildDockerfile.__pulumiType;
    }

    project_name!: Output<string>;
    pipeline_id!: Output<number>;
    action_id!: Output<number>;

    constructor(name: string, argsOrState: ActionBuildDockerfileArgs | ActionBuildDockerfileState, opts?: CustomResourceOptions) {
        const inputs: Inputs = {};
        if (!opts) {
            opts = {};
        }

        if (opts.id) {
            const state = argsOrState as ActionBuildDockerfileState | undefined;
            inputs['project_name'] = state?.project_name;
            inputs['pipeline_id'] = state?.pipeline_id;
        } else {
            const args = argsOrState as ActionBuildDockerfileArgs | undefined;
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

        inputs['type'] = 'DOCKERFILE';
        inputs['url'] = undefined;
        inputs['html_url'] = undefined;
        inputs['action_id'] = undefined;

        super(BuildDockerfile.__pulumiType, name, inputs, opts);
    }
}
