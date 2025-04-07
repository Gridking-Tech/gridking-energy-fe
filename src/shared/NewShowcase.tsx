"use client"; 

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { newsItems } from "@/src/constants/constants";
import galleryApi from "../api/gallery-api";

interface Product {
  name?: string;
  id?: number;
  image?: string[];
  date?: string;
}

const NewsShowcase = () => {
  const [activeNews, setActiveNews] = useState<Product>(newsItems[0]);
  const [loadingImages, setLoadingImages] = useState<{ [key: string]: boolean }>({});

  const hasImages = activeNews?.image && activeNews?.image?.length > 0;

  const {
    data: productsData,
    isLoading,
    error,
  } = galleryApi.useGetImages() as {
    data: { products: Product[] };
    isLoading: boolean;
    error: any;
  };

  console.log("products Gallwery", productsData);

  useEffect(() => {
    if (hasImages) {
      setLoadingImages({});
    }
  }, [hasImages]);

  const handleNewsClick = (item: Product) => {
    setActiveNews(item);
    setLoadingImages({}); // Reset the loading state when a new image is clicked
  };

  const handleImageLoad = (id: string) => {
    setLoadingImages((prev) => ({ ...prev, [id]: false })); // Mark the image as loaded
  };

  return (
    <div className="w-full flex flex-col text-black items-center bg-gray-100 p-6">
      <h2 className="md:text-5xl text-3xl font-bold my-20">PRODUCT GALLERY</h2>

      <div className="flex flex-col md:flex-row items-center w-[90%] mx-auto gap-6">
        <div className="relative w-full md:w-[65%] h-[250px] md:h-[450px] bg-white shadow-lg rounded-lg overflow-hidden">
          {hasImages && !loadingImages[activeNews.id || ""] ? (
            <Image
              src={activeNews?.image?.[0] || ""}
              alt={`News - ${activeNews.id}`}
              width={800}
              height={450}
              className="object-cover w-full h-full"
              onLoad={() => handleImageLoad(activeNews.id?.toString() || "")}
            />
          ) : null}
        </div>

        <div className="flex md:flex-col w-full md:w-[35%] gap-4 items-center">
          {newsItems.map((item) => (
            <div
              key={item.id}
              className={`w-[80%] md:w-[85%] h-[100px] md:h-[130px] cursor-pointer rounded-lg overflow-hidden shadow-md border ${
                activeNews.id === item.id
                  ? "border-orange-500"
                  : "border-transparent"
              }`}
              onClick={() => handleNewsClick(item)}
            >
              {loadingImages[item.id?.toString() || ""] ? (
                // The placeholder is not shown at all anymore, only if the image is loading
                <div className="w-full h-full bg-gray-200" />
              ) : (
                <Image
                  src={item.image?.[0] || ""}
                  alt={`Thumbnail - ${item.id}`}
                  width={150}
                  height={100}
                  className="object-cover w-full h-full"
                  onLoad={() => handleImageLoad(item.id?.toString() || "")}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsShowcase;
