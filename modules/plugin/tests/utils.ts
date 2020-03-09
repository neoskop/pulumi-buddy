import { main } from '../src/main';
import { Server, credentials, ServiceError } from 'grpc';
import { ResourceProviderClient } from '../src/grpc/provider_grpc_pb';

export async function createServerAndClient() {
    const injector = await main(['0.0.0.0:0'], { noPortEmit: true });

    const server = injector.get(Server);
    const client = new ResourceProviderClient(`127.0.0.1:${injector.get('PORT')}`, credentials.createInsecure());

    return { injector, server, client };
}

export function makeCallback<T>() {
    let callback: (err: ServiceError | null, result: T | null) => void;
    const promise = new Promise<T>((resolve, reject) => {
        callback = (err: any, result: any) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        };
    });

    return { promise, callback: callback! };
}

export function sleep(ms: number) {
    return new Promise(resolve => {
        setTimeout(() => resolve(), ms);
    });
}
