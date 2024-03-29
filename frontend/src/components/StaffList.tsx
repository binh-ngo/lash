import { Service } from "./HomeServices";

const lash1 = require('../assets/lash1.webp');
const lash2 = require('../assets/lash2.webp');
const lash3 = require('../assets/lash3.webp');

export const StaffList = () => {

  const staff: Service[] = [
    {
      title: 'Amy',
      imageSrc: lash1,
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis, eveniet quam nesciunt vero veritatis autem aliquam quisquam dignissimos explicabo consequatur incidunt illo exercitationem officiis voluptatibus eius quae numquam minus! Sapiente.',
    },
    {
      title: 'Haninh',
      imageSrc: lash2,
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis, eveniet quam nesciunt vero veritatis autem aliquam quisquam dignissimos explicabo consequatur incidunt illo exercitationem officiis voluptatibus eius quae numquam minus! Sapiente.',
    },
    {
      title: 'Jenny',
      imageSrc: lash3,
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis, eveniet quam nesciunt vero veritatis autem aliquam quisquam dignissimos explicabo consequatur incidunt illo exercitationem officiis voluptatibus eius quae numquam minus! Sapiente.",
    }
  ];
  
  return (
    <>
    <h1 className='text-4xl text-center my-8 font-comfortaa'>Technicians</h1>
    <div className="flex flex-wrap justify-center">
    {staff.map((employee, index) => (
      <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-4 mb-8 group">
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-xl font-bold mb-2 group-hover:text-pink-400 hover:scale-110 transition-all duration-300 ease-in-out">{employee.title}</h2>
          <img src={employee.imageSrc} alt={employee.title} className="mb-2" />
          <p>{employee.description}</p>
        </div>
      </div>
    ))}
  </div>
    </>
    )
}
