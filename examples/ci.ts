import * as buddy from 'pulumi-buddy';

const github = buddy.Integration.findByType('github', 'GIT_HUB');

const project = new buddy.Project('pulumi-buddy', {
    display_name: 'pulumi-buddy',
    external_project_id: 'neoskop/pulumi-buddy',
    integration: { hash_id: github.hash_id }
});

for (const [name, ref_name] of [
    ['Develop', 'develop'],
    ['Master', 'master']
]) {
    const pipeline = new buddy.Pipeline(name, {
        project_name: project.name,
        name,
        ref_name,
        trigger_mode: 'ON_EVERY_PUSH'
    });

    new buddy.actions.Build(`run-tests-${name}`, {
        project_name: project.name,
        pipeline_id: pipeline.pipeline_id,
        name: 'Run Tests',
        docker_image_name: 'node',
        docker_image_tag: '13',
        trigger_time: 'ON_EVERY_EXECUTION',
        execute_commands: ['yarn', '(cd sdk/nodejs && yarn build)', '(cd modules/plugin && yarn test)']
    });
}
