import React from 'react';
import Stack from '@mui/material/Stack';
import { Avatar, Box } from '@mui/material';

const Sidebar = () => {
  return (
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
        <Avatar alt="Travis Howard" src="2.jpg" variant="rounded" sx={{width: '40px', height: '40px'}} />
        <Box 
          sx={{
            flexDirection: 'column', 
          }}
        >
          <Box 
            sx={{
              bgcolor: "#6b416c",
              padding: '8px',
              borderRadius: '20%',
            }}
          >
            <Avatar src="home.svg" variant="rounded" sx={{width: '20px', height: '20px'}} className='invert' />
          </Box>
          <p className='text-[11px] mt-[2px] text-center'>Home</p>
        </Box>

        <Box 
          sx={{
            flexDirection: 'column', 
          }}
        >
          <Box 
            sx={{
              // bgcolor: "#6b416c",
              padding: '8px',
              borderRadius: '20%',
            }}
          >
            <Avatar  src="messages.svg" variant="rounded" sx={{width: '22px', height: '20px'}} className='invert' />
          </Box>
          <p className='text-[11px] mt-[2px] text-center'>DMs</p>
        </Box>

        <Box 
          sx={{
            flexDirection: 'column', 
          }}
        >
          <Box 
            sx={{
              // bgcolor: "#6b416c",
              padding: '8px',
              borderRadius: '20%',
            }}
          >
            <Avatar  src="bell.svg" variant="rounded" sx={{width: '22px', height: '20px', color: "white"}} className='invert' />
          </Box>
          <p className='text-[11px] mt-[2px] text-center'>Activity</p>
        </Box>

        <Box 
          sx={{
            flexDirection: 'column', 
          }}
        >
          <Box 
            sx={{
              // bgcolor: "#6b416c",
              padding: '8px',
              borderRadius: '20%',
            }}
          >
            <Avatar  src="note.svg" variant="rounded" sx={{width: '22px', height: '20px', color: "white", marginLeft: "6px"}} className='invert' />
          </Box>
          <p className='text-[11px] mt-[2px] text-center'>Canvases</p>
        </Box>

        <Box 
          sx={{
            flexDirection: 'column', 
          }}
        >
          <Box 
            sx={{
              // bgcolor: "#6b416c",
              padding: '8px',
              borderRadius: '20%',
            }}
          >
            <Avatar  src="more.svg" variant="rounded" sx={{width: '22px', height: '20px', color: "white"}} className='invert' />
          </Box>
          <p className='text-[11px] mt-[2px] text-center'>More</p>
        </Box>

      </Stack>
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
            marginBottom: '20px'
          }}
        >
          <img src="add.svg" alt="" className='w-15 invert opacity-60 ' />
        </Box>
				<Avatar alt="Travis Howard" src="2.jpg" variant="rounded" sx={{width: '40px', height: '40px'}} />
      </Stack>
    </Stack>
  );
};

export default Sidebar;