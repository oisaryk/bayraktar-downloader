const YoutubeMp3Downloader = require("youtube-mp3-downloader");
const configs = require('../config');
const YD = new YoutubeMp3Downloader(configs.downloaderOptions);
const cliProgress = require('cli-progress');

async function downloadAsMP3 (videoId, title) {
    return new Promise((resolve, reject) => {
        const progress = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
        console.log(`\n Downloading -> ${title}(${videoId})`);
        progress.start(100, 0);

        YD.download(videoId);

        YD.on('progress', (downloadProgress) => {
            progress.update(downloadProgress.progress.percentage);
        });

        YD.on('error', (error) => {
            console.log(error);
            return reject('Something went wrong during the download process.')
        });

        YD.on('finished', (err, data) => {
            if (err) return reject(err);

            return resolve(data);
        })
    })
}

module.exports = { downloadAsMP3 };
