import { PipelineProps, PipelineState } from '@neoskop/pulumi-buddy';
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
} from '@neoskop/pulumi-utils-grpc';
import { Configuration, IProvider, ServiceError, Struct } from '@neoskop/pulumi-utils-plugin';
import Axios from 'axios';
import { ServerUnaryCall, status } from 'grpc';
import { Injectable } from 'injection-js';

import { BuddyApi } from '../buddy/api/api';
import { PipelineNotFound } from '../buddy/api/pipeline';
import { ProjectNotFound } from '../buddy/api/project';
import { deleteUndefined } from '../utils/delete-undefined';
import { Differ } from '../utils/differ';
import { Kind } from './kind';

@Injectable()
export class PipelineProvider implements IProvider {
    readonly kind = Kind.Pipeline;

    protected readonly olds = new Map<string, PipelineState>();

    constructor(protected readonly buddyApi: BuddyApi, protected readonly configuration: Configuration) {}

    check({ request }: ServerUnaryCall<CheckRequest>): CheckResponse {
        const olds = (request.getOlds()!.toJavaScript() as unknown) as PipelineState;
        const news = request.getNews()!.toJavaScript();
        this.olds.set(request.getUrn(), olds);

        const checkResponse = new CheckResponse();
        checkResponse.setInputs(Struct.fromJavaScript(news));
        return checkResponse;
    }

    diff(req: ServerUnaryCall<DiffRequest>): DiffResponse {
        const props = (req.request.getOlds()!.toJavaScript()! as unknown) as PipelineProps;
        const news = (req.request.getNews()!.toJavaScript()! as unknown) as PipelineState;
        const olds = this.olds.get(req.request.getUrn())!;

        return new Differ(olds, news, props)
            .diff('project_name', ['project', 'name'], true)
            .diff('name', 'name')
            .diff('ref_name', 'ref_name')
            .diff('trigger_mode', 'trigger_mode')
            .diff('ref_type', 'ref_type')
            .diff('always_from_scratch', 'always_from_scratch')
            .diff('auto_clear_cache', 'auto_clear_cache')
            .diff('no_skip_to_most_recent', 'no_skip_to_most_recent')
            .diff('do_not_create_commit_status', 'do_not_create_commit_status', true)
            .diff('start_date', 'start_date')
            .diff('delay', 'delay')
            .diff('cron', 'cron')
            .diff('run_always', 'run_always')
            .diff('paused', 'paused')
            .diff('ignore_fail_on_project_status', 'ignore_fail_on_project_status', true)
            .diff('execution_message_template', 'execution_message_template', true)
            .toResponse();
    }

    async create(req: ServerUnaryCall<CreateRequest>): Promise<CreateResponse> {
        const props = (req.request.getProperties()!.toJavaScript() as unknown) as PipelineState;
        const project = this.buddyApi.workspace(this.configuration.require('workspace')).project(props.project_name);

        try {
            const outputs = await project.pipeline().create(props);

            const response = new CreateResponse();
            response.setId(outputs.id.toString());
            response.setProperties(
                Struct.fromJavaScript(
                    deleteUndefined({
                        ...outputs,
                        id: undefined,
                        pipeline_id: outputs.id,
                        project_name: props.project_name
                    })
                )
            );

            return response;
        } catch (err) {
            if (Axios.isCancel(err)) {
                throw new ServiceError('Canceled', status.CANCELLED, undefined, 'Cancelled');
            } else if (err instanceof ProjectNotFound) {
                throw ServiceError.wrap(err, status.NOT_FOUND);
            } else {
                throw ServiceError.wrap(err, status.INTERNAL);
            }
        }
    }

    async read(req: ServerUnaryCall<ReadRequest>): Promise<ReadResponse> {
        const id = +req.request.getId();
        const props = (req.request.getInputs()!.toJavaScript() as unknown) as PipelineState;

        try {
            const outputs = await this.buddyApi
                .workspace(this.configuration.require('workspace'))
                .project(props.project_name)
                .pipeline(id)
                .read();

            const response = new ReadResponse();
            response.setId(req.request.getId());
            response.setInputs(Struct.fromJavaScript(deleteUndefined(props)));
            response.setProperties(
                Struct.fromJavaScript({
                    ...outputs,
                    id: undefined!,
                    pipeline_id: outputs.id,
                    project_name: props.project_name
                })
            );

            return response;
        } catch (err) {
            if (Axios.isCancel(err)) {
                throw new ServiceError('Canceled', status.CANCELLED, undefined, 'Cancelled');
            } else if (err instanceof ProjectNotFound || err instanceof PipelineNotFound) {
                throw ServiceError.wrap(err, status.NOT_FOUND);
            } else {
                throw new ServiceError(err.response.data.errors[0].message, status.INTERNAL);
            }
        }
    }

    async update(req: ServerUnaryCall<UpdateRequest>): Promise<UpdateResponse> {
        const news = (req.request.getNews()!.toJavaScript() as unknown) as PipelineState;
        const id = +req.request.getId();

        try {
            const outputs = await this.buddyApi
                .workspace(this.configuration.require('workspace'))
                .project(news.project_name)
                .pipeline(id)
                .update(news);

            const response = new UpdateResponse();
            response.setProperties(
                Struct.fromJavaScript({
                    ...outputs,
                    id: undefined!,
                    pipeline_id: outputs.id,
                    project_name: news.project_name
                })
            );

            return response;
        } catch (err) {
            if (Axios.isCancel(err)) {
                throw new ServiceError('Canceled', status.CANCELLED, undefined, 'Cancelled');
            } else {
                throw ServiceError.wrap(err, status.INTERNAL);
            }
        }
    }

    async delete(req: ServerUnaryCall<DeleteRequest>): Promise<void> {
        const props = (req.request.getProperties()!.toJavaScript() as unknown) as PipelineProps;
        const id = +req.request.getId();

        try {
            await this.buddyApi
                .workspace(this.configuration.require('workspace'))
                .project(props.project_name)
                .pipeline(id)
                .delete();
        } catch (err) {
            if (Axios.isCancel(err)) {
                throw new ServiceError('Canceled', status.CANCELLED, undefined, 'Cancelled');
            } else if (err instanceof ProjectNotFound) {
                throw ServiceError.wrap(err, status.NOT_FOUND);
            } else if (!(err instanceof PipelineNotFound)) {
                throw ServiceError.wrap(err, status.INTERNAL);
            }
            // handle not found as deleted
        }
    }

    cancel() {
        this.buddyApi.cancel('pipeline');
    }
}
