"use client";
import React, { useState, useEffect } from "react";

const Banner = () => {
  const slides = [
    {
      id: 1,
      text1: "Power Your Future",
      text2: "with Clean Energy",
    },
    {
      id: 2,
      text1: "Built on Trust,",
      text2: "Powered by Innovation",
    },
    {
      id: 3,
      text1: "Harness the Sun,",
      text2: "Empower Your Home",
    },
    {
      id: 4,
      text1: "Bright Today,",
      text2: "Thriving Tomorrow",
    },
    {
      id: 5,
      text1: "Solar Strength,",
      text2: "Sustainable Future",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);
  return (
    <div className="relative w-full bg-black text-white overflow-hidden">
      <div className="mx-auto md:w-6xl">
        <div className="flex items-center justify-start h-40 md:h-96 px-4">
          <span className="w-1 h-20 md:h-32 bg-gray-300 mr-4"></span>
          <div className="flex items-center space-x-2">
            <h1 className="text-4xl md:text-5xl font-bold md:w-[70%]">
              {slides[currentSlide].text1}{" "}
              <span className="text-orange-500">
                {slides[currentSlide].text2}
              </span>
            </h1>
          </div>
        </div>
        <div className="flex justify-center items-center h-12">
          <span className="w-16 h-px bg-gray-400"></span>
        </div>
        <div className="flex justify-center space-x-3 py-4">
          {slides.map((slide, index) => (
            <span
              key={slide.id + "-" + index}
              className={`w-3 h-3 rounded-full ${
                currentSlide === index ? "bg-orange-500" : "bg-gray-400"
              }`}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Banner;
