import { TargetSystem, TargetArch, TargetNodeVersion } from './config';

export type Mapping<T extends string> = { [P in T]: string };

export namespace Mapping {
    export namespace Grpc {
        export const System: Mapping<TargetSystem> = {
            darwin: 'darwin',
            linux: 'linux',
            windows: 'win32'
        };

        export const Libc: Mapping<TargetSystem> = {
            darwin: 'unknown',
            linux: 'glibc',
            windows: 'unknown'
        };

        export const Arch: Mapping<TargetArch> = {
            amd64: 'x64'
        };

        export const V8: Mapping<TargetNodeVersion> = {
            '12': 'v72'
        };
    }

    export namespace Pkg {
        export const System: Mapping<TargetSystem> = {
            darwin: 'macos',
            linux: 'linux',
            windows: 'win'
        };

        export const Arch: Mapping<TargetArch> = {
            amd64: 'x64'
        };
    }
}
