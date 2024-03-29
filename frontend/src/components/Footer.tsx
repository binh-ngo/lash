import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-pink-300 bottom-0 absolute w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-12">
          <div className="hidden md:block">
            <div className="flex items-baseline space-x-4">
              <ul className='flex flex-row justify-between w-full text-white text-xl font-extrabold'>
                <li className='mx-4'>Powered by Binh</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

