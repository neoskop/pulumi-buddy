import { CustomResource, CustomResourceOptions, ID, Input, Inputs, Output } from '@pulumi/pulumi';
import { AsInputs, AsOutputs } from '@pulumi-utils/sdk';
import { MemberProps } from './member';
import { PermissionProps } from './permission';

export interface ProjectMemberBindingState {
    project_name: string;
    member_id: number;
    permission_id: number;
}

export type ProjectMemberBindingArgs = AsInputs<ProjectMemberBindingState>;

export interface ProjectMemberBindingProps extends Pick<MemberProps, Exclude<keyof MemberProps, 'member_id'>> {
    project_member_binding_id: string;
    permission_set: Pick<PermissionProps, Exclude<keyof PermissionProps, 'permission_id'>> & { id: number };
}

export class ProjectMemberBinding extends CustomResource implements AsOutputs<ProjectMemberBindingProps> {
    static __pulumiType = 'buddy:project-member-binding:ProjectMemberBinding';

    static get(name: string, id: Input<ID>, state?: Partial<ProjectMemberBindingState>, opts?: CustomResourceOptions) {
        return new ProjectMemberBinding(name, state as any, { ...opts, id });
    }

    static isInstance(obj: any): obj is ProjectMemberBinding {
        if (null == obj) {
            return false;
        }
        return obj['__pulumiType'] === ProjectMemberBinding.__pulumiType;
    }

    readonly url!: Output<string>;
    readonly html_url!: Output<string>;
    readonly project_member_binding_id!: Output<string>;
    readonly avatar_url!: Output<string>;
    readonly title!: Output<string | null>;
    readonly admin!: Output<boolean>;
    readonly workspace_owner!: Output<boolean>;
    readonly permission_set!: Output<ProjectMemberBindingProps['permission_set']>;

    constructor(name: string, argsOrState: ProjectMemberBindingArgs | ProjectMemberBindingState, opts?: CustomResourceOptions) {
        const inputs: Inputs = {};
        if (!opts) {
            opts = {};
        }
        if (opts.id) {
            const state = argsOrState as ProjectMemberBindingState | undefined;
            inputs['project_name'] = state?.project_name;
            inputs['member_id'] = state?.member_id;
            inputs['permission_id'] = state?.permission_id;
        } else {
            const args = argsOrState as ProjectMemberBindingArgs | undefined;
            if (!args || !args.project_name) {
                throw new Error('Missing required property "project_name"');
            }
            if (!args || !args.member_id) {
                throw new Error('Missing required property "member_id"');
            }
            if (!args || !args.permission_id) {
                throw new Error('Missing required property "permission_id"');
            }
            inputs['project_name'] = args.project_name;
            inputs['member_id'] = args.member_id;
            inputs['permission_id'] = args.permission_id;
        }

        if (!opts.version) {
            opts.version = require('./package').version;
        }

        inputs['url'] = undefined;
        inputs['html_url'] = undefined;
        inputs['project_member_binding_id'] = undefined;
        inputs['avatar_url'] = undefined;
        inputs['title'] = undefined;
        inputs['admin'] = undefined;
        inputs['workspace_owner'] = undefined;
        inputs['permission_set'] = undefined;

        super(ProjectMemberBinding.__pulumiType, name, inputs, opts);
    }
}
