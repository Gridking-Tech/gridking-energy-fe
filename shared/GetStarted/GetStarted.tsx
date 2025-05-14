import React, { useState, useEffect } from "react";
import Image from "next/image";
import GridKingInverters from "../../public/assets/placeholders/SP Series Inverter 80A 55V-450V 1.png";
import SolarPanel from "../../public/assets/placeholders/Solar Panel 1 2.png";
import Battery from "../../public/assets/placeholders/Gel Battery 12V 100Ah 1.png";

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
    <div className="w-full min-h-screen bg-white flex justify-center items-center relative">
      <div className="w-4/5 flex flex-col lg:flex-row items-center">
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
          <div className="flex flex-col lg:flex-row mt-40 gap-6">
            <div className="border border-gray-200 rounded flex items-center bg-white shadow-sm h-68 w-68">
              <div className="w-2/4 p-2">
                <p className="text-sm font-bold text-gray-800">
                  Next-Gen Solar Technology
                </p>
                <p className="mt-6 text-xs text-gray-600">
                  Designed with the latest innovations for reliable, smarter
                  energy solutions.
                </p>
              </div>
              <div className="w-34 h-54 relative ml-4">
                <Image
                  src={SolarPanel} 
                  alt="Solar Panel"
                  priority={true}
                  layout="fill"
                  objectFit="contain"
                  className="rounded"
                />
              </div>
            </div>
            <div className="border border-gray-200 rounded p-6 flex flex-col items-center bg-gray-800 shadow-sm relative h-68">
              <div className="absolute top-0 right-0 bg-[#F47A2B] text-white text-xs font-bold px-2 py-1 rounded-bl-lg rounded-tr-lg">
                NEW
              </div>
              <div className="text-center">
                <h1 className="text-3xl font-bold text-white">25%</h1>
                <p className="text-l text-white">Longer Battery Life</p>
              </div>
              <div className="w-44 h-54 relative mt-4">
                <Image
                  src={Battery}
                  alt="Battery"
                  priority={true}
                  layout="fill"
                  objectFit="contain"
                  className="rounded"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-1/2 min-h-[32rem] mt-6 lg:mt-0 relative">
          <div className="w-full h-full min-h-[32rem] relative">
            <Image
              src={GridKingInverters} 
              alt="Inverters"
              priority={true}
              layout="fill"
              objectFit="contain"
              className="rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
