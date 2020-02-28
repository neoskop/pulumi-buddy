import { BuddyApi } from './api';
import { BuddyProjectApi } from './project';
import { BuddyMemberApi } from './member';
import { BuddyGroupApi } from './group';
import { BuddyPermissionApi } from './permission';

export class BuddyWorkspaceApi {
    constructor(protected readonly api: BuddyApi, protected readonly domain?: string) {}

    getDomain(): string {
        if (!this.domain) {
            throw new WorkspaceDomainRequired();
        }
        return this.domain;
    }

    async list(): Promise<unknown[]> {
        throw 'not_implemented';
    }

    async get(): Promise<unknown> {
        if (!this.domain) {
            throw new WorkspaceDomainRequired();
        }
        throw 'not_implemeted';
    }

    project(name?: string) {
        return new BuddyProjectApi(this.api, this, name);
    }

    member(memberId?: number) {
        return new BuddyMemberApi(this.api, this, memberId);
    }

    group(groupId?: number) {
        return new BuddyGroupApi(this.api, this, groupId);
    }

    permission(permissionId?: number) {
        return new BuddyPermissionApi(this.api, this, permissionId);
    }
}

export class WorkspaceError extends Error {}

export class WorkspaceDomainRequired extends WorkspaceError {
    constructor() {
        super('Workspace domain required.');
    }
}
