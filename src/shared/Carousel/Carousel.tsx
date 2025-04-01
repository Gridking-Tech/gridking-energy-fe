import { imagesArr } from "@/src/constants/constants";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import CarouselControls from "./CarouselController";
import Image from "next/image";
import NavBar from "../NavBar/NavBar";
import PlaceholderCarousel from "../Placeholders/carouselPlaceholder";
import { homePageApi } from "@/src/api";

function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [screenWidth, setScreenWidth] = useState(0);
  const [loading, setLoading] = useState(true);
  const hasImages = imagesArr && imagesArr.length > 0;

  const { data } = homePageApi.useGetHomePageResource() as {
    data: unknown;
    isLoading: boolean;
    error: unknown;
  };

  console.log("data", data);

  const { data: carouselData } = homePageApi.useGetcarousel() as {
    data: unknown;
    isLoading: boolean;
    error: unknown;
  };

  console.log("carouselData", carouselData);

  useEffect(() => {
    setScreenWidth(window.innerWidth);
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (hasImages) {
      setLoading(false);
    }
  }, [hasImages]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (hasImages) {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % imagesArr.length);
      }
    }, 25000);
    return () => clearInterval(interval);
  }, [hasImages]);

  const handlePrev = () => {
    if (hasImages) {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? imagesArr.length - 1 : prevIndex - 1
      );
    }
  };

  const handleNext = () => {
    if (hasImages) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % imagesArr.length);
    }
  };

  return (
    <div className="relative w-full h-[60%] overflow-hidden flex flex-col md:h-[100%]">
      {!hasImages || loading ? (
        <PlaceholderCarousel />
      ) : (
        <>
          <div className="relative w-full h-full">
            <AnimatePresence mode="wait">
              {imagesArr.map((src, index) => {
                const isCurrent = index === currentIndex;
                const isPrevious =
                  index ===
                  (currentIndex === 0
                    ? imagesArr.length - 1
                    : currentIndex - 1);

                return isCurrent || isPrevious ? (
                  <motion.div
                    key={src}
                    initial={{ x: isCurrent ? "100%" : 0 }}
                    animate={{ x: isCurrent ? 0 : "-100%" }}
                    exit={{ x: "-100%" }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="absolute w-full z-10 h-full overflow-hidden"
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src={src}
                        alt={`Image ${index}`}
                        priority={true}
                        layout="fill"
                        objectFit="cover"
                        className="absolute min-w-full min-h-full"
                        onLoad={() => setLoading(false)}
                      />
                    </div>
                    <div className="absolute w-full h-full bg-black/10"></div>{" "}
                  </motion.div>
                ) : null;
              })}
            </AnimatePresence>
          </div>
          <CarouselControls
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
            images={imagesArr}
          />
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full z-20"
          >
            &#8592;
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full z-20"
          >
            &#8594;
          </button>
          <motion.div className="">
            <NavBar />
          </motion.div>
        </>
      )}
    </div>
  );
}

export default Carousel;
