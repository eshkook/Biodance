import React, { useState } from 'react';
import { useMutation } from "@tanstack/react-query";
import { Box, TextField, Button, Typography, CircularProgress } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import Message from './Message';
import { chat_post } from "./posts";

export default function Chat() {

    const [chosenLanguage, setChosenLanguage] = useState('Hebrew');

    const keyboard = [
        [{"text": 'עברית', "callback_data": 'Hebrew'}], 
        [{"text": 'English', "callback_data": 'English'}]
                ]

    const [messages, setMessages] = useState([
        // { id: 1, text: "Hi there!", sender: "bot" },
        // { id: 2, text: "Get to work maggot", sender: "user" },
        // { id: 3, text: "Hi thhhhhhhhhhhhhhhhhhhere!", sender: "bot", keyboard: keyboard }
    ]);

    const [errorMessage, setErrorMessage] = useState(null);

    const chatMutation = useMutation({
        mutationFn: chat_post,
        onSuccess: data => {
            // console.log(data)
            setMessages(messages => [...messages, { id: messages.length + 1, text: data.message, keyboard: data.keyboard, image_urls:data.image_urls, sender: "bot" }]);
        },
        onError: error => {
            setErrorMessage(error.message || "An error occurred");
            console.log(error.message || "An error occurred")
        }
    });

    const [formState, setFormState] = useState({
        user_message: ''
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
        if (formState.user_message) {
            setMessages(messages => [...messages, { id: messages.length + 1, text: formState.user_message, sender: "user" }]);
            chatMutation.mutate({
                user_message: formState.user_message,
                action: 'text-message'
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
                            <Message 
                            key={message.id} 
                            message={message} 
                            chosenLanguage={chosenLanguage} 
                            setMessages={setMessages}
                            setErrorMessage={setErrorMessage}
                            setChosenLanguage={setChosenLanguage} />
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
                            {/* <TextField
                                color='black'
                                onChange={updateFormState}
                                id="user_message-input"
                                label="Type your message here..."
                                variant="outlined"
                                name="user_message"
                                value={formState.user_message}
                                fullWidth // makes the TextField full width
                                sx={{ mt: 1 }} // adds margin-top for spacing
                                autoFocus={true}
                            /> */}
                            <TextField
                                onChange={updateFormState}
                                id="user_message-input"
                                label="Type your message here..."
                                variant="outlined"
                                name="user_message"
                                value={formState.user_message}
                                fullWidth // makes the TextField full width
                                sx={{
                                    mt: 1, // adds margin-top for spacing
                                    '& .MuiInputBase-input': {
                                        color: 'black', // sets text color
                                    },
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: 'black', // sets border color
                                        },
                                        '&:hover fieldset': {
                                            borderColor: 'black', // sets border color on hover
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: 'black', // sets border color on focus
                                        },
                                    }
                                }}
                                autoFocus={true}
                            />
                            <Button
                                variant="contained"
                                color="primary" // use a theme color that indicates primary action
                                type='submit'
                                onClick={handleSubmit}
                                disabled={chatMutation.isLoading}
                                endIcon={!chatMutation.isLoading && <SendIcon />}
                                sx={{ mt: 1 }} // adds margin-top for spacing
                            >
                                {chatMutation.isLoading ? <CircularProgress size={24} /> : "Send"}
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Box>
        </>
    );
}