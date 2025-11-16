import { useEffect, useRef, useState } from "react";
import styles from "./weather.module.css";
import { FaSearch } from "react-icons/fa";

const Weather = () => {
  const [query, setQuery] = useState("");
  const [WeatherData, setWeatherData] = useState(false);

  const search = async (city) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_APP_ID
      }`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    search("Lisbon");
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.searchbar}>
        <input
          value={query}
          type="text"
          placeholder="Search"
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={() => search(query)}>
          <FaSearch />
        </button>
      </div>
      <img
        src={WeatherData.icon}
        alt={WeatherData.location}
        className={styles.weather}
      />
      <p className={styles.temperature}>{WeatherData.temperature}°c</p>
      <p className={styles.location}>{WeatherData.location}</p>
      <div className={styles.othersdata}>
        <div className={styles.details}>
          <img src="humidity.png" alt="" />
          <div>
            <p>{WeatherData.humidity} %</p>
            <span>Humidity</span>
          </div>
        </div>
        <div className={styles.details}>
          <img src="wind.png" alt="" />
          <div>
            <p>{WeatherData.windSpeed} Km/h</p>
            <span>Wind Speed</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
