import Box from '@mui/material/Box';
import * as React from 'react';
import Navbar from './Navbar';
import Welcome from './Welcome';
import Hero from './Hero';

// const theme = createTheme({
//   typography: {
//     fontFamily: [
//       'Nunito',
//       'sans-serif',
//     ].join(','),
//   },
// });

export default function LandingPage() {
  return (
    <>
      {/* <ThemeProvider theme={theme}> */}
      <Box
        sx={{
          pt: '64px', // because the navbar will be fixed and has 64px height. will not prevent the backgroundImage to cover all the page
          minHeight: '100vh', // Minimum height of the viewport
          width: '100vw', // Width of the viewport
          backgroundImage: `url(${process.env.PUBLIC_URL + '/images/img_6.jpg'})`,
          backgroundSize: 'cover', // Cover the entire area, keeping original proportion by zooming in (some of the image is thrown out)
          backgroundPosition: 'center', // Center the image
          backgroundRepeat: 'no-repeat', // Do not repeat the image
        }}
      >
        <Navbar />
        <Welcome />
        <Hero />
      </Box>
      {/* </ThemeProvider> */}
    </>

  );
}
