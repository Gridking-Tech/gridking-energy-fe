"use client";
import { useRouter } from "next/navigation";
import React, { useState, useMemo, useEffect } from "react";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { productsApi } from "@/api";
interface FormData {
  fullName: string;
  companyName: string;
  apartment: string;
  townCity: string;
  phoneNumber: string;
  email: string;
  saveInfo: boolean;
}

interface InputChangeEvent extends React.ChangeEvent<HTMLInputElement> {}

const Pricing = () => {
  const router = useRouter();

  const { mutate, isPending } = productsApi.useSendQuote({
    mutationKey: ["sendQuote"],
    onSuccess: () => {
      toast.success("Your quote has been submitted successfully");
      localStorage.removeItem("checkout_products");
      window.location.href = "/";
    },
    onError: (error: any) => {
      console.error(
        "Error submitting quote:",
        error?.data?.response?.data?.errors?.[0] || error
      );

      toast.error(
        error?.response?.data?.errors?.[0] ||
          "An error occurred while submitting your quote. Please try again later."
      );
    },
  });

  // Get cart items from localStorage and ensure it's always an array
  const storedCart = useMemo(() => {
    if (typeof window !== "undefined") {
      try {
        const cart = JSON.parse(
          localStorage.getItem("checkout_products") || "[]"
        );
        return Array.isArray(cart) ? cart : [];
      } catch {
        return [];
      }
    }
    return [];
  }, []);

  // Get stored form data (if any)
  const storedFormData = useMemo(() => {
    if (typeof window !== "undefined") {
      try {
        return JSON.parse(localStorage.getItem("quote_info") || "{}");
      } catch {
        return {};
      }
    }
    return {};
  }, []);

  const defaultFormData: FormData = {
    fullName: "",
    companyName: "",
    apartment: "",
    townCity: "",
    phoneNumber: "",
    email: "",
    saveInfo: false,
  };

  // Only merge form data with storedFormData, not with cart
  const [formData, setFormData] = useState<FormData>({
    ...defaultFormData,
    ...storedFormData,
  });

  const [saveInfo, setSaveInfo] = useState<boolean>(
    Object.keys(storedFormData || {}).length > 0
  );

  useEffect(() => {
    if (!storedCart || storedCart.length === 0) router.replace("/");
  }, [storedCart, router]);

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

  const isFormValid = useMemo(() => {
    return (
      formData.fullName.trim() !== "" &&
      formData.townCity.trim() !== "" &&
      formData.phoneNumber.trim() !== "" &&
      formData.email.trim() !== ""
    );
  }, [formData]);

  const handleSubmit = () => {
    if (!isFormValid) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const { saveInfo, ...formDataToSave } = formData;
    const quotePayload = {
      lineItems: storedCart?.map((item: any) => ({
        productId: item.productId,
        quantity: item.quantity,
      })),
      ...formDataToSave,
    };
    handleSaveInfo();
    mutate(quotePayload);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      handleSubmit();
    }
  };

  // Calculate total items (storedCart is always an array now)
  const totalItems = storedCart.reduce(
    (sum: any, item: any) => sum + (item.quantity || 0),
    0
  );

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
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="h-[30px] w-full p-3 bg-[#F6F6F6] text-gray-800 focus:outline-none focus:ring-1 focus:ring-orange-400 invalid:border-red-500 invalid:ring-red-500"
                required
              />
              {formData.fullName.trim() === "" && (
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
                Company Name
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
                htmlFor="apartment"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Apartment, floor, etc.
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
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="h-[30px] w-full p-3 bg-[#F6F6F6]  text-gray-800 focus:outline-none focus:ring-1 focus:ring-orange-400 invalid:border-red-500 invalid:ring-red-500"
                required
              />
              {formData.email.trim() === "" && (
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
              {/* List all products in cart */}
              {storedCart && storedCart.length > 0 ? (
                <div>
                  {storedCart.map((item: any) => (
                    <div
                      key={item.productId}
                      className="flex items-center mb-4 border-b pb-2"
                    >
                      {item.imageUrl && (
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="w-10 h-10 object-contain rounded mr-3"
                        />
                      )}
                      <div className="flex-1">
                        <span className="text-sm text-gray-800 font-medium">
                          {item.name}
                        </span>
                      </div>
                      <span className="text-xs text-gray-600 ml-2">
                        Qty: {item.quantity}
                      </span>
                    </div>
                  ))}
                  <div className="flex justify-between text-sm font-semibold mt-4">
                    <span>Total Items:</span>
                    <span>{totalItems}</span>
                  </div>
                </div>
              ) : (
                <div className="text-red-500 text-sm">No items in cart.</div>
              )}
            </div>
            <button
              type="submit"
              onClick={handleFormSubmit}
              aria-label="Get Quote"
              data-testid="get-quote-button"
              disabled={isPending || !isFormValid || storedCart.length === 0}
              onKeyDown={handleFormSubmit}
              className="w-full mt-4 py-2 bg-[#F57B2C] text-white font-semibold rounded hover:bg-orange-600 transition-colors cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isPending ? "Loading..." : "GET QUOTE"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Pricing;
