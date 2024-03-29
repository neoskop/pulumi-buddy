import Axios from 'axios';

import { BuddyApi, InvalidResponseType } from './api';
import { BuddyPipelineApi, IBuddyPipeline } from './pipeline';
import { BuddyProjectApi, ProjectNotFound } from './project';
import { BuddyWorkspaceApi } from './workspace';

const debug = require('debug')('pulumi-buddy:api:action');

export interface IBuddyAction {
    url: string;
    html_url: string;
    id: number;
    name: string;
    type: string;
    trigger_time: TriggerTime;
    last_execution_status: string;
    variables?: IBuddyActionVariable[];
    trigger_condition?: TriggerCondition;
    trigger_condition_paths?: string[];
    trigger_variable_key?: string;
    trigger_variable_value?: string;
    pipeline: IBuddyPipeline;
}

export type TriggerTime = 'ON_EVERY_EXECUTION' | 'ON_FAILURE' | 'ON_BACK_TO_SUCCESS';
export type TriggerCondition = 'ALWAYS' | 'ON_CHANGE' | 'ON_CHANGE_AT_PATH' | 'VAR_IS' | 'VAR_IS_NOT' | 'VAR_CONTAINS' | 'VAR_NOT_CONTAINS';

export interface IBuddyActionVariable {
    key: string;
    value: string;
}

export interface IBuddyActionCreate {
    name: string;
    type: string;
    trigger_time?: TriggerTime;
    variables?: IBuddyActionVariable[];
    trigger_condition?: TriggerCondition;
    trigger_condition_paths?: string[];
    trigger_variable_key?: string;
    trigger_variable_value?: string;
    after_action_id?: number;
    timeout?: number;
    disabled?: boolean;
    run_next_parallel?: boolean;
    run_only_on_first_failure?: boolean;
    [key: string]: any;
}

export interface IBuddyActionUpdate {
    [key: string]: any;
}

export class BuddyActionApi {
    constructor(
        protected readonly api: BuddyApi,
        protected readonly workspace: BuddyWorkspaceApi,
        protected readonly project: BuddyProjectApi,
        protected readonly pipeline: BuddyPipelineApi,
        protected readonly actionId?: number
    ) {}

    getActionId(): number {
        if (!this.actionId) {
            throw new ActionIdRequired();
        }
        return this.actionId;
    }

    async create(action: IBuddyActionCreate): Promise<IBuddyAction> {
        debug('create %O', action);
        try {
            const result = await this.api.client.post<IBuddyAction>(
                `/workspaces/${this.workspace.getDomain()}/projects/${this.project.getProjectName()}/pipelines/${this.pipeline.getPipelineId()}/actions`,
                action,
                {
                    cancelToken: this.api.registerCanceler('action').token
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
                    throw new ActionError(e.response.data.errors[0].message);
                }
            } else {
                throw new ActionError(e.message);
            }
        }
    }

    async read(): Promise<IBuddyAction> {
        debug('read %d', this.actionId);
        if (!this.actionId) {
            throw new ActionIdRequired();
        }

        try {
            const result = await this.api.client.get<IBuddyAction>(
                `/workspaces/${this.workspace.getDomain()}/projects/${this.project.getProjectName()}/pipelines/${this.pipeline.getPipelineId()}/actions/${
                    this.actionId
                }`,
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
                    throw new ActionNotFound(this.actionId);
                } else {
                    throw new ActionError(e.response.data.errors[0].message);
                }
            } else {
                throw new ActionError(e.message);
            }
        }
    }

    async update(update: IBuddyActionUpdate): Promise<IBuddyAction> {
        debug('update %d %O', this.actionId, update);
        if (!this.actionId) {
            throw new ActionIdRequired();
        }

        try {
            const result = await this.api.client.patch<IBuddyAction>(
                `/workspaces/${this.workspace.getDomain()}/projects/${this.project.getProjectName()}/pipelines/${this.pipeline.getPipelineId()}/actions/${
                    this.actionId
                }`,
                update,
                {
                    cancelToken: this.api.registerCanceler('action').token
                }
            );

            return result.data;
        } catch (e) {
            if (Axios.isCancel(e)) {
                throw e;
            } else if (e.response) {
                InvalidResponseType.checkResponseType(e.response, 'application/json');
                if (e.response.code === 404) {
                    throw new ActionNotFound(this.actionId);
                } else {
                    throw new ActionError(e.response.data.errors[0].message);
                }
            } else {
                throw new ActionError(e.message);
            }
        }
    }

    async delete(): Promise<void> {
        debug('delete %d', this.actionId);
        if (!this.actionId) {
            throw new ActionIdRequired();
        }

        try {
            await this.api.client.delete(
                `/workspaces/${this.workspace.getDomain()}/projects/${this.project.getProjectName()}/pipelines/${this.pipeline.getPipelineId()}/actions/${
                    this.actionId
                }`,
                {
                    cancelToken: this.api.registerCanceler('action').token
                }
            );
        } catch (e) {
            if (Axios.isCancel(e)) {
                throw e;
            } else if (e.response) {
                InvalidResponseType.checkResponseType(e.response, 'application/json');
                if (e.response.status === 404) {
                    throw new ActionNotFound(this.actionId);
                } else {
                    throw new ActionError(e.response.data.errors[0].message);
                }
            } else {
                throw new ActionError(e.message);
            }
        }
    }
}

export class ActionError extends Error {}

export class ActionIdRequired extends ActionError {
    constructor() {
        super('Pipeline ID required.');
    }
}

export class ActionNotFound extends ActionError {
    constructor(actionId: number) {
        super(`Action '${actionId}' not found.`);
    }
}
