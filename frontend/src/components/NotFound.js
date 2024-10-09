import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        bgcolor: '#0b131e',
        color: '#fff',
      }}
    >
      <Typography variant="h1" sx={{ mb: 2 }}>
        404
      </Typography>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Page Not Found
      </Typography>
      <Button
        component={Link}
        to="/"
        variant="contained"
        sx={{
          bgcolor: '#202b3b',
          '&:hover': {
            bgcolor: '#2c3e50',
          },
        }}
      >
        Go to Home
      </Button>
    </Box>
  );
};

export default NotFound;
