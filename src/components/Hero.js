import React from 'react';
import Box from '@mui/material/Box';

export default function Hero() {
    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center', // Changed to 'stretch' to make the children (cards) of the same height
                flexDirection: { xs: 'column', md: 'row' }, // Responsive design: column layout for small screens, row layout for medium and larger screens
                p: 3, // Padding for the box
            }}
            id="hero"
        >

        </Box>
    );
}