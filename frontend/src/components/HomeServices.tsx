const lash1 = require('../assets/lash1.webp');
const lash2 = require('../assets/lash2.webp');
const lash3 = require('../assets/lash3.webp');

type Service = {
  title: string;
  imageSrc: any;
  description: string;
};

export const HomeServices = () => {

  const services: Service[] = [
    {
      title: 'Extensions',
      imageSrc: lash1,
      description: 'Description of Service 1.',
    },
    {
      title: 'Brow Lamination',
      imageSrc: lash2,
      description: 'Description of Service 2.',
    },
    {
      title: 'Lash Lifts',
      imageSrc: lash3,
      description: 'Description of Service 3.',
    },
    {
      title: 'Volume Lashes',
      imageSrc: lash2,
      description: 'Description of Service 3.',
    },
    {
      title: 'Tinting',
      imageSrc: lash1,
      description: 'Description of Service 3.',
    },
  ];
  
  return (
    <>
    <h1 className='text-4xl text-center my-8 font-comfortaa'>Services</h1>
    <div className="flex flex-wrap justify-center">
    {services.map((service, index) => (
      <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-4 mb-8">
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-xl font-bold mb-2">{service.title}</h2>
          <img src={service.imageSrc} alt={service.title} className="mb-2" />
          <p>{service.description}</p>
        </div>
      </div>
    ))}
  </div>
    </>
    )
}
