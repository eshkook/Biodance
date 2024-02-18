import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

export default function Message({ message, chosen_language }) {

    const isBot = message.sender === "bot";

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
                {message.text === "בחר שפה:\n\nChoose language:" ? (
                    <>
                        <Typography variant="body1" align={"right"} dir={"rtl"}>
                            בחר שפה:
                        </Typography>
                        <br />
                        <Typography variant="body1" align={"left"}>
                            Choose language:
                        </Typography>
                    </>
                ) :
                    <Typography
                        variant="body1"
                        align={chosen_language === "Hebrew" ? "right" : "left"}
                        dir={chosen_language === "Hebrew" ? "rtl" : "ltr"}
                    >
                        {formatMessageText(message.text)}
                    </Typography>
                }
            </Paper>
        </Box>
    );
};
