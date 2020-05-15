import { CustomResource, CustomResourceOptions, ID, Input, Inputs, Output } from '@pulumi/pulumi';
import { invoke } from '@pulumi/pulumi/runtime';
import { AsInputs, AsOutputs } from '@pulumi-utils/sdk';

export interface IntegrationState {
    name: string;
    description?: string;
}

export type IntegrationArgs = AsInputs<IntegrationState>;

export type IntegrationType =
    | 'SMTP'
    | 'GIT_HUB'
    | 'BITBUCKET'
    | 'GIT_LAB'
    | 'GIT_HUB_ENTERPRISE'
    | 'GIT_LAB_ENTERPRISE'
    | 'CUSTOM'
    | 'SLACK'
    | 'DIGITAL_OCEAN'
    | 'AZURE'
    | 'UPCLOUD'
    | 'DO_SPACES'
    | 'VULTR'
    | 'HEROKU'
    | 'AMAZON'
    | 'SHOPIFY'
    | 'GOOGLE'
    | 'PUSHBULLET'
    | 'PUSHOVER'
    | 'NEW_RELIC'
    | 'RACKSPACE'
    | 'CLOUDFLARE'
    | 'SENTRY'
    | 'SENTRY_ENTERPRISE'
    | 'ROLLBAR'
    | 'DATADOG'
    | 'HONEYBADGER'
    | 'GHOST_INSPECTOR'
    | 'FIREBASE'
    | 'TELEGRAM'
    | 'LOGGLY'
    | 'NETLIFY'
    | 'SNS'
    | 'LDAP';

export interface IntegrationProps {
    url: string;
    html_url: string;
    hash_id: string;
    integration_id: number | string;
    name: string;
    type: IntegrationType;
}

export class Integration extends CustomResource implements AsOutputs<IntegrationProps> {
    static __pulumiType = 'buddy:integration:Integration';

    static findByType(name: string, type: IntegrationType, opts?: CustomResourceOptions): Integration {
        return new Integration(name, {
            ...opts,
            id: invoke(
                'buddy:integration:list',
                {},
                {
                    ...opts,
                    async: true
                }
            ).then(({ integrations }: { integrations: IntegrationProps[] }) => {
                const matchingIntegration = integrations.find(integration => integration.type === type);

                if (matchingIntegration) {
                    return matchingIntegration.hash_id;
                } else {
                    throw Error(`Integration with type "${type}" not found`);
                }
            })
        });
    }

    static get(name: string, id: Input<ID>, opts?: CustomResourceOptions) {
        return new Integration(name, { ...opts, id });
    }

    static isInstance(obj: any): obj is Integration {
        if (null == obj) {
            return false;
        }
        return obj['__pulumiType'] === Integration.__pulumiType;
    }

    readonly url!: Output<string>;
    readonly html_url!: Output<string>;
    readonly hash_id!: Output<string>;
    readonly integration_id!: Output<number>;
    readonly name!: Output<string>;
    readonly type!: Output<IntegrationType>;

    private constructor(name: string, opts?: CustomResourceOptions) {
        const inputs: Inputs = {};
        if (!opts) {
            opts = {};
        }

        if (!opts.version) {
            opts.version = require('./package').version;
        }

        inputs['url'] = undefined;
        inputs['html_url'] = undefined;
        inputs['hash_id'] = undefined;
        inputs['integration_id'] = undefined;
        inputs['name'] = undefined;
        inputs['type'] = undefined;

        super(Integration.__pulumiType, name, inputs, opts);
    }
}
