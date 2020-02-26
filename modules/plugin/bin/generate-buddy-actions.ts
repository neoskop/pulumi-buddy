#!./node_modules/.bin/ts-node
import * as fs from 'fs-extra';
import * as path from 'path';

import { BuddyCodegenActions } from '../src/buddy/codegen/actions';
import { BuddyScraper } from '../src/buddy/scraper';

async function main() {
    const scraper = new BuddyScraper();

    const actions = await scraper.getActions();
    const codegen = new BuddyCodegenActions({
        utilsImport: '../utils',
        kindsImport: '../kinds',
        pipelineImport: '../pipeline'
    });

    const targetDir = path.join(__dirname, '../../../sdk/nodejs/action');

    if (await fs.pathExists(targetDir)) {
        await fs.remove(targetDir);
    }
    await fs.mkdirp(targetDir);

    for (const action of actions) {
        codegen.addAction(action);
    }

    codegen.addIndexFile();

    for (const file of codegen.getFiles()) {
        await fs.writeFile(path.join(targetDir, file.getBaseName()), file.getFullText());
    }
}

main().catch(err => {
    console.error(err);
    process.exit(1);
});
