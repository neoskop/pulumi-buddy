import { Kind, BuddyActionState } from '@neoskop/pulumi-buddy';
import Axios from 'axios';
import { Empty } from 'google-protobuf/google/protobuf/empty_pb';
import { Struct } from 'google-protobuf/google/protobuf/struct_pb';
import { sendUnaryData, ServerUnaryCall, status } from 'grpc';
import { Injectable } from 'injection-js';

import { BuddyApi } from '../buddy/api/api';
import { ActionNotFound } from '../buddy/api/action';
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
import { Id } from '../utils/id';
import { IProviderConfig, SubProvider } from './main.provider';
import { PipelineNotFound } from '../buddy/api/pipeline';


@Injectable()
export class ActionProvider implements SubProvider {
    readonly kind = 'Action' as Kind;

    config?: IProviderConfig;
    constructor(protected readonly buddyApi: BuddyApi) {}

    setConfig(config: IProviderConfig) {
        this.config = config;
    }

    check({ request }: ServerUnaryCall<CheckRequest>, callback: sendUnaryData<CheckResponse>) {
        const news = request.getNews()!.toJavaScript();

        const checkResponse = new CheckResponse();
        checkResponse.setInputs(Struct.fromJavaScript(news));
        callback(null, checkResponse);
    }

    diff(req: ServerUnaryCall<DiffRequest>, callback: sendUnaryData<DiffResponse>) {
        const olds = (req.request.getOlds()!.toJavaScript()! as unknown) as BuddyActionState;
        const news = (req.request.getNews()!.toJavaScript()! as unknown) as BuddyActionState;

        const response = new DiffResponse();

        const keys = new Set([
            ...Object.keys(olds).filter(k => k !== 'outputs') as (keyof BuddyActionState & string)[],
            ...Object.keys(news).filter(k => k !== 'outputs') as (keyof BuddyActionState & string)[],
        ]);

        for(const key of keys) {
            if(olds[key] !== news[key]) {
                response.addReplaces(key);
            }
        }

        callback(null, response);
    }

    create(req: ServerUnaryCall<CreateRequest>, callback: sendUnaryData<CreateResponse>) {
        if (!this.config) {
            return callback(new ServiceError('config not set', status.INTERNAL), null);
        }

        const props = (req.request.getProperties()!.toJavaScript() as unknown) as BuddyActionState & { type: string };
        const timeout = req.request.getTimeout() * 1000;
        const start = Date.now();
        const pipeline = this.buddyApi.workspace(this.config.workspace).project(props.project_name).pipeline(props.pipeline_id);

        console.log({ props });

        const create = () => {
            pipeline
                .action()
                .create(props)
                .then(
                    outputs => {
                        const response = new CreateResponse();
                        response.setId(
                            Id.stringify([
                                ['Project' as Kind, props.project_name],
                                ['Pipeline' as Kind, props.pipeline_id.toString()],
                                ['Action' as Kind, outputs.id.toString()]
                            ])
                        );
                        response.setProperties(Struct.fromJavaScript({ ...(props as {}), outputs }));

                        callback(null, response);
                    },
                    err => {
                        console.log({ err });
                        if (Axios.isCancel(err)) {
                            callback(new ServiceError('Canceled', status.CANCELLED), null);
                        } else if (err instanceof ProjectNotFound) {
                            if (timeout && Date.now() > start + timeout) {
                                callback(new ServiceError('Timeout', status.DEADLINE_EXCEEDED), null);
                            } else {
                                setTimeout(create, 5000);
                            }
                        } else {
                            callback(new ServiceError(err.message, status.INTERNAL), null);
                        }
                    }
                );
        };

        pipeline.read().then(create, err => {
            if (Axios.isCancel(err)) {
                callback(new ServiceError('Canceled', status.CANCELLED), null);
            } else if (err instanceof ProjectNotFound || err instanceof PipelineNotFound) {
                callback(new ServiceError(err.message, status.NOT_FOUND), null);
            } else {
                callback(new ServiceError(err.message, status.INTERNAL), null);
            }
        });
    }

    read(req: ServerUnaryCall<ReadRequest>, callback: sendUnaryData<ReadResponse>) {
        if (!this.config) {
            return callback(new ServiceError('config not set', status.INTERNAL), null);
        }

        const id = Id.parse(req.request.getId());
        const props = req.request.getProperties()!.toJavaScript();

        this.buddyApi
            .workspace(this.config.workspace)
            .project(id[0][1])
            .pipeline(+id[1][1])
            .action(+id[2][1])
            .read()
            .then(
                outputs => {
                    const response = new ReadResponse();
                    response.setId(req.request.getId());
                    response.setInputs(Struct.fromJavaScript(props));
                    response.setProperties(Struct.fromJavaScript({ ...(props as {}), outputs }));

                    callback(null, response);
                },
                err => {
                    if (Axios.isCancel(err)) {
                        callback(new ServiceError('Canceled', status.CANCELLED), null);
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

        const news = (req.request.getNews()!.toJavaScript() as unknown) as BuddyActionState & { type: string };
        const id = Id.parse(req.request.getId());

        this.buddyApi
            .workspace(this.config.workspace)
            .project(id[0][1])
            .pipeline(+id[1][1])
            .action(+id[2][1])
            .update(news)
            .then(
                outputs => {
                    const response = new UpdateResponse();
                    response.setProperties(Struct.fromJavaScript({ ...(news as {}), outputs }));

                    callback(null, response);
                },
                err => {
                    if (Axios.isCancel(err)) {
                        callback(new ServiceError('Canceled', status.CANCELLED), null);
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

        const id = Id.parse(req.request.getId());

        this.buddyApi
            .workspace(this.config.workspace)
            .project(id[0][1])
            .pipeline(+id[1][1])
            .action(+id[2][1])
            .delete()
            .then(
                () => callback(null, new Empty()),
                err => {
                    if (Axios.isCancel(err)) {
                        callback(new ServiceError('Canceled', status.CANCELLED), null);
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
