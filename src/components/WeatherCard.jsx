import React from 'react';

export default function WeatherCard({ weather }) {
  const { name, sys, main, weather: details, wind } = weather;
  return (
    <div className="card">
      <h2>{name}, {sys.country}</h2>
      <p>{details[0].description}</p>
      <p>🌡 {main.temp}°C</p>
      <p>💧 Humidité : {main.humidity}%</p>
      <p>💨 Vent : {wind.speed} km/h</p>
      <img src={`https://openweathermap.org/img/wn/${details[0].icon}@2x.png`} alt="icon" />
    </div>
  );
}
