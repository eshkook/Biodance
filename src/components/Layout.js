import React from 'react';
import Box from '@mui/material/Box';
import Navbar from './Navbar';
import { Outlet, useLocation } from 'react-router-dom';

export default function Layout() {

  const location = useLocation();
  
  const homeLink = location.pathname.startsWith('/home') ? '/home' : '/';
  const backgroundImage = (location.pathname == '/') ? `url(${process.env.PUBLIC_URL + '/images/img_6.jpg'})` : 
                                                       `url(${process.env.PUBLIC_URL + '/images/img_6.jpg'})`;

  return (
    <Box
      sx={{
        pt: '64px',
        minHeight: '100vh',
        width: '100vw',
        backgroundImage: backgroundImage,
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

