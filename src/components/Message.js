import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

export default function Message({ message, chosen_language }) {

    const isBot = message.sender === "bot";

    // Determine text alignment based on the chosen language
    const textAlign = chosen_language === "Hebrew" ? "right" : "left";

    // Function to split the message text into lines and intersperse <br /> elements
    const formatMessageText = (text) => {
        return text.split('\n').map((line, index, array) => (
            <React.Fragment key={index}>
                {line}
                {index < array.length - 1 && <br />}
            </React.Fragment>
        ));
    };

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: (isBot && chosen_language === "Hebrew") || (!isBot && chosen_language !== "Hebrew") ? "flex-end" : "flex-start",
                mb: 2,
            }}
        >
            <Paper
                variant="outlined"
                sx={{
                    p: 2,
                    backgroundColor: isBot ? "primary.light" : "secondary.light",
                    borderRadius: (isBot && chosen_language === "Hebrew") || (!isBot && chosen_language !== "Hebrew") ? "20px 5px 20px 20px" : "5px 20px 20px 20px",
                }}
            >
                <Typography variant="body1" align={textAlign}>
                    {formatMessageText(message.text)}
                </Typography>
            </Paper>
        </Box>
    );
};
