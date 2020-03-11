import { ActionAmazonS3State, ActionAmazonS3Props, ActionAmazonS3Args, AmazonS3 } from './amazon-s3';
import { ActionAWSCLIState, ActionAWSCLIProps, ActionAWSCLIArgs, AWSCLI } from './aws-cli';
import { ActionAWSECSState, ActionAWSECSProps, ActionAWSECSArgs, AWSECS } from './aws-ecs';
import { ActionAWSLambdaDeployState, ActionAWSLambdaDeployProps, ActionAWSLambdaDeployArgs, AWSLambdaDeploy } from './aws-lambda-deploy';
import { ActionAWSLambdaState, ActionAWSLambdaProps, ActionAWSLambdaArgs, AWSLambda } from './aws-lambda';
import { ActionAzureState, ActionAzureProps, ActionAzureArgs, Azure } from './azure';
import { ActionBugsnagState, ActionBugsnagProps, ActionBugsnagArgs, Bugsnag } from './bugsnag';
import { ActionBuildAndroidAppState, ActionBuildAndroidAppProps, ActionBuildAndroidAppArgs, BuildAndroidApp } from './build-android-app';
import { ActionBuildDockerfileState, ActionBuildDockerfileProps, ActionBuildDockerfileArgs, BuildDockerfile } from './build-dockerfile';
import { ActionBuildFlutterAppState, ActionBuildFlutterAppProps, ActionBuildFlutterAppArgs, BuildFlutterApp } from './build-flutter-app';
import { ActionBuildState, ActionBuildProps, ActionBuildArgs, Build } from './build';
import { ActionCloudflareState, ActionCloudflareProps, ActionCloudflareArgs, Cloudflare } from './cloudflare';
import { ActionCloudFrontState, ActionCloudFrontProps, ActionCloudFrontArgs, CloudFront } from './cloudfront';
import { ActionCodeDeployState, ActionCodeDeployProps, ActionCodeDeployArgs, CodeDeploy } from './codedeploy';
import { ActionCompressImagesState, ActionCompressImagesProps, ActionCompressImagesArgs, CompressImages } from './compress-images';
import {
    ActionCopyFilesFromAnotherPipelineState,
    ActionCopyFilesFromAnotherPipelineProps,
    ActionCopyFilesFromAnotherPipelineArgs,
    CopyFilesFromAnotherPipeline
} from './copy-files-from-another-pipeline';
import {
    ActionDatadogNotificationState,
    ActionDatadogNotificationProps,
    ActionDatadogNotificationArgs,
    DatadogNotification
} from './datadog-notification';
import {
    ActionDatadogServiceCheckState,
    ActionDatadogServiceCheckProps,
    ActionDatadogServiceCheckArgs,
    DatadogServiceCheck
} from './datadog-service-check';
import { ActionDigitalOceanCDNState, ActionDigitalOceanCDNProps, ActionDigitalOceanCDNArgs, DigitalOceanCDN } from './digitalocean-cdn';
import {
    ActionDigitalOceanSpacesState,
    ActionDigitalOceanSpacesProps,
    ActionDigitalOceanSpacesArgs,
    DigitalOceanSpaces
} from './digitalocean-spaces';
import { ActionDigitalOceanState, ActionDigitalOceanProps, ActionDigitalOceanArgs, DigitalOcean } from './digitalocean';
import {
    ActionDiscordNotificationState,
    ActionDiscordNotificationProps,
    ActionDiscordNotificationArgs,
    DiscordNotification
} from './discord-notification';
import {
    ActionDockerfileLinterState,
    ActionDockerfileLinterProps,
    ActionDockerfileLinterArgs,
    DockerfileLinter
} from './dockerfile-linter';
import { ActionDownloadFTPState, ActionDownloadFTPProps, ActionDownloadFTPArgs, DownloadFTP } from './download-ftp';
import { ActionDownloadS3State, ActionDownloadS3Props, ActionDownloadS3Args, DownloadS3 } from './download-s3';
import { ActionDownloadSFTPState, ActionDownloadSFTPProps, ActionDownloadSFTPArgs, DownloadSFTP } from './download-sftp';
import {
    ActionElasticBeanstalkMonitorState,
    ActionElasticBeanstalkMonitorProps,
    ActionElasticBeanstalkMonitorArgs,
    ElasticBeanstalkMonitor
} from './elastic-beanstalk-monitor';
import {
    ActionElasticBeanstalkState,
    ActionElasticBeanstalkProps,
    ActionElasticBeanstalkArgs,
    ElasticBeanstalk
} from './elastic-beanstalk';
import {
    ActionEmailNotificationState,
    ActionEmailNotificationProps,
    ActionEmailNotificationArgs,
    EmailNotification
} from './email-notification';
import { ActionEslintState, ActionEslintProps, ActionEslintArgs, Eslint } from './eslint';
import { ActionFirebaseState, ActionFirebaseProps, ActionFirebaseArgs, Firebase } from './firebase';
import { ActionFTPState, ActionFTPProps, ActionFTPArgs, FTP } from './ftp';
import { ActionFTPSState, ActionFTPSProps, ActionFTPSArgs, FTPS } from './ftps';
import { ActionGCloudCLIState, ActionGCloudCLIProps, ActionGCloudCLIArgs, GCloudCLI } from './gcloud-cli';
import { ActionGhostInspectorState, ActionGhostInspectorProps, ActionGhostInspectorArgs, GhostInspector } from './ghost-inspector';
import { ActionGitPushState, ActionGitPushProps, ActionGitPushArgs, GitPush } from './git-push';
import { ActionGitcryptLockState, ActionGitcryptLockProps, ActionGitcryptLockArgs, GitcryptLock } from './gitcrypt-lock';
import { ActionGitcryptUnlockState, ActionGitcryptUnlockProps, ActionGitcryptUnlockArgs, GitcryptUnlock } from './gitcrypt-unlock';
import {
    ActionGKEApplyDeploymentState,
    ActionGKEApplyDeploymentProps,
    ActionGKEApplyDeploymentArgs,
    GKEApplyDeployment
} from './gke-apply-deployment';
import { ActionGKEKubectlState, ActionGKEKubectlProps, ActionGKEKubectlArgs, GKEKubectl } from './gke-kubectl';
import { ActionGKERunJobState, ActionGKERunJobProps, ActionGKERunJobArgs, GKERunJob } from './gke-run-job';
import { ActionGKERunPodState, ActionGKERunPodProps, ActionGKERunPodArgs, GKERunPod } from './gke-run-pod';
import { ActionGKESetImageState, ActionGKESetImageProps, ActionGKESetImageArgs, GKESetImage } from './gke-set-image';
import { ActionGoogleAppEngineState, ActionGoogleAppEngineProps, ActionGoogleAppEngineArgs, GoogleAppEngine } from './google-app-engine';
import { ActionGoogleCDNState, ActionGoogleCDNProps, ActionGoogleCDNArgs, GoogleCDN } from './google-cdn';
import {
    ActionGoogleCloudStorageState,
    ActionGoogleCloudStorageProps,
    ActionGoogleCloudStorageArgs,
    GoogleCloudStorage
} from './google-cloud-storage';
import {
    ActionGoogleComputeEngineState,
    ActionGoogleComputeEngineProps,
    ActionGoogleComputeEngineArgs,
    GoogleComputeEngine
} from './google-compute-engine';
import {
    ActionGoogleFunctionsDeployState,
    ActionGoogleFunctionsDeployProps,
    ActionGoogleFunctionsDeployArgs,
    GoogleFunctionsDeploy
} from './google-functions-deploy';
import { ActionHerokuCLIState, ActionHerokuCLIProps, ActionHerokuCLIArgs, HerokuCLI } from './heroku-cli';
import { ActionHerokuState, ActionHerokuProps, ActionHerokuArgs, Heroku } from './heroku';
import { ActionHoneybadgerState, ActionHoneybadgerProps, ActionHoneybadgerArgs, Honeybadger } from './honeybadger';
import { ActionHTTPRequestState, ActionHTTPRequestProps, ActionHTTPRequestArgs, HTTPRequest } from './http-request';
import {
    ActionKubernetesApplyDeploymentConfigurationState,
    ActionKubernetesApplyDeploymentConfigurationProps,
    ActionKubernetesApplyDeploymentConfigurationArgs,
    KubernetesApplyDeploymentConfiguration
} from './kubernetes-apply-deployment-configuration';
import {
    ActionKubernetesKubectlState,
    ActionKubernetesKubectlProps,
    ActionKubernetesKubectlArgs,
    KubernetesKubectl
} from './kubernetes-kubectl';
import {
    ActionKubernetesRunHelmCMDsState,
    ActionKubernetesRunHelmCMDsProps,
    ActionKubernetesRunHelmCMDsArgs,
    KubernetesRunHelmCMDs
} from './kubernetes-run-helm-cmds';
import {
    ActionKubernetesRunPodState,
    ActionKubernetesRunPodProps,
    ActionKubernetesRunPodArgs,
    KubernetesRunPod
} from './kubernetes-run-pod';
import {
    ActionKubernetesSetImageState,
    ActionKubernetesSetImageProps,
    ActionKubernetesSetImageArgs,
    KubernetesSetImage
} from './kubernetes-set-image';
import { ActionLighthouseState, ActionLighthouseProps, ActionLighthouseArgs, Lighthouse } from './lighthouse';
import { ActionLogglyState, ActionLogglyProps, ActionLogglyArgs, Loggly } from './loggly';
import { ActionNetlifyState, ActionNetlifyProps, ActionNetlifyArgs, Netlify } from './netlify';
import {
    ActionNewRelicNotificationState,
    ActionNewRelicNotificationProps,
    ActionNewRelicNotificationArgs,
    NewRelicNotification
} from './new-relic-notification';
import { ActionPassArgumentsState, ActionPassArgumentsProps, ActionPassArgumentsArgs, PassArguments } from './pass-arguments';
import { ActionPingMonitoringState, ActionPingMonitoringProps, ActionPingMonitoringArgs, PingMonitoring } from './ping-monitoring';
import {
    ActionPublishAndroidApplicationState,
    ActionPublishAndroidApplicationProps,
    ActionPublishAndroidApplicationArgs,
    PublishAndroidApplication
} from './publish-android-application';
import {
    ActionPublishBundleToGooglePlayState,
    ActionPublishBundleToGooglePlayProps,
    ActionPublishBundleToGooglePlayArgs,
    PublishBundleToGooglePlay
} from './publish-bundle-to-google-play';
import { ActionPushDockerImageState, ActionPushDockerImageProps, ActionPushDockerImageArgs, PushDockerImage } from './push-docker-image';
import { ActionPushbulletState, ActionPushbulletProps, ActionPushbulletArgs, Pushbullet } from './pushbullet';
import { ActionPushoverState, ActionPushoverProps, ActionPushoverArgs, Pushover } from './pushover';
import { ActionRackspaceState, ActionRackspaceProps, ActionRackspaceArgs, Rackspace } from './rackspace';
import { ActionRaygunState, ActionRaygunProps, ActionRaygunArgs, Raygun } from './raygun';
import { ActionReplaceState, ActionReplaceProps, ActionReplaceArgs, Replace } from './replace';
import {
    ActionRollbarNotificationState,
    ActionRollbarNotificationProps,
    ActionRollbarNotificationArgs,
    RollbarNotification
} from './rollbar-notification';
import { ActionRsyncState, ActionRsyncProps, ActionRsyncArgs, Rsync } from './rsync';
import {
    ActionRunDockerContainerState,
    ActionRunDockerContainerProps,
    ActionRunDockerContainerArgs,
    RunDockerContainer
} from './run-docker-container';
import { ActionRunNextPipelineState, ActionRunNextPipelineProps, ActionRunNextPipelineArgs, RunNextPipeline } from './run-next-pipeline';
import {
    ActionSentryNotificationState,
    ActionSentryNotificationProps,
    ActionSentryNotificationArgs,
    SentryNotification
} from './sentry-notification';
import { ActionSFTPState, ActionSFTPProps, ActionSFTPArgs, SFTP } from './sftp';
import { ActionShopifyState, ActionShopifyProps, ActionShopifyArgs, Shopify } from './shopify';
import {
    ActionSignAndroidApplicationState,
    ActionSignAndroidApplicationProps,
    ActionSignAndroidApplicationArgs,
    SignAndroidApplication
} from './sign-android-application';
import { ActionSignBundleState, ActionSignBundleProps, ActionSignBundleArgs, SignBundle } from './sign-bundle';
import {
    ActionSlackNotificationState,
    ActionSlackNotificationProps,
    ActionSlackNotificationArgs,
    SlackNotification
} from './slack-notification';
import { ActionSleepState, ActionSleepProps, ActionSleepArgs, Sleep } from './sleep';
import { ActionSmsNotificationState, ActionSmsNotificationProps, ActionSmsNotificationArgs, SmsNotification } from './sms-notification';
import { ActionSplitTestsState, ActionSplitTestsProps, ActionSplitTestsArgs, SplitTests } from './split-tests';
import { ActionSSHCommandState, ActionSSHCommandProps, ActionSSHCommandArgs, SSHCommand } from './ssh-command';
import { ActionTCPMonitoringState, ActionTCPMonitoringProps, ActionTCPMonitoringArgs, TCPMonitoring } from './tcp-monitoring';
import {
    ActionTelegramNotificationState,
    ActionTelegramNotificationProps,
    ActionTelegramNotificationArgs,
    TelegramNotification
} from './telegram-notification';
import {
    ActionTriggerGoogleFunctionsState,
    ActionTriggerGoogleFunctionsProps,
    ActionTriggerGoogleFunctionsArgs,
    TriggerGoogleFunctions
} from './trigger-google-functions';
import { ActionUpcloudState, ActionUpcloudProps, ActionUpcloudArgs, Upcloud } from './upcloud';
import { ActionVultrState, ActionVultrProps, ActionVultrArgs, Vultr } from './vultr';
import { ActionWaitForApplyState, ActionWaitForApplyProps, ActionWaitForApplyArgs, WaitForApply } from './wait-for-apply';
import { ActionWebMonitoringState, ActionWebMonitoringProps, ActionWebMonitoringArgs, WebMonitoring } from './web-monitoring';
import { ActionWebDAVState, ActionWebDAVProps, ActionWebDAVArgs, WebDAV } from './webdav';
import { ActionZIPState, ActionZIPProps, ActionZIPArgs, ZIP } from './zip';

