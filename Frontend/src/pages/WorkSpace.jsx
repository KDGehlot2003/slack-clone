import React, { useState, useEffect } from 'react';
import Header from '../components/Header.jsx';
import Sidebar from '../components/Sidebar.jsx';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import axios from 'axios';
import ChannelChat from '../components/ChannelChat.jsx';

const WorkSpace = () => {
  const [isChannelOpen, setIsChannelOpen] = useState(false);
  const [isDirectMessageOpen, setIsDirectMessageOpen] = useState(false);
  const [channels, setChannels] = useState([]);
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newChannelName, setNewChannelName] = useState('');
  const [selectedChannelId, setSelectedChannelId] = useState(null);

  const toggleChannelAccordion = () => {
    setIsChannelOpen(!isChannelOpen);
  };

  const toggleDirectMessageAccordion = () => {
    setIsDirectMessageOpen(!isDirectMessageOpen);
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleAddChannel = async () => {
    try {
      if (newChannelName.trim()) {
        const response = await axios.post(
          `${import.meta.env.VITE_APP_API_URL}/channels/`,
          { channelName: newChannelName.trim() },
          { withCredentials: true }
        );

        const newChannel = response.data.channel;
        setChannels([...channels, newChannel]);

        setNewChannelName('');
        handleCloseModal();
      } else {
        console.error('Channel name is empty');
      }
    } catch (error) {
      console.error('Error adding new channel:', error.response?.data || error.message);
    }
  };

  useEffect(() => {
    const fetchChannels = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}/users/channels`, {
          withCredentials: true
        });

        setChannels(response.data.channels);
      } catch (error) {
        console.error('Error fetching user channels:', error.response?.data || error.message);
      }
    };

    fetchChannels();
  }, []);

  const handleSelectChannel = (channel) => {
    setSelectedChannel(channel.channelName);
    setSelectedChannelId(channel._id); // Set the selected channel ID
  };

  return (
    <Stack sx={{
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      height: '100vh',
      backgroundColor: '#39063a',
      overflow: 'hidden',
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
              // adjust width to fit the screen //FIXME: This is a temporary fix
              width: '95vw' ,
              height: '95.49vh',
            },
          }}
        >
          <Paper
            elevation={4}
            sx={{
              borderRadius: '8px',
            }}
          >
            <Stack direction="row">
              <Stack
                sx={{
                  width: '600px',  // FIXME
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
                  <Box style={{ backgroundColor: '#4f2050', color: '#FFFFFF' }}>
                    <Box onClick={toggleChannelAccordion} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                      <ArrowDropDownIcon
                        style={{
                          transform: isChannelOpen ? 'rotate(0deg)' : 'rotate(-90deg)',
                          transition: 'transform 0.3s ease',
                          marginRight: '8px',
                        }}
                        className='hover:bg-[#5c315e] rounded-md '
                      />
                      <span className='hover:bg-[#5c315e] rounded-md px-1'>Channels</span>
                    </Box>

                    {isChannelOpen && (
                      <Stack className='w-full mt-1 ' gap={1}>
                        {channels.map(channel => (
                          <p
                            key={channel._id}
                            className='hover:bg-[#5c315e] rounded-md pl-3 cursor-pointer'
                            onClick={() => handleSelectChannel(channel)} // Update selected channel and ID on click
                          >
                            # {channel.channelName}
                          </p>
                        ))}
                        <p className='cursor-pointer' onClick={handleOpenModal}>
                          <span className='px-1 rounded-md pb-[2px] bg-[#623763]  '>+</span> Add channels
                        </p>
                      </Stack>
                    )}
                  </Box>

                  <Box style={{ backgroundColor: '#4f2050', color: '#FFFFFF' }}>
                    <Box onClick={toggleDirectMessageAccordion} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                      <ArrowDropDownIcon
                        style={{
                          transform: isDirectMessageOpen ? 'rotate(0deg)' : 'rotate(-90deg)',
                          transition: 'transform 0.3s ease',
                          marginRight: '8px',
                        }}
                        className='hover:bg-[#5c315e] rounded-md '
                      />
                      <span>Direct messages</span>
                    </Box>

                    {isDirectMessageOpen && (
                      <Stack className='w-full mt-1 ' gap={1}>
                        <p className='hover:bg-[#5c315e] rounded-md  pl-3'>Archit Agrawal</p>
                        <p className='cursor-pointer'><span className='px-1 rounded-md pb-[2px] bg-[#623763]  '>+</span> Add colleagues</p>
                      </Stack>
                    )}
                  </Box>
                </Stack>
              </Stack>

              <Stack sx={{ width: '110vw' }}>
                <ChannelChat selectedChannel={selectedChannel} selectedChannelId={selectedChannelId} /> 
              </Stack>
            </Stack>
          </Paper>
        </Box>
      </Stack>

      {/* Modal for Adding a New Channel */}
      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            textAlign: 'center',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: '8px',
          }}
        >
          <h2 id="modal-title" className='text-2xl font-bold'>Create a Channel</h2>
          <TextField
            fullWidth
            placeholder='Enter channel name'
            value={newChannelName}
            onChange={(e) => setNewChannelName(e.target.value)}
            margin="normal"
            sx={{
              width: "90%",
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                height: "50px"
              },
              "& .MuiInputBase-input::placeholder": {
                color: "#454245",
                opacity: 0.50,
              },
            }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddChannel}
            sx={{
              bgcolor: "#611e69",
              width: "90%",
              height: "50px",
              marginTop: "1rem",
              borderRadius: "12px",
            }}
          >
            Add Channel
          </Button>
        </Box>
      </Modal>
    </Stack>
  );
}

export default WorkSpace;