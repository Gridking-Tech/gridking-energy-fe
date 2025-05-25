"use-client";
import React, { useState, useEffect } from "react";
import { CountryDropdown } from "react-country-region-selector";
import Image from "next/image";
import solar from "../public/assets/placeholders/solarExpert.jpg";
import toast from "react-hot-toast";

export default function TalkToExpert() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    location: "",
    message: "",
  });

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const allFieldsFilled = Object.values(formData).every(
      (value) => value && value.trim() !== ""
    );
    setIsFormValid(allFieldsFilled);
  }, [formData]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCountryChange = (val: string) => {
    setFormData({ ...formData, location: val || "" });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isFormValid) {
      toast.success(
        "Your inquiry has been received. Our team will assess your needs and get back to you ASAP."
      );
      setFormData({
        name: "",
        email: "",
        phone: "",
        service: "",
        location: "",
        message: "",
      });
    } else {
      toast.error("Please fill all fields before submitting.");
    }
  };

  return (
    <div className="md:max-w-6xl mx-auto bg-white min-h-screen lg:mt-10 dark:bg-black/10 ">
      <div className="flex flex-col md:flex-row justify-between gap-6 items-center">
        <div className="md:w-1/2 pr-25 leading-loose">
          <h2 className="text-3xl md:text-4xl gray-300 border-l-4 pl-4 text-black dark:text-white">
            Get Your Free Solar Quote Today
          </h2>
          <p className="text-[#F57B2C] text-lg font-semibold mt-4">
            TAILORED SOLUTIONS FOR YOUR ENERGY NEEDS
          </p>
          <p className="text-gray-600 mt-4 text-sm">
            Ready to make the switch to smarter, more sustainable power? Our
            team will assess your needs and recommend the best Gridking inverter
            solution — customized to your home or business.
          </p>
        </div>
        <div className="h-[200px] w-full md:w-[300px] relative flex items-center justify-center">
          <Image
            src={solar}
            alt="solar panel"
            priority={true}
            fill
            className="rounded"
          />
        </div>
      </div>
      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div>
            <label className="block text-gray mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full p-2 border border-gray-300 dark:border-gray-800 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#F6F6F6]"
            />
          </div>
          <div>
            <label className="block text-gray mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email address"
              className="w-full p-2 border border-gray-300 dark:border-gray-800 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#F6F6F6]"
            />
          </div>
          <div>
            <label className="block text-gray mb-1">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              className="w-full p-2 border border-gray-300 dark:border-gray-800 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#F6F6F6]"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div>
            <label className="block text-gray mb-1">
              Product/Service Interested in
            </label>
            <select
              name="service"
              value={formData.service}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 dark:border-gray-800 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#F6F6F6]"
            >
              <option value="">Select product/service type</option>
              {/* <option value="solar">Solar Panels</option> */}
              <option value="battery">Batteries</option>
              <option value="inverter">Inverters</option>
            </select>
          </div>
          <div>
            <label className="block text-gray mb-1">Location</label>
            <CountryDropdown
              name="location"
              value={formData.location}
              onChange={handleCountryChange}
              className="w-full p-2 border border-gray-300 dark:border-gray-800 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#F6F6F6]"
            />
          </div>
        </div>
        <div>
          <label className="block text-gray mb-1">Describe the inquiry</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell us more about your energy needs"
            className="w-full p-2 border border-gray-300 dark:border-gray-800 rounded min-h-[100px] focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#F6F6F6]"
          ></textarea>
        </div>
        <button
          type="submit"
          disabled={!isFormValid}
          className={`md:w-[100%] mt-2 font-semibold py-3 px-6 rounded transition ${
            isFormValid
              ? "bg-orange-500 text-white hover:bg-[#F57B2C] cursor-pointer"
              : "bg-orange-300 text-white opacity-60 cursor-not-allowed"
          }`}
        >
          SUBMIT
        </button>
      </form>
    </div>
  );
}
