import React, { useState, useEffect } from 'react';
import Header from '../components/Header.jsx';
import Sidebar from '../components/Sidebar.jsx';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import axios from 'axios';
import Cookies from 'js-cookie';

const WorkSpace = () => {
  const [isChannelOpen, setIsChannelOpen] = useState(false);
  const [isDirectMessageOpen, setIsDirectMessageOpen] = useState(false);
  const [channels, setChannels] = useState([]);

  // Function to toggle accordion open/close state
  const toggleChannelAccordion = () => {
    setIsChannelOpen(!isChannelOpen);
  };

  // Function to toggle accordion open/close state
  const toggleDirectMessageAccordion = () => {
    setIsDirectMessageOpen(!isDirectMessageOpen);
  };

  // Fetch channels from the backend
  useEffect(() => {
    const fetchChannels = async () => {
      try {
        // Try to get user from localStorage first
        let userId = localStorage.getItem('token');

        if (userId) {
          const response = await axios.get(`http://localhost:8000/api/v1/users/${userId}/channels`);
          setChannels(response.data.channels); // Assuming the response data has a 'channels' field
        } else {
          console.error('User not logged in');
        }
      } catch (error) {
        console.error('Error fetching channels:', error);
      }
    };

    fetchChannels();
  }, []);

  return (
    <Stack sx={{
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      height: '100vh',
      backgroundColor: '#39063a',
      overflow: 'hidden'
    }}>
      <Header />
      <Stack direction='row'>
        <Sidebar />
        <Box
          sx={{
            marginLeft: '-9px',
            marginTop: '-9px',
            display: 'flex',
            flexWrap: 'wrap',
            '& > :not(style)': {
              m: 1,
              width: 1633,
              height: 983,
            },
          }}
        >
          <Paper 
            elevation={4} 
            sx={{
              borderRadius: '8px',
            }}
          >
            <Stack>
              <Stack
                sx={{
                  width: '15%',
                  height: '95.49vh',
                  padding: '20px',
                  backgroundColor: "#4f2050",
                  color: "white",
                  borderRadius: '7px 0px 0px 7px',
                }}
                gap={4}
              >
                <Stack direction='row' gap={12}>
                  <h2>AIVengers </h2>
                  <Stack direction='row' gap={3}>
                    <p>1</p>
                    <p>2</p>
                  </Stack>
                </Stack>
                <Stack>
                  <p>Theads</p>
                  <p>Drafts & sent</p>
                </Stack>
                <Stack gap={3}>
                  <div style={{ backgroundColor: '#4f2050', color: '#FFFFFF' }}>
                    <div onClick={toggleChannelAccordion} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                      {/* ArrowDropDownIcon that rotates based on the accordion state */}
                      <ArrowDropDownIcon
                        style={{
                          transform: isChannelOpen ? 'rotate(0deg)' : 'rotate(-90deg)',
                          transition: 'transform 0.3s ease',
                          marginRight: '8px',
                        }}
                      />
                      <span>Channels</span>
                    </div>

                    {/* Content to show/hide based on accordion open state */}
                    {isChannelOpen && (
                      <ul style={{ listStyleType: 'none', paddingLeft: '20px', marginTop: '10px' }}>
                        {channels.map(channel => (
                          <li key={channel._id}># {channel.channelName}</li>
                        ))}
                        <li style={{ color: '#9E9EA6', cursor: 'pointer' }}>+ Add channels</li>
                      </ul>
                    )}
                  </div>
                  <div style={{ backgroundColor: '#4f2050', color: '#FFFFFF' }}>
                    <div onClick={toggleDirectMessageAccordion} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                      {/* ArrowDropDownIcon that rotates based on the accordion state */}
                      <ArrowDropDownIcon
                        style={{
                          transform: isDirectMessageOpen ? 'rotate(0deg)' : 'rotate(-90deg)',
                          transition: 'transform 0.3s ease',
                          marginRight: '8px',
                        }}
                      />
                      <span>Direct messages</span>
                    </div>

                    {/* Content to show/hide based on accordion open state */}
                    {isDirectMessageOpen && (
                      <ul style={{ listStyleType: 'none', paddingLeft: '20px', marginTop: '10px' }}>
                        <li>Archit Agrawal</li>
                        <li style={{ color: '#9E9EA6', cursor: 'pointer' }}>+ Add colleagues</li>
                      </ul>
                    )}
                  </div>
                </Stack>
              </Stack>
            </Stack>
          </Paper>
        </Box>
      </Stack>
    </Stack>
  );
}

export default WorkSpace;
