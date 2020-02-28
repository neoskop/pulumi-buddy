import 'reflect-metadata';

import { credentials, Server, ServerCredentials } from 'grpc';
import { ReflectiveInjector } from 'injection-js';
import * as yargs from 'yargs';

import { BuddyApi } from './buddy/api/api';
import { EngineClient } from './grpc/engine_grpc_pb';
import { ResourceProviderService } from './grpc/provider_grpc_pb';
import { ActionProvider } from './providers/action.provider';
import { MainProvider, SUB_PROVIDER } from './providers/main.provider';
import { MemberProvider } from './providers/member.provider';
import { PipelineProvider } from './providers/pipeline.provider';
import { ProjectProvider } from './providers/project.provider';

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
        MainProvider,
        { provide: BuddyApi, useValue: new BuddyApi() }
    ]);

    const server = injector.get(Server);

    server.addService(ResourceProviderService, injector.get(MainProvider));
    server.bind('0.0.0.0:51234', ServerCredentials.createInsecure());
    server.start();

    console.log('51234');
}

main(yargs.argv._).catch(err => {
    console.error(err);
    process.exit(1);
});