export * from './amazon-s3';
export * from './aws-cli';
export * from './aws-ecs';
export * from './aws-lambda-deploy';
export * from './aws-lambda';
export * from './azure';
export * from './bugsnag';
export * from './build-android-app';
export * from './build-dockerfile';
export * from './build-flutter-app';
export * from './build';
export * from './cloudflare';
export * from './cloudfront';
export * from './codedeploy';
export * from './compress-images';
export * from './copy-files-from-another-pipeline';
export * from './datadog-notification';
export * from './datadog-service-check';
export * from './digitalocean-cdn';
export * from './digitalocean-spaces';
export * from './digitalocean';
export * from './discord-notification';
export * from './dockerfile-linter';
export * from './download-ftp';
export * from './download-s3';
export * from './download-sftp';
export * from './elastic-beanstalk-monitor';
export * from './elastic-beanstalk';
export * from './email-notification';
export * from './eslint';
export * from './firebase';
export * from './ftp';
export * from './ftps';
export * from './gcloud-cli';
export * from './ghost-inspector';
export * from './git-push';
export * from './gitcrypt-lock';
export * from './gitcrypt-unlock';
export * from './gke-apply-deployment';
export * from './gke-kubectl';
export * from './gke-run-job';
export * from './gke-run-pod';
export * from './gke-set-image';
export * from './google-app-engine';
export * from './google-cdn';
export * from './google-cloud-storage';
export * from './google-compute-engine';
export * from './google-functions-deploy';
export * from './heroku-cli';
export * from './heroku';
export * from './honeybadger';
export * from './http-request';
export * from './index';
export * from './kubernetes-apply-deployment-configuration';
export * from './kubernetes-kubectl';
export * from './kubernetes-run-helm-cmds';
export * from './kubernetes-run-pod';
export * from './kubernetes-set-image';
export * from './lighthouse';
export * from './loggly';
export * from './netlify';
export * from './new-relic-notification';
export * from './pass-arguments';
export * from './ping-monitoring';
export * from './publish-android-application';
export * from './publish-bundle-to-google-play';
export * from './push-docker-image';
export * from './pushbullet';
export * from './pushover';
export * from './rackspace';
export * from './raygun';
export * from './replace';
export * from './rollbar-notification';
export * from './rsync';
export * from './run-docker-container';
export * from './run-next-pipeline';
export * from './sentry-notification';
export * from './sftp';
export * from './shopify';
export * from './sign-android-application';
export * from './sign-bundle';
export * from './slack-notification';
export * from './sleep';
export * from './sms-notification';
export * from './split-tests';
export * from './ssh-command';
export * from './tcp-monitoring';
export * from './telegram-notification';
export * from './trigger-google-functions';
export * from './upcloud';
export * from './vultr';
export * from './wait-for-apply';
export * from './web-monitoring';
export * from './webdav';
export * from './zip';

