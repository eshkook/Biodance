import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { Link, NavLink } from "react-router-dom"

export default function Hero() {
    return (
        <>
            <Box
                sx={{
                    minHeight: '100vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center', // Changed to 'stretch' to make the children (cards) of the same height
                    flexDirection: { xs: 'column', md: 'row' }, // Responsive design: column layout for small screens, row layout for medium and larger screens
                    // p: 300, // Padding for the box
                }}
                id="hero"
            >
                <ButtonGroup variant="contained" aria-label="outlined primary button group">
                    {/* uncomment: */}
                    <NavLink to="/home" state={{ no_failure_message: true }}>
                    {/* delete: */}
                    {/* <NavLink to="/login" state={{ no_failure_message: true }}> */}
                        <Button color="primary">Login</Button>
                    </NavLink>
                    <Link to={'/signup'} >
                        <Button color="secondary">Sign Up</Button>
                    </Link>
                </ButtonGroup>
            </Box>
        </>
    );
}