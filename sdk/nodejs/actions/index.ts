import { AmazonS3State, AmazonS3Props, AmazonS3Args, AmazonS3 } from './amazon-s3';
import { AWSCLI2State, AWSCLI2Props, AWSCLI2Args, AWSCLI2 } from './aws-cli-2';
import { AWSCLIState, AWSCLIProps, AWSCLIArgs, AWSCLI } from './aws-cli';
import { AWSECSState, AWSECSProps, AWSECSArgs, AWSECS } from './aws-ecs';
import { AWSLambdaDeployState, AWSLambdaDeployProps, AWSLambdaDeployArgs, AWSLambdaDeploy } from './aws-lambda-deploy';
import { AWSLambdaState, AWSLambdaProps, AWSLambdaArgs, AWSLambda } from './aws-lambda';
import { AzureCLIState, AzureCLIProps, AzureCLIArgs, AzureCLI } from './azure-cli';
import { AzureStorageState, AzureStorageProps, AzureStorageArgs, AzureStorage } from './azure-storage';
import { AzureState, AzureProps, AzureArgs, Azure } from './azure';
import { BugsnagState, BugsnagProps, BugsnagArgs, Bugsnag } from './bugsnag';
import { BuildACordovaAppState, BuildACordovaAppProps, BuildACordovaAppArgs, BuildACordovaApp } from './build-a-cordova-app';
import {
    BuildAFastlaneAppiOSState,
    BuildAFastlaneAppiOSProps,
    BuildAFastlaneAppiOSArgs,
    BuildAFastlaneAppiOS
} from './build-a-fastlane-app-ios';
import {
    BuildAFlutterAppiOSState,
    BuildAFlutterAppiOSProps,
    BuildAFlutterAppiOSArgs,
    BuildAFlutterAppiOS
} from './build-a-flutter-app-ios';
import {
    BuildAReactNativeAppState,
    BuildAReactNativeAppProps,
    BuildAReactNativeAppArgs,
    BuildAReactNativeApp
} from './build-a-react-native-app';
import { BuildAndroidAppState, BuildAndroidAppProps, BuildAndroidAppArgs, BuildAndroidApp } from './build-android-app';
import { BuildDockerImageState, BuildDockerImageProps, BuildDockerImageArgs, BuildDockerImage } from './build-docker-image';
import { BuildFlutterAppState, BuildFlutterAppProps, BuildFlutterAppArgs, BuildFlutterApp } from './build-flutter-app';
import { BuildState, BuildProps, BuildArgs, Build } from './build';
import { ClearCacheState, ClearCacheProps, ClearCacheArgs, ClearCache } from './clear-cache';
import { CloudflareState, CloudflareProps, CloudflareArgs, Cloudflare } from './cloudflare';
import { CloudFrontState, CloudFrontProps, CloudFrontArgs, CloudFront } from './cloudfront';
import {
    CodeSignAndExportAnIOSAppState,
    CodeSignAndExportAnIOSAppProps,
    CodeSignAndExportAnIOSAppArgs,
    CodeSignAndExportAnIOSApp
} from './code-sign-and-export-an-ios-app';
import { CodeDeployState, CodeDeployProps, CodeDeployArgs, CodeDeploy } from './codedeploy';
import { CompressImagesState, CompressImagesProps, CompressImagesArgs, CompressImages } from './compress-images';
import {
    CopyFilesFromAnotherPipelineState,
    CopyFilesFromAnotherPipelineProps,
    CopyFilesFromAnotherPipelineArgs,
    CopyFilesFromAnotherPipeline
} from './copy-files-from-another-pipeline';
import { CreateNewSandboxState, CreateNewSandboxProps, CreateNewSandboxArgs, CreateNewSandbox } from './create-new-sandbox';
import { DatadogNotificationState, DatadogNotificationProps, DatadogNotificationArgs, DatadogNotification } from './datadog-notification';
import { DatadogServiceCheckState, DatadogServiceCheckProps, DatadogServiceCheckArgs, DatadogServiceCheck } from './datadog-service-check';
import {
    DeployToAppStoreConnectState,
    DeployToAppStoreConnectProps,
    DeployToAppStoreConnectArgs,
    DeployToAppStoreConnect
} from './deploy-to-app-store-connect';
import { DigitalOceanCDNState, DigitalOceanCDNProps, DigitalOceanCDNArgs, DigitalOceanCDN } from './digitalocean-cdn';
import { DigitalOceanCLIState, DigitalOceanCLIProps, DigitalOceanCLIArgs, DigitalOceanCLI } from './digitalocean-cli';
import { DigitalOceanSpacesState, DigitalOceanSpacesProps, DigitalOceanSpacesArgs, DigitalOceanSpaces } from './digitalocean-spaces';
import { DigitalOceanState, DigitalOceanProps, DigitalOceanArgs, DigitalOcean } from './digitalocean';
import { DiscordNotificationState, DiscordNotificationProps, DiscordNotificationArgs, DiscordNotification } from './discord-notification';
import { DockerCLIState, DockerCLIProps, DockerCLIArgs, DockerCLI } from './docker-cli';
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
import { GenerateVariablesState, GenerateVariablesProps, GenerateVariablesArgs, GenerateVariables } from './generate-variables';
import { GhostInspectorState, GhostInspectorProps, GhostInspectorArgs, GhostInspector } from './ghost-inspector';
import { GitPushState, GitPushProps, GitPushArgs, GitPush } from './git-push';
import { GitcryptLockState, GitcryptLockProps, GitcryptLockArgs, GitcryptLock } from './gitcrypt-lock';
import { GitcryptUnlockState, GitcryptUnlockProps, GitcryptUnlockArgs, GitcryptUnlock } from './gitcrypt-unlock';
import { GitHubCLIState, GitHubCLIProps, GitHubCLIArgs, GitHubCLI } from './github-cli';
import { GKEApplyDeploymentState, GKEApplyDeploymentProps, GKEApplyDeploymentArgs, GKEApplyDeployment } from './gke-apply-deployment';
import { GKEKubectlState, GKEKubectlProps, GKEKubectlArgs, GKEKubectl } from './gke-kubectl';
import { GKERunHelmState, GKERunHelmProps, GKERunHelmArgs, GKERunHelm } from './gke-run-helm';
import { GKERunJobState, GKERunJobProps, GKERunJobArgs, GKERunJob } from './gke-run-job';
import { GKERunPodState, GKERunPodProps, GKERunPodArgs, GKERunPod } from './gke-run-pod';
import { GKESetImageState, GKESetImageProps, GKESetImageArgs, GKESetImage } from './gke-set-image';
import { GoogleAppEngineState, GoogleAppEngineProps, GoogleAppEngineArgs, GoogleAppEngine } from './google-app-engine';
import { GoogleCDNState, GoogleCDNProps, GoogleCDNArgs, GoogleCDN } from './google-cdn';
import { GoogleCloudRunState, GoogleCloudRunProps, GoogleCloudRunArgs, GoogleCloudRun } from './google-cloud-run';
import { GoogleCloudStorageState, GoogleCloudStorageProps, GoogleCloudStorageArgs, GoogleCloudStorage } from './google-cloud-storage';
import { GoogleComputeEngineState, GoogleComputeEngineProps, GoogleComputeEngineArgs, GoogleComputeEngine } from './google-compute-engine';
import {
    GoogleFunctionsDeployState,
    GoogleFunctionsDeployProps,
    GoogleFunctionsDeployArgs,
    GoogleFunctionsDeploy
} from './google-functions-deploy';
import { GoogleFunctionsState, GoogleFunctionsProps, GoogleFunctionsArgs, GoogleFunctions } from './google-functions';
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
import { LinkValidatorState, LinkValidatorProps, LinkValidatorArgs, LinkValidator } from './link-validator';
import { LinuxState, LinuxProps, LinuxArgs, Linux } from './linux';
import { LogglyState, LogglyProps, LogglyArgs, Loggly } from './loggly';
import { MacOSState, MacOSProps, MacOSArgs, MacOS } from './macos';
import { MicrosoftTeamsState, MicrosoftTeamsProps, MicrosoftTeamsArgs, MicrosoftTeams } from './microsoft-teams';
import { NetlifyState, NetlifyProps, NetlifyArgs, Netlify } from './netlify';
import {
    NewRelicNotificationState,
    NewRelicNotificationProps,
    NewRelicNotificationArgs,
    NewRelicNotification
} from './new-relic-notification';
import { OperateSandboxState, OperateSandboxProps, OperateSandboxArgs, OperateSandbox } from './operate-sandbox';
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
import { ShopifyCLIState, ShopifyCLIProps, ShopifyCLIArgs, ShopifyCLI } from './shopify-cli';
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
import { SSHToSandboxState, SSHToSandboxProps, SSHToSandboxArgs, SSHToSandbox } from './ssh-to-sandbox';
import { SSLVerifyState, SSLVerifyProps, SSLVerifyArgs, SSLVerify } from './ssl-verify';
import { TCPMonitoringState, TCPMonitoringProps, TCPMonitoringArgs, TCPMonitoring } from './tcp-monitoring';
import {
    TelegramNotificationState,
    TelegramNotificationProps,
    TelegramNotificationArgs,
    TelegramNotification
} from './telegram-notification';
import { TransferToASandboxState, TransferToASandboxProps, TransferToASandboxArgs, TransferToASandbox } from './transfer-to-a-sandbox';
import { UpcloudState, UpcloudProps, UpcloudArgs, Upcloud } from './upcloud';
import { VisualTestsState, VisualTestsProps, VisualTestsArgs, VisualTests } from './visual-tests';
import { VultrState, VultrProps, VultrArgs, Vultr } from './vultr';
import { WaitForApplyState, WaitForApplyProps, WaitForApplyArgs, WaitForApply } from './wait-for-apply';
import { WebMonitoringState, WebMonitoringProps, WebMonitoringArgs, WebMonitoring } from './web-monitoring';
import { WebDAVState, WebDAVProps, WebDAVArgs, WebDAV } from './webdav';
import { WindowsState, WindowsProps, WindowsArgs, Windows } from './windows';
import { XCodeState, XCodeProps, XCodeArgs, XCode } from './xcode';
import { ZIPState, ZIPProps, ZIPArgs, ZIP } from './zip';

