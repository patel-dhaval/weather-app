const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const db = require('../database');

passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  
  passport.deserializeUser((id, done) => {
    console.log('Deserializing user with ID:', id);
    db.get('SELECT * FROM users WHERE id = ?', [id], (err, user) => {
      if (err) {
        console.error('Error deserializing user:', err);
        return done(err);
      }
      done(null, user);
    });
  });

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
  db.get('SELECT * FROM users WHERE googleId = ?', [profile.id], (err, user) => {
    if (err) return done(err);
    if (user) {
      // Update tokens if they exist
      db.run('UPDATE users SET accessToken = ?, refreshToken = ? WHERE googleId = ?', 
        [accessToken, refreshToken, profile.id], 
        (err) => {
          if (err) return done(err);
          return done(null, user);
        });
    } else {
      // Insert new user with tokens
      db.run('INSERT INTO users (googleId, firstName, lastName, email, accessToken, refreshToken) VALUES (?, ?, ?, ?, ?, ?)', 
        [profile.id, profile.name.givenName, profile.name.familyName, profile.emails[0].value, accessToken, refreshToken], 
        function(err) {
          if (err) return done(err);
          return done(null, { id: this.lastID, ...profile });
        });
    }
  });
}));


module.exports = passport;