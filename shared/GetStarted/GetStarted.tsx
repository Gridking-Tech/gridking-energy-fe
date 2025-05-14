import React, { useState, useEffect } from "react";
import Image from "next/image";
// import GridKingInverters from "../../public/assets/placeholders/SP Series Inverter 80A 55V-450V 1.png";
// import SolarPanel from "../../public/assets/placeholders/Solar Panel 1 2.png";
import Battery from "../../public/assets/placeholders/Gel Battery 12V 100Ah 1.png";
import HeroBg from "../../public/assets/placeholders/hero-Bg.png";

const GetStarted = () => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const texts = ["Clean Energy", "GridKing", "Smart Solutions"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
    style={{
      backgroundImage: `url(/assets/placeholders/hero-Bg.png)`, // Use HeroBg.src for Next.js Image
    }}
    className="bg-contain bg-top bg-no-repeat w-full h-full bg-white flex justify-center items-center relative border-red-800 ">
      <div
      className="w-4/5 flex flex-col lg:flex-row items-center">
        <div className="w-full lg:w-1/2 p-4 lg:p-6 flex flex-col justify-center">
          <h1 className="text-5xl font-bold text-gray-800 leading-tight">
            Power Your Future
          </h1>
          <h1 className="text-5xl font-bold leading-tight mt-2">
            with{" "}
            <span className="text-[#F47A2B]">{texts[currentTextIndex]}</span>
          </h1>
          <p className="mt-6 text-gray-600 text-xs w-full lg:w-4/5">
            Take control of your energy future with high-performance inverters
            built for today's needs and tomorrow's possibilities.
          </p>
          <button className="mt-6 px-2 py-3 bg-[#F47A2B] text-white text-1xl rounded-lg w-35 hover:bg-[#e66c23] transition duration-300 hover:cursor-pointer">
            GET STARTED
          </button>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
