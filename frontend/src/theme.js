import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0b131e', // Dark background color
      light: '#202b3b', // Secondary text color
    },
    secondary: {
      main: '#fdd835', // Accent color
      light: '#202b3b', // Accent color
    },
    text: {
      primary: '#fff', // Text color
      secondary: '#202b3b', // Secondary text color
    },
  },
});

export default theme;
