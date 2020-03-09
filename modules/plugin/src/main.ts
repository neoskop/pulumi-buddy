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
import { GroupMemberBindingProvider } from './providers/group-member-binding.provider';
import { ProjectMemberBindingProvider } from './providers/project-member-binding.provider';

export async function main(args: string[], { noPortEmit }: { noPortEmit?: boolean } = {}) {
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
        { provide: SUB_PROVIDER, useClass: GroupMemberBindingProvider, multi: true },
        { provide: SUB_PROVIDER, useClass: ProjectMemberBindingProvider, multi: true },
        MainProvider,
        { provide: BuddyApi, useValue: new BuddyApi() }
    ]);

    const server: Server = injector.get(Server);

    server.addService(ResourceProviderService, injector.get(MainProvider));
    const port = await new Promise((resolve, reject) => server.bindAsync(`0.0.0.0:0`, ServerCredentials.createInsecure(), (err, port) => {
        if(err) {
            return reject(err);
        }
        resolve(port);
    }));
    server.start();

    if(!noPortEmit) {
        console.log(port);
    }

    return injector.resolveAndCreateChild([
        { provide: 'PORT', useValue: port }
    ]);
}

if (require.main === module) {
    main(yargs.argv._).catch(err => {
        console.error(err);
        process.exit(1);
    });
}
