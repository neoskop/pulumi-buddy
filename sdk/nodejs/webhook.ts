import { CustomResource, CustomResourceOptions, ID, Input, Inputs, Output } from '@pulumi/pulumi';
import { BuddyProjectProps } from './project'

import { AsInputs, AsOutputs } from './utils';

export type WebhookEvent = 'PUSH' | 'EXECUTION_STARTED' | 'EXECUTION_SUCCESSFUL' | 'EXECUTION_FAILED' | 'EXECUTION_FINISHED';

export interface BuddyWebhookState {
    events: WebhookEvent[];
    target_url: string;
    project_name?: string;
    secret_key?: string;
}

export type BuddyWebhookArgs = AsInputs<BuddyWebhookState>;

export interface BuddyWebhookProps {
    url: string;
    html_url: string;
    webhook_id: number;
    events: WebhookEvent[];
    target_url: string;
    project: BuddyProjectProps|null;
    secret_key: string|null;
}

export class BuddyWebhook extends CustomResource implements AsOutputs<BuddyWebhookProps> {
    static __pulumiType = 'buddy:webhook:BuddyWebhook';

    static get(name: string, id: Input<ID>, state?: Partial<BuddyWebhookState>, opts?: CustomResourceOptions) {
        return new BuddyWebhook(name, state as any, { ...opts, id });
    }

    static isInstance(obj: any): obj is BuddyWebhook {
        if (null == obj) {
            return false;
        }
        return obj['__pulumiType'] === BuddyWebhook.__pulumiType;
    }

    readonly url!: Output<string>;
    readonly html_url!: Output<string>;
    readonly webhook_id!: Output<number>;
    readonly events!: Output<WebhookEvent[]>;
    readonly target_url!: Output<string>;
    readonly project!: Output<BuddyProjectProps|null>;
    readonly secret_key!: Output<string|null>;

    constructor(name: string, argsOrState: BuddyWebhookArgs | BuddyWebhookState, opts?: CustomResourceOptions) {
        const inputs: Inputs = {};
        if (!opts) {
            opts = {};
        }
        if (opts.id) {
            const state = argsOrState as BuddyWebhookState | undefined;
            inputs['events'] = state?.events;
            inputs['target_url'] = state?.target_url;
            inputs['project_name'] = state?.project_name;
            inputs['secret_key'] = state?.secret_key;
        } else {
            const args = argsOrState as BuddyWebhookArgs | undefined;
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

        super(BuddyWebhook.__pulumiType, name, inputs, opts);
    }
}
