import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box';

export default function Authentication_Loading() {

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
          Loading...
        </Typography>
        <CircularProgress size={24} />
      </Box>
    </>
  );
};
