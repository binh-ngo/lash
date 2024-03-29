const groupphoto = require('../assets/groupphoto.jpg');

export const StaffHero = () => {
  return (
    <div className="relative flex flex-col lg:items-center group">
      <img src={groupphoto} className="shadow transition-all duration-700 ease-in-out max-h-[700px] lg:max-h-[700] lg:w-auto"  />
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center transition-opacity duration-700 lg:flex lg:justify-center">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-5xl font-bold font-archivo mt-4 text-white group-hover:text-pink-400 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] outline-4 transition-all duration-300 ease-in-out">
            Meet the team!
          </h1>
        </div>
      </div>
    </div>
  )
}
