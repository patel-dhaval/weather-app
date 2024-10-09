const express = require('express');
const db = require('../database');
const ensureAuthenticated = require('../middleware/authMiddleware');
const router = express.Router();

// Get user settings
router.get('/settings', ensureAuthenticated, (req, res) => {
  const userId = req.user.id;
  db.all('SELECT key, value FROM settings WHERE user_id = ?', [userId], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to retrieve settings' });
    }
    const settings = {};
    rows.forEach(row => {
      settings[row.key] = row.value;
    });
    res.json(settings);
  });
});

// Update user settings
router.post('/settings', ensureAuthenticated, (req, res) => {
  const userId = req.user.id;
  const { key, value } = req.body;

  // Validate inputs
  if (!key || typeof key !== 'string' || !value || typeof value !== 'string') {
    return res.status(400).json({ error: 'Key and value must be non-empty strings' });
  }

  db.run(
    `INSERT INTO settings (user_id, key, value) 
     VALUES (?, ?, ?) 
     ON CONFLICT(user_id, key) 
     DO UPDATE SET value = excluded.value`, 

    [userId, key, value], 
    function(err) {
      if (err) {
        return res.status(500).json({ error: 'Failed to update settings' });
      }
      res.json({ message: 'Settings updated' });
    }
  );
});

// Delete user setting
router.delete('/settings/:key', ensureAuthenticated, (req, res) => {
  const userId = req.user.id;
  const { key } = req.params;

  db.run('DELETE FROM settings WHERE user_id = ? AND key = ?', [userId, key], function(err) {
    if (err) {
      return res.status(500).json({ error: 'Failed to delete setting' });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Setting not found' });
    }
    res.json({ message: 'Setting deleted' });
  });
});

module.exports = router;
