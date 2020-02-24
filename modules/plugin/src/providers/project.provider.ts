import { BuddyProjectProps, Kind } from '@neoskop/pulumi-buddy';
import Axios, { CancelTokenSource } from 'axios';
import { Empty } from 'google-protobuf/google/protobuf/empty_pb';
import { Struct } from 'google-protobuf/google/protobuf/struct_pb';
import { sendUnaryData, ServerUnaryCall, status } from 'grpc';
import { Injectable } from 'injection-js';

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
} from '../generated/provider_pb';
import { Id } from '../utils/id';
import { IProviderConfig, SubProvider } from './main.provider';

@Injectable()
export class ProjectProvider implements SubProvider {
    readonly kind = 'Project' as Kind;

    config?: IProviderConfig;
    canceler?: CancelTokenSource;

    setConfig(config: IProviderConfig) {
        this.config = config;
    }

    cancel() {
        if (this.canceler) {
            this.canceler.cancel();
        }
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

        const props = req.request.getProperties()!.toJavaScript() as {
            config: { apiUrl: string; workspace: string; token: string };
        };

        this.canceler = Axios.CancelToken.source();
        Axios.post<BuddyProjectProps>(`${this.config.apiUrl}/workspaces/${this.config.workspace}/projects`, props, {
            cancelToken: this.canceler.token,
            headers: {
                Authorization: `Bearer ${this.config.token}`
            }
        }).then(
            result => {
                const response = new CreateResponse();
                response.setId(Id.stringify([['Project' as Kind, result.data.name]]));
                response.setProperties(Struct.fromJavaScript({ ...(result.data as {}), kind: 'Project' }));

                callback(null, response);
            },
            err => {
                if (Axios.isCancel(err)) {
                    callback(new ServiceError('Canceled', status.CANCELLED), null);
                } else {
                    callback(new ServiceError(err.response.data.errors[0].message, status.INTERNAL), null);
                }
            }
        );
    }

    delete(req: ServerUnaryCall<DeleteRequest>, callback: sendUnaryData<Empty>) {
        if (!this.config) {
            return callback(new ServiceError('config not set', status.INTERNAL), null);
        }

        const id = Id.parse(req.request.getId());

        this.canceler = Axios.CancelToken.source();
        Axios.delete(`${this.config.apiUrl}/workspaces/${this.config.workspace}/projects/${id[0][1]}`, {
            cancelToken: this.canceler.token,
            headers: {
                Authorization: `Bearer ${this.config.token}`
            }
        }).then(
            () => {
                callback(null, new Empty());
            },
            err => {
                if (Axios.isCancel(err)) {
                    callback(new ServiceError('Canceled', status.CANCELLED), null);
                } else if (err.response.status === 404) {
                    callback(new ServiceError(err.response.data.errors[0].message, status.NOT_FOUND), null);
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

        const news = req.request.getNews()!.toJavaScript();

        this.canceler = Axios.CancelToken.source();
        Axios.patch<BuddyProjectProps>(
            `${this.config.apiUrl}/workspaces/${this.config.workspace}/projects/${news.name}`,
            {
                display_name: news.display_name
            },
            {
                cancelToken: this.canceler.token,
                headers: {
                    Authorization: `Bearer ${this.config.token}`
                }
            }
        ).then(
            result => {
                const response = new UpdateResponse();
                response.setProperties(Struct.fromJavaScript({ ...(result.data as {}), kind: 'Project' }));

                callback(null, response);
            },
            err => {
                if (Axios.isCancel(err)) {
                    callback(new ServiceError('Canceled', status.CANCELLED), null);
                } else {
                    callback(new ServiceError(err.response.data.errors[0].message, status.INTERNAL), null);
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

        this.canceler = Axios.CancelToken.source();
        Axios.get(`${this.config.apiUrl}/workspaces/${this.config.workspace}/projects/${id[0][1]}`, {
            cancelToken: this.canceler.token,
            headers: {
                Authorization: `Bearer ${this.config.token}`
            }
        }).then(
            result => {
                const response = new ReadResponse();
                response.setId(req.request.getId());
                response.setInputs(Struct.fromJavaScript(props));
                response.setProperties(Struct.fromJavaScript({ ...(result.data as {}), kind: 'Project' }));

                callback(null, response);
            },
            err => {
                if(Axios.isCancel(err)) {
                    callback(new ServiceError('Canceled', status.CANCELLED), null);
                } else if (err.response.status === 404) {
                    callback(new ServiceError(err.response.data.errors[0].message, status.NOT_FOUND), null);
                } else {
                    callback(new ServiceError(err.response.data.errors[0].message, status.INTERNAL), null);
                }
            }
        );
    }

    diff(req: ServerUnaryCall<DiffRequest>, callback: sendUnaryData<DiffResponse>) {
        const olds = req.request.getOlds()!.toJavaScript();
        const news = req.request.getNews()!.toJavaScript();

        let changed = false;
        const replacements: string[] = [];

        if (olds.name !== news.name) {
            replacements.push('name');
        }
        if (olds.display_name !== news.display_name) {
            changed = true;
        }
        if (JSON.stringify(olds.integration) !== JSON.stringify(news.integration)) {
            replacements.push('integration');
        }
        if (olds.external_project_id !== news.external_project_id) {
            replacements.push('external_project_id');
        }
        if (olds.custom_repo_url !== news.custom_repo_url) {
            replacements.push('custom_repo_url');
        }
        if (olds.custom_repo_user !== news.custom_repo_user) {
            replacements.push('custom_repo_user');
        }
        if (olds.custom_repo_pass !== news.custom_repo_pass) {
            replacements.push('custom_repo_pass');
        }

        const response = new DiffResponse();
        response.setChanges(changed || replacements.length > 0 ? DiffResponse.DiffChanges.DIFF_SOME : DiffResponse.DiffChanges.DIFF_NONE);
        response.setReplacesList(replacements);
        callback(null, response);
    }
}
