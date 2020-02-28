import Axios from 'axios';

import { BuddyApi } from './api';
import { BuddyWorkspaceApi } from './workspace';

export interface IBuddyGroupInput {
    name: string;
    description?: string|null;
}

export interface IBuddyGroup {
    url: string;
    html_url: string;
    id: number;
    name: string;
    description: string|null;
}

export class BuddyGroupApi {
    constructor(protected readonly api: BuddyApi, protected readonly workspace: BuddyWorkspaceApi, protected readonly groupId?: number) {}

    getGroupId(): number {
        if (!this.groupId) {
            throw new GroupIdRequired();
        }
        return this.groupId;
    }

    async create(Group: IBuddyGroupInput): Promise<IBuddyGroup> {
        try {
            const result = await Axios.post<IBuddyGroup>(`${this.api.getApiUrl()}/workspaces/${this.workspace.getDomain()}/groups`, Group, {
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
                throw new GroupError(e.response.data.errors[0].message);
            } else {
                throw new GroupError(e.message);
            }
        }
    }

    async read(): Promise<IBuddyGroup> {
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
    constructor(GroupId: number) {
        super(`Group '${GroupId}' not found.`);
    }
}
