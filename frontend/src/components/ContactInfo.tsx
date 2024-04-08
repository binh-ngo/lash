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
    <div className=" mx-auto p-8 bg-white rounded-lg shadow-lg mb-12 md:w-1/2 lg:w-1/3 3xs:w-full mt-[3rem]">
      <h2 className="text-6xl mb-4 text-center font-allura">Contact Information</h2>
      <div className="mb-4 flex flex-row">
        <CiLocationOn />
        <div className="-mt-1 ml-1">
          <p className="text-gray-700 flex flex-row">401 Olympia Ave NE</p>
          <p className="text-gray-700">Renton, WA 98056</p>
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
          <a href="tel:808-679-7090" className="text-blue-500 hover:underline">954-701-9447</a>
        </div>
      </div>
      <div className="mb-4 flex flex-row">
        <CiMail />
        <div className="-mt-1 ml-1">
          <a href="mailto:oohlalashandbeauty808@gmail.com" className="text-blue-500 hover:underline">modbeautyco.wa@gmail.com</a>
        </div>
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Google Map Location:</h3>
        <div className="aspect-w-16 aspect-h-9">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5392.095014927957!2d-122.17491372306402!3d47.48898787117931!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x549067dff86bca8f%3A0x2b7931856d1ac639!2s401%20Olympia%20Ave%20NE%2C%20Renton%2C%20WA%2098056!5e0!3m2!1sen!2sus!4v1712555162716!5m2!1sen!2sus" width="420" style={{ "border": 0 }} height="420" loading="lazy"></iframe>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
