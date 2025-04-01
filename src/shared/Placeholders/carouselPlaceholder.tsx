import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GridBanner1 from "../../../public/assets/placeholders//GD001.svg";
import GridBanner2 from "../../../public/assets/placeholders/GD002.svg";
import GridBanner3 from "../../../public/assets/placeholders/GD003.svg";
import Image from "next/image";
import NavBar from "../NavBar/NavBar";

const PlaceholderCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const placeholders = [GridBanner1, GridBanner2, GridBanner3];
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % placeholders.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [placeholders.length]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? placeholders.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % placeholders.length);
  };

  return (
    <div className="relative w-full h-[60%] overflow-hidden flex flex-col md:h-[100%]">
      <AnimatePresence mode="wait">
        {placeholders.map((placeholder, index) => {
          const isCurrent = index === currentIndex;
          const isPrevious =
            index ===
            (currentIndex === 0 ? placeholders.length - 1 : currentIndex - 1);

          return isCurrent || isPrevious ? (
            <motion.div
              key={index}
              initial={{ x: isCurrent ? "100%" : 0 }}
              animate={{ x: isCurrent ? 0 : "-100%" }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.1, ease: "linear" }} // Linear slide animation
              className="absolute w-full z-10 h-full overflow-hidden pointer-events-none"
            >
              <div className="relative w-full h-full">
                <Image
                  src={placeholder}
                  alt={`Image ${index}`}
                  priority={true}
                  layout="fill"
                  objectFit="cover"
                  className="absolute min-w-full min-h-full"
                />
              </div>
              <div className="absolute w-full h-full bg-black/10"></div>{" "}
              {/* Reduced overlay opacity */}
            </motion.div>
          ) : null;
        })}
      </AnimatePresence>
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
      >
        &#8592;
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
      >
        &#8594;
      </button>
      <motion.div className="">
        <NavBar />
      </motion.div>
    </div>
  );
};

export default PlaceholderCarousel;
