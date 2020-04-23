import { IntegrationState } from '@neoskop/pulumi-buddy';
import {
    CheckRequest,
    CheckResponse,
    CreateRequest,
    DeleteRequest,
    DiffRequest,
    DiffResponse,
    InvokeRequest,
    InvokeResponse,
    ReadRequest,
    ReadResponse,
    UpdateRequest
} from '@pulumi-utils/grpc';
import { IProvider, Struct } from '@pulumi-utils/plugin';
import Axios from 'axios';
import { ServerUnaryCall, status } from 'grpc';
import { Injectable } from 'injection-js';

import { BuddyApi } from '../buddy/api/api';
import { IntegrationNotFound } from '../buddy/api/integration';
import { ServiceError } from '../errors/service.error';
import { Tok } from '../utils/tok';
import { Kind } from './kind';

@Injectable()
export class IntegrationProvider implements IProvider {
    readonly kind = Kind.Integration;

    protected readonly olds = new Map<string, IntegrationState>();

    constructor(protected readonly buddyApi: BuddyApi) {}

    async invoke({ request }: ServerUnaryCall<InvokeRequest>): Promise<InvokeResponse> {
        const tok = Tok.parse(request.getTok());

        try {
            switch (tok.method) {
                case 'list': {
                    const integrations = await this.buddyApi.integration().list();
                    const response = new InvokeResponse();
                    response.setReturn(
                        Struct.fromJavaScript({
                            integrations
                        } as any)
                    );
                    return response;
                }
                default:
                    throw new ServiceError('Unknown', status.UNKNOWN);
            }
        } catch (err) {
            if (Axios.isCancel(err)) {
                throw new ServiceError('Canceled', status.CANCELLED, undefined, 'Cancelled');
            } else {
                throw new ServiceError(err.message, status.INTERNAL);
            }
        }
    }

    check({ request }: ServerUnaryCall<CheckRequest>): CheckResponse {
        const olds = (request.getOlds()!.toJavaScript() as unknown) as IntegrationState;
        const news = request.getNews()!.toJavaScript();
        this.olds.set(request.getUrn(), olds);

        const checkResponse = new CheckResponse();
        checkResponse.setInputs(Struct.fromJavaScript(news));
        return checkResponse;
    }

    diff(req: ServerUnaryCall<DiffRequest>): DiffResponse {
        return new DiffResponse();
    }

    create(req: ServerUnaryCall<CreateRequest>): never {
        throw new ServiceError('Not implemented', status.UNIMPLEMENTED);
    }

    async read(req: ServerUnaryCall<ReadRequest>): Promise<ReadResponse> {
        const id = req.request.getId();

        try {
            const outputs = await this.buddyApi.integration(+id).read();
            const response = new ReadResponse();
            response.setId(req.request.getId());
            response.setProperties(
                Struct.fromJavaScript({
                    ...outputs,
                    id: undefined!,
                    integration_id: outputs.id
                })
            );

            return response;
        } catch (err) {
            if (Axios.isCancel(err)) {
                throw new ServiceError('Canceled', status.CANCELLED, undefined, 'Cancelled');
            } else if (err instanceof IntegrationNotFound) {
                throw new ServiceError(err.message, status.NOT_FOUND);
            } else {
                throw new ServiceError(err.message, status.INTERNAL);
            }
        }
    }

    update(req: ServerUnaryCall<UpdateRequest>): never {
        throw new ServiceError('not implemented', status.UNIMPLEMENTED);
    }

    delete(req: ServerUnaryCall<DeleteRequest>): never {
        throw new ServiceError('not implemented', status.UNIMPLEMENTED);
    }

    cancel() {
        this.buddyApi.cancel('integration');
    }
}
