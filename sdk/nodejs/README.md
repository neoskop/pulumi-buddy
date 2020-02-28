# @neoskop/pulumi-buddy

> A [Pulumi](https://www.pulumi.com/) integration for [Buddy](https://buddy.works/)

## Requirements

 - [Pulumi CLI](https://www.pulumi.com/docs/get-started/install/)
 - [@neoskop/pulumi-buddy-plugin](https://www.npmjs.com/package/@neoskop/pulumi-buddy-plugin)  
   As long as Pulumi offers no way to publish a custom plugin, you have to install the plugin manually.

## Quickstart

```sh
$ mkdir myproject && cd myproject
$ pulumi new typescript                                         # "javascript" works as well
$ npm install
$ npm install @neoskop/pulumi-buddy
$ pulumi config set buddy:workspace myworkspace-name
$ pulumi config set buddy:token myaccesstoken --secret
$ pulumi config set buddy:apiUrl https://my-buddy-server.com    # for Buddy On-Premise
```

*See [here](https://buddy.works/docs/api/getting-started/oauth2/personal-access-token), how to create an access token.*

```typescript
import * as buddy from '@neoskop/pulumi-buddy';

const provider = new buddy.Provider();

const project1 = new buddy.BuddyProject('project1', {
    display_name: 'Project #1',
    external_project_id: 'domain/repo',
    integration: {
        hash_id: 'integration_hash'
    }
}, { provider });

export const project_name = project1.name;

const pipeline = new buddy.BuddyPipeline('pipeline1', {
    project_name: project1.name,
    name: 'Pipeline #1',
    ref_name: 'master',
    trigger_mode: 'MANUAL'
}, { provider });

const action = new BuddyActionRunDockerContainer(
    'action1',
    {
        project_name: project1.name,
        pipeline_id: pipeline.pipeline_id,
        docker_image_name: 'ubuntu',
        docker_image_tag: '19.10',
        name: 'Action #1',
        inline_commands: 'echo "Hello from @neoskop/pulumi-buddy"',
        trigger_time: 'ON_EVERY_EXECUTION'
    },
    { provider }
);
```
