import { AnimatePresence, motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import CarouselControls from "./CarouselController";
import Image from "next/image";
import NavBar from "../NavBar/NavBar";
import PlaceholderCarousel from "../Placeholders/carouselPlaceholder";
import { homePageApi } from "../../api";
import GetStarted from "../GetStarted/GetStarted";

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
    <div className="relative w-full h-[80%] overflow-hidden flex flex-col xl:h-[100%]">
        <>
          <div className="relative w-full h-[100%] overflow-hidden flex flex-col md:h-[98%]">
            <GetStarted />
          </div>

          <motion.div initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
            <NavBar />
          </motion.div>
        </>
    </div>
  );
}
