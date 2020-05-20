import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Weather = ({ capital }) => {
  const [weather, setWeather] = useState([]);
  const [isLoaded, setLoaded] = useState(false);
  const access_key = process.env.REACT_APP_API_KEY;
  const weather_url = `http://api.weatherstack.com/current?access_key=${access_key}&query=${capital}`;

  useEffect(() => {
    console.log('weather');
    axios.get(weather_url).then((response) => {
      console.log('promise fulfilled');
      setWeather(response.data);
      setLoaded(true);
    });
  }, []);

  console.log(weather.current);

  return (
    <div>
      {isLoaded && (
        <div>
          <p>
            <strong>temperature: </strong> {weather.current.temperature} Celcius
          </p>
          <img src={weather.current.weather_icons[0]} alt=""></img>
          <p>
            <strong>wind: </strong> {weather.current.wind_speed} mph direction{' '}
            {weather.current.wind_dir}
          </p>
        </div>
      )}
    </div>
  );
};

export default Weather;
