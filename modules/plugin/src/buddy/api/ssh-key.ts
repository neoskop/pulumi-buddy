import Axios from 'axios';

import { BuddyApi } from './api';

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

    async create(SshKey: IBuddySshKeyInput): Promise<IBuddySshKey> {
        try {
            const result = await Axios.post<IBuddySshKey>(`${this.api.getApiUrl()}/user/keys`, SshKey, {
                cancelToken: this.api.registerCanceler('ssh-key').token,
                headers: {
                    Authorization: `Bearer ${this.api.getToken()}`
                }
            });

            return result.data;
        } catch (e) {
            if (Axios.isCancel(e)) {
                throw e;
            } else if (e.response) {
                throw new SshKeyError(e.response.data.errors[0].message);
            } else {
                throw new SshKeyError(e.message);
            }
        }
    }

    async read(): Promise<IBuddySshKey> {
        if (!this.sshKeyId) {
            throw new SshKeyIdRequired();
        }

        try {
            const result = await Axios.get<IBuddySshKey>(`${this.api.getApiUrl()}/user/keys/${this.sshKeyId}`, {
                cancelToken: this.api.registerCanceler('ssh-key').token,
                headers: {
                    Authorization: `Bearer ${this.api.getToken()}`
                }
            });

            return result.data;
        } catch (e) {
            if (Axios.isCancel(e)) {
                throw e;
            } else if (e.response) {
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
        if (!this.sshKeyId) {
            throw new SshKeyIdRequired();
        }

        try {
            await Axios.delete(`${this.api.getApiUrl()}/user/keys/${this.sshKeyId}`, {
                cancelToken: this.api.registerCanceler('ssh-key').token,
                headers: {
                    Authorization: `Bearer ${this.api.getToken()}`
                }
            });
        } catch (e) {
            if (Axios.isCancel(e)) {
                throw e;
            } else if (e.response) {
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
