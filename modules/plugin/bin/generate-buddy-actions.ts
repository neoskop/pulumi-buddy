#!./node_modules/.bin/ts-node
import * as fs from 'fs-extra';
import * as path from 'path';
import * as Listr from 'listr';

import { BuddyCodegenActions } from '../src/buddy/codegen/actions';
import { BuddyScraper, Action } from '../src/buddy/scraper';
import { sleep } from '../src/utils/sleep';

async function main() {
    const tasks = new Listr<{
        actions: Action[],
        codegen: BuddyCodegenActions,
        targetDir: string
    }>([
        {
            title: 'Scrape Buddy API Documentation',
            async task(ctx) {
                const scraper = new BuddyScraper();
                ctx.actions = await scraper.getActions();
            }
        },
        {
            title: 'Prepare',
            async task(ctx) {
                const targetDir = ctx.targetDir = path.join(__dirname, '../../../sdk/nodejs/action');

                if (await fs.pathExists(targetDir)) {
                    await fs.remove(targetDir);
                }
                await fs.mkdirp(targetDir);
            }
        },
        {
            title: 'Generate Actions',
            async task(ctx, task) {
                const codegen = ctx.codegen = new BuddyCodegenActions({
                    utilsImport: '../utils',
                    pipelineImport: '../pipeline',
                    commonImport: '../common'
                });

                let i = 0;
                for (const action of ctx.actions) {
                    const p = Math.round(i++ / ctx.actions.length * 100);
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
                    const p = Math.round(i++ / ctx.actions.length * 100);
                    task.output = `${p}% ${file.getBaseName()}`;
                    await fs.writeFile(path.join(ctx.targetDir, file.getBaseName()), file.getFullText());
                    await sleep(1);
                }
            }
        }
    ]);

    await tasks.run();
}

main().catch(err => {
    console.error(err);
    process.exit(1);
});
