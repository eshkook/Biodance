import * as React from 'react';
import Box from '@mui/material/Box';

export default function App() {
  return (
    <Box
      sx={{
        minHeight: '100vh', // Minimum height of the viewport
        width: '100vw', // Width of the viewport
        backgroundImage: `url(${process.env.PUBLIC_URL + '/images/bg.jpg'})`,
        backgroundSize: 'cover', // Cover the entire area
        backgroundPosition: 'center', // Center the image
        backgroundRepeat: 'no-repeat', // Do not repeat the image
      }}
    >
      {/* Your content here */}
    </Box>
  );
}
