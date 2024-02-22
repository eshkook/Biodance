import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, CircularProgress, Button } from '@mui/material';
import { chat_post } from "./posts";
import { useMutation } from "@tanstack/react-query";
import { blue } from '@mui/material/colors';

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

export default function Message({ message, chosenLanguage, setMessages, setChosenLanguage, onImageLoad, colors_dict, handleAutoFocus }) {

    const [buttonWidth, setButtonWidth] = useState('auto');

    useEffect(() => {
        // Calculate the width of the longest button text after the component mounts
        // This is a simplified example. In a real application, you might need to actually measure text width in the DOM
        if (message.keyboard && message.keyboard.length > 0) {
            const longestText = message.keyboard.reduce((longest, button) => button[0].text.length > longest.length ? button[0].text : longest, "");
            // Set a fixed width based on the longest text
            // This could be replaced with a more sophisticated calculation if necessary
            setButtonWidth(`${longestText.length}ch`); // Example: sets width based on character count, `ch` is a CSS unit based on the width of the "0" character
        }
    }, [message.keyboard]); // Recalculate if the keyboard buttons change

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
        handleAutoFocus()
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
                    border: isBot ? 'none' : '1px solid black',
                    color: !isBot ? 'black' : 'white',
                    backgroundColor: isBot ? colors_dict.bot_message : 'white',
                    borderRadius: (isBot && chosenLanguage === "Hebrew") || (!isBot && chosenLanguage !== "Hebrew") ? "20px 0px 20px 20px" : "0px 20px 20px 20px",
                    wordWrap: 'break-word', // Ensure words are wrapped
                    maxWidth: '80%', // Ensure the message does not exceed the container's width
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
                        sx={{
                            wordWrap: 'break-word',
                            overflowWrap: 'break-word', // Additional property to handle overflow
                        }}
                    >
                        {(message.text == 'error' && message.sender == 'bot') ?
                            (chosenLanguage === "Hebrew" ? "קרתה שגיאה, נסה שוב." : "An error occured. Try again.") :
                            formatMessageText(message.text)}
                    </Typography>
                }
            </Paper>
            {message.image_urls && message.image_urls.map((url, index) => (
                <Box
                    key={index}
                    component="img"
                    src={url}
                    alt={`image_${index}`}
                    onLoad={onImageLoad}
                    sx={{
                        maxWidth: '65%', // Ensure the image is responsive and does not overflow its container
                        mt: 1, // Margin top for spacing between text and image
                        borderRadius: '4px', // Optional: Adds rounded corners to the image
                        marginTop: '4px'
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
                        disabled={chatMutation.isLoading}
                        sx={{
                            mt: 1, // Add margin between buttons
                            width: `calc(${buttonWidth} + 25px)`, // Apply the calculated width
                            maxWidth: '100%',
                            borderRadius: '50px',
                            backgroundColor: colors_dict.keyboard, 
                            color: 'white', // White text
                            '&:hover': {
                                backgroundColor: lightenHexColor(colors_dict.keyboard), // Slightly lighter grey on hover
                            }
                        }}
                        onClick={() => handleClick(button[0].callback_data)}
                    >
                        {/* {chatMutation.isLoading ? <CircularProgress size={24} /> : button[0].text} */}
                        {button[0].text}
                    </Button>
                ))}
            </Box>
        </Box>
    );
};
