import Axios from 'axios';

import { BuddyApi } from './api';
import { BuddyWorkspaceApi } from './workspace';

const debug = require('debug')('pulumi-buddy:api:member');

export interface IBuddyMemberCreate {
    email: string;
}

export interface IBuddyMember {
    url: string;
    html_url: string;
    id: number;
    avatar_url: string;
    title: string | null;
    admin: boolean;
    workspace_owner: boolean;
}

export class BuddyMemberApi {
    constructor(protected readonly api: BuddyApi, protected readonly workspace: BuddyWorkspaceApi, protected readonly memberId?: number) {}

    getMemberId(): number {
        if (!this.memberId) {
            throw new MemberIdRequired();
        }
        return this.memberId;
    }

    async create(member: IBuddyMemberCreate): Promise<IBuddyMember> {
        debug('create %O', member);
        try {
            const result = await Axios.post<IBuddyMember>(
                `${this.api.getApiUrl()}/workspaces/${this.workspace.getDomain()}/members`,
                member,
                {
                    cancelToken: this.api.registerCanceler('member').token,
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
                throw new MemberError(e.response.data.errors[0].message);
            } else {
                throw new MemberError(e.message);
            }
        }
    }

    async read(): Promise<IBuddyMember> {
        debug('read %d', this.memberId);
        if (!this.memberId) {
            throw new MemberIdRequired();
        }

        try {
            const result = await Axios.get<IBuddyMember>(
                `${this.api.getApiUrl()}/workspaces/${this.workspace.getDomain()}/members/${this.memberId}`,
                {
                    cancelToken: this.api.registerCanceler('member').token,
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
                    throw new MemberNotFound(this.memberId);
                } else {
                    throw new MemberError(e.response.data.errors[0].message);
                }
            } else {
                throw new MemberError(e.message);
            }
        }
    }

    async delete(): Promise<void> {
        debug('delete %d', this.memberId);
        if (!this.memberId) {
            throw new MemberIdRequired();
        }

        try {
            await Axios.delete(`${this.api.getApiUrl()}/workspaces/${this.workspace.getDomain()}/members/${this.memberId}`, {
                cancelToken: this.api.registerCanceler('member').token,
                headers: {
                    Authorization: `Bearer ${this.api.getToken()}`
                }
            });
        } catch (e) {
            if (Axios.isCancel(e)) {
                throw e;
            } else if (e.response) {
                if (e.response.status === 404) {
                    throw new MemberNotFound(this.memberId);
                } else {
                    throw new MemberError(e.response.data.errors[0].message);
                }
            } else {
                throw new MemberError(e.message);
            }
        }
    }

    async setAdmin(admin: boolean): Promise<IBuddyMember> {
        debug('setAdmin %d %j', this.memberId, admin);
        if (!this.memberId) {
            throw new MemberIdRequired();
        }

        try {
            const result = await Axios.patch<IBuddyMember>(
                `${this.api.getApiUrl()}/workspaces/${this.workspace.getDomain()}/members/${this.memberId}`,
                { admin },
                {
                    cancelToken: this.api.registerCanceler('member').token,
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
                    throw new MemberNotFound(this.memberId);
                } else {
                    throw new MemberError(e.response.data.errors[0].message);
                }
            } else {
                throw new MemberError(e.message);
            }
        }
    }
}

export class MemberError extends Error {}

export class MemberIdRequired extends MemberError {
    constructor() {
        super('Member id required.');
    }
}

export class MemberNotFound extends MemberError {
    constructor(memberId: number) {
        super(`Member '${memberId}' not found.`);
    }
}
