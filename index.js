// NodeJS MP3 downloader for a radio songs
const scraper = require('table-scraper');
const scrapperConfig = require('./config');
const yt = require('youtube-search-without-api-key');
const YoutubeMp3Downloader = require("youtube-mp3-downloader");
const cliProgress = require('cli-progress');
const YD = new YoutubeMp3Downloader({
    "ffmpegPath": "/usr/bin/ffmpeg/",        // FFmpeg binary location
    "outputPath": "~/Songs/",    // Output file location (default: the home directory)
    "youtubeVideoQuality": "highestaudio",  // Desired video quality (default: highestaudio)
    "queueParallelism": 2,                  // Download parallelism (default: 1)
    "progressTimeout": 2000,                // Interval in ms for the progress reports (default: 1000)
    "allowWebm": false                      // Enable download from WebM sources (default: false)
});

const MAIN_QUESTION = `
    Do you want to download all recent bayractar songs?
    1 - YES, whatever - NO.
    
`;

(async () => {
    const readline = require('./utils/readline.js');
    const cliProgress = require('cli-progress');

    try {
        const answer = await readline.askQuestion(MAIN_QUESTION);
        if (answer.toString() !== '1') {
            console.log('Ok byeeee.....');
            process.exit();
        }
        // Start parsing
        console.log('Parsing song list table...');
        const results = await scraper.get(scrapperConfig.baseSiteUrl);

        if (!results || results.length === 0) {
            progress.stop();
            console.log('No scrapping results. Exiting...');
        }

        if (results) {
            console.log('Parsing song list table... SUCCESS');

            for (const link of results[0]) {
                console.log('\n Looking for a video info...');
                const video = await yt.search(`${link['Артист']} ${link['Песня']}`);
                if (video) {
                    console.log('Looking for a video info...SUCCESS');
                    const progress = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
                    console.log(`Downloading -> ${video[0].title}`);
                    progress.start(100, 0);
                    YD.download(video[0].id.videoId);

                    YD.on('progress', (status) => {
                        progress.update(status.progress.percentage);
                    });

                    YD.on('finished', (err, data) => {
                        console.log('\n');
                        progress.stop();
                    });
                }
            }
        }

        console.log('\n JOB IS DONE! Good bye! \n');


    } catch (e) {
        console.error(e);
        process.exit();
    }
})();
