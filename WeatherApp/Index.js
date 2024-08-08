const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();

const API_KEY = '1ea7455da013f7a89291a4d62a679384';

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());

app.get('/weather', async (req, res) => {
    const city = req.query.city;

    if (!city) {
        return res.status(400).send('City query parameter is required');
    }

    try {
        const response = await axios.get('http://api.openweathermap.org/data/2.5/weather', {
            params: {
                q: city,
                appid: API_KEY,
                units: 'metric'
            }
        });

        res.json(response.data);
    } catch (error) {
        res.status(error.response ? error.response.status : 500).send(error.message);
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(3200, () => {
    console.log("server started");
});
