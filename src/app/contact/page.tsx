'use client'
import { homePageApi } from "@/src/api";
import Footer from "@/src/shared/Footer";
import NavBar from "@/src/shared/NavBar/NavBar";
import ImagePlaceholder from "@/src/shared/Placeholders/ImagePlaceholder";
import Image from "next/image";
import React from "react";
import {
  FaCogs,
  FaEnvelope,
  FaLock,
  FaPhone,
  FaUsers,
  FaWhatsapp,
} from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";

const features = [
  {
    icon: <IoLocationSharp className="text-4xl text-blue-600" />,
    title: "Location",
    description: "F1219, Alaba International Market, Lagos.",
  },
  {
    icon: <FaEnvelope className="text-4xl text-green-600" />,
    title: "Send us an email",
    description: "Info@gridking.africa",
  },
  {
    icon: <FaPhone className="text-4xl text-purple-600" />,
    title: "Call or Whatsapp us today",
    description: "+2347074683973",
  },
];

export default function CustomSection() {

    const { data: ImageId,isLoading } = homePageApi.useGetCarouselById(
      "67ec910d2d2e858db2b1ca2a"
    ) as {
      data: any;
      isLoading: boolean;
      error: any;
    };


  return (
    <div className="w-screen   space-y-24">
      <div className="absolute top-0 left-0 w-full z-50">
        <NavBar />
      </div>
      <div className="w-full">
      <div className="w-full">
        {ImageId?.[0]?.url.length > 0 ? (
          <div className="relative w-full h-[30rem]">
            <Image
              src={ImageId?.[0]?.url}
              alt="Banner"
              style={{ objectFit: "cover" }}
              fill
              className="absolute w-full h-full"
            />
            <div className="absolute inset-0 bg-black/30"></div>
          </div>
        ) : (
          <ImagePlaceholder width={"100%"} height={"100%"} />
        )}
      </div>
        <div className="w-full flex pl-20 font-black text-gray-600 justify-center flex-col  h-[3.5rem] bg-gray-200">
          {'HOME > CONTACT US'}
        </div>
      </div>
      {/* WHY CHOOSE US */}
      <section className="text-center h-full md:h-[30rem] justify-center flex flex-col items-center ">

        <div className="grid grid-cols-1  md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white px-8 xl:py-16 rounded-xl border-2 shadow-lg hover:shadow-xl  transition text-center"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-2xl font-black mb-2 text-gray-900">{feature.title}</h3>
              <p className="text-black text-xl font-bold ">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    
    </div>
  );
}
