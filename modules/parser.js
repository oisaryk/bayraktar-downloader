const config = require('../config');
const scraper = require('table-scraper');

async function getTableScrapper() {
    console.log('Parsing song list table...');

    const results = await scraper.get(config.baseSiteUrl);

    if (!results || results.length === 0) {
        console.log('No parsing results. Exiting...');
        process.exit();
    }

    return results[0];
}

module.exports = { getTableScrapper }