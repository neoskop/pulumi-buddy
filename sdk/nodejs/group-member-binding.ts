import { CustomResource, CustomResourceOptions, ID, Input, Inputs, Output } from '@pulumi/pulumi';
import { AsInputs, AsOutputs } from '@pulumi-utils/sdk';
import { MemberProps } from './member';

export interface GroupMemberBindingState {
    group_id: number;
    member_id: number;
}

export type GroupMemberBindingArgs = AsInputs<GroupMemberBindingState>;

export interface GroupMemberBindingProps extends Pick<MemberProps, Exclude<keyof MemberProps, 'member_id'>> {
    group_member_binding_id: string;
}

export class GroupMemberBinding extends CustomResource implements AsOutputs<GroupMemberBindingProps> {
    static __pulumiType = 'buddy:group-member-binding:GroupMemberBinding';

    static get(name: string, id: Input<ID>, state?: Partial<GroupMemberBindingState>, opts?: CustomResourceOptions) {
        return new GroupMemberBinding(name, state as any, { ...opts, id });
    }

    static isInstance(obj: any): obj is GroupMemberBinding {
        if (null == obj) {
            return false;
        }
        return obj['__pulumiType'] === GroupMemberBinding.__pulumiType;
    }

    readonly url!: Output<string>;
    readonly html_url!: Output<string>;
    readonly group_member_binding_id!: Output<string>;
    readonly avatar_url!: Output<string>;
    readonly title!: Output<string | null>;
    readonly admin!: Output<boolean>;
    readonly workspace_owner!: Output<boolean>;

    constructor(name: string, argsOrState: GroupMemberBindingArgs | GroupMemberBindingState, opts?: CustomResourceOptions) {
        const inputs: Inputs = {};
        if (!opts) {
            opts = {};
        }
        if (opts.id) {
            const state = argsOrState as GroupMemberBindingState | undefined;
            inputs['group_id'] = state?.group_id;
            inputs['member_id'] = state?.member_id;
        } else {
            const args = argsOrState as GroupMemberBindingArgs | undefined;
            if (!args || !args.group_id) {
                throw new Error('Missing required property "group_id"');
            }
            if (!args || !args.member_id) {
                throw new Error('Missing required property "member_id"');
            }
            inputs['group_id'] = args.group_id;
            inputs['member_id'] = args.member_id;
        }

        if (!opts.version) {
            opts.version = require('./package').version;
        }

        inputs['url'] = undefined;
        inputs['html_url'] = undefined;
        inputs['group_member_binding_id'] = undefined;
        inputs['avatar_url'] = undefined;
        inputs['title'] = undefined;
        inputs['admin'] = undefined;
        inputs['workspace_owner'] = undefined;

        super(GroupMemberBinding.__pulumiType, name, inputs, opts);
    }
}
