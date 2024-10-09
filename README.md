# Weather App

## Description

This Weather App is a full-stack application that provides real-time weather information using the OpenWeatherAPI. It features a React frontend with Material-UI components and a Node.js backend with Express.

## Features

- User authentication with Google OAuth2
- Real-time weather data for any city
- 5-day weather forecast
- Customizable settings for API keys
- Responsive design for mobile and desktop

## Tech Stack

### Frontend
- React
- Material-UI
- React Router
- React Toastify

### Backend
- Node.js
- Express
- Passport.js (Google OAuth2)
- SQLite3

## Installation

### Prerequisites
- Node.js (v14 or later)
- npm

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the backend directory with the following content:
   ```
   PORT=8080
   SESSION_SECRET=your_session_secret
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   ```

4. Start the backend server:
   ```
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the frontend development server:
   ```
   npm start
   ```

## Usage

1. Open your browser and go to `http://localhost:3000`
2. Log in using your Google account
3. Navigate to the Settings page to add your OpenWeatherAPI key
4. Use the search bar on the Weather page to get weather information for any city

## Project Structure

### Backend

```
backend/
├── src/
│   ├── auth/
│   │   └── googleAuth.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── middleware.js
│   ├── routes/
│   │   ├── index.js
│   │   ├── settings.js
│   │   └── weather.js
│   ├── database.js
│   └── server.js
├── package.json
└── .env
```

### Frontend

```
frontend/
├── public/
│   ├── index.html
│   └── manifest.json
├── src/
│   ├── components/
│   │   ├── AirConditions.js
│   │   ├── AppBar.js
│   │   ├── CurrentWeather.js
│   │   ├── FiveDayForecast.js
│   │   ├── NavBar.js
│   │   ├── SearchBar.js
│   │   └── SignIn.js
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   ├── index.css
│   ├── LandingPage.js
│   ├── LoginPage.js
│   ├── SettingsPage.js
│   └── WeatherPage.js
├── package.json
└── README.md
```

## API Endpoints

- `/auth/google`: Google OAuth2 login
- `/auth/google/callback`: Google OAuth2 callback
- `/settings`: GET and POST user settings
- `/weather`: GET current weather data
- `/forecast`: GET 5-day weather forecast

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
