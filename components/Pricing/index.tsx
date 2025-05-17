import React, { useState } from "react";

const Pricing = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    companyName: "",
    streetAddress: "",
    apartment: "",
    townCity: "",
    phoneNumber: "",
    emailAddress: "",
    saveInfo: false,
  });

  const handleInputChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md flex flex-col md:flex-row">
        {/* Form Section */}
        <div className="w-full md:w-2/3 p-6">
          <h2 className="text-2xl font-bold mb-6">Pricing Details</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                First Name*
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Company Name
              </label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Street Address*
              </label>
              <input
                type="text"
                name="streetAddress"
                value={formData.streetAddress}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Apartment, floor, etc. (optional)
              </label>
              <input
                type="text"
                name="apartment"
                value={formData.apartment}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <span className="text-xs text-gray-500">[optional]</span>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Town/City*
              </label>
              <input
                type="text"
                name="townCity"
                value={formData.townCity}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Phone Number*
              </label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">
                Email Address*
              </label>
              <input
                type="email"
                name="emailAddress"
                value={formData.emailAddress}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
                required
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                name="saveInfo"
                checked={formData.saveInfo}
                onChange={handleInputChange}
                className="mr-2"
              />
              <label className="text-sm text-orange-500">
                Save this information for faster check-out next time
              </label>
            </div>
          </form>
        </div>

        {/* Product Summary Section */}
        <div className="w-full md:w-1/3 p-6 border-l border-gray-200">
          <div className="flex items-center mb-6">
            <img
              src="https://via.placeholder.com/40"
              alt="Product Icon"
              className="w-10 h-10 mr-3"
            />
            <span className="text-sm">{"SP Series Inverter 80A 55V-450V"}</span>
          </div>
          <button
            onClick={handleSubmit}
            className="w-full p-3 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors"
          >
            GET QUOTE
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
