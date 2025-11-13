import { useEffect, useState } from "react";

const Weather = () => {
  const [WeatherData, setWeatherData] = useState(false);

  const search = async (city) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_APP_ID
      }`;
      const response = await fetch(url);
      const data = await response.json();
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: data.weather.icon,
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    search("London");
  }, []);

  return (
    <div className="container">
      <div className="search-bar">
        <input type="text" placeholder="Search" />
      </div>
      <img src={WeatherData.icon} alt="" />
      <p>{WeatherData.temperature}°c</p>
      <p>{WeatherData.location}</p>
      <div>
        <div>
          <p>{WeatherData.humidity} %</p>
          <span>Humidity</span>
        </div>
      </div>
      <div>
        <div>
          <p>{WeatherData.windSpeed} Km/h</p>
          <span>Wind Speed</span>
        </div>
      </div>
    </div>
  );
};

export default Weather;
