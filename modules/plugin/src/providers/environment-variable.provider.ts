import { EnvironmentVariableProps, EnvironmentVariableState } from 'pulumi-buddy';
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

import { BuddyApi } from '../buddy/api/api';
import { EnvironmentVariableNotFound } from '../buddy/api/environment-variable';
import { ServiceError } from '../errors/service.error';
import { Differ } from '../utils/differ';
import { Kind } from './kind';

@Injectable()
export class EnvironmentVariableProvider implements IProvider {
    readonly kind = Kind.EnvironmentVariable;

    protected readonly olds = new Map<string, EnvironmentVariableState>();

    constructor(protected readonly buddyApi: BuddyApi, protected readonly configuration: Configuration) {}

    check({ request }: ServerUnaryCall<CheckRequest>): CheckResponse {
        const olds = (request.getOlds()!.toJavaScript() as unknown) as EnvironmentVariableState;
        const news = request.getNews()!.toJavaScript();
        this.olds.set(request.getUrn(), olds);

        const checkResponse = new CheckResponse();
        checkResponse.setInputs(Struct.fromJavaScript(news));

        return checkResponse;
    }

    diff(req: ServerUnaryCall<DiffRequest>): DiffResponse {
        const props = (req.request.getOlds()!.toJavaScript()! as unknown) as EnvironmentVariableProps;
        const news = (req.request.getNews()!.toJavaScript()! as unknown) as EnvironmentVariableState;
        const olds = this.olds.get(req.request.getUrn())!;

        return new Differ(olds, news, props)
            .diff('key', 'key')
            .diff('value', props?.encrypted ? null : 'value')
            .diff('description', 'description')
            .diff('ssh_key', 'ssh_key')
            .diff('settable', 'settable')
            .diff('encrypted', 'encrypted')
            .diff('project_name', null, true)
            .diff('pipeline_id', null, true)
            .diff('action_id', null, true)
            .addStable('variable_id')
            .toResponse();
    }

    async create(req: ServerUnaryCall<CreateRequest>): Promise<CreateResponse> {
        const props = (req.request.getProperties()!.toJavaScript() as unknown) as EnvironmentVariableState;

        try {
            const outputs = await this.buddyApi
                .workspace(this.configuration.require('workspace'))
                .environmentVariable()
                .create({
                    ...props,
                    project: props.project_name ? { name: props.project_name } : undefined,
                    pipeline: props.pipeline_id ? { id: props.pipeline_id } : undefined,
                    action: props.action_id ? { id: props.action_id } : undefined
                });

            const response = new CreateResponse();
            response.setId(outputs.id.toString());
            response.setProperties(
                Struct.fromJavaScript({
                    ...outputs,
                    id: undefined!,
                    variable_id: outputs.id
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
        const props = (req.request.getInputs()!.toJavaScript() as unknown) as EnvironmentVariableState;
        const id = +req.request.getId();

        try {
            const outputs = await this.buddyApi.workspace(this.configuration.require('workspace')).environmentVariable(id).read();
            const response = new ReadResponse();
            response.setId(req.request.getId());
            response.setInputs(Struct.fromJavaScript(props as any));
            response.setProperties(
                Struct.fromJavaScript({
                    ...outputs,
                    id: undefined!,
                    variable_id: outputs.id
                } as any)
            );

            return response;
        } catch (err) {
            if (Axios.isCancel(err)) {
                throw new ServiceError('Canceled', status.CANCELLED, undefined, 'Cancelled');
            } else if (err instanceof EnvironmentVariableNotFound) {
                throw new ServiceError(err.message, status.NOT_FOUND);
            } else {
                throw new ServiceError(err.message, status.INTERNAL);
            }
        }
    }

    async update(req: ServerUnaryCall<UpdateRequest>): Promise<UpdateResponse> {
        const news = (req.request.getNews()!.toJavaScript() as unknown) as EnvironmentVariableState;
        const id = +req.request.getId();

        try {
            const outputs = await this.buddyApi
                .workspace(this.configuration.require('workspace'))
                .environmentVariable(id)
                .update({
                    ssh_key: false,
                    settable: false,
                    encrypted: false,
                    ...news
                });

            const response = new UpdateResponse();
            response.setProperties(
                Struct.fromJavaScript({
                    ...outputs,
                    id: undefined!,
                    variable_id: outputs.id
                } as any)
            );

            return response;
        } catch (err) {
            if (Axios.isCancel(err)) {
                throw new ServiceError('Canceled', status.CANCELLED, undefined, 'Cancelled');
            } else if (err instanceof EnvironmentVariableNotFound) {
                throw new ServiceError(err.message, status.NOT_FOUND);
            } else {
                throw new ServiceError(err.message, status.INTERNAL);
            }
        }
    }

    async delete(req: ServerUnaryCall<DeleteRequest>): Promise<void> {
        const id = +req.request.getId();

        try {
            await this.buddyApi.workspace(this.configuration.require('workspace')).environmentVariable(id).delete();
        } catch (err) {
            if (Axios.isCancel(err)) {
                throw new ServiceError('Canceled', status.CANCELLED, undefined, 'Cancelled');
            } else if (!(err instanceof EnvironmentVariableNotFound)) {
                throw new ServiceError(err.message, status.INTERNAL);
            }
            // handle not found as deleted
        }
    }

    cancel() {
        this.buddyApi.cancel('environment-variable');
    }
}
