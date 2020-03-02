import { GroupMemberBindingProps, GroupMemberBindingState } from '@neoskop/pulumi-buddy';
import Axios from 'axios';
import { Empty } from 'google-protobuf/google/protobuf/empty_pb';
import { Struct } from 'google-protobuf/google/protobuf/struct_pb';
import { sendUnaryData, ServerUnaryCall, status } from 'grpc';
import { Injectable } from 'injection-js';
import { BuddyApi } from '../buddy/api/api';
import { GroupNotFound } from '../buddy/api/group';
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
import { IProviderConfig, Kind, SubProvider } from './main.provider';

@Injectable()
export class GroupMemberBindingProvider implements SubProvider {
    readonly kind = Kind.GroupMemberBinding;

    config?: IProviderConfig;

    protected readonly olds = new Map<string, GroupMemberBindingState>();

    constructor(protected readonly buddyApi: BuddyApi) {}

    setConfig(config: IProviderConfig) {
        this.config = config;
    }

    check({ request }: ServerUnaryCall<CheckRequest>, callback: sendUnaryData<CheckResponse>) {
        const olds = (request.getOlds()!.toJavaScript() as unknown) as GroupMemberBindingState;
        const news = request.getNews()!.toJavaScript();
        this.olds.set(request.getUrn(), olds);

        const checkResponse = new CheckResponse();
        checkResponse.setInputs(Struct.fromJavaScript(news));
        callback(null, checkResponse);
    }

    diff(req: ServerUnaryCall<DiffRequest>, callback: sendUnaryData<DiffResponse>) {
        const props = (req.request.getOlds()!.toJavaScript()! as unknown) as GroupMemberBindingProps;
        const news = (req.request.getNews()!.toJavaScript()! as unknown) as GroupMemberBindingState;
        const olds = this.olds.get(req.request.getUrn())!;

        callback(
            null,
            new Differ(olds, news, props)
                .diff('group_id', null, true)
                .diff('member_id', null, true)
                .toResponse()
        );
    }

    create(req: ServerUnaryCall<CreateRequest>, callback: sendUnaryData<CreateResponse>) {
        if (!this.config) {
            return callback(new ServiceError('config not set', status.INTERNAL), null);
        }

        const props = (req.request.getProperties()!.toJavaScript() as unknown) as GroupMemberBindingState;

        this.buddyApi
            .workspace(this.config.workspace)
            .group(props.group_id)
            .addMember(props.member_id)
            .then(
                outputs => {
                    const id = `${props.group_id}-${outputs.id}`;
                    const response = new CreateResponse();
                    response.setId(id);
                    response.setProperties(
                        Struct.fromJavaScript(
                            deleteUndefined({
                                ...outputs,
                                id: undefined!,
                                group_member_binding_id: id
                            })
                        )
                    );

                    callback(null, response);
                },
                err => {
                    if (Axios.isCancel(err)) {
                        callback(new ServiceError('Canceled', status.CANCELLED, undefined, 'Cancelled'), null);
                    } else if (err instanceof GroupNotFound) {
                        callback(new ServiceError(err.message, status.NOT_FOUND), null);
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

        const props = (req.request.getProperties()!.toJavaScript() as unknown) as GroupMemberBindingState;
        const [groupId, memberId] = req.request
            .getId()
            .split(/-/)
            .map(Number);

        this.buddyApi
            .workspace(this.config.workspace)
            .group(groupId)
            .getMember(memberId)
            .then(
                outputs => {
                    const response = new ReadResponse();
                    response.setId(req.request.getId());
                    response.setInputs(Struct.fromJavaScript(deleteUndefined(props)));
                    response.setProperties(
                        Struct.fromJavaScript(
                            deleteUndefined({
                                ...outputs,
                                id: undefined!,
                                group_member_binding_id: req.request.getId()
                            })
                        )
                    );

                    callback(null, response);
                },
                err => {
                    if (Axios.isCancel(err)) {
                        callback(new ServiceError('Canceled', status.CANCELLED, undefined, 'Cancelled'), null);
                    } else if (err instanceof GroupNotFound) {
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
        if (!this.config) {
            return callback(new ServiceError('config not set', status.INTERNAL), null);
        }

        const [groupId, memberId] = req.request
            .getId()
            .split(/-/)
            .map(Number);

        this.buddyApi
            .workspace(this.config.workspace)
            .group(groupId)
            .deleteMember(memberId)
            .then(
                () => {
                    setTimeout(() => callback(null, new Empty()), 1000);
                },
                err => {
                    if (Axios.isCancel(err)) {
                        callback(new ServiceError('Canceled', status.CANCELLED, undefined, 'Cancelled'), null);
                    } else if (err instanceof GroupNotFound) {
                        setTimeout(() => callback(null, new Empty()), 1000);
                    } else {
                        callback(new ServiceError(err.message, status.INTERNAL), null);
                    }
                }
            );
    }
}
