import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

import { auth } from '../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';

import { links } from '../static/links';

import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

const Navbar = () => {
  const [user] = useAuthState(auth);
  const [userTheme, setUserTheme] = useState('light');

  const signUserOut = async () => {
    await signOut(auth);
  };

  const handleSetTheme = () => {
    setUserTheme(prevState => {
      if (prevState === 'light') {
        prevState = 'dark';
        localStorage.setItem('theme', 'dark');
      } else {
        prevState = 'light';
        localStorage.setItem('theme', 'light');
      }
      return prevState;
    });
  };

  useEffect(() => {
    document.documentElement.className = userTheme;
    if (localStorage.getItem('theme')) {
      setUserTheme(localStorage.getItem('theme'));
    }
  }, [userTheme]);

  return (
    <nav className='bg-white shadow-sm border-b border-slate-200 p-[20px] dark:bg-slate-900 dark:text-white dark:border-b dark:border-slate-700'>
      <div className='max-w-screen-md mx-auto flex justify-end items-center space-x-4'>
        {links
          .filter(link => {
            const { id } = link;
            if (user) {
              return id !== 2;
            } else {
              return id;
            }
          })
          .map(link => {
            const { id, tag, path } = link;
            return (
              <Link key={id} to={path}>
                {tag}
              </Link>
            );
          })}
        {user && (
          <div className='flex items-center space-x-4'>
            <span>
              <span>Hi</span> {user?.displayName}
            </span>
            <button onClick={signUserOut}>Logout</button>
          </div>
        )}
        <div>
          <button className='cursor-pointer' onClick={handleSetTheme}>
            {userTheme === 'light' ? <LightModeIcon /> : <DarkModeIcon />}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
