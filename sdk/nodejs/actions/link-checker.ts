import { AsInputs } from '@pulumi-utils/sdk';
import { PipelineProps } from '../pipeline';
import { CustomResource, Input, Output, ID, CustomResourceOptions, Inputs } from '@pulumi/pulumi';
import { Cookie, TriggerCondition, Variable } from '../common';

export interface LinkCheckerState {
    project_name: string;
    pipeline_id: number;
    /**
     * The name of the action.
     */
    name: string;

    /**
     * The address of the site to be checked by the validator.
     */
    scan_url: string;

    /**
     * Specifies when the action should be executed. Can be one of `ON_EVERY_EXECUTION`, `ON_FAILURE` or `ON_BACK_TO_SUCCESS`. The default value is `ON_EVERY_EXECUTION`.
     */
    trigger_time: 'ON_EVERY_EXECUTION' | 'ON_FAILURE' | 'ON_BACK_TO_SUCCESS';

    /**
     * The numerical ID of the action, after which this action should be added.
     */
    after_action_id?: number;

    /**
     * The basic auth password value.
     */
    ba_password?: string;

    /**
     * The basic auth username value.
     */
    ba_username?: string;

    /**
     * Check external links. The default is to check internal links only.
     */
    check_external_links?: boolean;

    /**
     * If set to zero, it disables the SSL certificate checking. If set to one, it enables the SSL certificate checking with the provided CA certificate file. If a filename is specified, it will be used as the certificate file.
     */
    check_ssl_certificate?: boolean;

    /**
     * Set the timeout for connection attempts in seconds. The default timeout is 60 seconds.
     */
    connection_timeout?: number;

    /**
     * Set the cookie name/value. Can be given more than once.
     */
    cookies?: Cookie[];

    /**
     * Check recursively all links up to the given depth. A negative depth will enable infinite recursion. The default depth is infinite.
     */
    depth?: number;

    /**
     * When set to 'true' the action is disabled.  By default it is set to 'false'.
     */
    disabled?: boolean;

    /**
     * The HTML form password value.
     */
    html_form_auth_password?: string;

    /**
     * The name attribute of the password input element.
     */
    html_form_auth_password_input_name?: string;

    /**
     * The URL of a login page to be visited before link checking. The page is expected to contain an HTML form to collect credentials and submit them to the address in its action attribute using an HTTP POST request.
     */
    html_form_auth_url?: string;

    /**
     * The HTML form username value.
     */
    html_form_auth_username?: string;

    /**
     * The name attribute of the username input element.
     */
    html_form_auth_username_input_name?: string;

    /**
     * If set to 'true' the execution will proceed, mark action as a warning and jump to the next action. Doesn't apply to deployment actions.
     */
    ignore_errors?: boolean;

    /**
     * Only check the syntax of URLs matching the given regular expressions.
     */
    ignore_urls?: string[];

    /**
     * The regular expression to add more URLs recognized as internal links. The default is that URLs given on the command line are internal.
     */
    internal_links?: string;

    /**
     * Check but do not recurse into URLs matching the given regular expressions.
     */
    no_follow_urls?: string[];

    /**
     * Limit the maximum number of HTTP requests per second to one host. The average number of requests per second is approximately one third of the maximum. Values less than 1 and at least 0.001 can be used. To use values greater than 10, the HTTP server must return a “LinkChecker” response header. The default is 10.
     */
    requests_per_host?: number;

    /**
     * When using HTTP, fetch robots.txt, and confirm whether each URL should be accessed before checking. The default is to use robots.txt files.
     */
    respect_robot_exclusions?: boolean;

    /**
     * Number of retries if the action fails.
     */
    retry_count?: number;

    /**
     * Delay time between auto retries in seconds.
     */
    retry_interval?: number;

    /**
     * When set to 'true', the subsequent action defined in the pipeline will run in parallel to the current action.
     */
    run_next_parallel?: boolean;

    /**
     * Defines whether the action should be executed on each failure. Restricted to and required if the 'trigger_time' is 'ON_FAILURE'.
     */
    run_only_on_first_failure?: boolean;

    /**
     * Generate no more than the given number of threads. The default number of threads is 10. To disable threading specify a non-positive number.
     */
    threads?: number;

    /**
     * The timeout in seconds.
     */
    timeout?: number;

    /**
     * The list of trigger conditions to meet so that the action can be triggered.
     */
    trigger_conditions?: TriggerCondition[];

    /**
     * Specify the User-Agent string to send to the HTTP server, for example `Mozilla/4.0`. The default is `LinkChecker/X.Y` where X.Y is the current version of LinkChecker.
     */
    user_agent?: string;

    /**
     * The list of variables you can use the action.
     */
    variables?: Variable[];

    /**
     * Only check syntax of URLs matching the given regular expressions.
     */
    warning_regex?: string;
}

