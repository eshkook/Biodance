import Box from '@mui/material/Box';
import Navbar from './Navbar';
import Welcome from './Welcome';
import Hero from './Hero';
import { useLocation } from "react-router-dom"
import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';

export default function LandingPage() {
  
  const location = useLocation()
  const [showMessage, setShowMessage] = useState((location.state && location.state.quick_message));

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Box
        sx={{
          pt: '64px', // because the navbar will be fixed and has 64px height. will not prevent the backgroundImage to cover all the page
          minHeight: '100vh', // Minimum height of the viewport
          width: '100vw', // Width of the viewport
          backgroundImage: `url(${process.env.PUBLIC_URL + '/images/img_6.jpg'})`,
          backgroundSize: 'cover', // Cover the entire area, keeping original proportion by zooming in (some of the image is thrown out)
          backgroundPosition: 'center', // Center the image
          backgroundRepeat: 'no-repeat', // Do not repeat the image
          position: 'relative'
        }}
      >
        <Navbar />
        {showMessage && (
          <Typography
            sx={{
              position: 'absolute',
              top: '64px', // Just below the navbar
              left: '50%',
              transform: 'translateX(-50%)', // Center horizontally
              zIndex: 1000, // Ensure it's above other elements
              color: 'white'
            }}
          >
            Succuessfully logged out!
          </Typography>
        )}
        <Welcome />
        <Hero />
      </Box>
    </>
  );
}
