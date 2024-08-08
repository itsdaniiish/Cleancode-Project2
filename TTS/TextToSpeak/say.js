const gTTS = require('gtts');
const fs = require('fs');
const path = require('path');

class Say {
    constructor() {
        this.language = 'en';
    }

    speak(text, lang = this.language, filename = 'output.mp3') {
        return new Promise((resolve, reject) => {
            const gtts = new gTTS(text, lang);
            const filePath = path.join(__dirname, filename);

            gtts.save(filePath, (err, result) => {
                if (err) {
                    reject(err);
                } else {
                    console.log(`Audio saved to ${filename}`);
                    resolve(filePath);
                }
            });
        });
    }

    setLanguage(lang) {
        this.language = lang;
    }
}

module.exports = new Say();
