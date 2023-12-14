import * as React from 'react';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import Confirmation from './components/Confirmation';
import { Route, Routes } from "react-router-dom"
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Navigate } from 'react-router-dom';

const theme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          // Input text color
          color: 'white',
          // Border color
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'white',
            },
            '&:hover fieldset': {
              borderColor: 'white',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'white',
            },
          },
          // Label color
          '& label': {
            color: 'white',
          },
          '& label.Mui-focused': {
            color: 'white',
          },
          // Input text color
          '& .MuiOutlinedInput-input': {
            color: 'white',
          },
          '& .MuiInput-underline:before': {
            borderBottomColor: 'white',
          },
          '& .MuiInput-underline:after': {
            borderBottomColor: 'white',
          },
        },
      },
    },
  },
});

export default function App() {

  const ProtectedRoute = ({ children }) => {
    const isAuthenticated = true /* Logic to determine if the user is authenticated */;
    return isAuthenticated ? children : <Navigate to="/" />;
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/confirmation" element={<Confirmation />} />
          {/* <Route path="/home" element={<Home />} /> */}
          <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        </Routes>
      </ThemeProvider>
    </>
  );
}
