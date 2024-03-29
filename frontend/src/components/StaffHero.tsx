const lash3 = require('../assets/lash3.webp');

export const StaffHero = () => {
  return (
    <div className="relative flex flex-col lg:flex-row lg:items-center">
      <img src={lash3} className="shadow hover:opacity-50 transition-all duration-700 ease-in-out max-h-[700px] lg:max-h-[700] lg:w-auto"  />
      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center lg:static lg:p-8 transition-opacity duration-700 lg:w-1/2 lg:flex lg:justify-center">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-5xl font-bold text-white font-archivo mt-4">
            Meet the team!
          </h1>
        </div>
      </div>
    </div>
  )
}
