import Axios from 'axios';

import { BuddyApi, InvalidResponseType } from './api';
import { BuddyWorkspaceApi } from './workspace';

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
    constructor(
        protected readonly api: BuddyApi,
        protected readonly workspace: BuddyWorkspaceApi,
        protected readonly integrationId?: number | string
    ) {}

    getIntegrationId(): number | string {
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
            const result = await this.api.client.get<IBuddyIntegration>(
                `/workspaces/${this.workspace.getDomain()}/integrations/${this.integrationId}`,
                {
                    cancelToken: this.api.registerCanceler('integration').token
                }
            );

            return result.data;
        } catch (e) {
            if (Axios.isCancel(e)) {
                throw e;
            } else if (e.response) {
                InvalidResponseType.checkResponseType(e.response, 'application/json');
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
            const result = await this.api.client.get<{ integrations: IBuddyIntegration[] }>(
                `/workspaces/${this.workspace.getDomain()}/integrations`,
                {
                    cancelToken: this.api.registerCanceler('integration').token
                }
            );
            return result.data.integrations;
        } catch (e) {
            if (Axios.isCancel(e)) {
                throw e;
            } else if (e.response) {
                InvalidResponseType.checkResponseType(e.response, 'application/json');
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
    constructor(integrationId: number | string) {
        super(`Integration '${integrationId}' not found.`);
    }
}
