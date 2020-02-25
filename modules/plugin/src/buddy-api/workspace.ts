import { BuddyApi } from './api';

export class BuddyWorkspaceApi {
    constructor(protected readonly api: BuddyApi, protected readonly domain?: string) {}

    getDomain(): string {
        if(!this.domain) {
            throw new WorkspaceDomainRequired();
        }
        return this.domain;
    }

    async list(): Promise<unknown[]> {
        throw 'not_implemented';
    }

    async get(): Promise<unknown> {
        if(!this.domain) {
            throw new WorkspaceDomainRequired();
        }
        throw 'not_implemeted';
    }

    project(name?: string) {

    }
}

export class WorkspaceError extends Error {}

export class WorkspaceDomainRequired extends WorkspaceError {
    constructor() {
        super('Workspace domain required.');
    }
}
