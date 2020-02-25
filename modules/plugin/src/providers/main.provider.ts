import { Kind } from '@neoskop/pulumi-buddy';
import { Empty } from 'google-protobuf/google/protobuf/empty_pb';
import { sendUnaryData, ServerUnaryCall, ServerWritableStream } from 'grpc';
import { Inject, Injectable, InjectionToken } from 'injection-js';

import { BuddyApi } from '../buddy-api/api';
import { PluginInfo } from '../generated/plugin_pb';
import { IResourceProviderServer } from '../generated/provider_grpc_pb';
import {
    CheckFailure,
    CheckRequest,
    CheckResponse,
    ConfigureRequest,
    ConfigureResponse,
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
    UpdateResponse,
} from '../generated/provider_pb';
import { Id } from '../utils/id';

export interface IProviderConfig {
    apiUrl: string;
    workspace: string;
    token: string;
}
export type SubProvider = Pick<IResourceProviderServer, 'check' | 'diff' | 'create' | 'read' | 'update' | 'delete'> & {
    readonly kind: Kind;
    setConfig(config: IProviderConfig): void;
    // cancel(): void;
};

export const SUB_PROVIDER = new InjectionToken<SubProvider[]>('Sub Provider');

@Injectable()
export class MainProvider implements IResourceProviderServer {
    config?: { apiUrl: string; workspace: string; token: string };

    constructor(@Inject(SUB_PROVIDER) protected readonly providers: SubProvider[], protected readonly buddyApi: BuddyApi) {}

    setConfig(config: IProviderConfig) {
        this.config = config;

        this.buddyApi.setToken(config.token);
        this.buddyApi.setApiUrl(config.apiUrl);

        for (const provider of this.providers) {
            provider.setConfig(config);
        }
    }

    getProvider(kind: Kind) {
        return this.providers.find(p => p.kind === kind);
    }

    getPluginInfo(req: ServerUnaryCall<unknown>, callback: sendUnaryData<PluginInfo>) {
        const { version } = require('../../../../package');
        const pluginInfo = new PluginInfo();
        pluginInfo.setVersion(version);
        callback(null, pluginInfo);
    }

    configure({ request }: ServerUnaryCall<ConfigureRequest>, callback: sendUnaryData<ConfigureResponse>) {
        const vars = request.getVariablesMap();

        this.setConfig({
            apiUrl: vars.get('buddy:config:apiUrl')!,
            workspace: vars.get('buddy:config:workspace')!,
            token: vars.get('buddy:config:token')!
        });

        const configureResponse = new ConfigureResponse();
        configureResponse.setAcceptsecrets(true);
        callback(null, configureResponse);
    }

    diffConfig(req: ServerUnaryCall<DiffRequest>, callback: sendUnaryData<DiffResponse>) {
        callback(null, new DiffResponse());
    }

    checkConfig(req: ServerUnaryCall<CheckRequest>, callback: sendUnaryData<CheckResponse>) {
        const news = req.request.getNews()?.toJavaScript();

        const failures: CheckFailure[] = [];

        if (!news || !news.apiUrl) {
            const failure = new CheckFailure();
            failure.setProperty('apiUrl');
            failure.setReason('apiUrl arg is missing');
            failures.push(failure);
        }
        if (!news || !news.workspace) {
            const failure = new CheckFailure();
            failure.setProperty('workspace');
            failure.setReason('workspace arg is missing');
            failures.push(failure);
        }
        if (!news || !news.token) {
            const failure = new CheckFailure();
            failure.setProperty('token');
            failure.setReason('token arg is missing');
            failures.push(failure);
        }

        const response = new CheckResponse();
        response.setInputs(req.request.getNews());
        if (failures) {
            response.setFailuresList(failures);
        }
        callback(null, response);
    }

    invoke(req: ServerUnaryCall<InvokeRequest>, callback: sendUnaryData<InvokeResponse>) {
        console.log('invoke:provider', req.request.getProvider());
        console.log('invoke:args', req.request.getArgs());
        console.log('invoke:tok', req.request.getTok());
        console.log('invoke:version', req.request.getVersion());

        callback(null, new InvokeResponse());
    }

    streamInvoke(req: ServerWritableStream<InvokeRequest>) {
        console.log('streamInvoke:provider', req.request.getProvider());
        console.log('streamInvoke:args', req.request.getArgs());
        console.log('streamInvoke:tok', req.request.getTok());
        console.log('streamInvoke:version', req.request.getVersion());

        req.write(new InvokeResponse());
    }

    check(req: ServerUnaryCall<CheckRequest>, callback: sendUnaryData<CheckResponse>) {
        const provider = this.getProvider(req.request.getNews()!.toJavaScript().kind as Kind);

        provider!.check(req, callback);
    }

    cancel(req: ServerUnaryCall<unknown>, callback: sendUnaryData<Empty>) {
        this.buddyApi.canceler && this.buddyApi.canceler.cancel();

        callback(null, new Empty());
    }

    create(req: ServerUnaryCall<CreateRequest>, callback: sendUnaryData<CreateResponse>) {
        const provider = this.getProvider(req.request.getProperties()!.toJavaScript().kind as Kind);

        provider!.create(req, callback);
    }

    delete(req: ServerUnaryCall<DeleteRequest>, callback: sendUnaryData<Empty>) {
        const id = Id.parse(req.request.getId());
        const provider = this.getProvider(id[id.length - 1][0]);

        provider!.delete(req, callback);
    }

    update(req: ServerUnaryCall<UpdateRequest>, callback: sendUnaryData<UpdateResponse>) {
        const id = Id.parse(req.request.getId());
        const provider = this.getProvider(id[id.length - 1][0]);

        provider!.update(req, callback);
    }

    read(req: ServerUnaryCall<ReadRequest>, callback: sendUnaryData<ReadResponse>) {
        const id = Id.parse(req.request.getId());
        const provider = this.getProvider(id[id.length - 1][0]);

        provider!.read(req, callback);
    }

    diff(req: ServerUnaryCall<DiffRequest>, callback: sendUnaryData<DiffResponse>) {
        const id = Id.parse(req.request.getId());
        const provider = this.getProvider(id[id.length - 1][0]);

        provider!.diff(req, callback);
    }
}
