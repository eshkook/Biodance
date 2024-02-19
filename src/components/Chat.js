import { useMutation } from "@tanstack/react-query";
import { Box, TextField, Button, DeleteOutline, Typography, CircularProgress } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import Message from './Message';
import { chat_post } from "./posts";
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import React, { useState, useEffect, useRef } from 'react';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

export default function Chat() {

    const [chatStarted, setChatStarted] = useState(false)

    const [messages, setMessages] = useState([
        // { id: 1, text: "Hi there!", sender: "bot" },
        // { id: 2, text: "Get to work maggot", sender: "user" },
        // { id: 3, text: "Hi thhhhhhhhhhhhhhhhhhhere!", sender: "bot", keyboard: keyboard }
    ]);

    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleImageLoad = () => {
        scrollToBottom();
    };

    const [chosenLanguage, setChosenLanguage] = useState('Hebrew');

    const chatMutation = useMutation({
        mutationFn: chat_post,
        onSuccess: data => {
            // console.log(data)
            setMessages(messages => [...messages, { id: messages.length + 1, text: data.message, keyboard: data.keyboard, image_urls: data.image_urls, sender: "bot" }]);
        },
        onError: error => {
            setMessages(messages => [...messages, { id: messages.length + 1, text: "error", sender: "bot" }]);
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

    function handleClearChat() {
        setMessages([]);
        chatMutation.mutate({
            user_message: '/start',
            action: 'text-message'
        });
    }

    function handleStartChat() {
        setChatStarted(true)
        chatMutation.mutate({
            user_message: '/start',
            action: 'text-message'
        });
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
                {chatStarted ? (
                    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column", bgcolor: "grey.200" }}>
                        <Box sx={{ flexGrow: 1, overflow: "auto", p: 2 }}>
                            {messages.map((message) => (
                                <Message
                                    key={message.id}
                                    message={message}
                                    chosenLanguage={chosenLanguage}
                                    setMessages={setMessages}
                                    setChosenLanguage={setChosenLanguage}
                                    onImageLoad={handleImageLoad} />
                            ))}
                            <div ref={messagesEndRef} />
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
                                    id="user_message-input"
                                    label={chosenLanguage == "Hebrew" ? "כתוב הודעה" : "Your message"}
                                    variant="outlined"
                                    name="user_message"
                                    value={formState.user_message}
                                    fullWidth // makes the TextField full width
                                    InputProps={{
                                        sx: {
                                            direction: chosenLanguage == "Hebrew" ? 'rtl' : 'ltr'
                                        }
                                    }}
                                    InputLabelProps={{
                                        sx: {
                                            textAlign: chosenLanguage == "Hebrew" ? "right" : "left",
                                            direction: chosenLanguage == "Hebrew" ? 'rtl' : 'ltr'
                                        }
                                    }}
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
                                    {...(chosenLanguage == "Hebrew" ? { startIcon: <SendIcon sx={{ transform: 'rotate(180deg)' }} /> } : { endIcon: <SendIcon /> })}
                                    sx={{
                                        dir: chosenLanguage == "Hebrew" ? 'rtl' : 'ltr',
                                        mt: 1
                                    }}
                                >
                                    {/* {chatMutation.isLoading ? <CircularProgress size={24} /> : "Send"} */}
                                    {chosenLanguage == "Hebrew" ? "שלח" : "Send"}
                                </Button>
                            </Box>
                        </form>
                        <Button
                            variant="contained"
                            color="primary" // use a theme color that indicates primary action
                            disabled={chatMutation.isLoading}
                            onClick={handleClearChat}
                            {...(chosenLanguage == "Hebrew" ? { startIcon: <CleaningServicesIcon sx={{ transform: 'rotate(90deg)' }} /> } : { endIcon: <CleaningServicesIcon sx={{ transform: 'rotate(270deg)' }} /> })}
                            sx={{
                                dir: chosenLanguage == "Hebrew" ? 'rtl' : 'ltr',
                                mt: 1
                            }}
                        >
                            {chosenLanguage == "Hebrew" ? "נקה צ'אט" : "Clear chat"}
                        </Button>
                    </Box>
                ) : (
                    <>
                        <Button
                            variant="contained"
                            color="primary" // use a theme color that indicates primary action
                            disabled={chatMutation.isLoading}
                            onClick={handleStartChat}
                            startIcon={<PlayCircleOutlineIcon sx={{ transform: 'rotate(180deg)' }} />}
                            sx={{
                                dir: chosenLanguage == "Hebrew" ? 'rtl' : 'ltr',
                                mt: 1
                            }}
                        >
                            <>
                                התחל צ'אט
                            </>
                        </Button>
                    </>
                )}
            </Box>
        </>
    );
}