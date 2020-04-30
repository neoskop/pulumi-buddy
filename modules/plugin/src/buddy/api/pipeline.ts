import Axios from 'axios';
import { BuddyActionApi } from './action';
import { BuddyApi, InvalidResponseType } from './api';
import { BuddyProjectApi, ProjectNotFound } from './project';
import { BuddyWorkspaceApi } from './workspace';

const debug = require('debug')('pulumi-buddy:api:pipeline');

export interface IBuddyPipeline {
    url: string;
    html_url: string;
    id: number;
    name: string;
    trigger_mode: string;
    ref_type: string;
    ref_name: string;
    execution_message_template: string;
    last_execution_status: string;
    last_execution_revision: string | null;
    create_date: string;
    always_from_scratch: boolean;
    auto_clear_cache: boolean;
    no_skip_to_most_recent: boolean;
    do_not_create_commit_status: boolean;
    ignore_fail_on_project_status: boolean;
    trigger_condition?: TriggerCondition;
    trigger_condition_paths?: string[];
    trigger_variable_key?: string;
    trigger_variable_value?: string;
    trigger_hours?: number[];
    trigger_days?: number[];
    zone_id?: string;
    trigger_project_name?: string;
    trigger_pipeline_name?: string;
    project: {
        url: string;
        html_url: string;
        name: string;
        display_name: string;
        status: string;
    };
    creator: {
        url: string;
        html_url: string;
        id: number;
        name: string;
        avatar_url: string;
        title: string;
    };
    actions: unknown[];
}

export type TriggerMode = 'MANUAL' | 'SCHEDULED' | 'ON_EVERY_PUSH';
export type RefType = 'BRANCH' | 'TAG' | 'WILDCARD' | 'PULL_REQUEST' | 'NONE';
export type TriggerCondition =
    | 'ALWAYS'
    | 'ON_CHANGE'
    | 'ON_CHANGE_AT_PATH'
    | 'VAR_IS'
    | 'VAR_IS_NOT'
    | 'VAR_CONTAINS'
    | 'VAR_NOT_CONTAINS'
    | 'DATETIME'
    | 'SUCCESS_PIPELINE';

export interface IBuddyPipelineInput {
    project_name: string;
    name: string;
    ref_name: string;
    trigger_mode: TriggerMode;
    ref_type?: RefType;
    always_from_scratch?: boolean;
    auto_clear_cache?: boolean;
    no_skip_to_most_recent?: boolean;
    do_not_create_commit_status?: boolean;
    start_date?: string;
    delay?: number;
    cron?: string;
    run_always?: boolean;
    paused?: boolean;
    ignore_fail_on_project_status?: boolean;
    execution_message_template?: string;
    trigger_condition?: TriggerCondition;
    trigger_condition_paths?: string[];
    trigger_variable_key?: string;
    trigger_variable_value?: string;
    trigger_hours?: number[];
    trigger_days?: number[];
    zone_id?: string;
    trigger_project_name?: string;
    trigger_pipeline_name?: string;
}

export class BuddyPipelineApi {
    constructor(
        protected readonly api: BuddyApi,
        protected readonly workspace: BuddyWorkspaceApi,
        protected readonly project: BuddyProjectApi,
        protected readonly pipelineId?: number
    ) {}

    getPipelineId(): number {
        if (!this.pipelineId) {
            throw new PipelineIdRequired();
        }
        return this.pipelineId;
    }

    action(actionId?: number) {
        return new BuddyActionApi(this.api, this.workspace, this.project, this, actionId);
    }

    async create(pipeline: IBuddyPipelineInput): Promise<IBuddyPipeline> {
        debug('create %O', pipeline);
        try {
            const result = await Axios.post<IBuddyPipeline>(
                `${this.api.getApiUrl()}/workspaces/${this.workspace.getDomain()}/projects/${this.project.getProjectName()}/pipelines`,
                pipeline,
                {
                    cancelToken: this.api.registerCanceler('pipeline').token,
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
                InvalidResponseType.checkResponseType(e.response, 'application/json');
                if (e.response.status === 404) {
                    throw new ProjectNotFound(this.project.getProjectName());
                } else {
                    throw new PipelineError(e.response.data.errors[0].message);
                }
            } else {
                throw new PipelineError(e.message);
            }
        }
    }

    async read(): Promise<IBuddyPipeline> {
        debug('read %d', this.pipelineId);
        if (!this.pipelineId) {
            throw new PipelineIdRequired();
        }

        try {
            const result = await Axios.get<IBuddyPipeline>(
                `${this.api.getApiUrl()}/workspaces/${this.workspace.getDomain()}/projects/${this.project.getProjectName()}/pipelines/${
                    this.pipelineId
                }`,
                {
                    cancelToken: this.api.registerCanceler('pipeline').token,
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
                InvalidResponseType.checkResponseType(e.response, 'application/json');
                if (e.response.status === 404) {
                    throw new PipelineNotFound(this.pipelineId);
                } else {
                    throw new PipelineError(e.response.data.errors[0].message);
                }
            } else {
                throw new PipelineError(e.message);
            }
        }
    }

    async update(update: IBuddyPipelineInput): Promise<IBuddyPipeline> {
        debug('update %d %O', this.pipelineId, update);
        if (!this.pipelineId) {
            throw new PipelineIdRequired();
        }

        try {
            const result = await Axios.patch<IBuddyPipeline>(
                `${this.api.getApiUrl()}/workspaces/${this.workspace.getDomain()}/projects/${this.project.getProjectName()}/pipelines/${
                    this.pipelineId
                }`,
                update,
                {
                    cancelToken: this.api.registerCanceler('pipeline').token,
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
                InvalidResponseType.checkResponseType(e.response, 'application/json');
                if (e.response.code === 404) {
                    throw new PipelineNotFound(this.pipelineId);
                } else {
                    throw new PipelineError(e.response.data.errors[0].message);
                }
            } else {
                throw new PipelineError(e.message);
            }
        }
    }

    async delete(): Promise<void> {
        debug('delete %d', this.pipelineId);
        if (!this.pipelineId) {
            throw new PipelineIdRequired();
        }

        try {
            await Axios.delete(
                `${this.api.getApiUrl()}/workspaces/${this.workspace.getDomain()}/projects/${this.project.getProjectName()}/pipelines/${
                    this.pipelineId
                }`,
                {
                    cancelToken: this.api.registerCanceler('pipeline').token,
                    headers: {
                        Authorization: `Bearer ${this.api.getToken()}`
                    }
                }
            );
        } catch (e) {
            if (Axios.isCancel(e)) {
                throw e;
            } else if (e.response) {
                InvalidResponseType.checkResponseType(e.response, 'application/json');
                if (e.response.status === 404) {
                    throw new PipelineNotFound(this.pipelineId);
                } else {
                    throw new PipelineError(e.response.data.errors[0].message);
                }
            } else {
                throw new PipelineError(e.message);
            }
        }
    }
}

export class PipelineError extends Error {}

export class PipelineIdRequired extends PipelineError {
    constructor() {
        super('Pipeline ID required.');
    }
}

export class PipelineNotFound extends PipelineError {
    constructor(pipelineId: number) {
        super(`Pipeline '${pipelineId}' not found.`);
    }
}
