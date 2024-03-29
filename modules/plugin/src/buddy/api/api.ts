import Axios, { CancelTokenSource, AxiosResponse, AxiosInstance } from 'axios';
import { BuddySshKeyApi } from './ssh-key';
import { BuddyWorkspaceApi } from './workspace';

export class BuddyApi {
    protected readonly cancelerMap = new Map<CancelTokenSource, string>();
    public readonly client!: AxiosInstance;

    constructor(protected token?: string, protected apiUrl: string = 'https://api.buddy.works') {
        this.createClient();
    }

    protected createClient() {
        (this as { client: AxiosInstance }).client = Axios.create({
            baseURL: this.apiUrl,
            headers: {
                'X-Buddy-Media-Type': 'buddy.v1.1.0',
                Authorization: `Bearer ${this.getToken()}`
            }
        });
    }

    setToken(token: string) {
        this.token = token;
        this.createClient();
    }

    getToken() {
        return this.token;
    }

    setApiUrl(apiUrl: string) {
        this.apiUrl = apiUrl;
        this.createClient();
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
