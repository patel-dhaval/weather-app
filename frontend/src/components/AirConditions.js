import React from "react";
import { Typography, Box, Grid2 } from "@mui/material";
import { styled } from "@mui/system";
import ThermostatIcon from '@mui/icons-material/Thermostat';
import OpacityIcon from '@mui/icons-material/Opacity';
import AirIcon from '@mui/icons-material/Air';
import VisibilityIcon from '@mui/icons-material/Visibility';

const StyledCard = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: '24px',
  backgroundColor: '#202b3b',
  color: '#fff',
  height: '100%',
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  color: '#9399a2',
  marginBottom: theme.spacing(1),
}));

const ValueTypography = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '1.5rem',
  lineHeight: 1,
}));

const MetricContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
}));

const AirConditionsCard = ({ weatherData }) => {
  if (!weatherData) return null;

  const { main, wind, visibility } = weatherData;
  const feelsLike = Math.round(main.feels_like);
  const windSpeed = wind.speed;
  const isMetric = weatherData.unit === 'metric';
  const windSpeedUnit = isMetric ? 'm/s' : 'mph';
  const visibilityUnit = isMetric ? 'km' : 'mi';

  return (
    <StyledCard>
      <Typography variant="h6" gutterBottom sx={{ mb: 3, fontWeight: 'medium' }}>
        AIR CONDITIONS
      </Typography>
      <Grid2 container spacing={2} justifyContent="space-between">
        <Grid2 item xs={12} sm={6} md={3}>
          <MetricContainer>
            <IconWrapper>
              <ThermostatIcon sx={{ mr: 1, fontSize: 20 }} />
              <Typography variant="body2">Real Feel</Typography>
            </IconWrapper>
            <ValueTypography>{feelsLike}°</ValueTypography>
          </MetricContainer>
        </Grid2>
        <Grid2 item xs={12} sm={6} md={3}>
          <MetricContainer>
            <IconWrapper>
              <AirIcon sx={{ mr: 1, fontSize: 20 }} />
              <Typography variant="body2">Wind</Typography>
            </IconWrapper>
            <ValueTypography>{windSpeed} {windSpeedUnit}</ValueTypography>
          </MetricContainer>
        </Grid2>
        <Grid2 item xs={12} sm={6} md={3}>
          <MetricContainer>
            <IconWrapper>
              <OpacityIcon sx={{ mr: 1, fontSize: 20 }} />
              <Typography variant="body2">Humidity</Typography>
            </IconWrapper>
            <ValueTypography>{main.humidity}%</ValueTypography>
          </MetricContainer>
        </Grid2>
        <Grid2 item xs={12} sm={6} md={3}>
          <MetricContainer>
            <IconWrapper>
              <VisibilityIcon sx={{ mr: 1, fontSize: 20 }} />
              <Typography variant="body2">Visibility</Typography>
            </IconWrapper>
            <ValueTypography>{visibility.toFixed(1)} {visibilityUnit}</ValueTypography>
          </MetricContainer>
        </Grid2>
      </Grid2>
    </StyledCard>
  );
};

export default AirConditionsCard;
