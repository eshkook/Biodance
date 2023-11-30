import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Header from './components/Header';
import PlaceToVisit from './components/PlaceToVisit';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// const theme = createTheme({
//   typography: {
//     fontFamily: [
//       'Nunito',
//       'sans-serif',
//     ].join(','),
//   },
// });

export default function App() {
  return (
    <>
      {/* <ThemeProvider theme={theme}> */}
      <CssBaseline />
      <Box
        sx={{
          pt: '64px', // because the navbar will be fixed and has 64px height. will not prevent the backgroundImage to cover all the page
          minHeight: '100vh', // Minimum height of the viewport
          width: '100vw', // Width of the viewport
          backgroundImage: `url(${process.env.PUBLIC_URL + '/images/img_6.jpg'})`,
          backgroundSize: 'cover', // Cover the entire area
          backgroundPosition: 'center', // Center the image
          backgroundRepeat: 'no-repeat', // Do not repeat the image
        }}
      >
        <Header />
        <PlaceToVisit />
      </Box>
      {/* </ThemeProvider> */}
    </>

  );
}
