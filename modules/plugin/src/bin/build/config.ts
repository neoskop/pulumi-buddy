export type TargetSystem = 'darwin' | 'linux' | 'windows';
export type TargetArch = 'amd64';
export type TargetNodeVersion = '12'; // 12.13.1

export namespace Config {
    export namespace Target {
        export const Systems: ReadonlyArray<TargetSystem> = ['darwin', 'linux', 'windows'];
        export const Archs: ReadonlyArray<TargetArch> = ['amd64'];
        export const NodeVersion: TargetNodeVersion = '12';
    }
}
