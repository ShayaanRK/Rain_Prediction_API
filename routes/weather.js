const express = require('express');
const axios = require('axios');
const router = express.Router();

// Home page with search form
router.get('/', (req, res) => {
  res.render('index'); // Renders index.ejs
});

// Handle form submission and fetch weather
router.post('/weather', async (req, res) => {
  const city = req.body.city; // City name from form
  const apiKey = process.env.API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await axios.get(url);
    const data = response.data;

    const weather = {
      city: data.name,
      temp: data.main.temp,
      desc: data.weather[0].description,
      icon: data.weather[0].icon
    };

    res.render('result', { weather });
  } catch (error) {
    console.error(error.message);
    res.render('error', { message: 'City not found. Please try again!' });
  }
});

module.exports = router;
