import * as fs from 'fs-extra';
import * as execa from 'execa';
import * as path from 'path';
import * as cp from 'child_process';
import { step, info } from '../cli-utils';

export async function build(targetDir: string) {
    await fs.remove(targetDir);
    await fs.mkdirp(targetDir);

    step('Install dependencies');
    const yarnInstall = execa('yarn', ['--frozen-lockfile', '--non-interactive'], { cwd: path.resolve(__dirname, '../../../../..') });
    yarnInstall.stdout?.on('data', c => info('Yarn', c.toString().trim()));
    await yarnInstall;

    step('Build SDK');
    const buildSdk = execa('yarn', ['build'], { cwd: path.resolve(__dirname, '../../../../../sdk/nodejs') });
    buildSdk.stdout?.on('data', c => info('Build', c.toString().trim()));
    await buildSdk;

    step('Build Plugin');
    const buildPlugin = execa('yarn', ['build'], { cwd: path.resolve(__dirname, '../../..') });
    buildPlugin.stdout?.on('data', c => info('Build', c.toString().trim()));
    await buildPlugin;

    step('Copy bundle files');
    info('Copy', 'sources');
    cp.execSync(`tar --exclude-from=.npmignore --exclude .build -cv . | (cd ${targetDir} && tar -x)`, {
        cwd: path.resolve(__dirname, '../../..'),
        stdio: [null, 'ignore', null]
    });

    info('Copy', 'package.json');
    const pkg = require('../../../package.json');
    delete pkg.dependencies['pulumi-buddy'];
    await fs.writeFile(path.resolve(targetDir, 'package.json'), JSON.stringify(pkg, null, 2));

    info('Copy', 'yarn.lock');
    await fs.writeFile(path.resolve(targetDir, 'yarn.lock'), await fs.readFile(path.resolve(__dirname, '../../../../../yarn.lock')));

    step('Install production dependencies');
    const yarnProdInstall = execa('yarn', ['--prod', '--frozen-lockfile', '--non-interactive'], {
        cwd: targetDir
    });
    yarnProdInstall.stdout?.on('data', c => info('Yarn', c.toString().trim()));
    await yarnProdInstall;

    step('Copy SDK');
    await execa('cp', ['-r', '../../sdk/nodejs/dist', path.resolve(targetDir, 'node_modules/pulumi-buddy')], {
        cwd: path.resolve(__dirname, '../../../')
    });
}
