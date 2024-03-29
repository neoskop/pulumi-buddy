import Axios from 'axios';

import { BuddyApi, InvalidResponseType } from './api';
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
            const result = await this.api.client.post<IBuddyMember>(`/workspaces/${this.workspace.getDomain()}/members`, member, {
                cancelToken: this.api.registerCanceler('member').token
            });

            return result.data;
        } catch (e) {
            if (Axios.isCancel(e)) {
                throw e;
            } else if (e.response) {
                InvalidResponseType.checkResponseType(e.response, 'application/json');
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
            const result = await this.api.client.get<IBuddyMember>(`/workspaces/${this.workspace.getDomain()}/members/${this.memberId}`, {
                cancelToken: this.api.registerCanceler('member').token
            });

            return result.data;
        } catch (e) {
            if (Axios.isCancel(e)) {
                throw e;
            } else if (e.response) {
                InvalidResponseType.checkResponseType(e.response, 'application/json');
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
            await this.api.client.delete(`/workspaces/${this.workspace.getDomain()}/members/${this.memberId}`, {
                cancelToken: this.api.registerCanceler('member').token
            });
        } catch (e) {
            if (Axios.isCancel(e)) {
                throw e;
            } else if (e.response) {
                InvalidResponseType.checkResponseType(e.response, 'application/json');
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
            const result = await this.api.client.patch<IBuddyMember>(
                `/workspaces/${this.workspace.getDomain()}/members/${this.memberId}`,
                { admin },
                {
                    cancelToken: this.api.registerCanceler('member').token
                }
            );

            return result.data;
        } catch (e) {
            if (Axios.isCancel(e)) {
                throw e;
            } else if (e.response) {
                InvalidResponseType.checkResponseType(e.response, 'application/json');
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
