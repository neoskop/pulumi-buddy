const { exec } = require('pkg');
import Axios from 'axios';
import * as fs from 'fs-extra';
import * as tar from 'tar';
import { format } from 'util';
import concatStream = require('concat-stream');
import { Parse as TarParser } from 'tar';
import { PassThrough as PassThroughStream } from 'stream';
import { Config } from './config';
import { Mapping } from './mapping';
import { step, info } from '../cli-utils';

const GRPC_PKG_JSON = require('grpc/package');
const GRPC_BUNDLE_PATH = '%sgrpc/v%s/node-%s-%s-%s-%s.tar.gz';

export async function bundle(name: string, version: string, srcDir: string, targetDir: string): Promise<string[]> {
    await fs.remove(targetDir);

    const bundles: string[] = [];

    for (const system of Config.Target.Systems) {
        for (const arch of Config.Target.Archs) {
            step('Build', `node${Config.Target.NodeVersion}-${system}-${arch}`);
            const pkgSystem = Mapping.Pkg.System[system];
            const pkgArch = Mapping.Pkg.Arch[arch];

            const bundleName = `pulumi-resource-${name}-v${version}-${system}-${arch}`;
            const bundleDir = `${targetDir}/${bundleName}`;

            const exeName = `pulumi-resource-${name}${system === 'windows' ? '.exe' : ''}`;

            const dist = `${bundleDir}/${exeName}`;

            info('Pkg', `node${Config.Target.NodeVersion}-${pkgSystem}-${pkgArch}`);
            await exec([srcDir, '--target', `node${Config.Target.NodeVersion}-${pkgSystem}-${pkgArch}`, '--output', dist]);

            const grpcBinary = format(
                GRPC_BUNDLE_PATH,
                GRPC_PKG_JSON.binary.host,
                GRPC_PKG_JSON.version,
                Mapping.Grpc.V8[Config.Target.NodeVersion],
                Mapping.Grpc.System[system],
                Mapping.Grpc.Arch[arch],
                Mapping.Grpc.Libc[system]
            );
            const { data } = await Axios.get<ArrayBuffer>(grpcBinary, { responseType: 'arraybuffer' });

            info('Download GRPC binary', grpcBinary);
            const file = await extractFileFromTarball(
                Buffer.from(data),
                `node-${Mapping.Grpc.V8[Config.Target.NodeVersion]}-${Mapping.Grpc.System[system]}-${Mapping.Grpc.Arch[arch]}-${
                    Mapping.Grpc.Libc[system]
                }/grpc_node.node`
            );

            await fs.writeFile(`${bundleDir}/grpc_node.node`, file);

            info('Pack', `${bundleName}.tar.gz`);
            await tar.create(
                {
                    file: `${targetDir}/${bundleName}.tar.gz`,
                    cwd: bundleDir,
                    gzip: {
                        level: 9
                    }
                },
                [exeName, 'grpc_node.node']
            );
            bundles.push(`${targetDir}/${bundleName}.tar.gz`);
        }
    }

    return bundles;
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
