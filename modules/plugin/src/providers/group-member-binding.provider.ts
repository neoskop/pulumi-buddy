import { GroupMemberBindingProps, GroupMemberBindingState } from 'pulumi-buddy';
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
    UpdateRequest
} from '@pulumi-utils/grpc';
import { Configuration, IProvider, Struct } from '@pulumi-utils/plugin';
import Axios from 'axios';
import { ServerUnaryCall, status } from 'grpc';
import { Injectable } from 'injection-js';

import { BuddyApi } from '../buddy/api/api';
import { GroupNotFound } from '../buddy/api/group';
import { ServiceError } from '../errors/service.error';
import { Differ } from '../utils/differ';
import { Kind } from './kind';

@Injectable()
export class GroupMemberBindingProvider implements IProvider {
    readonly kind = Kind.GroupMemberBinding;

    protected readonly olds = new Map<string, GroupMemberBindingState>();

    constructor(protected readonly buddyApi: BuddyApi, protected readonly configuration: Configuration) {}

    check({ request }: ServerUnaryCall<CheckRequest>): CheckResponse {
        const olds = (request.getOlds()!.toJavaScript() as unknown) as GroupMemberBindingState;
        const news = request.getNews()!.toJavaScript();
        this.olds.set(request.getUrn(), olds);

        const checkResponse = new CheckResponse();
        checkResponse.setInputs(Struct.fromJavaScript(news));
        return checkResponse;
    }

    diff(req: ServerUnaryCall<DiffRequest>): DiffResponse {
        const props = (req.request.getOlds()!.toJavaScript()! as unknown) as GroupMemberBindingProps;
        const news = (req.request.getNews()!.toJavaScript()! as unknown) as GroupMemberBindingState;
        const olds = this.olds.get(req.request.getUrn())!;

        return new Differ(olds, news, props)
            .diff('group_id', null, true)
            .diff('member_id', null, true)
            .setDeleteBeforeReplace(true)
            .addStable('group_member_binding_id')
            .toResponse();
    }

    async create(req: ServerUnaryCall<CreateRequest>): Promise<CreateResponse> {
        const props = (req.request.getProperties()!.toJavaScript() as unknown) as GroupMemberBindingState;

        try {
            const outputs = await this.buddyApi
                .workspace(this.configuration.require('workspace'))
                .group(props.group_id)
                .addMember(props.member_id);

            const id = `${props.group_id}~~~${outputs.id}`;
            const response = new CreateResponse();
            response.setId(id);
            response.setProperties(
                Struct.fromJavaScript({
                    ...outputs,
                    id: undefined!,
                    group_member_binding_id: id
                })
            );

            return response;
        } catch (err) {
            if (Axios.isCancel(err)) {
                throw new ServiceError('Canceled', status.CANCELLED, undefined, 'Cancelled');
            } else if (err instanceof GroupNotFound) {
                throw new ServiceError(err.message, status.NOT_FOUND);
            } else {
                throw new ServiceError(err.message, status.INTERNAL);
            }
        }
    }

    async read(req: ServerUnaryCall<ReadRequest>): Promise<ReadResponse> {
        const props = (req.request.getInputs()!.toJavaScript() as unknown) as GroupMemberBindingState;
        const [groupId, memberId] = req.request.getId().split(/~~~/).map(Number);

        try {
            const outputs = await this.buddyApi.workspace(this.configuration.require('workspace')).group(groupId).getMember(memberId);

            const response = new ReadResponse();
            response.setId(req.request.getId());
            response.setInputs(Struct.fromJavaScript(props as any));
            response.setProperties(
                Struct.fromJavaScript({
                    ...outputs,
                    id: undefined!,
                    group_member_binding_id: req.request.getId()
                })
            );

            return response;
        } catch (err) {
            if (Axios.isCancel(err)) {
                throw new ServiceError('Canceled', status.CANCELLED, undefined, 'Cancelled');
            } else if (err instanceof GroupNotFound) {
                throw new ServiceError(err.message, status.NOT_FOUND);
            } else {
                throw new ServiceError(err.message, status.INTERNAL);
            }
        }
    }

    update(req: ServerUnaryCall<UpdateRequest>): never {
        throw new ServiceError('not implemented', status.UNIMPLEMENTED);
    }

    async delete(req: ServerUnaryCall<DeleteRequest>): Promise<void> {
        const [groupId, memberId] = req.request.getId().split(/~~~/).map(Number);

        try {
            await this.buddyApi.workspace(this.configuration.require('workspace')).group(groupId).deleteMember(memberId);
        } catch (err) {
            if (Axios.isCancel(err)) {
                throw new ServiceError('Canceled', status.CANCELLED, undefined, 'Cancelled');
            } else if (!(err instanceof GroupNotFound)) {
                throw new ServiceError(err.message, status.INTERNAL);
            }
            // handle not found as deleted
        }
    }

    cancel() {
        this.buddyApi.cancel('group-member-binding');
    }
}
