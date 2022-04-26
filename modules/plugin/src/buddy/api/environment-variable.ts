import Axios from 'axios';

import { BuddyApi, InvalidResponseType } from './api';
import { BuddyWorkspaceApi } from './workspace';
import { IBuddyProject } from './project';
import { IBuddyPipeline } from './pipeline';
import { IBuddyAction } from './action';

const debug = require('debug')('pulumi-buddy:api:environment-variable');

export type EnvironmentVariableEvent = 'PUSH' | 'EXECUTION_STARTED' | 'EXECUTION_SUCCESSFUL' | 'EXECUTION_FAILED' | 'EXECUTION_FINISHED';

export interface IBuddyEnvironmentVariableInput {
    key: string;
    value: string;
    description?: string;
    type?: 'SSH_KEY' | 'VAR';
    settable?: boolean;
    encrypted?: boolean;
    project?: { name: string };
    pipeline?: { id: number };
    action?: { id: number };
    file_place?: 'CONTAINER' | 'NONE';
    file_name?: string;
    file_path?: string;
    file_chmod?: string;
}

export interface IBuddyEnvironmentVariable extends IBuddyEnvironmentVariableInput {
    url: string;
    id: number;
    project?: IBuddyProject;
    pipeline?: IBuddyPipeline;
    action?: IBuddyAction;
}

export class BuddyEnvironmentVariableApi {
    constructor(
        protected readonly api: BuddyApi,
        protected readonly workspace: BuddyWorkspaceApi,
        protected readonly environmentVariableId?: number
    ) {}

    getEnvironmentVariableId(): number {
        if (!this.environmentVariableId) {
            throw new EnvironmentVariableIdRequired();
        }
        return this.environmentVariableId;
    }

    async create(variable: IBuddyEnvironmentVariableInput): Promise<IBuddyEnvironmentVariable> {
        debug('create %O', variable);
        try {
            const result = await this.api.client.post<IBuddyEnvironmentVariable>(
                `/workspaces/${this.workspace.getDomain()}/variables`,
                variable,
                {
                    cancelToken: this.api.registerCanceler('environment-variable').token
                }
            );

            return result.data;
        } catch (e) {
            if (Axios.isCancel(e)) {
                throw e;
            } else if (e.response) {
                InvalidResponseType.checkResponseType(e.response, 'application/json');
                throw new EnvironmentVariableError(e.response.data.errors[0].message);
            } else {
                throw new EnvironmentVariableError(e.message);
            }
        }
    }

    async read(): Promise<IBuddyEnvironmentVariable> {
        debug('read %d', this.environmentVariableId);
        if (!this.environmentVariableId) {
            throw new EnvironmentVariableIdRequired();
        }

        try {
            const result = await this.api.client.get<IBuddyEnvironmentVariable>(
                `/workspaces/${this.workspace.getDomain()}/variables/${this.environmentVariableId}`,
                {
                    cancelToken: this.api.registerCanceler('environment-variable').token
                }
            );

            return result.data;
        } catch (e) {
            if (Axios.isCancel(e)) {
                throw e;
            } else if (e.response) {
                InvalidResponseType.checkResponseType(e.response, 'application/json');
                if (e.response.status === 404) {
                    throw new EnvironmentVariableNotFound(this.environmentVariableId);
                } else {
                    throw new EnvironmentVariableError(e.response.data.errors[0].message);
                }
            } else {
                throw new EnvironmentVariableError(e.message);
            }
        }
    }

    async update(update: Partial<IBuddyEnvironmentVariableInput>): Promise<IBuddyEnvironmentVariable> {
        debug('update %d %O', this.environmentVariableId, update);
        if (!this.environmentVariableId) {
            throw new EnvironmentVariableIdRequired();
        }

        try {
            const result = await this.api.client.patch<IBuddyEnvironmentVariable>(
                `/workspaces/${this.workspace.getDomain()}/variables/${this.environmentVariableId}`,
                update,
                {
                    cancelToken: this.api.registerCanceler('environment-variable').token
                }
            );

            return result.data;
        } catch (e) {
            if (Axios.isCancel(e)) {
                throw e;
            } else if (e.response) {
                InvalidResponseType.checkResponseType(e.response, 'application/json');
                if (e.response.status === 404) {
                    throw new EnvironmentVariableNotFound(this.environmentVariableId);
                } else {
                    throw new EnvironmentVariableError(e.response.data.errors[0].message);
                }
            } else {
                throw new EnvironmentVariableError(e.message);
            }
        }
    }

    async delete(): Promise<void> {
        debug('delete %d', this.environmentVariableId);
        if (!this.environmentVariableId) {
            throw new EnvironmentVariableIdRequired();
        }

        try {
            await this.api.client.delete(`/workspaces/${this.workspace.getDomain()}/variables/${this.environmentVariableId}`, {
                cancelToken: this.api.registerCanceler('environment-variable').token
            });
        } catch (e) {
            if (Axios.isCancel(e)) {
                throw e;
            } else if (e.response) {
                InvalidResponseType.checkResponseType(e.response, 'application/json');
                if (e.response.status === 404) {
                    throw new EnvironmentVariableNotFound(this.environmentVariableId);
                } else {
                    throw new EnvironmentVariableError(e.response.data.errors[0].message);
                }
            } else {
                throw new EnvironmentVariableError(e.message);
            }
        }
    }
}

export class EnvironmentVariableError extends Error {}

export class EnvironmentVariableIdRequired extends EnvironmentVariableError {
    constructor() {
        super('Environment variable id required.');
    }
}

export class EnvironmentVariableNotFound extends EnvironmentVariableError {
    constructor(EnvironmentVariableId: number) {
        super(`Environment variable '${EnvironmentVariableId}' not found.`);
    }
}
