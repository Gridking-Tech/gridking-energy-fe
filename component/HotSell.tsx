import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { productTabs } from '@/constant/constants';

const ProductShowcase = () => {
  const [selectedProduct, setSelectedProduct] = useState(productTabs[0]);
  const [imageIndex, setImageIndex] = useState(0);

  const handleTabClick = (product:any) => {
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
    <div className="w-full flex flex-col items-center bg-gray-100 h-auto md:h-[68%] p-6">

      <div className="flex flex-wrap justify-center md:space-x-6 mb-6 border-b pb-3">
        {productTabs.map((product) => (
          <button
            key={product.name}
            className={`px-8 md:px-16 py-2 font-bold ${
              selectedProduct.name === product.name
                ? 'text-orange-500 border-b-2 border-orange-500'
                : 'text-gray-700'
            }`}
            onClick={() => handleTabClick(product)}
          >
            {product.name}
          </button>
        ))}
      </div>

      <div className="relative w-full md:w-[90%] h-[250px] md:h-[450px] flex justify-center items-center bg-transparent rounded-lg overflow-hidden">
        <div
          className="absolute w-full h-full flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${imageIndex * 100}%)` }}
        >
          {selectedProduct.images.map((image, i) => (
            <div key={i} className="w-full text-black flex-shrink-0">
              <Image
                src={image}
                alt={`${selectedProduct.name} - Image ${i + 1}`}
                width={600}
                height={350}
                className="object-cover w-full h-full"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductShowcase;