export * from './amazon-s3';
export * from './aws-cli-2';
export * from './aws-cli';
export * from './aws-ecs';
export * from './aws-lambda-deploy';
export * from './aws-lambda';
export * from './azure-cli';
export * from './azure-storage';
export * from './azure';
export * from './bugsnag';
export * from './build-a-cordova-app';
export * from './build-a-fastlane-app-ios';
export * from './build-a-flutter-app-ios';
export * from './build-a-react-native-app';
export * from './build-android-app';
export * from './build-docker-image';
export * from './build-flutter-app';
export * from './build';
export * from './clear-cache';
export * from './cloudflare';
export * from './cloudfront';
export * from './code-sign-and-export-an-ios-app';
export * from './codedeploy';
export * from './compress-images';
export * from './copy-files-from-another-pipeline';
export * from './create-new-sandbox';
export * from './datadog-notification';
export * from './datadog-service-check';
export * from './deploy-to-app-store-connect';
export * from './digitalocean-cdn';
export * from './digitalocean-cli';
export * from './digitalocean-spaces';
export * from './digitalocean';
export * from './discord-notification';
export * from './docker-cli';
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
export * from './generate-variables';
export * from './ghost-inspector';
export * from './git-push';
export * from './gitcrypt-lock';
export * from './gitcrypt-unlock';
export * from './github-cli';
export * from './gke-apply-deployment';
export * from './gke-kubectl';
export * from './gke-run-helm';
export * from './gke-run-job';
export * from './gke-run-pod';
export * from './gke-set-image';
export * from './google-app-engine';
export * from './google-cdn';
export * from './google-cloud-run';
export * from './google-cloud-storage';
export * from './google-compute-engine';
export * from './google-functions-deploy';
export * from './google-functions';
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
export * from './link-validator';
export * from './linux';
export * from './loggly';
export * from './macos';
export * from './microsoft-teams';
export * from './netlify';
export * from './new-relic-notification';
export * from './operate-sandbox';
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
export * from './shopify-cli';
export * from './shopify';
export * from './sign-android-application';
export * from './sign-bundle';
export * from './slack-notification';
export * from './sleep';
export * from './sms-notification';
export * from './split-tests';
export * from './ssh-command';
export * from './ssh-to-sandbox';
export * from './ssl-verify';
export * from './tcp-monitoring';
export * from './telegram-notification';
export * from './transfer-to-a-sandbox';
export * from './upcloud';
export * from './visual-tests';
export * from './vultr';
export * from './wait-for-apply';
export * from './web-monitoring';
export * from './webdav';
export * from './windows';
export * from './xcode';
export * from './zip';

