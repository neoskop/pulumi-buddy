import Axios, { CancelTokenSource, ResponseType, AxiosResponse } from 'axios';
import { BuddyIntegrationApi } from './integration';
import { BuddySshKeyApi } from './ssh-key';
import { BuddyWorkspaceApi } from './workspace';

export class BuddyApi {
    protected readonly cancelerMap = new Map<CancelTokenSource, string>();

    constructor(protected token?: string, protected apiUrl: string = 'https://api.buddy.works') {}

    setToken(token: string) {
        this.token = token;
    }

    getToken() {
        return this.token;
    }

    setApiUrl(apiUrl: string) {
        this.apiUrl = apiUrl;
    }

    getApiUrl() {
        return this.apiUrl;
    }

    registerCanceler(type: string, canceler: CancelTokenSource = Axios.CancelToken.source()): CancelTokenSource {
        this.cancelerMap.set(canceler, type);

        return canceler;
    }

    cancel(type?: string) {
        for (const [canceler, t] of this.cancelerMap) {
            if (null == type || type === t) {
                canceler.cancel();
            }
        }
    }

    workspace(domain?: string) {
        return new BuddyWorkspaceApi(this, domain);
    }

    sshKey(sshKeyId?: number) {
        return new BuddySshKeyApi(this, sshKeyId);
    }

    integration(integrationId?: number) {
        return new BuddyIntegrationApi(this, integrationId);
    }
}

export class InvalidResponseType extends Error {
    static checkResponseType(response: AxiosResponse, expected: string): void | never {
        const given = response.headers['content-type'];

        if (given !== expected) {
            throw new InvalidResponseType(given, expected);
        }
    }

    constructor(givenType: string, expectedType: string) {
        super(`Expected response type "${expectedType}", got "${givenType}".`);
    }
}
