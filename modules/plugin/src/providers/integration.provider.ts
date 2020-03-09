import { IntegrationState } from '@neoskop/pulumi-buddy';
import Axios from 'axios';
import { Empty } from 'google-protobuf/google/protobuf/empty_pb';
import { Struct } from 'google-protobuf/google/protobuf/struct_pb';
import { sendUnaryData, ServerUnaryCall, status } from '@grpc/grpc-js';
import { Injectable } from 'injection-js';
import { BuddyApi } from '../buddy/api/api';
import { IntegrationNotFound } from '../buddy/api/integration';
import { ServiceError } from '../errors/service.error';
import {
    CheckRequest,
    CheckResponse,
    CreateRequest,
    CreateResponse,
    DeleteRequest,
    DiffRequest,
    DiffResponse,
    InvokeRequest,
    InvokeResponse,
    ReadRequest,
    ReadResponse,
    UpdateRequest,
    UpdateResponse
} from '../grpc/provider_pb';
import { deleteUndefined } from '../utils/delete-undefined';
import { Tok } from '../utils/tok';
import { IProviderConfig, Kind, SubProvider } from './main.provider';

@Injectable()
export class IntegrationProvider implements SubProvider {
    readonly kind = Kind.Integration;

    config?: IProviderConfig;

    protected readonly olds = new Map<string, IntegrationState>();

    constructor(protected readonly buddyApi: BuddyApi) {}

    setConfig(config: IProviderConfig) {
        this.config = config;
    }

    invoke({ request }: ServerUnaryCall<InvokeRequest>, callback: sendUnaryData<InvokeResponse>) {
        const tok = Tok.parse(request.getTok());

        switch (tok.method) {
            case 'list':
                this.buddyApi
                    .integration()
                    .list()
                    .then(
                        integrations => {
                            const response = new InvokeResponse();
                            response.setReturn(
                                Struct.fromJavaScript(
                                    deleteUndefined({
                                        integrations
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
                break;
        }
    }

    check({ request }: ServerUnaryCall<CheckRequest>, callback: sendUnaryData<CheckResponse>) {
        const olds = (request.getOlds()!.toJavaScript() as unknown) as IntegrationState;
        const news = request.getNews()!.toJavaScript();
        this.olds.set(request.getUrn(), olds);

        const checkResponse = new CheckResponse();
        checkResponse.setInputs(Struct.fromJavaScript(news));
        callback(null, checkResponse);
    }

    diff(req: ServerUnaryCall<DiffRequest>, callback: sendUnaryData<DiffResponse>) {
        callback(null, new DiffResponse());
    }

    create(req: ServerUnaryCall<CreateRequest>, callback: sendUnaryData<CreateResponse>) {
        callback(new ServiceError('Not implemented', status.UNIMPLEMENTED), null);
    }

    read(req: ServerUnaryCall<ReadRequest>, callback: sendUnaryData<ReadResponse>) {
        if (!this.config) {
            return callback(new ServiceError('config not set', status.INTERNAL), null);
        }

        const id = req.request.getId();

        this.buddyApi
            .integration(id as any)
            .read()
            .then(
                outputs => {
                    const response = new ReadResponse();
                    response.setId(req.request.getId());
                    response.setProperties(
                        Struct.fromJavaScript(
                            deleteUndefined({
                                ...outputs,
                                id: undefined!,
                                integration_id: outputs.id
                            })
                        )
                    );

                    callback(null, response);
                },
                err => {
                    if (Axios.isCancel(err)) {
                        callback(new ServiceError('Canceled', status.CANCELLED, undefined, 'Cancelled'), null);
                    } else if (err instanceof IntegrationNotFound) {
                        callback(new ServiceError(err.message, status.NOT_FOUND), null);
                    } else {
                        callback(new ServiceError(err.message, status.INTERNAL), null);
                    }
                }
            );
    }

    update(req: ServerUnaryCall<UpdateRequest>, callback: sendUnaryData<UpdateResponse>) {
        callback(new ServiceError('not implemented', status.UNIMPLEMENTED), null);
    }

    delete(req: ServerUnaryCall<DeleteRequest>, callback: sendUnaryData<Empty>) {
        callback(new ServiceError('not implemented', status.UNIMPLEMENTED), null);
    }
}
