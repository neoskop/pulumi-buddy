import Axios from 'axios';

import { BuddyApi, InvalidResponseType } from './api';

const debug = require('debug')('pulumi-buddy:api:ssh-key');

export interface IBuddySshKeyInput {
    content: string;
    title?: string | null;
}

export interface IBuddySshKey {
    url: string;
    html_url: string;
    id: number;
    content: string;
    title: string | null;
}

export class BuddySshKeyApi {
    constructor(protected readonly api: BuddyApi, protected readonly sshKeyId?: number) {}

    getSshKeyId(): number {
        if (!this.sshKeyId) {
            throw new SshKeyIdRequired();
        }
        return this.sshKeyId;
    }

    async create(sshKey: IBuddySshKeyInput): Promise<IBuddySshKey> {
        debug('create %O', sshKey);
        try {
            const result = await this.api.client.post<IBuddySshKey>(`/user/keys`, sshKey, {
                cancelToken: this.api.registerCanceler('ssh-key').token
            });

            return result.data;
        } catch (e) {
            if (Axios.isCancel(e)) {
                throw e;
            } else if (e.response) {
                InvalidResponseType.checkResponseType(e.response, 'application/json');
                throw new SshKeyError(e.response.data.errors[0].message);
            } else {
                throw new SshKeyError(e.message);
            }
        }
    }

    async read(): Promise<IBuddySshKey> {
        debug('read %d', this.sshKeyId);
        if (!this.sshKeyId) {
            throw new SshKeyIdRequired();
        }

        try {
            const result = await this.api.client.get<IBuddySshKey>(`/user/keys/${this.sshKeyId}`, {
                cancelToken: this.api.registerCanceler('ssh-key').token
            });

            return result.data;
        } catch (e) {
            if (Axios.isCancel(e)) {
                throw e;
            } else if (e.response) {
                InvalidResponseType.checkResponseType(e.response, 'application/json');
                if (e.response.status === 404) {
                    throw new SshKeyNotFound(this.sshKeyId);
                } else {
                    throw new SshKeyError(e.response.data.errors[0].message);
                }
            } else {
                throw new SshKeyError(e.message);
            }
        }
    }

    async delete(): Promise<void> {
        debug('delete %d', this.sshKeyId);
        if (!this.sshKeyId) {
            throw new SshKeyIdRequired();
        }

        try {
            await this.api.client.delete(`/user/keys/${this.sshKeyId}`, {
                cancelToken: this.api.registerCanceler('ssh-key').token
            });
        } catch (e) {
            if (Axios.isCancel(e)) {
                throw e;
            } else if (e.response) {
                InvalidResponseType.checkResponseType(e.response, 'application/json');
                if (e.response.status === 404) {
                    throw new SshKeyNotFound(this.sshKeyId);
                } else {
                    throw new SshKeyError(e.response.data.errors[0].message);
                }
            } else {
                throw new SshKeyError(e.message);
            }
        }
    }
}

export class SshKeyError extends Error {}

export class SshKeyIdRequired extends SshKeyError {
    constructor() {
        super('SshKey id required.');
    }
}

export class SshKeyNotFound extends SshKeyError {
    constructor(SshKeyId: number) {
        super(`SshKey '${SshKeyId}' not found.`);
    }
}
