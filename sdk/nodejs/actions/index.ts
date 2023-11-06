import { AmazonS3State, AmazonS3Props, AmazonS3Args, AmazonS3 } from './amazon-s3';
import { AWSAppRunnerDeployState, AWSAppRunnerDeployProps, AWSAppRunnerDeployArgs, AWSAppRunnerDeploy } from './aws-app-runner-deploy';
import { AWSAppRunnerMonitorState, AWSAppRunnerMonitorProps, AWSAppRunnerMonitorArgs, AWSAppRunnerMonitor } from './aws-app-runner-monitor';
import { AWSCDKCLIState, AWSCDKCLIProps, AWSCDKCLIArgs, AWSCDKCLI } from './aws-cdk-cli';
import { AWSCLI2State, AWSCLI2Props, AWSCLI2Args, AWSCLI2 } from './aws-cli-2';
import { AWSCLIState, AWSCLIProps, AWSCLIArgs, AWSCLI } from './aws-cli';
import { AWSCodePipelineState, AWSCodePipelineProps, AWSCodePipelineArgs, AWSCodePipeline } from './aws-codepipeline';
import { AWSECSState, AWSECSProps, AWSECSArgs, AWSECS } from './aws-ecs';
import { AWSLambdaDeployState, AWSLambdaDeployProps, AWSLambdaDeployArgs, AWSLambdaDeploy } from './aws-lambda-deploy';
import { AWSLambdaState, AWSLambdaProps, AWSLambdaArgs, AWSLambda } from './aws-lambda';
import { AzureCLIState, AzureCLIProps, AzureCLIArgs, AzureCLI } from './azure-cli';
import { AzureStorageState, AzureStorageProps, AzureStorageArgs, AzureStorage } from './azure-storage';
import { AzureState, AzureProps, AzureArgs, Azure } from './azure';
import { BackblazeB2State, BackblazeB2Props, BackblazeB2Args, BackblazeB2 } from './backblaze-b2';
import { BlackfireState, BlackfireProps, BlackfireArgs, Blackfire } from './blackfire';
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
import { BuildApplicationState, BuildApplicationProps, BuildApplicationArgs, BuildApplication } from './build-application';
import { BuildDockerImageState, BuildDockerImageProps, BuildDockerImageArgs, BuildDockerImage } from './build-docker-image';
import { BuildFlutterAppState, BuildFlutterAppProps, BuildFlutterAppArgs, BuildFlutterApp } from './build-flutter-app';
import { BuildMultiArchImageState, BuildMultiArchImageProps, BuildMultiArchImageArgs, BuildMultiArchImage } from './build-multi-arch-image';
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
import { CopyFilesState, CopyFilesProps, CopyFilesArgs, CopyFiles } from './copy-files';
import { CreateNewSandboxState, CreateNewSandboxProps, CreateNewSandboxArgs, CreateNewSandbox } from './create-new-sandbox';
import { CustomState, CustomProps, CustomArgs, Custom } from './custom';
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
import { DockerState, DockerProps, DockerArgs, Docker } from './docker';
import { DockerfileLinterState, DockerfileLinterProps, DockerfileLinterArgs, DockerfileLinter } from './dockerfile-linter';
import { DownloadBackblazeB2State, DownloadBackblazeB2Props, DownloadBackblazeB2Args, DownloadBackblazeB2 } from './download-backblaze-b2';
import { DownloadFromSandboxState, DownloadFromSandboxProps, DownloadFromSandboxArgs, DownloadFromSandbox } from './download-from-sandbox';
import { DownloadFTPState, DownloadFTPProps, DownloadFTPArgs, DownloadFTP } from './download-ftp';
import { DownloadFTPSState, DownloadFTPSProps, DownloadFTPSArgs, DownloadFTPS } from './download-ftps';
import { DownloadGCSState, DownloadGCSProps, DownloadGCSArgs, DownloadGCS } from './download-gcs';
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
import { GhostInspectorCLIState, GhostInspectorCLIProps, GhostInspectorCLIArgs, GhostInspectorCLI } from './ghost-inspector-cli';
import { GhostInspectorState, GhostInspectorProps, GhostInspectorArgs, GhostInspector } from './ghost-inspector';
import { GitPushState, GitPushProps, GitPushArgs, GitPush } from './git-push';
import { GitcryptLockState, GitcryptLockProps, GitcryptLockArgs, GitcryptLock } from './gitcrypt-lock';
import { GitcryptUnlockState, GitcryptUnlockProps, GitcryptUnlockArgs, GitcryptUnlock } from './gitcrypt-unlock';
import { GitHubCLIState, GitHubCLIProps, GitHubCLIArgs, GitHubCLI } from './github-cli';
import { GitHubReleaseState, GitHubReleaseProps, GitHubReleaseArgs, GitHubRelease } from './github-release';
import { GitLabCLIState, GitLabCLIProps, GitLabCLIArgs, GitLabCLI } from './gitlab-cli';
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
import { JMeterCLIState, JMeterCLIProps, JMeterCLIArgs, JMeterCLI } from './jmeter-cli';
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
import { LinkCheckerState, LinkCheckerProps, LinkCheckerArgs, LinkChecker } from './link-checker';
import { LinuxState, LinuxProps, LinuxArgs, Linux } from './linux';
import { LogglyState, LogglyProps, LogglyArgs, Loggly } from './loggly';
import { MacOSState, MacOSProps, MacOSArgs, MacOS } from './macos';
import { MicrosoftTeamsState, MicrosoftTeamsProps, MicrosoftTeamsArgs, MicrosoftTeams } from './microsoft-teams';
import { NetlifyState, NetlifyProps, NetlifyArgs, Netlify } from './netlify';
import { NewRelicCLIState, NewRelicCLIProps, NewRelicCLIArgs, NewRelicCLI } from './new-relic-cli';
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
import { SentryNotificationState, SentryNotificationProps, SentryNotificationArgs, SentryNotification } from './sentry-notification';
import { SetVariablesState, SetVariablesProps, SetVariablesArgs, SetVariables } from './set-variables';
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
import { StackHawkCLIState, StackHawkCLIProps, StackHawkCLIArgs, StackHawkCLI } from './stackhawk-cli';
import { TCPMonitoringState, TCPMonitoringProps, TCPMonitoringArgs, TCPMonitoring } from './tcp-monitoring';
import {
    TelegramNotificationState,
    TelegramNotificationProps,
    TelegramNotificationArgs,
    TelegramNotification
} from './telegram-notification';
import { TerraformCLIState, TerraformCLIProps, TerraformCLIArgs, TerraformCLI } from './terraform-cli';
import { ThemeKitCLIState, ThemeKitCLIProps, ThemeKitCLIArgs, ThemeKitCLI } from './theme-kit-cli';
import { TransferToASandboxState, TransferToASandboxProps, TransferToASandboxArgs, TransferToASandbox } from './transfer-to-a-sandbox';
import { TriggerPipelineState, TriggerPipelineProps, TriggerPipelineArgs, TriggerPipeline } from './trigger-pipeline';
import { UpcloudState, UpcloudProps, UpcloudArgs, Upcloud } from './upcloud';
import { VisualTestsState, VisualTestsProps, VisualTestsArgs, VisualTests } from './visual-tests';
import { VultrState, VultrProps, VultrArgs, Vultr } from './vultr';
import { WaitForApplyState, WaitForApplyProps, WaitForApplyArgs, WaitForApply } from './wait-for-apply';
import { WebMonitoringState, WebMonitoringProps, WebMonitoringArgs, WebMonitoring } from './web-monitoring';
import { WebDAVState, WebDAVProps, WebDAVArgs, WebDAV } from './webdav';
import { WindowsState, WindowsProps, WindowsArgs, Windows } from './windows';
import { WPCLIState, WPCLIProps, WPCLIArgs, WPCLI } from './wp-cli';
import { XcodeState, XcodeProps, XcodeArgs, Xcode } from './xcode';
import { ZIPState, ZIPProps, ZIPArgs, ZIP } from './zip';

