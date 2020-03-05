import { CustomResource, CustomResourceOptions, ID, Input, Inputs, Output } from '@pulumi/pulumi';
import { ProjectProps } from './project';
import { AsInputs, AsOutputs } from './utils';

export type WebhookEvent = 'PUSH' | 'EXECUTION_STARTED' | 'EXECUTION_SUCCESSFUL' | 'EXECUTION_FAILED' | 'EXECUTION_FINISHED';

export interface WebhookState {
    events: WebhookEvent[];
    target_url: string;
    project_name?: string;
    secret_key?: string;
}

export type WebhookArgs = AsInputs<WebhookState>;

export interface WebhookProps {
    url: string;
    html_url: string;
    webhook_id: number;
    events: WebhookEvent[];
    target_url: string;
    project: ProjectProps | null;
    secret_key: string | null;
}

/**
 * Required scopes in Buddy API: `WORKSPACE`, `WEBHOOK_ADD`, `WEBHOOK_MANAGE`, `WEBHOOK_INFO`
 */
export class Webhook extends CustomResource implements AsOutputs<WebhookProps> {
    static __pulumiType = 'buddy:webhook:Webhook';

    static get(name: string, id: Input<ID>, state?: Partial<WebhookState>, opts?: CustomResourceOptions) {
        return new Webhook(name, state as any, { ...opts, id });
    }

    static isInstance(obj: any): obj is Webhook {
        if (null == obj) {
            return false;
        }
        return obj['__pulumiType'] === Webhook.__pulumiType;
    }

    readonly url!: Output<string>;
    readonly html_url!: Output<string>;
    readonly webhook_id!: Output<number>;
    readonly events!: Output<WebhookEvent[]>;
    readonly target_url!: Output<string>;
    readonly project!: Output<ProjectProps | null>;
    readonly secret_key!: Output<string | null>;

    constructor(name: string, argsOrState: WebhookArgs | WebhookState, opts?: CustomResourceOptions) {
        const inputs: Inputs = {};
        if (!opts) {
            opts = {};
        }
        if (opts.id) {
            const state = argsOrState as WebhookState | undefined;
            inputs['events'] = state?.events;
            inputs['target_url'] = state?.target_url;
            inputs['project_name'] = state?.project_name;
            inputs['secret_key'] = state?.secret_key;
        } else {
            const args = argsOrState as WebhookArgs | undefined;
            if (!args || !args.events) {
                throw new Error('Missing required property "events"');
            }
            if (!args || !args.target_url) {
                throw new Error('Missing required property "target_url"');
            }
            inputs['events'] = args.events;
            inputs['target_url'] = args.target_url;
            inputs['project_name'] = args.project_name;
            inputs['secret_key'] = args.secret_key;
        }

        if (!opts.version) {
            opts.version = require('./package').version;
        }

        inputs['url'] = undefined;
        inputs['html_url'] = undefined;
        inputs['Webhook_id'] = undefined;

        super(Webhook.__pulumiType, name, inputs, opts);
    }
}
