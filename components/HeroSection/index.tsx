"use client";
import { homePageApi } from "../../api";
import React, { useState, useEffect } from "react";
import SubHero from "../SubHero";
import DesktopHeader from "@/shared/Header";
import { useTheme } from "@/app/context/ThemeContext";
import Link from "next/link";

export default function HeroSection({
  handleScrollToElement,
}: {
  handleScrollToElement: () => void;
}) {
  const { theme, toggleTheme } = useTheme();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageUrl, setImageUrl] = useState<string>("");
  console.log("imageUrl", imageUrl);

  const { data: carouselData, isLoading } = homePageApi.useGetcarousel() as {
    data: { _id: string }[];
    isLoading: boolean;
    error: unknown;
  };

  const hasImages = carouselData && carouselData.length > 0;
  const currentId = carouselData?.[currentIndex]?._id;

  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const texts = ["Clean Energy", "GridKing", "Smart Solutions"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchImageUrl = async () => {
      if (!currentId) return;
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_APP_BASE_URL}/api/image/Carousel/${currentId}`
        );
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

  // const handlePrev = () => {
  //   setCurrentIndex((prevIndex) =>
  //     prevIndex === 0 ? carouselData.length - 1 : prevIndex - 1
  //   );
  // };

  // const handleNext = () => {
  //   setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselData.length);
  // };

  return (
    <div className="relative h-full">
      <div
        style={{
          backgroundImage: `${
            theme === "light"
              ? `url(/assets/placeholders/hero-Bg.png)`
              : `url(/assets/placeholders/hero-bg-dark.png)`
          }`,
        }}
        className="bg-contain bg-top bg-no-repeat flex flex-col justify-between  h-full "
      >
        <DesktopHeader />

        <div className="w-5/6 m-auto flex flex-col lg:flex-row  flex-1 mt-14">
          <div className="w-full lg:w-3/5 flex flex-col justify-center h-max ">
            <div className=" border-l-4 pl-4">
              <h1 className="text-6xl font-bold text-gray-800 leading-tight dark:text-white">
                Power Your Future
              </h1>
              <h1 className="text-6xl font-bold leading-tight mt-2 dark:text-white">
                with{" "}
                <span className="text-[#F47A2B]">
                  {texts[currentTextIndex]}
                </span>
              </h1>
            </div>
            <p className="mt-6 text-gray-600 dark:text-white text-default w-full lg:w-4/5">
              Take control of your energy future with high-performance inverters
              built for today's needs and tomorrow's possibilities.
            </p>
            
              <button
                onClick={handleScrollToElement}
                className="mt-6 px-2 py-3 bg-[#F47A2B] text-white text-1xl rounded-lg w-35 hover:bg-[#e66c23] transition duration-300 hover:cursor-pointer"
              >
                GET STARTED
              </button>
           
          </div>
        </div>
        <div className="w-full bg-[#E7E7E7]  flex justify-center relative h-52 dark:bg-[#1E1E1E]">
          <div className="absolute w-5/6 -top-[80%]">
            <SubHero />
          </div>
        </div>
      </div>
    </div>
  );
}
