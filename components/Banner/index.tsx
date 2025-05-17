import React, { useState, useEffect } from "react";

const Banner = () => {
  const slides = [
    {
      id: 1,
      text1: "New",
      text2: "Arrivals",
      dotColor: "bg-pink-500",
    },
    {
      id: 2,
      text1: "Power Your Future",
      text2: "with Clean Energy",
      dotColor: "bg-orange-500",
    },
    {
      id: 2,
      text1: "Built on Trust,",
      text2: "Powered by Innovation",
      dotColor: "bg-orange-500",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="relative w-full bg-black text-white overflow-hidden">
      <div className="flex items-center justify-start h-24 px-4">
        <span className="w-1 h-12 bg-gray-300 mr-4"></span>
        <div className="flex items-center space-x-2">
          <h1 className="text-3xl font-bold">
            {slides[currentSlide].text1}{" "}
            <span className="text-orange-500">{slides[currentSlide].text2}</span>
          </h1>
          <span
            className={`w-2 h-2 rounded-full ${slides[currentSlide].dotColor} ml-2`}
          ></span>
        </div>
      </div>
      <div className="flex justify-center items-center h-8">
        <span className="w-12 h-px bg-gray-400"></span>
      </div>
      <div className="flex justify-center space-x-2 py-2">
        {slides.map((slide, index) => (
          <span
            key={slide.id}
            className={`w-2 h-2 rounded-full ${
              currentSlide === index ? slide.dotColor : "bg-gray-400"
            }`}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Banner;