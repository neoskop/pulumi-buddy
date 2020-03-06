import { AsInputs } from '../utils';
import { PipelineProps } from '../pipeline';
import { CustomResource, Input, Output, ID, CustomResourceOptions, Inputs } from '@pulumi/pulumi';

export interface ActionDatadogNotificationState {
    project_name: string;
    pipeline_id: number;
}

export type ActionDatadogNotificationArgs = AsInputs<ActionDatadogNotificationState>;

export interface ActionDatadogNotificationProps {
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
export class DatadogNotification extends CustomResource {
    static __pulumiType = 'buddy:action:DatadogNotification';

    static get(name: string, id: Input<ID>, state?: Partial<ActionDatadogNotificationState>, opts?: CustomResourceOptions) {
        return new DatadogNotification(name, state as any, { ...opts, id });
    }

    static isInstance(obj: any): obj is DatadogNotification {
        if (null == obj) {
            return false;
        }

        return obj['__pulumiType'] === DatadogNotification.__pulumiType;
    }

    project_name!: Output<string>;
    pipeline_id!: Output<number>;
    action_id!: Output<number>;

    constructor(name: string, argsOrState: ActionDatadogNotificationArgs | ActionDatadogNotificationState, opts?: CustomResourceOptions) {
        const inputs: Inputs = {};
        if (!opts) {
            opts = {};
        }

        if (opts.id) {
            const state = argsOrState as ActionDatadogNotificationState | undefined;
            inputs['project_name'] = state?.project_name;
            inputs['pipeline_id'] = state?.pipeline_id;
        } else {
            const args = argsOrState as ActionDatadogNotificationArgs | undefined;
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

        inputs['type'] = 'DATADOG';
        inputs['url'] = undefined;
        inputs['html_url'] = undefined;
        inputs['action_id'] = undefined;

        super(DatadogNotification.__pulumiType, name, inputs, opts);
    }
}
