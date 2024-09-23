import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import { Avatar, Box, Menu, MenuItem, Modal, Typography, CircularProgress, Divider } from '@mui/material';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Sidebar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openModal, setOpenModal] = useState(false); // State for modal visibility
  const [userProfile, setUserProfile] = useState(null); // State for user profile data
  const [loading, setLoading] = useState(false); // State for loading indicator
  const isMenuOpen = Boolean(anchorEl);
  const navigate = useNavigate();

  // Fetch user profile data on component mount
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}/users/`, {
          withCredentials: true,
        });
        setUserProfile(response.data.userProfile);
      } catch (error) {
        console.error('Failed to fetch user profile', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserProfile();
  }, []);

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_APP_API_URL}/users/logout`, {}, { withCredentials: true });
      toast.success('Successfully logged out!', {
        position: 'top-center',
        autoClose: 3000,
      });
      setTimeout(() => navigate('/login'), 1500);
    } catch (error) {
      toast.error('Logout failed. Please try again.', {
        position: 'top-center',
        autoClose: 3000,
      });
      console.error('Logout failed', error);
    }
  };

  const handleProfileClick = () => {
    setAnchorEl(null); // Close the menu
    setOpenModal(true); // Open the modal
  };

  const handleModalClose = () => {
    setOpenModal(false); // Close the modal
  };

  return (
    <>
      <ToastContainer />
      <Stack
        sx={{
          width: '70px',
          bgcolor: '#39063a',
          color: '#f1ecf0',
          padding: '10px',
          height: '96.05vh',
          flexDirection: 'column',
        }}
      >
        <Stack
          spacing={3}
          sx={{
            flexGrow: 1,
            alignItems: 'center',
            spacing: 1,
          }}
        >
          {userProfile ? (
            <Avatar
              alt={userProfile.username}
              src={userProfile.avatarUrl || undefined}
              sx={{
                width: '40px',
                height: '40px',
                bgcolor: '#6b416e',
                fontSize: '1.2rem',
                textTransform: 'uppercase',
              }}
            >
              {userProfile.username.charAt(0)}
            </Avatar>
          ) : (
            <CircularProgress size={24} sx={{ color: '#f1ecf0' }} />
          )}
          {/* Rest of the Sidebar Icons */}
          <Box sx={{ flexDirection: 'column' }}>
            <Box sx={{ bgcolor: "#6b416c", padding: '8px', borderRadius: '20%' }}>
              <Avatar src="home.svg" variant="rounded" sx={{ width: '20px', height: '20px' }} className='invert' />
            </Box>
            <p className='text-[11px] mt-[2px] text-center'>Home</p>
          </Box>

          <Box sx={{ flexDirection: 'column' }}>
            <Box sx={{ padding: '8px', borderRadius: '20%' }}>
              <Avatar src="messages.svg" variant="rounded" sx={{ width: '22px', height: '20px' }} className='invert' />
            </Box>
            <p className='text-[11px] mt-[2px] text-center'>DMs</p>
          </Box>

          <Box sx={{ flexDirection: 'column' }}>
            <Box sx={{ padding: '8px', borderRadius: '20%' }}>
              <Avatar src="bell.svg" variant="rounded" sx={{ width: '22px', height: '20px', color: "white" }} className='invert' />
            </Box>
            <p className='text-[11px] mt-[2px] text-center'>Activity</p>
          </Box>

          <Box sx={{ flexDirection: 'column' }}>
            <Box sx={{ padding: '8px', borderRadius: '20%' }}>
              <Avatar src="note.svg" variant="rounded" sx={{ width: '22px', height: '20px', color: "white", marginLeft: "6px" }} className='invert' />
            </Box>
            <p className='text-[11px] mt-[2px] text-center'>Canvases</p>
          </Box>

          <Box sx={{ flexDirection: 'column' }}>
            <Box sx={{ padding: '8px', borderRadius: '20%' }}>
              <Avatar src="more.svg" variant="rounded" sx={{ width: '22px', height: '20px', color: "white" }} className='invert' />
            </Box>
            <p className='text-[11px] mt-[2px] text-center'>More</p>
          </Box>
        </Stack>

        {/* Add & Profile Avatar */}
        <Stack
          sx={{
            mb: 2,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              bgcolor: '#6b416e',
              borderRadius: '50%',
              padding: '5px',
              width: '35px',
              marginBottom: '20px',
              cursor: 'pointer'
            }}
          >
            <img src="add.svg" alt="" className='w-15 invert opacity-60' />
          </Box>
          {userProfile ? (
            <Avatar
              alt={userProfile.username}
              src={userProfile.avatarUrl || undefined}
              variant="rounded"
              sx={{ width: '40px', height: '40px', bgcolor: '#6b416e', cursor: 'pointer' }}
              onClick={handleAvatarClick}
            >
              {userProfile.username.charAt(0).toUpperCase()}
            </Avatar>
          ) : (
            <CircularProgress size={24} sx={{ color: '#f1ecf0' }} />
          )}
        </Stack>

        {/* Dropdown Menu */}
        <Menu
          anchorEl={anchorEl}
          open={isMenuOpen}
          onClose={handleMenuClose}
          sx={{ mb: '50px', ml: '50px' }}
        >
          <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Stack>

      {/* Modal for displaying the user profile */}
      <Modal
        open={openModal}
        onClose={handleModalClose}
        aria-labelledby="user-profile-modal"
        aria-describedby="user-profile-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 450,
            bgcolor: 'background.paper',
            borderRadius: '15px',
            boxShadow: 24,
            p: 4,
            outline: 'none',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
              background: 'linear-gradient(135deg, #4b0f54 0%, #6a1b78 100%)',
              padding: '20px',
              borderRadius: '15px',
              color: '#fff',
              boxShadow: '0px 10px 30px rgba(0,0,0,0.2)',
            }}
          >
            {userProfile ? (
              <>
                <Avatar
                  alt={userProfile.username}
                  src={userProfile.avatarUrl || undefined}
                  sx={{
                    width: '80px',
                    height: '80px',
                    bgcolor: '#fff',
                    color: '#4b0f54',
                    fontSize: '2rem',
                    marginBottom: '10px',
                    textTransform: 'uppercase',
                  }}
                >
                  {userProfile.username.charAt(0).toUpperCase()}
                </Avatar>
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                  {userProfile.username}
                </Typography>
                <Typography variant="body1">{userProfile.email}</Typography>
                <Divider sx={{ width: '100%', margin: '20px 0', bgcolor: 'rgba(255, 255, 255, 0.5)' }} />
                {/* Add more profile fields as needed */}
              </>
            ) : (
              <CircularProgress />
            )}
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default Sidebar;