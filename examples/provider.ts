import * as buddy from '@neoskop/pulumi-buddy';
import * as pulumi from '@pulumi/pulumi';

const provider = new buddy.Provider('buddy.neoskop.cloud', {
    // apiUrl: 'https//your-buddy-on-premise-domain.tld/api',
    // token: new pulumi.Config().requireSecret('buddyToken'),
    // workspace: 'your-domain'
});

const project = new buddy.Project(
    'your-project',
    {
        display_name: 'Your Project Name'
    },
    { provider }
);
