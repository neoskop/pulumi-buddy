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
import { Configuration, IProvider, Struct } from '@pulumi-utils/plugin';
import Axios from 'axios';
import { ServerUnaryCall, status } from 'grpc';
import { Injectable } from 'injection-js';
import { GroupProps, GroupState } from 'pulumi-buddy';

import { BuddyApi } from '../buddy/api/api';
import { GroupNotFound } from '../buddy/api/group';
import { ServiceError } from '../errors/service.error';
import { Differ } from '../utils/differ';
import { DELETE_RESPONSE } from './delete-response';
import { Kind } from './kind';

@Injectable()
export class GroupProvider implements IProvider {
    readonly kind = Kind.Group;

    protected readonly olds = new Map<string, GroupState>();

    constructor(protected readonly buddyApi: BuddyApi, protected readonly configuration: Configuration) {}

    check({ request }: ServerUnaryCall<CheckRequest>): CheckResponse {
        const olds = (request.getOlds()!.toJavaScript() as unknown) as GroupState;
        const news = request.getNews()!.toJavaScript();
        this.olds.set(request.getUrn(), olds);

        const checkResponse = new CheckResponse();
        checkResponse.setInputs(Struct.fromJavaScript(news));
        return checkResponse;
    }

    diff(req: ServerUnaryCall<DiffRequest>): DiffResponse {
        const props = (req.request.getOlds()!.toJavaScript()! as unknown) as GroupProps;
        const news = (req.request.getNews()!.toJavaScript()! as unknown) as GroupState;
        const olds = this.olds.get(req.request.getUrn())!;

        return new Differ(olds, news, props).diff('name', 'name').diff('description', 'description').addStable('group_id').toResponse();
    }

    async create(req: ServerUnaryCall<CreateRequest>): Promise<CreateResponse> {
        const props = (req.request.getProperties()!.toJavaScript() as unknown) as GroupState;

        try {
            const outputs = await this.buddyApi.workspace(this.configuration.require('workspace')).group().create(props);

            const response = new CreateResponse();
            response.setId(outputs.id.toString());
            response.setProperties(
                Struct.fromJavaScript({
                    ...outputs,
                    id: undefined!,
                    group_id: outputs.id
                })
            );

            return response;
        } catch (err) {
            if (Axios.isCancel(err)) {
                throw new ServiceError('Canceled', status.CANCELLED, undefined, 'Cancelled');
            } else {
                throw new ServiceError(err.message, status.INTERNAL);
            }
        }
    }

    async read(req: ServerUnaryCall<ReadRequest>): Promise<ReadResponse> {
        const props = (req.request.getInputs()!.toJavaScript() as unknown) as GroupState;
        const id = +req.request.getId();

        try {
            const outputs = await this.buddyApi.workspace(this.configuration.require('workspace')).group(id).read();

            const response = new ReadResponse();
            response.setId(req.request.getId());
            response.setInputs(Struct.fromJavaScript(props as any));
            response.setProperties(
                Struct.fromJavaScript({
                    ...outputs,
                    id: undefined!,
                    group_id: outputs.id
                })
            );
            return response;
        } catch (err) {
            if (Axios.isCancel(err)) {
                throw new ServiceError('Canceled', status.CANCELLED, undefined, 'Cancelled');
            } else if (err instanceof GroupNotFound) {
                return DELETE_RESPONSE;
            } else {
                throw new ServiceError(err.message, status.INTERNAL);
            }
        }
    }

    async update(req: ServerUnaryCall<UpdateRequest>): Promise<UpdateResponse> {
        const news = (req.request.getNews()!.toJavaScript() as unknown) as GroupState;
        const id = +req.request.getId();

        try {
            const outputs = await this.buddyApi.workspace(this.configuration.require('workspace')).group(id).update(news);

            const response = new UpdateResponse();
            response.setProperties(
                Struct.fromJavaScript({
                    ...outputs,
                    id: undefined!,
                    group_id: outputs.id
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

    async delete(req: ServerUnaryCall<DeleteRequest>): Promise<void> {
        const id = +req.request.getId();

        try {
            await this.buddyApi.workspace(this.configuration.require('workspace')).group(id).delete();
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
        this.buddyApi.cancel('group');
    }
}
