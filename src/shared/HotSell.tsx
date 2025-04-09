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
      <div className="flex xl:flex-nowrap flex-wrap justify-start md:space-x-6 space-x-7 mb-6 border-b pb-3">
        {hotSellData &&
          Object.keys(hotSellData).map((category) => (
            <div
              className="flex items-center relative flex-col text-2xl"
              key={category}
            >
              <button
                className={`px-8 md:px-16 py-2 font-bold flex items-center gap-2 cursor-pointer ${
                  selectedCategory === category
                    ? "text-orange-500 border-b2 border-orange-500"
                    : "text-gray-700 border-b-transparent"
                }`}
                onClick={() => handleTabClick(category)}
              >
                <div className="flex items-center gap-2">
                  <div>{category}</div>
                </div>
              </button>
              <a
                href="#"
                title="Learn More"
                className="text-blue-500 mt-2 underline text-lg"
              >
                Learn More
              </a>
            </div>
          ))}
      </div>
      <div className="relative w-full md:w-[90%] h-[450px] md:h-[950px] cursor-pointer shadow-lg border-shadow-2 border border-gray-300 flex justify-between items-center bg-orange-500 overflow-hidden">
        <div
          className="relative w-1/2 h-full flex justify-center items-center"
          onClick={() => routes.push(`/products/${selectedProduct?.name}`)}
        >
          {isLoading ? (
            <ImagePlaceholder width="100%" height="100%" />
          ) : (
            <div
              className="absolute w-[60%] h-[50%] flex flex-nowrap transition-transform duration-700 ease-in-out z-10 items-center justify-center"
              style={{ transform: `translateX(-${imageIndex * 100}%)` }}
            >
              {selectedProduct?.primaryImage?.url && (
                <motion.div
                  initial={{ x: "100%" }}
                  animate={{ x: `0` }}
                  transition={{ duration: 0.7 }}
                  className="w-full text-black flex-shrink-0 pointer-events-auto flex justify-center items-center"
                >
                  <img
                    src={selectedProduct.primaryImage.url}
                    alt={`${selectedProduct?.name}`}
                    className="object-contain max-w-full max-h-full"
                    style={{
                      width: "600px",
                      height: "400px",
                      objectFit: "cover",
                    }}
                  />
                </motion.div>
              )}
            </div>
          )}
        </div>
        <div className="w-1/2 p-6 text-center">
          <h2 className="text-2xl md:text-5xl font-bold mb-4 text-white">
            {selectedProduct?.name ||
              "Powering the Future with Solar & Storage Tech ⚡️☀️"}
          </h2>
          <p className="text-1xl md:text-3xl text-white p-6 italic">
            Making clean energy a no-brainer — for your squad, your fam, and
            your everyday grind.
            <br />
            Let's glow up green 🌱✨
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductShowcase;
