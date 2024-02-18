import React from 'react';
import { Box, Typography, Paper, Button } from '@mui/material';
import { chat_post } from "./posts";
import { useMutation } from "@tanstack/react-query";

export default function Message({ message, chosenLanguage, setMessages, setErrorMessage, setChosenLanguage }) {

    const chatMutation = useMutation({
        mutationFn: chat_post,
        onSuccess: data => {
            // console.log(data)
            setMessages(messages => [...messages, { id: messages.length + 1, text: data.message, keyboard: data.keyboard, image_urls: data.image_urls, sender: "bot" }]);
        },
        onError: error => {
            setErrorMessage(error.message || "An error occurred");
            console.log(error.message || "An error occurred")
        }
    });

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

    function handleClick(callback_data) {
        if (["Hebrew", "English"].includes(callback_data)) { setChosenLanguage(callback_data) }
        chatMutation.mutate({
            user_message: callback_data,
            action: 'button'
        });
    }

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: (isBot && chosenLanguage === "Hebrew") || (!isBot && chosenLanguage !== "Hebrew") ? "flex-end" : "flex-start",
                mb: 2,
            }}
        >
            <Paper
                variant="outlined"
                sx={{
                    p: 2,
                    backgroundColor: isBot ? "primary.light" : "secondary.light",
                    borderRadius: (isBot && chosenLanguage === "Hebrew") || (!isBot && chosenLanguage !== "Hebrew") ? "20px 5px 20px 20px" : "5px 20px 20px 20px",
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
                        align={chosenLanguage === "Hebrew" ? "right" : "left"}
                        dir={chosenLanguage === "Hebrew" ? "rtl" : "ltr"}
                    >
                        {formatMessageText(message.text)}
                    </Typography>
                }
            </Paper>
            {message.image_urls && message.image_urls.map((url, index) => (
                <Box
                    key={index}
                    component="img"
                    src={url}
                    alt={`image_${index}`}
                    sx={{
                        maxWidth: '80%', // Ensure the image is responsive and does not overflow its container
                        mt: 1, // Margin top for spacing between text and image
                        borderRadius: '4px', // Optional: Adds rounded corners to the image
                    }}
                />
            ))}
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    mt: 1,
                }}
            >
                {message.keyboard && message.keyboard.map((button, index) => (
                    <Button
                        key={index}
                        variant="contained"
                        sx={{ mt: 1 }} // Add margin between buttons
                        onClick={() => handleClick(button[0].callback_data)}
                    >
                        {button[0].text}
                    </Button>
                ))}
            </Box>
        </Box>
    );
};
