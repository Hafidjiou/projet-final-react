import React, { useState } from 'react';
import WeatherCard from './components/WeatherCard';
import Forecast from './components/Forecast';

// 🔑 Mets ta vraie clé API ici
const API_KEY = "3d681362ace642f8dbd71abbe1fae33c";

export default function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);

  const fetchWeather = async () => {
    if (!city.trim()) {
      alert("Veuillez entrer une ville.");
      return;
    }

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=fr&appid=${API_KEY}`
      );
      const data = await res.json();

      if (data.cod !== 200) {
        alert("Ville non trouvée !");
        setWeather(null);
        setForecast([]);
        return;
      }

      const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&lang=fr&appid=${API_KEY}`
      );
      const forecastData = await forecastRes.json();

      setWeather(data);

      // On garde une prévision toutes les 8 entrées (~1 par jour)
      const daily = forecastData.list.filter((_, idx) => idx % 8 === 0);
      setForecast(daily);
    } catch (error) {
      console.error("Erreur lors de la récupération des données météo :", error);
      alert("Une erreur est survenue. Vérifiez votre connexion.");
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

