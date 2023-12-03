const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const path = require('path');
require('dotenv').config(); 

const app = express();
const PORT = process.env.PORT || 8040;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': process.env.WEATHER_API_KEY,
        'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
    }
};

app.post('/getWeather', async (req, res) => {
    try {
        const { city } = req.body;
        const apiUrl = `https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=${city}`;

        const response = await axios.get(apiUrl, options);
        const weatherData = response.data;

        res.render('index', { weather: weatherData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/', (req, res) => {
    res.render('index', { weather: {} });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