export type ActionState =
    | ActionAmazonS3State
    | ActionAWSCLIState
    | ActionAWSECSState
    | ActionAWSLambdaDeployState
    | ActionAWSLambdaState
    | ActionAzureState
    | ActionBugsnagState
    | ActionBuildAndroidAppState
    | ActionBuildDockerfileState
    | ActionBuildFlutterAppState
    | ActionBuildState
    | ActionCloudflareState
    | ActionCloudFrontState
    | ActionCodeDeployState
    | ActionCompressImagesState
    | ActionCopyFilesFromAnotherPipelineState
    | ActionDatadogNotificationState
    | ActionDatadogServiceCheckState
    | ActionDigitalOceanCDNState
    | ActionDigitalOceanSpacesState
    | ActionDigitalOceanState
    | ActionDiscordNotificationState
    | ActionDockerfileLinterState
    | ActionDownloadFTPState
    | ActionDownloadS3State
    | ActionDownloadSFTPState
    | ActionElasticBeanstalkMonitorState
    | ActionElasticBeanstalkState
    | ActionEmailNotificationState
    | ActionEslintState
    | ActionFirebaseState
    | ActionFTPState
    | ActionFTPSState
    | ActionGCloudCLIState
    | ActionGhostInspectorState
    | ActionGitPushState
    | ActionGitcryptLockState
    | ActionGitcryptUnlockState
    | ActionGKEApplyDeploymentState
    | ActionGKEKubectlState
    | ActionGKERunJobState
    | ActionGKERunPodState
    | ActionGKESetImageState
    | ActionGoogleAppEngineState
    | ActionGoogleCDNState
    | ActionGoogleCloudStorageState
    | ActionGoogleComputeEngineState
    | ActionGoogleFunctionsDeployState
    | ActionHerokuCLIState
    | ActionHerokuState
    | ActionHoneybadgerState
    | ActionHTTPRequestState
    | ActionKubernetesApplyDeploymentConfigurationState
    | ActionKubernetesKubectlState
    | ActionKubernetesRunHelmCMDsState
    | ActionKubernetesRunPodState
    | ActionKubernetesSetImageState
    | ActionLighthouseState
    | ActionLogglyState
    | ActionNetlifyState
    | ActionNewRelicNotificationState
    | ActionPassArgumentsState
    | ActionPingMonitoringState
    | ActionPublishAndroidApplicationState
    | ActionPublishBundleToGooglePlayState
    | ActionPushDockerImageState
    | ActionPushbulletState
    | ActionPushoverState
    | ActionRackspaceState
    | ActionRaygunState
    | ActionReplaceState
    | ActionRollbarNotificationState
    | ActionRsyncState
    | ActionRunDockerContainerState
    | ActionRunNextPipelineState
    | ActionSentryNotificationState
    | ActionSFTPState
    | ActionShopifyState
    | ActionSignAndroidApplicationState
    | ActionSignBundleState
    | ActionSlackNotificationState
    | ActionSleepState
    | ActionSmsNotificationState
    | ActionSplitTestsState
    | ActionSSHCommandState
    | ActionTCPMonitoringState
    | ActionTelegramNotificationState
    | ActionTriggerGoogleFunctionsState
    | ActionUpcloudState
    | ActionVultrState
    | ActionWaitForApplyState
    | ActionWebMonitoringState
    | ActionWebDAVState
    | ActionZIPState;
