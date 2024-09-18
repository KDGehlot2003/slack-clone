import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie'; // Import js-cookie

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/users/login`,
        {
          email,
          password
        },
        { withCredentials: true }  // Ensure session cookie is sent with the request
      );
  
      if (response.status === 201) {
        // No need to store token, session is managed via cookies
        toast.success('Login successful! Redirecting to workspace...');
        
        // Redirect to workspace after a short delay
        setTimeout(() => navigate('/workspace'), 2000);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Login failed. Please check your credentials.';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUpClick = () => {
    navigate('/signup');
  };

  return (
    <Stack className='flex'>
      <Stack
        sx={{
          maxWidth: "fit-content",
          marginInline: "auto",
          marginTop: "55px",
          justifyContent: "center",
          alignItems: "center"
        }}
        gap={1}
      >
        <img src="slack_logo.svg" alt="" className='w-28 cursor-pointer' />
        <h1 className='text-center font-bold text-5xl justify-center w-5/6 mt-5'>Sign in to Slack</h1>
        <p className='font-light mt-4'>We suggest using the <span className='font-medium'>email address that you use at work.</span></p>

        <TextField
          id='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='name@work-email.com'
          variant="outlined"
          sx={{
            width: "90%",
            marginTop: "30px",
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
          id='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Password'
          variant="outlined"
          type='password'
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
          onClick={handleLogin}
          disabled={loading}
          sx={{
            width: "90%",
            borderRadius: "12px",
            bgcolor: "#611f69",
            height: "45px",
            fontSize: "17px",
            textTransform: "none",
            boxShadow: "none",
            marginTop: "12px",
          }}
        >
          {loading ? 'Logging in...' : 'Login'}
        </Button>

        <Divider
          sx={{
            width: "90%",
            textAlign: "center",
            marginTop: "5px"
          }}>
          <p className='font-light opacity-70'>OR</p>
        </Divider>

        <Button
          variant="outlined"
          sx={{
            color: "black",
            width: "90%",
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
            width: "90%",
            borderColor: "#b6b6b7",
            borderRadius: "12px",
            height: "45px",
            borderWidth: "2px"
          }}
        >
          <img src="apple.svg" alt="" className='w-4 mb-1 mr-3' />
          Continue with Apple
        </Button>

        <p className='font-light text-sm text-[#616061]'>New to Slack?</p>
        <p className='cursor-pointer text-sm text-[#1264a3]' onClick={handleSignUpClick}>Create an account</p>
      </Stack>
      <Stack
        direction='row'
        sx={{
          padding: "10px",
          textAlign: "center",
          marginTop: "345px",
          width: "100%",
          maxWidth: "fit-content",
          marginInline: "auto",
        }}
        gap={3}
      >
        <p className='text-sm text-[#616061] cursor-pointer'>Privacy & terms</p>
        <p className='text-sm text-[#616061] cursor-pointer'>Contact us</p>
        <Stack direction='row' className='cursor-pointer'>
          <img src="world.svg" alt="" className='w-3 opacity-60 mr-1 ' />
          <p className='text-sm text-[#616061] cursor-pointer'>
            Change region
          </p>
          <img src="down-arrow.svg" alt="" className='w-3 opacity-60 ml-1' />
        </Stack>
      </Stack>
      <ToastContainer />
    </Stack>
  );
};

export default Login;