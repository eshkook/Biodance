import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Typography from '@mui/material/Typography'
import { logout_post, gpt_post } from "../api/posts.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { Link } from "react-router-dom"
import TextField from '@mui/material/TextField';

export default function Home() {

    const [errorMessage, setErrorMessage] = useState(null);
    const [gptResponse, setGptResponse] = useState(null);
    const navigate = useNavigate()

    const [formState, setFormState] = useState({
        prompt: '',
    })

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

    const gptMutation = useMutation({
        mutationFn: gpt_post,
        onSuccess: data => {
            console.log(data)
        },
        onError: error => {
            setErrorMessage(error.message || "An error occurred");
            console.log(error.message || "An error occurred")
        }
    });

    function handleSubmit(event) {
        event.preventDefault() // preventing re-rendering the page
        gptMutation.mutate({
            prompt: formState.prompt,
        })
    }

    function updateFormState(event) {
        const { name, value } = event.target
        setFormState(prevFormState => ({
            ...prevFormState,
            [name]: value
        }))
    }

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

                {errorMessage && (
                    <>
                        <Typography variant="body2" color="error">
                            {errorMessage}
                        </Typography>
                    </>
                )}

                <Typography variant="subtitle1" component="h1" color="white" marginTop={3}>
                    Ask ChatGPT a question:
                </Typography>
                
                <form onSubmit={handleSubmit} noValidate autoComplete='off' marginTop={33}>
                    {/* noValidate makes the browser not use its built-in validation messages as we want to do it ourselves, 
          autoComplete off makes it not complete the user's text */}

                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '10px'
                        }}
                    >
                        <TextField
                            onChange={updateFormState} // same as writing onChange={()=>updateFormState(event)}
                            id="prompt-input"
                            label="Question for ChatGPT"
                            variant="outlined"
                            name="prompt"
                            value={formState.prompt}
                            autoFocus
                        />
                        <Button
                            variant="contained"
                            type='submit'
                            disabled={gptMutation.isLoading}>
                            {gptMutation.isLoading ? <CircularProgress size={24} /> : "Submit"}
                        </Button>
                    </Box>
                </form>
                {gptResponse && (
                    <>
                        <Typography variant="body2" color="error">
                            ChatGPT Response:
                        </Typography>
                        <br />
                        <Typography variant="body2" color="error">
                            {gptResponse}
                        </Typography>
                    </>
                )}

                <ButtonGroup variant="contained" aria-label="outlined primary button group">
                    <Button
                        color="primary"
                        onClick={() => logoutMutation.mutate()}
                        disabled={logoutMutation.isLoading}
                        sx={{ width: '110px' }}
                    >
                        {logoutMutation.isLoading ? <CircularProgress size={24} /> : "Logout"}
                    </Button>
                    <Link to={'/home/delete_account'} >
                        <Button color="secondary">Delete Account</Button>
                    </Link>
                </ButtonGroup>
            </Box>
        </>
    )
}