import React from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

const SearchField = () => {
  return (
    <TextField 
      placeholder="Search in workspace" 
      variant="outlined" 
      size='small'
      sx={{
        borderRadius: '8px',
        bgcolor: '#6b416e',
        height: '32px', 
        width: '600px',
        '& .MuiInputBase-input': {
          padding: '10px 5px',
          height: '12px',
          // Adjust padding here if necessary
        },
        '& .MuiOutlinedInput-root': {
          borderRadius: '8px',
        },
        '& .MuiInputBase-input::placeholder': {
          color: '#f1ecf0',
          fontSize: '14px', // Placeholder font size
        },
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <img 
              src="search.svg" 
              alt="search" 
              style={{ width: 20, height: 20, filter: 'invert(100%)' }} 
            />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchField;