import { Box, Divider, Stack, TextField } from '@mui/material';
import React, { useState, useEffect, useRef } from 'react';

const ChannelChat = ({ selectedChannel }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef(null);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const lastMessage = messages[messages.length - 1];

      // Check if the last message is from the same sender
      if (lastMessage && lastMessage.sender === 'You') {
        // Append the new message to the last sender's messages
        const updatedMessages = [...messages];
        updatedMessages[updatedMessages.length - 1].text.push(newMessage);
        setMessages(updatedMessages);
      } else {
        // Add a new message block for a different sender
        setMessages([...messages, { sender: 'You', text: [newMessage] }]);
      }

      setNewMessage('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevents the default action of the Enter key
      handleSendMessage();
    }
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <Stack
      sx={{
        width: '100%',
        height: '100%',
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <h1 className='font-bold text-xl'>
        {selectedChannel ? '# ' + selectedChannel : 'No channel selected'}
      </h1>
      <p className='flex mt-7 ml-4'>
        <img src="message-fill.svg" className='w-4 mx-2' alt="" />
        Messages
      </p>
      <Box sx={{ display: 'flex' }}>
        <Divider
          sx={{
            width: '15%',
            backgroundColor: '#39063a',
            marginLeft: '-1rem',
            marginTop: '4px',
          }}
        />
        <Divider
          sx={{
            width: '100%',
            backgroundColor: '#e5e7eb26',
            marginTop: '4px',
          }}
        />
      </Box>

      {/* Message List Area */}
      <Box
        sx={{
          flexGrow: 1,
          overflowY: 'auto',
          maxHeight: '770px', // Set a fixed height to make it scrollable
          display: 'flex',
          flexDirection: 'column-reverse', // Reverse the flow of the messages
          marginTop: '1rem',
          padding: '1rem',
          backgroundColor: '#f5f5f5',
          borderRadius: '8px',
        }}
      >
        <div ref={messagesEndRef} />
        {messages.length > 0 ? (
          messages.map((message, index) => (
            <Box key={index} sx={{ marginBottom: '1rem' }}>
              <strong>{message.sender}:</strong>
              {message.text.map((text, idx) => (
                <p key={idx}>{text}</p>
              ))}
            </Box>
          ))
        ) : (
          <p className='text-center mb-96'>No messages yet. <span className='text-2xl'>🥲</span></p>
        )}
      </Box>

      {/* Input Field at the bottom */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          marginTop: '1rem',
          padding: '0.5rem',
          borderRadius: '12px',
        }}
      >
        <TextField
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={'Message ' + '#' + selectedChannel}
          variant="outlined"
          sx={{
            flexGrow: 1,
            marginRight: '1rem',
            '& .MuiOutlinedInput-root': {
              borderRadius: '12px',
            },
          }}
        />
        <img 
          src="send.svg" 
          alt="" 
          className='w-6 mr-3 cursor-pointer' 
          onClick={handleSendMessage} 
        />
      </Box>
    </Stack>
  );
};

export default ChannelChat;