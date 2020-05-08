import { ActionProps, ActionState } from 'pulumi-buddy/actions';
import {
    CheckRequest,
    CheckResponse,
    CreateRequest,
    CreateResponse,
    DeleteRequest,
    DiffRequest,
    DiffResponse,
    ReadRequest,
    ReadResponse,
    UpdateRequest,
    UpdateResponse
} from '@pulumi-utils/grpc';
import { Configuration, IProvider, ServiceError, Struct } from '@pulumi-utils/plugin';
import Axios from 'axios';
import { ServerUnaryCall, status } from 'grpc';
import { Injectable } from 'injection-js';

import { ActionNotFound } from '../buddy/api/action';
import { BuddyApi } from '../buddy/api/api';
import { PipelineNotFound } from '../buddy/api/pipeline';
import { ProjectNotFound } from '../buddy/api/project';
import { Kind } from './kind';

@Injectable()
export class ActionProvider implements IProvider {
    readonly kind = Kind.Action;

    protected readonly olds = new Map<string, ActionState>();

    constructor(protected readonly buddyApi: BuddyApi, protected readonly configuration: Configuration) {}

    check({ request }: ServerUnaryCall<CheckRequest>): CheckResponse {
        const olds = (request.getOlds()!.toJavaScript() as unknown) as ActionState;
        const news = request.getNews()!.toJavaScript();
        this.olds.set(request.getUrn(), olds);

        const checkResponse = new CheckResponse();
        checkResponse.setInputs(Struct.fromJavaScript(news));
        return checkResponse;
    }

    diff(req: ServerUnaryCall<DiffRequest>): DiffResponse {
        const props = (req.request.getOlds()!.toJavaScript()! as unknown) as ActionProps;
        const news = (req.request.getNews()!.toJavaScript()! as unknown) as ActionState;
        const olds = this.olds.get(req.request.getUrn());

        const response = new DiffResponse();
        response.setChanges(DiffResponse.DiffChanges.DIFF_NONE);

        const keys = new Set([
            ...(olds ? (Object.keys(olds).filter(k => k !== 'outputs') as (keyof ActionState & string)[]) : []),
            ...(Object.keys(news).filter(k => k !== 'outputs') as (keyof ActionState & string)[])
        ]);

        for (const key of keys) {
            if (!olds || JSON.stringify(olds[key]) !== JSON.stringify(news[key])) {
                response.addReplaces(key);
                response.setChanges(DiffResponse.DiffChanges.DIFF_SOME);
            }
        }

        response.addStables('action_id');

        return response;
    }

    async create(req: ServerUnaryCall<CreateRequest>): Promise<CreateResponse> {
        const props = (req.request.getProperties()!.toJavaScript() as unknown) as ActionState & { type: string };
        const pipeline = this.buddyApi
            .workspace(this.configuration.require('workspace'))
            .project(props.project_name)
            .pipeline(props.pipeline_id);

        try {
            const outputs = await pipeline.action().create(props as any);

            const response = new CreateResponse();
            response.setId(outputs.id.toString());
            response.setProperties(
                Struct.fromJavaScript({
                    ...outputs,
                    id: undefined,
                    action_id: outputs.id,
                    pipeline_id: props.pipeline_id,
                    project_name: props.project_name
                } as any)
            );

            return response;
        } catch (err) {
            if (Axios.isCancel(err)) {
                throw new ServiceError('Canceled', status.CANCELLED, undefined, 'Cancelled');
            } else if (err instanceof ProjectNotFound || err instanceof PipelineNotFound) {
                throw new ServiceError(err.message, status.NOT_FOUND);
            } else {
                throw new ServiceError(err.message, status.INTERNAL);
            }
        }
    }

    async read(req: ServerUnaryCall<ReadRequest>): Promise<ReadResponse> {
        const id = +req.request.getId();
        const props = (req.request.getInputs()!.toJavaScript() as unknown) as ActionState;

        try {
            const outputs = await this.buddyApi
                .workspace(this.configuration.require('workspace'))
                .project(props.project_name)
                .pipeline(props.pipeline_id)
                .action(id)
                .read();

            const response = new ReadResponse();
            response.setId(req.request.getId());
            response.setInputs(Struct.fromJavaScript(props as any));
            response.setProperties(
                Struct.fromJavaScript({
                    ...outputs,
                    id: undefined,
                    action_id: outputs.id,
                    pipeline_id: props.pipeline_id,
                    project_name: props.project_name
                } as any)
            );

            return response;
        } catch (err) {
            if (Axios.isCancel(err)) {
                throw new ServiceError('Canceled', status.CANCELLED, undefined, 'Cancelled');
            } else if (err instanceof ProjectNotFound || err instanceof PipelineNotFound || err instanceof ActionNotFound) {
                throw new ServiceError(err.message, status.NOT_FOUND);
            } else {
                throw new ServiceError(err.response.data.errors[0].message, status.INTERNAL);
            }
        }
    }

    async update(req: ServerUnaryCall<UpdateRequest>): Promise<UpdateResponse> {
        const news = (req.request.getNews()!.toJavaScript() as unknown) as ActionState & { type: string };
        const id = +req.request.getId();

        try {
            const outputs = await this.buddyApi
                .workspace(this.configuration.require('workspace'))
                .project(news.project_name)
                .pipeline(news.pipeline_id)
                .action(id)
                .update(news);

            const response = new UpdateResponse();
            response.setProperties(
                Struct.fromJavaScript({
                    ...outputs,
                    id: undefined,
                    action_id: outputs.id,
                    pipeline_id: news.pipeline_id,
                    project_name: news.project_name
                } as any)
            );

            return response;
        } catch (err) {
            if (Axios.isCancel(err)) {
                throw new ServiceError('Canceled', status.CANCELLED, undefined, 'Cancelled');
            } else {
                throw new ServiceError(err.message, status.INTERNAL);
            }
        }
    }

    async delete(req: ServerUnaryCall<DeleteRequest>): Promise<void> {
        const props = (req.request.getProperties()!.toJavaScript() as unknown) as ActionProps;
        const id = +req.request.getId();

        try {
            await this.buddyApi
                .workspace(this.configuration.require('workspace'))
                .project(props.project_name)
                .pipeline(props.pipeline_id)
                .action(id)
                .delete();
        } catch (err) {
            if (Axios.isCancel(err)) {
                throw new ServiceError('Canceled', status.CANCELLED, undefined, 'Cancelled');
            } else if (err instanceof ProjectNotFound || err instanceof PipelineNotFound) {
                throw new ServiceError(err.message, status.NOT_FOUND);
            } else if (!(err instanceof ActionNotFound)) {
                throw new ServiceError(err.message, status.INTERNAL);
            }
            // handle not found as deleted
        }
    }

    cancel() {
        this.buddyApi.cancel('action');
    }
}
