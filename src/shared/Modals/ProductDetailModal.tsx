"use client";

import React, { useState, useEffect } from "react";
import Button from "../util/Button";
import Input from "../util/Inputs";
interface ProductDetailModalProps {
  formData: {
    firstName: string;
    lastName: string;
    country: string;
    email: string;
    phone: string;
    requirements: string;
  };
  setFormData: React.Dispatch<React.SetStateAction<{
    firstName: string;
    lastName: string;
    country: string;
    email: string;
    phone: string;
    requirements: string;
  }>>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function ProductDetailModal({ setIsModalOpen }: ProductDetailModalProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    country: "",
    email: "",
    phone: "",
    requirements: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  // Validate form fields
  useEffect(() => {
    const allFieldsFilled = Object.values(formData).every((val) => val.trim() !== "");
    setIsFormValid(allFieldsFilled);
  }, [formData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    setSubmitting(true);

    // Simulate sending the form (replace with real API call)
    setTimeout(() => {
      alert("Quotation submitted ✅");

      setFormData({
        firstName: "",
        lastName: "",
        country: "",
        email: "",
        phone: "",
        requirements: "",
      });

      setSubmitting(false);
      setIsModalOpen(false);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-black/60 bg-opacity-50 flex z-50 items-center justify-center">
      <div className="bg-white flex flex-col p-6 rounded-lg w-[90%] md:w-[40%] h-[90%] shadow-lg relative overflow-y-auto">
        <button
          className="absolute top-4 right-4 text-gray-600"
          onClick={() => setIsModalOpen(false)}
        >
          ✖
        </button>
        <h2 className="text-2xl font-bold mb-4 text-center">GET A QUOTE</h2>
        <p className="text-md text-black font-bold text-center mb-4">
          If you have a query regarding our product, please complete the form below.
        </p>
        <form onSubmit={handleSubmit} className="space-y-5 w-full flex flex-col">
          <div className="flex flex-col w-full gap-5">
            <Input
              value={formData.firstName}
              showLabel
              label="Name"
              name="firstName"
              placeholder="First Name"
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
            <Input
              value={formData.lastName}
              showLabel
              label="Last Name"
              name="lastName"
              placeholder="Last Name"
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <Input
            value={formData.country}
            showLabel
            label="Country"
            name="country"
            placeholder="Country"
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
          <div className="flex w-full flex-col gap-5">
            <Input
              value={formData.email}
              name="email"
              showLabel
              label="Email"
              type="email"
              placeholder="Email"
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
            <Input
              value={formData.phone}
              showLabel
              label="Whatsapp Num"
              name="phone"
              placeholder="Whatsapp/Phone"
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <textarea
            name="requirements"
            placeholder="Your requirements: product model, size, quantity"
            value={formData.requirements}
            onChange={handleInputChange}
            className="w-full p-2 mt-5 border rounded h-24"
          ></textarea>
          <Button
            title={submitting ? "Sending..." : "SEND"}
            type="submit"
            disabled={!isFormValid || submitting}
            className="w-full bg-orange-500 text-white py-2 cursor-pointer rounded disabled:opacity-50"
          />
        </form>
      </div>
    </div>
  );
}
