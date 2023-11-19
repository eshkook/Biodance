import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Collapse from '@mui/material/Collapse';
import SortIcon from '@mui/icons-material/Sort';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Link as Scroll } from 'react-scroll';
import { Box, Typography } from '@mui/material';

export default function Header() {
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        setChecked(true);
    }, []);

    return (
        <>
            <AppBar position="static" sx={{ background: 'none', boxShadow: 'none' }}>
                <Toolbar sx={{ width: '80%', margin: '0 auto' }}>
                    <Typography variant="h6" sx={{ flexGrow: 1, color: '#fff' }}>
                        My<span style={{ color: '#5AFF3D' }}>Island.</span>
                    </Typography>
                    <IconButton>
                        <SortIcon sx={{ color: '#fff', fontSize: '2rem', }} />
                    </IconButton>
                </Toolbar>
            </AppBar>

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                    // fontFamily: "'Nunito', sans-serif" 
                }}
                id="header"
            >
                <Collapse in={checked} {...(checked ? { timeout: 1000 } : {})}>
                    <Box sx={{ textAlign: 'center' }}>
                        <Typography variant="h3" sx={{ color: '#fff', fontSize: '4.5rem', fontWeight: 600, fontFamily: "'Nunito', sans-serif"  }}>
                            Welcome to <br />
                            My<span style={{ color: '#5AFF3D' }}>Island.</span>
                        </Typography>
                        <Scroll to="place-to-visit" smooth={true}>
                            <IconButton>
                                <ExpandMoreIcon sx={{ color: '#5AFF3D', fontSize: '4rem', fontFamily: "'Nunito', sans-serif"  }} />
                            </IconButton>
                        </Scroll>
                    </Box>
                </Collapse>

            </Box>
        </>
    );
}
