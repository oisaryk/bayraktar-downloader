// NodeJS MP3 downloader for a radio songs
const parser = require('./modules/parser');
const ytFinder = require('./modules/youtube-finder');

const MAIN_QUESTION = `
    Do you want to download all recent bayractar songs?
    1 - YES, whatever - NO.
    
`;

(async () => {
    const readline = require('./utils/readline.js');

    try {
        const answer = await readline.askQuestion(MAIN_QUESTION);
        if (answer.toString() !== '1') {
            console.log('Ok byeeee.....');
            process.exit();
        }

        // Start parsing
        console.log('Parsing the table...');
        // Parse radio list table and save is as a list
        const parserSongsList = await parser.getTableScrapper();
        console.log('\x1b[36m%s\x1b[0m', 'Done!');  //cyan

        console.log('Finding all related video id\'s...');
        // Find all youtube video id's and download it
        await ytFinder.findYoutubeVideosByNames(parserSongsList);
        console.log('\x1b[36m%s\x1b[0m', 'Done!');  //cyan

        console.log('\n JOB IS DONE! Good bye! \n');
        process.exit();
    } catch (e) {
        console.error(e);
        process.exit();
    }
})();