export type ActionState =
    | AmazonS3State
    | AWSCLI2State
    | AWSCLIState
    | AWSECSState
    | AWSLambdaDeployState
    | AWSLambdaState
    | AzureCLIState
    | AzureStorageState
    | AzureState
    | BugsnagState
    | BuildACordovaAppState
    | BuildAFastlaneAppiOSState
    | BuildAFlutterAppiOSState
    | BuildAReactNativeAppState
    | BuildAndroidAppState
    | BuildDockerImageState
    | BuildFlutterAppState
    | BuildState
    | ClearCacheState
    | CloudflareState
    | CloudFrontState
    | CodeSignAndExportAnIOSAppState
    | CodeDeployState
    | CompressImagesState
    | CopyFilesFromAnotherPipelineState
    | CreateNewSandboxState
    | DatadogNotificationState
    | DatadogServiceCheckState
    | DeployToAppStoreConnectState
    | DigitalOceanCDNState
    | DigitalOceanCLIState
    | DigitalOceanSpacesState
    | DigitalOceanState
    | DiscordNotificationState
    | DockerCLIState
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
    | GenerateVariablesState
    | GhostInspectorState
    | GitPushState
    | GitcryptLockState
    | GitcryptUnlockState
    | GitHubCLIState
    | GKEApplyDeploymentState
    | GKEKubectlState
    | GKERunHelmState
    | GKERunJobState
    | GKERunPodState
    | GKESetImageState
    | GoogleAppEngineState
    | GoogleCDNState
    | GoogleCloudRunState
    | GoogleCloudStorageState
    | GoogleComputeEngineState
    | GoogleFunctionsDeployState
    | GoogleFunctionsState
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
    | LinkValidatorState
    | LinuxState
    | LogglyState
    | MacOSState
    | MicrosoftTeamsState
    | NetlifyState
    | NewRelicNotificationState
    | OperateSandboxState
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
    | ShopifyCLIState
    | ShopifyState
    | SignAndroidApplicationState
    | SignBundleState
    | SlackNotificationState
    | SleepState
    | SmsNotificationState
    | SplitTestsState
    | SSHCommandState
    | SSHToSandboxState
    | SSLVerifyState
    | TCPMonitoringState
    | TelegramNotificationState
    | TransferToASandboxState
    | UpcloudState
    | VisualTestsState
    | VultrState
    | WaitForApplyState
    | WebMonitoringState
    | WebDAVState
    | WindowsState
    | XCodeState
    | ZIPState;
