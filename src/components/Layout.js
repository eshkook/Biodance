import React from 'react';
import Box from '@mui/material/Box';
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';

export default function Layout() {
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
        position: 'relative'
      }}
    >
      <Navbar />
      <Outlet />
    </Box>
  );
};

