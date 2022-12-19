import Axios from 'axios';
import { BuddyActionApi } from './action';
import { BuddyApi, InvalidResponseType } from './api';
import { BuddyProjectApi, ProjectNotFound } from './project';
import { BuddyWorkspaceApi } from './workspace';

const debug = require('debug')('pulumi-buddy:api:pipeline');

export interface TriggerConditionObject {
    trigger_condition: TriggerCondition;
    trigger_variable_value?: string;
    trigger_variable_key?: string;
}

export type TriggerEventType = 'PUSH';
export interface TriggerEvent {
    type: TriggerEventType;
    refs: string[];
}
export interface IBuddyPipeline {
    url: string;
    html_url: string;
    id: number;
    name: string;
    on: TriggerOn;
    refs?: string[];
    events?: TriggerEvent[];
    execution_message_template: string;
    last_execution_status: string;
    last_execution_revision: string | null;
    create_date: string;
    always_from_scratch: boolean;
    auto_clear_cache: boolean;
    no_skip_to_most_recent: boolean;
    do_not_create_commit_status: boolean;
    ignore_fail_on_project_status: boolean;
    trigger_conditions?: TriggerConditionObject[];
    priority?: Priority;
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

export type TriggerOn = 'CLICK' | 'EVENT' | 'SCHEDULE';
export type Priority = 'LOW' | 'NORMAL' | 'HIGH';
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
    on: TriggerOn;
    refs?: string[];
    events?: TriggerEvent[];
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
    trigger_conditions?: TriggerConditionObject[];
    priority?: Priority;
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
            const result = await this.api.client.post<IBuddyPipeline>(
                `/workspaces/${this.workspace.getDomain()}/projects/${this.project.getProjectName()}/pipelines`,
                pipeline,
                {
                    cancelToken: this.api.registerCanceler('pipeline').token
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
            const result = await this.api.client.get<IBuddyPipeline>(
                `/workspaces/${this.workspace.getDomain()}/projects/${this.project.getProjectName()}/pipelines/${this.pipelineId}`,
                {
                    cancelToken: this.api.registerCanceler('pipeline').token
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
            const result = await this.api.client.patch<IBuddyPipeline>(
                `/workspaces/${this.workspace.getDomain()}/projects/${this.project.getProjectName()}/pipelines/${this.pipelineId}`,
                update,
                {
                    cancelToken: this.api.registerCanceler('pipeline').token
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
            await this.api.client.delete(
                `/workspaces/${this.workspace.getDomain()}/projects/${this.project.getProjectName()}/pipelines/${this.pipelineId}`,
                {
                    cancelToken: this.api.registerCanceler('pipeline').token
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
