import React, { useEffect, useState } from 'react';
import axios from 'axios';


const Weather = () => {
    
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    const [currentWeather, setCurrentWeather] = useState(null);
    const [dailyForecast, setDailyForecast] = useState([]);
    const [hourlyForecast, setHourlyForecast] = useState([]);
  
    const fetchWeatherData = async () => {
      try {
        const currentResponse = await axios.get('http://www.mytsite.somee.com/forecast/current'); // URL для получения текущего прогноза
        const dailyResponse = await axios.get('http://www.mytsite.somee.com/forecast/three-day'); // URL для получения 3-дневного прогноза
        const hourlyResponse = await axios.get('http://www.mytsite.somee.com/forecast/day-by-hours'); // URL для получения почасового прогноза
  
        setCurrentWeather(currentResponse.data);
        setDailyForecast(dailyResponse.data);
        setHourlyForecast(hourlyResponse.data);

      } catch (error) {
        console.error('Ошибка при получении данных о погоде', error);
      }
    };
  
    useEffect(() => {
      fetchWeatherData();
    }, []);

  return (
    <>
        <div className="App">
          <h1>Прогноз погоды</h1>
          
          <div className="current-weather">
            {currentWeather && (
              <div>
                <h2>Текущий прогноз</h2>
                <p>Температура: {currentWeather.temperature} °C</p>
                <p>Состояние: {currentWeather.condition}</p>
              </div>
            )}
          </div>
          
          <div className="daily-forecast">
            <h2>3-дневный прогноз</h2>
            <ul>
              {dailyForecast.map((day, index) => (
                <li key={index}>
                  <p>{day.date}: {day.temperature} °C, {day.condition}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="hourly-forecast">
            <h2>Почасовой прогноз</h2>
            <ul>
              {hourlyForecast.map((hour, index) => (
                <li key={index}>
                  <p>{hour.time}: {hour.temperature} °C, {hour.condition}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <button type="button" class="btn btn-secondary" onClick={()=>fetchWeatherData()}>Обновить данные по прогнозу</button>
      </>
  );
};

export default Weather;