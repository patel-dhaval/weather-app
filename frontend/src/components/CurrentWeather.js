import React from "react";
import { Typography, Box } from "@mui/material";
import { styled } from "@mui/system";
import WeatherIcon from 'react-icons-weather';

const WeatherContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: '24px',
  backgroundColor: '#202b3b',
  color: '#fff',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: theme.spacing(2),
}));

const WeatherInfo = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
});

const CityName = styled(Typography)({
  fontSize: '2rem',
  fontWeight: 'bold',
  marginBottom: '4px',
});

const WeatherDescription = styled(Typography)({
  fontSize: '1rem',
  color: '#9399a2',
  marginBottom: '8px',
  textTransform: 'capitalize',
});

const Temperature = styled(Typography)({
  fontSize: '3.5rem', 
  fontWeight: 'bold',
  lineHeight: 1,
});

const StyledWeatherIcon = styled(WeatherIcon)({
  fontSize: '80px',
  color: 'primary.light',
  flexShrink: 0,
});

const CurrentWeather = ({ weatherData }) => {
  if (!weatherData) return null;
  const { name, main, weather } = weatherData;
  const temperature =  Math.round(main.temp);

  return (
    <WeatherContainer>
      <WeatherInfo>
        <CityName>{name}</CityName>
        <WeatherDescription>{weather[0].description}</WeatherDescription>
        <Temperature>{temperature}°</Temperature>
      </WeatherInfo>
      <StyledWeatherIcon name="owm" iconId={weather[0].id.toString()} night={isNight(weatherData)} />
    </WeatherContainer>
  );
};

const isNight = (weatherData) => {
  const now = weatherData.dt;
  const sunrise = weatherData.sys.sunrise;
  const sunset = weatherData.sys.sunset;
  return now < sunrise || now > sunset;
};

export default CurrentWeather;