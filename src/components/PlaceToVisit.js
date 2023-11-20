import React from 'react';
import Box from '@mui/material/Box';
import ImageCard from './ImageCard';
import places from '../static/places';
import useWindowPosition from '../hook/useWindowPosition';

export default function PlaceToVisit() {
  const checked = useWindowPosition('header');

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'stretch', // Changed to 'stretch' to make the children (cards) of the same height
        flexDirection: { xs: 'column', md: 'row' }, // Responsive design: column layout for small screens, row layout for medium and larger screens
        p: 3, // Padding for the box
      }}
      id="place-to-visit"
    >
      <ImageCard place={places[1]} checked={checked} />
      <ImageCard place={places[0]} checked={checked} />
    </Box>
  );
}
