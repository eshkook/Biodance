import * as React from 'react';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import Confirmation from './components/Confirmation';
import { Route, Routes } from "react-router-dom"
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme,ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          backgroundColor: 'white', // Background color for all TextFields
          '& label.Mui-focused': {
            color: 'primary.main', // Label color when focused
          },
          '& label': {
            color: 'secondary.main', // Default label color
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'rgba(0, 0, 0, 0.23)', // Border color
            },
            '&:hover fieldset': {
              borderColor: 'black', // Border color on hover
            },
            '&.Mui-focused fieldset': {
              borderColor: 'primary.main', // Border color when focused
            },
          },
        },
      },
    },
  },
});

export default function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </ThemeProvider>
    </>
  );
}
