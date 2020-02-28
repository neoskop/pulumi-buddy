import { BuddyEnvironmentVariableProps, BuddyEnvironmentVariableState } from '@neoskop/pulumi-buddy';
import Axios from 'axios';
import { Empty } from 'google-protobuf/google/protobuf/empty_pb';
import { Struct } from 'google-protobuf/google/protobuf/struct_pb';
import { sendUnaryData, ServerUnaryCall, status } from 'grpc';
import { Injectable } from 'injection-js';

import { BuddyApi } from '../buddy/api/api';
import { EnvironmentVariableNotFound } from '../buddy/api/environment-variable';
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
import { Differ } from '../utils/differ';
import { IProviderConfig, Kind, SubProvider } from './main.provider';

@Injectable()
export class EnvironmentVariableProvider implements SubProvider {
    readonly kind = Kind.EnvironmentVariable;

    config?: IProviderConfig;

    protected readonly olds = new Map<string, BuddyEnvironmentVariableState>();

    constructor(protected readonly buddyApi: BuddyApi) {}

    setConfig(config: IProviderConfig) {
        this.config = config;
    }

    check({ request }: ServerUnaryCall<CheckRequest>, callback: sendUnaryData<CheckResponse>) {
        const olds = (request.getOlds()!.toJavaScript() as unknown) as BuddyEnvironmentVariableState;
        const news = request.getNews()!.toJavaScript();
        this.olds.set(request.getUrn(), olds);

        const checkResponse = new CheckResponse();
        checkResponse.setInputs(Struct.fromJavaScript(news));
        callback(null, checkResponse);
    }

    diff(req: ServerUnaryCall<DiffRequest>, callback: sendUnaryData<DiffResponse>) {
        const props = (req.request.getOlds()!.toJavaScript()! as unknown) as BuddyEnvironmentVariableProps;
        const news = (req.request.getNews()!.toJavaScript()! as unknown) as BuddyEnvironmentVariableState;
        const olds = this.olds.get(req.request.getUrn())!;

        callback(
            null,
            new Differ(olds, news, props)
                .diff('key', 'key')
                .diff('value', 'value')
                .diff('description', 'description')
                .diff('ssh_key', 'ssh_key')
                .diff('settable', 'settable')
                .diff('encrypted', 'encrypted')
                .diff('project_name', null, true)
                .diff('pipeline_id', null, true)
                .diff('action_id', null, true)
                .toResponse()
        );
    }

    create(req: ServerUnaryCall<CreateRequest>, callback: sendUnaryData<CreateResponse>) {
        if (!this.config) {
            return callback(new ServiceError('config not set', status.INTERNAL), null);
        }

        const props = (req.request.getProperties()!.toJavaScript() as unknown) as BuddyEnvironmentVariableState;

        this.buddyApi
            .workspace(this.config.workspace)
            .environmentVariable()
            .create({
                ...props,
                project: props.project_name ? { name: props.project_name } : undefined,
                pipeline: props.pipeline_id ? { id: props.pipeline_id } : undefined,
                action: props.action_id ? { id: props.action_id } : undefined
            })
            .then(
                outputs => {
                    const response = new CreateResponse();
                    response.setId(outputs.id.toString());
                    response.setProperties(
                        Struct.fromJavaScript(
                            deleteUndefined({
                                ...outputs,
                                id: undefined!,
                                variable_id: outputs.id
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

    read(req: ServerUnaryCall<ReadRequest>, callback: sendUnaryData<ReadResponse>) {
        if (!this.config) {
            return callback(new ServiceError('config not set', status.INTERNAL), null);
        }

        const props = (req.request.getProperties()!.toJavaScript() as unknown) as BuddyEnvironmentVariableState;
        const id = +req.request.getId();

        this.buddyApi
            .workspace(this.config.workspace)
            .environmentVariable(id)
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
                                id: undefined!,
                                variable_id: outputs.id
                            })
                        )
                    );

                    callback(null, response);
                },
                err => {
                    if (Axios.isCancel(err)) {
                        callback(new ServiceError('Canceled', status.CANCELLED, undefined, 'Cancelled'), null);
                    } else if (err instanceof EnvironmentVariableNotFound) {
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

        const news = (req.request.getNews()!.toJavaScript() as unknown) as BuddyEnvironmentVariableState;
        const id = +req.request.getId();

        this.buddyApi
            .workspace(this.config.workspace)
            .environmentVariable(id)
            .update({
                ssh_key: false,
                settable: false,
                encrypted: false,
                ...news
            })
            .then(
                outputs => {
                    const response = new UpdateResponse();
                    response.setProperties(
                        Struct.fromJavaScript(
                            deleteUndefined({
                                ...outputs,
                                id: undefined!,
                                variable_id: outputs.id
                            })
                        )
                    );

                    callback(null, response);
                },
                err => {
                    if (Axios.isCancel(err)) {
                        callback(new ServiceError('Canceled', status.CANCELLED, undefined, 'Cancelled'), null);
                    } else if (err instanceof EnvironmentVariableNotFound) {
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

        const id = +req.request.getId();

        this.buddyApi
            .workspace(this.config.workspace)
            .environmentVariable(id)
            .delete()
            .then(
                () => {
                    setTimeout(() => callback(null, new Empty()), 1000);
                },
                err => {
                    if (Axios.isCancel(err)) {
                        callback(new ServiceError('Canceled', status.CANCELLED, undefined, 'Cancelled'), null);
                    } else if (err instanceof EnvironmentVariableNotFound) {
                        setTimeout(() => callback(null, new Empty()), 1000);
                    } else {
                        callback(new ServiceError(err.message, status.INTERNAL), null);
                    }
                }
            );
    }
}