export * from './amazon-s3';
export * from './aws-app-runner-deploy';
export * from './aws-app-runner-monitor';
export * from './aws-cdk-cli';
export * from './aws-cli-2';
export * from './aws-cli';
export * from './aws-codepipeline';
export * from './aws-ecs';
export * from './aws-lambda-deploy';
export * from './aws-lambda';
export * from './azure-cli';
export * from './azure-storage';
export * from './azure';
export * from './backblaze-b2';
export * from './blackfire';
export * from './bugsnag';
export * from './build-a-cordova-app';
export * from './build-a-fastlane-app-ios';
export * from './build-a-flutter-app-ios';
export * from './build-a-react-native-app';
export * from './build-android-app';
export * from './build-application';
export * from './build-docker-image';
export * from './build-flutter-app';
export * from './build-multi-arch-image';
export * from './clear-cache';
export * from './cloudflare';
export * from './cloudfront';
export * from './code-sign-and-export-an-ios-app';
export * from './codedeploy';
export * from './compress-images';
export * from './copy-files';
export * from './create-new-sandbox';
export * from './custom';
export * from './datadog-notification';
export * from './datadog-service-check';
export * from './deploy-to-app-store-connect';
export * from './digitalocean-cdn';
export * from './digitalocean-cli';
export * from './digitalocean-spaces';
export * from './digitalocean';
export * from './discord-notification';
export * from './docker-cli';
export * from './docker';
export * from './dockerfile-linter';
export * from './download-backblaze-b2';
export * from './download-from-sandbox';
export * from './download-ftp';
export * from './download-ftps';
export * from './download-gcs';
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
export * from './ghost-inspector-cli';
export * from './ghost-inspector';
export * from './git-push';
export * from './gitcrypt-lock';
export * from './gitcrypt-unlock';
export * from './github-cli';
export * from './github-release';
export * from './gitlab-cli';
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
export * from './jmeter-cli';
export * from './kubernetes-apply-deployment-configuration';
export * from './kubernetes-kubectl';
export * from './kubernetes-run-helm-cmds';
export * from './kubernetes-run-pod';
export * from './kubernetes-set-image';
export * from './lighthouse';
export * from './link-checker';
export * from './linux';
export * from './loggly';
export * from './macos';
export * from './microsoft-teams';
export * from './netlify';
export * from './new-relic-cli';
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
export * from './sentry-notification';
export * from './set-variables';
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
export * from './stackhawk-cli';
export * from './tcp-monitoring';
export * from './telegram-notification';
export * from './terraform-cli';
export * from './theme-kit-cli';
export * from './transfer-to-a-sandbox';
export * from './trigger-pipeline';
export * from './upcloud';
export * from './visual-tests';
export * from './vultr';
export * from './wait-for-apply';
export * from './web-monitoring';
export * from './webdav';
export * from './windows';
export * from './wp-cli';
export * from './xcode';
export * from './zip';

