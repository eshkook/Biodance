import React from 'react';
import Box from '@mui/material/Box';
import Navbar from './Navbar';
import { Outlet, useLocation } from 'react-router-dom';

export default function Layout() {

  const location = useLocation();
  
  // Determine the home link based on the current path
  const homeLink = location.pathname.startsWith('/home') ? '/home' : '/';

  return (
    <Box
      sx={{
        pt: '64px',
        minHeight: '100vh',
        width: '100vw',
        backgroundImage: `url(${process.env.PUBLIC_URL + '/images/img_6.jpg'})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'relative',
      }}
    >
      <Navbar homeLink={homeLink} />
      <Outlet />
    </Box>
  );
};

