import { ActionProps, ActionState } from '@neoskop/pulumi-buddy';
import Axios from 'axios';
import { Empty } from 'google-protobuf/google/protobuf/empty_pb';
import { Struct } from 'google-protobuf/google/protobuf/struct_pb';
import { sendUnaryData, ServerUnaryCall, status } from 'grpc';
import { Injectable } from 'injection-js';
import { ActionNotFound } from '../buddy/api/action';
import { BuddyApi } from '../buddy/api/api';
import { PipelineNotFound } from '../buddy/api/pipeline';
import { ProjectNotFound } from '../buddy/api/project';
import { ServiceError } from '../errors/service.error';
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
} from '../grpc/provider_pb';
import { deleteUndefined } from '../utils/delete-undefined';
import { IProviderConfig, Kind, SubProvider } from './main.provider';

@Injectable()
export class ActionProvider implements SubProvider {
    readonly kind = Kind.Action;

    config?: IProviderConfig;

    protected readonly olds = new Map<string, ActionState>();

    constructor(protected readonly buddyApi: BuddyApi) {}

    setConfig(config: IProviderConfig) {
        this.config = config;
    }

    check({ request }: ServerUnaryCall<CheckRequest>, callback: sendUnaryData<CheckResponse>) {
        const olds = (request.getOlds()!.toJavaScript() as unknown) as ActionState;
        const news = request.getNews()!.toJavaScript();
        this.olds.set(request.getUrn(), olds);

        const checkResponse = new CheckResponse();
        checkResponse.setInputs(Struct.fromJavaScript(news));
        callback(null, checkResponse);
    }

    diff(req: ServerUnaryCall<DiffRequest>, callback: sendUnaryData<DiffResponse>) {
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
            if (!olds || olds[key] !== news[key]) {
                response.addReplaces(key);
                response.setChanges(DiffResponse.DiffChanges.DIFF_SOME);
            }
        }

        callback(null, response);
    }

    create(req: ServerUnaryCall<CreateRequest>, callback: sendUnaryData<CreateResponse>) {
        if (!this.config) {
            return callback(new ServiceError('config not set', status.INTERNAL), null);
        }

        const props = (req.request.getProperties()!.toJavaScript() as unknown) as ActionState & { type: string };
        const pipeline = this.buddyApi
            .workspace(this.config.workspace)
            .project(props.project_name)
            .pipeline(props.pipeline_id);

        pipeline
            .action()
            .create(props)
            .then(
                outputs => {
                    const response = new CreateResponse();
                    response.setId(outputs.id.toString());
                    response.setProperties(
                        Struct.fromJavaScript(
                            deleteUndefined({
                                ...outputs,
                                id: undefined,
                                action_id: outputs.id,
                                pipeline_id: props.pipeline_id,
                                project_name: props.project_name
                            })
                        )
                    );

                    callback(null, response);
                },
                err => {
                    if (Axios.isCancel(err)) {
                        callback(new ServiceError('Canceled', status.CANCELLED, undefined, 'Cancelled'), null);
                    } else if (err instanceof ProjectNotFound || err instanceof PipelineNotFound) {
                        callback(new ServiceError(err.message, status.NOT_FOUND), null);
                    } else {
                        callback(new ServiceError(err.message, status.INTERNAL), null);
                    }
                }
            );
    }

    read(req: ServerUnaryCall<ReadRequest>, callback: sendUnaryData<ReadResponse>) {
        if (!this.config) {
            return callback(new ServiceError('config not set', status.INTERNAL), null);
        }

        const id = +req.request.getId();
        const props = (req.request.getInputs()!.toJavaScript() as unknown) as ActionState;

        this.buddyApi
            .workspace(this.config.workspace)
            .project(props.project_name)
            .pipeline(props.pipeline_id)
            .action(id)
            .read()
            .then(
                outputs => {
                    const response = new ReadResponse();
                    response.setId(req.request.getId());
                    response.setInputs(Struct.fromJavaScript(deleteUndefined(props)));
                    response.setProperties(
                        Struct.fromJavaScript(
                            deleteUndefined({
                                ...outputs,
                                id: undefined,
                                action_id: outputs.id,
                                pipeline_id: props.pipeline_id,
                                project_name: props.project_name
                            })
                        )
                    );

                    callback(null, response);
                },
                err => {
                    if (Axios.isCancel(err)) {
                        callback(new ServiceError('Canceled', status.CANCELLED, undefined, 'Cancelled'), null);
                    } else if (err instanceof ProjectNotFound || err instanceof PipelineNotFound || err instanceof ActionNotFound) {
                        callback(new ServiceError(err.message, status.NOT_FOUND), null);
                    } else {
                        callback(new ServiceError(err.response.data.errors[0].message, status.INTERNAL), null);
                    }
                }
            );
    }

    update(req: ServerUnaryCall<UpdateRequest>, callback: sendUnaryData<UpdateResponse>) {
        if (!this.config) {
            return callback(new ServiceError('config not set', status.INTERNAL), null);
        }

        const news = (req.request.getNews()!.toJavaScript() as unknown) as ActionState & { type: string };
        const id = +req.request.getId();

        this.buddyApi
            .workspace(this.config.workspace)
            .project(news.project_name)
            .pipeline(news.pipeline_id)
            .action(id)
            .update(news)
            .then(
                outputs => {
                    const response = new UpdateResponse();
                    response.setProperties(
                        Struct.fromJavaScript(
                            deleteUndefined({
                                ...outputs,
                                id: undefined,
                                action_id: outputs.id,
                                pipeline_id: news.pipeline_id,
                                project_name: news.project_name
                            })
                        )
                    );

                    callback(null, response);
                },
                err => {
                    if (Axios.isCancel(err)) {
                        callback(new ServiceError('Canceled', status.CANCELLED, undefined, 'Cancelled'), null);
                    } else {
                        callback(new ServiceError(err.message, status.INTERNAL), null);
                    }
                }
            );
    }

    delete(req: ServerUnaryCall<DeleteRequest>, callback: sendUnaryData<Empty>) {
        if (!this.config) {
            return callback(new ServiceError('config not set', status.INTERNAL), null);
        }

        const props = (req.request.getProperties()!.toJavaScript() as unknown) as ActionProps;
        const id = +req.request.getId();

        this.buddyApi
            .workspace(this.config.workspace)
            .project(props.project_name)
            .pipeline(props.pipeline_id)
            .action(id)
            .delete()
            .then(
                () => callback(null, new Empty()),
                err => {
                    if (Axios.isCancel(err)) {
                        callback(new ServiceError('Canceled', status.CANCELLED, undefined, 'Cancelled'), null);
                    } else if (err instanceof ProjectNotFound || err instanceof PipelineNotFound) {
                        callback(new ServiceError(err.message, status.NOT_FOUND), null);
                    } else if (err instanceof ActionNotFound) {
                        callback(null, new Empty());
                    } else {
                        callback(new ServiceError(err.message, status.INTERNAL), null);
                    }
                }
            );
    }
}
