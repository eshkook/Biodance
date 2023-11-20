import React from 'react';
import ImageCard from './ImageCard';
// import places from '../static/places';
import useWindowPosition from '../hook/useWindowPosition';

export default function PlaceToVisit() {
  const checked = useWindowPosition('header');

  return (
    <div
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: { md: 'column' }, // Responsive design using breakpoints
        id: "place-to-visit"
      }}
    >
      {/* <ImageCard place={places[1]} checked={checked} /> */}
      {/* <ImageCard place={places[0]} checked={checked} /> */}
    </div>
  );
}