export type ActionArgs =
    | ActionAmazonS3Args
    | ActionAWSCLIArgs
    | ActionAWSECSArgs
    | ActionAWSLambdaDeployArgs
    | ActionAWSLambdaArgs
    | ActionAzureArgs
    | ActionBugsnagArgs
    | ActionBuildAndroidAppArgs
    | ActionBuildDockerfileArgs
    | ActionBuildFlutterAppArgs
    | ActionBuildArgs
    | ActionCloudflareArgs
    | ActionCloudFrontArgs
    | ActionCodeDeployArgs
    | ActionCompressImagesArgs
    | ActionCopyFilesFromAnotherPipelineArgs
    | ActionDatadogNotificationArgs
    | ActionDatadogServiceCheckArgs
    | ActionDigitalOceanCDNArgs
    | ActionDigitalOceanSpacesArgs
    | ActionDigitalOceanArgs
    | ActionDiscordNotificationArgs
    | ActionDockerfileLinterArgs
    | ActionDownloadFTPArgs
    | ActionDownloadS3Args
    | ActionDownloadSFTPArgs
    | ActionElasticBeanstalkMonitorArgs
    | ActionElasticBeanstalkArgs
    | ActionEmailNotificationArgs
    | ActionEslintArgs
    | ActionFirebaseArgs
    | ActionFTPArgs
    | ActionFTPSArgs
    | ActionGCloudCLIArgs
    | ActionGhostInspectorArgs
    | ActionGitPushArgs
    | ActionGitcryptLockArgs
    | ActionGitcryptUnlockArgs
    | ActionGKEApplyDeploymentArgs
    | ActionGKEKubectlArgs
    | ActionGKERunJobArgs
    | ActionGKERunPodArgs
    | ActionGKESetImageArgs
    | ActionGoogleAppEngineArgs
    | ActionGoogleCDNArgs
    | ActionGoogleCloudStorageArgs
    | ActionGoogleComputeEngineArgs
    | ActionGoogleFunctionsDeployArgs
    | ActionHerokuCLIArgs
    | ActionHerokuArgs
    | ActionHoneybadgerArgs
    | ActionHTTPRequestArgs
    | ActionKubernetesApplyDeploymentConfigurationArgs
    | ActionKubernetesKubectlArgs
    | ActionKubernetesRunHelmCMDsArgs
    | ActionKubernetesRunPodArgs
    | ActionKubernetesSetImageArgs
    | ActionLighthouseArgs
    | ActionLogglyArgs
    | ActionNetlifyArgs
    | ActionNewRelicNotificationArgs
    | ActionPassArgumentsArgs
    | ActionPingMonitoringArgs
    | ActionPublishAndroidApplicationArgs
    | ActionPublishBundleToGooglePlayArgs
    | ActionPushDockerImageArgs
    | ActionPushbulletArgs
    | ActionPushoverArgs
    | ActionRackspaceArgs
    | ActionRaygunArgs
    | ActionReplaceArgs
    | ActionRollbarNotificationArgs
    | ActionRsyncArgs
    | ActionRunDockerContainerArgs
    | ActionRunNextPipelineArgs
    | ActionSentryNotificationArgs
    | ActionSFTPArgs
    | ActionShopifyArgs
    | ActionSignAndroidApplicationArgs
    | ActionSignBundleArgs
    | ActionSlackNotificationArgs
    | ActionSleepArgs
    | ActionSmsNotificationArgs
    | ActionSplitTestsArgs
    | ActionSSHCommandArgs
    | ActionTCPMonitoringArgs
    | ActionTelegramNotificationArgs
    | ActionTriggerGoogleFunctionsArgs
    | ActionUpcloudArgs
    | ActionVultrArgs
    | ActionWaitForApplyArgs
    | ActionWebMonitoringArgs
    | ActionWebDAVArgs
    | ActionZIPArgs;
