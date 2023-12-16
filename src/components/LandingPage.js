import Welcome from './Welcome';
import Hero from './Hero';
import { useLocation } from "react-router-dom"
import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';

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
          {location.state.quick_message}
        </Typography>
      )}
      <Welcome />
      <Hero />
    </>
  );
}





