import React, { useState } from 'react';
import { Box, Grid, TextField, Button, Typography, Paper } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import Message from './Message';

export default function Chat() {
    const [messages, setMessages] = useState([
        { id: 1, text: "Hi there!", sender: "bot" },
        // Add more messages here
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
                    minHeight: '100vh',
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
                            <Message key={message.id} message={message} />
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