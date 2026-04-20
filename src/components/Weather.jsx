import React, { useEffect, useState } from 'react';
import axios from 'axios';


const Weather = () => {
    
    axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
    const [currentWeather, setCurrentWeather] = useState(null);
    const [dailyForecast, setDailyForecast] = useState([]);
    const [hourlyForecast, setHourlyForecast] = useState([]);
  
    const fetchWeatherData = async () => {
      try {
        const currentResponse = await axios.get('https://www.mytsite.somee.com/api/weatherforecast/current'); // URL для получения текущего прогноза
        const dailyResponse = await axios.get('https://www.mytsite.somee.com/api/weatherforecast/three-day'); // URL для получения 3-дневного прогноза
        const hourlyResponse = await axios.get('https://www.mytsite.somee.com/api/weatherforecast/day-by-hours'); // URL для получения почасового прогноза
  
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
        <div className={"block top-block"}>
          {currentWeather && ( 
            <>
              <div className={"header"}>
                <div className={'first'}>Прогноз на сегодня {currentWeather.place.localTime.substr(0,10)}</div>
                <div>{currentWeather.place.country} {currentWeather.place.placeName}</div>
              </div>
              <p>Облачность : {currentWeather.currentWeather.cloud}</p>
              <p>Температура по ощущению : {currentWeather.currentWeather.feelsLike}</p>
              <p>Влажность : {currentWeather.currentWeather.humidity}</p>
              <p>Давление : {currentWeather.currentWeather.pressure}</p>
              <p>Температура : {currentWeather.currentWeather.temperature} C</p>
              <p>Направление ветра : {currentWeather.currentWeather.windDirection}</p>
              <p>Сила ветра : {currentWeather.currentWeather.windSpeed}</p>
            </>
            )}
        </div>

        <div className={"block middle-block"}>          
          <div className={"middle-block-header"}>Прогноз погоды на 3 дня</div>
          <div className={'middle-row'}>
          {dailyForecast.map((day, index) => (
            <div class="middle-item" key={index}>
                      <p>Влажность: {day.avgHumidity} мм </p>
                      <p> Средняя температура: {day.avgTemp} °C</p> 
                      <p> Скорость ветра: {day.wind} m\c</p>
                    </div>
                  ))}
        </div></div>


        
cloud
dateTime "2026-04-20T00:00:00"
feelsLike
humidity
pressure
temperature
windDirection
windSpeed

        <div className={"block bottom-block"}>
            <h2>Почасовой прогноз</h2>
            <table>
                <thead>
                  <tr>
                        <th>Облачность %</th>
                        <th>Время</th>
                        <th>Температура по ощущению °C</th>
                        <th>Влажность %</th>
                        <th>Давление мм</th>
                        <th>Направление ветра</th>
                        <th>Скорость ветра м\с</th>
                    </tr>
                </thead>
                <tbody>
                    {hourlyForecast.map((hour, index) => (
                    <tr key={index}>
                      <td>{hour.cloud}</td>
                      <td>{hour.dateTime.replace('T', ' ')}</td>
                      <td>{hour.feelsLike}</td> 
                      <td>{hour.humidity}</td> 
                      <td>{hour.pressure}</td>
                      <td>{hour.temperature}</td>
                      <td>{hour.windDirection}</td>
                      <td>{hour.windSpeed}</td>
                    </tr>
                  ))}
                </tbody>
            </table>
        </div>

        <button type="button" className={"btn btn-secondary"} onClick={()=>fetchWeatherData()}>Обновить данные по прогнозу</button>
      </>
  );
};

export default Weather;