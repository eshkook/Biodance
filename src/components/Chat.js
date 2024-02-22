import { useMutation } from "@tanstack/react-query";
import { Box, TextField, Button, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import Message from './Message';
import { chat_post } from "./posts";
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import React, { useState, useEffect, useRef } from 'react';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import backgroundImage from './background.jpg'

function lightenHexColor(hex, amount = 20) {
    // Convert hex to RGB
    let r = parseInt(hex.slice(1, 3), 16);
    let g = parseInt(hex.slice(3, 5), 16);
    let b = parseInt(hex.slice(5, 7), 16);

    // Increase the RGB values to make the color lighter
    r = Math.min(255, r + amount);
    g = Math.min(255, g + amount);
    b = Math.min(255, b + amount);

    // Convert RGB back to hex
    r = r.toString(16).padStart(2, '0');
    g = g.toString(16).padStart(2, '0');
    b = b.toString(16).padStart(2, '0');

    return `#${r}${g}${b}`;
}

export default function Chat() {

    const colors_dict = {
        start_chat_button: '#273245',
        chat_buttons: '#273245',
        bot_message: '#273245',
        keyboard: '#647187'
    }

    const [chatStarted, setChatStarted] = useState(false)

    const [messages, setMessages] = useState([]);

    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const messageInputRef = useRef(null);

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
            setFormState({ ...formState, user_message: '' });
        }
    }    

    function handleClearChat() {
        if (messages.length > 1) {
            setMessages([]);
            chatMutation.mutate({
                user_message: '/start',
                action: 'text-message'
            });
        }
        messageInputRef.current?.focus();
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
                    width: '600px',
                    height: '700px',
                    margin: '0 auto', // centers the box
                    paddingBottom: '20px', // gives some space at the bottom
                    // minHeight: '100vh',
                    // display: 'flex',
                    // justifyContent: 'center',
                    // alignItems: 'center',
                    // flexDirection: { xs: 'column', md: 'row' }, // Responsive design: column layout for small screens, row layout for medium and larger screens
                    // p: 300, // Padding for the box

                    // width: '100%',
                    // height: '100vh',
                    // backgroundImage: `url(${backgroundImage})`,
                    // backgroundRepeat: 'no-repeat',
                    // backgroundSize: 'cover',
                    // backgroundPosition: 'center',
                    // bgcolor: "grey.200"
                }}
            >
                {chatStarted ? (
                    <Box
                        sx={{
                            height: "100%",
                            width: '100%',
                            display: "flex",
                            flexDirection: "column",
                            backgroundImage: `url(${backgroundImage})`,
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            // bgcolor: "grey.200"
                        }}>
                        <Box
                            sx={{
                                flexGrow: 1,
                                overflow: "auto",
                                p: 2
                            }}>
                            {messages.map((message) => (
                                <Message
                                    key={message.id}
                                    message={message}
                                    chosenLanguage={chosenLanguage}
                                    setMessages={setMessages}
                                    setChosenLanguage={setChosenLanguage}
                                    onImageLoad={handleImageLoad}
                                    colors_dict={colors_dict} />
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
                                    ref={messageInputRef}
                                    id="user_message-input"
                                    // label={chosenLanguage == "Hebrew" ? "כתוב הודעה" : "Your message"}
                                    placeholder={chosenLanguage == "Hebrew" ? "כתוב הודעה" : "Your message"}
                                    variant="outlined"
                                    name="user_message"
                                    value={formState.user_message}
                                    fullWidth // makes the TextField full width
                                    InputProps={{
                                        sx: {
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
                                    autoFocus
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
                                        mt: 1,
                                        backgroundColor: colors_dict.chat_buttons, // Dark grey background from the theme
                                        color: 'white', // White text
                                        '&:hover': {
                                            backgroundColor: lightenHexColor(colors_dict.chat_buttons), // Slightly lighter grey on hover
                                        }
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
                                mt: 1,
                                backgroundColor: colors_dict.chat_buttons, 
                                color: 'white', // White text
                                '&:hover': {
                                    backgroundColor: lightenHexColor(colors_dict.chat_buttons), // Slightly lighter grey on hover
                                }
                            }}
                        >
                            {chosenLanguage == "Hebrew" ? "נקה צ'אט" : "Clear chat"}
                        </Button>
                    </Box>
                ) : (
                    <Box
                        sx={{
                            width: '100%',
                            height: '100%',
                            paddingBottom: '20px', // gives some space at the bottom
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        {/* <ChatIcon />
                        <CommentIcon /> */}
                        <Button
                            variant="contained"
                            // color="primary" // use a theme color that indicates primary action
                            disabled={chatMutation.isLoading}
                            onClick={handleStartChat}
                            sx={{
                                // dir: chosenLanguage == "Hebrew" ? 'rtl' : 'ltr',
                                borderRadius: '10px',
                                height: '130px',
                                width: '170px',
                                mt: 1,
                                display: 'flex', // Enable flex container
                                flexDirection: 'column', // Stack children vertically
                                alignItems: 'center', // Center items horizontally
                                justifyContent: 'space-between', // Center items vertically (useful if the button's height is larger than its content)
                                textAlign: 'center',
                                backgroundColor: colors_dict.start_chat_button, // Dark grey background from the theme
                                color: 'white', // White text
                                '&:hover': {
                                    backgroundColor: lightenHexColor(colors_dict.start_chat_button), // Slightly lighter grey on hover
                                }
                            }}
                        >
                            <Typography>
                                <bdi>התחל צ'אט!</bdi>
                            </Typography>
                            <HeadsetMicIcon sx={{ fontSize: 50 }} />
                            <Typography>Start a chat!</Typography>
                        </Button>
                    </Box>
                )}
            </Box>
        </>
    );
}