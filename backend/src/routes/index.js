const express = require('express');
const router = express.Router();
const passport = require('../auth/googleAuth');
const cors = require('cors');
const ensureAuthenticated = require('../middleware/authMiddleware');
// Use CORS middleware
router.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

// Home route
router.get('/', (req, res) => {
  res.send('Welcome to the ResFrac Weather App Backend!');
});

// Google OAuth2 login
router.get('/auth/google', (req, res, next) => {
  if (req.isAuthenticated()) {

    console.log('User is already authenticated, redirecting to weather page');
    return res.redirect('http://localhost:3000/weather');
  }
  next();
}, passport.authenticate('google', {
  scope: ['profile', 'email']
}));

// Google OAuth2 callback with error handling
router.get('/auth/google/callback', passport.authenticate('google', {
  failureRedirect: '/',
  session: true
}), (req, res) => {
  console.log('Authentication successful');
  console.log('Session:', req.session);

  // Redirect to the frontend weather page
  res.redirect('http://localhost:3000/weather');
}, (err, req, res, next) => {
  console.error('Authentication error:', err);
  res.status(500).send('An error occurred during authentication.');
});

// Check authentication status
router.get('/auth/status', ensureAuthenticated, (req, res) => {
  if (req.isAuthenticated()) {
    res.json({
      isAuthenticated: true,
      user: {
        name: req.user.firstName,
      },
    });
  } else {
    res.json({ isAuthenticated: false });
  }
});

// Logout route
router.get('/logout', ensureAuthenticated, (req, res) => {
  console.log('Logout initiated');
  req.logout((err) => {
    if (err) {
      console.error('Error during logout:', err);
      return res.status(500).send('An error occurred during logout.');
    }
    console.log('Logout successful, destroying session');
    req.session.destroy((err) => {
      if (err) {
        console.error('Error destroying session:', err);
        return res.status(500).send('An error occurred while destroying the session.');
      }
      console.log('Session destroyed, clearing cookie');
      res.clearCookie('connect.sid');
      res.send('Logout successful');
    });
  });
});


module.exports = router;