export type ActionState =
    | AmazonS3State
    | AWSAppRunnerDeployState
    | AWSAppRunnerMonitorState
    | AWSCDKCLIState
    | AWSCLI2State
    | AWSCLIState
    | AWSCodePipelineState
    | AWSECSState
    | AWSLambdaDeployState
    | AWSLambdaState
    | AzureCLIState
    | AzureStorageState
    | AzureState
    | BackblazeB2State
    | BlackfireState
    | BugsnagState
    | BuildACordovaAppState
    | BuildAFastlaneAppiOSState
    | BuildAFlutterAppiOSState
    | BuildAReactNativeAppState
    | BuildAndroidAppState
    | BuildApplicationState
    | BuildDockerImageState
    | BuildFlutterAppState
    | BuildMultiArchImageState
    | ClearCacheState
    | CloudflareState
    | CloudFrontState
    | CodeSignAndExportAnIOSAppState
    | CodeDeployState
    | CompressImagesState
    | CopyFilesState
    | CreateNewSandboxState
    | CustomState
    | DatadogNotificationState
    | DatadogServiceCheckState
    | DeployToAppStoreConnectState
    | DigitalOceanCDNState
    | DigitalOceanCLIState
    | DigitalOceanSpacesState
    | DigitalOceanState
    | DiscordNotificationState
    | DockerCLIState
    | DockerState
    | DockerfileLinterState
    | DownloadBackblazeB2State
    | DownloadFromSandboxState
    | DownloadFTPState
    | DownloadFTPSState
    | DownloadGCSState
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
    | GhostInspectorCLIState
    | GhostInspectorState
    | GitPushState
    | GitcryptLockState
    | GitcryptUnlockState
    | GitHubCLIState
    | GitHubReleaseState
    | GitLabCLIState
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
    | JMeterCLIState
    | KubernetesApplyDeploymentConfigurationState
    | KubernetesKubectlState
    | KubernetesRunHelmCMDsState
    | KubernetesRunPodState
    | KubernetesSetImageState
    | LighthouseState
    | LinkCheckerState
    | LinuxState
    | LogglyState
    | MacOSState
    | MicrosoftTeamsState
    | NetlifyState
    | NewRelicCLIState
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
    | SentryNotificationState
    | SetVariablesState
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
    | StackHawkCLIState
    | TCPMonitoringState
    | TelegramNotificationState
    | TerraformCLIState
    | ThemeKitCLIState
    | TransferToASandboxState
    | TriggerPipelineState
    | UpcloudState
    | VisualTestsState
    | VultrState
    | WaitForApplyState
    | WebMonitoringState
    | WebDAVState
    | WindowsState
    | WPCLIState
    | XcodeState
    | ZIPState;
