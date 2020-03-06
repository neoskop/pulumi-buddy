import { CustomResource, CustomResourceOptions, ID, Input, Inputs, Output } from '@pulumi/pulumi';
import { IntegrationRef } from './common';
import { AsInputs, AsOutputs } from './utils';
import { MemberProps } from './member';

export interface IntegrationProjectState {
    name?: string;
    display_name: string;
    integration: IntegrationRef;
    external_project_id: string;
}

export interface CustomProjectState {
    name?: string;
    display_name: string;
    custom_repo_url?: string;
    custom_repo_user?: string;
    custom_repo_pass?: string;
}

export type ProjectState = IntegrationProjectState | CustomProjectState;

export type ProjectArgs = AsInputs<ProjectState>;

export interface ProjectProps {
    url: string;
    html_url: string;
    name: string;
    display_name: string;
    status: string;
    create_date: string;
    created_by: MemberProps;
    http_repository: string;
    ssh_repository: string;
    size: number;
    default_branch: string;
}

/**
 * Required scopes in Buddy API: `WORKSPACE`, `PROJECT_DELETE`
 */
export class Project extends CustomResource implements AsOutputs<ProjectProps> {
    static __pulumiType = 'buddy:project:Project';

    static get(name: string, id: Input<ID>, state?: Partial<ProjectState>, opts?: CustomResourceOptions) {
        return new Project(name, state as any, { ...opts, id });
    }

    static isInstance(obj: any): obj is Project {
        if (null == obj) {
            return false;
        }
        return obj['__pulumiType'] === Project.__pulumiType;
    }

    readonly url!: Output<string>;
    readonly html_url!: Output<string>;
    readonly name!: Output<string>;
    readonly display_name!: Output<string>;
    readonly status!: Output<string>;
    readonly create_date!: Output<string>;
    readonly created_by!: Output<ProjectProps['created_by']>;
    readonly http_repository!: Output<string>;
    readonly ssh_repository!: Output<string>;
    readonly size!: Output<number>;
    readonly default_branch!: Output<string>;

    constructor(name: string, argsOrState: ProjectArgs | ProjectState, opts?: CustomResourceOptions) {
        const inputs: Inputs = {};
        if (!opts) {
            opts = {};
        }
        if (opts.id) {
            const state = argsOrState as (IntegrationProjectState & CustomProjectState) | undefined;
            inputs['name'] = state?.name;
            inputs['display_name'] = state?.display_name;
            inputs['integration'] = state?.integration;
            inputs['external_project_id'] = state?.external_project_id;
            inputs['custom_repo_url'] = state?.custom_repo_url;
            inputs['custom_repo_user'] = state?.custom_repo_user;
            inputs['custom_repo_pass'] = state?.custom_repo_pass;
        } else {
            const args = argsOrState as (AsInputs<IntegrationProjectState> & AsInputs<CustomProjectState>) | undefined;
            if (!args || !args.display_name) {
                throw new Error('Missing required property "display_name"');
            }
            if (args.integration || args.external_project_id) {
                if (!args.integration) {
                    throw new Error('Missing required property "integration"');
                }
                if (!(args.integration instanceof Promise) && !('id' in args.integration) && !('hash_id' in args.integration)) {
                    throw new Error('Missing required property "id" or "hash_id" in "integration"');
                }
                if (!args.external_project_id) {
                    throw new Error('Missing required property "external_project_id"');
                }
            } else {
                if (!args.name) {
                    throw new Error('Missing required property "name"');
                }
            }
            inputs['name'] = args?.name;
            inputs['display_name'] = args?.display_name;
            inputs['integration'] = args?.integration;
            inputs['external_project_id'] = args?.external_project_id;
            inputs['custom_repo_url'] = args?.custom_repo_url;
            inputs['custom_repo_user'] = args?.custom_repo_user;
            inputs['custom_repo_pass'] = args?.custom_repo_pass;
        }

        if (!opts.version) {
            opts.version = require('./package').version;
        }

        inputs['url'] = undefined;
        inputs['html_url'] = undefined;
        inputs['status'] = undefined;
        inputs['create_date'] = undefined;
        inputs['created_by'] = undefined;
        inputs['http_repository'] = undefined;
        inputs['ssh_repository'] = undefined;
        inputs['size'] = undefined;
        inputs['default_branch'] = undefined;

        super(Project.__pulumiType, name, inputs, opts);
    }
}
