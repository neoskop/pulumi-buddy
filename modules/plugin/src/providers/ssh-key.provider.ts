import { SshKeyProps, SshKeyState } from '@neoskop/pulumi-buddy';
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
import { Configuration, IProvider } from '@neoskop/pulumi-utils-plugin';
import Axios from 'axios';
import { Struct } from 'google-protobuf/google/protobuf/struct_pb';
import { ServerUnaryCall, status } from 'grpc';
import { Injectable } from 'injection-js';

import { BuddyApi } from '../buddy/api/api';
import { SshKeyNotFound } from '../buddy/api/ssh-key';
import { ServiceError } from '../errors/service.error';
import { Differ } from '../utils/differ';
import { sleep } from '../utils/sleep';
import { Kind } from './kind';

@Injectable()
export class SshKeyProvider implements IProvider {
    readonly kind = Kind.SshKey;

    protected readonly olds = new Map<string, SshKeyState>();

    constructor(protected readonly buddyApi: BuddyApi, protected readonly configuration: Configuration) {}

    check({ request }: ServerUnaryCall<CheckRequest>): CheckResponse {
        const olds = (request.getOlds()!.toJavaScript() as unknown) as SshKeyState;
        const news = request.getNews()!.toJavaScript();
        this.olds.set(request.getUrn(), olds);

        const checkResponse = new CheckResponse();
        checkResponse.setInputs(Struct.fromJavaScript(news));
        return checkResponse;
    }

    diff(req: ServerUnaryCall<DiffRequest>): DiffResponse {
        const props = (req.request.getOlds()!.toJavaScript()! as unknown) as SshKeyProps;
        const news = (req.request.getNews()!.toJavaScript()! as unknown) as SshKeyState;
        const olds = this.olds.get(req.request.getUrn())!;

        return new Differ(olds, news, props)
            .diff('content', 'content', true)
            .diff('title', 'title', true)
            .setDeleteBeforeReplace(true)
            .toResponse();
    }

    async create(req: ServerUnaryCall<CreateRequest>): Promise<CreateResponse> {
        const props = (req.request.getProperties()!.toJavaScript() as unknown) as SshKeyState;

        try {
            const outputs = await this.buddyApi.sshKey().create(props);

            const response = new CreateResponse();
            response.setId(outputs.id.toString());
            response.setProperties(
                Struct.fromJavaScript({
                    ...outputs,
                    id: undefined!,
                    ssh_key_id: outputs.id
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
        const props = (req.request.getInputs()!.toJavaScript() as unknown) as SshKeyState;
        const id = +req.request.getId();

        try {
            const outputs = await this.buddyApi.sshKey(id).read();

            const response = new ReadResponse();
            response.setId(req.request.getId());
            response.setInputs(Struct.fromJavaScript(props as any));
            response.setProperties(
                Struct.fromJavaScript({
                    ...outputs,
                    id: undefined!,
                    ssh_key_id: outputs.id
                } as any)
            );

            return response;
        } catch (err) {
            if (Axios.isCancel(err)) {
                throw new ServiceError('Canceled', status.CANCELLED, undefined, 'Cancelled');
            } else if (err instanceof SshKeyNotFound) {
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
        const id = +req.request.getId();

        try {
            await this.buddyApi.sshKey(id).delete();
            await sleep(1000);
        } catch (err) {
            if (Axios.isCancel(err)) {
                throw new ServiceError('Canceled', status.CANCELLED, undefined, 'Cancelled');
            } else if (!(err instanceof SshKeyNotFound)) {
                throw new ServiceError(err.message, status.INTERNAL);
            }
            // handle not found as deleted
            await sleep(1000);
        }
    }

    cancel() {
        this.buddyApi.cancel('ssh-key');
    }
}
