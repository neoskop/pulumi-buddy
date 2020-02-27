import Axios from 'axios';

import { BuddyApi } from './api';
import { BuddyPipelineApi } from './pipeline';
import { BuddyWorkspaceApi } from './workspace';

export interface IBuddyProject {
    url: string;
    html_url: string;
    name: string;
    display_name: string;
    status: string;
    create_date: string;
    created_by: {
        url: string;
        html_url: string;
        id: number;
        name: string;
        avatar_url: string;
        title: string;
    };
    http_repository: string;
    ssh_repository: string;
    size: number;
    default_branch: string;
}

export interface IBuddyIdIntegration {
    id: number;
}

export interface IBuddyHashIdIntegration {
    hash_id: string;
}

export type BuddyIntegration = IBuddyIdIntegration | IBuddyHashIdIntegration;

export interface IBuddyIntegrationProjectCreate {
    name?: string | undefined;
    display_name: string;
    integration: BuddyIntegration;
    external_project_id: string;
}

export interface IBuddyCustomProjectCreate {
    name: string;
    display_name: string;
    custom_repo_url?: string;
    custom_repo_user?: string;
    custom_repo_pass?: string;
}

export type BuddyProjectCreate = IBuddyIntegrationProjectCreate | IBuddyCustomProjectCreate;

export interface IBuddyProjectUpdate {
    name?: string;
    display_name?: string;
}

export class BuddyProjectApi {
    constructor(
        protected readonly api: BuddyApi,
        protected readonly workspace: BuddyWorkspaceApi,
        protected readonly projectName?: string
    ) {}

    getProjectName(): string {
        if (!this.projectName) {
            throw new ProjectNameRequired();
        }
        return this.projectName;
    }

    pipeline(pipelineId?: number) {
        return new BuddyPipelineApi(this.api, this.workspace, this, pipelineId);
    }

    async create(project: BuddyProjectCreate): Promise<IBuddyProject> {

        try {
            const result = await Axios.post<IBuddyProject>(
                `${this.api.getApiUrl()}/workspaces/${this.workspace.getDomain()}/projects`,
                project,
                {
                    cancelToken: this.api.registerCanceler('project').token,
                    headers: {
                        Authorization: `Bearer ${this.api.getToken()}`
                    }
                }
            );

            return result.data;
        } catch (e) {
            if (Axios.isCancel(e)) {
                throw e;
            } else if (e.response) {
                throw new ProjectError(e.response.data.errors[0].message);
            } else {
                throw new ProjectError(e.message);
            }
        }
    }

    async read(): Promise<IBuddyProject> {
        if (!this.projectName) {
            throw new ProjectNameRequired();
        }

        try {
            const result = await Axios.get<IBuddyProject>(
                `${this.api.getApiUrl()}/workspaces/${this.workspace.getDomain()}/projects/${this.projectName}`,
                {
                    cancelToken: this.api.registerCanceler('project').token,
                    headers: {
                        Authorization: `Bearer ${this.api.getToken()}`
                    }
                }
            );

            return result.data;
        } catch (e) {
            if (Axios.isCancel(e)) {
                throw e;
            } else if (e.response) {
                if (e.response.status === 404) {
                    throw new ProjectNotFound(this.projectName);
                } else {
                    throw new ProjectError(e.response.data.errors[0].message);
                }
            } else {
                throw new ProjectError(e.message);
            }
        }
    }

    async update(update: IBuddyProjectUpdate): Promise<IBuddyProject> {
        if (!this.projectName) {
            throw new ProjectNameRequired();
        }

        try {
            const result = await Axios.patch<IBuddyProject>(
                `${this.api.getApiUrl()}/workspaces/${this.workspace.getDomain()}/projects/${this.projectName}`,
                update,
                {
                    cancelToken: this.api.registerCanceler('project').token,
                    headers: {
                        Authorization: `Bearer ${this.api.getToken()}`
                    }
                }
            );

            return result.data;
        } catch (e) {
            if (Axios.isCancel(e)) {
                throw e;
            } else if (e.response) {
                if (e.response.status === 404) {
                    throw new ProjectNotFound(this.projectName);
                } else if(e.response.data.errors[0].message === 'Operation not permitted until all jobs and deployments are completed.') {
                    throw new ProjectNotReady(this.projectName);
                } else {
                    throw new ProjectError(e.response.data.errors[0].message);
                }
            } else {
                throw new ProjectError(e.message);
            }
        }
    }

    async delete(): Promise<void> {
        if (!this.projectName) {
            throw new ProjectNameRequired();
        }

        try {
            await Axios.delete(`${this.api.getApiUrl()}/workspaces/${this.workspace.getDomain()}/projects/${this.projectName}`, {
                cancelToken: this.api.registerCanceler('project').token,
                headers: {
                    Authorization: `Bearer ${this.api.getToken()}`
                }
            });
        } catch (e) {
            if (Axios.isCancel(e)) {
                throw e;
            } else if (e.response) {
                if (e.response.status === 404) {
                    throw new ProjectNotFound(this.projectName);
                } else {
                    throw new ProjectError(e.response.data.errors[0].message);
                }
            } else {
                throw new ProjectError(e.message);
            }
        }
    }
}

export class ProjectError extends Error {}

export class ProjectNameRequired extends ProjectError {
    constructor() {
        super('Project name required.');
    }
}

export class ProjectNotFound extends ProjectError {
    constructor(projectName: string) {
        super(`Project '${projectName}' not found.`);
    }
}
export class ProjectNotReady extends ProjectError {
    constructor(projectName: string) {
        super(`Project '${projectName}' is not ready.`);
    }
}
