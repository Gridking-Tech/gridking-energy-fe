import React, { useState, useEffect } from "react";
import Image from "next/image";
import GridBanner1 from "../../../public/assets/placeholders//GD001.png";

const GetStarted = () => {
  const placeholder = GridBanner1;

  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const texts = ["Clean Energy", "GridKing", "Smart Solutions"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 2000); // Change text every second

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-4/5 h-full flex">
        {/* Left Section */}
        <div className="w-1/2 h-full flex flex-col p-4 pt-40">
          <h1 className="text-5xl font-bold leading-[1.1]">
            Power Your Future
          </h1>
          <h1 className="text-5xl font-bold leading-[1.1] mt-2">
            with{" "}
            <span className="text-[#F47A2B]">{texts[currentTextIndex]}</span>
          </h1>
          <p className="mt-6 w-[80%]">
            Take control of your energy future with high-performance inverters
            built for today&apos;s needs and tomorrow&apos;s possibilities.
          </p>
          <button className="text-1xl mt-6 px-4 py-2 bg-[#F47A2B] text-white rounded w-35">
            GET STARTED
          </button>
          <div className="flex flex-row mt-20">
            <div className="border flex w-1/2">
              <div>
                <p>Next-Gen Solar Technology</p>
                <p>
                  Designed with the latest innovations for reliable, smarter
                  energy solutions.
                </p>
              </div>
              <div className="w-24 h-24 relative">
                <Image
                  src={placeholder}
                  alt="Image"
                  priority={true}
                  layout="fill"
                  objectFit="contain"
                  className=""
                />
              </div>
            </div>
            <div className="border">
              <div>New</div>
              <h1>25%</h1>
              <div>Longer Battery Life</div>
              <div className="w-24 h-24 relative">
                <Image
                  src={placeholder}
                  alt="Image"
                  priority={true}
                  layout="fill"
                  objectFit="contain"
                  className=""
                />
              </div>
            </div>
          </div>
        </div>
        {/* Right Section */}
        <div className="w-1/2 h-full relative">
          <Image
            src={placeholder}
            alt="Image"
            priority={true}
            layout="fill"
            objectFit="contain"
            className="absolute"
          />
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
