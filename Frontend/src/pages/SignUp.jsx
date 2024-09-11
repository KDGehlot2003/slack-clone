import React from 'react'
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';


const SignUp = () => {
  return (
    <Stack className='flex'>
      <Stack 
        sx={{
          maxWidth: "fit-content",
          marginInline: "auto",
          marginTop: "25px",
          justifyContent: "center",
          alignItems: "center"
        }} 
        gap={1}
      > 
  
        <img src="slack_logo.svg" alt="" className=' w-28 cursor-pointer'  />

        <h1 className='text-center font-bold text-5xl justify-center w-5/6 mt-5'>First of all, enter your email address</h1>
        
        <p className='font-light mt-4'>We suggest using the <span className='font-medium'>email address that you use at work.</span></p>

        <TextField 
          id="outlined-basic" 
          placeholder='Joe Doe'
          variant="outlined" 
          sx={{
            width: "50%",
            marginTop: "25px",
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

        <TextField 
          id="outlined-basic" 
          placeholder='name@work-email.com'
          variant="outlined" 
          sx={{
            width: "50%",
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

        <TextField 
          id="outlined-basic" 
          placeholder='joe_doe123'
          variant="outlined" 
          sx={{
            width: "50%",
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

        <TextField 
          id="outlined-basic" 
          placeholder='Password'
          variant="outlined" 
          type='password'
          sx={{
            width: "50%",
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
          sx={{
            width: "50%",
            borderRadius: "12px",
            bgcolor: "#611f69",
            height: "45px",
            fontSize: "17px",
            textTransform: "none",
            boxShadow: "none",
            marginTop: "12px",
          }}
        >
          Continue
        </Button>
        <Divider 
          sx={{ 
            width: "50%",
            textAlign: "center", 
            marginTop: "5px"
          }}>
            <p className=' font-light opacity-70'>OR</p>
        </Divider>
        <Button 
          variant="outlined"
          sx={{
            color: "black",
            width: "50%",
            borderColor: "#b6b6b7",
            borderRadius: "12px",
            height: "45px",
            borderWidth: "2px"

          }}
        >
          <img src="google.svg" alt="" className='w-4 mr-3' />
          Continue with Google
        </Button>
        <Button 
          variant="outlined"
          sx={{
            color: "black",
            width: "50%",
            borderColor: "#b6b6b7",
            borderRadius: "12px",
            height: "45px",
            borderWidth: "2px"
            
          }}
        >
          <img src="apple.svg" alt="" className='w-4 mb-1 mr-3' />
          Continue with Apple
        </Button>
        <p className='font-light mt-4 text-sm text-[#616061]'>Already using Slack?</p>
        <p className=' cursor-pointer text-sm text-[#1264a3]'>Sign in to an existing workspace</p>
        </Stack>
        <Stack
          direction='row'
          sx={{

            padding: "10px",
            textAlign: "center",
            marginTop: "65px",
            width: "100%",
            maxWidth: "fit-content",
            marginInline: "auto",
          }}
          gap={3}

        >
            <p className='text-sm text-[#616061] cursor-pointer'>Privacy & terms</p>
            <p className='text-sm text-[#616061] cursor-pointer'>Contact us</p>
            <Stack direction='row' className='cursor-pointer' >
              <img src="world.svg" alt="" className='w-3 opacity-60 mr-1 ' />
              <p className='text-sm text-[#616061] cursor-pointer'>
                Change region
              </p>
              <img src="down-arrow.svg" alt="" className='w-3 opacity-60 ml-1' />
            </Stack>
        </Stack>
      
    </Stack>
  )
}

export default SignUp