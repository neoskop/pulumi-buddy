import * as pulumi from '@pulumi/pulumi';
import * as buddy from '@neoskop/pulumi-buddy';

export interface BuildPipelineArgs {
    project_name: pulumi.Input<string>;
    pipeline: Omit<buddy.PipelineArgs, 'project_name'>;
    integrations: {
        slack: buddy.AsInputs<buddy.IntegrationRef>;
    };
}

export class BuildPipeline extends pulumi.ComponentResource {
    readonly pipeline: buddy.Pipeline;

    readonly actions: Record<'test' | 'build' | 'onSuccess' | 'onError', buddy.actions.Action>;

    constructor(name: string, args: BuildPipelineArgs, opts?: pulumi.CustomResourceOptions) {
        super('buddy:examples:BuildPipeline', name, {}, opts);

        this.pipeline = new buddy.Pipeline(`${name}-pipeline`, {
            project_name: args.project_name,
            ...args.pipeline
        });

        this.actions = {} as any;
        this.actions.test = new buddy.actions.Build(`${name}-tests`, {
            project_name: args.project_name,
            pipeline_id: this.pipeline.pipeline_id,
            name: 'Run Tests',
            docker_image_name: 'node',
            docker_image_tag: '13',
            trigger_time: 'ON_EVERY_EXECUTION',
            execute_commands: ['yarn', '(cd modules/plugin && yarn test)']
        });
        this.actions.build = new buddy.actions.Build(`${name}-build`, {
            project_name: args.project_name,
            pipeline_id: this.pipeline.pipeline_id,
            name: 'Run Build',
            docker_image_name: 'node',
            docker_image_tag: '13',
            trigger_time: 'ON_EVERY_EXECUTION',
            execute_commands: ['yarn', '(cd modules/plugin && yarn build && yarn bundle)'],
            after_action_id: this.actions.test.action_id
        });
        this.actions.onSuccess = new buddy.actions.SlackNotification(`${name}-success`, {
            project_name: args.project_name,
            pipeline_id: this.pipeline.pipeline_id,
            name: 'On Success',
            trigger_time: 'ON_EVERY_EXECUTION',
            integration: args.integrations.slack,
            channel: 'devops',
            content: '✔️ ${BUDDY_PIPELINE_NAME} successful!',
            after_action_id: this.actions.build.action_id
        });
        this.actions.onError = new buddy.actions.SlackNotification(`${name}-error`, {
            project_name: args.project_name,
            pipeline_id: this.pipeline.pipeline_id,
            name: 'On Error',
            trigger_time: 'ON_FAILURE',
            integration: args.integrations.slack,
            channel: 'devops',
            content: '❌ ${BUDDY_PIPELINE_NAME} failed!'
        });
    }
}

const github = buddy.Integration.findByType('github', 'GIT_HUB');
const slack = buddy.Integration.findByType('slack', 'SLACK');

const project = new buddy.Project('pulumi-buddy', {
    display_name: '@neoskop/pulumi-buddy',
    external_project_id: 'neoskop/pulumi-buddy',
    integration: { hash_id: github.hash_id }
});

new BuildPipeline('pulumi-buddy-master', {
    project_name: project.name,
    pipeline: {
        name: 'Master',
        ref_name: 'master',
        trigger_mode: 'ON_EVERY_PUSH'
    },
    integrations: {
        slack: {
            hash_id: slack.hash_id
        }
    }
});
