import { Link, NavLink, Route, Routes, useLocation } from "react-router-dom"
import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Typography from '@mui/material/Typography'

export default function Authentication() {
    return (
        <>
            <Typography variant="subtitle1" component="h1">
                Authentication
            </Typography>
            <br />
            <ButtonGroup variant="contained" aria-label="outlined primary button group">
                <Link to={'/login'} >
                    <Button>Login</Button>
                </Link>
                <Link to={'/signup'} >
                    <Button>Sign Up</Button>
                </Link>
                {/* <Link to={'/youarelogged'} >
                    <Button>Temp Logging</Button>
                </Link>  */}
            </ButtonGroup>
        </>
    );
}


