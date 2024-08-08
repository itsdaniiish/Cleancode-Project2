// server.js

const express = require('express');
const Say = require('./say');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.post('/api/speak', async (req, res) => {
    const { text, lang } = req.body;
    const filename = 'output.mp3';

    try {
        await Say.speak(text, lang, filename);
        res.sendFile(path.join(__dirname, filename));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(3600, () => {
    console.log(`Server is running at 3600`);
});
