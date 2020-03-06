import { CustomProjectState, IntegrationProjectState, ProjectProps, ProjectState } from '@neoskop/pulumi-buddy';
import Axios from 'axios';
import { Empty } from 'google-protobuf/google/protobuf/empty_pb';
import { Struct } from 'google-protobuf/google/protobuf/struct_pb';
import { sendUnaryData, ServerUnaryCall, status } from 'grpc';
import { Injectable } from 'injection-js';
import { BuddyApi } from '../buddy/api/api';
import { ProjectNotFound, ProjectNotReady } from '../buddy/api/project';
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
import { sleep } from '../utils/sleep';
import { Unique } from '../utils/unique';
import { Urn } from '../utils/urn';
import { IProviderConfig, Kind, SubProvider } from './main.provider';

@Injectable()
export class ProjectProvider implements SubProvider {
    readonly kind = Kind.Project;

    config?: IProviderConfig;

    protected readonly oldInputs = new Map<string, IntegrationProjectState & CustomProjectState>();

    constructor(protected readonly buddyApi: BuddyApi) {}

    setConfig(config: IProviderConfig) {
        this.config = config;
    }

    check({ request }: ServerUnaryCall<CheckRequest>, callback: sendUnaryData<CheckResponse>) {
        const olds = (request.getOlds()!.toJavaScript() as unknown) as IntegrationProjectState & CustomProjectState;
        const news = request.getNews()!.toJavaScript();

        this.oldInputs.set(request.getUrn(), olds);

        const checkResponse = new CheckResponse();
        checkResponse.setInputs(Struct.fromJavaScript(news));
        callback(null, checkResponse);
    }

    diff(req: ServerUnaryCall<DiffRequest>, callback: sendUnaryData<DiffResponse>) {
        const props = (req.request.getOlds()!.toJavaScript()! as unknown) as ProjectProps;
        const news = (req.request.getNews()!.toJavaScript()! as unknown) as IntegrationProjectState & CustomProjectState;
        const oldInputs = this.oldInputs.get(req.request.getUrn())!;

        callback(
            null,
            new Differ(oldInputs, news, props)
                .diff('name', null, true)
                .diff('display_name', 'display_name')
                .diff('integration', null, true)
                .diff('external_project_id', null, true)
                .diff('custom_repo_url', null, true)
                .diff('custom_repo_user', null, true)
                .diff('custom_repo_pass', null, true)
                .setDeleteBeforeReplace(true)
                .toResponse()
        );
    }

    create(req: ServerUnaryCall<CreateRequest>, callback: sendUnaryData<CreateResponse>) {
        if (!this.config) {
            return callback(new ServiceError('config not set', status.INTERNAL), null);
        }

        const props = (req.request.getProperties()!.toJavaScript() as unknown) as IntegrationProjectState & CustomProjectState;
        const urn = Urn.parse(req.request.getUrn());

        if (!props.name) {
            props.name = Unique.name(urn.name);
        }

        this.buddyApi
            .workspace(this.config.workspace)
            .project()
            .create(props)
            .then(async outputs => {
                while (true) {
                    try {
                        return await this.buddyApi
                            .workspace(this.config!.workspace)
                            .project(outputs.name)
                            .update({ name: props.name });
                    } catch (e) {
                        if (!(e instanceof ProjectNotReady)) {
                            await this.buddyApi
                                .workspace(this.config!.workspace)
                                .project(outputs.name)
                                .delete();
                            throw e;
                        } else {
                            await sleep(2500);
                        }
                    }
                }
            })
            .then(
                outputs => {
                    const response = new CreateResponse();
                    response.setId(outputs.name);
                    response.setProperties(Struct.fromJavaScript(deleteUndefined(outputs)));

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

        const props = (req.request.getInputs()!.toJavaScript() as unknown) as ProjectState;
        const id = req.request.getId();

        this.buddyApi
            .workspace(this.config.workspace)
            .project(id)
            .read()
            .then(
                outputs => {
                    const response = new ReadResponse();
                    response.setId(id);
                    response.setInputs(Struct.fromJavaScript(deleteUndefined(props)));
                    response.setProperties(Struct.fromJavaScript({ ...outputs }));

                    callback(null, response);
                },
                err => {
                    if (Axios.isCancel(err)) {
                        callback(new ServiceError('Canceled', status.CANCELLED, undefined, 'Cancelled'), null);
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

        const news = (req.request.getNews()!.toJavaScript() as unknown) as ProjectState;
        const id = req.request.getId();

        this.buddyApi
            .workspace(this.config.workspace)
            .project(id)
            .update(news)
            .then(
                outputs => {
                    const response = new UpdateResponse();
                    response.setProperties(Struct.fromJavaScript({ ...outputs }));

                    callback(null, response);
                },
                err => {
                    if (Axios.isCancel(err)) {
                        callback(new ServiceError('Canceled', status.CANCELLED, undefined, 'Cancelled'), null);
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

        const id = req.request.getId();

        this.buddyApi
            .workspace(this.config.workspace)
            .project(id)
            .delete()
            .then(
                () => {
                    setTimeout(() => callback(null, new Empty()), 1000);
                },
                err => {
                    if (Axios.isCancel(err)) {
                        callback(new ServiceError('Canceled', status.CANCELLED, undefined, 'Cancelled'), null);
                    } else if (err instanceof ProjectNotFound) {
                        setTimeout(() => callback(null, new Empty()), 1000);
                    } else {
                        callback(new ServiceError(err.message, status.INTERNAL), null);
                    }
                }
            );
    }
}
