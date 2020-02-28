import { credentials, Server, ServerCredentials } from 'grpc';
import { ReflectiveInjector } from 'injection-js';
import 'reflect-metadata';
import * as yargs from 'yargs';
import { BuddyApi } from './buddy/api/api';
import { EngineClient } from './grpc/engine_grpc_pb';
import { ResourceProviderService } from './grpc/provider_grpc_pb';
import { ActionProvider } from './providers/action.provider';
import { EnvironmentVariableProvider } from './providers/environment-variable.provider';
import { GroupProvider } from './providers/group.provider';
import { IntegrationProvider } from './providers/integration.provider';
import { MainProvider, SUB_PROVIDER } from './providers/main.provider';
import { MemberProvider } from './providers/member.provider';
import { PermissionProvider } from './providers/permission.provider';
import { PipelineProvider } from './providers/pipeline.provider';
import { ProjectProvider } from './providers/project.provider';
import { SshKeyProvider } from './providers/ssh-key.provider';
import { WebhookProvider } from './providers/webhook.provider';

async function main(args: string[]) {
    if (1 !== args.length) {
        throw new Error('Missing argument for host RPC');
    }

    const injector = ReflectiveInjector.resolveAndCreate([
        {
            provide: Server,
            useFactory() {
                return new Server();
            },
            deps: []
        },
        {
            provide: EngineClient,
            useFactory() {
                new EngineClient(args[0], credentials.createInsecure());
            },
            deps: []
        },
        { provide: SUB_PROVIDER, useClass: ProjectProvider, multi: true },
        { provide: SUB_PROVIDER, useClass: PipelineProvider, multi: true },
        { provide: SUB_PROVIDER, useClass: ActionProvider, multi: true },
        { provide: SUB_PROVIDER, useClass: MemberProvider, multi: true },
        { provide: SUB_PROVIDER, useClass: GroupProvider, multi: true },
        { provide: SUB_PROVIDER, useClass: PermissionProvider, multi: true },
        { provide: SUB_PROVIDER, useClass: WebhookProvider, multi: true },
        { provide: SUB_PROVIDER, useClass: EnvironmentVariableProvider, multi: true },
        { provide: SUB_PROVIDER, useClass: SshKeyProvider, multi: true },
        { provide: SUB_PROVIDER, useClass: IntegrationProvider, multi: true },
        MainProvider,
        { provide: BuddyApi, useValue: new BuddyApi() }
    ]);

    const server = injector.get(Server);

    server.addService(ResourceProviderService, injector.get(MainProvider));
    const port = server.bind('0.0.0.0:0', ServerCredentials.createInsecure());
    server.start();

    console.log(port);
}

main(yargs.argv._).catch(err => {
    console.error(err);
    process.exit(1);
});
