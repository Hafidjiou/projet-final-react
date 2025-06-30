import React, { useState } from 'react';
import WeatherCard from './components/WeatherCard';
import Forecast from './components/Forecast';

const API_KEY = "YOUR_API_KEY"; // Remplace par ta clé API OpenWeather

export default function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);

  const fetchWeather = async () => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=fr&appid=${API_KEY}`
      );
      const data = await res.json();

      const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&lang=fr&appid=${API_KEY}`
      );
      const forecastData = await forecastRes.json();

      setWeather(data);
      const daily = forecastData.list.filter((_, idx) => idx % 8 === 0);
      setForecast(daily);
    } catch (error) {
      console.error("Erreur lors de la récupération des données météo :", error);
    }
  };

  return (
    <div className="app">
      <h1>🌦️ Application Météo</h1>
      <input
        type="text"
        placeholder="Entrez une ville"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={fetchWeather}>Rechercher</button>

      {weather && <WeatherCard weather={weather} />}
      {forecast.length > 0 && <Forecast data={forecast} />}
    </div>
  );
}
