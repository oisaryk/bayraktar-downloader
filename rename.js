const fs = require('fs');
const translit = require('ua-en-translit');

(async () => {
    try {
        fs.readdir('./music', (err, filenames) => {
            for (let song of filenames) {
                console.log(`${__dirname}/${translit(song)}`);
                fs.rename(`${__dirname}/music/${song}`, `${__dirname}/music/${translit(song)}.mp3`, (err, data) => {
                    if (err) console.log(err);
                    console.log(data);
                });
            }
        })
    } catch (e) {
        throw e;
    }
})()