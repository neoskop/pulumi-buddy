import * as yargs from 'yargs';
import { build } from './build/build';
import * as path from 'path';
import { bundle } from './build/bundle';
import { publish } from './build/publish';
import { step } from './cli-utils';

yargs
    .command(
        ['$0', 'build'],
        'Build and publish the plugin',
        args =>
            args.option('publish', {
                description: 'Publish build to GCP bucket',
                type: 'boolean',
                default: true
            }),
        async args => {
            await build(path.resolve(__dirname, '../../.build'));
            const bundles = await bundle(
                'buddy',
                require('../../package').version,
                path.resolve(__dirname, '../../.build'),
                path.resolve(__dirname, '../../bundles')
            );
            if (args.publish) {
                await publish(bundles, 'pulumi.neoskop.cloud');
            } else {
                console.log();
                step('Skip publishing');
            }
        }
    )
    .parse();
