import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Collapse from '@mui/material/Collapse';
import SortIcon from '@mui/icons-material/Sort';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link as Scroll } from 'react-scroll'; // For smooth scrolling
import { Box, Typography } from '@mui/material';

export default function Header() {
    // State for controlling the animation (collapse effect)
    const [checked, setChecked] = useState(false);

    // useEffect hook to trigger the animation when the component mounts,
    //  the only way to trigger an animation is to change it from false to true at the Collapse container below
    useEffect(() => {
        setChecked(true);
    }, []);

    return (
        <>
            {/* AppBar is the navbar */}
            <AppBar position="static" sx={{ background: 'none', boxShadow: 'none' }}>
                {/* Toolbar to hold navigation content */}
                <Toolbar sx={{ width: '80%', margin: '0 auto' }}>
                    {/* Typography for the title, with custom styles */}
                    <Typography variant="h5" sx={{ flexGrow: 1, color: '#fff' }}>
                        Biodanz<span style={{ color: '#14c484' }}>App</span>
                    </Typography>
                    {/* IconButton for an interactive icon */}
                    <IconButton>
                        <SortIcon sx={{ color: '#fff', fontSize: '2rem' }} />
                    </IconButton>
                </Toolbar>
            </AppBar>

            {/* Box component to hold the main content */}
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    // Adjusting height to prevent overflow and extra scrolling
                    height: 'calc(100vh - 64px)', // Subtracting AppBar height
                }}
                id="header"
            >
                {/* Collapse component for the animation effect */}
                <Collapse in={checked} {...(checked ? { timeout: 1000 } : {})}>
                    {/* Inner Box for text alignment and styling */}
                    <Box sx={{ textAlign: 'center' }}>
                        {/* Typography for the welcome message, with custom styles */}
                        <Typography variant="h3" sx={{ color: '#fff', fontSize: '4.5rem', fontWeight: 600, fontFamily: "'Nunito', sans-serif" }}>
                            Welcome to <br />
                            Biodanz<span style={{ color: '#14c484' }}>App</span>
                        </Typography>
                        {/* Scroll component for smooth scrolling to another section */}
                        <Scroll to="place-to-visit" smooth={true}>
                            {/* IconButton for an interactive icon */}
                            <IconButton>
                                <ExpandMoreIcon sx={{ color: '#14c484', fontSize: '4rem', fontFamily: "'Nunito', sans-serif" }} />
                            </IconButton>
                        </Scroll>
                    </Box>
                </Collapse>
            </Box>
        </>
    );
}
