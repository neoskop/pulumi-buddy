import Axios from 'axios';

import { BuddyApi } from './api';
import { BuddyWorkspaceApi } from './workspace';

export type PipelineAccessLevel = 'DENIED' | 'READ_ONLY' | 'RUN_ONLY'| 'READ_WRITE';
export type RepositoryAccessLevel = 'DENIED' | 'READ_ONLY'| 'READ_WRITE';
export type SandboxAccessLevel = 'DENIED' | 'READ_WRITE';

const debug = require('debug')('pulumi-buddy:api:permission');
export interface IBuddyPermissionInput {
    name: string;
    description?: string|null;
    pipeline_access_level: PipelineAccessLevel;
    repository_access_level: RepositoryAccessLevel;
    sandbox_access_level: SandboxAccessLevel;
}

export interface IBuddyPermission extends IBuddyPermissionInput {
    url: string;
    html_url: string;
    id: number;
    description: string|null;
}

export class BuddyPermissionApi {
    constructor(protected readonly api: BuddyApi, protected readonly workspace: BuddyWorkspaceApi, protected readonly permissionId?: number) {}

    getPermissionId(): number {
        if (!this.permissionId) {
            throw new PermissionIdRequired();
        }
        return this.permissionId;
    }

    async create(permission: IBuddyPermissionInput): Promise<IBuddyPermission> {
        debug('create %O', permission);
        try {
            const result = await Axios.post<IBuddyPermission>(`${this.api.getApiUrl()}/workspaces/${this.workspace.getDomain()}/permissions`, permission, {
                cancelToken: this.api.registerCanceler('permission').token,
                headers: {
                    Authorization: `Bearer ${this.api.getToken()}`
                }
            });

            return result.data;
        } catch (e) {
            if (Axios.isCancel(e)) {
                throw e;
            } else if (e.response) {
                throw new PermissionError(e.response.data.errors[0].message);
            } else {
                throw new PermissionError(e.message);
            }
        }
    }

    async read(): Promise<IBuddyPermission> {
        debug('read %d', this.permissionId);
        if (!this.permissionId) {
            throw new PermissionIdRequired();
        }

        try {
            const result = await Axios.get<IBuddyPermission>(
                `${this.api.getApiUrl()}/workspaces/${this.workspace.getDomain()}/permissions/${this.permissionId}`,
                {
                    cancelToken: this.api.registerCanceler('permission').token,
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
                    throw new PermissionNotFound(this.permissionId);
                } else {
                    throw new PermissionError(e.response.data.errors[0].message);
                }
            } else {
                throw new PermissionError(e.message);
            }
        }
    }

    async update(update: IBuddyPermissionInput): Promise<IBuddyPermission> {
        debug('update %d %O', this.permissionId, update);
        if (!this.permissionId) {
            throw new PermissionIdRequired();
        }

        try {
            const result = await Axios.patch<IBuddyPermission>(
                `${this.api.getApiUrl()}/workspaces/${this.workspace.getDomain()}/permissions/${this.permissionId}`,
                update,
                {
                    cancelToken: this.api.registerCanceler('permission').token,
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
                    throw new PermissionNotFound(this.permissionId);
                } else {
                    throw new PermissionError(e.response.data.errors[0].message);
                }
            } else {
                throw new PermissionError(e.message);
            }
        }
    }

    async delete(): Promise<void> {
        debug('delete %d', this.permissionId);
        if (!this.permissionId) {
            throw new PermissionIdRequired();
        }

        try {
            await Axios.delete(`${this.api.getApiUrl()}/workspaces/${this.workspace.getDomain()}/permissions/${this.permissionId}`, {
                cancelToken: this.api.registerCanceler('permission').token,
                headers: {
                    Authorization: `Bearer ${this.api.getToken()}`
                }
            });
        } catch (e) {
            if (Axios.isCancel(e)) {
                throw e;
            } else if (e.response) {
                if (e.response.status === 404) {
                    throw new PermissionNotFound(this.permissionId);
                } else {
                    throw new PermissionError(e.response.data.errors[0].message);
                }
            } else {
                throw new PermissionError(e.message);
            }
        }
    }
}

export class PermissionError extends Error {}

export class PermissionIdRequired extends PermissionError {
    constructor() {
        super('Permission id required.');
    }
}

export class PermissionNotFound extends PermissionError {
    constructor(permissionId: number) {
        super(`Permission '${permissionId}' not found.`);
    }
}
