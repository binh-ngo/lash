const eyelash = require('../assets/lash_hero.mp4');

export const HomeHero = () => {
  return (
    <div className="-z-10 group relative flex flex-col lg:items-center">
      <video className="opacity-80 shadow transition-all duration-700 ease-in-out" playsInline autoPlay loop muted>
        <source src={eyelash} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center transition-opacity duration-700 lg:flex lg:justify-center">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-5xl font-bold text-white font-archivo mt-4 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] group-hover:text-pink-400 transition-all duration-300 ease-in-out">
            WELCOME TO MOD BEAUTY!
          </h1>
        </div>
      </div>
    </div>
  );
};


