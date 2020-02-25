import { BuddyProjectProps, BuddyProjectState, Kind } from '@neoskop/pulumi-buddy';
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
    PropertyDiff,
    ReadRequest,
    ReadResponse,
    UpdateRequest,
    UpdateResponse,
} from '../generated/provider_pb';
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
                result => {
                    const response = new CreateResponse();
                    response.setId(Id.stringify([['Project' as Kind, result.name]]));
                    response.setProperties(
                        Struct.fromJavaScript({
                            ...(result as {}),
                            kind: 'Project',
                            inputs: props
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

    update(req: ServerUnaryCall<UpdateRequest>, callback: sendUnaryData<UpdateResponse>) {
        if (!this.config) {
            return callback(new ServiceError('config not set', status.INTERNAL), null);
        }

        const news = (req.request.getNews()!.toJavaScript() as unknown) as BuddyProjectState;

        this.buddyApi
            .workspace(this.config.workspace)
            .project(news.name)
            .update(news)
            .then(
                result => {
                    const response = new UpdateResponse();
                    response.setProperties(
                        Struct.fromJavaScript({
                            ...(result as {}),
                            kind: 'Project',
                            inputs: news
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
                result => {
                    const response = new ReadResponse();
                    response.setId(req.request.getId());
                    response.setInputs(Struct.fromJavaScript(props as {}));
                    response.setProperties(
                        Struct.fromJavaScript({
                            ...(result as {}),
                            kind: 'Project',
                            inputs: props
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

    diff(req: ServerUnaryCall<DiffRequest>, callback: sendUnaryData<DiffResponse>) {
        const olds = (req.request.getOlds()!.toJavaScript()! as unknown) as BuddyProjectProps;
        const news = (req.request.getNews()!.toJavaScript()! as unknown) as BuddyProjectState;

        const response = new DiffResponse();

        for (const [key, replacement] of [
            ['name', true],
            ['display_name', false],
            ['integration', true],
            ['external_project_id', true],
            ['custom_repo_url', true],
            ['custom_repo_user', true],
            ['custom_repo_pass', true]
        ] as [string, boolean][]) {
            const oldValue = JSON.stringify((olds.inputs as any)[key]);
            const newValue = JSON.stringify((news as any)[key]);
            if (oldValue !== newValue) {
                const diff = new PropertyDiff();
                if (replacement) {
                    response.addReplaces(key);
                    diff.setKind(
                        null == oldValue
                            ? PropertyDiff.Kind.ADD_REPLACE
                            : null == newValue
                            ? PropertyDiff.Kind.DELETE_REPLACE
                            : PropertyDiff.Kind.UPDATE_REPLACE
                    );
                } else {
                    diff.setKind(
                        null == oldValue ? PropertyDiff.Kind.ADD : null == newValue ? PropertyDiff.Kind.DELETE : PropertyDiff.Kind.UPDATE
                    );
                }
                diff.setInputdiff(true);
                response.getDetaileddiffMap().set(key, diff);
                response.addDiffs(key);
            }
        }

        callback(null, response);
    }
}
