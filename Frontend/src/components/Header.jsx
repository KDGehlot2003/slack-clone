import React from 'react';
import Stack from '@mui/material/Stack';
import SearchField from './SearchField';

function Header() {
  return (
    <Stack 
      direction="row" 
      spacing={2}
      sx={{
        marginTop: '10px',
        // padding: '10px',
        justifyContent: 'center',
        alignItems: 'center',
        height: '60px',
        minHeight: '10px',
        bgcolor: '#39063a',
      }}
    >
      <Stack 
        direction="row" 
        spacing={2} 
        sx={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}
      >
        <img 
          src="left-arrow.svg" 
          alt=""  
          className='w-5 invert'
        />
        <img 
          src="right-arrow.svg" 
          alt=""  
          className='w-5 invert'
        />
        <img 
          src="time.svg" 
          alt=""  
          className='w-5 invert'
        />
        <SearchField />
      </Stack>
      <img 
        src="help.svg" 
        alt=""
        className='w-5 invert'
      />
    </Stack>
  );
}

export default Header;