export type ActionProps =
    | ActionAmazonS3Props
    | ActionAWSCLIProps
    | ActionAWSECSProps
    | ActionAWSLambdaDeployProps
    | ActionAWSLambdaProps
    | ActionAzureProps
    | ActionBugsnagProps
    | ActionBuildAndroidAppProps
    | ActionBuildDockerfileProps
    | ActionBuildFlutterAppProps
    | ActionBuildProps
    | ActionCloudflareProps
    | ActionCloudFrontProps
    | ActionCodeDeployProps
    | ActionCompressImagesProps
    | ActionCopyFilesFromAnotherPipelineProps
    | ActionDatadogNotificationProps
    | ActionDatadogServiceCheckProps
    | ActionDigitalOceanCDNProps
    | ActionDigitalOceanSpacesProps
    | ActionDigitalOceanProps
    | ActionDiscordNotificationProps
    | ActionDockerfileLinterProps
    | ActionDownloadFTPProps
    | ActionDownloadS3Props
    | ActionDownloadSFTPProps
    | ActionElasticBeanstalkMonitorProps
    | ActionElasticBeanstalkProps
    | ActionEmailNotificationProps
    | ActionEslintProps
    | ActionFirebaseProps
    | ActionFTPProps
    | ActionFTPSProps
    | ActionGCloudCLIProps
    | ActionGhostInspectorProps
    | ActionGitPushProps
    | ActionGitcryptLockProps
    | ActionGitcryptUnlockProps
    | ActionGKEApplyDeploymentProps
    | ActionGKEKubectlProps
    | ActionGKERunJobProps
    | ActionGKERunPodProps
    | ActionGKESetImageProps
    | ActionGoogleAppEngineProps
    | ActionGoogleCDNProps
    | ActionGoogleCloudStorageProps
    | ActionGoogleComputeEngineProps
    | ActionGoogleFunctionsDeployProps
    | ActionHerokuCLIProps
    | ActionHerokuProps
    | ActionHoneybadgerProps
    | ActionHTTPRequestProps
    | ActionKubernetesApplyDeploymentConfigurationProps
    | ActionKubernetesKubectlProps
    | ActionKubernetesRunHelmCMDsProps
    | ActionKubernetesRunPodProps
    | ActionKubernetesSetImageProps
    | ActionLighthouseProps
    | ActionLogglyProps
    | ActionNetlifyProps
    | ActionNewRelicNotificationProps
    | ActionPassArgumentsProps
    | ActionPingMonitoringProps
    | ActionPublishAndroidApplicationProps
    | ActionPublishBundleToGooglePlayProps
    | ActionPushDockerImageProps
    | ActionPushbulletProps
    | ActionPushoverProps
    | ActionRackspaceProps
    | ActionRaygunProps
    | ActionReplaceProps
    | ActionRollbarNotificationProps
    | ActionRsyncProps
    | ActionRunDockerContainerProps
    | ActionRunNextPipelineProps
    | ActionSentryNotificationProps
    | ActionSFTPProps
    | ActionShopifyProps
    | ActionSignAndroidApplicationProps
    | ActionSignBundleProps
    | ActionSlackNotificationProps
    | ActionSleepProps
    | ActionSmsNotificationProps
    | ActionSplitTestsProps
    | ActionSSHCommandProps
    | ActionTCPMonitoringProps
    | ActionTelegramNotificationProps
    | ActionTriggerGoogleFunctionsProps
    | ActionUpcloudProps
    | ActionVultrProps
    | ActionWaitForApplyProps
    | ActionWebMonitoringProps
    | ActionWebDAVProps
    | ActionZIPProps;