export type ActionArgs =
    | AmazonS3Args
    | AWSAppRunnerDeployArgs
    | AWSAppRunnerMonitorArgs
    | AWSCDKCLIArgs
    | AWSCLI2Args
    | AWSCLIArgs
    | AWSCodePipelineArgs
    | AWSECSArgs
    | AWSLambdaDeployArgs
    | AWSLambdaArgs
    | AzureCLIArgs
    | AzureStorageArgs
    | AzureArgs
    | BackblazeB2Args
    | BlackfireArgs
    | BugsnagArgs
    | BuildACordovaAppArgs
    | BuildAFastlaneAppiOSArgs
    | BuildAFlutterAppiOSArgs
    | BuildAReactNativeAppArgs
    | BuildAndroidAppArgs
    | BuildApplicationArgs
    | BuildDockerImageArgs
    | BuildFlutterAppArgs
    | BuildMultiArchImageArgs
    | ClearCacheArgs
    | CloudflareArgs
    | CloudFrontArgs
    | CodeSignAndExportAnIOSAppArgs
    | CodeDeployArgs
    | CompressImagesArgs
    | CopyFilesArgs
    | CreateNewSandboxArgs
    | CustomArgs
    | DatadogNotificationArgs
    | DatadogServiceCheckArgs
    | DeployToAppStoreConnectArgs
    | DigitalOceanCDNArgs
    | DigitalOceanCLIArgs
    | DigitalOceanSpacesArgs
    | DigitalOceanArgs
    | DiscordNotificationArgs
    | DockerCLIArgs
    | DockerArgs
    | DockerfileLinterArgs
    | DownloadBackblazeB2Args
    | DownloadFromSandboxArgs
    | DownloadFTPArgs
    | DownloadFTPSArgs
    | DownloadGCSArgs
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
    | GhostInspectorCLIArgs
    | GhostInspectorArgs
    | GitPushArgs
    | GitcryptLockArgs
    | GitcryptUnlockArgs
    | GitHubCLIArgs
    | GitHubReleaseArgs
    | GitLabCLIArgs
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
    | JMeterCLIArgs
    | KubernetesApplyDeploymentConfigurationArgs
    | KubernetesKubectlArgs
    | KubernetesRunHelmCMDsArgs
    | KubernetesRunPodArgs
    | KubernetesSetImageArgs
    | LighthouseArgs
    | LinkCheckerArgs
    | LinuxArgs
    | LogglyArgs
    | MacOSArgs
    | MicrosoftTeamsArgs
    | NetlifyArgs
    | NewRelicCLIArgs
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
    | SentryNotificationArgs
    | SetVariablesArgs
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
    | StackHawkCLIArgs
    | TCPMonitoringArgs
    | TelegramNotificationArgs
    | TerraformCLIArgs
    | ThemeKitCLIArgs
    | TransferToASandboxArgs
    | TriggerPipelineArgs
    | UpcloudArgs
    | VisualTestsArgs
    | VultrArgs
    | WaitForApplyArgs
    | WebMonitoringArgs
    | WebDAVArgs
    | WindowsArgs
    | WPCLIArgs
    | XcodeArgs
    | ZIPArgs;
