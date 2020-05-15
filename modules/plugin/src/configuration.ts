import { ConfigurationImpl, NAME, ACCEPT_SECRETS, CONFIGURATION_VALIDATOR, ConfigurationValidator } from '@pulumi-utils/plugin';
import { CheckRequest, CheckResponse, CheckFailure, ConfigureRequest, ConfigureResponse } from '@pulumi-utils/grpc';
import { ServerUnaryCall } from 'grpc';
import { Inject, Optional } from 'injection-js';
import { BuddyApi } from './buddy/api/api';

export class BuddyConfiguration extends ConfigurationImpl {
    constructor(
        @Inject(NAME) name: string,
        @Inject(ACCEPT_SECRETS) acceptSecrets: boolean,
        protected readonly buddyApi: BuddyApi,
        @Inject(CONFIGURATION_VALIDATOR) @Optional() configurationValidator?: ConfigurationValidator
    ) {
        super(name, acceptSecrets, configurationValidator);
    }

    async checkConfig(req: ServerUnaryCall<CheckRequest>): Promise<CheckResponse> {
        const news = req.request.getNews()?.toJavaScript();

        const failures: CheckFailure[] = [];

        if (!news || !news.workspace) {
            const failure = new CheckFailure();
            failure.setProperty('workspace');
            failure.setReason('workspace arg is missing');
            failures.push(failure);
        }
        if (!news || !news.token) {
            const failure = new CheckFailure();
            failure.setProperty('token');
            failure.setReason('token arg is missing');
            failures.push(failure);
        }

        const response = new CheckResponse();
        response.setInputs(req.request.getNews());
        if (failures) {
            response.setFailuresList(failures);
        }

        return response;
    }

    configure(req: ServerUnaryCall<ConfigureRequest>): ConfigureResponse {
        const response = super.configure(req);

        if (!this.get('apiUrl')) {
            this.set('apiUrl', 'https://api.buddy.works');
        }

        this.buddyApi.setToken(this.require('token'));
        this.buddyApi.setApiUrl(this.require('apiUrl'));

        response.setAcceptsecrets(false);

        return response;
    }
}
