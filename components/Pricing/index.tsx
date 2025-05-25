"use client";
import { useRouter } from "next/navigation";
import React, { useState, useMemo, useEffect } from "react";

import toast from "react-hot-toast";

interface FormData {
  firstName: string;
  companyName: string;
  streetAddress: string;
  apartment: string;
  townCity: string;
  phoneNumber: string;
  emailAddress: string;
  saveInfo: boolean;
}

interface InputChangeEvent extends React.ChangeEvent<HTMLInputElement> {}

const Pricing = () => {
  const router = useRouter();
  const storedFormData = useMemo(() => {
    return typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("quote_info") || "{}")
      : null;
  }, []);

  const defaultFormData: FormData = {
    firstName: "",
    companyName: "",
    streetAddress: "",
    apartment: "",
    townCity: "",
    phoneNumber: "",
    emailAddress: "",
    saveInfo: false,
  };

  const [formData, setFormData] = useState<FormData>(
    storedFormData ? { ...defaultFormData, ...storedFormData } : defaultFormData
  );

  const [saveInfo, setSaveInfo] = useState<boolean>(
    Object.keys(storedFormData || {}).length > 0
  );

  const order =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("checkout_product") || "null")
      : null;

  useEffect(() => {
    if (!order || Object.keys(order).length === 0) router.replace("/");
  }, [order, router]);

  const handleInputChange = (e: InputChangeEvent) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveInfo = () => {
    if (saveInfo) {
      localStorage.setItem("quote_info", JSON.stringify(formData));
    } else {
      localStorage.removeItem("quote_info");
    }
  };

  const handleSubmit = () => {
    try {
      const { _, ...rest } = order || {};
      const quotePayload = {
        order: { ...rest },
        customer_details: { ...formData },
      };
      handleSaveInfo();
      toast.success("Your quote has been submitted successfully");
    } catch (err) {
      console.error("Error submitting quote:", err);
      toast.error(
        "There was an error submitting your quote. Please try again."
      );
    } finally {
      localStorage.removeItem("checkout_product");
      router.replace("/");
    }
  };

  const isFormValid = useMemo(() => {
    return (
      formData.firstName.trim() !== "" &&
      formData.streetAddress.trim() !== "" &&
      formData.townCity.trim() !== "" &&
      formData.phoneNumber.trim() !== "" &&
      formData.emailAddress.trim() !== ""
    );
  }, [formData]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      handleSubmit();
    }
  };

  return (
    <div className="py-8 px-40">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl mb-8 text-gray-800">Pricing Details</h2>
        <form
          onSubmit={handleFormSubmit}
          className="flex flex-col md:flex-row gap-6"
        >
          {/* Left Column - Form Fields */}
          <div className="w-full md:w-1/2">
            <div className="mb-2">
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Full Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="h-[30px] w-full p-3 bg-[#F6F6F6] text-gray-800 focus:outline-none focus:ring-1 focus:ring-orange-400 invalid:border-red-500 invalid:ring-red-500"
                required
              />
              {formData.firstName.trim() === "" && (
                <p className="text-red-500 text-xs mt-1">
                  This field is required
                </p>
              )}
            </div>
            <div className="mb-2">
              <label
                htmlFor="companyName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Company Name (optional)
              </label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                className="h-[30px] w-full p-3 bg-[#F6F6F6]  text-gray-800 focus:outline-none focus:ring-1 focus:ring-orange-400"
              />
            </div>
            <div className="mb-2">
              <label
                htmlFor="streetAddress"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Street Address
              </label>
              <input
                type="text"
                id="streetAddress"
                name="streetAddress"
                value={formData.streetAddress}
                onChange={handleInputChange}
                className="h-[30px] w-full p-3 bg-[#F6F6F6]  text-gray-800 focus:outline-none focus:ring-1 focus:ring-orange-400 invalid:border-red-500 invalid:ring-red-500"
                required
              />
              {formData.streetAddress.trim() === "" && (
                <p className="text-red-500 text-xs mt-1">
                  This field is required
                </p>
              )}
            </div>
            <div className="mb-2">
              <label
                htmlFor="apartment"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Apartment, floor, etc. (optional)
              </label>
              <input
                type="text"
                id="apartment"
                name="apartment"
                value={formData.apartment}
                onChange={handleInputChange}
                className="h-[30px] w-full p-3 bg-[#F6F6F6]  text-gray-800 focus:outline-none focus:ring-1 focus:ring-orange-400"
              />
            </div>
            <div className="mb-2">
              <label
                htmlFor="townCity"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Town/City
              </label>
              <input
                type="text"
                id="townCity"
                name="townCity"
                value={formData.townCity}
                onChange={handleInputChange}
                className="h-[40px] w-full p-3 bg-[#F6F6F6]  text-gray-800 focus:outline-none focus:ring-1 focus:ring-orange-400 invalid:border-red-500 invalid:ring-red-500"
                required
              />
              {formData.townCity.trim() === "" && (
                <p className="text-red-500 text-xs mt-1">
                  This field is required
                </p>
              )}
            </div>
            <div className="mb-2">
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="h-[30px] w-full p-3 bg-[#F6F6F6]  text-gray-800 focus:outline-none focus:ring-1 focus:ring-orange-400 invalid:border-red-500 invalid:ring-red-500"
                required
              />
              {formData.phoneNumber.trim() === "" && (
                <p className="text-red-500 text-xs mt-1">
                  This field is required
                </p>
              )}
            </div>
            <div className="mb-2">
              <label
                htmlFor="emailAddress"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address
              </label>
              <input
                type="email"
                id="emailAddress"
                name="emailAddress"
                value={formData.emailAddress}
                onChange={handleInputChange}
                className="h-[30px] w-full p-3 bg-[#F6F6F6]  text-gray-800 focus:outline-none focus:ring-1 focus:ring-orange-400 invalid:border-red-500 invalid:ring-red-500"
                required
              />
              {formData.emailAddress.trim() === "" && (
                <p className="text-red-500 text-xs mt-1">
                  This field is required
                </p>
              )}
            </div>
            <div className="flex items-center mt-6">
              <input
                type="checkbox"
                id="saveInfo"
                name="saveInfo"
                checked={saveInfo}
                onChange={() => setSaveInfo(!saveInfo)}
                className="mr-2 h-4 w-4 text-orange-500 focus:ring-orange-500 border-gray-300"
              />
              <label
                htmlFor="saveInfo"
                className="text-sm text-gray-700 cursor-pointer"
              >
                Save this information for faster check-out next time
              </label>
            </div>
          </div>

          {/* Right Column - Product and Pricing Details */}
          <div className="w-full md:w-1/2 justify-between py-4 px-8">
            <div>
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 flex items-center justify-center rounded-md mr-3 bg-gray-200">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 text-gray-600"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 18v-5.25a4.5 4.5 0 0 0-4.5 4.5V18m7.5-6v-.75A4.5 4.5 0 0 0 12 6a4.5 4.5 0 0 0-4.5 4.5v.75m7.5 0v.75m-7.5-.75h-.75M12 15h.008v.008H12Zm0 0v-.75a4.5 4.5 0 0 0 4.5-4.5V9"
                    />
                  </svg>
                </div>
                <span className="text-sm text-gray-800 font-medium">
                  {order?.productName || "Not Available"}
                </span>
                <span
                  className={`ml-auto text-sm font-semibold   ${
                    order ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {order ? "In Stock" : "Out of stock"}
                </span>
              </div>
              <div className="pt-4 border-t border-gray-200">
                <div className="flex justify-between text-sm text-gray-700 mb-3">
                  <span>Subtotal:</span>
                  <span>{order ? "Not Available" : "N/A"}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600 mb-3">
                  <span>Shipping:</span>
                  <span>{order ? "Not Available" : "N/A"}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600 mt-6 pt-4 border-t border-gray-200">
                  <span>Total:</span>
                  <span>{order ? "Not Available" : "N/A"}</span>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="w-full mt-4 py-2 bg-[#F57B2C] text-white font-semibold rounded hover:bg-orange-600 transition-colors cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
              disabled={!isFormValid}
            >
              GET QUOTE
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Pricing;
