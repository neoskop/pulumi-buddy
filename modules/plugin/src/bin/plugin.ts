import * as yargs from 'yargs';
import { format } from 'util';
import * as fs from 'fs-extra';
import * as path from 'path';
import * as cp from 'child_process';
import * as chalk from 'chalk';
import * as os from 'os';

const pkg = require('../../package');
const PLUGIN_NAME = 'buddy';
const PULUMI_PLUGIN_DIRECTORY = os.homedir() + '/.pulumi/plugins/';
const PULUMI_PLUGIN_FILE_TEMPLATE = 'resource-%s-v%s/pulumi-resource-%s';
const PULUMI_PLUGIN_TEMPLATE = `#!/bin/bash

trap 'kill $(jobs -p)' EXIT

cd "%s"

%s main "$@"`;

yargs
    .command(
        ['$0', 'install'],
        'Install the plugin into the Pulumi plugin directory',
        args =>
            args.option('force', {
                alias: 'f',
                description: 'Overwrite existing',
                type: 'boolean',
                default: false
            }),
        args => {
            const file = path.resolve(PULUMI_PLUGIN_DIRECTORY + format(PULUMI_PLUGIN_FILE_TEMPLATE, PLUGIN_NAME, pkg.version, PLUGIN_NAME));

            if (!args.force) {
                if (fs.existsSync(file)) {
                    error(`Plugin already installed (use --force to overwrite)`);
                }
            }

            const node = cp
                .spawnSync('which', ['node'])
                .stdout.toString()
                .trim();
            const main = path.resolve(__dirname, '../main');
            const dir = path.dirname(file);

            fs.mkdirpSync(dir);
            fs.removeSync(file);
            fs.writeFileSync(file, format(PULUMI_PLUGIN_TEMPLATE, path.dirname(main), node), { mode: '0755' });

            success('Plugin installed at ' + file);
        }
    )
    .command(
        'uninstall',
        'Remove the plugin from the Pulumi plugin directory',
        args => args,
        args => {
            const file = path.resolve(PULUMI_PLUGIN_DIRECTORY + format(PULUMI_PLUGIN_FILE_TEMPLATE, PLUGIN_NAME, pkg.version, PLUGIN_NAME));

            if (!fs.existsSync(file)) {
                return warn('Plugin not installed');
            }

            fs.removeSync(path.dirname(file));

            success('Plugin uninstalled');
        }
    )
    .parse();

function error(str: string): never {
    console.error(chalk.red(str));
    process.exit(1);
}

function success(str: string) {
    console.log(chalk.green(str));
}

function warn(str: string) {
    console.warn(chalk.yellow(str));
}
