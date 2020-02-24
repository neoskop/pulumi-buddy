import 'reflect-metadata';
import { credentials, Server, ServerCredentials } from 'grpc';
import { ReflectiveInjector } from 'injection-js';
import * as yargs from 'yargs';

import { EngineClient } from './generated/engine_grpc_pb';
import { ResourceProviderService } from './generated/provider_grpc_pb';
import { MainProvider, SUB_PROVIDER } from './providers/main.provider';
import { ProjectProvider } from './providers/project.provider';

async function main(args: string[]) {
    if (1 !== args.length) {
        throw new Error('Missing argument for host RPC');
    }

    const injector = ReflectiveInjector.resolveAndCreate([
        {
            provide: Server,
            useFactory() {
                new Server();
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
        MainProvider
    ]);

    const server = new Server();

    server.addService(ResourceProviderService, injector.get(MainProvider));
    server.bind('0.0.0.0:51234', ServerCredentials.createInsecure());
    server.start();

    console.log('51234');
}

main(yargs.argv._).catch(err => {
    console.error(err);
    process.exit(1);
});
