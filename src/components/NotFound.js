import { Navigate, useNavigate } from "react-router-dom"
import { useEffect } from "react"
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box';
import Navbar from './Navbar';
import Layout from './Layout';

export default function NotFound() {
    const navigate = useNavigate()
    useEffect(() => {
        const timer = setTimeout(() => {
            // navigate("/", {state: "Error Page no real"})
            navigate(-1) // like clicking 'back'
            // navigate(-2) // like clicking 'back' twice
        }, 1000)

        // Cleanup the timeout if the component is unmounted
        return () => {
            clearTimeout(timer)
        }
    }, [])

    return (
        <>
            <Box sx={{
                maxWidth: '400px',
                margin: '0 auto',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center', // Center aligns all children horizontally 
                justifyContent: 'center', // Center aligns all children vertically (if needed)
            }}>

                <Typography variant="subtitle1" component="h1" color="white" sx={{ marginTop: 15, fontSize: '1.5rem' }}>
                    Page Not Found
                </Typography>
                <CircularProgress size={24} />
            </Box>
        </>
    )
}