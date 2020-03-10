const { exec } = require('pkg');
import Axios from 'axios';
import * as fs from 'fs-extra';
import * as tar from 'tar';
import { format } from 'util';
import * as chalk from 'chalk';

import concatStream = require('concat-stream');
import { Parse as TarParser } from 'tar';
import { PassThrough as PassThroughStream } from 'stream';

type TargetSystem = 'darwin' | 'linux' | 'windows';
const TARGET_SYSTEMS: ReadonlyArray<TargetSystem> = ['darwin', 'linux', 'windows'];

type TargetArch = 'amd64';
const TARGET_ARCHS: ReadonlyArray<TargetArch> = ['amd64'];

type TargetNodeVersion = '12'; // 12.13.1
const TARGET_NODE_VERSION: TargetNodeVersion = '12';

type Mapping<T extends string> = { [P in T]: string };

const GRPC_SYSTEM_MAPPING: Mapping<TargetSystem> = {
    darwin: 'darwin',
    linux: 'linux',
    windows: 'win32'
};

const GRPC_LIBC_MAPPING: Mapping<TargetSystem> = {
    darwin: 'unknown',
    linux: 'glibc',
    windows: 'unknown'
};

const GRPC_ARCH_MAPPING: Mapping<TargetArch> = {
    amd64: 'x64'
};

const GRPC_V8_MAPPING: Mapping<TargetNodeVersion> = {
    '12': 'v72'
};

const PKG_SYSTEM_MAPPING: Mapping<TargetSystem> = {
    darwin: 'macos',
    linux: 'linux',
    windows: 'win'
};

const PKG_ARCH_MAPPING: Mapping<TargetArch> = {
    amd64: 'x64'
};

const PKG_JSON = require('../package');
const PLUGIN_NAME = 'pulumi-buddy';
const GRPC_PKG_JSON = require('grpc/package');
const GRPC_BUNDLE_PATH = '%sgrpc/v%s/node-%s-%s-%s-%s.tar.gz'; // version, v8 version, arch, glibc
const BUNDLE_DIR = `${__dirname}/../bundles`;

async function main() {
    await fs.remove(BUNDLE_DIR);

    for (const system of TARGET_SYSTEMS) {
        for (const arch of TARGET_ARCHS) {
            console.log(chalk.cyan.bold('Build'), chalk.gray(`node${TARGET_NODE_VERSION}-${system}-${arch}`));
            const pkgSystem = PKG_SYSTEM_MAPPING[system];
            const pkgArch = PKG_ARCH_MAPPING[arch];

            const bundleName = `${PLUGIN_NAME}-v${PKG_JSON.version}-${system}-${arch}`;
            const bundleDir = `${BUNDLE_DIR}/${bundleName}`;

            const exeName = `pulumi-resource-${PLUGIN_NAME}${system === 'windows' ? '.exe' : ''}`;

            const dist = `${bundleDir}/${exeName}`;

            console.log(chalk.blue('Pkg'), chalk.gray(`node${TARGET_NODE_VERSION}-${pkgSystem}-${pkgArch}`));
            await exec([`${__dirname}/../.build`, '--target', `node${TARGET_NODE_VERSION}-${pkgSystem}-${pkgArch}`, '--output', dist]);

            const grpcBinary = format(
                GRPC_BUNDLE_PATH,
                GRPC_PKG_JSON.binary.host,
                GRPC_PKG_JSON.version,
                GRPC_V8_MAPPING[TARGET_NODE_VERSION],
                GRPC_SYSTEM_MAPPING[system],
                GRPC_ARCH_MAPPING[arch],
                GRPC_LIBC_MAPPING[system]
            );
            const { data } = await Axios.get<ArrayBuffer>(grpcBinary, { responseType: 'arraybuffer' });

            console.log(chalk.blue('Download GRPC binary'), chalk.gray(grpcBinary));
            const file = await extractFileFromTarball(
                Buffer.from(data),
                `node-${GRPC_V8_MAPPING[TARGET_NODE_VERSION]}-${GRPC_SYSTEM_MAPPING[system]}-${GRPC_ARCH_MAPPING[arch]}-${GRPC_LIBC_MAPPING[system]}/grpc_node.node`
            );

            await fs.writeFile(`${bundleDir}/grpc_node.node`, file);

            console.log(chalk.blue('Pack'), chalk.gray(`${bundleName}.tar.gz`));
            await tar.create(
                {
                    file: `${BUNDLE_DIR}/${bundleName}.tar.gz`,
                    cwd: bundleDir,
                    gzip: {
                        level: 9
                    }
                },
                [exeName, 'grpc_node.node']
            );

            console.log();
        }
    }
}

function bufferToStream(buffer: Buffer): NodeJS.ReadableStream {
    const stream = new PassThroughStream();
    stream.end(buffer);
    return stream;
}

export function extractFileFromTarball(tarball: Buffer, filePath: string): Promise<Buffer> {
    return new Promise<Buffer>((resolve, reject) => {
        let success = false;
        const parser = new (TarParser as any)({
            strict: true,
            filter: (currentPath: string) => {
                const match = currentPath === filePath;
                if (match) success = true;
                return match;
            },
            onentry: (entry: NodeJS.ReadableStream) => entry.pipe(concatStream(resolve))
        });
        bufferToStream(tarball)
            .pipe(parser)
            .on('end', () => {
                if (!success) {
                    reject(new Error(`Could not find file '${filePath}' in tarball.`));
                }
            })
            .on('error', reject);
    });
}

if (require.main === module) {
    main().catch(err => {
        console.error(err);
        process.exit(1);
    });
}
