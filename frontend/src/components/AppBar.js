import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import UmbrellaIcon from '@mui/icons-material/Umbrella';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';

const NavBar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:8080/auth/status', { credentials: 'include' })
      .then(response => response.json())
      .then(data => {
        setIsAuthenticated(data.isAuthenticated);
      })
      .catch(err => {
        console.error('Error checking authentication status:', err);
      });
  }, []);

  const handleLogin = () => {
    window.location.href = "http://localhost:8080/auth/google";
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:8080/logout', {
        method: 'GET',
        credentials: 'include'
      });
      if (response.ok) {
        navigate('/');
      } else {
        throw new Error('Logout failed');
      }
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const drawerList = (
    <Box
      sx={{ width: 250 }}
      height="100%"
      role="presentation"
      bgcolor="primary.main"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {isAuthenticated ? (
          <>
            <ListItem button onClick={() => navigate('/')}>
              <ListItemIcon>
                <HomeIcon sx={{ color: '#fff' }} />
              </ListItemIcon>
              <ListItemText primary="Home" sx={{ color: '#fff' }} />
            </ListItem>
            <ListItem button onClick={() => navigate('/weather')}>
              <ListItemIcon>
                <UmbrellaIcon sx={{ color: '#fff' }} />
              </ListItemIcon>
              <ListItemText primary="Weather" sx={{ color: '#fff' }} />
            </ListItem>
            <ListItem button onClick={() => navigate('/settings')}>
              <ListItemIcon>
                <SettingsIcon sx={{ color: '#fff' }} />
              </ListItemIcon>
              <ListItemText primary="Settings" sx={{ color: '#fff' }} />
            </ListItem>
            <ListItem button onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon sx={{ color: '#fff' }} />
              </ListItemIcon>
              <ListItemText primary="Logout" sx={{ color: '#fff' }} />
            </ListItem>
          </>
        ) : (
          <ListItem button onClick={handleLogin}>
            <ListItemText primary="Login" sx={{ color: '#fff' }} />
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          {isMobile && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ flexGrow: 1 }}
            onClick={() => navigate('/')}
            style={{ cursor: 'pointer' }}
          >
            Breeze Weather App
          </Typography>
          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 1 }}>
              {isAuthenticated ? (
                <>
                  <Button 
                    color="inherit" 
                    onClick={() => navigate('/')}
                    sx={{ minWidth: 0, p: 1 }}
                  >
                    <HomeIcon fontSize="small" sx={{ mr: 0.5 }} />
                    Home
                  </Button>
                  <Button 
                    color="inherit" 
                    onClick={() => navigate('/weather')}
                    sx={{ minWidth: 0, p: 1 }}
                  >
                    <UmbrellaIcon fontSize="small" sx={{ mr: 0.5 }} />
                    Weather
                  </Button>
                  <Button 
                    color="inherit" 
                    onClick={() => navigate('/settings')}
                    sx={{ minWidth: 0, p: 1 }}
                  >
                    <SettingsIcon fontSize="small" sx={{ mr: 0.5 }} />
                    Settings
                  </Button>
                  <Button 
                    color="inherit" 
                    onClick={handleLogout}
                    sx={{ minWidth: 0, p: 1 }}
                  >
                    <LogoutIcon fontSize="small" sx={{ mr: 0.5 }} />
                    Logout
                  </Button>
                </>
              ) : (
                <Button color="inherit" onClick={handleLogin}>Login</Button>
              )}
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <Toolbar /> {/* Add this to prevent content from hiding behind the AppBar */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        {drawerList}
      </Drawer>
    </>
  );
};

export default NavBar;
