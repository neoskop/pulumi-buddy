#!./node_modules/.bin/ts-node

import { BuddyScraper } from "../src/buddy/scraper";

async function main() {
    const scraper = new BuddyScraper();

    console.log(JSON.stringify(await scraper.getActions(), null, 2));
}

main().catch(err => {
    console.error(err);
    process.exit(1);
});