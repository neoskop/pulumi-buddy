import { CustomResource, CustomResourceOptions, ID, Input, Inputs, Output } from '@pulumi/pulumi';

import { AsInputs, AsOutputs } from './utils';

export interface BuddySshKeyState {
    content: string;
    title?: string;
}

export type BuddySshKeyArgs = AsInputs<BuddySshKeyState>;

export interface BuddySshKeyProps {
    url: string;
    html_url: string;
    ssh_key_id: number;
    content: string;
    title: string|null;
}

export class BuddySshKey extends CustomResource implements AsOutputs<BuddySshKeyProps> {
    static __pulumiType = 'buddy:ssh-key:BuddySshKey';

    static get(name: string, id: Input<ID>, state?: Partial<BuddySshKeyState>, opts?: CustomResourceOptions) {
        return new BuddySshKey(name, state as any, { ...opts, id });
    }

    static isInstance(obj: any): obj is BuddySshKey {
        if (null == obj) {
            return false;
        }
        return obj['__pulumiType'] === BuddySshKey.__pulumiType;
    }

    readonly url!: Output<string>;
    readonly html_url!: Output<string>;
    readonly ssh_key_id!: Output<number>;
    readonly content!: Output<string>;
    readonly title!: Output<string|null>;

    constructor(name: string, argsOrState: BuddySshKeyArgs | BuddySshKeyState, opts?: CustomResourceOptions) {
        const inputs: Inputs = {};
        if (!opts) {
            opts = {};
        }
        if (opts.id) {
            const state = argsOrState as BuddySshKeyState | undefined;
            inputs['content'] = state?.content;
            inputs['title'] = state?.title;
        } else {
            const args = argsOrState as BuddySshKeyArgs | undefined;
            if (!args || !args.content) {
                throw new Error('Missing required property "content"');
            }
            inputs['content'] = args?.content;
            inputs['title'] = args?.title;
        }

        if (!opts.version) {
            opts.version = require('./package').version;
        }

        if(null == opts.deleteBeforeReplace) {
            opts.deleteBeforeReplace = true;
        }

        inputs['url'] = undefined;
        inputs['html_url'] = undefined;
        inputs['ssh_key_id'] = undefined;

        super(BuddySshKey.__pulumiType, name, inputs, opts);
    }
}
