import Axios from 'axios';

import { BuddyApi } from './api';
import { BuddyWorkspaceApi } from './workspace';
import { IBuddyProject } from './project';
import { IBuddyPipeline } from './pipeline';
import { IBuddyAction } from './action';

export type EnvironmentVariableEvent = 'PUSH' | 'EXECUTION_STARTED' | 'EXECUTION_SUCCESSFUL' | 'EXECUTION_FAILED' | 'EXECUTION_FINISHED';

export interface IBuddyEnvironmentVariableInput {
    key: string;
    value: string;
    description?: string;
    ssh_key?: boolean;
    settable?: boolean;
    encrypted?: boolean;
    project?: { name: string };
    pipeline?: { id: number };
    action?: { id: number };
}

export interface IBuddyEnvironmentVariable extends IBuddyEnvironmentVariableInput {
    url: string;
    id: number;
    project?: IBuddyProject;
    pipeline?: IBuddyPipeline;
    action?: IBuddyAction;
}

export class BuddyEnvironmentVariableApi {
    constructor(protected readonly api: BuddyApi, protected readonly workspace: BuddyWorkspaceApi, protected readonly environmentVariableId?: number) {}

    getEnvironmentVariableId(): number {
        if (!this.environmentVariableId) {
            throw new EnvironmentVariableIdRequired();
        }
        return this.environmentVariableId;
    }

    async create(variable: IBuddyEnvironmentVariableInput): Promise<IBuddyEnvironmentVariable> {
        try {
            const result = await Axios.post<IBuddyEnvironmentVariable>(`${this.api.getApiUrl()}/workspaces/${this.workspace.getDomain()}/variables`, variable, {
                cancelToken: this.api.registerCanceler('environment-variable').token,
                headers: {
                    Authorization: `Bearer ${this.api.getToken()}`
                }
            });

            return result.data;
        } catch (e) {
            if (Axios.isCancel(e)) {
                throw e;
            } else if (e.response) {
                throw new EnvironmentVariableError(e.response.data.errors[0].message);
            } else {
                throw new EnvironmentVariableError(e.message);
            }
        }
    }

    async read(): Promise<IBuddyEnvironmentVariable> {
        if (!this.environmentVariableId) {
            throw new EnvironmentVariableIdRequired();
        }

        try {
            const result = await Axios.get<IBuddyEnvironmentVariable>(
                `${this.api.getApiUrl()}/workspaces/${this.workspace.getDomain()}/variables/${this.environmentVariableId}`,
                {
                    cancelToken: this.api.registerCanceler('environment-variable').token,
                    headers: {
                        Authorization: `Bearer ${this.api.getToken()}`
                    }
                }
            );

            return result.data;
        } catch (e) {
            if (Axios.isCancel(e)) {
                throw e;
            } else if (e.response) {
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
        if (!this.environmentVariableId) {
            throw new EnvironmentVariableIdRequired();
        }

        try {
            const result = await Axios.patch<IBuddyEnvironmentVariable>(
                `${this.api.getApiUrl()}/workspaces/${this.workspace.getDomain()}/variables/${this.environmentVariableId}`,
                update,
                {
                    cancelToken: this.api.registerCanceler('environment-variable').token,
                    headers: {
                        Authorization: `Bearer ${this.api.getToken()}`
                    }
                }
            );

            return result.data;
        } catch (e) {
            if (Axios.isCancel(e)) {
                throw e;
            } else if (e.response) {
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
        if (!this.environmentVariableId) {
            throw new EnvironmentVariableIdRequired();
        }

        try {
            await Axios.delete(`${this.api.getApiUrl()}/workspaces/${this.workspace.getDomain()}/variables/${this.environmentVariableId}`, {
                cancelToken: this.api.registerCanceler('environment-variable').token,
                headers: {
                    Authorization: `Bearer ${this.api.getToken()}`
                }
            });
        } catch (e) {
            if (Axios.isCancel(e)) {
                throw e;
            } else if (e.response) {
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
