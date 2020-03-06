import { AsInputs } from '../utils';
import { PipelineProps } from '../pipeline';
import { CustomResource, Input, Output, ID, CustomResourceOptions, Inputs } from '@pulumi/pulumi';
import { IntegrationRef, Variable } from '../common';

export interface ActionAmazonS3State {
    project_name: string;
    pipeline_id: number;
    /**
     * The name of the Amazon S3 Bucket.
     */
    bucket_name: string;

    /**
     * The integration.
     */
    integration: IntegrationRef;

    /**
     * The name of the action.
     */
    name: string;

    /**
     * Access control lists (ACLs) enable you to manage access to buckets and objects. It defines which AWS accounts or groups are granted access and the type of access. Can be one of `PRIVATE` , `PUBLIC_READ`, `AWS-EXEC-READ`, `AUTHENTICATED_READ`, `BUCKET_ONWER_READ`, `BUCKET_OWNER_FULL_CONTROL` or `LOG_DELIVERY_WRITE`.
     */
    acl?:
        | 'PRIVATE'
        | 'PUBLIC_READ'
        | 'AWS-EXEC-READ'
        | 'AUTHENTICATED_READ'
        | 'BUCKET_ONWER_READ'
        | 'BUCKET_OWNER_FULL_CONTROL'
        | 'LOG_DELIVERY_WRITE';

    /**
     * The numerical ID of the action, after which this action should be added.
     */
    after_action_id?: number;

    /**
     * Specifies how long objects stay in the cache.
     */
    cache_control?: string;

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
     * Specifies the expiration period for the objects (how long they stay in the cache).
     */
    expires_date?: string;

    /**
     * Defines whether the files are deployed from the repository or from the build filesystem. Can be one of `SCM_REPOSITORY` or `BUILD_ARTIFACTS`.
     */
    input_type?: 'SCM_REPOSITORY' | 'BUILD_ARTIFACTS';

    /**
     * The path in the repository.
     */
    local_path?: string;

    /**
     * Set to `true` if you want to use Reduced Redundancy Storage
     */
    reduced_redundancy?: boolean;

    /**
     * The absolute or relative path on the remote server.
     */
    remote_path?: string;

    /**
     * When set to `true`, the subsequent action defined in the pipeline will run in parallel to the current action.
     */
    run_next_parallel?: boolean;

    /**
     * Defines whether the action should be executed on each failure. Restricted to and required if the `trigger_time` is `ON_FAILURE`.
     */
    run_only_on_first_failure?: boolean;

    /**
     * When set to `true` all files will have their mime-types set to `application/octet-stream`.
     */
    skip_content_type_setting?: boolean;

    /**
     * The timeout in seconds.
     */
    timeout?: number;

    /**
     * Defines when the build action should be run. Can be one of `ALWAYS`, `ON_CHANGE`, `ON_CHANGE_AT_PATH`, `VAR_IS`, `VAR_IS_NOT` or `VAR_CONTAINS` or `VAR_NOT_CONTAINS`. Can't be used in deployment actions.
     */
    trigger_condition?: 'ALWAYS' | 'ON_CHANGE' | 'ON_CHANGE_AT_PATH' | 'VAR_IS' | 'VAR_IS_NOT' | 'VAR_CONTAINS';

    /**
     * Required when `trigger_condition` is set to `ON_CHANGE_AT_PATH`.
     */
    trigger_condition_paths?: string[];

    /**
     * Specifies when the action should be executed. Can be one of `ON_EVERY_EXECUTION`, `ON_FAILURE` or `ON_BACK_TO_SUCCESS`. The default value is `ON_EVERY_EXECUTION`.
     */
    trigger_time?: 'ON_EVERY_EXECUTION' | 'ON_FAILURE' | 'ON_BACK_TO_SUCCESS';

    /**
     * Required when `trigger_condition` is set to `VAR_IS`, `VAR_IS_NOT` or `VAR_CONTAINS` or `VAR_NOT_CONTAINS`. Defines the name of the desired variable.
     */
    trigger_variable_key?: string;

    /**
     * Required when `trigger_condition` is set to `VAR_IS`, `VAR_IS_NOT` or `VAR_CONTAINS`. Defines the value of the desired variable which will be compared with its current value.
     */
    trigger_variable_value?: string;

    /**
     * The list of variables you can use the action.
     */
    variables?: Variable[];
}

