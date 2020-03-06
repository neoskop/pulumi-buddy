import { Struct } from 'google-protobuf/google/protobuf/struct_pb';
import { Server } from 'grpc';

import { ResourceProviderClient } from '../dist/grpc/provider_grpc_pb';
import { CheckRequest, CheckResponse, DiffRequest, DiffResponse } from '../dist/grpc/provider_pb';
import { createServerAndClient, makeCallback, sleep } from './utils';

describe('Webhook', () => {
    let server!: Server;
    let client!: ResourceProviderClient;
    beforeEach(async () => {
        await sleep(10);
        ({ server, client } = await createServerAndClient());
        await sleep(10);
    });

    afterEach(async () => {
        await sleep(10);
        server!.forceShutdown();
        await sleep(10);
    });

    it('should handle check/diff', async () => {
        const urn = 'urn:pulumi:stack-name::buddy::buddy:webhook:Webhook::1';

        const checkRequest = new CheckRequest();
        checkRequest.setOlds(Struct.fromJavaScript({ events: ['PUSH'], target_url: 'https://example.com/foo' }));
        checkRequest.setNews(Struct.fromJavaScript({ events: ['PUSH', 'EXECUTION_STARTED'], target_url: 'https://example.com/bar' }));
        checkRequest.setUrn(urn);
        const check = makeCallback<CheckResponse>();
        client!.check(checkRequest, check.callback);
        const checkResponse = await check.promise;

        const diffRequest = new DiffRequest();
        diffRequest.setNews(checkResponse.getInputs());
        diffRequest.setOlds(Struct.fromJavaScript({ id: 1, events: ['PUSH'], target_url: 'https://example.com/foo' }));
        diffRequest.setUrn(urn);
        diffRequest.setId('1');
        const diff = makeCallback<DiffResponse>();
        client!.diff(diffRequest, diff.callback);
        const diffResponse = await diff.promise;

        expect(diffResponse.getChanges()).toBe(DiffResponse.DiffChanges.DIFF_SOME);
        expect(diffResponse.getDiffsList()).toEqual(['events', 'target_url']);
        expect(diffResponse.getReplacesList()).toEqual([]);
        expect(diffResponse.getDeletebeforereplace()).toBe(false);
    });
});
