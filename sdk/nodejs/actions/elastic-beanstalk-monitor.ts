import { AsInputs } from '../utils';
import { PipelineProps } from '../pipeline';
import { CustomResource, Input, Output, ID, CustomResourceOptions, Inputs } from '@pulumi/pulumi';

export interface ActionElasticBeanstalkMonitorState {
    project_name: string;
    pipeline_id: number;
}

export type ActionElasticBeanstalkMonitorArgs = AsInputs<ActionElasticBeanstalkMonitorState>;

export interface ActionElasticBeanstalkMonitorProps {
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
export class ElasticBeanstalkMonitor extends CustomResource {
    static __pulumiType = 'buddy:action:ElasticBeanstalkMonitor';

    static get(name: string, id: Input<ID>, state?: Partial<ActionElasticBeanstalkMonitorState>, opts?: CustomResourceOptions) {
        return new ElasticBeanstalkMonitor(name, state as any, { ...opts, id });
    }

    static isInstance(obj: any): obj is ElasticBeanstalkMonitor {
        if (null == obj) {
            return false;
        }

        return obj['__pulumiType'] === ElasticBeanstalkMonitor.__pulumiType;
    }

    project_name!: Output<string>;
    pipeline_id!: Output<number>;
    action_id!: Output<number>;

    constructor(
        name: string,
        argsOrState: ActionElasticBeanstalkMonitorArgs | ActionElasticBeanstalkMonitorState,
        opts?: CustomResourceOptions
    ) {
        const inputs: Inputs = {};
        if (!opts) {
            opts = {};
        }

        if (opts.id) {
            const state = argsOrState as ActionElasticBeanstalkMonitorState | undefined;
            inputs['project_name'] = state?.project_name;
            inputs['pipeline_id'] = state?.pipeline_id;
        } else {
            const args = argsOrState as ActionElasticBeanstalkMonitorArgs | undefined;
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

        inputs['type'] = 'MONITOR';
        inputs['url'] = undefined;
        inputs['html_url'] = undefined;
        inputs['action_id'] = undefined;

        super(ElasticBeanstalkMonitor.__pulumiType, name, inputs, opts);
    }
}
