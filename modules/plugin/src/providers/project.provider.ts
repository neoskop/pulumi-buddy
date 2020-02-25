import { BuddyCustomProjectState, BuddyIntegrationProjectState, BuddyProjectState, Kind } from '@neoskop/pulumi-buddy';
import Axios from 'axios';
import { Empty } from 'google-protobuf/google/protobuf/empty_pb';
import { Struct } from 'google-protobuf/google/protobuf/struct_pb';
import { sendUnaryData, ServerUnaryCall, status } from 'grpc';
import { Injectable } from 'injection-js';

import { BuddyApi } from '../buddy-api/api';
import { ProjectNotFound } from '../buddy-api/project';
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
import { Differ } from '../utils/differ';
import { Id } from '../utils/id';
import { IProviderConfig, SubProvider } from './main.provider';

@Injectable()
export class ProjectProvider implements SubProvider {
    readonly kind = 'Project' as Kind;

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
        const olds = (req.request.getOlds()!.toJavaScript()! as unknown) as BuddyIntegrationProjectState & BuddyCustomProjectState;
        const news = (req.request.getNews()!.toJavaScript()! as unknown) as BuddyIntegrationProjectState & BuddyCustomProjectState;

        callback(
            null,
            new Differ(olds, news)
                .diff('name', true)
                .diff('display_name')
                .diff('integration', true)
                .diff('external_project_id', true)
                .diff('custom_repo_url', true)
                .diff('custom_repo_user', true)
                .diff('custom_repo_pass', true)
                .toResponse()
        );
    }

    create(req: ServerUnaryCall<CreateRequest>, callback: sendUnaryData<CreateResponse>) {
        if (!this.config) {
            return callback(new ServiceError('config not set', status.INTERNAL), null);
        }

        const props = (req.request.getProperties()!.toJavaScript() as unknown) as BuddyProjectState;

        this.buddyApi
            .workspace(this.config.workspace)
            .project()
            .create(props)
            .then(
                outputs => {
                    const response = new CreateResponse();
                    response.setId(Id.stringify([['Project' as Kind, outputs.name]]));
                    response.setProperties(
                        Struct.fromJavaScript({
                            ...(props as {}),
                            outputs
                        })
                    );

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

    read(req: ServerUnaryCall<ReadRequest>, callback: sendUnaryData<ReadResponse>) {
        if (!this.config) {
            return callback(new ServiceError('config not set', status.INTERNAL), null);
        }

        const id = Id.parse(req.request.getId());
        const props = (req.request.getProperties()!.toJavaScript() as unknown) as BuddyProjectState;

        this.buddyApi
            .workspace(this.config.workspace)
            .project(id[0][1])
            .read()
            .then(
                outputs => {
                    const response = new ReadResponse();
                    response.setId(req.request.getId());
                    response.setInputs(Struct.fromJavaScript(props as {}));
                    response.setProperties(
                        Struct.fromJavaScript({
                            ...(props as {}),
                            outputs
                        })
                    );

                    callback(null, response);
                },
                err => {
                    if (Axios.isCancel(err)) {
                        callback(new ServiceError('Canceled', status.CANCELLED), null);
                    } else if (err instanceof ProjectNotFound) {
                        callback(new ServiceError(err.message, status.NOT_FOUND), null);
                    } else {
                        callback(new ServiceError(err.message, status.INTERNAL), null);
                    }
                }
            );
    }

    update(req: ServerUnaryCall<UpdateRequest>, callback: sendUnaryData<UpdateResponse>) {
        if (!this.config) {
            return callback(new ServiceError('config not set', status.INTERNAL), null);
        }

        const news = (req.request.getNews()!.toJavaScript() as unknown) as BuddyProjectState;
        const id = Id.parse(req.request.getId());

        this.buddyApi
            .workspace(this.config.workspace)
            .project(id[0][1])
            .update(news)
            .then(
                outputs => {
                    const response = new UpdateResponse();
                    response.setProperties(
                        Struct.fromJavaScript({
                            ...(news as {}),
                            outputs
                        })
                    );

                    callback(null, response);
                },
                err => {
                    if (Axios.isCancel(err)) {
                        callback(new ServiceError('Canceled', status.CANCELLED), null);
                    } else if (err instanceof ProjectNotFound) {
                        callback(new ServiceError(err.message, status.NOT_FOUND), null);
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
            .delete()
            .then(
                () => {
                    callback(null, new Empty());
                },
                err => {
                    if (Axios.isCancel(err)) {
                        callback(new ServiceError('Canceled', status.CANCELLED), null);
                    } else if (err instanceof ProjectNotFound) {
                        callback(new ServiceError(err.message, status.NOT_FOUND), null);
                    } else {
                        callback(new ServiceError(err.message, status.INTERNAL), null);
                    }
                }
            );
    }
}
