# Weather Dashboard 🌤

A simple Node.js web application that lets users check the current weather for any city using the OpenWeatherMap API.

## Features

- Enter any city name to get real-time weather data.
- Displays temperature, weather description, humidity, wind speed, cloudiness, UV index, sunrise, and sunset times.
- Clean, responsive UI built with EJS templates.
- Error handling for invalid city names or API issues.

## How It Works

1. **User Input:**  
   On the homepage, users enter a city name and submit the form.

2. **Geocoding:**  
   The server uses OpenWeatherMap's Geocoding API to convert the city name into latitude and longitude.

3. **Weather Data:**  
   Using these coordinates, the server fetches current weather details from OpenWeatherMap's One Call API.

4. **Display:**  
   The weather information is shown on a results page, including an icon and all relevant details.

5. **Error Handling:**  
   If the city is not found or the API fails, a friendly error message is displayed.

## Project Structure

```
Rain_Prediction_API/
├── routes/
│   └── weather.js      # Main route logic for handling requests
├── views/
│   ├── index.ejs       # Homepage with city input form
│   └── result.ejs      # Weather results display
├── server.js           # Express server setup
├── .env                # API keys and environment variables (not committed)
└── README.md           # Project documentation
```

## Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/ShayaanRK/Rain_Prediction_API.git
   cd Rain_Prediction_API
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Get an OpenWeatherMap API key:**  
   Sign up at [OpenWeatherMap](https://openweathermap.org/api) and generate an API key.

4. **Create a `.env` file:**
   ```
   API_KEY= your_OpenWeatherMap_API_key
   PORT=3000
   ```

5. **Start the server:**
   ```bash
   npm start
   ```
   or
   ```bash
   node server.js
   ```

6. **Open your browser:**  
   Visit [http://localhost:3000](http://localhost:3000) and try searching for any city.

## Technologies Used

- Node.js
- Express.js
- EJS (Embedded JavaScript templates)
- Axios (HTTP requests)
- OpenWeatherMap API

## Screenshots

![Homepage](screenshots/homepage.png)
![Weather Result](screenshots/result.png)

## License

MIT

---

**Tech Notes:**  
This project demonstrates RESTful API integration, server-side rendering, error handling, and clean code organization. It is suitable for showcasing full-stack JavaScript skills and practical API usage.