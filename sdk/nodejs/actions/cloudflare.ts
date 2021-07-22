import { AsInputs } from '@pulumi-utils/sdk';
import { PipelineProps } from '../pipeline';
import { CustomResource, Input, Output, ID, CustomResourceOptions, Inputs, output } from '@pulumi/pulumi';
import { IntegrationRef, TriggerCondition, Variable } from '../common';
import { Integration } from '../integration';

export interface CloudflareState {
    project_name: string;
    pipeline_id: number;
    /**
     * The integration.
     */
    integration: IntegrationRef | Integration;

    /**
     * The name of the action.
     */
    name: string;

    /**
     * The ID of the Cloudflare zone.
     */
    zone_id: string;

    /**
     * The URL address to the desired site.
     */
    base_url?: string;

    /**
     * The paths and/or files that will be left out during the deployment.
     */
    deployment_excludes?: string[];

    /**
     * The exceptions from the ignore patterns set in `deployment_excludes`.
     */
    deployment_includes?: string[];

    /**
     * When set to `true` the action is disabled.  By default it is set to `false`.
     */
    disabled?: boolean;

    /**
     * If set to `true` the execution will proceed, mark action as a warning and jump to the next action. Doesn't apply to deployment actions.
     */
    ignore_errors?: boolean;

    /**
     * Defines whether the files are deployed from the repository or from the build filesystem. Can be one of `SCM_REPOSITORY` or `BUILD_ARTIFACTS`.
     */
    input_type?: 'SCM_REPOSITORY' | 'BUILD_ARTIFACTS';

    /**
     * The path in the repository.
     */
    local_path?: string;

    /**
     * Specifies whether or not the whole cache should be removed.
     */
    purge_all?: boolean;

    /**
     * Number of retries if the action fails.
     */
    retry_count?: number;

    /**
     * Delay time between auto retries in minutes.
     */
    retry_delay?: number;

    /**
     * When set to `true`, the subsequent action defined in the pipeline will run in parallel to the current action.
     */
    run_next_parallel?: boolean;

    /**
     * Defines whether the action should be executed on each failure. Restricted to and required if the `trigger_time` is `ON_FAILURE`.
     */
    run_only_on_first_failure?: boolean;

    /**
     * The timeout in seconds.
     */
    timeout?: number;

    /**
     * The list of trigger conditions to meet so that the action can be triggered.
     */
    trigger_conditions?: TriggerCondition[];

    /**
     * The list of variables you can use the action.
     */
    variables?: Variable[];
}

export type CloudflareArgs = AsInputs<CloudflareState>;

export interface CloudflareProps {
    url: string;
    html_url: string;
    action_id: number;
    integration: IntegrationRef | Integration;
    name: string;
    type: 'CLOUDFLARE';
    zone_id: string;
    base_url?: string;
    deployment_excludes?: string[];
    deployment_includes?: string[];
    disabled?: boolean;
    ignore_errors?: boolean;
    input_type?: 'SCM_REPOSITORY' | 'BUILD_ARTIFACTS';
    local_path?: string;
    purge_all?: boolean;
    retry_count?: number;
    retry_delay?: number;
    run_next_parallel?: boolean;
    run_only_on_first_failure?: boolean;
    timeout?: number;
    trigger_conditions?: TriggerCondition[];
    variables?: Variable[];
    pipeline: PipelineProps;
    project_name: string;
    pipeline_id: number;
}

/**
 * Required scopes in Buddy API: `WORKSPACE`, `EXECUTION_MANAGE`, `EXECUTION_INFO`
 */
export class Cloudflare extends CustomResource {
    static __pulumiType = 'buddy:action:Cloudflare';

    static get(name: string, id: Input<ID>, state?: Partial<CloudflareState>, opts?: CustomResourceOptions) {
        return new Cloudflare(name, state as any, { ...opts, id });
    }

    static isInstance(obj: any): obj is Cloudflare {
        if (null == obj) {
            return false;
        }

        return obj['__pulumiType'] === Cloudflare.__pulumiType;
    }

