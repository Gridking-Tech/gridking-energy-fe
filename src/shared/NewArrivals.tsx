"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
// import Image from "next/image";
import { products } from "@/src/constants/constants";

function NewArrivals() {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [visibleProducts, setVisibleProducts] = useState([products[0]]);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % products.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isPaused]);

  useEffect(() => {
    const updateVisibleProducts = () => {
      const nextProducts = [
        products[index],
        ...(window.innerWidth >= 768
          ? [products[(index + 1) % products.length]]
          : []),
      ];
      setVisibleProducts(nextProducts);
    };

    updateVisibleProducts();
    window.addEventListener("resize", updateVisibleProducts);

    return () => window.removeEventListener("resize", updateVisibleProducts);
  }, [index]);

  const handleChange = (direction: any) => {
    setIsPaused(true);
    setTimeout(() => {
      setIndex((prev) =>
        direction === "prev"
          ? (prev - 1 + products.length) % products.length
          : (prev + 1) % products.length
      );
      setIsPaused(false);
    }, 3000);
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-white overflow-hidden relative">
      <div className="w-[80%] flex flex-col md:flex-row justify-between items-center">
        <div className="w-full md:w-[40%] h-auto md:h-[450px] flex flex-col items-center md:items-start text-center md:text-left space-y-4">
          <h2 className="text-black text-4xl font-extrabold">NEW ARRIVAL</h2>
          <div className="h-[4rem] md:h-[10rem] w-[3px]  bg-orange-500"></div>
          <p className="text-black text-lg font-medium">
            GridKing focuses on the "PV+Energy Storage" industry chain,
            specializing in LiFePO4 batteries, solar inverters, MPPT
            controllers, and solar panels.
          </p>

          <div className="flex space-x-4">
            <button
              onClick={() => handleChange("prev")}
              className="bg-gray-800 text-white p-3 rounded-full hover:bg-gray-700 transition"
            >
              &#8593;
            </button>
            <button
              onClick={() => handleChange("next")}
              className="bg-gray-800 text-white p-3 rounded-full hover:bg-gray-700 transition"
            >
              &#8595;
            </button>
          </div>
        </div>
        <div className="relative w-full md:w-[45%] h-[160px] md:h-[400px] mt-5 xl:mt-0 flex items-center overflow-hidden">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={index}
              initial={{ y: "55%", opacity: 1 }}
              animate={{ y: "0%", opacity: 1 }}
              exit={{ y: "-55%", opacity: 1 }}
              transition={{ duration: 0.6, type: "spring", stiffness: 50 }}
              className="absolute w-full flex flex-col items-center space-y-5"
            >
              {visibleProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between bg-orange-500 h-[160px] md:h-[200px] p-6 rounded-lg w-full shadow-md"
                >
                  <div className="text-white">
                    <h3 className="text-2xl font-bold">{product.name}</h3>
                    <p className="text-md">{product.desc}</p>
                  </div>
                  {/* <Image
                    src={''}
                    alt={product.name}
                    width={100}
                    height={100}
                  /> */}
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default NewArrivals;