export type ActionArgs =
    | AmazonS3Args
    | AWSCLI2Args
    | AWSCLIArgs
    | AWSECSArgs
    | AWSLambdaDeployArgs
    | AWSLambdaArgs
    | AzureCLIArgs
    | AzureStorageArgs
    | AzureArgs
    | BugsnagArgs
    | BuildACordovaAppArgs
    | BuildAFastlaneAppiOSArgs
    | BuildAFlutterAppiOSArgs
    | BuildAReactNativeAppArgs
    | BuildAndroidAppArgs
    | BuildDockerImageArgs
    | BuildFlutterAppArgs
    | BuildArgs
    | ClearCacheArgs
    | CloudflareArgs
    | CloudFrontArgs
    | CodeSignAndExportAnIOSAppArgs
    | CodeDeployArgs
    | CompressImagesArgs
    | CopyFilesFromAnotherPipelineArgs
    | CreateNewSandboxArgs
    | DatadogNotificationArgs
    | DatadogServiceCheckArgs
    | DeployToAppStoreConnectArgs
    | DigitalOceanCDNArgs
    | DigitalOceanCLIArgs
    | DigitalOceanSpacesArgs
    | DigitalOceanArgs
    | DiscordNotificationArgs
    | DockerCLIArgs
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
    | GenerateVariablesArgs
    | GhostInspectorArgs
    | GitPushArgs
    | GitcryptLockArgs
    | GitcryptUnlockArgs
    | GitHubCLIArgs
    | GKEApplyDeploymentArgs
    | GKEKubectlArgs
    | GKERunHelmArgs
    | GKERunJobArgs
    | GKERunPodArgs
    | GKESetImageArgs
    | GoogleAppEngineArgs
    | GoogleCDNArgs
    | GoogleCloudRunArgs
    | GoogleCloudStorageArgs
    | GoogleComputeEngineArgs
    | GoogleFunctionsDeployArgs
    | GoogleFunctionsArgs
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
    | LinkValidatorArgs
    | LinuxArgs
    | LogglyArgs
    | MacOSArgs
    | MicrosoftTeamsArgs
    | NetlifyArgs
    | NewRelicNotificationArgs
    | OperateSandboxArgs
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
    | ShopifyCLIArgs
    | ShopifyArgs
    | SignAndroidApplicationArgs
    | SignBundleArgs
    | SlackNotificationArgs
    | SleepArgs
    | SmsNotificationArgs
    | SplitTestsArgs
    | SSHCommandArgs
    | SSHToSandboxArgs
    | SSLVerifyArgs
    | TCPMonitoringArgs
    | TelegramNotificationArgs
    | TransferToASandboxArgs
    | UpcloudArgs
    | VisualTestsArgs
    | VultrArgs
    | WaitForApplyArgs
    | WebMonitoringArgs
    | WebDAVArgs
    | WindowsArgs
    | XCodeArgs
    | ZIPArgs;
