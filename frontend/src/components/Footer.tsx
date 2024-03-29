import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bottom-0 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-12">
          <div className="hidden md:block">
            <div className="flex items-baseline space-x-4">
              <ul className='flex flex-row justify-between w-full text-xl font-extrabold'>
                <li className='mx-4 font-comfortaa group'><a href='https://www.binhngo.me/'>Powered by </a><a className="group-hover:text-pink-400 transition-all duration-300 ease-in-out" href='https://www.binhngo.me/'>Binh</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

