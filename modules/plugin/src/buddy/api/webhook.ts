import Axios from 'axios';

import { BuddyApi, InvalidResponseType } from './api';
import { BuddyWorkspaceApi } from './workspace';
import { IBuddyProject } from './project';

const debug = require('debug')('pulumi-buddy:api:webhook');

export type WebhookEvent = 'PUSH' | 'EXECUTION_STARTED' | 'EXECUTION_SUCCESSFUL' | 'EXECUTION_FAILED' | 'EXECUTION_FINISHED';

export interface IBuddyWebhookInput {
    events: WebhookEvent[];
    target_url: string;
    project_filter?: {
        name: string;
    };
    secret_key?: string;
}

export interface IBuddyWebhook {
    url: string;
    html_url: string;
    id: number;
    events: WebhookEvent[];
    target_url: string;
    project: IBuddyProject | null;
    secret_key: string | null;
}

export class BuddyWebhookApi {
    constructor(protected readonly api: BuddyApi, protected readonly workspace: BuddyWorkspaceApi, protected readonly webhookId?: number) {}

    getWebhookId(): number {
        if (!this.webhookId) {
            throw new WebhookIdRequired();
        }
        return this.webhookId;
    }

    async create(webhook: IBuddyWebhookInput): Promise<IBuddyWebhook> {
        debug('create %O', webhook);
        try {
            const result = await this.api.client.post<IBuddyWebhook>(`/workspaces/${this.workspace.getDomain()}/webhooks`, webhook, {
                cancelToken: this.api.registerCanceler('webhook').token
            });

            return result.data;
        } catch (e) {
            if (Axios.isCancel(e)) {
                throw e;
            } else if (e.response) {
                InvalidResponseType.checkResponseType(e.response, 'application/json');
                throw new WebhookError(e.response.data.errors[0].message);
            } else {
                throw new WebhookError(e.message);
            }
        }
    }

    async read(): Promise<IBuddyWebhook> {
        debug('read %d', this.webhookId);
        if (!this.webhookId) {
            throw new WebhookIdRequired();
        }

        try {
            const result = await this.api.client.get<IBuddyWebhook>(
                `/workspaces/${this.workspace.getDomain()}/webhooks/${this.webhookId}`,
                {
                    cancelToken: this.api.registerCanceler('webhook').token
                }
            );

            return result.data;
        } catch (e) {
            if (Axios.isCancel(e)) {
                throw e;
            } else if (e.response) {
                InvalidResponseType.checkResponseType(e.response, 'application/json');
                if (e.response.status === 404) {
                    throw new WebhookNotFound(this.webhookId);
                } else {
                    throw new WebhookError(e.response.data.errors[0].message);
                }
            } else {
                throw new WebhookError(e.message);
            }
        }
    }

    async update(update: Partial<IBuddyWebhookInput>): Promise<IBuddyWebhook> {
        debug('update %d %O', this.webhookId, update);
        if (!this.webhookId) {
            throw new WebhookIdRequired();
        }

        try {
            const result = await this.api.client.patch<IBuddyWebhook>(
                `/workspaces/${this.workspace.getDomain()}/webhooks/${this.webhookId}`,
                update,
                {
                    cancelToken: this.api.registerCanceler('webhook').token
                }
            );

            return result.data;
        } catch (e) {
            if (Axios.isCancel(e)) {
                throw e;
            } else if (e.response) {
                InvalidResponseType.checkResponseType(e.response, 'application/json');
                if (e.response.status === 404) {
                    throw new WebhookNotFound(this.webhookId);
                } else {
                    throw new WebhookError(e.response.data.errors[0].message);
                }
            } else {
                throw new WebhookError(e.message);
            }
        }
    }

    async delete(): Promise<void> {
        debug('delete %d', this.webhookId);
        if (!this.webhookId) {
            throw new WebhookIdRequired();
        }

        try {
            await this.api.client.delete(`/workspaces/${this.workspace.getDomain()}/webhooks/${this.webhookId}`, {
                cancelToken: this.api.registerCanceler('webhook').token,
                headers: {
                    Authorization: `Bearer ${this.api.getToken()}`
                }
            });
        } catch (e) {
            if (Axios.isCancel(e)) {
                throw e;
            } else if (e.response) {
                InvalidResponseType.checkResponseType(e.response, 'application/json');
                if (e.response.status === 404) {
                    throw new WebhookNotFound(this.webhookId);
                } else {
                    throw new WebhookError(e.response.data.errors[0].message);
                }
            } else {
                throw new WebhookError(e.message);
            }
        }
    }
}

export class WebhookError extends Error {}

export class WebhookIdRequired extends WebhookError {
    constructor() {
        super('Webhook id required.');
    }
}

export class WebhookNotFound extends WebhookError {
    constructor(WebhookId: number) {
        super(`Webhook '${WebhookId}' not found.`);
    }
}
