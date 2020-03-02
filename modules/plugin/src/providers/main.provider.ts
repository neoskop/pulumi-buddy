import { Empty } from 'google-protobuf/google/protobuf/empty_pb';
import { sendUnaryData, ServerUnaryCall, ServerWritableStream, status } from 'grpc';
import { Inject, Injectable, InjectionToken } from 'injection-js';
import { BuddyApi } from '../buddy/api/api';
import { ServiceError } from '../errors/service.error';
import { PluginInfo } from '../grpc/plugin_pb';
import { IResourceProviderServer } from '../grpc/provider_grpc_pb';
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
    UpdateResponse
} from '../grpc/provider_pb';
import { Tok } from '../utils/tok';
import { Urn } from '../utils/urn';

export interface IProviderConfig {
    apiUrl: string;
    workspace: string;
    token: string;
}
export type SubProvider = Pick<IResourceProviderServer, 'check' | 'diff' | 'create' | 'read' | 'update' | 'delete'> &
    Partial<Pick<IResourceProviderServer, 'invoke' | 'streamInvoke'>> & {
        readonly kind: Kind;
        setConfig(config: IProviderConfig): void;
    };

export const SUB_PROVIDER = new InjectionToken<SubProvider[]>('Sub Provider');

export enum Kind {
    Action = 'action',
    EnvironmentVariable = 'environment-variable',
    GroupMemberBinding = 'group-member-binding',
    Group = 'group',
    Integration = 'integration',
    Member = 'member',
    Permission = 'permission',
    Pipeline = 'pipeline',
    Project = 'project',
    SshKey = 'ssh-key',
    Webhook = 'webhook'
}

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
        const tok = Tok.parse(req.request.getTok());
        const provider = this.getProvider(tok.provider as Kind);

        if (!provider) {
            return callback(new ServiceError(`Provider '${tok.provider}' not found`, status.INVALID_ARGUMENT), null);
        }

        if (!provider.invoke) {
            return callback(new ServiceError(`Invoke not implemented in provider '${tok.provider}'`, status.UNIMPLEMENTED), null);
        }

        provider.invoke(req, callback);
    }

    /**
     * @TODO: make this working
     */
    streamInvoke(req: ServerWritableStream<InvokeRequest>) {
        const tok = Tok.parse(req.request.getTok());
        const provider = this.getProvider(tok.provider as Kind);

        if (!provider) {
            return req.emit('error', new ServiceError(`Provider '${tok.provider}' not found`, status.INVALID_ARGUMENT));
        }

        if (!provider.streamInvoke) {
            return req.emit('error', new ServiceError(`Invoke not implemented in provider '${tok.provider}'`, status.UNIMPLEMENTED));
        }

        provider.streamInvoke(req);

        return true;
    }

    check(req: ServerUnaryCall<CheckRequest>, callback: sendUnaryData<CheckResponse>) {
        const urn = Urn.parse(req.request.getUrn());
        const provider = this.getProvider(urn.typeGroup as Kind);

        provider!.check(req, callback);
    }

    cancel(req: ServerUnaryCall<unknown>, callback: sendUnaryData<Empty>) {
        this.buddyApi.cancel();

        callback(null, new Empty());
    }

    create(req: ServerUnaryCall<CreateRequest>, callback: sendUnaryData<CreateResponse>) {
        const urn = Urn.parse(req.request.getUrn());
        const provider = this.getProvider(urn.typeGroup as Kind);

        provider!.create(req, callback);
    }

    delete(req: ServerUnaryCall<DeleteRequest>, callback: sendUnaryData<Empty>) {
        const urn = Urn.parse(req.request.getUrn());
        const provider = this.getProvider(urn.typeGroup as Kind);

        provider!.delete(req, callback);
    }

    update(req: ServerUnaryCall<UpdateRequest>, callback: sendUnaryData<UpdateResponse>) {
        const urn = Urn.parse(req.request.getUrn());
        const provider = this.getProvider(urn.typeGroup as Kind);

        provider!.update(req, callback);
    }

    read(req: ServerUnaryCall<ReadRequest>, callback: sendUnaryData<ReadResponse>) {
        const urn = Urn.parse(req.request.getUrn());
        const provider = this.getProvider(urn.typeGroup as Kind);

        provider!.read(req, callback);
    }

    diff(req: ServerUnaryCall<DiffRequest>, callback: sendUnaryData<DiffResponse>) {
        const urn = Urn.parse(req.request.getUrn());
        const provider = this.getProvider(urn.typeGroup as Kind);

        provider!.diff(req, callback);
    }
}
