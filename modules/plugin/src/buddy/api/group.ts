import Axios from 'axios';
import { BuddyApi, InvalidResponseType } from './api';
import { BuddyWorkspaceApi } from './workspace';
import { IBuddyMember } from './member';

const debug = require('debug')('pulumi-buddy:api:action');

export interface IBuddyGroupInput {
    name: string;
    description?: string | null;
}

export interface IBuddyGroup {
    url: string;
    html_url: string;
    id: number;
    name: string;
    description: string | null;
}

export class BuddyGroupApi {
    constructor(protected readonly api: BuddyApi, protected readonly workspace: BuddyWorkspaceApi, protected readonly groupId?: number) {}

    getGroupId(): number {
        if (!this.groupId) {
            throw new GroupIdRequired();
        }
        return this.groupId;
    }

    async create(group: IBuddyGroupInput): Promise<IBuddyGroup> {
        debug('create %O', group);
        try {
            const result = await Axios.post<IBuddyGroup>(`${this.api.getApiUrl()}/workspaces/${this.workspace.getDomain()}/groups`, group, {
                cancelToken: this.api.registerCanceler('group').token,
                headers: {
                    Authorization: `Bearer ${this.api.getToken()}`
                }
            });

            return result.data;
        } catch (e) {
            if (Axios.isCancel(e)) {
                throw e;
            } else if (e.response) {
                InvalidResponseType.checkResponseType(e.response, 'application/json');
                throw new GroupError(e.response.data.errors[0].message);
            } else {
                throw new GroupError(e.message);
            }
        }
    }

    async read(): Promise<IBuddyGroup> {
        debug('read %d', this.groupId);
        if (!this.groupId) {
            throw new GroupIdRequired();
        }

        try {
            const result = await Axios.get<IBuddyGroup>(
                `${this.api.getApiUrl()}/workspaces/${this.workspace.getDomain()}/groups/${this.groupId}`,
                {
                    cancelToken: this.api.registerCanceler('group').token,
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
                InvalidResponseType.checkResponseType(e.response, 'application/json');
                if (e.response.status === 404) {
                    throw new GroupNotFound(this.groupId);
                } else {
                    throw new GroupError(e.response.data.errors[0].message);
                }
            } else {
                throw new GroupError(e.message);
            }
        }
    }

    async update(update: Partial<IBuddyGroupInput>): Promise<IBuddyGroup> {
        debug('update %d %O', this.groupId, update);
        if (!this.groupId) {
            throw new GroupIdRequired();
        }

        try {
            const result = await Axios.patch<IBuddyGroup>(
                `${this.api.getApiUrl()}/workspaces/${this.workspace.getDomain()}/groups/${this.groupId}`,
                update,
                {
                    cancelToken: this.api.registerCanceler('group').token,
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
                InvalidResponseType.checkResponseType(e.response, 'application/json');
                if (e.response.status === 404) {
                    throw new GroupNotFound(this.groupId);
                } else {
                    throw new GroupError(e.response.data.errors[0].message);
                }
            } else {
                throw new GroupError(e.message);
            }
        }
    }

    async delete(): Promise<void> {
        debug('delete %d', this.groupId);
        if (!this.groupId) {
            throw new GroupIdRequired();
        }

        try {
            await Axios.delete(`${this.api.getApiUrl()}/workspaces/${this.workspace.getDomain()}/groups/${this.groupId}`, {
                cancelToken: this.api.registerCanceler('group').token,
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
                    throw new GroupNotFound(this.groupId);
                } else {
                    throw new GroupError(e.response.data.errors[0].message);
                }
            } else {
                throw new GroupError(e.message);
            }
        }
    }

    async getMember(id: number): Promise<IBuddyMember> {
        debug('getMember %d %d', this.groupId, id);
        if (!this.groupId) {
            throw new GroupIdRequired();
        }

        try {
            const result = await Axios.get<IBuddyMember>(
                `${this.api.getApiUrl()}/workspaces/${this.workspace.getDomain()}/groups/${this.groupId}/members/${id}`,
                {
                    cancelToken: this.api.registerCanceler('group').token,
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
                InvalidResponseType.checkResponseType(e.response, 'application/json');
                if (e.response.status === 404) {
                    throw new GroupNotFound(this.groupId);
                } else {
                    throw new GroupError(e.response.data.errors[0].message);
                }
            } else {
                throw new GroupError(e.message);
            }
        }
    }

    async addMember(id: number): Promise<IBuddyMember> {
        debug('addMember %d %d', this.groupId, id);
        if (!this.groupId) {
            throw new GroupIdRequired();
        }

        try {
            const result = await Axios.post<IBuddyMember>(
                `${this.api.getApiUrl()}/workspaces/${this.workspace.getDomain()}/groups/${this.groupId}/members`,
                { id },
                {
                    cancelToken: this.api.registerCanceler('group').token,
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
                InvalidResponseType.checkResponseType(e.response, 'application/json');
                if (e.response.status === 404) {
                    throw new GroupNotFound(this.groupId);
                } else {
                    throw new GroupError(e.response.data.errors[0].message);
                }
            } else {
                throw new GroupError(e.message);
            }
        }
    }

    async deleteMember(id: number): Promise<void> {
        debug('deleteMember %d %d', this.groupId, id);
        if (!this.groupId) {
            throw new GroupIdRequired();
        }

        try {
            const result = await Axios.delete<void>(
                `${this.api.getApiUrl()}/workspaces/${this.workspace.getDomain()}/groups/${this.groupId}/members/${id}`,
                {
                    cancelToken: this.api.registerCanceler('group').token,
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
                InvalidResponseType.checkResponseType(e.response, 'application/json');
                if (e.response.status === 404) {
                    throw new GroupNotFound(this.groupId);
                } else {
                    throw new GroupError(e.response.data.errors[0].message);
                }
            } else {
                throw new GroupError(e.message);
            }
        }
    }
}

export class GroupError extends Error {}

export class GroupIdRequired extends GroupError {
    constructor() {
        super('Group id required.');
    }
}

export class GroupNotFound extends GroupError {
    constructor(groupId: number) {
        super(`Group '${groupId}' not found.`);
    }
}
