import { PipelineProps, PipelineState } from '@neoskop/pulumi-buddy';
import Axios from 'axios';
import { Empty } from 'google-protobuf/google/protobuf/empty_pb';
import { Struct } from 'google-protobuf/google/protobuf/struct_pb';
import { sendUnaryData, ServerUnaryCall, status } from 'grpc';
import { Injectable } from 'injection-js';
import { BuddyApi } from '../buddy/api/api';
import { PipelineNotFound } from '../buddy/api/pipeline';
import { ProjectNotFound } from '../buddy/api/project';
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
export class PipelineProvider implements SubProvider {
    readonly kind = Kind.Pipeline;

    config?: IProviderConfig;

    protected readonly olds = new Map<string, PipelineState>();

    constructor(protected readonly buddyApi: BuddyApi) {}

    setConfig(config: IProviderConfig) {
        this.config = config;
    }

    check({ request }: ServerUnaryCall<CheckRequest>, callback: sendUnaryData<CheckResponse>) {
        const olds = (request.getOlds()!.toJavaScript() as unknown) as PipelineState;
        const news = request.getNews()!.toJavaScript();
        this.olds.set(request.getUrn(), olds);

        const checkResponse = new CheckResponse();
        checkResponse.setInputs(Struct.fromJavaScript(news));
        callback(null, checkResponse);
    }

    diff(req: ServerUnaryCall<DiffRequest>, callback: sendUnaryData<DiffResponse>) {
        const props = (req.request.getOlds()!.toJavaScript()! as unknown) as PipelineProps;
        const news = (req.request.getNews()!.toJavaScript()! as unknown) as PipelineState;
        const olds = this.olds.get(req.request.getUrn())!;

        callback(
            null,
            new Differ(olds, news, props)
                .diff('project_name', [ 'project', 'name' ], true)
                .diff('name', 'name')
                .diff('ref_name', 'ref_name')
                .diff('trigger_mode', 'trigger_mode')
                .diff('ref_type', 'ref_type')
                .diff('always_from_scratch', 'always_from_scratch')
                .diff('auto_clear_cache', 'auto_clear_cache')
                .diff('no_skip_to_most_recent', 'no_skip_to_most_recent')
                .diff('do_not_create_commit_status', 'do_not_create_commit_status', true)
                .diff('start_date', 'start_date')
                .diff('delay', 'delay')
                .diff('cron', 'cron')
                .diff('run_always', 'run_always')
                .diff('paused', 'paused')
                .diff('ignore_fail_on_project_status', 'ignore_fail_on_project_status', true)
                .diff('execution_message_template', 'execution_message_template', true)
                .toResponse()
        );
    }

    create(req: ServerUnaryCall<CreateRequest>, callback: sendUnaryData<CreateResponse>) {
        if (!this.config) {
            return callback(new ServiceError('config not set', status.INTERNAL), null);
        }

        const props = (req.request.getProperties()!.toJavaScript() as unknown) as PipelineState;
        const project = this.buddyApi.workspace(this.config.workspace).project(props.project_name);

        project
            .pipeline()
            .create(props)
            .then(
                outputs => {
                    const response = new CreateResponse();
                    response.setId(outputs.id.toString());
                    response.setProperties(
                        Struct.fromJavaScript(
                            deleteUndefined({
                                ...outputs,
                                id: undefined,
                                pipeline_id: outputs.id,
                                project_name: props.project_name
                            })
                        )
                    );

                    callback(null, response);
                },
                err => {
                    if (Axios.isCancel(err)) {
                        callback(new ServiceError('Canceled', status.CANCELLED, undefined, 'Cancelled'), null);
                    } else if (err instanceof ProjectNotFound) {
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

        const id = +req.request.getId();
        const props = (req.request.getInputs()!.toJavaScript() as unknown) as PipelineState;

        this.buddyApi
            .workspace(this.config.workspace)
            .project(props.project_name)
            .pipeline(id)
            .read()
            .then(
                outputs => {
                    const response = new ReadResponse();
                    response.setId(req.request.getId());
                    response.setInputs(Struct.fromJavaScript(deleteUndefined(props)));
                    response.setProperties(
                        Struct.fromJavaScript(
                            deleteUndefined({
                                ...outputs,
                                id: undefined,
                                pipeline_id: outputs.id,
                                project_name: props.project_name
                            })
                        )
                    );

                    callback(null, response);
                },
                err => {
                    if (Axios.isCancel(err)) {
                        callback(new ServiceError('Canceled', status.CANCELLED, undefined, 'Cancelled'), null);
                    } else if (err instanceof ProjectNotFound || err instanceof PipelineNotFound) {
                        callback(new ServiceError(err.message, status.NOT_FOUND), null);
                    } else {
                        callback(new ServiceError(err.response.data.errors[0].message, status.INTERNAL), null);
                    }
                }
            );
    }

    update(req: ServerUnaryCall<UpdateRequest>, callback: sendUnaryData<UpdateResponse>) {
        if (!this.config) {
            return callback(new ServiceError('config not set', status.INTERNAL), null);
        }

        const news = (req.request.getNews()!.toJavaScript() as unknown) as PipelineState;
        const id = +req.request.getId();

        this.buddyApi
            .workspace(this.config.workspace)
            .project(news.project_name)
            .pipeline(id)
            .update(news)
            .then(
                outputs => {
                    const response = new UpdateResponse();
                    response.setProperties(
                        Struct.fromJavaScript(
                            deleteUndefined({
                                ...outputs,
                                id: undefined!,
                                pipeline_id: outputs.id,
                                project_name: news.project_name
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
    }

    delete(req: ServerUnaryCall<DeleteRequest>, callback: sendUnaryData<Empty>) {
        if (!this.config) {
            return callback(new ServiceError('config not set', status.INTERNAL), null);
        }

        const props = (req.request.getProperties()!.toJavaScript() as unknown) as PipelineProps;
        const id = +req.request.getId();

        this.buddyApi
            .workspace(this.config.workspace)
            .project(props.project_name)
            .pipeline(id)
            .delete()
            .then(
                () => callback(null, new Empty()),
                err => {
                    if (Axios.isCancel(err)) {
                        callback(new ServiceError('Canceled', status.CANCELLED, undefined, 'Cancelled'), null);
                    } else if (err instanceof ProjectNotFound) {
                        callback(new ServiceError(err.message, status.NOT_FOUND), null);
                    } else if (err instanceof PipelineNotFound) {
                        callback(null, new Empty());
                    } else {
                        callback(new ServiceError(err.message, status.INTERNAL), null);
                    }
                }
            );
    }
}
