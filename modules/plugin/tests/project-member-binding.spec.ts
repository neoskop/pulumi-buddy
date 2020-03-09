import { Server } from 'grpc';
import { createServerAndClient, makeCallback, sleep } from './utils';
import { ResourceProviderClient } from '../src/grpc/provider_grpc_pb';
import { CheckRequest, CheckResponse, DiffResponse, DiffRequest } from '../src/grpc/provider_pb';
import { Struct } from 'google-protobuf/google/protobuf/struct_pb';

describe('ProjectMemberBinding', () => {
    let server!: Server;
    let client!: ResourceProviderClient;
    beforeEach(async () => {
        ({ server, client } = await createServerAndClient());
    });

    afterEach(async () => {
        server!.forceShutdown();
    });

    it('should handle check/diff', async () => {
        const urn = 'urn:pulumi:stack-name::buddy::buddy:project-member-binding:ProjectMemberBinding::test123~~~1~~~1';

        const checkRequest = new CheckRequest();
        checkRequest.setOlds(Struct.fromJavaScript({ project_name: 'test123', permission_id: 1, member_id: 1 }));
        checkRequest.setNews(Struct.fromJavaScript({ project_name: 'test123', permission_id: 2, member_id: 2 }));
        checkRequest.setUrn(urn);
        const check = makeCallback<CheckResponse>();
        client!.check(checkRequest, check.callback);
        const checkResponse = await check.promise;

        const diffRequest = new DiffRequest();
        diffRequest.setNews(checkResponse.getInputs());
        diffRequest.setOlds(Struct.fromJavaScript({ id: 1 }));
        diffRequest.setUrn(urn);
        diffRequest.setId('id');
        const diff = makeCallback<DiffResponse>();
        client!.diff(diffRequest, diff.callback);
        const diffResponse = await diff.promise;

        expect(diffResponse.getChanges()).toBe(DiffResponse.DiffChanges.DIFF_SOME);
        expect(diffResponse.getDiffsList()).toEqual(['member_id', 'permission_id']);
        expect(diffResponse.getReplacesList()).toEqual(['member_id', 'permission_id']);
        expect(diffResponse.getDeletebeforereplace()).toBe(true);
    });
});
