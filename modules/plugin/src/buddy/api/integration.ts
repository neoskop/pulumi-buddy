import Axios from 'axios';
import { BuddyApi } from './api';

const debug = require('debug')('pulumi-buddy:api:integration');

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

export interface IBuddyIntegration {
    url: string;
    html_url: string;
    hash_id: string;
    id: number;
    name: string;
    type: IntegrationType;
}

export class BuddyIntegrationApi {
    constructor(protected readonly api: BuddyApi, protected readonly integrationId?: number) {}

    getIntegrationId(): number {
        if (!this.integrationId) {
            throw new IntegrationIdRequired();
        }
        return this.integrationId;
    }

    async read(): Promise<IBuddyIntegration> {
        debug('read %d', this.integrationId);
        if (!this.integrationId) {
            throw new IntegrationIdRequired();
        }

        try {
            const result = await Axios.get<IBuddyIntegration>(`${this.api.getApiUrl()}/user/integrations/${this.integrationId}`, {
                cancelToken: this.api.registerCanceler('integration').token,
                headers: {
                    Authorization: `Bearer ${this.api.getToken()}`
                }
            });

            return result.data;
        } catch (e) {
            if (Axios.isCancel(e)) {
                throw e;
            } else if (e.response) {
                if (e.response.status === 404) {
                    throw new IntegrationNotFound(this.integrationId);
                } else {
                    throw new IntegrationError(e.response.data.errors[0].message);
                }
            } else {
                throw new IntegrationError(e.message);
            }
        }
    }

    async list(): Promise<IBuddyIntegration[]> {
        debug('list');
        try {
            const result = await Axios.get<{ integrations: IBuddyIntegration[] }>(`${this.api.getApiUrl()}/user/integrations`, {
                cancelToken: this.api.registerCanceler('integration').token,
                headers: {
                    Authorization: `Bearer ${this.api.getToken()}`
                }
            });

            return result.data.integrations;
        } catch (e) {
            if (Axios.isCancel(e)) {
                throw e;
            } else if (e.response) {
                throw new IntegrationError(e.response.data.errors[0].message);
            } else {
                throw new IntegrationError(e.message);
            }
        }
    }
}

export class IntegrationError extends Error {}

export class IntegrationIdRequired extends IntegrationError {
    constructor() {
        super('Integration id required.');
    }
}

export class IntegrationNotFound extends IntegrationError {
    constructor(integrationId: number) {
        super(`Integration '${integrationId}' not found.`);
    }
}
