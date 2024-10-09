require('dotenv').config();
const express = require('express');
const session = require('express-session');
const SQLiteStore = require('connect-sqlite3')(session);
const passport = require('./auth/googleAuth');
const { logger, errorHandler } = require('./middleware/middleware');
const routes = require('./routes/index');
const settingsRoutes = require('./routes/settings');
const weatherRoutes = require('./routes/weather');

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.json());
app.use(logger);

// Cookie parser
const cookieParser = require('cookie-parser');
app.use(cookieParser());

// Session management with SQLite store
app.use(session({
  store: new SQLiteStore({ db: 'sessions.sqlite', dir: './' }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
  }
}));
// Initialize Passport and restore authentication state, if any, from the session
app.use(passport.initialize());
app.use(passport.session());

// Middleware to log when a session is created
app.use((req, res, next) => {
  if (req.session.isNew) {
    console.log('A new session has been created:', req.sessionID);
  }
  next();
});

// Middleware to log session cookie
app.use((req, res, next) => {
  const sessionCookie = req.headers.cookie;
  next();
});

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Routes
app.use('/', routes);
app.use('/', settingsRoutes);
app.use('/', weatherRoutes);

// Error handling middleware
app.use(errorHandler);

// Debug session details
app.use((req, res, next) => {
  console.log('Session details:', req.session);
  if (req.user) {
    console.log('Logged in user:', req.user);
  } else {
    console.log('No user is currently logged in.');
  }
  next();
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
