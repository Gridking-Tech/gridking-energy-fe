"use client";
import React from "react";
import { FaEnvelope, FaWhatsapp } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import Banner from "@/components/Banner";
import DesktopHeader from "@/shared/Header";

const features = [
  {
    icon: <IoLocationSharp className="text-4xl text-red-600" />,
    title: "Location",
    description: "F1219, Alaba International Market, Lagos.",
  },
  {
    icon: <FaEnvelope className="text-4xl text-blue-600" />,
    title: "Send us an email",
    description: "Info@gridking.africa",
  },
  {
    icon: <FaWhatsapp className="text-4xl text-green-700" />,
    title: "Call or Whatsapp us today",
    description: (
      <a
        href={`https://wa.me/2347074683973?text=${encodeURIComponent(
          "Hello Gridking Admin @ gridking.africa —\n\nI’d love to get a detailed quote for your gel batteries, inverters (2kW & 3kW), and solar panels.\n\nCould you also recommend what setup might work best for a home or commercial installation? Kindly contact me via this number."
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 underline"
      >
        +2347074683973
      </a>
    ),
  },
];

export default function ClientContactSection() {
  return (
    <div className="w-screen">
      <DesktopHeader isBannerPage />
      <Banner />
      <section className="mx-auto w-full max-w-4xl px-6 py-12 md:py-36">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 place-items-center">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl border-2 shadow-lg hover:shadow-xl transition-all text-center w-full max-w-sm h-72 flex flex-col justify-center items-center"
            >
              <div className="mb-4 flex justify-center">{feature.icon}</div>
              <h3 className="text-xl font-black mb-2 text-gray-900">
                {feature.title}
              </h3>
              <p className="text-black text-sm font-bold">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
