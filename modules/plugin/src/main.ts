import 'reflect-metadata';

import { makeServer, serve } from '@pulumi-utils/plugin';
import * as yargs from 'yargs';

import { BuddyApi } from './buddy/api/api';
import { BuddyConfiguration } from './configuration';
import { ActionProvider } from './providers/action.provider';
import { EnvironmentVariableProvider } from './providers/environment-variable.provider';
import { GroupMemberBindingProvider } from './providers/group-member-binding.provider';
import { GroupProvider } from './providers/group.provider';
import { IntegrationProvider } from './providers/integration.provider';
import { MemberProvider } from './providers/member.provider';
import { PermissionProvider } from './providers/permission.provider';
import { PipelineProvider } from './providers/pipeline.provider';
import { ProjectMemberBindingProvider } from './providers/project-member-binding.provider';
import { ProjectProvider } from './providers/project.provider';
import { SshKeyProvider } from './providers/ssh-key.provider';
import { WebhookProvider } from './providers/webhook.provider';

export function main(args: string[], { stdout }: { stdout?: false } = {}) {
    return serve(
        args,
        makeServer(
            'buddy',
            require('../package').version,
            [
                ActionProvider,
                EnvironmentVariableProvider,
                GroupMemberBindingProvider,
                GroupProvider,
                IntegrationProvider,
                MemberProvider,
                PermissionProvider,
                PipelineProvider,
                ProjectMemberBindingProvider,
                ProjectProvider,
                SshKeyProvider,
                WebhookProvider
            ],
            {
                Configuration: BuddyConfiguration,
                providers: [{ provide: BuddyApi, useValue: new BuddyApi() }]
            }
        ),
        { stdout }
    );
}

if (require.main === module) {
    main(yargs.argv._).catch(err => {
        console.error(err);
        process.exit(1);
    });
}
