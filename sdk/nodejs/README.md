![Logo](https://raw.githubusercontent.com/neoskop/pulumi-buddy/master/logo.svg?sanitize=true)

[![Travis master](https://img.shields.io/travis/neoskop/pulumi-buddy/master.svg)](https://travis-ci.org/neoskop/pulumi-buddy)
[![Snyk master](https://snyk.io/test/github/neoskop/pulumi-buddy/master/badge.svg)](https://snyk.io/test/github/neoskop/pulumi-buddy/master)
[![NPM version](https://badge.fury.io/js/pulumi-buddy.svg)](https://npmjs.com/package/pulumi-buddy)
[![License](https://img.shields.io/npm/l/pulumi-buddy.svg)](https://github.com/neoskop/pulumi-buddy/blob/master/LICENSE)

> A [Pulumi](https://www.pulumi.com/) integration for [Buddy](https://buddy.works/)

## Requirements

-   [Pulumi CLI](https://www.pulumi.com/docs/get-started/install/)

## Quickstart

```sh
$ mkdir myproject && cd myproject
$ pulumi new typescript
#            "javascript" works as well
$ npm install
$ npm install pulumi-buddy
#             or pulumi-buddy@next for latest preview version
$ pulumi config set buddy:workspace myworkspace-name
$ pulumi config set buddy:token myaccesstoken --secret
# for Buddy On-Premise
$ pulumi config set buddy:apiUrl https://my-buddy-server.com/api
```

_See [here](https://buddy.works/docs/api/getting-started/oauth2/personal-access-token), how to create an access token._

```typescript
import * as buddy from 'pulumi-buddy';

const project1 = new buddy.Project('project1', {
    display_name: 'Project #1',
    external_project_id: 'domain/repo',
    integration: {
        hash_id: 'integration_hash'
    }
});

export const project_name = project1.name;

const pipeline = new buddy.Pipeline('pipeline1', {
    project_name: project1.name,
    name: 'Pipeline #1',
    ref_name: 'master',
    trigger_mode: 'MANUAL'
});

const action = new buddy.actions.RunDockerContainer('action1', {
    project_name: project1.name,
    pipeline_id: pipeline.pipeline_id,
    docker_image_name: 'ubuntu',
    docker_image_tag: '19.10',
    name: 'Action #1',
    inline_commands: 'echo "Hello from pulumi-buddy"',
    trigger_time: 'ON_EVERY_EXECUTION'
});
```

[More examples](https://github.com/neoskop/pulumi-buddy/tree/master/examples)

## License

[MIT](https://raw.githubusercontent.com/neoskop/pulumi-buddy/master/LICENSE)
