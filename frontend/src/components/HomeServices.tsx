const lash1 = require('../assets/lash1.webp');
const lash2 = require('../assets/lash2.webp');
const lash3 = require('../assets/lash3.webp');

export type Service = {
  title: string;
  imageSrc: any;
  description: string;
};

export const HomeServices = () => {

  const services: Service[] = [
    {
      title: 'Extensions',
      imageSrc: lash1,
      description: 'Transform your lashes into lush, voluminous works of art with our Luxe Lash Extensions service. Say goodbye to mascara and hello to effortlessly glamorous eyes that last for weeks!',
    },
    {
      title: 'Brow Lamination',
      imageSrc: lash2,
      description: 'Achieve flawlessly sculpted brows with our Brow Perfection service. Brow lamination is the ultimate solution for those seeking defined, polished brows that stay in place all day long.',
    },
    {
      title: 'Lash Lifts',
      imageSrc: lash3,
      description: "Elevate your natural lashes to new heights with our Lash Lift & Tint service. Say goodbye to the daily hassle of curling your lashes and hello to effortlessly lifted and tinted lashes that enhance your eyes' natural beauty.",
    }
  ];
  
  return (
    <>
    <h1 className='text-4xl text-center my-8 font-comfortaa'>Services</h1>
    <div className="flex flex-wrap justify-center">
    {services.map((service, index) => (
      <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-4 mb-8 group">
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-xl font-bold mb-2 group-hover:text-pink-400 hover:scale-110 transition-all duration-300 ease-in-out">{service.title}</h2>
          <img src={service.imageSrc} alt={service.title} className="mb-2" />
          <p>{service.description}</p>
        </div>
      </div>
    ))}
  </div>
    </>
    )
}
