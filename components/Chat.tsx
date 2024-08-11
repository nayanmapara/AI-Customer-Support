'use client';

import { useState, useEffect } from 'react';
import {
    Button,
    TextField,
    List,
    ListItem,
    ListItemText,
    Container,
    Paper,
    Typography
} from '@mui/material';

interface ChatProps {
    theme: 'light' | 'dark';
    toggleTheme: () => void;
}

export default function Chat({ theme, toggleTheme }: ChatProps) {
    const [message, setMessage] = useState('');
    const [response, setResponse] = useState('');
    const [conversationHistory, setConversationHistory] = useState('');

    useEffect(() => {
        document.body.classList.remove('light', 'dark');
        document.body.classList.add(theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const handleSend = async () => {
        try {
            setConversationHistory(conversationHistory + "User: " + message + "\n"); // Add to history

            // Send the message to the serverless function
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ messages: [{ content: message }] }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            const resultText = result.trim().replace("AI: ", '');
            
            setResponse(resultText); // Update state with response
            setConversationHistory(conversationHistory + "User: " + message + "\nAI: " + resultText + "\n"); // Add to history
        } catch (error) {
            console.error("Error generating response:", error);
            setResponse("Sorry, there was an error generating a response.");
        }

        setMessage(''); // Clear input field
    };

    return (
        <Container className="h-screen p-4" maxWidth="md">
            <Paper 
                elevation={3} 
                className={`flex-1 p-4 mb-4 overflow-y-auto ${theme === 'dark' ? 'bg-[#313131]' : 'bg-[#ffffff]'}`}
                style={{ maxHeight: '70vh' }}
            >
                <List>
                    {conversationHistory.split('\n').map((msg, idx) => (
                        <ListItem key={idx}>
                            <ListItemText 
                                primary={<Typography variant="body1" style={{ color: theme === 'dark' ? '#fff' : '#000' }}>{msg}</Typography>} 
                            />
                        </ListItem>
                    ))}
                </List>
            </Paper>
            <TextField
                fullWidth
                multiline
                minRows={4}
                variant="outlined"
                placeholder="Type your message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className={`mb-4 ${theme === 'dark' ? 'bg-[#313131]' : 'bg-[#fff]'}`}
                InputProps={{ style: { color: theme === 'dark' ? '#fff' : '#000' } }}
                InputLabelProps={{ style: { color: theme === 'dark' ? '#aaa' : '#555' } }}
            />
            <Button
                fullWidth
                variant="contained"
                onClick={handleSend}
                disabled={!message} // Disable if message is empty
                className={`mb-4 ${theme === 'dark' ? 'bg-[#516bff]' : 'bg-[#516bff]'}`}
            >
                Send
            </Button>
        </Container>
    );
}
