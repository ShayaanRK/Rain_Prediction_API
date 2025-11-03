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

    const { lat, lon, name } = geoData[0];

    // One Call API 3.0
    const weatherResp = await axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely,alerts&appid=${apiKey}`);
    const w = weatherResp.data;

    const weather = {
      city: name,
      temp: w.current.temp,
      desc: w.current.weather[0].description,
      icon: w.current.weather[0].icon
    };

    res.render('result', { weather });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.render('error', { message: 'Error fetching weather data. Try again later.' });
  }
});

export default router;
