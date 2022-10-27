import React from 'react';
import { Link } from 'react-router-dom';

import { auth } from '../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';

import { links } from '../static/links';

const Navbar = () => {
  const [user] = useAuthState(auth);

  // console.log(user);

  const signUserOut = async () => {
    await signOut(auth);
  };
  return (
    <nav className='bg-white shadow-sm p-[20px]'>
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
      </div>
    </nav>
  );
};

export default Navbar;
