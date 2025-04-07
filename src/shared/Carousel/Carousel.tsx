import { AnimatePresence, motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import CarouselControls from "./CarouselController";
import Image from "next/image";
import NavBar from "../NavBar/NavBar";
import PlaceholderCarousel from "../Placeholders/carouselPlaceholder";
import { homePageApi } from "@/src/api";

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageUrl, setImageUrl] = useState<string>("");

  const { data: carouselData, isLoading } = homePageApi.useGetcarousel() as {
    data: { _id: string }[];
    isLoading: boolean;
    error: unknown;
  };

  const hasImages = carouselData && carouselData.length > 0;
  const currentId = carouselData?.[currentIndex]?._id;

  console.log("Current ID:", currentId);

  useEffect(() => {
    const fetchImageUrl = async () => {
      if (!currentId) return;
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_APP_BASE_URL}/api/image/Carousel/${currentId}`);
        const data = await res.json();
        if (data?.[0]?.url) {
          setImageUrl(data[0].url);
        } else {
          console.warn("No image URL returned for carousel ID:", currentId);
        }
      } catch (error) {
        console.error("Error fetching carousel image:", error);
      }
    };

    fetchImageUrl();
  }, [currentId]);


  useEffect(() => {
    if (hasImages) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselData.length);
      }, 4500);
      return () => clearInterval(interval);
    }
  }, [hasImages, carouselData]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? carouselData.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselData.length);
  };

  return (
    <div className="relative w-full h-[90%] overflow-hidden flex flex-col md:h-[100%]">
      {!hasImages || !imageUrl || isLoading ? (
        <PlaceholderCarousel />
      ) : (
        <>
          <div className="relative w-full h-[100%] overflow-hidden flex flex-col md:h-[90%]">
            <AnimatePresence>
              <motion.div
                key={currentIndex}
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -50, opacity: 0 }}
                transition={{ duration: 1 }}
                className="absolute w-full h-full"
              >
                <div className="relative w-full h-full">
                  <Image
                    src={imageUrl}
                    alt={`Image ${currentIndex}`}
                    priority={true}
                    fill
                    objectFit="cover"
                    className="absolute min-w-full min-h-full"
                  />
                  <div className="absolute inset-0 bg-black/40 z-10" />
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="z-50">
              <CarouselControls
                currentIndex={currentIndex}
                setCurrentIndex={setCurrentIndex}
                images={carouselData}
              />
            </div>
          </div>

          {/* Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 transform cursor-pointer -translate-y-1/2 bg-white w-[3rem] h-[3rem] text-black font-black text-xl shadow p-2 rounded-full z-20"
          >
            &#8592;
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 transform cursor-pointer -translate-y-1/2 bg-white w-[3rem] h-[3rem] text-black font-black text-xl shadow p-2 rounded-full z-20"
          >
            &#8594;
          </button>

          <motion.div initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
            <NavBar />
          </motion.div>
        </>
      )}
    </div>
  );
}
