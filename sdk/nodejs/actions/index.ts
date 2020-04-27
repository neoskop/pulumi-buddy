import { AmazonS3State, AmazonS3Props, AmazonS3Args, AmazonS3 } from './amazon-s3';
import { AWSCLIState, AWSCLIProps, AWSCLIArgs, AWSCLI } from './aws-cli';
import { AWSECSState, AWSECSProps, AWSECSArgs, AWSECS } from './aws-ecs';
import { AWSLambdaDeployState, AWSLambdaDeployProps, AWSLambdaDeployArgs, AWSLambdaDeploy } from './aws-lambda-deploy';
import { AWSLambdaState, AWSLambdaProps, AWSLambdaArgs, AWSLambda } from './aws-lambda';
import { AzureState, AzureProps, AzureArgs, Azure } from './azure';
import { BugsnagState, BugsnagProps, BugsnagArgs, Bugsnag } from './bugsnag';
import { BuildAndroidAppState, BuildAndroidAppProps, BuildAndroidAppArgs, BuildAndroidApp } from './build-android-app';
import { BuildDockerfileState, BuildDockerfileProps, BuildDockerfileArgs, BuildDockerfile } from './build-dockerfile';
import { BuildFlutterAppState, BuildFlutterAppProps, BuildFlutterAppArgs, BuildFlutterApp } from './build-flutter-app';
import { BuildState, BuildProps, BuildArgs, Build } from './build';
import { CloudflareState, CloudflareProps, CloudflareArgs, Cloudflare } from './cloudflare';
import { CloudFrontState, CloudFrontProps, CloudFrontArgs, CloudFront } from './cloudfront';
import { CodeDeployState, CodeDeployProps, CodeDeployArgs, CodeDeploy } from './codedeploy';
import { CompressImagesState, CompressImagesProps, CompressImagesArgs, CompressImages } from './compress-images';
import {
    CopyFilesFromAnotherPipelineState,
    CopyFilesFromAnotherPipelineProps,
    CopyFilesFromAnotherPipelineArgs,
    CopyFilesFromAnotherPipeline
} from './copy-files-from-another-pipeline';
import { DatadogNotificationState, DatadogNotificationProps, DatadogNotificationArgs, DatadogNotification } from './datadog-notification';
import { DatadogServiceCheckState, DatadogServiceCheckProps, DatadogServiceCheckArgs, DatadogServiceCheck } from './datadog-service-check';
import { DigitalOceanCDNState, DigitalOceanCDNProps, DigitalOceanCDNArgs, DigitalOceanCDN } from './digitalocean-cdn';
import { DigitalOceanSpacesState, DigitalOceanSpacesProps, DigitalOceanSpacesArgs, DigitalOceanSpaces } from './digitalocean-spaces';
import { DigitalOceanState, DigitalOceanProps, DigitalOceanArgs, DigitalOcean } from './digitalocean';
import { DiscordNotificationState, DiscordNotificationProps, DiscordNotificationArgs, DiscordNotification } from './discord-notification';
import { DockerfileLinterState, DockerfileLinterProps, DockerfileLinterArgs, DockerfileLinter } from './dockerfile-linter';
import { DownloadFTPState, DownloadFTPProps, DownloadFTPArgs, DownloadFTP } from './download-ftp';
import { DownloadS3State, DownloadS3Props, DownloadS3Args, DownloadS3 } from './download-s3';
import { DownloadSFTPState, DownloadSFTPProps, DownloadSFTPArgs, DownloadSFTP } from './download-sftp';
import {
    ElasticBeanstalkMonitorState,
    ElasticBeanstalkMonitorProps,
    ElasticBeanstalkMonitorArgs,
    ElasticBeanstalkMonitor
} from './elastic-beanstalk-monitor';
import { ElasticBeanstalkState, ElasticBeanstalkProps, ElasticBeanstalkArgs, ElasticBeanstalk } from './elastic-beanstalk';
import { EmailNotificationState, EmailNotificationProps, EmailNotificationArgs, EmailNotification } from './email-notification';
import { EslintState, EslintProps, EslintArgs, Eslint } from './eslint';
import { FirebaseState, FirebaseProps, FirebaseArgs, Firebase } from './firebase';
import { FTPState, FTPProps, FTPArgs, FTP } from './ftp';
import { FTPSState, FTPSProps, FTPSArgs, FTPS } from './ftps';
import { GCloudCLIState, GCloudCLIProps, GCloudCLIArgs, GCloudCLI } from './gcloud-cli';
import { GhostInspectorState, GhostInspectorProps, GhostInspectorArgs, GhostInspector } from './ghost-inspector';
import { GitPushState, GitPushProps, GitPushArgs, GitPush } from './git-push';
import { GitcryptLockState, GitcryptLockProps, GitcryptLockArgs, GitcryptLock } from './gitcrypt-lock';
import { GitcryptUnlockState, GitcryptUnlockProps, GitcryptUnlockArgs, GitcryptUnlock } from './gitcrypt-unlock';
import { GKEApplyDeploymentState, GKEApplyDeploymentProps, GKEApplyDeploymentArgs, GKEApplyDeployment } from './gke-apply-deployment';
import { GKEKubectlState, GKEKubectlProps, GKEKubectlArgs, GKEKubectl } from './gke-kubectl';
import { GKERunJobState, GKERunJobProps, GKERunJobArgs, GKERunJob } from './gke-run-job';
import { GKERunPodState, GKERunPodProps, GKERunPodArgs, GKERunPod } from './gke-run-pod';
import { GKESetImageState, GKESetImageProps, GKESetImageArgs, GKESetImage } from './gke-set-image';
import { GoogleAppEngineState, GoogleAppEngineProps, GoogleAppEngineArgs, GoogleAppEngine } from './google-app-engine';
import { GoogleCDNState, GoogleCDNProps, GoogleCDNArgs, GoogleCDN } from './google-cdn';
import { GoogleCloudStorageState, GoogleCloudStorageProps, GoogleCloudStorageArgs, GoogleCloudStorage } from './google-cloud-storage';
import { GoogleComputeEngineState, GoogleComputeEngineProps, GoogleComputeEngineArgs, GoogleComputeEngine } from './google-compute-engine';
import {
    GoogleFunctionsDeployState,
    GoogleFunctionsDeployProps,
    GoogleFunctionsDeployArgs,
    GoogleFunctionsDeploy
} from './google-functions-deploy';
import { HerokuCLIState, HerokuCLIProps, HerokuCLIArgs, HerokuCLI } from './heroku-cli';
import { HerokuState, HerokuProps, HerokuArgs, Heroku } from './heroku';
import { HoneybadgerState, HoneybadgerProps, HoneybadgerArgs, Honeybadger } from './honeybadger';
import { HTTPRequestState, HTTPRequestProps, HTTPRequestArgs, HTTPRequest } from './http-request';
import {
    KubernetesApplyDeploymentConfigurationState,
    KubernetesApplyDeploymentConfigurationProps,
    KubernetesApplyDeploymentConfigurationArgs,
    KubernetesApplyDeploymentConfiguration
} from './kubernetes-apply-deployment-configuration';
import { KubernetesKubectlState, KubernetesKubectlProps, KubernetesKubectlArgs, KubernetesKubectl } from './kubernetes-kubectl';
import {
    KubernetesRunHelmCMDsState,
    KubernetesRunHelmCMDsProps,
    KubernetesRunHelmCMDsArgs,
    KubernetesRunHelmCMDs
} from './kubernetes-run-helm-cmds';
import { KubernetesRunPodState, KubernetesRunPodProps, KubernetesRunPodArgs, KubernetesRunPod } from './kubernetes-run-pod';
import { KubernetesSetImageState, KubernetesSetImageProps, KubernetesSetImageArgs, KubernetesSetImage } from './kubernetes-set-image';
import { LighthouseState, LighthouseProps, LighthouseArgs, Lighthouse } from './lighthouse';
import { LogglyState, LogglyProps, LogglyArgs, Loggly } from './loggly';
import { NetlifyState, NetlifyProps, NetlifyArgs, Netlify } from './netlify';
import {
    NewRelicNotificationState,
    NewRelicNotificationProps,
    NewRelicNotificationArgs,
    NewRelicNotification
} from './new-relic-notification';
import { PassArgumentsState, PassArgumentsProps, PassArgumentsArgs, PassArguments } from './pass-arguments';
import { PingMonitoringState, PingMonitoringProps, PingMonitoringArgs, PingMonitoring } from './ping-monitoring';
import {
    PublishAndroidApplicationState,
    PublishAndroidApplicationProps,
    PublishAndroidApplicationArgs,
    PublishAndroidApplication
} from './publish-android-application';
import {
    PublishBundleToGooglePlayState,
    PublishBundleToGooglePlayProps,
    PublishBundleToGooglePlayArgs,
    PublishBundleToGooglePlay
} from './publish-bundle-to-google-play';
import { PushDockerImageState, PushDockerImageProps, PushDockerImageArgs, PushDockerImage } from './push-docker-image';
import { PushbulletState, PushbulletProps, PushbulletArgs, Pushbullet } from './pushbullet';
import { PushoverState, PushoverProps, PushoverArgs, Pushover } from './pushover';
import { RackspaceState, RackspaceProps, RackspaceArgs, Rackspace } from './rackspace';
import { RaygunState, RaygunProps, RaygunArgs, Raygun } from './raygun';
import { ReplaceState, ReplaceProps, ReplaceArgs, Replace } from './replace';
import { RollbarNotificationState, RollbarNotificationProps, RollbarNotificationArgs, RollbarNotification } from './rollbar-notification';
import { RsyncState, RsyncProps, RsyncArgs, Rsync } from './rsync';
import { RunDockerContainerState, RunDockerContainerProps, RunDockerContainerArgs, RunDockerContainer } from './run-docker-container';
import { RunNextPipelineState, RunNextPipelineProps, RunNextPipelineArgs, RunNextPipeline } from './run-next-pipeline';
import { SentryNotificationState, SentryNotificationProps, SentryNotificationArgs, SentryNotification } from './sentry-notification';
import { SFTPState, SFTPProps, SFTPArgs, SFTP } from './sftp';
import { ShopifyState, ShopifyProps, ShopifyArgs, Shopify } from './shopify';
import {
    SignAndroidApplicationState,
    SignAndroidApplicationProps,
    SignAndroidApplicationArgs,
    SignAndroidApplication
} from './sign-android-application';
import { SignBundleState, SignBundleProps, SignBundleArgs, SignBundle } from './sign-bundle';
import { SlackNotificationState, SlackNotificationProps, SlackNotificationArgs, SlackNotification } from './slack-notification';
import { SleepState, SleepProps, SleepArgs, Sleep } from './sleep';
import { SmsNotificationState, SmsNotificationProps, SmsNotificationArgs, SmsNotification } from './sms-notification';
import { SplitTestsState, SplitTestsProps, SplitTestsArgs, SplitTests } from './split-tests';
import { SSHCommandState, SSHCommandProps, SSHCommandArgs, SSHCommand } from './ssh-command';
import { TCPMonitoringState, TCPMonitoringProps, TCPMonitoringArgs, TCPMonitoring } from './tcp-monitoring';
import {
    TelegramNotificationState,
    TelegramNotificationProps,
    TelegramNotificationArgs,
    TelegramNotification
} from './telegram-notification';
import {
    TriggerGoogleFunctionsState,
    TriggerGoogleFunctionsProps,
    TriggerGoogleFunctionsArgs,
    TriggerGoogleFunctions
} from './trigger-google-functions';
import { UpcloudState, UpcloudProps, UpcloudArgs, Upcloud } from './upcloud';
import { VultrState, VultrProps, VultrArgs, Vultr } from './vultr';
import { WaitForApplyState, WaitForApplyProps, WaitForApplyArgs, WaitForApply } from './wait-for-apply';
import { WebMonitoringState, WebMonitoringProps, WebMonitoringArgs, WebMonitoring } from './web-monitoring';
import { WebDAVState, WebDAVProps, WebDAVArgs, WebDAV } from './webdav';
import { ZIPState, ZIPProps, ZIPArgs, ZIP } from './zip';

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
    | AmazonS3State
    | AWSCLIState
    | AWSECSState
    | AWSLambdaDeployState
    | AWSLambdaState
    | AzureState
    | BugsnagState
    | BuildAndroidAppState
    | BuildDockerfileState
    | BuildFlutterAppState
    | BuildState
    | CloudflareState
    | CloudFrontState
    | CodeDeployState
    | CompressImagesState
    | CopyFilesFromAnotherPipelineState
    | DatadogNotificationState
    | DatadogServiceCheckState
    | DigitalOceanCDNState
    | DigitalOceanSpacesState
    | DigitalOceanState
    | DiscordNotificationState
    | DockerfileLinterState
    | DownloadFTPState
    | DownloadS3State
    | DownloadSFTPState
    | ElasticBeanstalkMonitorState
    | ElasticBeanstalkState
    | EmailNotificationState
    | EslintState
    | FirebaseState
    | FTPState
    | FTPSState
    | GCloudCLIState
    | GhostInspectorState
    | GitPushState
    | GitcryptLockState
    | GitcryptUnlockState
    | GKEApplyDeploymentState
    | GKEKubectlState
    | GKERunJobState
    | GKERunPodState
    | GKESetImageState
    | GoogleAppEngineState
    | GoogleCDNState
    | GoogleCloudStorageState
    | GoogleComputeEngineState
    | GoogleFunctionsDeployState
    | HerokuCLIState
    | HerokuState
    | HoneybadgerState
    | HTTPRequestState
    | KubernetesApplyDeploymentConfigurationState
    | KubernetesKubectlState
    | KubernetesRunHelmCMDsState
    | KubernetesRunPodState
    | KubernetesSetImageState
    | LighthouseState
    | LogglyState
    | NetlifyState
    | NewRelicNotificationState
    | PassArgumentsState
    | PingMonitoringState
    | PublishAndroidApplicationState
    | PublishBundleToGooglePlayState
    | PushDockerImageState
    | PushbulletState
    | PushoverState
    | RackspaceState
    | RaygunState
    | ReplaceState
    | RollbarNotificationState
    | RsyncState
    | RunDockerContainerState
    | RunNextPipelineState
    | SentryNotificationState
    | SFTPState
    | ShopifyState
    | SignAndroidApplicationState
    | SignBundleState
    | SlackNotificationState
    | SleepState
    | SmsNotificationState
    | SplitTestsState
    | SSHCommandState
    | TCPMonitoringState
    | TelegramNotificationState
    | TriggerGoogleFunctionsState
    | UpcloudState
    | VultrState
    | WaitForApplyState
    | WebMonitoringState
    | WebDAVState
    | ZIPState;
