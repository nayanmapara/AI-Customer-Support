'use client';

import { useState } from 'react';

export default function Chat() {
    const [message, setMessage] = useState('');
    const [response, setResponse] = useState('');
    const [conversationHistory, setConversationHistory] = useState('');

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
        <div className="flex flex-col h-screen p-4 bg-[#0F0F0F]">
            <div className="flex-1 overflow-y-auto p-4 bg-[#1E1E1E] text-white rounded mb-4">
                {conversationHistory.split('\n').map((msg, idx) => (
                    <p key={idx}>{msg}</p>
                ))}
            </div>
            <textarea
                className="w-full h-48 bg-[#03040B] text-white p-4 mb-4 rounded resize-none"
                placeholder="Type your message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button
                className="bg-[#2B2D42] text-white w-full py-2 rounded mb-4"
                onClick={handleSend}
                disabled={!message} // Disable if message is empty
            >
                Send
            </button>
        </div>
    );
}
