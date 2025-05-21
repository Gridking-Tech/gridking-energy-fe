"use client";

import Image from "next/image";
import { useState } from "react";

interface ProductImageGalleryProps {
  images: string[];
  alt?: string;
}

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({
  images,
  alt = "product image",
}) => {
  const [activeImage, setActiveImage] = useState(0);
  if (images?.length < 3) {
    return (
      <div className="text-red-500">Please provide at least 3 images.</div>
    );
  }

  return (
    <div className="flex gap-2 w-full ">
      <div className="grid grid-row-3 flex-col gap-4 justify-start">
        {images.map((image: string, index: number) => (
          <div
            key={index}
            className={`relative w-32 h-32 bg-white dark:bg-inherit rounded cursor-pointer transition-all ${
              activeImage === index
                ? "border-2 border-orange-500"
                : "border-2 border-gray-100"
            }`}
            onClick={() => setActiveImage(index)}
          >
            <Image
              fill
              src={image}
              sizes="100px"
              objectPosition="bottom"
              className="object-contain"
              alt={`${alt} - thumbnail ${index + 1}`}
            />
          </div>
        ))}
      </div>

      <div className="relative w-full flex justify-center items-center  dark:bg-inherit rounded-lg">
        <Image
          width={400}
          height={500}
          objectPosition="bottom"
          src={images[activeImage]}
          className="object-contain bg-[#f4f4f4] h-104 "
          priority={activeImage === 0}
          alt={`${alt} - view ${activeImage + 1}`}
        />
      </div>
    </div>
  );
};

export default ProductImageGallery;
