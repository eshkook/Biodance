import React, { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link as Scroll } from 'react-scroll'; // For smooth scrolling
import { Box, Typography } from '@mui/material';

export default function Welcome() {
    // State for controlling the animation (collapse effect)
    const [checked, setChecked] = useState(false);

    // useEffect hook to trigger the animation when the component mounts,
    //  the only way to trigger an animation is to change it from false to true at the Collapse container below
    useEffect(() => {
        setChecked(true);
    }, []);

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    // Adjusting height to prevent overflow and extra scrolling
                    height: 'calc(100vh - 64px)', // Subtracting AppBar height
                }}
                id="welcome_box"
            >
                <Collapse in={checked} {...(checked ? { timeout: 1500 } : {})} orientation="vertical">
                    {/* Inner Box for text alignment and styling */}
                    <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h3" sx={{ color: '#fff', fontSize: '4rem', fontWeight: 500, fontFamily: "'Nunito', sans-serif" }}>
                            Welcome to <br />
                            Biodanz<span style={{ color: '#14c484' }}>App</span>
                        </Typography>
                        <Scroll to="hero" smooth={true}>
                            <IconButton>
                                <ExpandMoreIcon sx={{ color: '#14c484', fontSize: '5rem' }} />
                            </IconButton>
                        </Scroll>
                    </Box>
                </Collapse>
            </Box>
        </>
    );
}
