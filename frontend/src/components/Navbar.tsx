import React, { useState } from 'react';

export const Navbar: React.FC = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <nav>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 z-50">
        <div className="flex items-center justify-center h-12 relative">
          <h1 className='font-allura text-4xl absolute left-4 hover:text-pink-400 hover:scale-110 transition-all duration-300 ease-in-out'><a href='/'>Mod Beauty</a></h1>
          <div className="flex items-baseline space-x-4 3xs:hidden md:block">
            <ul className='flex flex-row justify-between w-6/12 text-2xl font-extrabold'>
              <li className='font-comfortaa mx-4 hover:text-pink-400 hover:scale-110 transition-all duration-300 ease-in-out'><a href='/'>Home</a></li>
              {/* <li className='font-comfortaa mx-4 hover:text-pink-400 hover:scale-110 transition-all duration-300 ease-in-out'><a href='/about'>About</a></li> */}
              <li className='font-comfortaa mx-4 hover:text-pink-400 hover:scale-110 transition-all duration-300 ease-in-out'><a href='/book'>Book</a></li>
            </ul>
          </div>
          {/* Menu Toggle Button */}
          <button 
            className="block md:hidden absolute right-4 top-4"
            onClick={() => setShowMenu(!showMenu)}
          >
            <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
              <path 
                fillRule="evenodd" 
                d="M4 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 5h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 5h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z" 
                clipRule="evenodd" 
              />
            </svg>
          </button>
          {/* Dropdown Menu */}
          {showMenu && (
            <div className="absolute right-0 top-12 bg-white shadow-md rounded-md py-2 w-48">
              <ul className="flex flex-col space-y-2">
              <a href='/'><li className='font-comfortaa mx-4 hover:text-pink-400 hover:scale-110 transition-all duration-300 ease-in-out'>Home</li></a>
              {/* <a href='/staff'><li className='font-comfortaa mx-4 hover:text-pink-400 hover:scale-110 transition-all duration-300 ease-in-out'>Staff</li></a> */}
              <a href='/book'><li className='font-comfortaa mx-4 hover:text-pink-400 hover:scale-110 transition-all duration-300 ease-in-out'>Book</li></a>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
