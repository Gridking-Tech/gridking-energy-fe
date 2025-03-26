"use client"; // Ensure this is at the top if in a client component

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { productTabs } from '@/constant/constants';
import { motion } from 'framer-motion';
import { RxDoubleArrowRight } from "react-icons/rx";
import { useRouter } from 'next/navigation'; 

const ProductShowcase = () => {
  const [selectedProduct, setSelectedProduct] = useState(productTabs[0]);
  const [imageIndex, setImageIndex] = useState(0);
  const router = useRouter(); // Renamed from `routes` to `router`

  const handleTabClick = (product: any) => {
    console.log("Tab Clicked:", product.name);
    setSelectedProduct(product);
    setImageIndex(0);
    
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((prev) => (prev + 1) % selectedProduct.images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [selectedProduct]);

  return (
    <div className="w-full flex flex-col mb-20 z-[100] items-center justify-center h-[70%] md:h-[88%] p-6">
      <div className="text-black font-black text-3xl md:text-5xl text-center mb-16">
        HOT SELL
      </div>
      <div className="flex xl:flex-nowrap flex-wrap justify-center md:space-x-6 mb-6 border-b pb-3">
        {productTabs.map((product) => (
         <div className='flex items-center relative flex-col '>
           <button
            key={product.name}
            className={`px-8 md:px-16 py-2 font-bold flex items-center gap-2 cursor-pointer ${
              selectedProduct.name === product.name
                ? 'text-orange-500 border-b2 border-orange-500'
                : 'text-gray-700 border-b-transparent'
            }`}
            onClick={() => handleTabClick(product)}
          >
            <div>{product.name}</div>
            <div><RxDoubleArrowRight size={20} /></div>
           
          </button>
           <div onClick={() => router.push(`/collections/${product.name}`)} className='text-[0.78rem] absolute  px-2 rounded-[3px] py-[0.6px] bg-black text-white right-2 cursor-pointer '> More</div>
         </div>
        ))}
      </div>
      <div className="relative w-full md:w-[90%] h-[250px] md:h-[450px] flex justify-center items-center bg-transparent rounded-lg overflow-hidden">
        <div
          className="absolute min-w-full h-full flex flex-nowrap transition-transform duration-700 ease-in-out z-10"
          style={{ transform: `translateX(-${imageIndex * 100}%)` }}
        >
          {selectedProduct.images.map((image, i) => (
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="w-full text-black flex-shrink-0 pointer-events-auto"
              key={i}
            >
              <Image
                src={image}
                alt={`${selectedProduct.name} - Image ${i + 1}`}
                width={400}
                height={450}
                className="object-cover w-full h-full"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductShowcase;
