import { CustomResource, CustomResourceOptions, ID, Input, Inputs, Output } from '@pulumi/pulumi';
import { AsInputs, AsOutputs } from './utils';

export interface SshKeyState {
    content: string;
    title?: string;
}

export type SshKeyArgs = AsInputs<SshKeyState>;

export interface SshKeyProps {
    url: string;
    html_url: string;
    ssh_key_id: number;
    content: string;
    title: string | null;
}

export class SshKey extends CustomResource implements AsOutputs<SshKeyProps> {
    static __pulumiType = 'buddy:ssh-key:SshKey';

    static get(name: string, id: Input<ID>, state?: Partial<SshKeyState>, opts?: CustomResourceOptions) {
        return new SshKey(name, state as any, { ...opts, id });
    }

    static isInstance(obj: any): obj is SshKey {
        if (null == obj) {
            return false;
        }
        return obj['__pulumiType'] === SshKey.__pulumiType;
    }

    readonly url!: Output<string>;
    readonly html_url!: Output<string>;
    readonly ssh_key_id!: Output<number>;
    readonly content!: Output<string>;
    readonly title!: Output<string | null>;

    constructor(name: string, argsOrState: SshKeyArgs | SshKeyState, opts?: CustomResourceOptions) {
        const inputs: Inputs = {};
        if (!opts) {
            opts = {};
        }
        if (opts.id) {
            const state = argsOrState as SshKeyState | undefined;
            inputs['content'] = state?.content;
            inputs['title'] = state?.title;
        } else {
            const args = argsOrState as SshKeyArgs | undefined;
            if (!args || !args.content) {
                throw new Error('Missing required property "content"');
            }
            inputs['content'] = args?.content;
            inputs['title'] = args?.title;
        }

        if (!opts.version) {
            opts.version = require('./package').version;
        }

        if (null == opts.deleteBeforeReplace) {
            opts.deleteBeforeReplace = true;
        }

        inputs['url'] = undefined;
        inputs['html_url'] = undefined;
        inputs['ssh_key_id'] = undefined;

        super(SshKey.__pulumiType, name, inputs, opts);
    }
}
