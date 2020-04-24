import { PermissionProps, PermissionState } from 'pulumi-buddy';
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
import { Empty } from 'google-protobuf/google/protobuf/empty_pb';
import { Struct } from 'google-protobuf/google/protobuf/struct_pb';
import { ServerUnaryCall, status } from 'grpc';
import { Injectable } from 'injection-js';

import { BuddyApi } from '../buddy/api/api';
import { PermissionNotFound } from '../buddy/api/permission';
import { ServiceError } from '../errors/service.error';
import { Differ } from '../utils/differ';
import { Kind } from './kind';

@Injectable()
export class PermissionProvider implements IProvider {
    readonly kind = Kind.Permission;

    protected readonly olds = new Map<string, PermissionState>();

    constructor(protected readonly buddyApi: BuddyApi, protected readonly configuration: Configuration) {}

    check({ request }: ServerUnaryCall<CheckRequest>): CheckResponse {
        const olds = (request.getOlds()!.toJavaScript() as unknown) as PermissionState;
        const news = request.getNews()!.toJavaScript();
        this.olds.set(request.getUrn(), olds);

        const checkResponse = new CheckResponse();
        checkResponse.setInputs(Struct.fromJavaScript(news));
        return checkResponse;
    }

    diff(req: ServerUnaryCall<DiffRequest>): DiffResponse {
        const props = (req.request.getOlds()!.toJavaScript()! as unknown) as PermissionProps;
        const news = (req.request.getNews()!.toJavaScript()! as unknown) as PermissionState;
        const olds = this.olds.get(req.request.getUrn())!;

        return new Differ(olds, news, props)
            .diff('name', 'name')
            .diff('description', 'description')
            .diff('pipeline_access_level', 'pipeline_access_level')
            .diff('repository_access_level', 'repository_access_level')
            .diff('sandbox_access_level', 'sandbox_access_level')
            .toResponse();
    }

    async create(req: ServerUnaryCall<CreateRequest>): Promise<CreateResponse> {
        const props = (req.request.getProperties()!.toJavaScript() as unknown) as PermissionState;

        try {
            const outputs = await this.buddyApi
                .workspace(this.configuration.require('workspace'))
                .permission()
                .create(props);

            const response = new CreateResponse();
            response.setId(outputs.id.toString());
            response.setProperties(
                Struct.fromJavaScript({
                    ...outputs,
                    id: undefined!,
                    permission_id: outputs.id
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
        const props = (req.request.getInputs()!.toJavaScript() as unknown) as PermissionState;
        const id = +req.request.getId();

        try {
            const outputs = await this.buddyApi
                .workspace(this.configuration.require('workspace'))
                .permission(id)
                .read();

            const response = new ReadResponse();
            response.setId(req.request.getId());
            response.setInputs(Struct.fromJavaScript(props as any));
            response.setProperties(
                Struct.fromJavaScript({
                    ...outputs,
                    id: undefined!,
                    permission_id: outputs.id
                })
            );

            return response;
        } catch (err) {
            if (Axios.isCancel(err)) {
                throw new ServiceError('Canceled', status.CANCELLED, undefined, 'Cancelled');
            } else if (err instanceof PermissionNotFound) {
                throw new ServiceError(err.message, status.NOT_FOUND);
            } else {
                throw new ServiceError(err.message, status.INTERNAL);
            }
        }
    }

    async update(req: ServerUnaryCall<UpdateRequest>): Promise<UpdateResponse> {
        const news = (req.request.getNews()!.toJavaScript() as unknown) as PermissionState;
        const id = +req.request.getId();

        try {
            const outputs = await this.buddyApi
                .workspace(this.configuration.require('workspace'))
                .permission(id)
                .update({
                    ...news,
                    description: news.description || ''
                });

            const response = new UpdateResponse();
            response.setProperties(
                Struct.fromJavaScript({
                    ...outputs,
                    id: undefined!,
                    permission_id: outputs.id
                })
            );

            return response;
        } catch (err) {
            if (Axios.isCancel(err)) {
                throw new ServiceError('Canceled', status.CANCELLED, undefined, 'Cancelled');
            } else if (err instanceof PermissionNotFound) {
                throw new ServiceError(err.message, status.NOT_FOUND);
            } else {
                throw new ServiceError(err.message, status.INTERNAL);
            }
        }
    }

    async delete(req: ServerUnaryCall<DeleteRequest>): Promise<void> {
        const id = +req.request.getId();

        try {
            await this.buddyApi
                .workspace(this.configuration.require('workspace'))
                .permission(id)
                .delete();
            await sleep(1000);
        } catch (err) {
            if (Axios.isCancel(err)) {
                throw new ServiceError('Canceled', status.CANCELLED, undefined, 'Cancelled');
            } else if (!(err instanceof PermissionNotFound)) {
                throw new ServiceError(err.message, status.INTERNAL);
            }
            // handle not found as deleted
            await sleep(1000);
        }
    }

    cancel() {
        this.buddyApi.cancel('permission');
    }
}
