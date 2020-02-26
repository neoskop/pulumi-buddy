import Axios, { CancelTokenSource } from 'axios';

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
        for(const [ canceler, t ] of this.cancelerMap) {
            if(null == type || type === t) {
                canceler.cancel();
            }
        }
    }

    workspace(domain?: string) {
        return new BuddyWorkspaceApi(this, domain);
    }
}
