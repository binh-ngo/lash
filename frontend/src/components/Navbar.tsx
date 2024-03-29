import React from 'react';

export const Navbar: React.FC = () => {
  return (
    <nav>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex items-center justify-center h-12">
          <h1 className='font-allura text-4xl absolute left-4 top-4 hover:text-pink-400 hover:scale-110 transition-all duration-300 ease-in-out'>Ooh La Lash</h1>
          <div className="flex items-baseline space-x-4">
            <ul className='flex flex-row justify-between w-6/12 text-2xl font-extrabold'>
              <li className='font-comfortaa mx-4 hover:text-pink-400 hover:scale-110 transition-all duration-300 ease-in-out'><a href='/'>Home</a></li>
              <li className='font-comfortaa mx-4 hover:text-pink-400 hover:scale-110 transition-all duration-300 ease-in-out'><a href='/staff'>Staff</a></li>
              <li className='font-comfortaa mx-4 hover:text-pink-400 hover:scale-110 transition-all duration-300 ease-in-out'><a href='/book'>Book</a></li>
            </ul>
          </div>
        </div>
      </div>
    </nav>

  );
};

