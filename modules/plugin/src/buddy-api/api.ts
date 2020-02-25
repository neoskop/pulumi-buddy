import { BuddyWorkspaceApi } from "./workspace";
import { CancelTokenSource } from "axios";

export class BuddyApi {
    canceler?: CancelTokenSource;

    constructor(protected readonly token: string, protected readonly apiUrl: string = 'https://api.buddy.works') {}

    getToken() {
        return this.token;
    }

    getApiUrl() {
        return this.apiUrl;
    }

    workspace(domain?: string) {
        return new BuddyWorkspaceApi(this, domain);
    }


}
