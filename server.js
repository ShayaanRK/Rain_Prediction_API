import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const API_KEY = process.env.API_KEY;
const PORT = process.env.PORT;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
   res.render('index.ejs');
});

// Example route using Axios to fetch weather data from One Call API
app.get('/weather', async (req, res) => {
  try {
    // Get city coordinates using OpenWeather Geocoding API
    const response = await axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}`);
    const { lat, lon } = response.data[0];

    // Call One Call API with coordinates
    const oneCallResponse = await axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,daily,alerts&units=metric&appid=${process.env.OPENWEATHERMAP_API_KEY}`);

    res.json(oneCallResponse.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});