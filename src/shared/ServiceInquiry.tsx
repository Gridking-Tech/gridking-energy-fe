import React, { useState, useEffect } from "react";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import Button from "./util/Button";
import Inputs from "./util/Inputs";
import { FaEnvelope, FaPhone } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";

export default function TalkExpert() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    country: "",
    region: "",
    message: "",
  });

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const allFieldsFilled = Object.values(formData).every(
      (value) => value.trim() !== ""
    );
    setIsFormValid(allFieldsFilled);
  }, [formData]);

  const handleChange = (e:any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCountryChange = (val:any) => {
    setFormData({ ...formData, country: val, region: "" });
  };

  const handleRegionChange = (val:any) => {
    setFormData({ ...formData, region: val });
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
    if (isFormValid) {
      setTimeout(() => {
        toast.success("Form submitted successfully!");
        setFormData({
          name: "",
          phone: "",
          email: "",
          service: "",
          country: "",
          region: "",
          message: "",
        });
      }, 1000);
    } else {
      toast.error("Please fill all fields before submitting.");
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center z-40 relative h-[100%] md:h-[80%] w-[100%] xl:w-[80%] mx-auto gap-6 mb-20 justify-center md:justify-between p-6">
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            zIndex: 9999,
          },
        }}
        containerStyle={{
          top: "5rem",
          zIndex: 9999,
        }}
      />

      <div className="text-left max-w-md">
        <h3 className="text-orange-500 md:text-4xl font-bold">Contact Us</h3>
        <h1 className="md:text-5xl text-2xl font-bold mt-2 text-gray-900">
          Talk to an Expert
        </h1>
        <p className="text-gray-600 mt-2">
          We'll get back to you within a time to schedule a quick evaluation
          call.
        </p>
        <div className="mt-4 space-y-4">
          <div className="flex items-center gap-3">
            <FaEnvelope className="text-red-500" size={25} />
            <span className="text-gray-800 text-xl font-semibold">
              info@gridking.africa
            </span>
          </div>
          <div className="flex items-center gap-3">
            <FaPhone className="text-yellow-500" size={25} />
            <span className="text-gray-800 text-xl font-semibold">
              +2347074683973
            </span>
          </div>
        </div>
      </div>

      <div className="md:w-[600px] w-[380px] p-6 md:shadow-2xl border h-[800px] md:h-[750px] flex flex-col rounded-lg bg-white">
        <h2 className="text-2xl font-black text-gray-900 text-center mb-6">
          Service Inquiry
        </h2>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col relative h-[100%] xl:h-[86%] xl:justify-between"
        >
          <div className="overflow-y-hidden h-full gap-1 md:gap-3 flex flex-col">
            <Inputs
              name="name"
              onChange={handleChange}
              placeholder="john doe"
              value={formData.name}
              showLabel
              label="Name:"
              className="w-full p-2 border rounded"
            />
            <Inputs
              name="phone"
              showLabel
              label="Phone Number:"
              placeholder="e.g 081293181869"
              onChange={handleChange}
              value={formData.phone}
              className="w-full p-2 border rounded"
            />
            <Inputs
              name="email"
              showLabel
              label="Email:"
              type="email"
              placeholder="e.g johndoe@gmail.com"
              onChange={handleChange}
              value={formData.email}
              className="w-full p-2 border rounded"
            />
            <Inputs
              name="service"
              showLabel
              label="Service Interested in:"
              placeholder="e.g Gel battery, inverters, solar panel installations"
              onChange={handleChange}
              value={formData.service}
              className="w-full p-2 border rounded"
            />
            <div className="w-full">
              <label className="block text-gray-700 font-semibold mb-2">
                Location:
              </label>
              <CountryDropdown
                name="country"
                value={formData.country}
                onChange={handleCountryChange}
                className="w-full p-2 border rounded mb-2"
              />
              <RegionDropdown
                name="region"
                country={formData.country}
                value={formData.region}
                onChange={handleRegionChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="flex flex-col">
              <div className="text-gray-700 font-black mb-1">
                Describe your inquiry
              </div>
              <textarea
                name="message"
                value={formData.message || ""}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                placeholder="Tell us more about what you need"
                className="border-2 rounded-md w-full p-2 min-h-[5rem] xl:min-h-[6rem]"
              />
            </div>
          </div>
          <Button
            title="Submit"
            type="submit"
            disabled={!isFormValid}
            className={`w-full mt-0 xl:absolute -bottom-12 text-white ${
              isFormValid
                ? "bg-blue-700 hover:bg-blue-600 cursor-pointer"
                : "bg-gray-700 cursor-not-allowed"
            }`}
          />
        </form>
      </div>
    </div>
  );
}
