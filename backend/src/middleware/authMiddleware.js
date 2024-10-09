const ensureAuthenticated = (req, res, next) => {
  console.log('Checking authentication status...');
  console.log('Session ID:', req.sessionID);


  if (req.isAuthenticated()) {
    console.log('User is authenticated');
    return next();
  }
  console.log('User is not authenticated');
  res.status(401).json({ error: 'Unauthorized' });

};

module.exports = ensureAuthenticated;
