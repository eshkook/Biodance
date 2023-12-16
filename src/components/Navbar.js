import React from 'react';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import SortIcon from '@mui/icons-material/Sort';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function Navbar({ homeLink = "/" }) {

    const navigate = useNavigate();

    const handleHomeClick = () => {
        if (window.location.pathname === homeLink) {
            window.location.reload();
        } else {
            navigate(homeLink);
        }
    };

    return (
        <>
            <AppBar position="fixed" sx={{ background: 'none', boxShadow: 'none' }}>
                <Toolbar sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '80%',
                    margin: '0 auto'
                }}>
                    <Typography variant="h5" sx={{ color: '#fff', fontFamily: "'Nunito', sans-serif", cursor: 'pointer' }} onClick={handleHomeClick}>
                        Biodanz<span style={{ color: '#14c484' }}>App</span>
                    </Typography>
                    <IconButton>
                        <SortIcon sx={{ color: '#fff', fontSize: '2rem' }} />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </>
    );
}
    // return (
    //     <>
    //         <AppBar position="fixed" sx={{ background: 'none', boxShadow: 'none' }}>
    //             {/* The standard height of a Material-UI AppBar is 64 pixels for desktop screens. */}
    //             <Toolbar sx={{
    //                 display: 'flex',
    //                 alignItems: 'center',
    //                 justifyContent: 'space-between',
    //                 width: '80%',
    //                 margin: '0 auto'
    //             }}>
    //                 <Link to={homeLink} style={{ textDecoration: 'none' }}>
    //                     <Typography variant="h5" sx={{ color: '#fff', fontFamily: "'Nunito', sans-serif" }}>
    //                         Biodanz<span style={{ color: '#14c484' }}>App</span>
    //                     </Typography>
    //                 </Link>
    //                 <IconButton>
    //                     <SortIcon sx={{ color: '#fff', fontSize: '2rem' }} />
    //                 </IconButton>
    //             </Toolbar>
    //         </AppBar>
    //     </>
    // );

