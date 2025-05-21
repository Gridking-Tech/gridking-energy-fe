"use client";
import { useRouter } from "next/navigation";
import React, { useState, useMemo, useEffect } from "react";

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


  const [formData, setFormData] = useState<FormData>(
    storedFormData || {
      firstName: "",
      companyName: "",
      streetAddress: "",
      apartment: "",
      townCity: "",
      phoneNumber: "",
      emailAddress: "",
    }
  );

  const [saveInfo, setSaveInfo] = useState<boolean>(
    Object.keys(storedFormData || {}).length > 0
  );

  const order =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("checkout_product") as string)
      : null;

  useEffect(()=>{

    if(Object.keys(order || {}).length === 0)
      router.replace('/') 

  },[order])

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
      const { _, ...rest } = order;
      const quotePayload = {
        order: { ...rest },
        customer_details: { ...formData },
      };
      handleSaveInfo();
    } catch (err) {
    } finally {
      localStorage.removeItem("checkout_product");
      router.replace("/");
    }
  };

  return (
    <div className="py-8 px-30">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row overflow-hidden">
        <div className="md:w-[50%] md:w-2/3 p-8">
          <h2 className="text-3xl mb-8 text-gray-800">Pricing Details</h2>
          <form>
            <div className="mb-5">
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
                className="h-[70%] bg-[#F6F6F6] w-full p-3 focus:outline-none focus:ring-1 focus:ring-orange-400"
                required
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="companyName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Company Name
              </label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                className="h-[70%] bg-[#F6F6F6] w-full p-3 focus:outline-none focus:ring-1 focus:ring-orange-400"
              />
            </div>
            <div className="mb-5">
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
                className="h-[70%] bg-[#F6F6F6] w-full p-3 focus:outline-none focus:ring-1 focus:ring-orange-400"
                required
              />
            </div>
            <div className="mb-5">
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
                className="h-[70%] bg-[#F6F6F6] w-full p-3 focus:outline-none focus:ring-1 focus:ring-orange-400"
              />
            </div>
            <div className="mb-5">
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
                className="h-[70%] bg-[#F6F6F6] w-full p-3 focus:outline-none focus:ring-1 focus:ring-orange-400"
                required
              />
            </div>
            <div className="mb-5">
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
                className="h-[70%] bg-[#F6F6F6] w-full p-3 focus:outline-none focus:ring-1 focus:ring-orange-400"
                required
              />
            </div>
            <div className="mb-5">
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
                className="h-[70%] bg-[#F6F6F6] w-full p-3 focus:outline-none focus:ring-1 focus:ring-orange-400"
                required
              />
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
          </form>
        </div>

        <div className="w-full md:w-1/3 p-8 flex flex-col md:mt-[10%]">
          <div>
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 flex items-center justify-center rounded-md mr-3">
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
                {order?.productName}
              </span>
              <span className="ml-auto text-sm text-gray-800 font-medium">
                <span>{"Not Available"}</span>
              </span>{" "}
            </div>
            <div className="pt-4 border-t border-gray-200">
              <div className="flex justify-between text-sm text-gray-700 mb-3">
                <span>Subtotal:</span>
                <span>{"Not Available"}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600 mb-3">
                <span>Shipping:</span>
                <span>{"Not Available"}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600 mt-6 pt-4 border-t border-gray-200">
                <span>Total:</span>
                <span>{"Not Available"}</span>
              </div>
            </div>
          </div>
          <button
            onClick={handleSubmit}
            type="submit"
            className="mt-4 w-full py-2 bg-[#F57B2C] text-white font-semibold rounded hover:bg-orange-600 transition-colors cursor-pointer"
            disabled={!formData}
          >
            GET QUOTE
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
