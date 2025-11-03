import express from 'express';
import axios from 'axios';

const router = express.Router();

router.get('/', (req, res) => {
  res.render('index');
});

router.post('/weather', async (req, res) => {
  const city = req.body.city;
  const apiKey = process.env.API_KEY;

  if (!city) return res.render('error', { message: 'Please provide a city name.' });

  try {
    // Geocoding API
    const geoResp = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(city)}&limit=1&appid=${apiKey}`);
    const geoData = geoResp.data;

    if (!geoData.length) return res.render('error', { message: 'Location not found.' });

    const lat = geoData[0].lat;
   const lon = geoData[0].lon;
   const name = geoData[0].name;

    // 2) One Call API 3.0: get weather
    const weatherResp = await axios.get(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely,alerts&appid=${apiKey}`
    );
    const w = weatherResp.data;

    // Map relevant data from API response
    const weather = {
      city: name,
      temp: w.current.temp,
      feels_like: w.current.feels_like,
      description: w.current.weather[0].description,
      icon: w.current.weather[0].icon,
      humidity: w.current.humidity,
      wind_speed: w.current.wind_speed,
      sunrise: w.current.sunrise,
      sunset: w.current.sunset,
      uvi: w.current.uvi,
      clouds: w.current.clouds
    };

    res.render('result', { weather });
  } catch (error) {
    console.error('Error fetching weather:', error.response?.data || error.message);
    res.render('error', { message: 'Error fetching weather data. Try again later.' });
  }
});

export default router;