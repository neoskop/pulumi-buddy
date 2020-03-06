import { CustomResource, CustomResourceOptions, ID, Input, Inputs, Output } from '@pulumi/pulumi';
import { AsInputs, AsOutputs } from './utils';

export type PipelineAccessLevel = 'DENIED' | 'READ_ONLY' | 'RUN_ONLY' | 'READ_WRITE';
export type RepositoryAccessLevel = 'DENIED' | 'READ_ONLY' | 'READ_WRITE';
export type SandboxAccessLevel = 'DENIED' | 'READ_WRITE';

export interface PermissionState {
    name: string;
    description?: string;
    pipeline_access_level: PipelineAccessLevel;
    repository_access_level: RepositoryAccessLevel;
    sandbox_access_level: SandboxAccessLevel;
}

export type PermissionArgs = AsInputs<PermissionState>;

export interface PermissionProps {
    url: string;
    html_url: string;
    permission_id: number;
    name: string;
    description: string | null;
    pipeline_access_level: PipelineAccessLevel;
    repository_access_level: RepositoryAccessLevel;
    sandbox_access_level: SandboxAccessLevel;
}

/**
 * Required scopes in Buddy API: `WORKSPACE`
 */
export class Permission extends CustomResource implements AsOutputs<PermissionProps> {
    static __pulumiType = 'buddy:permission:Permission';

    static get(name: string, id: Input<ID>, state?: Partial<PermissionState>, opts?: CustomResourceOptions) {
        return new Permission(name, state as any, { ...opts, id });
    }

    static isInstance(obj: any): obj is Permission {
        if (null == obj) {
            return false;
        }
        return obj['__pulumiType'] === Permission.__pulumiType;
    }

    readonly url!: Output<string>;
    readonly html_url!: Output<string>;
    readonly permission_id!: Output<number>;
    readonly name!: Output<string>;
    readonly description!: Output<string>;
    readonly pipeline_access_level!: Output<PipelineAccessLevel>;
    readonly repository_access_level!: Output<RepositoryAccessLevel>;
    readonly sandbox_access_level!: Output<SandboxAccessLevel>;

    constructor(name: string, argsOrState: PermissionArgs | PermissionState, opts?: CustomResourceOptions) {
        const inputs: Inputs = {};
        if (!opts) {
            opts = {};
        }
        if (opts.id) {
            const state = argsOrState as PermissionState | undefined;
            inputs['name'] = state?.name;
            inputs['description'] = state?.description;
            inputs['pipeline_access_level'] = state?.pipeline_access_level;
            inputs['repository_access_level'] = state?.repository_access_level;
            inputs['sandbox_access_level'] = state?.sandbox_access_level;
        } else {
            const args = argsOrState as PermissionArgs | undefined;
            if (!args || !args.name) {
                throw new Error('Missing required property "name"');
            }
            if (!args || !args.pipeline_access_level) {
                throw new Error('Missing required property "pipeline_access_level"');
            }
            if (!args || !args.repository_access_level) {
                throw new Error('Missing required property "repository_access_level"');
            }
            if (!args || !args.sandbox_access_level) {
                throw new Error('Missing required property "sandbox_access_level"');
            }
            inputs['name'] = args.name;
            inputs['description'] = args.description;
            inputs['pipeline_access_level'] = args.pipeline_access_level;
            inputs['repository_access_level'] = args.repository_access_level;
            inputs['sandbox_access_level'] = args.sandbox_access_level;
        }

        if (!opts.version) {
            opts.version = require('./package').version;
        }

        inputs['url'] = undefined;
        inputs['html_url'] = undefined;
        inputs['permission_id'] = undefined;

        super(Permission.__pulumiType, name, inputs, opts);
    }
}
