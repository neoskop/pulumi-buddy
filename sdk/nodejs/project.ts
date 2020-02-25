import { CustomResourceOptions, ID, Input, Output, CustomResource, Inputs, Config, ResourceOptions } from '@pulumi/pulumi';
import { Kind } from './kinds';

export interface BuddyIdIntegrationArgs {
    id: Input<number>;
}

export interface BuddyHashIdIntegrationArgs {
    hash_id: Input<string>;
}

export type BuddyIntegrationArgs = BuddyIdIntegrationArgs | BuddyHashIdIntegrationArgs;

export interface BuddyIntegrationProjectArgs {
    name?: Input<string|undefined>;
    display_name: Input<string>;
    integration: Input<BuddyIntegrationArgs>;
    external_project_id: Input<string>;
}

export interface BuddyCustomProjectArgs {
    name: Input<string>;
    display_name: Input<string>;
    custom_repo_url?: Input<string|undefined>;
    custom_repo_user?: Input<string|undefined>;
    custom_repo_pass?: Input<string|undefined>;
}

export type BuddyProjectArgs = BuddyIntegrationProjectArgs | BuddyCustomProjectArgs;


export interface BuddyIdIntegrationState {
    id: number;
}

export interface BuddyHashIdIntegrationState {
    hash_id: string;
}

export type BuddyIntegrationState = BuddyIdIntegrationState | BuddyHashIdIntegrationState;

export interface BuddyIntegrationProjectState {
    name?: string|undefined;
    display_name: string;
    integration: BuddyIntegrationState;
    external_project_id: string;
}

export interface BuddyCustomProjectState {
    name: string;
    display_name: string;
    custom_repo_url?: string;
    custom_repo_user?: string;
    custom_repo_pass?: string;
}

export type BuddyProjectState = BuddyIntegrationProjectState | BuddyCustomProjectState;

export interface BuddyProjectProps {
    url: string;
    html_url: string;
    name: string;
    display_name: string;
    status: string; // 'ACTIVE'
    create_date: string;
    created_by: {
        url: string;
        html_url: string;
        id: number;
        name: string;
        avatar_url: string;
        title: string;
    };
    http_repository: string;
    ssh_repository: string;
    size: number;
    default_branch: string;

    inputs: BuddyProjectState;
}

export type BuddyProjectOutputs = {
    [K in keyof BuddyProjectProps]: Output<BuddyProjectProps[K]>
}

export class BuddyProject extends CustomResource implements BuddyProjectOutputs {
    static __pulumiType = 'buddy:index/project:BuddyProject';

    static get(name: string, id: Input<ID>, state?: Partial<BuddyProjectState>, opts?: CustomResourceOptions) {
        return new BuddyProject(name, state as any, { ...opts, id });
    }

    static isInstance(obj: any): obj is BuddyProject {
        if(null == obj) {
            return false;
        }
        return obj['__pulumiType'] === BuddyProject.__pulumiType;
    }

    readonly kind!: Output<Kind.Project>;
    readonly url!: Output<string>;
    readonly html_url!: Output<string>;
    readonly name!: Output<string>;
    readonly display_name!: Output<string>;
    readonly status!: Output<string>;
    readonly create_date!: Output<string>;
    readonly created_by!: Output<BuddyProjectProps['created_by']>;
    readonly http_repository!: Output<string>;
    readonly ssh_repository!: Output<string>;
    readonly size!: Output<number>;
    readonly default_branch!: Output<string>;

    readonly inputs!: Output<BuddyProjectState>;

    constructor(name: string, argsOrState: BuddyProjectArgs|BuddyProjectState, opts?: CustomResourceOptions) {
        const inputs: Inputs = {};
        if(!opts) {
            opts = {};
        }
        if(opts.id) {
            const state = argsOrState as BuddyIntegrationProjectState & BuddyCustomProjectState | undefined;
            inputs['name'] = state?.name;
            inputs['display_name'] = state?.display_name;
            inputs['integration'] = state?.integration;
            inputs['external_project_id'] = state?.external_project_id;
            inputs['custom_repo_url'] = state?.custom_repo_url;
            inputs['custom_repo_user'] = state?.custom_repo_user;
            inputs['custom_repo_pass'] = state?.custom_repo_pass;
        } else {
            const args = argsOrState as BuddyIntegrationProjectArgs & BuddyCustomProjectArgs | undefined;
            if(!args || !args.display_name) {
                throw new Error('Missing required property "display_name"')
            }
            if(args.integration || args.external_project_id) {
                if(!args.integration) {
                    throw new Error('Missing required property "integration"')
                }
                if(!('id' in args.integration) && !('hash_id' in args.integration)) {
                    throw new Error('Missing required property "id" or "hash_id" in "integration"');
                }
                if(!args.external_project_id) {
                    throw new Error('Missing required property "external_project_id"')
                }
            } else {
                if(!args.name) {
                    throw new Error('Missing required property "name"')
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

        if(!opts.version) {
            opts.version = require('./package').version;
        }

        inputs.kind = Kind.Project;

        super(BuddyProject.__pulumiType, name, inputs, opts);
    }
}