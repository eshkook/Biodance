import Welcome from './Welcome';
import Hero from './Hero';
import { useLocation } from "react-router-dom"
import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function LandingPage() {

  const location = useLocation()
  const [showMessage, setShowMessage] = useState(location.state?.quick_message);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Box sx={{
        maxWidth: '400px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center', // Center aligns all children horizontally 
        justifyContent: 'center', // Center aligns all children vertically (if needed)
      }}>
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
            {location.state?.quick_message}
          </Typography>
        )}
        <Welcome />
        <Hero />
      </Box>
    </>
  );
}





