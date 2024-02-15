import React, { useState } from 'react';
import { useMutation } from "@tanstack/react-query";
import { Box, Grid, TextField, Button, Typography, CircularProgress } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import Message from './Message';
import { chat_post } from "./posts";

export default function Chat({ chosen_language = 'Hebrew' }) {

    const [messages, setMessages] = useState([
        { id: 1, text: "Hi there!", sender: "bot" },
        { id: 2, text: "Get to work maggot", sender: "user" }
    ]);

    const [errorMessage, setErrorMessage] = useState(null);

    const chatMutation = useMutation({
        mutationFn: chat_post,
        onSuccess: data => {
            setMessages(messages => [...messages, { id: messages.length + 1, text: data, sender: "bot" }]);
        },
        onError: error => {
            setErrorMessage(error.message || "An error occurred");
            console.log(error.message || "An error occurred")
        }
    });

    const [formState, setFormState] = useState({
        message: ''
    })

    function updateFormState(event) {
        const { name, value } = event.target
        setFormState(prevFormState => ({
            ...prevFormState,
            [name]: value
        }))
    }

    function handleSubmit(event) {
        event.preventDefault() // preventing re-rendering the page
        if (formState.message) {
            setMessages(messages => [...messages, { id: messages.length + 1, text: formState.message, sender: "user" }]);
            chatMutation.mutate({
                message: formState.message,
            });
        }
    }

    return (
        <>
            <Box
                sx={{
                    maxWidth: '600px', // or any appropriate max width
                    margin: '0 auto', // centers the box
                    paddingBottom: '20px', // gives some space at the bottom
                    // minHeight: '100vh',
                    // display: 'flex',
                    // justifyContent: 'center',
                    // alignItems: 'center', // Changed to 'stretch' to make the children (cards) of the same height
                    // flexDirection: { xs: 'column', md: 'row' }, // Responsive design: column layout for small screens, row layout for medium and larger screens
                    // p: 300, // Padding for the box
                }}
            >
                {errorMessage && (
                    <>
                        <Typography variant="body2" color="error">
                            {errorMessage}
                        </Typography>
                        <br />
                    </>
                )}
                <Box sx={{ height: "100vh", display: "flex", flexDirection: "column", bgcolor: "grey.200" }}>
                    <Box sx={{ flexGrow: 1, overflow: "auto", p: 2 }}>
                        {messages.map((message) => (
                            <Message key={message.id} message={message} chosen_language={chosen_language} />
                        ))}
                    </Box>
                    <form onSubmit={handleSubmit} noValidate autoComplete='off'>
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
                                onChange={updateFormState}
                                id="message-input"
                                label="Type your message here..."
                                variant="outlined"
                                name="message"
                                value={formState.message}
                                fullWidth // makes the TextField full width
                                sx={{ mt: 1 }} // adds margin-top for spacing
                                autoFocus={true}
                            />
                            <Button
                                variant="contained"
                                color="primary" // use a theme color that indicates primary action
                                type='submit'
                                disabled={chatMutation.isLoading}
                                endIcon={!chatMutation.isLoading && <SendIcon />}
                                sx={{ mt: 1 }} // adds margin-top for spacing
                            >
                                {chatMutation.isLoading ? <CircularProgress size={24} /> : "Send"}
                            </Button>

                            {/* <TextField
                                onChange={updateFormState}
                                id="message-input"
                                label="Your message"
                                variant="outlined"
                                name="message"
                                value={formState.message}
                                autoFocus={true}
                            />
                            <Button
                                variant="contained"
                                type='submit'
                                disabled={chatMutation.isLoading}>
                                {chatMutation.isLoading ? <CircularProgress size={24} /> : "Submit"}
                            </Button> */}
                        </Box>
                    </form>
                </Box>
            </Box>
        </>
    );
}