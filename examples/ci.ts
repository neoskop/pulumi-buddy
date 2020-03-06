import * as buddy from '@neoskop/pulumi-buddy';

const provider = new buddy.Provider('buddy');

const github = buddy.Integration.findByType('github', 'GIT_HUB', { provider });

const project = new buddy.Project(
    'pulumi-buddy',
    {
        display_name: '@neoskop/pulumi-buddy',
        external_project_id: 'neoskop/pulumi-buddy',
        integration: { hash_id: github.hash_id }
    },
    { provider }
);

for (const [name, ref_name] of [
    ['Develop', 'develop'],
    ['Master', 'master']
]) {
    const pipeline = new buddy.Pipeline(
        name,
        {
            project_name: project.name,
            name,
            ref_name,
            trigger_mode: 'ON_EVERY_PUSH'
        },
        { provider }
    );

    new buddy.actions.Build(
        `run-tests-${name}`,
        {
            project_name: project.name,
            pipeline_id: pipeline.pipeline_id,
            name: 'Run Tests',
            docker_image_name: 'node',
            docker_image_tag: '13',
            trigger_time: 'ON_EVERY_EXECUTION',
            execute_commands: ['cd sdk/nodejs && yarn build', 'cd modules/plugin && yarn test'],
            setup_commands: ['yarn']
        },
        { provider }
    );
}
