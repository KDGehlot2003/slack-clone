import { Box, CircularProgress, Divider, Stack, TextField } from '@mui/material';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const ChannelChat = ({ selectedChannel, selectedChannelId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  // const [user, setUser] = useState(null);

  // Fetch messages function
  const fetchMessages = async () => {
    if (!selectedChannelId) return; // Skip if no channel selected

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}/messages/${selectedChannelId}/`, {
        withCredentials: true,
      });

      setMessages(response.data.messages.reverse());
    } catch (error) {
      setError('Failed to fetch messages.');
      console.error('Error fetching messages:', error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  // Polling effect to fetch messages every few seconds
  useEffect(() => {
    if (!selectedChannelId) return;

    // Fetch messages immediately when channel changes
    fetchMessages();

    // Set up polling
    const intervalId = setInterval(fetchMessages, 5000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, [selectedChannelId]);

  const handleSendMessage = async () => {
    if (newMessage.trim()) {
      const messageToSend = {
        message: newMessage.trim(),
        username: "You",
        sender: 'You',
        channelId: selectedChannelId,
      };

      try {
        await axios.post(`${import.meta.env.VITE_APP_API_URL}/messages/${selectedChannelId}/`, messageToSend, {
          withCredentials: true,
        });

        // Update the local message state after sending
        setMessages([messageToSend, ...messages]);
        setNewMessage('');
      } catch (error) {
        console.error('Error sending message:', error.response?.data || error.message);
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
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
        width: '80vw',
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
          height: '70vh',
          display: 'flex',
          flexDirection: 'column-reverse',
          marginTop: '1rem',
          padding: '1rem',
          backgroundColor: '#f5f5f5',
          borderRadius: '8px',
        }}
      >
        <div ref={messagesEndRef} />
        {loading && <CircularProgress sx={{
          position: 'absolute',
          top: '50%',
          left: '60%',
          transform: 'translate(-50%, -50%)',
        }} />}
        {error && <p>{error}</p>}
        {messages.length > 0 ? (
          messages.map((message, index) => (
            <Box key={index} sx={{ marginBottom: '1rem', display: 'flex' }}>
              <p className='text-center pt-2 bg-gray-400 w-10 h-10 rounded-md'>{message?.username[0].toUpperCase()}</p>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <strong className='ml-2 text-md'>{message.username}</strong>
                <p className='ml-2'>{message.message}</p> {/* Adjust field names as needed */}
              </Box>
            </Box>
          ))
        ) : (
          !loading && <p className='text-center mb-96'>No messages yet. <span className='text-2xl'>🥲</span></p>
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
          width: '78vw',
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