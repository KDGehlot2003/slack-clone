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
          const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}/users/${userId}/channels`);
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
                gap={3}
              >
                <Stack direction='row' gap={4}>
                  <h2 className='flex text-xl font-semibold hover:bg-[#5c315e] rounded-md pr-5 pl-2 -ml-4 '>AIVengers <img src="down-arrow.svg" alt="" className='pl-2 w-5 invert ' /></h2>
                  <Stack direction='row' gap={3}>
                    <img src="sort.svg" className='w-5 invert' alt="" />
                    <img src="edit.svg" className='w-5 invert' alt="" />
                  </Stack>
                </Stack>
                <Stack>
                  <p className='flex opacity-60 hover:bg-[#5c315e] rounded-md '> <img src="message.svg" className='w-5 m-1 invert ' alt="" /> Theads</p>
                  <p className='flex opacity-60 hover:bg-[#5c315e] rounded-md '> <img src="send.svg" className='w-5 m-1 invert ' alt="" /> Drafts & sent</p>
                </Stack>
                <Stack gap={3} className=' opacity-60'>
                  <div style={{ backgroundColor: '#4f2050', color: '#FFFFFF' }}>
                    <div onClick={toggleChannelAccordion} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                      {/* ArrowDropDownIcon that rotates based on the accordion state */}
                      <ArrowDropDownIcon
                        style={{
                          transform: isChannelOpen ? 'rotate(0deg)' : 'rotate(-90deg)',
                          transition: 'transform 0.3s ease',
                          marginRight: '8px',
                        }}
                        className='hover:bg-[#5c315e] rounded-md '
                      />
                      <span className='hover:bg-[#5c315e] rounded-md px-1'>Channels</span>
                    </div>

                    {/* Content to show/hide based on accordion open state */}
                    {isChannelOpen && (
                      <Stack className='w-full mt-1 '  gap={1}>
                        {channels.map(channel => (
                          <p key={channel._id} className='hover:bg-[#5c315e] rounded-md  pl-3'># {channel.channelName}</p>
                        ))}
                        <p className='cursor-pointer'><span className='px-1 rounded-md pb-[2px] bg-[#623763]  '>+</span> Add channels</p>
                      </Stack>
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
                        className='hover:bg-[#5c315e] rounded-md '
                      />
                      <span>Direct messages</span>
                    </div>

                    {/* Content to show/hide based on accordion open state */}
                    {isDirectMessageOpen && (
                      <Stack className='w-full mt-1 ' gap={1}>
                        <p className='hover:bg-[#5c315e] rounded-md  pl-3'>Archit Agrawal</p>
                        <p className='cursor-pointer'><span className='px-1 rounded-md pb-[2px] bg-[#623763]  '>+</span> Add colleagues</p>
                      </Stack>
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
