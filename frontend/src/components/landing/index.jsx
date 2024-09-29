import React from 'react';

const Landing = () => {
  return (
    <div>
      <div className='relative w-full h-screen'>
        <img className="absolute top-0 left-0 w-full h-full object-cover z-0"
             src='/images/back2.jpg'  />

        <div className='relative z-10 flex flex-col items-center justify-center h-full text-white'>
   
          <h1 className='sulphur-point-regular text-5xl font-bold mb-6'>
            Welcome to notess
          </h1>

      
          <div className="flex space-x-4">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-full">Sign up</button>
            <button className="bg-gray-500 text-white px-4 py-2 rounded-full">Log in</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
