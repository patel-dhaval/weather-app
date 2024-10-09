import React from 'react';
import { styled } from '@mui/system';
import { Typography, Box, Grid2 } from '@mui/material';
import WeatherIcon from 'react-icons-weather';

const ForecastContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: '#202b3b',
  borderRadius: '16px',
  color: '#fff',
}));

const ForecastDay = styled(Grid2)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '12px 0',
  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
  '&:last-child': {
    borderBottom: 'none',
  },
});

const DayText = styled(Typography)({
  color: '#e7e7eb',
  fontSize: '1rem',
  width: '40px',
});

const WeatherText = styled(Typography)({
  color: '#9399a2',
  fontSize: '1rem',
  flex: 1,
  textAlign: 'right',
});

const Temperature = styled(Typography)({
  fontSize: '1rem',
  fontWeight: 'bold',
  color: '#e7e7eb',
  width: '60px',
  textAlign: 'right',
});

const StyledWeatherIcon = styled(WeatherIcon)({
  fontSize: '24px',
  color: '#e7e7eb',
  margin: '0 16px',
});

const FiveDayForecast = ({ forecastData }) => {
  if (!forecastData || !forecastData.list) return null;

  const groupedForecast = forecastData.list.reduce((acc, item) => {
    const date = new Date(item.dt * 1000).toLocaleDateString();
    if (!acc[date]) {
      acc[date] = item;
    }
    return acc;
  }, {});

  const fiveDayForecast = Object.values(groupedForecast).slice(0, 5);

  return (
    <ForecastContainer>
      <Typography variant="h6" gutterBottom sx={{ color: '#e7e7eb', marginBottom: 2, fontWeight: 'medium' }}>
        5-DAY FORECAST
      </Typography>
      <Grid2 container direction="column" spacing={2}>
        {fiveDayForecast.map((day, index) => (
          <Grid2 item xs={12} key={index}>
            <ForecastDay container alignItems="center">
              <Grid2 xs={2}>
                <DayText>{new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' })}</DayText>
              </Grid2>
              <Grid2 xs={2}>
                <StyledWeatherIcon name="owm" iconId={day.weather[0].id.toString()} />
              </Grid2>
              <Grid2 xs={5}>
                <WeatherText>{day.weather[0].main}</WeatherText>
              </Grid2>
              <Grid2 xs={3}>
                <Temperature>{Math.round(day.main.temp_max)}°/{Math.round(day.main.temp_min)}°</Temperature>
              </Grid2>
            </ForecastDay>
          </Grid2>
        ))}
      </Grid2>
    </ForecastContainer>
  );
};

export default FiveDayForecast;
