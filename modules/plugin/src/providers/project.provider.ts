import { CustomProjectState, IntegrationProjectState, ProjectProps, ProjectState } from 'pulumi-buddy';
import Axios from 'axios';
import { Empty } from 'google-protobuf/google/protobuf/empty_pb';
import { sendUnaryData, ServerUnaryCall, status } from 'grpc';
import { Injectable } from 'injection-js';
import { BuddyApi } from '../buddy/api/api';
import { ProjectNotFound, ProjectNotReady } from '../buddy/api/project';
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
import { Differ } from '../utils/differ';
import { Kind } from './kind';
import { IProvider, ServiceError, Struct, Configuration, Urn, sleep, uniqify } from '@pulumi-utils/plugin';
import { DELETE_RESPONSE } from './delete-response';

@Injectable()
export class ProjectProvider implements IProvider {
    readonly kind = Kind.Project;

    protected readonly oldInputs = new Map<string, IntegrationProjectState & CustomProjectState>();

    constructor(protected readonly buddyApi: BuddyApi, protected readonly configuration: Configuration) {}

    check({ request }: ServerUnaryCall<CheckRequest>) {
        const olds = (request.getOlds()!.toJavaScript() as unknown) as IntegrationProjectState & CustomProjectState;
        const news = request.getNews()!.toJavaScript();

        this.oldInputs.set(request.getUrn(), olds);

        const checkResponse = new CheckResponse();
        checkResponse.setInputs(Struct.fromJavaScript(news));
        return checkResponse;
    }

    diff(req: ServerUnaryCall<DiffRequest>): DiffResponse {
        const props = (req.request.getOlds()!.toJavaScript()! as unknown) as ProjectProps;
        const news = (req.request.getNews()!.toJavaScript()! as unknown) as IntegrationProjectState & CustomProjectState;
        const oldInputs = this.oldInputs.get(req.request.getUrn())!;

        return new Differ(oldInputs, news, props)
            .diff('name', null, true)
            .diff('display_name', 'display_name')
            .diff('integration', null, true)
            .diff('external_project_id', null, true)
            .diff('custom_repo_url', null, true)
            .diff('custom_repo_user', null, true)
            .diff('custom_repo_pass', null, true)
            .addStable('name')
            .setDeleteBeforeReplace(true)
            .toResponse();
    }

    async create(req: ServerUnaryCall<CreateRequest>): Promise<CreateResponse> {
        const props = (req.request.getProperties()!.toJavaScript() as unknown) as IntegrationProjectState & CustomProjectState;
        const urn = Urn.parse(req.request.getUrn());

        if (!props.name) {
            props.name = uniqify(urn.name);
        }

        try {
            let outputs = await this.buddyApi.workspace(this.configuration.require('workspace')).project().create(props);

            while (true) {
                try {
                    outputs = await this.buddyApi
                        .workspace(this.configuration.require('workspace'))
                        .project(outputs.name)
                        .update({ name: props.name });
                    break;
                } catch (e) {
                    if (!(e instanceof ProjectNotReady)) {
                        await this.buddyApi.workspace(this.configuration.require('workspace')).project(outputs.name).delete();
                        throw e;
                    } else {
                        await sleep(2500);
                    }
                }
            }
            const response = new CreateResponse();
            response.setId(outputs.name);
            response.setProperties(Struct.fromJavaScript(outputs as {}));

            return response;
        } catch (err) {
            if (Axios.isCancel(err)) {
                throw new ServiceError('Canceled', status.CANCELLED, undefined, 'Cancelled');
            } else {
                throw ServiceError.wrap(err, status.INTERNAL);
            }
        }
    }

    async read(req: ServerUnaryCall<ReadRequest>): Promise<ReadResponse> {
        const props = (req.request.getInputs()!.toJavaScript() as unknown) as ProjectState;
        const id = req.request.getId();

        try {
            const outputs = await this.buddyApi.workspace(this.configuration.require('workspace')).project(id).read();

            const response = new ReadResponse();
            response.setId(id);
            response.setInputs(Struct.fromJavaScript(props as {}));
            response.setProperties(Struct.fromJavaScript({ ...outputs }));

            return response;
        } catch (err) {
            if (Axios.isCancel(err)) {
                throw new ServiceError('Canceled', status.CANCELLED, undefined, 'Cancelled');
            } else if (err instanceof ProjectNotFound) {
                return DELETE_RESPONSE;
            } else {
                throw ServiceError.wrap(err, status.INTERNAL);
            }
        }
    }

    async update(req: ServerUnaryCall<UpdateRequest>): Promise<UpdateResponse> {
        const news = (req.request.getNews()!.toJavaScript() as unknown) as ProjectState;
        const id = req.request.getId();

        try {
            const outputs = await this.buddyApi.workspace(this.configuration.require('workspace')).project(id).update(news);

            const response = new UpdateResponse();
            response.setProperties(Struct.fromJavaScript({ ...outputs }));

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

    async delete(req: ServerUnaryCall<DeleteRequest>): Promise<void> {
        const id = req.request.getId();

        try {
            await this.buddyApi.workspace(this.configuration.require('workspace')).project(id).delete();

            await sleep(1000);
        } catch (err) {
            if (Axios.isCancel(err)) {
                throw new ServiceError('Canceled', status.CANCELLED, undefined, 'Cancelled');
            } else if (err instanceof ProjectNotFound) {
                // handle not found as deleted
                await sleep(1000);
            } else {
                throw ServiceError.wrap(err, status.INTERNAL);
            }
        }
    }

    cancel() {
        this.buddyApi.cancel('project');
    }
}
