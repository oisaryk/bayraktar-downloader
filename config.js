module.exports = {
    baseSiteUrl: `https://top-radio.com.ua/playlist/bairaktar/`,
    startUrl: `https://top-radio.com.ua/playlist/bairaktar`,
    filePath: './songs/',
    concurrency: 10,
    maxRetries: 3,
    logPath: './logs/',
    downloaderOptions: {
        "ffmpegPath": "/usr/bin/ffmpeg",        // FFmpeg binary location
        "outputPath": "/home/usfr/Development/bayraktar/music",    // Output file location (default: the home directory)
        "youtubeVideoQuality": "highestaudio",  // Desired video quality (default: highestaudio)
        "queueParallelism": 2,                  // Download parallelism (default: 1)
        "progressTimeout": 2000,                // Interval in ms for the progress reports (default: 1000)
        "allowWebm": false                      // Enable download from WebM sources (default: false)
    }
}
