import { ResourceProviderClient } from '@pulumi-utils/grpc';
import { credentials, ServiceError } from 'grpc';

import { main } from '../src/main';

export async function createServerAndClient() {
    const { server, port } = await main(['0.0.0.0:0'], { stdout: false });

    const client = new ResourceProviderClient(`127.0.0.1:${port}`, credentials.createInsecure());

    return { server, client };
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