export type ActionProps =
    | AmazonS3Props
    | AWSAppRunnerDeployProps
    | AWSAppRunnerMonitorProps
    | AWSCDKCLIProps
    | AWSCLI2Props
    | AWSCLIProps
    | AWSCodePipelineProps
    | AWSECSProps
    | AWSLambdaDeployProps
    | AWSLambdaProps
    | AzureCLIProps
    | AzureStorageProps
    | AzureProps
    | BackblazeB2Props
    | BlackfireProps
    | BugsnagProps
    | BuildACordovaAppProps
    | BuildAFastlaneAppiOSProps
    | BuildAFlutterAppiOSProps
    | BuildAReactNativeAppProps
    | BuildAndroidAppProps
    | BuildApplicationProps
    | BuildDockerImageProps
    | BuildFlutterAppProps
    | BuildMultiArchImageProps
    | ClearCacheProps
    | CloudflareProps
    | CloudFrontProps
    | CodeSignAndExportAnIOSAppProps
    | CodeDeployProps
    | CompressImagesProps
    | CopyFilesProps
    | CreateNewSandboxProps
    | CustomProps
    | DatadogNotificationProps
    | DatadogServiceCheckProps
    | DeployToAppStoreConnectProps
    | DigitalOceanCDNProps
    | DigitalOceanCLIProps
    | DigitalOceanSpacesProps
    | DigitalOceanProps
    | DiscordNotificationProps
    | DockerCLIProps
    | DockerProps
    | DockerfileLinterProps
    | DownloadBackblazeB2Props
    | DownloadFromSandboxProps
    | DownloadFTPProps
    | DownloadFTPSProps
    | DownloadGCSProps
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
    | GhostInspectorCLIProps
    | GhostInspectorProps
    | GitPushProps
    | GitcryptLockProps
    | GitcryptUnlockProps
    | GitHubCLIProps
    | GitHubReleaseProps
    | GitLabCLIProps
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
    | JMeterCLIProps
    | KubernetesApplyDeploymentConfigurationProps
    | KubernetesKubectlProps
    | KubernetesRunHelmCMDsProps
    | KubernetesRunPodProps
    | KubernetesSetImageProps
    | LighthouseProps
    | LinkCheckerProps
    | LinuxProps
    | LogglyProps
    | MacOSProps
    | MicrosoftTeamsProps
    | NetlifyProps
    | NewRelicCLIProps
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
    | SentryNotificationProps
    | SetVariablesProps
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
    | StackHawkCLIProps
    | TCPMonitoringProps
    | TelegramNotificationProps
    | TerraformCLIProps
    | ThemeKitCLIProps
    | TransferToASandboxProps
    | TriggerPipelineProps
    | UpcloudProps
    | VisualTestsProps
    | VultrProps
    | WaitForApplyProps
    | WebMonitoringProps
    | WebDAVProps
    | WindowsProps
    | WPCLIProps
    | XcodeProps
    | ZIPProps;
export type Action =
    | AmazonS3
    | AWSAppRunnerDeploy
    | AWSAppRunnerMonitor
    | AWSCDKCLI
    | AWSCLI2
    | AWSCLI
    | AWSCodePipeline
    | AWSECS
    | AWSLambdaDeploy
    | AWSLambda
    | AzureCLI
    | AzureStorage
    | Azure
    | BackblazeB2
    | Blackfire
    | Bugsnag
    | BuildACordovaApp
    | BuildAFastlaneAppiOS
    | BuildAFlutterAppiOS
    | BuildAReactNativeApp
    | BuildAndroidApp
    | BuildApplication
    | BuildDockerImage
    | BuildFlutterApp
    | BuildMultiArchImage
    | ClearCache
    | Cloudflare
    | CloudFront
    | CodeSignAndExportAnIOSApp
    | CodeDeploy
    | CompressImages
    | CopyFiles
    | CreateNewSandbox
    | Custom
    | DatadogNotification
    | DatadogServiceCheck
    | DeployToAppStoreConnect
    | DigitalOceanCDN
    | DigitalOceanCLI
    | DigitalOceanSpaces
    | DigitalOcean
    | DiscordNotification
    | DockerCLI
    | Docker
    | DockerfileLinter
    | DownloadBackblazeB2
    | DownloadFromSandbox
    | DownloadFTP
    | DownloadFTPS
    | DownloadGCS
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
    | GhostInspectorCLI
    | GhostInspector
    | GitPush
    | GitcryptLock
    | GitcryptUnlock
    | GitHubCLI
    | GitHubRelease
    | GitLabCLI
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
    | JMeterCLI
    | KubernetesApplyDeploymentConfiguration
    | KubernetesKubectl
    | KubernetesRunHelmCMDs
    | KubernetesRunPod
    | KubernetesSetImage
    | Lighthouse
    | LinkChecker
    | Linux
    | Loggly
    | MacOS
    | MicrosoftTeams
    | Netlify
    | NewRelicCLI
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
    | SentryNotification
    | SetVariables
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
    | StackHawkCLI
    | TCPMonitoring
    | TelegramNotification
    | TerraformCLI
    | ThemeKitCLI
    | TransferToASandbox
    | TriggerPipeline
    | Upcloud
    | VisualTests
    | Vultr
    | WaitForApply
    | WebMonitoring
    | WebDAV
    | Windows
    | WPCLI
    | Xcode
    | ZIP;
