import React from 'react';
// import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Header = () => {
  return (
    <div className='fixed top-0 left-0 w-full bg-black bg-opacity-50 text-white z-10 p-4'>
      <div className='px-5 flex items-center justify-between'>
        <h1 className='text-2xl'>Notess</h1>
        
        <a href="/notes" className='text-md'>My Notes</a>
      </div>
    </div>
  );
};

export default Header;
