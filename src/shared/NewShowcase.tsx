"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import ImagePlaceholder from "./Placeholders/ImagePlaceholder";
import galleryApi from "../api/gallery-api";

interface GalleryImage {
  _id: string;
  url: string;
  primary: boolean;
}

interface GalleryItem {
  _id: string;
  name: string;
  description: string;
  images: GalleryImage[];
}

const NewsShowcase = () => {
  const [activeImage, setActiveImage] = useState<GalleryImage | null | any>(null);
  const [activeGallery, setActiveGallery] = useState<GalleryItem | null>(null);
  const [loading, setLoading] = useState(true);

  const {
    data: productsData,
    isLoading,
    error,
  } = galleryApi.useGetImages() as {
    data: { data: GalleryItem[] };
    isLoading: boolean;
    error: any;
  };

  useEffect(() => {
    if (productsData?.data?.length > 0) {
      const defaultGallery = productsData.data[0];
      const defaultImage =
        defaultGallery.images.find((img) => img.primary) ||
        defaultGallery.images[0];

      setActiveImage(defaultImage);
      setActiveGallery(defaultGallery);
      setLoading(true);
    }
  }, [productsData]);



  const handleImageClick = (img: GalleryImage, gallery: GalleryItem) => {
    setActiveImage(img);
    setActiveGallery(gallery);
    setLoading(true);
  };

  return (
    <div className="w-full flex flex-col text-black mb-20 items-center  p-6">
      <h2 className="md:text-5xl text-3xl font-bold my-20">PRODUCT GALLERY</h2>

      <div className="flex flex-col justify-center md:flex-row items-center w-[90%] mx-auto gap-6">
        <div className="relative w-full md:w-[65%] h-[250px] md:h-[650px] bg-white shadow-lg rounded-lg overflow-hidden">
          {!activeImage?.url && loading ? (
            <ImagePlaceholder width="100%" height="100%" />
          ) : (
            <div className="">
              <Image
                src={activeImage?.url}
                alt="Main Product"
                width={800}
                height={450}
                className={`object-cover w-full h-full transition-opacity duration-300 ${loading ? 'opacity-0' : 'opacity-100'}`}
                onLoad={() => setLoading(false)}
                onLoadingComplete={() => setLoading(false)}
                // unoptimized
              />

              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4">
                {activeGallery && (
                  <p className="text-white text-lg font-semibold">
                    {activeGallery.name}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>


        <div className="flex md:flex-col  w-full md:w-[35%]  items-center">
          {productsData?.data?.slice(1, 3).map((gallery) => (
            <div key={gallery._id} className="w-full flex gap-5 xl:flex-col flex-row">
              {gallery.images.map((img) => (
                <div
                  key={img._id}
                  className={`w-[80%] md:w-[95%]  h-[100px] md:h-[200px] cursor-pointer rounded-lg overflow-hidden shadow-md border ${activeImage?._id === img._id
                    ? "border-orange-500"
                    : "border-transparent"
                    }`}
                  onClick={() => handleImageClick(img, gallery)}
                >
                  <Image
                    src={img.url}
                    alt={`Thumbnail ${img._id}`}
                    width={150}
                    height={100}
                    className="object-cover w-full h-full"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsShowcase;