export type Action =
    | AmazonS3
    | AWSCLI
    | AWSECS
    | AWSLambdaDeploy
    | AWSLambda
    | Azure
    | Bugsnag
    | BuildAndroidApp
    | BuildDockerfile
    | BuildFlutterApp
    | Build
    | Cloudflare
    | CloudFront
    | CodeDeploy
    | CompressImages
    | CopyFilesFromAnotherPipeline
    | DatadogNotification
    | DatadogServiceCheck
    | DigitalOceanCDN
    | DigitalOceanSpaces
    | DigitalOcean
    | DiscordNotification
    | DockerfileLinter
    | DownloadFTP
    | DownloadS3
    | DownloadSFTP
    | ElasticBeanstalkMonitor
    | ElasticBeanstalk
    | EmailNotification
    | Eslint
    | Firebase
    | FTP
    | FTPS
    | GCloudCLI
    | GhostInspector
    | GitPush
    | GitcryptLock
    | GitcryptUnlock
    | GKEApplyDeployment
    | GKEKubectl
    | GKERunJob
    | GKERunPod
    | GKESetImage
    | GoogleAppEngine
    | GoogleCDN
    | GoogleCloudStorage
    | GoogleComputeEngine
    | GoogleFunctionsDeploy
    | HerokuCLI
    | Heroku
    | Honeybadger
    | HTTPRequest
    | KubernetesApplyDeploymentConfiguration
    | KubernetesKubectl
    | KubernetesRunHelmCMDs
    | KubernetesRunPod
    | KubernetesSetImage
    | Lighthouse
    | Loggly
    | Netlify
    | NewRelicNotification
    | PassArguments
    | PingMonitoring
    | PublishAndroidApplication
    | PublishBundleToGooglePlay
    | PushDockerImage
    | Pushbullet
    | Pushover
    | Rackspace
    | Raygun
    | Replace
    | RollbarNotification
    | Rsync
    | RunDockerContainer
    | RunNextPipeline
    | SentryNotification
    | SFTP
    | Shopify
    | SignAndroidApplication
    | SignBundle
    | SlackNotification
    | Sleep
    | SmsNotification
    | SplitTests
    | SSHCommand
    | TCPMonitoring
    | TelegramNotification
    | TriggerGoogleFunctions
    | Upcloud
    | Vultr
    | WaitForApply
    | WebMonitoring
    | WebDAV
    | ZIP;
