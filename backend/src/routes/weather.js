const express = require('express');
const db = require('../database');
const ensureAuthenticated = require('../middleware/authMiddleware');
const router = express.Router();

// Fetch weather data
router.get('/weather', ensureAuthenticated, (req, res) => {
  const userId = req.user.id;
  const { city, unit } = req.query;

  if (!city) {
    return res.status(400).json({ error: 'City is required' });
  }

  db.get('SELECT value FROM settings WHERE user_id = ? AND key = ?', [userId, 'weather_key'], async (err, row) => {
    if (err || !row) {
      return res.status(500).json({ error: 'Failed to retrieve API key' });
    }

    const apiKey = row.value;

    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`);
      const weatherData = await response.json();
      
      if (!response.ok) {
        return res.status(response.status).json({ error: weatherData.message });
      }

      res.json({ ...weatherData, unit });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch weather data' });
    }
  });
});

// Fetch weather forecast
router.get('/forecast', ensureAuthenticated, (req, res) => {
  const userId = req.user.id;
  const { city, unit } = req.query;

  if (!city) {
    return res.status(400).json({ error: 'City is required' });
  }

  db.get('SELECT value FROM settings WHERE user_id = ? AND key = ?', [userId, 'weather_key'], async (err, row) => {
    if (err || !row) {
      return res.status(500).json({ error: 'Failed to retrieve API key' });
    }

    const apiKey = row.value;

    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${unit}`);
      const forecastData = await response.json();

      if (!response.ok) {
        return res.status(response.status).json({ error: forecastData.message });
      }

      res.json({ ...forecastData, unit });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch forecast data' });
    }
  });
});

module.exports = router;
