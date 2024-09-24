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
import Cookie from 'js-cookie';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

const WorkSpace = () => {
  const [isChannelOpen, setIsChannelOpen] = useState(false);
  const [isDirectMessageOpen, setIsDirectMessageOpen] = useState(false);
  const [channels, setChannels] = useState([]);
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newChannelName, setNewChannelName] = useState('');
  const [selectedChannelId, setSelectedChannelId] = useState(null);
  const [contextMenu, setContextMenu] = useState(null);
  const [channelUsers, setChannelUsers] = useState([]);
  const [rightClickedChannel, setRightClickedChannel] = useState(null); // New state for right-clicked channel

  const token = Cookie.get('user');

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
    setSelectedChannelId(channel._id);
  };

  const handleRightClick = (event, channel) => {
    event.preventDefault();
    setContextMenu(
      contextMenu === null
        ? { mouseX: event.clientX - 2, mouseY: event.clientY - 4, channel }
        : null,
    );
    setRightClickedChannel(channel.channelName); // Update right-clicked channel name
  };

  const handleCloseContextMenu = () => {
    setContextMenu(null);
  };

  const handleViewChannelUsers = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}/channels/${contextMenu.channel._id}/users`, {
        withCredentials: true
      });

      setChannelUsers(response.data.users);
      setIsModalOpen(true);
      setContextMenu(null);
    } catch (error) {
      console.error('Error fetching channel users:', error.response?.data || error.message);
    }
  };

  return (
    <Stack
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100vh',
        backgroundColor: '#39063a',
        overflow: 'hidden',
      }}
    >
      <Header />
      <Stack direction='row'>
        <Sidebar />
        <Box
          sx={{
            marginLeft: '-9px',
            marginTop: '5px',
            display: 'flex',
            flexWrap: 'wrap',
            '& > :not(style)': {
              m: 1,
              width: '95vw',
              height: '93.49vh',
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
                  width: '600px',
                  height: '93.49vh',
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
                            style={{
                              backgroundColor: selectedChannel === channel.channelName ? 'white' : 'inherit',
                              color: selectedChannel === channel.channelName ? 'black' : 'inherit',
                            }}
                            onClick={() => handleSelectChannel(channel)}
                            onContextMenu={(event) => handleRightClick(event, channel)}
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
                        <p className='cursor-pointer'>
                          <span className='px-1 rounded-md pb-[2px] bg-[#623763]  '>+</span> Add colleagues</p>
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

      {/* Context Menu for Channel */}
      <Menu
        open={contextMenu !== null}
        onClose={handleCloseContextMenu}
        anchorReference="anchorPosition"
        anchorPosition={
          contextMenu !== null
            ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
            : undefined
        }
      >
        <MenuItem onClick={handleViewChannelUsers}>View Users</MenuItem>
      </Menu>

      {/* Modal to show channel users */}
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
            bgcolor: '#4f2050',
            boxShadow: 24,
            p: 4,
            borderRadius: '8px',
            color: 'white',
          }}
        >
          <h2 id="modal-title" className='text-2xl font-bold'>{rightClickedChannel} Users</h2> {/* Use rightClickedChannel here */}
          <List>
            {channelUsers.length > 0 ? (
              channelUsers.map(user => (
                <ListItem key={user._id} sx={{ color: 'white' }}>
                  {user.username}
                </ListItem>
              ))
            ) : (
              <p>No users found in this channel.</p>
            )}
          </List>
          <Button
            variant="contained"
            onClick={handleCloseModal}
            sx={{
              bgcolor: "#611e69",
              width: "90%",
              height: "50px",
              marginTop: "1rem",
              borderRadius: "12px",
            }}
          >
            Close
          </Button>
        </Box>
      </Modal>
    </Stack>
  );
}

export default WorkSpace;