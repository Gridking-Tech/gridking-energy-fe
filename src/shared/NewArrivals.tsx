"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { productsApi } from "../api";
import { useRouter } from "next/navigation";
import { INewArrival } from "../types";

function NewArrivals() {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [visibleProducts, setVisibleProducts] = useState<INewArrival[]>([]);
  const [uniqueProducts, setUniqueProducts] = useState<INewArrival[]>([]);
  const routes = useRouter();
  const { data: productsData } = productsApi.useGetProducts() as {
    data: { products: INewArrival[] };
    isLoading: boolean;
    error: any;
  };
  
  useEffect(() => {
    if (!productsData?.products) return;

    const seenCategories = new Set();
    const unique: INewArrival[] = [];

    for (const product of productsData.products) {
      const categoryId = product?.category?._id;
      if (categoryId && !seenCategories.has(categoryId)) {
        seenCategories.add(categoryId);
        unique.push(product);
      }
    }
    setUniqueProducts(unique);
  }, [productsData]);

  useEffect(() => {
    if (isPaused || uniqueProducts.length === 0) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % uniqueProducts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isPaused, uniqueProducts]);

  useEffect(() => {
    const updateVisibleProducts = () => {
      const nextProducts = [
        uniqueProducts[index],
        ...(window.innerWidth >= 768
          ? [uniqueProducts[(index + 1) % uniqueProducts.length]]
          : []),
      ];
      setVisibleProducts(nextProducts.filter(Boolean));
    };

    updateVisibleProducts();
    window.addEventListener("resize", updateVisibleProducts);
    return () => window.removeEventListener("resize", updateVisibleProducts);
  }, [index, uniqueProducts]);

  return (
    <div className="w-full md:h-[90%] xl:h-screen flex items-center justify-center bg-white overflow-hidden relative">
      <div className="w-[80%] flex flex-col md:flex-row justify-between items-center">
        <div className="w-full md:w-[40%] h-auto md:h-[450px] flex flex-col items-center md:items-start text-center md:text-left space-y-4">
          <h2 className="text-black text-4xl font-extrabold">NEW ARRIVAL</h2>
          <div className="h-[4rem] md:h-[10rem] w-[3px] bg-orange-500"></div>
          <p className="text-black text-lg font-medium">
            GridKing focuses on the "PV+Energy Storage" industry chain,
            specializing in LiFePO4 batteries, solar inverters, MPPT
            controllers, and solar panels.
          </p>
        </div>

        <div className="relative w-full md:w-[45%] h-[160px] md:h-[600px] mt-5 xl:mt-0 flex items-center overflow-hidden">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={index}
              initial={{ y: "50%", opacity: 1 }}
              animate={{ y: "0%", opacity: 1 }}
              exit={{ y: "-50%", opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="absolute w-full flex flex-col items-center space-y-5"
            >
              {visibleProducts.map((product) => {
                const primaryImage =
                  (Array.isArray(product.images)
                    ? product.images.find((img) => img.primary)
                    : null) ||
                  (Array.isArray(product.images) ? product.images[0] : null);
                return (
                  <div
                    key={product._id}
                    onClick={() => routes.push(`/products/${product.name}`)}
                    className="flex items-center flex-row-reverse gap-3 mb-20 justify-between bg-orange-500 h-[160px] md:h-[200px] cursor-pointer p-6 rounded-lg w-full shadow-md"
                  >
                    <div className="text-white  w-[45%]">
                      <h3 className="text-xl  font-bold line-clamp-2">
                        {product.name}
                      </h3>
                      <p className="text-md line-clamp-1">
                        {product.category?.name}
                      </p>
                    </div>
                    {primaryImage && (
                      <Image
                        src={primaryImage.url}
                        alt={product._id}
                        width={200}
                        height={300}
                        className="rounded abnsolute -top-6 left-3 object-cover"
                      />
                    )}
                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default NewArrivals;