export type ActionAmazonS3Args = AsInputs<ActionAmazonS3State>;

export interface ActionAmazonS3Props {
    url: string;
    html_url: string;
    action_id: number;
    bucket_name: string;
    integration: IntegrationRef;
    name: string;
    type: 'AMAZON_S3';
    acl?:
        | 'PRIVATE'
        | 'PUBLIC_READ'
        | 'AWS-EXEC-READ'
        | 'AUTHENTICATED_READ'
        | 'BUCKET_ONWER_READ'
        | 'BUCKET_OWNER_FULL_CONTROL'
        | 'LOG_DELIVERY_WRITE';
    after_action_id?: number;
    cache_control?: string;
    deployment_excludes?: string[];
    deployment_includes?: string[];
    disabled?: boolean;
    expires_date?: string;
    input_type?: 'SCM_REPOSITORY' | 'BUILD_ARTIFACTS';
    local_path?: string;
    reduced_redundancy?: boolean;
    remote_path?: string;
    run_next_parallel?: boolean;
    run_only_on_first_failure?: boolean;
    skip_content_type_setting?: boolean;
    timeout?: number;
    trigger_condition?: 'ALWAYS' | 'ON_CHANGE' | 'ON_CHANGE_AT_PATH' | 'VAR_IS' | 'VAR_IS_NOT' | 'VAR_CONTAINS';
    trigger_condition_paths?: string[];
    trigger_time?: 'ON_EVERY_EXECUTION' | 'ON_FAILURE' | 'ON_BACK_TO_SUCCESS';
    trigger_variable_key?: string;
    trigger_variable_value?: string;
    variables?: Variable[];
    pipeline: PipelineProps;
    project_name: string;
    pipeline_id: number;
}

/**
 * Required scopes in Buddy API: `WORKSPACE`, `EXECUTION_MANAGE`, `EXECUTION_INFO`
 */
export class AmazonS3 extends CustomResource {
    static __pulumiType = 'buddy:action:AmazonS3';

    static get(name: string, id: Input<ID>, state?: Partial<ActionAmazonS3State>, opts?: CustomResourceOptions) {
        return new AmazonS3(name, state as any, { ...opts, id });
    }

    static isInstance(obj: any): obj is AmazonS3 {
        if (null == obj) {
            return false;
        }

        return obj['__pulumiType'] === AmazonS3.__pulumiType;
    }

    project_name!: Output<string>;
    pipeline_id!: Output<number>;
    action_id!: Output<number>;
    bucket_name!: Output<string>;
    integration!: Output<IntegrationRef>;
    name!: Output<string>;
    type!: Output<'AMAZON_S3'>;
    acl!: Output<
        | 'PRIVATE'
        | 'PUBLIC_READ'
        | 'AWS-EXEC-READ'
        | 'AUTHENTICATED_READ'
        | 'BUCKET_ONWER_READ'
        | 'BUCKET_OWNER_FULL_CONTROL'
        | 'LOG_DELIVERY_WRITE'
        | undefined
    >;
    after_action_id!: Output<number | undefined>;
    cache_control!: Output<string | undefined>;
    deployment_excludes!: Output<string[] | undefined>;
    deployment_includes!: Output<string[] | undefined>;
    disabled!: Output<boolean | undefined>;
    expires_date!: Output<string | undefined>;
    input_type!: Output<'SCM_REPOSITORY' | 'BUILD_ARTIFACTS' | undefined>;
    local_path!: Output<string | undefined>;
    reduced_redundancy!: Output<boolean | undefined>;
    remote_path!: Output<string | undefined>;
    run_next_parallel!: Output<boolean | undefined>;
    run_only_on_first_failure!: Output<boolean | undefined>;
    skip_content_type_setting!: Output<boolean | undefined>;
    timeout!: Output<number | undefined>;
    trigger_condition!: Output<'ALWAYS' | 'ON_CHANGE' | 'ON_CHANGE_AT_PATH' | 'VAR_IS' | 'VAR_IS_NOT' | 'VAR_CONTAINS' | undefined>;
    trigger_condition_paths!: Output<string[] | undefined>;
    trigger_time!: Output<'ON_EVERY_EXECUTION' | 'ON_FAILURE' | 'ON_BACK_TO_SUCCESS' | undefined>;
    trigger_variable_key!: Output<string | undefined>;
    trigger_variable_value!: Output<string | undefined>;
    variables!: Output<Variable[] | undefined>;

