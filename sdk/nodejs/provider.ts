import { ProviderResource, ResourceOptions, Config, Inputs, Output } from '@pulumi/pulumi';

export class Provider extends ProviderResource {
    static readonly __pulumiType = 'buddy';

    readonly apiUrl!: Output<string>;
    readonly workspace!: Output<string>;
    readonly token!: Output<string>;

    static isInstance(obj: any): obj is Provider {
        if(obj == null) {
            return false;
        }

        return obj['__pulumiType'] === Provider.__pulumiType;
    }

    constructor(name: string, args?: ProviderArgs, opts?: ResourceOptions) {
        if(!opts) {
            opts = {};
        }

        if(!opts.version) {
            opts.version = require('./package').version;
        }

        const config = new Config('buddy');

        const inputs : Inputs = {
            apiUrl: args?.apiUrl ?? config.get('apiUrl')?.replace(/\/?/, '') ?? 'https://api.buddy.works',
            workspace: args?.workspace ?? config.require('workspace'),
            token: args?.token ?? config.requireSecret('token')
        }

        super(Provider.__pulumiType, name, inputs, opts);
    }
}

export interface ProviderArgs {
    apiUrl?: string;
    workspace?: string;
    token?: string;
}