    project_name!: Output<string>;
    pipeline_id!: Output<number>;
    action_id!: Output<number>;
    integration!: Output<IntegrationRef | Integration>;
    name!: Output<string>;
    type!: Output<'CLOUDFLARE'>;
    zone_id!: Output<string>;
    base_url!: Output<string | undefined>;
    deployment_excludes!: Output<string[] | undefined>;
    deployment_includes!: Output<string[] | undefined>;
    disabled!: Output<boolean | undefined>;
    ignore_errors!: Output<boolean | undefined>;
    input_type!: Output<'SCM_REPOSITORY' | 'BUILD_ARTIFACTS' | undefined>;
    local_path!: Output<string | undefined>;
    purge_all!: Output<boolean | undefined>;
    retry_count!: Output<number | undefined>;
    retry_delay!: Output<number | undefined>;
    run_next_parallel!: Output<boolean | undefined>;
    run_only_on_first_failure!: Output<boolean | undefined>;
    timeout!: Output<number | undefined>;
    trigger_conditions!: Output<TriggerCondition[] | undefined>;
    variables!: Output<Variable[] | undefined>;

    constructor(name: string, argsOrState: CloudflareArgs | CloudflareState, opts?: CustomResourceOptions) {
        const inputs: Inputs = {};
        if (!opts) {
            opts = {};
        }

        if (opts.id) {
            const state = argsOrState as CloudflareState | undefined;
            inputs['project_name'] = state?.project_name;
            inputs['pipeline_id'] = state?.pipeline_id;
            inputs['integration'] = state?.integration instanceof Integration ? { hash_id: state.integration.hash_id } : state?.integration;
            inputs['name'] = state?.name;
            inputs['zone_id'] = state?.zone_id;
            inputs['base_url'] = state?.base_url;
            inputs['deployment_excludes'] = state?.deployment_excludes;
            inputs['deployment_includes'] = state?.deployment_includes;
            inputs['disabled'] = state?.disabled;
            inputs['ignore_errors'] = state?.ignore_errors;
            inputs['input_type'] = state?.input_type;
            inputs['local_path'] = state?.local_path;
            inputs['purge_all'] = state?.purge_all;
            inputs['retry_count'] = state?.retry_count;
            inputs['retry_delay'] = state?.retry_delay;
            inputs['run_next_parallel'] = state?.run_next_parallel;
            inputs['run_only_on_first_failure'] = state?.run_only_on_first_failure;
            inputs['timeout'] = state?.timeout;
            inputs['trigger_conditions'] = state?.trigger_conditions;
            inputs['variables'] = state?.variables;
        } else {
            const args = argsOrState as CloudflareArgs | undefined;
            if (!args?.project_name) {
                throw new Error('Missing required property "project_name"');
            }

            if (!args?.pipeline_id) {
                throw new Error('Missing required property "pipeline_id"');
            }

            if (!args?.integration) {
                throw new Error('Missing required property "integration"');
            }

            if (!args?.name) {
                throw new Error('Missing required property "name"');
            }

            if (!args?.zone_id) {
                throw new Error('Missing required property "zone_id"');
            }

            inputs['integration'] = output(args.integration as Output<IntegrationRef | Integration>).apply(integration =>
                integration instanceof Integration ? { hash_id: integration.hash_id } : integration
            );
            inputs['name'] = args.name;
            inputs['zone_id'] = args.zone_id;
            inputs['base_url'] = args.base_url;
            inputs['deployment_excludes'] = args.deployment_excludes;
            inputs['deployment_includes'] = args.deployment_includes;
            inputs['disabled'] = args.disabled;
            inputs['ignore_errors'] = args.ignore_errors;
            inputs['input_type'] = args.input_type;
            inputs['local_path'] = args.local_path;
            inputs['purge_all'] = args.purge_all;
            inputs['retry_count'] = args.retry_count;
            inputs['retry_delay'] = args.retry_delay;
            inputs['run_next_parallel'] = args.run_next_parallel;
            inputs['run_only_on_first_failure'] = args.run_only_on_first_failure;
            inputs['timeout'] = args.timeout;
            inputs['trigger_conditions'] = args.trigger_conditions;
            inputs['variables'] = args.variables;
            inputs['project_name'] = args.project_name;
            inputs['pipeline_id'] = args.pipeline_id;
        }

        if (!opts.version) {
            opts.version = require('../package').version;
        }

        opts.ignoreChanges = ['project_name', 'pipeline_id', ...(opts.ignoreChanges || [])];

        inputs['type'] = 'CLOUDFLARE';
        inputs['url'] = undefined;
        inputs['html_url'] = undefined;
        inputs['action_id'] = undefined;

        super(Cloudflare.__pulumiType, name, inputs, opts);
    }
}
