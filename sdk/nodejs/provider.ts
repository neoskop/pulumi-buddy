import { ProviderResource, ResourceOptions, Config, Inputs } from '@pulumi/pulumi';

export class Provider extends ProviderResource {
    static readonly __pulumiType = 'buddy';

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

        const config = new Config();

        const inputs : Inputs = {
            apiUrl: args?.apiUrl ?? config.get('BUDDY_API_URL')?.replace(/\/?/, '') ?? 'https://api.buddy.works',
            workspace: args?.workspace ?? config.require('BUDDY_WORKSPACE'),
            token: args?.token ?? config.requireSecret('BUDDY_AUTH_TOKEN')
        }

        super(Provider.__pulumiType, name, inputs, opts);
    }
}

export interface ProviderArgs {
    apiUrl?: string;
    workspace?: string;
    token?: string;
}