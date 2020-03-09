import { Server } from 'grpc';
import { createServerAndClient, makeCallback, sleep } from './utils';
import { ResourceProviderClient } from '../src/grpc/provider_grpc_pb';
import { CheckRequest, CheckResponse, DiffResponse, DiffRequest } from '../src/grpc/provider_pb';
import { Struct } from 'google-protobuf/google/protobuf/struct_pb';

describe('Permission', () => {
    let server!: Server;
    let client!: ResourceProviderClient;
    beforeEach(async () => {
        ({ server, client } = await createServerAndClient());
    });

    afterEach(async () => {
        server!.forceShutdown();
    });

    it('should handle check/diff', async () => {
        const urn = 'urn:pulumi:stack-name::buddy::buddy:permission:Permission::1';

        const checkRequest = new CheckRequest();
        checkRequest.setOlds(Struct.fromJavaScript({ name: 'test123' }));
        checkRequest.setNews(Struct.fromJavaScript({ name: 'test123 NEW' }));
        checkRequest.setUrn(urn);
        const check = makeCallback<CheckResponse>();
        client!.check(checkRequest, check.callback);
        const checkResponse = await check.promise;

        const diffRequest = new DiffRequest();
        diffRequest.setNews(checkResponse.getInputs());
        diffRequest.setOlds(Struct.fromJavaScript({ id: 1 }));
        diffRequest.setUrn(urn);
        diffRequest.setId('1');
        const diff = makeCallback<DiffResponse>();
        client!.diff(diffRequest, diff.callback);
        const diffResponse = await diff.promise;

        expect(diffResponse.getChanges()).toBe(DiffResponse.DiffChanges.DIFF_SOME);
        expect(diffResponse.getDiffsList()).toEqual(['name']);
        expect(diffResponse.getReplacesList()).toEqual([]);
        expect(diffResponse.getDeletebeforereplace()).toBe(false);
    });
});
