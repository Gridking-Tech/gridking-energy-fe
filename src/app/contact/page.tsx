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
    description: "No. 1, ADEDEJI ADEKOLA,LEKKI LAGOS.",
  },
  {
    icon: <FaEnvelope className="text-4xl text-green-600" />,
    title: "Send Us an Email",
    description: "Sales: candy@gridking.com.",
  },
  {
    icon: <FaPhone className="text-4xl text-purple-600" />,
    title: "Call/Whatsapp Us Today",
    description: "Sales: +234 18578741060",
  },
];

export default function CustomSection() {
    // const { data: productsData, isLoading, error } = homePageApi.useGetCarouselById("67ec910d2d2e858db2b1ca2a") as {
    //   data: any;
    //   isLoading: boolean;
    //   error: any;
    // }
  return (
    <div className="w-screen   space-y-24">
      <div className="absolute top-0 left-0 w-full z-50">
        <NavBar />
      </div>
      <div className="w-full">
        <ImagePlaceholder />
          {/* <div className="relative w-full h-[30rem]">
                  <Image
                    src={productsData?.[0]?.url }
                    alt="eds"
                    style={{ objectFit: "cover" }}
                    fill
                    className="absolute w-full h-full"
                  />
                </div> */}

        <div className="w-full flex pl-20 font-bold justify-center flex-col  h-[3.5rem] bg-gray-200">
          {'HOME > CONTACT US'}
        </div>
      </div>
      {/* WHY CHOOSE US */}
      <section className="text-center h-full md:h-[20rem] justify-center flex flex-col items-center ">

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
