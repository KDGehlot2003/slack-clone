import React, { useState, useEffect } from 'react';
import Header from '../components/Header.jsx';
import Sidebar from '../components/Sidebar.jsx';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import axios from 'axios';
import ChannelChat from '../components/ChannelChat.jsx';
import Cookie from 'js-cookie';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import AddChannelModal from '../components/AddChannelModal.jsx';

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
  const [isAddChannelModalOpen, setIsAddChannelModalOpen] = useState(false);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false); // Invite Modal State
  const [inviteUsername, setInviteUsername] = useState(''); // Invite user email input


  const toggleChannelAccordion = () => {
    setIsChannelOpen(!isChannelOpen);
  };

  const toggleDirectMessageAccordion = () => {
    setIsDirectMessageOpen(!isDirectMessageOpen);
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleOpenAddChannelModal = () => setIsAddChannelModalOpen(true);
  const handleCloseAddChannelModal = () => setIsAddChannelModalOpen(false);

  const handleOpenInviteModal = () => setIsInviteModalOpen(true); // Open Invite Modal
  const handleCloseInviteModal = () => setIsInviteModalOpen(false); // Close Invite Modal

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
        handleCloseAddChannelModal(); // Close Add Channel Modal after submission
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

  const handleInviteUser = async () => {
    if (!inviteUsername.trim()) {
      console.error('Invite email is empty');
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/channels/${inviteUsername}/${contextMenu.channel._id}/join`,
        { email: inviteUsername.trim() },
        { withCredentials: true }
      );
      
      console.log('Invite successful:', response.data);
      setInviteUsername(''); // Clear the input field after success
      handleCloseInviteModal(); // Close the modal
    } catch (error) {
      console.error('Error inviting user:', error.response?.data || error.message);
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
                  <p className='flex opacity-60 hover:bg-[#5c315e] rounded-md '> <img src="message.svg" className='w-5 m-1 invert ' alt="" /> Threads</p>
                  <p className='flex opacity-60 hover:bg-[#5c315e] rounded-md '> <img src="send.svg" className='w-5 m-1 invert ' alt="" /> Drafts & sent</p>
                </Stack>
                <Stack gap={3} className=' opacity-60'>
                  <Box style={{ backgroundColor: '#4f2050', color: '#FFFFFF' }}>
                    <Box onClick={toggleChannelAccordion} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                      <ArrowDropDownIcon
                        style={{
                          transform: isChannelOpen ? 'rotate(0deg)' : 'rotate(-90deg)',
                          transition: 'transform 0.2s ease',
                        }}
                      />
                      <span>Channels</span>
                    </Box>
                    {isChannelOpen && (
                      <List>
                        {channels.length > 0 ? (
                          channels.map((channel) => (
                            <ListItem
                              key={channel._id}
                              button
                              onClick={() => handleSelectChannel(channel)}
                              onContextMenu={(e) => handleRightClick(e, channel)}
                              selected={selectedChannel === channel.channelName}
                              style={{
                                color: selectedChannel === channel.channelName ? '#611e69' : 'white',
                                backgroundColor: selectedChannel === channel.channelName ? '#f5f5f5' : 'transparent',
                                borderRadius: '10px',
                                padding: '8px 12px',
                                cursor: 'pointer',
                              }}
                            >
                              # {channel.channelName}
                            </ListItem>
                          ))
                        ) : (
                          <ListItem>No Channels</ListItem>
                        )}
                        <ListItem button onClick={handleOpenAddChannelModal}>+ Add Channel</ListItem>
                      </List>
                    )}
                  </Box>
                  <Box style={{ backgroundColor: '#4f2050', color: '#FFFFFF' }}>
                    <Box onClick={toggleDirectMessageAccordion} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                      <ArrowDropDownIcon
                        style={{
                          transform: isDirectMessageOpen ? 'rotate(0deg)' : 'rotate(-90deg)',
                          transition: 'transform 0.2s ease',
                        }}
                      />
                      <span>Direct Messages</span>
                    </Box>
                  </Box>
                </Stack>
              </Stack>
              <ChannelChat selectedChannel={selectedChannel} selectedChannelId={selectedChannelId} />
            </Stack>
          </Paper>
        </Box>
      </Stack>

      {/* Add Channel Modal */}
      <AddChannelModal
        isOpen={isAddChannelModalOpen}
        onClose={handleCloseAddChannelModal}
        newChannelName={newChannelName}
        setNewChannelName={setNewChannelName}
        handleAddChannel={handleAddChannel}
      />

      {/* View Users Modal */}
      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="view-users-modal-title"
        aria-describedby="view-users-modal-description"
      >
        <Box
          sx={{
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
          <h2 id="view-users-modal-title" className='text-2xl font-bold mb-7'>View Users</h2>
          {channelUsers.length > 0 ? (
            channelUsers.map((user) => (
              <p key={user._id} className='text-xl'>{user.fullName}</p>
            ))
          ) : (
            <p>No users found</p>
          )}
        </Box>
      </Modal>

      {/* Invite User Modal */}
      <Modal
        open={isInviteModalOpen}
        onClose={handleCloseInviteModal}
        aria-labelledby="invite-modal-title"
        aria-describedby="invite-modal-description"
      >
        <Box
          sx={{
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
          <h2 id="invite-modal-title" className='text-2xl font-bold mb-7'>Invite User</h2>
          <input
            type="email"
            value={inviteUsername}
            onChange={(e) => setInviteUsername(e.target.value)}
            placeholder="Enter email"
            className="mb-4 p-2 w-full bg-[#5c315e] text-white rounded"
          />
          <button
            onClick={handleInviteUser}
            className="px-4 py-2 bg-[#611e69] text-white rounded-md"
          >
            Invite
          </button>
        </Box>
      </Modal>

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
        <MenuItem onClick={handleOpenInviteModal}>Invite</MenuItem>
      </Menu>
    </Stack>
  );
};

export default WorkSpace;