    constructor(name: string, argsOrState: ActionAmazonS3Args | ActionAmazonS3State, opts?: CustomResourceOptions) {
        const inputs: Inputs = {};
        if (!opts) {
            opts = {};
        }

        if (opts.id) {
            const state = argsOrState as ActionAmazonS3State | undefined;
            inputs['project_name'] = state?.project_name;
            inputs['pipeline_id'] = state?.pipeline_id;
            inputs['bucket_name'] = state?.bucket_name;
            inputs['integration'] = state?.integration;
            inputs['name'] = state?.name;
            inputs['acl'] = state?.acl;
            inputs['after_action_id'] = state?.after_action_id;
            inputs['cache_control'] = state?.cache_control;
            inputs['deployment_excludes'] = state?.deployment_excludes;
            inputs['deployment_includes'] = state?.deployment_includes;
            inputs['disabled'] = state?.disabled;
            inputs['expires_date'] = state?.expires_date;
            inputs['input_type'] = state?.input_type;
            inputs['local_path'] = state?.local_path;
            inputs['reduced_redundancy'] = state?.reduced_redundancy;
            inputs['remote_path'] = state?.remote_path;
            inputs['run_next_parallel'] = state?.run_next_parallel;
            inputs['run_only_on_first_failure'] = state?.run_only_on_first_failure;
            inputs['skip_content_type_setting'] = state?.skip_content_type_setting;
            inputs['timeout'] = state?.timeout;
            inputs['trigger_condition'] = state?.trigger_condition;
            inputs['trigger_condition_paths'] = state?.trigger_condition_paths;
            inputs['trigger_time'] = state?.trigger_time;
            inputs['trigger_variable_key'] = state?.trigger_variable_key;
            inputs['trigger_variable_value'] = state?.trigger_variable_value;
            inputs['variables'] = state?.variables;
        } else {
            const args = argsOrState as ActionAmazonS3Args | undefined;
            if (!args?.project_name) {
                throw new Error('Missing required property "project_name"');
            }

            if (!args?.pipeline_id) {
                throw new Error('Missing required property "pipeline_id"');
            }

            if (!args?.bucket_name) {
                throw new Error('Missing required property "bucket_name"');
            }

            if (!args?.integration) {
                throw new Error('Missing required property "integration"');
            }

            if (!args?.name) {
                throw new Error('Missing required property "name"');
            }

            inputs['bucket_name'] = args.bucket_name;
            inputs['integration'] = args.integration;
            inputs['name'] = args.name;
            inputs['acl'] = args.acl;
            inputs['after_action_id'] = args.after_action_id;
            inputs['cache_control'] = args.cache_control;
            inputs['deployment_excludes'] = args.deployment_excludes;
            inputs['deployment_includes'] = args.deployment_includes;
            inputs['disabled'] = args.disabled;
            inputs['expires_date'] = args.expires_date;
            inputs['input_type'] = args.input_type;
            inputs['local_path'] = args.local_path;
            inputs['reduced_redundancy'] = args.reduced_redundancy;
            inputs['remote_path'] = args.remote_path;
            inputs['run_next_parallel'] = args.run_next_parallel;
            inputs['run_only_on_first_failure'] = args.run_only_on_first_failure;
            inputs['skip_content_type_setting'] = args.skip_content_type_setting;
            inputs['timeout'] = args.timeout;
            inputs['trigger_condition'] = args.trigger_condition;
            inputs['trigger_condition_paths'] = args.trigger_condition_paths;
            inputs['trigger_time'] = args.trigger_time;
            inputs['trigger_variable_key'] = args.trigger_variable_key;
            inputs['trigger_variable_value'] = args.trigger_variable_value;
            inputs['variables'] = args.variables;
            inputs['project_name'] = args.project_name;
            inputs['pipeline_id'] = args.pipeline_id;
        }

        if (!opts.version) {
            opts.version = require('../package').version;
        }

        opts.ignoreChanges = ['project_name', 'pipeline_id', ...(opts.ignoreChanges || [])];

        inputs['type'] = 'AMAZON_S3';
        inputs['url'] = undefined;
        inputs['html_url'] = undefined;
        inputs['action_id'] = undefined;

        super(AmazonS3.__pulumiType, name, inputs, opts);
    }
}
