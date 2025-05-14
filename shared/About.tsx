"use client";

import React, { useState, ReactNode } from "react";
import { homePageApi } from "../api/homepage-api";
import Image from "next/image";
import ImagePlaceholder from "../shared/Placeholders/ImagePlaceholder";

interface Props {
  icon?: ReactNode;
  title?: string;
  subtitle?: string | ReactNode;
  description?: string;
  bgColor?: string;
}
const SustainabilityCard: React.FC<Props> = ({
  icon,
  title,
  subtitle,
  description,
  bgColor = "bg-gray-800",
}) => {
  return (
    <div
      className={`p-8 rounded shadow-lg text-white ${bgColor} h-80 flex flex-col justify-start`}
    >
      <div className="flex items-center mb-6">
        <span className="text-3xl mr-3">{icon}</span>
        <div>
          <h3 className="text-2xl font-bold">{title}</h3>
          <h4 className="text-lg font-light text-gray-300">{subtitle}</h4>
        </div>
      </div>
      <div>
        <p className="text-gray-200">{description}</p>
      </div>
    </div>
  );
};

export default function AboutPage() {
  const { data: ImageId } = homePageApi.useGetCarouselById(
    "67ec910d2d2e858db2b1ca2a"
  ) as {
    data: any;
    isLoading: boolean;
    error: any;
  };

  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  return (
    <div className="bg-white dark:bg-[#393939] text-black min-h-screen py-20">
      <section className="md:max-w-6xl mx-auto px-4 py-12 ">
        <h2 className="text-3xl md:text-4xl mb-8 border-l-4 border-gray-300 pl-4 dark:text-white">
          Built for Sustainability
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SustainabilityCard
            icon="⚡"
            title="99%"
            subtitle="Efficiency Rates"
            description="Our inverters convert up to 99% of solar energy into usable power — maximizing output, minimizing waste."
            bgColor="bg-gray-800"
          />
          <SustainabilityCard
            icon="⏳"
            title="10+"
            subtitle="Years Lifespan"
            description="Designed with premium, durable components that guarantee over a decade of reliable performance with minimal maintenance."
            bgColor="bg-[#F57B2C]"
          />
          <SustainabilityCard
            icon="🌍"
            title="80%"
            subtitle="Carbon Footprint Reduction"
            description="Switching to GridKing inverters can reduce your energy-related carbon emissions by up to 80%, helping build a cleaner, greener future."
            bgColor="bg-gray-800"
          />
        </div>
      </section>
      <section className="md:max-w-6xl mx-auto px-4 py-12 flex flex-col md:flex-row items-center gap-8 mt-25">
        <div className="flex-1 pr-20">
          <h2 className="text-3xl md:text-4xl mb-6 border-l-4 border-gray-300 pl-4 dark:text-white">
            Built on Trust, Powered by Innovation
          </h2>
          <h3 className="text-xl font-semibold text-[#F57B2C] mb-4">
            Sustainable Energy Made Simple
          </h3>
          <p className="text-gray-500 leading-7 text-sm dark:text-white">
            At GridKing, we believe energy freedom starts with technology you
            can trust. Founded with a mission to drive the global transition to
            renewable energy, we design and manufacture high-performance solar
            inverters that meet the needs of homeowners, businesses, and solar
            professionals.
          </p>
          <button className="mt-6 bg-orange-500 text-white font-semibold py-3 px-6 rounded hover:bg-[#F57B2C] transition cursor-pointer">
            Learn More About Us
          </button>
        </div>
        <div className="w-full md:w-1/3 relative">
          <div className="min-h-[24rem] bg-gray-800 rounded-lg flex items-center justify-center">
            <div className="w-full h-full bg-gray-800 rounded-lg z-1">
              {!isVideoLoaded && (
                <div className="w-full h-full flex items-center justify-center bg-gray-800">
                  <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center">
                    <span className="text-orange-500 text-3xl">▶</span>
                  </div>
                </div>
              )}
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/p6hukTvPzfU?autoplay=1&mute=1&modestbranding=1&rel=0&playsinline=1"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                onLoad={() => setIsVideoLoaded(true)}
                style={{
                  display: isVideoLoaded ? "block" : "none",
                  minHeight: "34rem",
                }}
              ></iframe>
            </div>
          </div>
          <div
            className="absolute left-1/2 -translate-x-1/2 bottom-[-1rem] w-[85%] h-10 bg-[#F57B2C] z-0"
            style={{ pointerEvents: "none" }}
          ></div>
        </div>
      </section>
    </div>
  );
}
