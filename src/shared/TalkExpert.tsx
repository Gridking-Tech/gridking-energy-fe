import { useState } from "react";
import Button from "./util/Button";
import Inputs from "./util/Inputs";
import { FaEnvelope, FaPhone } from "react-icons/fa";

export default function TalkExpert() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    state: "",
  });

  const handleChange = (e:any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
    console.log("Form submitted", formData);
  };

  return (
    <div className="flex flex-col  md:flex-row items-center  h-[100%] md:h-[80%] w-[100%] md:w-[80%]  mx-auto gap-6 justify-between p-6">
      <div className="text-left max-w-md">
        <h3 className="text-orange-500 md:text-4xl font-bold">Contact Us</h3>
        <h1 className="md:text-5xl text-2xl font-bold mt-2 text-gray-900">Talk to an Expert</h1>
        <p className="text-gray-600 mt-2">
          We'll get back to you within a time to schedule a quick evaluation call.
        </p>
        <div className="mt-4 space-y-4">
          <div className="flex items-center gap-3">
            <FaEnvelope className="text-red-500" size={25}/>
            <span className="text-gray-800 text-xl font-semibold">info@frankanozie.com</span>
          </div>
          <div className="flex items-center gap-3">
            <FaPhone className="text-yellow-500" size={25}/>
            <span className="text-gray-800 text-xl font-semibold">08067471009</span>
          </div>
        </div>
      </div>
      <div className="md:w-[500px] w-[380px] p-6 md:shadow-lg border md:h-[650px] flex flex-col  rounded-lg bg-white">
        <h2 className="text-2xl font-semibold text-gray-900 text-center mb-6">
          Service Inquiry
        </h2>
        <form onSubmit={handleSubmit} className=" flex flex-col space-y-3 h-[60%] justify-between">
          <Inputs name="name" onChange={handleChange} value={formData.name} showLabel label="Name:"/>
          <Inputs name="phone" showLabel label="Phone Number:"  onChange={handleChange} value={formData.phone}  />
          <Inputs name="email" showLabel label="Email:" type="email" onChange={handleChange} value={formData.email}  />
          <Inputs name="service" showLabel label="Service Interested in:" onChange={handleChange} value={formData.service}  />
          <Inputs name="state" showLabel label="State:" onChange={handleChange} value={formData.state} />
          <Button
            title="Submit"
            type="submit"
            className="w-full mt-5 bg-blue-600 text-white hover:bg-blue-700"
          />
        </form>
      </div>
    </div>
  );
}
