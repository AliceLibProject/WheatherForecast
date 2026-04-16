import React, { useEffect, useState } from 'react';
import axios from 'axios';


const Weather = () => {
    
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    const [currentWeather, setCurrentWeather] = useState(null);
    const [dailyForecast, setDailyForecast] = useState([]);
    const [hourlyForecast, setHourlyForecast] = useState([]);
  
    const fetchWeatherData = async () => {
      try {
        const currentResponse = await axios.get('https://www.mytsite.somee.com/forecast/current'); // URL для получения текущего прогноза
        const dailyResponse = await axios.get('https://www.mytsite.somee.com/forecast/three-day'); // URL для получения 3-дневного прогноза
        const hourlyResponse = await axios.get('https://www.mytsite.somee.com/forecast/day-by-hours'); // URL для получения почасового прогноза
  
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
        <div class="block top-block">
          <h2>Текущий прогноз</h2>
          {currentWeather && ( 
            <>
              <p>Температура: {currentWeather.temperature} °C</p>
              <p>Состояние: {currentWeather.condition}</p>
            </>
            )}
        </div>

        <div class="block middle-block">
          <h2>3-дневный прогноз</h2>
          {dailyForecast.map((day, index) => (
            <div class="middle-item" key={index}>
                      <p>Date {day.date}: Temp. {day.temperature} °C, Cond {day.condition}</p>
                    </div>
                  ))}
        </div>

        <div class="block bottom-block">
            <h2>Почасовой прогноз</h2>
            <table>
                <thead>
                  <tr>
                        <th>Время</th>
                        <th>Температура</th>
                        <th>Состояние</th>
                    </tr>
                </thead>
                <tbody>
                    {hourlyForecast.map((hour, index) => (
                    <tr key={index}>
                      <td>{hour.time}</td>
                      <td>{hour.temperature} °C</td>
                      <td>{hour.condition} °C</td> 
                    </tr>
                  ))}
                </tbody>
            </table>
        </div>
        
        <button type="button" class="btn btn-secondary" onClick={()=>fetchWeatherData()}>Обновить данные по прогнозу</button>
      </>
  );
};

export default Weather;