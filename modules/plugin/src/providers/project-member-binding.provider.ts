import { ProjectMemberBindingProps, ProjectMemberBindingState } from '@neoskop/pulumi-buddy';
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
import { Configuration, IProvider, sleep } from '@pulumi-utils/plugin';
import Axios from 'axios';
import { Struct } from 'google-protobuf/google/protobuf/struct_pb';
import { ServerUnaryCall, status } from 'grpc';
import { Injectable } from 'injection-js';

import { BuddyApi } from '../buddy/api/api';
import { ProjectNotFound } from '../buddy/api/project';
import { ServiceError } from '../errors/service.error';
import { Differ } from '../utils/differ';
import { Kind } from './kind';

@Injectable()
export class ProjectMemberBindingProvider implements IProvider {
    readonly kind = Kind.ProjectMemberBinding;

    protected readonly olds = new Map<string, ProjectMemberBindingState>();

    constructor(protected readonly buddyApi: BuddyApi, protected readonly configuration: Configuration) {}

    check({ request }: ServerUnaryCall<CheckRequest>): CheckResponse {
        const olds = (request.getOlds()!.toJavaScript() as unknown) as ProjectMemberBindingState;
        const news = request.getNews()!.toJavaScript();
        this.olds.set(request.getUrn(), olds);

        const checkResponse = new CheckResponse();
        checkResponse.setInputs(Struct.fromJavaScript(news));
        return checkResponse;
    }

    diff(req: ServerUnaryCall<DiffRequest>): DiffResponse {
        const props = (req.request.getOlds()!.toJavaScript()! as unknown) as ProjectMemberBindingProps;
        const news = (req.request.getNews()!.toJavaScript()! as unknown) as ProjectMemberBindingState;
        const olds = this.olds.get(req.request.getUrn())!;

        return new Differ(olds, news, props)
            .diff('project_name', null, true)
            .diff('member_id', null, true)
            .diff('permission_id', ['permission_set', 'id'], true)
            .setDeleteBeforeReplace(true)
            .toResponse();
    }

    async create(req: ServerUnaryCall<CreateRequest>): Promise<CreateResponse> {
        const props = (req.request.getProperties()!.toJavaScript() as unknown) as ProjectMemberBindingState;

        try {
            const outputs = await this.buddyApi
                .workspace(this.configuration.require('workspace'))
                .project(props.project_name)
                .addMember(props.member_id, props.permission_id);

            const id = `${props.project_name}~~~${props.permission_id}~~~${outputs.id}`;
            const response = new CreateResponse();
            response.setId(id);
            response.setProperties(
                Struct.fromJavaScript({
                    ...outputs,
                    id: undefined!,
                    project_member_binding_id: id
                })
            );

            return response;
        } catch (err) {
            if (Axios.isCancel(err)) {
                throw new ServiceError('Canceled', status.CANCELLED, undefined, 'Cancelled');
            } else if (err instanceof ProjectNotFound) {
                throw new ServiceError(err.message, status.NOT_FOUND);
            } else {
                throw new ServiceError(err.message, status.INTERNAL);
            }
        }
    }

    async read(req: ServerUnaryCall<ReadRequest>): Promise<ReadResponse> {
        const props = (req.request.getInputs()!.toJavaScript() as unknown) as ProjectMemberBindingState;
        const [projectName, memberId] = req.request.getId().split(/~~~/);

        try {
            const outputs = await this.buddyApi
                .workspace(this.configuration.require('workspace'))
                .project(projectName)
                .getMember(+memberId);
            const response = new ReadResponse();
            response.setId(req.request.getId());
            response.setInputs(Struct.fromJavaScript(props as any));
            response.setProperties(
                Struct.fromJavaScript({
                    ...outputs,
                    id: undefined!,
                    project_member_binding_id: req.request.getId()
                })
            );

            return response;
        } catch (err) {
            if (Axios.isCancel(err)) {
                throw new ServiceError('Canceled', status.CANCELLED, undefined, 'Cancelled');
            } else if (err instanceof ProjectNotFound) {
                throw new ServiceError(err.message, status.NOT_FOUND);
            } else {
                throw new ServiceError(err.message, status.INTERNAL);
            }
        }
    }

    async update(req: ServerUnaryCall<UpdateRequest>): Promise<UpdateResponse> {
        throw new ServiceError('not implemented', status.UNIMPLEMENTED);
    }

    async delete(req: ServerUnaryCall<DeleteRequest>): Promise<void> {
        const [projectName, _, memberId] = req.request.getId().split(/~~~/);

        try {
            await this.buddyApi
                .workspace(this.configuration.require('workspace'))
                .project(projectName)
                .deleteMember(+memberId);
            await sleep(1000);
        } catch (err) {
            if (Axios.isCancel(err)) {
                throw new ServiceError('Canceled', status.CANCELLED, undefined, 'Cancelled');
            } else if (!(err instanceof ProjectNotFound)) {
                throw new ServiceError(err.message, status.INTERNAL);
            }
            // handle not found as deleted
            await sleep(1000);
        }
    }

    cancel() {
        this.buddyApi.cancel('project-member-binding');
    }
}
