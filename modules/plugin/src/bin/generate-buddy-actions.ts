#!./node_modules/.bin/ts-node
import 'reflect-metadata';

import { sleep } from '@pulumi-utils/plugin';
import * as chalk from 'chalk';
import * as fs from 'fs-extra';
import * as Listr from 'listr';
import * as path from 'path';
import * as Prettier from 'prettier';
import { map, share, toArray } from 'rxjs/operators';

import { BuddyCodegenActions } from '../buddy/codegen/actions';
import { Action, BuddyScraper } from '../buddy/scraper';

async function main() {
    const tasks = new Listr<{
        actions: Action[];
        codegen: BuddyCodegenActions;
        targetDir: string;
        warnings: string[];
    }>([
        {
            title: 'Scrape Buddy API Documentation',
            async task(ctx) {
                const scraper = new BuddyScraper({
                    patchParameter(action, param) {
                        if (param.name === 'integration' && (!('ref' in param.type) || param.type.ref !== 'Integration')) {
                            return {
                                ...param,
                                type: { ref: 'Integration' }
                            };
                        }
                        if (param.name === 'trigger_time' && !param.required) {
                            return {
                                ...param,
                                required: true
                            };
                        }
                        return;
                    },
                    patchAction(action) {
                        action = {
                            ...action,
                            parameters: action.parameters.filter(p => p.name !== 'action')
                        };
                        if (
                            ['Build Dockerfile', 'Push Docker Image'].includes(action.name) &&
                            !action.parameters.some(p => p.name === 'registry')
                        ) {
                            return {
                                ...action,
                                parameters: [
                                    ...action.parameters,
                                    {
                                        name: 'registry',
                                        description: 'Docker Registry URL',
                                        type: { scalar: 'String' },
                                        required: false
                                    }
                                ]
                            };
                        }
                        if (action.name === 'Kubernetes kubectl') {
                            return {
                                ...action,
                                parameters: [
                                    ...action.parameters.map(p => {
                                        if (p.name === 'server' || p.name === 'auth_type') {
                                            return {
                                                ...p,
                                                required: false
                                            };
                                        }
                                        return { ...p };
                                    }),
                                    {
                                        name: 'integration',
                                        type: { ref: 'Integration' },
                                        required: false,
                                        description: 'Integration'
                                    },
                                    {
                                        name: 'resource_group_name',
                                        type: { scalar: 'String' },
                                        required: false,
                                        description: 'Azure Resource Group Name'
                                    },
                                    {
                                        name: 'resource_name',
                                        type: { scalar: 'String' },
                                        required: false,
                                        description: 'Azure Resource Name'
                                    },
                                    {
                                        name: 'subscription_id',
                                        type: { scalar: 'String' },
                                        required: false,
                                        description: 'Azure Subscription ID'
                                    }
                                ]
                            };
                        }
                        if (action.name === 'Run Next Pipeline' && !action.parameters.some(p => p.name === 'wait')) {
                            return {
                                ...action,
                                parameters: [
                                    ...action.parameters,
                                    {
                                        name: 'wait',
                                        type: { scalar: 'Boolean' },
                                        required: false,
                                        description: 'Pause execution until triggered pipeline has finished'
                                    }
                                ]
                            };
                        }
                        return action;
                    }
                });
                const stream = scraper.getActionsAsStream().pipe(share());

                stream.pipe(toArray()).subscribe(actions => {
                    ctx.actions = actions;
                    ctx.warnings = scraper.warnings;
                });

                return stream.pipe(map(action => action.name));
            }
        },
        {
            title: 'Prepare',
            async task(ctx) {
                const targetDir = (ctx.targetDir = path.join(__dirname, '../../../../sdk/nodejs/actions'));

                if (await fs.pathExists(targetDir)) {
                    await fs.remove(targetDir);
                }
                await fs.mkdirp(targetDir);
            }
        },
        {
            title: 'Generate Actions',
            async task(ctx, task) {
                const codegen = (ctx.codegen = new BuddyCodegenActions({
                    utilsImport: '@pulumi-utils/sdk',
                    pipelineImport: '../pipeline',
                    commonImport: '../common',
                    integrationImport: '../integration'
                }));

                let i = 0;
                for (const action of ctx.actions) {
                    const p = Math.round((i++ / ctx.actions.length) * 100);
                    task.output = `${p}% ${action.name}`;
                    await codegen.addAction(action);
                    await sleep(1);
                }

                codegen.addIndexFile();
            }
        },
        {
            title: 'Write Files',
            async task(ctx, task) {
                let i = 0;
                for (const file of ctx.codegen.getFiles()) {
                    const p = Math.round((i++ / ctx.actions.length) * 100);
                    task.output = `${p}% ${file.getBaseName()}`;
                    let code = file.getFullText();
                    code = Prettier.format(code, { ...require('../../../../package').prettier, parser: 'typescript' });
                    await fs.writeFile(path.join(ctx.targetDir, file.getBaseName()), code);
                    await sleep(1);
                }
            }
        }
    ]);

    const { warnings } = await tasks.run();

    for (const warning of warnings) {
        console.warn(chalk.yellow(warning));
    }
}

main().catch(err => {
    console.error(err);
    process.exit(1);
});
