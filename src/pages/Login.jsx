import React from 'react';
import { auth, provider } from '../config/firebase';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import GoogleIcon from '@mui/icons-material/Google';

const Login = () => {
  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    await signInWithPopup(auth, provider);
    navigate('/');
  };

  return (
    <div>
      <div className='max-w-screen-md mx-auto text-center mt-20'>
        <div>
          <h1 className='text-2xl font-bold mb-6'>Login</h1>
          <button onClick={signInWithGoogle} className='p-2 bg-blue-800 text-white'>
            <GoogleIcon className='mr-3' />
            Login with google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
