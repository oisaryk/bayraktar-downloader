const yt = require('youtube-search-without-api-key');
const youtubeDownloader = require('./downloader');

async function findYoutubeVideosByNames(videoInfo = []) {
    if (!videoInfo || videoInfo.length === 0) {
        console.log('No names array provided. Exiting...');
        process.exit();
        return;
    }

    try {
        for (const song of videoInfo) {
            const video = await yt.search(`${song['Артист']} ${song['Песня']}`);

            if (video) {
                await youtubeDownloader.downloadAsMP3(
                    video[0].id.videoId,
                    video[0].title
                );
            }
        }
    } catch (e) {
        console.log('Something went wrong...');
        console.error(e);
        process.exit();
    }
}

module.exports = { findYoutubeVideosByNames };
