import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box';
import Navbar from './Navbar';

export default function Authentication_Loading() {

    return (
        <>
            <Box
                sx={{
                    pt: '64px', // because the navbar will be fixed and has 64px height. will not prevent the backgroundImage to cover all the page
                    minHeight: '100vh', // Minimum height of the viewport
                    width: '100vw', // Width of the viewport
                    backgroundImage: `url(${process.env.PUBLIC_URL + '/images/img_6.jpg'})`,
                    backgroundSize: 'cover', // Cover the entire area, keeping original proportion by zooming in (some of the image is thrown out)
                    backgroundPosition: 'center', // Center the image
                    backgroundRepeat: 'no-repeat', // Do not repeat the image
                }}
            >
                <Navbar />
                <Typography variant="subtitle1" component="h1" color="white">
                    Loading...
                </Typography>
                <CircularProgress size={24} />

            </Box>
        </>
    );
};