export type ActionProps =
    | AmazonS3Props
    | AWSCLI2Props
    | AWSCLIProps
    | AWSECSProps
    | AWSLambdaDeployProps
    | AWSLambdaProps
    | AzureCLIProps
    | AzureStorageProps
    | AzureProps
    | BugsnagProps
    | BuildACordovaAppProps
    | BuildAFastlaneAppiOSProps
    | BuildAFlutterAppiOSProps
    | BuildAReactNativeAppProps
    | BuildAndroidAppProps
    | BuildDockerImageProps
    | BuildFlutterAppProps
    | BuildProps
    | ClearCacheProps
    | CloudflareProps
    | CloudFrontProps
    | CodeSignAndExportAnIOSAppProps
    | CodeDeployProps
    | CompressImagesProps
    | CopyFilesFromAnotherPipelineProps
    | CreateNewSandboxProps
    | DatadogNotificationProps
    | DatadogServiceCheckProps
    | DeployToAppStoreConnectProps
    | DigitalOceanCDNProps
    | DigitalOceanCLIProps
    | DigitalOceanSpacesProps
    | DigitalOceanProps
    | DiscordNotificationProps
    | DockerCLIProps
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
    | GenerateVariablesProps
    | GhostInspectorProps
    | GitPushProps
    | GitcryptLockProps
    | GitcryptUnlockProps
    | GitHubCLIProps
    | GKEApplyDeploymentProps
    | GKEKubectlProps
    | GKERunHelmProps
    | GKERunJobProps
    | GKERunPodProps
    | GKESetImageProps
    | GoogleAppEngineProps
    | GoogleCDNProps
    | GoogleCloudRunProps
    | GoogleCloudStorageProps
    | GoogleComputeEngineProps
    | GoogleFunctionsDeployProps
    | GoogleFunctionsProps
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
    | LinkValidatorProps
    | LinuxProps
    | LogglyProps
    | MacOSProps
    | MicrosoftTeamsProps
    | NetlifyProps
    | NewRelicNotificationProps
    | OperateSandboxProps
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
    | ShopifyCLIProps
    | ShopifyProps
    | SignAndroidApplicationProps
    | SignBundleProps
    | SlackNotificationProps
    | SleepProps
    | SmsNotificationProps
    | SplitTestsProps
    | SSHCommandProps
    | SSHToSandboxProps
    | SSLVerifyProps
    | TCPMonitoringProps
    | TelegramNotificationProps
    | TransferToASandboxProps
    | UpcloudProps
    | VisualTestsProps
    | VultrProps
    | WaitForApplyProps
    | WebMonitoringProps
    | WebDAVProps
    | WindowsProps
    | XCodeProps
    | ZIPProps;
