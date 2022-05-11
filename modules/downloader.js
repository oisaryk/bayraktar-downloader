const config = require('../config');
const cliProgress = require('cli-progress');
const fs = require('fs');
const path = require('path');
const directoryPath = path.join(__dirname, '../music');
let songsList = [];
fs.readdir(directoryPath, function (err, files) {
    songsList = files;
});
// This is bad! Figure it out later
require('events').setMaxListeners(100)

async function downloadAsMP3(videoId, title) {
    const exist = songsList.find(
        i => i.includes(title) ||
            i.split('.')[1].includes(videoId)
    );

    if (exist) {
        console.log(`Skipping ${title}, already exist.`);
        return;
    }

    return new Promise((resolve, reject) => {
        const YoutubeMp3Downloader = require("youtube-mp3-downloader");

        const YD = new YoutubeMp3Downloader(config.downloaderOptions);
        const progress = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
        console.log(`\n Downloading -> ${title}(${videoId})`);
        progress.start(100, 0);

        YD.download(videoId, `${title}.${videoId}`);

        YD.on('progress', (downloadProgress) => {
            progress.update(downloadProgress.progress.percentage);
        });

        YD.on('error', (error) => {
            console.log(error);
            //return reject('Something went wrong during the download process.')
        });

        YD.on('finished', (err, data) => {
            if (err) return reject(err);

            return resolve(data);
        });
    })
}

module.exports = { downloadAsMP3 };
