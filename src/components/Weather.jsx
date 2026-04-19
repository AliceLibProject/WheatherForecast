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
        //const hourlyResponse = await axios.get('https://www.mytsite.somee.com/api/weatherforecast/day-by-hours'); // URL для получения почасового прогноза
  
        setCurrentWeather(currentResponse.data);
        setDailyForecast(dailyResponse.data);
        //setHourlyForecast(hourlyResponse.data);

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
          {/* latitude longtitude */}
          {currentWeather && ( 
            <>
              <div className={"header"}>
                <div className={'first'}>Прогноз на сегодня</div>
                <div>{currentWeather.place.country} {currentWeather.place.placeName}</div>
              </div>
              <p>Облачность : {currentWeather.currentWeather.cloud}</p>
              {/* <p>{currentWeather.currentWeather.dateTime}</p> */}
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
          
          <div>3-дневный прогноз</div>
          <div className={'row'}>
          {dailyForecast.map((day, index) => (
            <div class="middle-item" key={index}>
                      <p>Влажность {day.avgHumidity} мм </p>
                      <p> Средняя температура. {day.temperature} °C </p>
                      <p> Скорость ветра {day.wind} m\c</p>
                    </div>
                  ))}
        </div></div>

        <div className={"block bottom-block"}>
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

        <button type="button" className={"btn btn-secondary"} onClick={()=>fetchWeatherData()}>Обновить данные по прогнозу</button>
      </>
  );
};

export default Weather;