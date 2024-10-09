import React, { useEffect } from "react";
import AppBar from "./components/AppBar";
import { Grid2 } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SignIn from "./components/SignIn";

const LoginPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:8080/auth/status', { 
      credentials: 'include'
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data.isAuthenticated) {
          navigate('/weather');
        }
      })
      .catch(err => {
        console.error('Error checking authentication status:', err);
      });
  }, [navigate]);

  return (
    <>
      <AppBar />
      <Grid2
        sx={{
          flexGrow: 1,
          bgcolor: 'primary.main',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: 'calc(100vh - 64px)',
        }}
      >
        <SignIn />
      </Grid2>
    </>
  );
};

export default LoginPage;