export type LinkCheckerArgs = AsInputs<LinkCheckerState>;

export interface LinkCheckerProps {
    url: string;
    html_url: string;
    action_id: number;
    name: string;
    scan_url: string;
    trigger_time: 'ON_EVERY_EXECUTION' | 'ON_FAILURE' | 'ON_BACK_TO_SUCCESS';
    type: 'LINK_CHECKER';
    after_action_id?: number;
    ba_password?: string;
    ba_username?: string;
    check_external_links?: boolean;
    check_ssl_certificate?: boolean;
    connection_timeout?: number;
    cookies?: Cookie[];
    depth?: number;
    disabled?: boolean;
    html_form_auth_password?: string;
    html_form_auth_password_input_name?: string;
    html_form_auth_url?: string;
    html_form_auth_username?: string;
    html_form_auth_username_input_name?: string;
    ignore_errors?: boolean;
    ignore_urls?: string[];
    internal_links?: string;
    no_follow_urls?: string[];
    requests_per_host?: number;
    respect_robot_exclusions?: boolean;
    retry_count?: number;
    retry_interval?: number;
    run_next_parallel?: boolean;
    run_only_on_first_failure?: boolean;
    threads?: number;
    timeout?: number;
    trigger_conditions?: TriggerCondition[];
    user_agent?: string;
    variables?: Variable[];
    warning_regex?: string;
    pipeline: PipelineProps;
    project_name: string;
    pipeline_id: number;
}

/**
 * Required scopes in Buddy API: `WORKSPACE`, `EXECUTION_MANAGE`, `EXECUTION_INFO`
 */
export class LinkChecker extends CustomResource {
    static __pulumiType = 'buddy:action:LinkChecker';

    static get(name: string, id: Input<ID>, state?: Partial<LinkCheckerState>, opts?: CustomResourceOptions) {
        return new LinkChecker(name, state as any, { ...opts, id });
    }

    static isInstance(obj: any): obj is LinkChecker {
        if (null == obj) {
            return false;
        }

        return obj['__pulumiType'] === LinkChecker.__pulumiType;
    }

    project_name!: Output<string>;
    pipeline_id!: Output<number>;
    action_id!: Output<number>;
    name!: Output<string>;
    scan_url!: Output<string>;
    trigger_time!: Output<'ON_EVERY_EXECUTION' | 'ON_FAILURE' | 'ON_BACK_TO_SUCCESS'>;
    type!: Output<'LINK_CHECKER'>;
    after_action_id!: Output<number | undefined>;
    ba_password!: Output<string | undefined>;
    ba_username!: Output<string | undefined>;
    check_external_links!: Output<boolean | undefined>;
    check_ssl_certificate!: Output<boolean | undefined>;
    connection_timeout!: Output<number | undefined>;
    cookies!: Output<Cookie[] | undefined>;
    depth!: Output<number | undefined>;
    disabled!: Output<boolean | undefined>;
    html_form_auth_password!: Output<string | undefined>;
    html_form_auth_password_input_name!: Output<string | undefined>;
    html_form_auth_url!: Output<string | undefined>;
    html_form_auth_username!: Output<string | undefined>;
    html_form_auth_username_input_name!: Output<string | undefined>;
    ignore_errors!: Output<boolean | undefined>;
    ignore_urls!: Output<string[] | undefined>;
    internal_links!: Output<string | undefined>;
    no_follow_urls!: Output<string[] | undefined>;
    requests_per_host!: Output<number | undefined>;
    respect_robot_exclusions!: Output<boolean | undefined>;
    retry_count!: Output<number | undefined>;
    retry_interval!: Output<number | undefined>;
    run_next_parallel!: Output<boolean | undefined>;
    run_only_on_first_failure!: Output<boolean | undefined>;
    threads!: Output<number | undefined>;
    timeout!: Output<number | undefined>;
    trigger_conditions!: Output<TriggerCondition[] | undefined>;
    user_agent!: Output<string | undefined>;
    variables!: Output<Variable[] | undefined>;
    warning_regex!: Output<string | undefined>;

