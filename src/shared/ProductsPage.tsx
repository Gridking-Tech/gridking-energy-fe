"use client";
import NavBar from "@/src/shared/NavBar/NavBar";
import { useRouter } from "next/navigation";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { ProductsLinks } from "@/src/constants/constants";
import { motion, AnimatePresence } from "framer-motion";
import ImagePlaceholder from "@/src/shared/Placeholders/ImagePlaceholder";
import { homePageApi } from "../api";
import Footer from "./Footer";


interface ProductsPageProps {
  name: string;
  subname?: string;
}

const ProductsPage: React.FC<ProductsPageProps> = ({ name, subname }) => {
  const router = useRouter();
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [selectedImages, setSelectedImages] = useState<{ image: string; name: string }[]>([]);

  const { data: productsData, isLoading, error } = homePageApi.useGetCarouselById("67ec910d2d2e858db2b1ca2a") as {
    data: any;
    isLoading: boolean;
    error: any;
  }

  console.log("ProductsPage data:", productsData);

  useEffect(() => {
    let foundImages: { image: string; name: string }[] = [];

    const category = ProductsLinks.find(
      (cat) => cat.name.toLowerCase() === name?.toLowerCase()
    );

    if (category) {
      if (subname) {
        const sub = category.subcategories?.find(
          (sub) => sub.name.toLowerCase() === subname?.toLowerCase()
        );
        if (sub) {
          foundImages = sub.images?.map((img) => ({ image: img, name: sub.name })) ?? [];
        }
      } else {
        foundImages = category.subcategories?.flatMap((sub) =>
          sub.images?.map((img) => ({ image: img, name: sub.name }))
        ) ?? [];
      }


      setExpandedCategory(category.name);
    }

    setSelectedImages(foundImages);
  }, [name, subname]);

  const handleNavigation = (path: string) => {
    router.replace(path);
  };

  return (
    <div className="w-full">
      <NavBar />
      <div className="w-full">
        {
          productsData?.length > 0 ? (

            <div className="relative w-full h-[30rem]">
              <Image
                src={productsData?.[0]?.url}
                alt="eds"
                style={{ objectFit: "cover" }}
                fill
                className="absolute w-full h-full"
              />
            </div>
          ) : (
            <ImagePlaceholder />
          )
        }



        <div className="text-gray-700 flex items-center px-10 w-full bg-gray-300/40 h-[3rem]">
          {`Home > ${decodeURIComponent(name)}`}
          {typeof subname !== "undefined" && subname !== "" && subname !== "undefined"
            ? ` > ${decodeURIComponent(subname)}`
            : ""}

        </div>
      </div>

      <div className="flex flex-col md:flex-row px-4 md:px-10 py-8">
        {/* Sidebar */}
        <div className="w-full md:w-1/4 pr-6 border-r md:block">
          <h3 className="font-bold text-xl text-black mb-4">CATEGORIES</h3>
          <ul>
            {ProductsLinks.map((category) => (
              <li key={category.name} className="mb-3">
                <div className="flex justify-between items-center">
                  <button
                    onClick={() =>
                      handleNavigation(`/collections/${category.name}`)
                    }
                    className={`block font-semibold ${category.disabled ? "pointer-not-allowed text-gray-500" : "cursor-pointer"} ${category.name === name  ? "text-orange-500" : "text-gray-700"
                      }`}
                  >
                    {category.name}
                  </button>
                  {category.subcategories && (
                    <button
                      className="text-gray-500 text-[0.9rem] cursor-pointer focus:outline-none"
                      onClick={() =>
                        setExpandedCategory(
                          expandedCategory === category.name ? null : category.name
                        )
                      }
                    >
                      {expandedCategory === category.name ? "-" : "+"}
                    </button>
                  )}
                </div>
                <AnimatePresence>
                  {category.subcategories && expandedCategory === category.name && (
                    <motion.ul
                      className="ml-4 mt-2 overflow-hidden"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      {category.subcategories.map((sub) => (
                        <li key={sub.name} className="mb-2">
                          <button
                            onClick={() =>
                              handleNavigation(
                                `/collections/${category.name}/${sub.name}`
                              )
                            }
                            className={`text-sm ${subname === sub.name
                              ? "text-orange-500 font-semibold"
                              : "text-gray-600"
                              }`}
                          >
                            {sub.name}
                          </button>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </li>
            ))}
          </ul>
        </div>

        <div className="w-full md:w-3/4 px-10">
          <h2 className="text-2xl font-bold text-black mb-6">
            {subname && subname !== "undefined" ? decodeURIComponent(subname) : decodeURIComponent(name)}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {selectedImages.length > 0 ? (
              selectedImages.map((imageData, index) => (
                <div key={index} className="text-center cursor-pointer" onClick={() => router.push(`/products/${imageData.name}`)}>
                  <Image
                    src={imageData.image}
                    alt={imageData.name}
                    width={500}
                    height={300}
                    className="rounded-lg w-full  h-[20rem]"
                  />
                  <div className="text-xl font-bold text-gray-700 mt-2">{imageData.name}</div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No images available.</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductsPage;