export type ActionArgs =
    | AmazonS3Args
    | AWSCLIArgs
    | AWSECSArgs
    | AWSLambdaDeployArgs
    | AWSLambdaArgs
    | AzureArgs
    | BugsnagArgs
    | BuildAndroidAppArgs
    | BuildDockerfileArgs
    | BuildFlutterAppArgs
    | BuildArgs
    | CloudflareArgs
    | CloudFrontArgs
    | CodeDeployArgs
    | CompressImagesArgs
    | CopyFilesFromAnotherPipelineArgs
    | DatadogNotificationArgs
    | DatadogServiceCheckArgs
    | DigitalOceanCDNArgs
    | DigitalOceanSpacesArgs
    | DigitalOceanArgs
    | DiscordNotificationArgs
    | DockerfileLinterArgs
    | DownloadFTPArgs
    | DownloadS3Args
    | DownloadSFTPArgs
    | ElasticBeanstalkMonitorArgs
    | ElasticBeanstalkArgs
    | EmailNotificationArgs
    | EslintArgs
    | FirebaseArgs
    | FTPArgs
    | FTPSArgs
    | GCloudCLIArgs
    | GhostInspectorArgs
    | GitPushArgs
    | GitcryptLockArgs
    | GitcryptUnlockArgs
    | GKEApplyDeploymentArgs
    | GKEKubectlArgs
    | GKERunJobArgs
    | GKERunPodArgs
    | GKESetImageArgs
    | GoogleAppEngineArgs
    | GoogleCDNArgs
    | GoogleCloudStorageArgs
    | GoogleComputeEngineArgs
    | GoogleFunctionsDeployArgs
    | HerokuCLIArgs
    | HerokuArgs
    | HoneybadgerArgs
    | HTTPRequestArgs
    | KubernetesApplyDeploymentConfigurationArgs
    | KubernetesKubectlArgs
    | KubernetesRunHelmCMDsArgs
    | KubernetesRunPodArgs
    | KubernetesSetImageArgs
    | LighthouseArgs
    | LogglyArgs
    | NetlifyArgs
    | NewRelicNotificationArgs
    | PassArgumentsArgs
    | PingMonitoringArgs
    | PublishAndroidApplicationArgs
    | PublishBundleToGooglePlayArgs
    | PushDockerImageArgs
    | PushbulletArgs
    | PushoverArgs
    | RackspaceArgs
    | RaygunArgs
    | ReplaceArgs
    | RollbarNotificationArgs
    | RsyncArgs
    | RunDockerContainerArgs
    | RunNextPipelineArgs
    | SentryNotificationArgs
    | SFTPArgs
    | ShopifyArgs
    | SignAndroidApplicationArgs
    | SignBundleArgs
    | SlackNotificationArgs
    | SleepArgs
    | SmsNotificationArgs
    | SplitTestsArgs
    | SSHCommandArgs
    | TCPMonitoringArgs
    | TelegramNotificationArgs
    | TriggerGoogleFunctionsArgs
    | UpcloudArgs
    | VultrArgs
    | WaitForApplyArgs
    | WebMonitoringArgs
    | WebDAVArgs
    | ZIPArgs;
