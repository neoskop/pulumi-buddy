import { Kind } from '@neoskop/pulumi-buddy';
import { BuddyPipelineProps, BuddyPipelineState } from '@neoskop/pulumi-buddy/pipeline';
import Axios from 'axios';
import { Empty } from 'google-protobuf/google/protobuf/empty_pb';
import { Struct } from 'google-protobuf/google/protobuf/struct_pb';
import { sendUnaryData, ServerUnaryCall, status } from 'grpc';
import { Injectable } from 'injection-js';

import { BuddyApi } from '../buddy-api/api';
import { PipelineNotFound } from '../buddy-api/pipeline';
import { ProjectNotFound } from '../buddy-api/project';
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
    UpdateResponse,
} from '../generated/provider_pb';
import { Id } from '../utils/id';
import { IProviderConfig, SubProvider } from './main.provider';

@Injectable()
export class PipelineProvider implements SubProvider {
    readonly kind = 'Pipeline' as Kind;

    config?: IProviderConfig;
    constructor(protected readonly buddyApi: BuddyApi) {}

    setConfig(config: IProviderConfig) {
        this.config = config;
    }

    check({ request }: ServerUnaryCall<CheckRequest>, callback: sendUnaryData<CheckResponse>) {
        const news = request.getNews()!.toJavaScript();

        const checkResponse = new CheckResponse();
        checkResponse.setInputs(Struct.fromJavaScript(news));
        callback(null, checkResponse);
    }

    create(req: ServerUnaryCall<CreateRequest>, callback: sendUnaryData<CreateResponse>) {
        if (!this.config) {
            return callback(new ServiceError('config not set', status.INTERNAL), null);
        }

        const props = (req.request.getProperties()!.toJavaScript() as unknown) as BuddyPipelineState;

        this.buddyApi
            .workspace(this.config.workspace)
            .project(props.project_name)
            .pipeline()
            .create(props)
            .then(
                result => {
                    const response = new CreateResponse();
                    response.setId(
                        Id.stringify([
                            ['Project' as Kind, props.project_name],
                            ['Pipeline' as Kind, result.id.toString()]
                        ])
                    );
                    response.setProperties(Struct.fromJavaScript({ ...(result as {}), kind: 'Pipeline' }));

                    callback(null, response);
                },
                err => {
                    if (Axios.isCancel(err)) {
                        callback(new ServiceError('Canceled', status.CANCELLED), null);
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

        const id = Id.parse(req.request.getId());

        this.buddyApi
            .workspace(this.config.workspace)
            .project(id[0][1])
            .pipeline(+id[1][1])
            .delete()
            .then(
                () => callback(null, new Empty()),
                err => {
                    if (Axios.isCancel(err)) {
                        callback(new ServiceError('Canceled', status.CANCELLED), null);
                    } else if (err instanceof ProjectNotFound || err instanceof PipelineNotFound) {
                        callback(new ServiceError(err.message, status.NOT_FOUND), null);
                    } else {
                        callback(new ServiceError(err.message, status.INTERNAL), null);
                    }
                }
            );
    }

    update(req: ServerUnaryCall<UpdateRequest>, callback: sendUnaryData<UpdateResponse>) {
        if (!this.config) {
            return callback(new ServiceError('config not set', status.INTERNAL), null);
        }

        const news = (req.request.getNews()!.toJavaScript() as unknown) as BuddyPipelineState;
        const id = Id.parse(req.request.getId());

        this.buddyApi
            .workspace(this.config.workspace)
            .project(id[0][1])
            .pipeline(+id[1][1])
            .update(news)
            .then(
                result => {
                    const response = new UpdateResponse();
                    response.setProperties(Struct.fromJavaScript({ ...(result as {}), kind: 'Pipeline' }));

                    callback(null, response);
                },
                err => {
                    if (Axios.isCancel(err)) {
                        callback(new ServiceError('Canceled', status.CANCELLED), null);
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

        const id = Id.parse(req.request.getId());
        const props = req.request.getProperties()!.toJavaScript();

        this.buddyApi
            .workspace(this.config.workspace)
            .project(id[0][1])
            .pipeline(+id[1][1])
            .read()
            .then(
                result => {
                    const response = new ReadResponse();
                    response.setId(req.request.getId());
                    response.setInputs(Struct.fromJavaScript(props));
                    response.setProperties(Struct.fromJavaScript({ ...(result as {}), kind: 'Pipeline' }));

                    callback(null, response);
                },
                err => {
                    if (Axios.isCancel(err)) {
                        callback(new ServiceError('Canceled', status.CANCELLED), null);
                    } else if (err instanceof ProjectNotFound || err instanceof PipelineNotFound) {
                        callback(new ServiceError(err.message, status.NOT_FOUND), null);
                    } else {
                        callback(new ServiceError(err.response.data.errors[0].message, status.INTERNAL), null);
                    }
                }
            );
    }

    diff(req: ServerUnaryCall<DiffRequest>, callback: sendUnaryData<DiffResponse>) {
        const olds = (req.request.getOlds()!.toJavaScript() as unknown) as BuddyPipelineProps;
        const news = (req.request.getNews()!.toJavaScript() as unknown) as BuddyPipelineState;

        let changed = false;
        const replacements: string[] = [];

        if (olds.project.name !== news.project_name) {
            replacements.push('project_name');
        }
        if (olds.name !== news.name) {
            changed = true;
        }
        if (olds.ref_name !== news.ref_name) {
            changed = true;
        }
        if (olds.trigger_mode !== news.trigger_mode) {
            changed = true;
        }
        if (olds.ref_type !== news.ref_type) {
            changed = true;
        }
        if (olds.always_from_scratch !== news.always_from_scratch) {
            changed = true;
        }
        if (olds.auto_clear_cache !== news.auto_clear_cache) {
            changed = true;
        }
        if (olds.no_skip_to_most_recent !== news.no_skip_to_most_recent) {
            changed = true;
        }
        // if(olds.do_not_create_commit_status !== news.do_not_create_commit_status) {
        //     replacements.push('do_not_create_commit_status')
        // }
        // if(olds.start_date !== news.start_date) {
        //     changed = true;
        // }
        // if(olds.delay !== news.delay) {
        //     changed = true;
        // }
        // if(olds.cron !== news.cron) {
        //     changed = true;
        // }
        // if(olds.run_always !== news.run_always) {
        //     changed = true;
        // }
        // if(olds.paused !== news.paused) {
        //     changed = true;
        // }
        // if(olds.ignore_fail_on_project_status !== news.ignore_fail_on_project_status) {
        //     replacements.push('ignore_fail_on_project_status');
        // }
        // if(olds.execution_message_template !== news.execution_message_template) {
        //     replacements.push('execution_message_template');
        // }

        const response = new DiffResponse();
        response.setChanges(changed || replacements.length > 0 ? DiffResponse.DiffChanges.DIFF_SOME : DiffResponse.DiffChanges.DIFF_NONE);
        response.setReplacesList(replacements);
        callback(null, response);
    }
}
