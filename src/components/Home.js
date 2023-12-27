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
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { useDispatch } from 'react-redux';

export default function Home() {

    const dispatch = useDispatch();

    const [errorMessage, setErrorMessage] = useState(null);
    const [gptResponse, setGptResponse] = useState(null);
    const navigate = useNavigate()

    const [formState, setFormState] = useState({
        prompt: '',
    })

    const logoutMutation = useMutation({
        mutationFn: logout_post,
        onSuccess: data => {
            dispatch(setFirstName(''));
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
        if (formState.prompt) {
            gptMutation.mutate({
                prompt: formState.prompt,
            })
        } 
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
                <Typography variant="subtitle1" component="h1" color="white" >
                    Welcome to Home page!
                </Typography>

                {errorMessage && (
                    <>
                        <Typography variant="body2" color="error" marginTop={3} fontSize={18}>
                            {errorMessage}
                        </Typography>
                    </>
                )}

                <Typography variant="subtitle1" component="h1" color="white" marginTop={3}>
                    Ask ChatGPT a question:
                </Typography>

                <Box sx={{ marginTop: 3 }}>
                    <form onSubmit={handleSubmit} noValidate autoComplete='off' >
                        {/* noValidate makes the browser not use its built-in validation messages as we want to do it ourselves, 
          autoComplete off makes it not complete the user's text */}

                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '10px'
                            }}
                        >
                            {/* <TextField
                                onChange={updateFormState} // same as writing onChange={()=>updateFormState(event)}
                                id="prompt-input"
                                label="Question for ChatGPT"
                                variant="outlined"
                                name="prompt"
                                value={formState.prompt}
                                autoFocus
                            /> */}

                            <TextareaAutosize
                                aria-label="minimum height"
                                style={{ 
                                    width: 300, 
                                    fontSize: '20px',
                                    resize: 'vertical', // Allows only vertical resizing
                                    minHeight: '200px',
                                    maxHeight: '350px'

                                }}
                                // minRows={10} // Set minimum rows
                                placeholder="Enter your question here"
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
                </Box>
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

                <ButtonGroup variant="contained" aria-label="outlined primary button group" sx={{ marginTop: 8 }}>
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