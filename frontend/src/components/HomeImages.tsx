const lash1 = require('../assets/lash_1.webp');
const lash2 = require('../assets/lash_2.webp');
const lash3 = require('../assets/lash_3.webp');
const lash4 = require('../assets/lash_7.webp');
const lash5 = require('../assets/lash_5.webp');
const lash6 = require('../assets/lash_6.webp');

const images = [lash1, lash2, lash4,lash3, , lash5, lash6];
export const HomeImages = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1 mx-1">
    {images.map((image, index) => (
      <div key={index} className="flex justify-center">
        <img src={image} alt={`Image ${index}`} className="shadow max-w-full h-auto hover:border-4 hover:border-pink-400 transition-all duration-300 ease-in-out" />
      </div>
    ))}
  </div>
  )
}
