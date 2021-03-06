import { CheckRequest, CheckResponse, DiffRequest, DiffResponse, ResourceProviderClient } from '@pulumi-utils/grpc';
import { Struct } from 'google-protobuf/google/protobuf/struct_pb';
import { Server } from 'grpc';

import { createServerAndClient, makeCallback } from './utils';

describe('SshKey', () => {
    let server!: Server;
    let client!: ResourceProviderClient;
    beforeEach(async () => {
        ({ server, client } = await createServerAndClient());
    });

    afterEach(async () => {
        server!.forceShutdown();
    });

    it('should handle check/diff', async () => {
        const urn = 'urn:pulumi:stack-name::buddy::buddy:ssh-key:SshKey::1';

        const checkRequest = new CheckRequest();
        checkRequest.setOlds(Struct.fromJavaScript({ content: '12345', title: 'test123' }));
        checkRequest.setNews(Struct.fromJavaScript({ content: '123456', title: 'test123 NEW' }));
        checkRequest.setUrn(urn);
        const check = makeCallback<CheckResponse>();
        client!.check(checkRequest, check.callback);
        const checkResponse = await check.promise;

        const diffRequest = new DiffRequest();
        diffRequest.setNews(checkResponse.getInputs());
        diffRequest.setOlds(Struct.fromJavaScript({ id: 1, content: '12345', title: 'test123' }));
        diffRequest.setUrn(urn);
        diffRequest.setId('1');
        const diff = makeCallback<DiffResponse>();
        client!.diff(diffRequest, diff.callback);
        const diffResponse = await diff.promise;

        expect(diffResponse.getChanges()).toBe(DiffResponse.DiffChanges.DIFF_SOME);
        expect(diffResponse.getDiffsList()).toEqual(['content', 'title']);
        expect(diffResponse.getReplacesList()).toEqual(['content', 'title']);
        expect(diffResponse.getDeletebeforereplace()).toBe(true);
    });
});
