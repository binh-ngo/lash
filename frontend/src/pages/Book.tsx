import React, { ChangeEvent, FormEvent, useState } from 'react';
import { ddbCreateAppointment } from '../graphql/appointment';

type FormData = {
  clientName: string;
  clientPhone: string;
  email: string;
  date: string;
  firstAppointment: string;
  secondAppointment: string;
  appointmentType: string;
}

export const Book = () => {
  const [formData, setFormData] = useState<FormData>({
    clientName: '',
    clientPhone: '',
    email: '',
    date: '',
    firstAppointment: '',
    secondAppointment: '',
    appointmentType: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const timeOptions = [
    "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM",
    "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM", "05:00 PM"
  ];

  const appointmentTypeOptions = [
    "Classic $120",
    "Classic Full $140",
    "Classic Fill $65",
    "Hybrid $140",
    "Hybrid $155",
    "Hybrid $70+",
    "3D - 4D Volume $160",
    "3D - 4D Volume Full $175",
    "3D - 4D Volume Fill $75+",
    "5D - 6D Volume Full $180",
    "5D - 6D Volume Fill $195",
    "5D - 6D Volume $85+",
    "7D+ Volume $200",
    "7D+ Volume Fill $95+"
  ];

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const appointment: FormData = {
      clientName: formData.clientName,
      email: formData.email,
      clientPhone: formData.clientPhone,
      date: formData.date,
      firstAppointment: formData.firstAppointment,
      secondAppointment: formData.secondAppointment,
      appointmentType: formData.appointmentType
    };

    let createdAppointment = null;
    const response = await ddbCreateAppointment(appointment);

    if ('data' in response) {
      createdAppointment = response.data.createAppointment;
      // console.log(`Response from DynamoDB: ${JSON.stringify(createdAppointment)}`);
    } else {
      console.error('Response is not a GraphQL result:', response);
    }

    if (createdAppointment) {
      console.log("Appointment successfully created");
      setFormSubmitted(true);
    } else {
      console.error("Failed to create appointment.");
    }
  };

  return (
    <div>
    {
      !formSubmitted ? (
        <div className="mx-auto max-w-md mt-[3rem] font-comfortaa">
        <h2 className="text-6xl mb-4 text-center font-allura">Book an Appointment</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Name:</label>
            <input name="clientName" type="text" value={formData.clientName} onChange={handleInputChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" required />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Phone Number:</label>
            <input name="clientPhone" type="text" value={formData.clientPhone} onChange={handleInputChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" required />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Email:</label>
            <input name="email" type="email" value={formData.email} onChange={handleInputChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" required />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Date:</label>
            <input name="date" type="date" value={formData.date} onChange={handleInputChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" required />
          </div>
          <label className="block text-sm font-medium text-gray-700">Appointment Time</label>
          <label className="block text-xs font-medium text-red-400">*We may schedule you around your selected times if there are time conflicts.</label>
          <label className="block text-xs font-medium text-gray-700">*Leave 2nd availability blank if you only have one general time available.</label>

          <div className='flex flex-row justify-around'>
            <div className="mb-4 w-5/12">
              <select name="firstAppointment" value={formData.firstAppointment} onChange={handleSelectChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" required>
                <option value="">1st Availability</option>
                {timeOptions.map((time, index) => (
                  <option key={index} value={time}>{time}</option>
                ))}
              </select>
            </div>
            <div className="mb-4 w-5/12">
              <select name="secondAppointment" value={formData.secondAppointment} onChange={handleSelectChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full">
                <option value="">2nd Availability</option>
                {timeOptions.map((time, index) => (
                  <option key={index} value={time}>{time}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Appointment Type:</label>
            <select name="appointmentType" value={formData.appointmentType} onChange={handleSelectChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" required>
              <option value="">Appointment Types</option>
              {appointmentTypeOptions.map((appointmentType, index) => (
                <option key={index} value={appointmentType}>{appointmentType}</option>
              ))}
            </select>        </div>
          <div className="text-right">
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Book</button>
          </div>
        </form>
      </div>
    ) : (
      <div className="mx-auto max-w-md mt-[3rem] font-comfortaa">
        <h2 className="text-6xl mb-4 text-center font-allura">Thank you for booking!</h2>
        <p className="text-center">We will contact you shortly to confirm your appointment.</p>
      </div>
    )}
    </div>
  );
};
