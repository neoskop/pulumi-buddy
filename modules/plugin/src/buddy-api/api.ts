import { CancelTokenSource } from 'axios';

import { BuddyWorkspaceApi } from './workspace';

export class BuddyApi {
    canceler?: CancelTokenSource;

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

    workspace(domain?: string) {
        return new BuddyWorkspaceApi(this, domain);
    }
}
