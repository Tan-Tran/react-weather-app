import "./App.css";
import CurrentWeather from "./components/current-weather/current-weather";
import Search from "./components/search/search";
import { WEATHER_API_KEY, WEATHER_API_URL } from "./api/fetchWeather";
import { useState } from "react";
import ForeCast from "./components/forecast/forecast";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForeCast] = useState(null);

  const handleOnSearchChange = (searchData) => {
    console.log(searchData);
    const [latitude, longitude] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}&units=metric`
    );

    Promise.all([currentWeatherFetch, forecastFetch]).then(async (response) => {
      const weatherResponse = await response[0].json();
      const forecastResponse = await response[1].json();
      setCurrentWeather({ city: searchData.label, ...weatherResponse });
      setForeCast({ city: searchData.label, ...forecastResponse });
    });
  };

  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <ForeCast data={forecast} />}
    </div>
  );
}

export default App;
