import "./styles.css";
import React, {useState } from "react";


const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const API_KEY = "c5177a7c98f8c9795aeee34a6236fb57"; // Add  OpenWeatherMap API key
  const fetchWeather = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      if (!response.ok) {
        throw new Error("Weather data not available for this city.");
      }
      const data = await response.json();
      setWeatherData(data);
      setError(null);
    } catch (error) {
      setError(error.message);
      setWeatherData(null);
    }
  };




  const handleFormSubmit = (e) => {
    e.preventDefault();
    fetchWeather();
  };

  return (

    <div className="weather-container">
      <h1>Live Weather Report</h1>
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">Get Weather</button>
            </form>
            

      {weatherData && (
        <div className="weather-info">
          <p>City: {weatherData.name}</p>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Description: {weatherData.weather[0].description}</p>
        </div>
      )}

      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default WeatherApp;
