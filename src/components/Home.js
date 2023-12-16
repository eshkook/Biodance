import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Typography from '@mui/material/Typography'
import { delete_post, logout_post } from "../api/posts.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

export default function Home() {

    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate()

    const logoutMutation = useMutation({
        mutationFn: logout_post,
        onSuccess: data => {
            navigate("/", { state: { quick_message: 'Succuessfully logged out!' } });
            // console.log("logout success")
        },
        onError: error => {
            setErrorMessage(error.message || "An error occurred");
            console.log(error.message || "An error occurred")
        }
    });

    const deleteMutation = useMutation({
        mutationFn: delete_post,
        onSuccess: data => {
            navigate("/", { state: { quick_message: 'Succuessfully deleted your account!' } });
            // console.log("delete success")
        },
        onError: error => {
            if (error.message == 'Session expired, please log in again. Account was not deleted.') {
                navigate("/", { state: { quick_message: 'Session expired, please log in again. Account was not deleted.' } });
            } else {
                setErrorMessage(error.message || "An error occurred");
                console.log(error.message || "An error occurred")
            }
        }
    });

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
                <Typography variant="subtitle1" component="h1" color="white">
                    Welcome to Home page!
                </Typography>
                <br />

                {errorMessage && (
                    <>
                        <Typography variant="body2" color="error">
                            {errorMessage}
                        </Typography>
                        <br />
                    </>
                )}

                <ButtonGroup variant="contained" aria-label="outlined primary button group">
                    <Button
                        color="primary"
                        onClick={() => logoutMutation.mutate()}
                        // style={{ marginRight: '10px' }}
                        disabled={logoutMutation.isLoading}
                    >
                        {deleteMutation.isLoading ? <CircularProgress size={24} /> : "Logout"}
                    </Button>
                    <Button
                        color="secondary"
                        onClick={() => deleteMutation.mutate()}
                        disabled={deleteMutation.isLoading}
                    >
                        {deleteMutation.isLoading ? <CircularProgress size={24} /> : "Delete Account"}
                    </Button>
                </ButtonGroup>
            </Box>
        </>
    )
}