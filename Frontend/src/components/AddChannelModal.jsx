import React from 'react';
import { Modal, Box, Button, TextField } from '@mui/material';

const AddChannelModal = ({ isOpen, onClose, newChannelName, setNewChannelName, handleAddChannel }) => {
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="add-channel-modal-title"
      aria-describedby="add-channel-modal-description"
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
        <h2 id="add-channel-modal-title" className='text-2xl font-bold'>Add Channel</h2>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Enter channel name"
          value={newChannelName}
          onChange={(e) => setNewChannelName(e.target.value)}
          sx={{
            marginBottom: '1rem',
            input: { color: 'white' },
            fieldset: { borderColor: '#fff' },
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: '#fff' },
              '&:hover fieldset': { borderColor: '#fff' },
              '&.Mui-focused fieldset': { borderColor: '#fff' },
            },
          }}
        />
        <Button
          variant="contained"
          onClick={handleAddChannel}
          sx={{
            bgcolor: "#611e69",
            width: "90%",
            height: "50px",
            borderRadius: "12px",
          }}
        >
          Add Channel
        </Button>
      </Box>
    </Modal>
  );
}

export default AddChannelModal;