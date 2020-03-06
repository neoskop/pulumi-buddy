import { Server } from 'grpc';
import { createServerAndClient, makeCallback, sleep } from './utils';
import { ResourceProviderClient } from '../dist/grpc/provider_grpc_pb';
import { CheckRequest, CheckResponse, DiffResponse, DiffRequest } from '../dist/grpc/provider_pb';
import { Struct } from 'google-protobuf/google/protobuf/struct_pb';

describe('EnvironmentVariable', () => {
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
        const urn = 'urn:pulumi:stack-name::buddy::buddy:environment-variable:EnvironmentVariable::id';

        const checkRequest = new CheckRequest();
        checkRequest.setOlds(Struct.fromJavaScript({ project_name: 'test123', key: 'test', value: 'test123' }));
        checkRequest.setNews(Struct.fromJavaScript({ project_name: 'test123 NEW', key: 'test', value: 'test123 NEW' }));
        checkRequest.setUrn(urn);
        const check = makeCallback<CheckResponse>();
        client!.check(checkRequest, check.callback);
        const checkResponse = await check.promise;

        const diffRequest = new DiffRequest();
        diffRequest.setNews(checkResponse.getInputs());
        diffRequest.setOlds(Struct.fromJavaScript({ project: { name: 'test123' }, key: 'test', value: 'test123' }));
        diffRequest.setUrn(urn);
        diffRequest.setId('id');
        const diff = makeCallback<DiffResponse>();
        client!.diff(diffRequest, diff.callback);
        const diffResponse = await diff.promise;

        expect(diffResponse.getChanges()).toBe(DiffResponse.DiffChanges.DIFF_SOME);
        expect(diffResponse.getDiffsList()).toEqual(['value', 'project_name']);
        expect(diffResponse.getReplacesList()).toEqual(['project_name']);
    });
});
