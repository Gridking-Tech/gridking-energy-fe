import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import ImagePlaceholder from "./Placeholders/ImagePlaceholder";
import { homePageApi } from "../api";
import { IProduct } from ".././types";

const ProductShowcase = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const [imageIndex, setImageIndex] = useState(0);
  const routes = useRouter();

  const { data, isLoading, error } = homePageApi.useGetHomePageResource() as {
    data: { hotSell: Record<string, IProduct[]> };
    isLoading: boolean;
    error: any;
  };

  function getLastWord(sentence: string) {
    const words = sentence.trim().split(/\s+/);
    return words[words.length - 1];
  }

  const hotSellData = data?.hotSell;

  useEffect(() => {
    if (hotSellData && Object.keys(hotSellData).length > 0) {
      const firstCategory = Object.keys(hotSellData)[0];
      setSelectedCategory(firstCategory);
      setSelectedProduct(hotSellData[firstCategory][0]);
    }
  }, [hotSellData]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (selectedProduct?.primaryImage?.url) {
        setImageIndex((prev) => (prev + 1) % 1);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [selectedProduct]);

  const handleTabClick = (category: string) => {
    setSelectedCategory(category);
    setSelectedProduct(hotSellData[category][0]);
    setImageIndex(0);
  };

  return (
    <div className="w-full flex flex-col md:mb-32 mb-10 z-30 relative items-center justify-center h-[70%] md:h-[80%] p-6">
      <div className="text-black font-black text-3xl md:text-5xl text-center mb-10">
        HOT SELL
      </div>
      <div className="flex flex-nowrap   justify-start md:space-x-6 space-x-10 mb-6 border-b pb-3">
        {hotSellData &&
          Object.keys(hotSellData).map((category) => {
            const name = getLastWord(category);
            return (
              <div
                className="flex items-center  relative flex-col text-2xl"
                key={category}
              >
                <button
                  className={`px-8 md:px-16 py-2 font-bold flex items-center gap-2 outline-0 border-0 cursor-pointer ${
                    selectedCategory === category
                      ? "text-orange-500 border-b2 border-orange-500"
                      : "text-gray-700 border-b-transparent"
                  }`}
                  onClick={() => handleTabClick(category)}
                >
                  <div className="flex items-center text-[1rem] md:text-[1.4rem]  gap-2">
                    <div>{category}</div>
                  </div>
                </button>
                <a
                  href={`collections/${name}/${category}`}
                  title="Learn More"
                  className="text-blue-500  mt-2 underline-none text-lg"
                >
                  Learn More
                </a>
              </div>
            );
          })}
      </div>
      <div className="relative w-full md:w-[82%] h-[550px] md:h-[950px] flex justify-between items-center rounded-[2rem] bg-gray-50 backdrop-blur-md overflow-hidden opacity-90">
        <div
          className="relative w-1/2 h-full flex justify-center items-center"
          onClick={() => routes.push(`/products/${selectedProduct?.name}`)}
        >
          {isLoading ? (
            <ImagePlaceholder />
          ) : (
            <div
              className="absolute w-[60%] h-[80%] md:h-[50%] flex flex-nowrap transition-transform duration-700 ease-in-out z-10 items-center justify-center"
              style={{ transform: `translateX(-${imageIndex * 100}%)` }}
            >
              {selectedProduct?.primaryImage?.url && (
                <motion.div
                  initial={{ x: "100%" }}
                  animate={{ x: `0` }}
                  transition={{ duration: 0.7 }}
                  className="w-full text-black flex-shrink-0 cursor-pointer pointer-events-auto flex justify-center items-center"
                >
                  <img
                    src={selectedProduct.primaryImage.url}
                    alt={`${selectedProduct?.name}`}
                    className="object-contain md:w-[600px]  w-[700px]  rounded-[1rem]  h-[260px] md:h-[400px]"
                    style={{
                      objectFit: "cover",
                    }}
                  />
                </motion.div>
              )}
            </div>
          )}
        </div>
        <div className="xl:w-1/2 w-[80%] p-6 text-center">
          <h2 className="text-xl md:text-3xl font-bold mb-4 text-black">
            {selectedProduct?.name ||
              "Powering the Future with Solar & Storage Tech ⚡️☀️"}
          </h2>
          <p className="text-1xl md:text-xl text-black p-6 italic">
            Making clean energy a no-brainer — for your squad, your fam, and
            your everyday grind.
            <br />
            Let&apos;s glow up green 🌱✨
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductShowcase;
