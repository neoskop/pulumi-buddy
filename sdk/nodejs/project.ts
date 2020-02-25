import { CustomResource, CustomResourceOptions, ID, Input, Inputs, Output } from '@pulumi/pulumi';

import { Kind } from './kinds';
import { AsInputs, AsOutputs } from './utils';

export interface BuddyIdIntegrationState {
    id: number;
}

export interface BuddyHashIdIntegrationState {
    hash_id: string;
}

export type BuddyIntegrationState = BuddyIdIntegrationState | BuddyHashIdIntegrationState;

export interface BuddyIntegrationProjectState {
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

export type BuddyProjectArgs = AsInputs<BuddyProjectState>;

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
}

export class BuddyProject extends CustomResource implements AsOutputs<BuddyIntegrationProjectState>, AsOutputs<BuddyCustomProjectState> {
    static __pulumiType = 'buddy:index/project:BuddyProject';

    static get(name: string, id: Input<ID>, state?: Partial<BuddyProjectState>, opts?: CustomResourceOptions) {
        return new BuddyProject(name, state as any, { ...opts, id });
    }

    static isInstance(obj: any): obj is BuddyProject {
        if (null == obj) {
            return false;
        }
        return obj['__pulumiType'] === BuddyProject.__pulumiType;
    }

    readonly kind!: Output<Kind.Project>;

    readonly name!: Output<string>;
    readonly display_name!: Output<string>;
    readonly integration!: Output<BuddyIntegrationState>;
    readonly external_project_id!: Output<string>;
    readonly custom_repo_url!: Output<string | undefined>;
    readonly custom_repo_user!: Output<string | undefined>;
    readonly custom_repo_pass!: Output<string | undefined>;

    readonly outputs!: Output<BuddyProjectProps>;

    constructor(name: string, argsOrState: BuddyProjectArgs | BuddyProjectState, opts?: CustomResourceOptions) {
        const inputs: Inputs = {};
        if (!opts) {
            opts = {};
        }
        if (opts.id) {
            const state = argsOrState as (BuddyIntegrationProjectState & BuddyCustomProjectState) | undefined;
            inputs['name'] = state?.name;
            inputs['display_name'] = state?.display_name;
            inputs['integration'] = state?.integration;
            inputs['external_project_id'] = state?.external_project_id;
            inputs['custom_repo_url'] = state?.custom_repo_url;
            inputs['custom_repo_user'] = state?.custom_repo_user;
            inputs['custom_repo_pass'] = state?.custom_repo_pass;
        } else {
            const args = argsOrState as (AsInputs<BuddyIntegrationProjectState> & AsInputs<BuddyCustomProjectState>) | undefined;
            if (!args || !args.display_name) {
                throw new Error('Missing required property "display_name"');
            }
            if (args.integration || args.external_project_id) {
                if (!args.integration) {
                    throw new Error('Missing required property "integration"');
                }
                if (!('id' in args.integration) && !('hash_id' in args.integration)) {
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

        inputs.kind = Kind.Project;
        inputs.outputs = undefined;

        super(BuddyProject.__pulumiType, name, inputs, opts);
    }
}
