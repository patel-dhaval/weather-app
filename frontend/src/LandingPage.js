import React from "react";
import {
  Button,
  Typography,
  Box,
  useMediaQuery,
  useTheme,
  Link,
} from "@mui/material";

const LandingPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        bgcolor: "#0b131e",
        color: "#f0f1f1",
        padding: isMobile ? 2 : 4,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          width: isMobile ? "100%" : "50%",
          height: isMobile ? "auto" : "80%",
          bgcolor: "#202b3b",
          borderRadius: 3,
          padding: isMobile ? 2 : 4,
          mb: isMobile ? 4 : 0,
        }}
      >
        <Box
          component="img"
          src="https://assets.api.uizard.io/api/cdn/stream/d0bb0968-406e-4014-b9ab-080788e9d44b.png"
          alt="Umbrella"
          sx={{
            width: "80%",
            height: "auto",
            borderRadius: 2,
          }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: isMobile ? "100%" : "50%",
          textAlign: "center",
          px: 2,
        }}
      >
        <Typography
          variant={isMobile ? "h2" : "h1"}
          sx={{ fontWeight: 600, mb: 2 }}
        >
          Weather App
        </Typography>
        <Typography
          variant={isMobile ? "h6" : "h5"}
          sx={{ color: "#9399a2", mb: 4 }}
        >
          Dhaval Patel
        </Typography>
        <Typography variant="body1" sx={{ mb: 2, maxWidth: "600px" }}>
          This app uses the OpenWeatherAPI to fetch real-time weather data. Get accurate forecasts, current conditions, and more for any location worldwide.
        </Typography>
        <Typography variant="body1" sx={{ mb: 2, maxWidth: "600px" }}>
          To use this app:
          <ol style={{ textAlign: "left" }}>
            <li>Sign up and log in</li>
            <li>Go to the Settings page to add your OpenWeatherAPI key</li>
            <li>Search for a city on the Weather page to get detailed weather information</li>
          </ol>
        </Typography>
        <Typography variant="body2" sx={{ mb: 4, maxWidth: "600px" }}>
          Don't have an API key? Generate one for free at{" "}
          <Link 
            href="https://openweathermap.org/api" 
            target="_blank" 
            rel="noopener noreferrer"
            sx={{ color: "#0095ff" }}
          >
            OpenWeatherMap
          </Link>
        </Typography>
        <Button
          variant="contained"
          sx={{
            bgcolor: "#0095ff",
            color: "#f5f5f5",
            borderRadius: 3,
            padding: "12px 24px",
            fontSize: "14px",
            fontWeight: 500,
          }}
          href="/login"
        >
          Get started
        </Button>
      </Box>
    </Box>
  );
};

export default LandingPage;
