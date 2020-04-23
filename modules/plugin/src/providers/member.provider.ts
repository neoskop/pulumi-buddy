import { MemberProps, MemberState } from '@neoskop/pulumi-buddy';
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
} from '@neoskop/pulumi-utils-grpc';
import { Configuration, IProvider, Struct } from '@neoskop/pulumi-utils-plugin';
import Axios from 'axios';
import { ServerUnaryCall, status } from 'grpc';
import { Injectable } from 'injection-js';

import { BuddyApi } from '../buddy/api/api';
import { MemberNotFound } from '../buddy/api/member';
import { ServiceError } from '../errors/service.error';
import { Differ } from '../utils/differ';
import { sleep } from '../utils/sleep';
import { Kind } from './kind';

@Injectable()
export class MemberProvider implements IProvider {
    readonly kind = Kind.Member;

    protected readonly olds = new Map<string, MemberState>();

    constructor(protected readonly buddyApi: BuddyApi, protected readonly configuration: Configuration) {}

    check({ request }: ServerUnaryCall<CheckRequest>): CheckResponse {
        const olds = (request.getOlds()!.toJavaScript() as unknown) as MemberState;
        const news = request.getNews()!.toJavaScript();
        this.olds.set(request.getUrn(), olds);

        const checkResponse = new CheckResponse();
        checkResponse.setInputs(Struct.fromJavaScript(news));
        return checkResponse;
    }

    diff(req: ServerUnaryCall<DiffRequest>): DiffResponse {
        const props = (req.request.getOlds()!.toJavaScript()! as unknown) as MemberProps;
        const news = (req.request.getNews()!.toJavaScript()! as unknown) as MemberState;
        const olds = this.olds.get(req.request.getUrn())!;

        return new Differ(olds, news, props)
            .diff('email', null, true)
            .diff('isAdmin', 'admin')
            .setDeleteBeforeReplace(true)
            .toResponse();
    }

    async create(req: ServerUnaryCall<CreateRequest>): Promise<CreateResponse> {
        const props = (req.request.getProperties()!.toJavaScript() as unknown) as MemberState;

        try {
            const o = await this.buddyApi
                .workspace(this.configuration.require('workspace'))
                .member()
                .create(props);

            const outputs = !props.isAdmin
                ? o
                : await this.buddyApi
                      .workspace(this.configuration.require('workspace'))
                      .member(o.id)
                      .setAdmin(true);

            const response = new CreateResponse();
            response.setId(outputs.id.toString());
            response.setProperties(
                Struct.fromJavaScript({
                    ...outputs,
                    id: undefined!,
                    member_id: outputs.id
                } as any)
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
        const props = (req.request.getInputs()!.toJavaScript() as unknown) as MemberState;
        const id = +req.request.getId();

        try {
            const outputs = await this.buddyApi
                .workspace(this.configuration.require('workspace'))
                .member(id)
                .read();

            const response = new ReadResponse();
            response.setId(req.request.getId());
            response.setInputs(Struct.fromJavaScript(props as any));
            response.setProperties(
                Struct.fromJavaScript({
                    ...outputs,
                    id: undefined!,
                    member_id: outputs.id
                } as any)
            );

            return response;
        } catch (err) {
            if (Axios.isCancel(err)) {
                throw new ServiceError('Canceled', status.CANCELLED, undefined, 'Cancelled');
            } else if (err instanceof MemberNotFound) {
                throw new ServiceError(err.message, status.NOT_FOUND);
            } else {
                throw new ServiceError(err.message, status.INTERNAL);
            }
        }
    }

    async update(req: ServerUnaryCall<UpdateRequest>): Promise<UpdateResponse> {
        const news = (req.request.getNews()!.toJavaScript() as unknown) as MemberState;
        const id = +req.request.getId();

        try {
            const outputs = await this.buddyApi
                .workspace(this.configuration.require('workspace'))
                .member(id)
                .setAdmin(!!news.isAdmin);

            const response = new UpdateResponse();
            response.setProperties(
                Struct.fromJavaScript({
                    ...outputs,
                    id: undefined!,
                    member_id: outputs.id
                } as any)
            );

            return response;
        } catch (err) {
            if (Axios.isCancel(err)) {
                throw new ServiceError('Canceled', status.CANCELLED, undefined, 'Cancelled');
            } else if (err instanceof MemberNotFound) {
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
                .member(id)
                .delete();

            await sleep(1000);
        } catch (err) {
            if (Axios.isCancel(err)) {
                throw new ServiceError('Canceled', status.CANCELLED, undefined, 'Cancelled');
            } else if (!(err instanceof MemberNotFound)) {
                throw new ServiceError(err.message, status.INTERNAL);
            }
            // handle not found as deleted
            await sleep(1000);
        }
    }

    cancel() {
        this.buddyApi.cancel('member');
    }
}
