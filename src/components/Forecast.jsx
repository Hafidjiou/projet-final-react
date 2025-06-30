import React from 'react';

export default function Forecast({ data }) {
  return (
    <div className="forecast">
      <h3>Prévision sur 5 jours :</h3>
      <div className="forecast-grid">
        {data.map((day, idx) => (
          <div key={idx} className="day">
            <p>{new Date(day.dt * 1000).toLocaleDateString('fr-FR', { weekday: 'long' })}</p>
            <img src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`} alt="icon" />
            <p>{Math.round(day.main.temp)}°C</p>
            <p>{day.weather[0].description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