export type ActionProps =
    | AmazonS3Props
    | AWSCLIProps
    | AWSECSProps
    | AWSLambdaDeployProps
    | AWSLambdaProps
    | AzureProps
    | BugsnagProps
    | BuildAndroidAppProps
    | BuildDockerfileProps
    | BuildFlutterAppProps
    | BuildProps
    | CloudflareProps
    | CloudFrontProps
    | CodeDeployProps
    | CompressImagesProps
    | CopyFilesFromAnotherPipelineProps
    | DatadogNotificationProps
    | DatadogServiceCheckProps
    | DigitalOceanCDNProps
    | DigitalOceanSpacesProps
    | DigitalOceanProps
    | DiscordNotificationProps
    | DockerfileLinterProps
    | DownloadFTPProps
    | DownloadS3Props
    | DownloadSFTPProps
    | ElasticBeanstalkMonitorProps
    | ElasticBeanstalkProps
    | EmailNotificationProps
    | EslintProps
    | FirebaseProps
    | FTPProps
    | FTPSProps
    | GCloudCLIProps
    | GhostInspectorProps
    | GitPushProps
    | GitcryptLockProps
    | GitcryptUnlockProps
    | GKEApplyDeploymentProps
    | GKEKubectlProps
    | GKERunJobProps
    | GKERunPodProps
    | GKESetImageProps
    | GoogleAppEngineProps
    | GoogleCDNProps
    | GoogleCloudStorageProps
    | GoogleComputeEngineProps
    | GoogleFunctionsDeployProps
    | HerokuCLIProps
    | HerokuProps
    | HoneybadgerProps
    | HTTPRequestProps
    | KubernetesApplyDeploymentConfigurationProps
    | KubernetesKubectlProps
    | KubernetesRunHelmCMDsProps
    | KubernetesRunPodProps
    | KubernetesSetImageProps
    | LighthouseProps
    | LogglyProps
    | NetlifyProps
    | NewRelicNotificationProps
    | PassArgumentsProps
    | PingMonitoringProps
    | PublishAndroidApplicationProps
    | PublishBundleToGooglePlayProps
    | PushDockerImageProps
    | PushbulletProps
    | PushoverProps
    | RackspaceProps
    | RaygunProps
    | ReplaceProps
    | RollbarNotificationProps
    | RsyncProps
    | RunDockerContainerProps
    | RunNextPipelineProps
    | SentryNotificationProps
    | SFTPProps
    | ShopifyProps
    | SignAndroidApplicationProps
    | SignBundleProps
    | SlackNotificationProps
    | SleepProps
    | SmsNotificationProps
    | SplitTestsProps
    | SSHCommandProps
    | TCPMonitoringProps
    | TelegramNotificationProps
    | TriggerGoogleFunctionsProps
    | UpcloudProps
    | VultrProps
    | WaitForApplyProps
    | WebMonitoringProps
    | WebDAVProps
    | ZIPProps;
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
