import React, { useState } from "react";
import { Grid2, Box } from "@mui/material";
import { styled } from "@mui/system";
import SearchBar from "./components/SearchBar";
import CurrentWeather from "./components/CurrentWeather";
import AirConditionsCard from "./components/AirConditions";
import AppBar from "./components/AppBar";
import FiveDayForecast from "./components/FiveDayForecast";

const WeatherContainer = styled(Box)(({ theme }) => ({
  minHeight: 'calc(100vh - 64px)',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.text.secondary,
  padding: theme.spacing(4),
}));

const WeatherPage = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);

  const handleDataFetched = (currentWeather, forecast) => {
    setWeatherData(currentWeather);
    setForecastData(forecast);
  };

  return (
    <>
      <AppBar />
      <WeatherContainer>
        <Grid2 container spacing={3} justifyContent="center">
          <Grid2 item xs={12} sm={11} md={10} lg={9} xl={8}>
            <Grid2 container direction="column" spacing={3}>
              <Grid2 item>
                <SearchBar onDataFetched={handleDataFetched} setForecastData={setForecastData} />
              </Grid2>
              
              {weatherData && (
                <>
                  <Grid2 item>
                    <CurrentWeather weatherData={weatherData} />
                  </Grid2>
                  <Grid2 item>
                    <AirConditionsCard weatherData={weatherData} />
                  </Grid2>
                </>
              )}

              {forecastData && (
                <Grid2 item>
                  <FiveDayForecast forecastData={forecastData} />
                </Grid2>
              )}
            </Grid2>
          </Grid2>
        </Grid2>
      </WeatherContainer>
    </>
  );
};

export default WeatherPage;
