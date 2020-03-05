import { CustomResource, CustomResourceOptions, ID, Input, Inputs, Output } from '@pulumi/pulumi';
import { AsInputs, AsOutputs } from './utils';

export interface MemberState {
    email: string;
    isAdmin?: boolean;
}

export type MemberArgs = AsInputs<MemberState>;

export interface MemberProps {
    url: string;
    html_url: string;
    member_id: number;
    avatar_url: string;
    title: string | null;
    admin: boolean;
    workspace_owner: boolean;
}

/**
 * Required scopes in Buddy API: `WORKSPACE`
 */
export class Member extends CustomResource implements AsOutputs<MemberProps> {
    static __pulumiType = 'buddy:member:Member';

    static get(name: string, id: Input<ID>, state?: Partial<MemberState>, opts?: CustomResourceOptions) {
        return new Member(name, state as any, { ...opts, id });
    }

    static isInstance(obj: any): obj is Member {
        if (null == obj) {
            return false;
        }
        return obj['__pulumiType'] === Member.__pulumiType;
    }

    readonly url!: Output<string>;
    readonly html_url!: Output<string>;
    readonly member_id!: Output<number>;
    readonly avatar_url!: Output<string>;
    readonly title!: Output<string | null>;
    readonly admin!: Output<boolean>;
    readonly workspace_owner!: Output<boolean>;

    constructor(name: string, argsOrState: MemberArgs | MemberState, opts?: CustomResourceOptions) {
        const inputs: Inputs = {};
        if (!opts) {
            opts = {};
        }
        if (opts.id) {
            const state = argsOrState as MemberState | undefined;
            inputs['email'] = state?.email;
            inputs['isAdmin'] = state?.isAdmin;
        } else {
            const args = argsOrState as MemberArgs | undefined;
            if (!args || !args.email) {
                throw new Error('Missing required property "email"');
            }
            inputs['email'] = args?.email;
            inputs['isAdmin'] = args?.isAdmin;
        }

        if (!opts.version) {
            opts.version = require('./package').version;
        }

        if (null == opts.deleteBeforeReplace) {
            opts.deleteBeforeReplace = true;
        }

        inputs['url'] = undefined;
        inputs['html_url'] = undefined;
        inputs['member_id'] = undefined;
        inputs['avatar_url'] = undefined;
        inputs['title'] = undefined;
        inputs['admin'] = undefined;
        inputs['workspace_owner'] = undefined;

        super(Member.__pulumiType, name, inputs, opts);
    }
}
