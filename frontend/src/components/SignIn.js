import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import { GoogleIcon } from './CustomIcons';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '450px',
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(3),
    maxWidth: '100%',
    boxShadow: 'none',
    background: 'transparent',
  },
  boxShadow:
    theme.palette.mode === 'dark'
      ? 'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px'
      : 'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  minHeight: "100vh",
  padding: theme.spacing(2),
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(2),
    justifyContent: 'flex-start',
    paddingTop: theme.spacing(8),
  },
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    backgroundImage:
      'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
    ...theme.applyStyles('dark', {
      backgroundImage:
        'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
    }),
  },
}));

export default function SignIn(props) {
  const handleGoogleSignIn = () => {
    window.location.href = "http://localhost:8080/auth/google";
  };

  return (
      <SignInContainer direction="column" justifyContent="center">
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{
              width: "100%",
              color: "text.secondary",
              fontSize: "clamp(1.5rem, 8vw, 2.15rem)",
              textAlign: "center",
              marginBottom: (theme) => theme.spacing(4),
              fontWeight: "bold",
            }}
          >
            Welcome Back
          </Typography>
          <Typography
            variant="body1"
            sx={{
              textAlign: 'center',
              marginBottom: (theme) => theme.spacing(4),
              color: 'text.secondary',
            }}
          >
            Sign in to continue to your account
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Button
              fullWidth
              variant="contained"
              onClick={handleGoogleSignIn}
              startIcon={<GoogleIcon />}
              sx={{
                padding: (theme) => theme.spacing(1.5),
                fontSize: '1rem',
                textTransform: 'none',
                borderRadius: (theme) => theme.shape.borderRadius * 2,
              }}
            >
              Sign in with Google
            </Button>
          </Box>
        </Card>
      </SignInContainer>
  );
}
