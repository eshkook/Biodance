import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

export default function Message({ message, chosen_language }) {

    const isBot = message.sender === "bot";
  
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: (isBot && chosen_language == "Hebrew" || !isBot && !(chosen_language == "Hebrew")) ? "flex-end" : "flex-start",
          mb: 2,
        }}
      >
        <Paper
          variant="outlined"
          sx={{
            p: 2,
            backgroundColor: isBot ? "primary.light" : "secondary.light",
            borderRadius: (isBot && chosen_language == "Hebrew" || !isBot && !(chosen_language == "Hebrew")) ? "20px 5px 20px 20px" : "5px 20px 20px 20px",
          }}
        >
          <Typography variant="body1">{message.text}</Typography>
        </Paper>
      </Box>
    );
  };
  