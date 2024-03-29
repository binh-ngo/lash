import { CiLocationOn, CiPhone, CiClock1, CiMail } from "react-icons/ci";

const isOpen = () => {
  const currentDay = new Date().getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  const currentTime = new Date().getHours();

  // Check if it's Monday to Saturday and between 10am and 5pm
  return currentDay >= 1 && currentDay <= 6 && currentTime >= 10 && currentTime < 17;
};

const getNextOpeningTime = () => {
  const today = new Date();
  let nextOpeningTime = new Date(today);

  // If today is Sunday or after 5pm, set next opening time to Monday 10am
  if (today.getDay() === 0 || today.getHours() >= 17) {
    nextOpeningTime.setDate(today.getDate() + (1 + (1 - today.getDay())));
    nextOpeningTime.setHours(10, 0, 0, 0);
  } else if (today.getHours() < 10) { // If before 10am, next opening time is today at 10am
    nextOpeningTime.setHours(10, 0, 0, 0);
  } else { // If after 5pm but not Sunday, next opening time is tomorrow at 10am
    nextOpeningTime.setDate(today.getDate() + 1);
    nextOpeningTime.setHours(10, 0, 0, 0);
  }

  return nextOpeningTime;
};
const ContactInfo = () => {
  const textColor = isOpen() ? 'text-green-500' : 'text-red-500';
  const isOpenNow = isOpen();
  const nextOpeningTime = getNextOpeningTime();

  return (
    <div className="max-w-lg mx-auto p-8 bg-white rounded-lg shadow-lg mb-12">
      <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
      <div className="mb-4 flex flex-row">
        <CiLocationOn />
        <div className="-mt-1 ml-1">
          <p className="text-gray-700 flex flex-row">1130 N. Nimitz Hwy, C-105</p>
          <p className="text-gray-700">Honolulu, HI 96817</p>
        </div>
      </div>
      <div className="mb-4 flex flex-row">
        <CiClock1 />
        <div className="-mt-1 ml-1">
          <p className={`hover:underline font-bold ${textColor}`}>
            {isOpenNow ? (
              `Open today until 5:00pm`
            ) : (
              `Closed. Next opening: ${nextOpeningTime.toLocaleString('en-US', { weekday: 'long', hour: 'numeric', minute: 'numeric', hour12: true })}`
            )}
          </p>
        </div>
      </div>
      <div className="mb-4 flex flex-row">
        <CiPhone />
        <div className="-mt-1 ml-1">
          <a href="tel:808-679-7090" className="text-blue-500 hover:underline">808-679-7090</a>
        </div>
      </div>
      <div className="mb-4 flex flex-row">
        <CiMail />
        <div className="-mt-1 ml-1">
          <a href="mailto:oohlalashandbeauty808@gmail.com" className="text-blue-500 hover:underline">oohlalashandbeauty808@gmail.com</a>
        </div>
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Google Map Location:</h3>
        <div className="aspect-w-16 aspect-h-9">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3716.808313602489!2d-157.8755875!3d21.3185893!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7c006f1d9bf11ab9%3A0x67cc528290830020!2s1130%20N%20Nimitz%20Hwy%2C%20Honolulu%2C%20HI%2096817!5e0!3m2!1sen!2sus!4v1711731968263!5m2!1sen!2sus" width="450" height="450" style={{ "border": 0 }} loading="lazy"></iframe>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
