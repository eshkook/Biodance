import * as React from 'react';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import Layout from './components/Layout';
import Confirmation from './components/Confirmation';
import Reset_Password_Email_Phase from './components/Reset_Password_Email_Phase';
import Reset_Password_Code_Phase from './components/Reset_Password_Code_Phase';
import NotFound from './components/NotFound';
import ProtectedRoute from './components/ProtectedRoute';
import Authentication_Loading from './components/Authentication_Loading';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Routes, Route } from "react-router-dom";

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

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<Layout homeLink='/' />}>
            <Route index element={<LandingPage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/confirmation" element={<Confirmation />} />
            <Route path="/login" element={<Login />} />
            <Route path="/reset_password_email_phase" element={<Reset_Password_Email_Phase />} />
            <Route path="/reset_password_code_phase" element={<Reset_Password_Code_Phase />} />
            <Route path="/authentication_loading" element={<Authentication_Loading />} />
            <Route path="*" element={<NotFound />} /> {/* any sub-route that is not one of the above will fall here */}
          </Route>
          <Route path="/" element={<Layout homeLink='/home' />}>
            {/* delete: */}
            <Route path="/home" element={<Home />} />
            {/* uncomment: */}
            {/* <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} /> */}
          </Route>
        </Routes>
      </ThemeProvider>
    </>
  );
}



