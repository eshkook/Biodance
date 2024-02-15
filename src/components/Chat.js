import React, { useState } from 'react';
import { useMutation } from "@tanstack/react-query";
import { Box, Grid, TextField, Button, Typography, Button, CircularProgress } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import Message from './Message';
import { chat_post } from "./posts";

export default function Chat({ chosen_language='Hebrew' }) {

    const [errorMessage, setErrorMessage] = useState(null);

    const confirmationMutation = useMutation({
        mutationFn: chat_post,
        onSuccess: data => {
            console.log('Response data:', data);
            navigate("/login", { state: { message: 'Confirmation was successful, now you can log in!' } })
        },
        onError: error => {
            setErrorMessage(error.message || "An error occurred");
            console.log(error.message || "An error occurred")
        }
    });

    const [formState, setFormState] = useState({
        email: (location.state?.email) ? location.state.email : '',
        confirmation_code: ''
    })

    const [fieldErrorState, setFieldError] = useState({
        email: false,
        confirmation_code: false,
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
        const temp_object = {
            email: !isValidEmail(formState.email),
            confirmation_code: formState.confirmation_code == ''
        }
        setFieldError(temp_object)

        if (!(temp_object.email || temp_object.confirmation_code)) {

            console.log(formState)

            confirmationMutation.mutate({
                email: formState.email,
                confirmation_code: formState.confirmation_code,
            });
        } else {
            setErrorMessage("Fields in red are invalid")
        }
    }













    const [messages, setMessages] = useState([
        { id: 1, text: "Hi there!", sender: "bot" },
        { id: 2, text: "Get to work maggot", sender: "user" }
    ]);
    const [input, setInput] = useState('');

    const handleSend = () => {
        if (input.trim() !== "") {
            // Add the new message to the messages array
            setMessages([...messages, { id: messages.length + 1, text: input, sender: "user" }]);
            setInput(""); // Clear the input field
        }
    };

    const handleInputChange = (event) => {
        setInput(event.target.value);
    };

    return (
        <>
            <Box
                sx={{
                    // minHeight: '100vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center', // Changed to 'stretch' to make the children (cards) of the same height
                    flexDirection: { xs: 'column', md: 'row' }, // Responsive design: column layout for small screens, row layout for medium and larger screens
                    // p: 300, // Padding for the box
                }}
            >
                <Box sx={{ height: "100vh", display: "flex", flexDirection: "column", bgcolor: "grey.200" }}>
                    <Box sx={{ flexGrow: 1, overflow: "auto", p: 2 }}>
                        {messages.map((message) => (
                            <Message key={message.id} message={message} chosen_language={chosen_language} />
                        ))}
                    </Box>
                    <Box sx={{ p: 2, backgroundColor: "background.default" }}>
                        <Grid container spacing={2}>
                            <Grid item xs={10}>
                                <TextField
                                    fullWidth
                                    size="small"
                                    placeholder="Type a message"
                                    variant="outlined"
                                    value={input}
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <Button
                                    fullWidth
                                    size="large"
                                    color="primary"
                                    variant="contained"
                                    endIcon={<SendIcon />}
                                    onClick={handleSend}
                                >
                                    Send
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Box>
        </>
    );
}