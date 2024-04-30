import React from 'react';

export const Footer: React.FC = () => {
  let date = new Date();
  let year = date.getFullYear();

  return (
    <footer className="bottom-0 w-full py-5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-12">
          <div>
            <div className="flex items-baseline space-x-4">
              <ul className='flex flex-row justify-between w-full text-xl font-extrabold'>
                <li className='font-comfortaa'> Mod Beauty Co. © {year}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

