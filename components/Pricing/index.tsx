"use client";
import { useRouter } from "next/navigation";
import React, { useState, useMemo, useEffect } from "react";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { productsApi } from "@/api";
import { useCheckout } from "@/app/context";
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
  const { clearCheckout, checkoutProducts } = useCheckout();

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
      lineItems: checkoutProducts?.map((item: any) => ({
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

  const handleClearOrder = () => {
    clearCheckout();
    localStorage.removeItem("checkout_products");
    toast.success("Order cleared successfully");
    // The component will automatically show the continue shopping content
    // when storedCart becomes empty due to the conditional rendering
  };

  // Calculate total items
  const totalItems = checkoutProducts.reduce(
    (sum: any, item: any) => sum + (item.quantity || 0),
    0
  );

  // If no items in cart, show continue shopping message
  if (!checkoutProducts || checkoutProducts.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center py-8 px-4">
        <div className="max-w-lg mx-auto">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 md:p-12 text-center">
            <div className="w-28 h-28 mx-auto mb-8 bg-gradient-to-br from-orange-50 to-orange-100 rounded-full flex items-center justify-center shadow-inner">
              <svg
                className="w-14 h-14 text-orange-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Your cart is empty
            </h2>
            <p className="text-gray-600 mb-8 text-lg leading-relaxed">
              Looks like you haven't added any items to your cart yet. Start
              shopping to see our amazing solar energy products!
            </p>
            <div className="space-y-4">
              <button
                onClick={() => router.push("/categories")}
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 px-8 rounded-xl font-semibold text-lg hover:from-orange-600 hover:to-orange-700 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Continue Shopping
              </button>
              <button
                onClick={() => router.push("/")}
                className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-200 transition-colors cursor-pointer"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 px-2 md:px-40">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl mb-8 text-gray-800">Pricing Details</h2>
        <form onSubmit={handleFormSubmit} className="flex flex-col gap-6">
          {/* Form Fields - always first, full width, padded */}
          <div className="w-full bg-white rounded shadow-sm p-4 md:p-0">
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

          {/* Cart and Submit - always after, full width, padded */}
          <div className="w-full bg-white rounded shadow-sm p-4 md:p-8 mt-4">
            <div>
              {/* List all products in cart */}
              <div>
                {checkoutProducts.map((item: any) => (
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
                <button
                  type="button"
                  onClick={handleClearOrder}
                  className="mt-4 px-4 py-2 bg-red-500 text-white text-sm font-medium rounded hover:bg-red-600 transition-colors cursor-pointer"
                >
                  Clear Order
                </button>
              </div>
            </div>
            <button
              type="submit"
              onClick={handleFormSubmit}
              aria-label="Get Quote"
              data-testid="get-quote-button"
              disabled={
                isPending || !isFormValid || checkoutProducts.length === 0
              }
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