export type Action =
    | AmazonS3
    | AWSCLI2
    | AWSCLI
    | AWSECS
    | AWSLambdaDeploy
    | AWSLambda
    | AzureCLI
    | AzureStorage
    | Azure
    | Bugsnag
    | BuildACordovaApp
    | BuildAFastlaneAppiOS
    | BuildAFlutterAppiOS
    | BuildAReactNativeApp
    | BuildAndroidApp
    | BuildDockerImage
    | BuildFlutterApp
    | Build
    | ClearCache
    | Cloudflare
    | CloudFront
    | CodeSignAndExportAnIOSApp
    | CodeDeploy
    | CompressImages
    | CopyFilesFromAnotherPipeline
    | CreateNewSandbox
    | DatadogNotification
    | DatadogServiceCheck
    | DeployToAppStoreConnect
    | DigitalOceanCDN
    | DigitalOceanCLI
    | DigitalOceanSpaces
    | DigitalOcean
    | DiscordNotification
    | DockerCLI
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
    | GenerateVariables
    | GhostInspector
    | GitPush
    | GitcryptLock
    | GitcryptUnlock
    | GitHubCLI
    | GKEApplyDeployment
    | GKEKubectl
    | GKERunHelm
    | GKERunJob
    | GKERunPod
    | GKESetImage
    | GoogleAppEngine
    | GoogleCDN
    | GoogleCloudRun
    | GoogleCloudStorage
    | GoogleComputeEngine
    | GoogleFunctionsDeploy
    | GoogleFunctions
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
    | LinkValidator
    | Linux
    | Loggly
    | MacOS
    | MicrosoftTeams
    | Netlify
    | NewRelicNotification
    | OperateSandbox
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
    | ShopifyCLI
    | Shopify
    | SignAndroidApplication
    | SignBundle
    | SlackNotification
    | Sleep
    | SmsNotification
    | SplitTests
    | SSHCommand
    | SSHToSandbox
    | SSLVerify
    | TCPMonitoring
    | TelegramNotification
    | TransferToASandbox
    | Upcloud
    | VisualTests
    | Vultr
    | WaitForApply
    | WebMonitoring
    | WebDAV
    | Windows
    | XCode
    | ZIP;
