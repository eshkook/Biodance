import { useMutation } from "@tanstack/react-query";
import { Box, TextField, Button, DeleteOutline, Typography, CircularProgress } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import Message from './Message';
import { chat_post } from "./posts";
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import React, { useState, useEffect, useRef } from 'react';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import ChatIcon from '@mui/icons-material/Chat';
import CommentIcon from '@mui/icons-material/Comment';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import backgroundImage from './background.jpg'

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
            setFormState({ ...formState, user_message: '' });
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
                                    // InputLabelProps={{
                                    //     sx: {
                                    //         textAlign: chosenLanguage == "Hebrew" ? "right" : "left",
                                    //         direction: chosenLanguage == "Hebrew" ? 'rtl' : 'ltr'
                                    //     }
                                    // }}
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
                                        mt: 1,
                                        backgroundColor: 'grey.900', // Dark grey background from the theme
                                        color: 'white', // White text
                                        '&:hover': {
                                            backgroundColor: 'grey.800', // Slightly lighter grey on hover
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
                                backgroundColor: 'grey.900', // Dark grey background from the theme
                                color: 'white', // White text
                                '&:hover': {
                                    backgroundColor: 'grey.800', // Slightly lighter grey on hover
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
                                backgroundColor: 'grey.900', // Dark grey background from the theme
                                color: 'white', // White text
                                '&:hover': {
                                    backgroundColor: 'grey.800', // Slightly lighter grey on hover
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