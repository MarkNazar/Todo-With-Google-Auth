import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

import { useSelector } from 'react-redux';

const Loader = () => {
  const { text } = useSelector(state => state.loader.value);
  return (
    <div className='w-full h-full bg-white/50 absolute flex flex-col items-center justify-center inset-0 dark:bg-slate-900/90'>
      <div className='mb-2'>
        <CircularProgress />
      </div>
      <p>{text}</p>
    </div>
  );
};

export default Loader;