    constructor(name: string, argsOrState: LinkCheckerArgs | LinkCheckerState, opts?: CustomResourceOptions) {
        const inputs: Inputs = {};
        if (!opts) {
            opts = {};
        }

        if (opts.id) {
            const state = argsOrState as LinkCheckerState | undefined;
            inputs['project_name'] = state?.project_name;
            inputs['pipeline_id'] = state?.pipeline_id;
            inputs['name'] = state?.name;
            inputs['scan_url'] = state?.scan_url;
            inputs['trigger_time'] = state?.trigger_time;
            inputs['after_action_id'] = state?.after_action_id;
            inputs['ba_password'] = state?.ba_password;
            inputs['ba_username'] = state?.ba_username;
            inputs['check_external_links'] = state?.check_external_links;
            inputs['check_ssl_certificate'] = state?.check_ssl_certificate;
            inputs['connection_timeout'] = state?.connection_timeout;
            inputs['cookies'] = state?.cookies;
            inputs['depth'] = state?.depth;
            inputs['disabled'] = state?.disabled;
            inputs['html_form_auth_password'] = state?.html_form_auth_password;
            inputs['html_form_auth_password_input_name'] = state?.html_form_auth_password_input_name;
            inputs['html_form_auth_url'] = state?.html_form_auth_url;
            inputs['html_form_auth_username'] = state?.html_form_auth_username;
            inputs['html_form_auth_username_input_name'] = state?.html_form_auth_username_input_name;
            inputs['ignore_errors'] = state?.ignore_errors;
            inputs['ignore_urls'] = state?.ignore_urls;
            inputs['internal_links'] = state?.internal_links;
            inputs['no_follow_urls'] = state?.no_follow_urls;
            inputs['requests_per_host'] = state?.requests_per_host;
            inputs['respect_robot_exclusions'] = state?.respect_robot_exclusions;
            inputs['retry_count'] = state?.retry_count;
            inputs['retry_interval'] = state?.retry_interval;
            inputs['run_next_parallel'] = state?.run_next_parallel;
            inputs['run_only_on_first_failure'] = state?.run_only_on_first_failure;
            inputs['threads'] = state?.threads;
            inputs['timeout'] = state?.timeout;
            inputs['trigger_conditions'] = state?.trigger_conditions;
            inputs['user_agent'] = state?.user_agent;
            inputs['variables'] = state?.variables;
            inputs['warning_regex'] = state?.warning_regex;
        } else {
            const args = argsOrState as LinkCheckerArgs | undefined;
            if (!args?.project_name) {
                throw new Error('Missing required property "project_name"');
            }

            if (!args?.pipeline_id) {
                throw new Error('Missing required property "pipeline_id"');
            }

            if (!args?.name) {
                throw new Error('Missing required property "name"');
            }

            if (!args?.scan_url) {
                throw new Error('Missing required property "scan_url"');
            }

            if (!args?.trigger_time) {
                throw new Error('Missing required property "trigger_time"');
            }

            inputs['name'] = args.name;
            inputs['scan_url'] = args.scan_url;
            inputs['trigger_time'] = args.trigger_time;
            inputs['after_action_id'] = args.after_action_id;
            inputs['ba_password'] = args.ba_password;
            inputs['ba_username'] = args.ba_username;
            inputs['check_external_links'] = args.check_external_links;
            inputs['check_ssl_certificate'] = args.check_ssl_certificate;
            inputs['connection_timeout'] = args.connection_timeout;
            inputs['cookies'] = args.cookies;
            inputs['depth'] = args.depth;
            inputs['disabled'] = args.disabled;
            inputs['html_form_auth_password'] = args.html_form_auth_password;
            inputs['html_form_auth_password_input_name'] = args.html_form_auth_password_input_name;
            inputs['html_form_auth_url'] = args.html_form_auth_url;
            inputs['html_form_auth_username'] = args.html_form_auth_username;
            inputs['html_form_auth_username_input_name'] = args.html_form_auth_username_input_name;
            inputs['ignore_errors'] = args.ignore_errors;
            inputs['ignore_urls'] = args.ignore_urls;
            inputs['internal_links'] = args.internal_links;
            inputs['no_follow_urls'] = args.no_follow_urls;
            inputs['requests_per_host'] = args.requests_per_host;
            inputs['respect_robot_exclusions'] = args.respect_robot_exclusions;
            inputs['retry_count'] = args.retry_count;
            inputs['retry_interval'] = args.retry_interval;
            inputs['run_next_parallel'] = args.run_next_parallel;
            inputs['run_only_on_first_failure'] = args.run_only_on_first_failure;
            inputs['threads'] = args.threads;
            inputs['timeout'] = args.timeout;
            inputs['trigger_conditions'] = args.trigger_conditions;
            inputs['user_agent'] = args.user_agent;
            inputs['variables'] = args.variables;
            inputs['warning_regex'] = args.warning_regex;
            inputs['project_name'] = args.project_name;
            inputs['pipeline_id'] = args.pipeline_id;
        }

        if (!opts.version) {
            opts.version = require('../package').version;
        }

        if (null == opts.deleteBeforeReplace) {
            opts.deleteBeforeReplace = true;
        }

        opts.ignoreChanges = ['project_name', 'pipeline_id', ...(opts.ignoreChanges || [])];

        inputs['type'] = 'LINK_CHECKER';
        inputs['url'] = undefined;
        inputs['html_url'] = undefined;
        inputs['action_id'] = undefined;

        super(LinkChecker.__pulumiType, name, inputs, opts);
    }
}
