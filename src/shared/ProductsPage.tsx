"use client";
import NavBar from "@/src/shared/NavBar/NavBar";
import { useRouter } from "next/navigation";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { ProductsLinks } from "@/src/constants/constants";
import { motion, AnimatePresence } from "framer-motion";
import ImagePlaceholder from "@/src/shared/Placeholders/ImagePlaceholder";
import { homePageApi, productsApi } from "../api";
import Footer from "./Footer";

interface ProductsPageProps {
  name: string;
  subname?: string;
}

const ProductsPage: React.FC<ProductsPageProps> = ({ name, subname }) => {
  const router = useRouter();
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [selectedImages, setSelectedImages] = useState<{ image: string; name: string }[]>([]);
  const [allCategories, setAllCategories] = useState<any[]>([]);
  const [subcategories, setSubcategories] = useState<any[]>([]);
  const [isLoadingSubcategories, setIsLoadingSubcategories] = useState(false);
  const [subcategoryCache, setSubcategoryCache] = useState<{ [key: string]: any[] }>({});

  const { data: productsDataId, isLoading, error } = homePageApi.useGetCarouselById("67ec910d2d2e858db2b1ca2a") as {
    data: any;
    isLoading: boolean;
    error: any;
  };

  const { data: ProductsContainer } = productsApi.useGetCategory() as {
    data: any;
    isLoading: boolean;
    error: any;
  };

  const productIds = ProductsContainer?.data?.map((cat: any) => cat._id);
  console.log("List of IDs:", productIds);

  useEffect(() => {
    if (ProductsContainer?.data) {
      const topLevel = ProductsContainer.data.filter((cat: any) => cat.ancestors.length === 0);
      setAllCategories(topLevel);
    }
  }, [ProductsContainer]);

  const handleCategoryClick = async (categoryId: string, categoryName: string) => {
    const isCurrentlyExpanded = expandedCategory === categoryName;
    setExpandedCategory(isCurrentlyExpanded ? null : categoryName);

    // If already cached, use cache
    if (subcategoryCache[categoryId]) {
      setSubcategories(subcategoryCache[categoryId]);
      return;
    }

    if (!isCurrentlyExpanded) {
      setIsLoadingSubcategories(true);
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_APP_BASE_URL}/api/category/${categoryId}/children`);
        const data = await res.json();
        if (data?.data) {
          setSubcategories(data.data);
          setSubcategoryCache((prev) => ({ ...prev, [categoryId]: data.data }));
        } else {
          setSubcategories([]);
        }
      } catch (err) {
        console.error("Failed to fetch subcategories:", err);
      } finally {
        setIsLoadingSubcategories(false);
      }
    }
  };

  useEffect(() => {
    let foundImages: { image: string; name: string }[] = [];
  
    const category = ProductsLinks.find((cat) => cat.name.toLowerCase() === name?.toLowerCase());
  
    if (category) {
      // Automatically expand the category and fetch subcategories
      setExpandedCategory(category.name);
  
      // Trigger subcategory fetch (same as clicking manually)
      const matchingCat = ProductsContainer?.data?.find(
        (cat: any) => cat.name.toLowerCase() === name?.toLowerCase()
      );
  
      if (matchingCat) {
        handleCategoryClick(matchingCat._id, matchingCat.name);
      }
  
      if (subname) {
        const sub = category.subcategories?.find(
          (sub) => sub.name.toLowerCase() === subname?.toLowerCase()
        );
        if (sub) {
          foundImages = sub.images?.map((img) => ({ image: img, name: sub.name })) ?? [];
        }
      } else {
        foundImages =
          category.subcategories?.flatMap((sub) =>
            sub.images?.map((img) => ({ image: img, name: sub.name }))
          ) ?? [];
      }
    }
  
    setSelectedImages(foundImages);
  }, [name, subname, ProductsContainer]);
  

  const handleNavigation = (path: string) => {
    router.replace(path);
  };

  return (
    <div className="w-full">
      <NavBar />
      <div className="w-full">
        {productsDataId?.[0]?.url.length > 0 ? (
          <div className="relative w-full h-[30rem]">
            <Image
              src={productsDataId?.[0]?.url}
              alt="Banner"
              style={{ objectFit: "cover" }}
              fill
              className="absolute w-full h-full"
            />
          </div>
        ) : (
          <ImagePlaceholder width={"100%"} height={"100%"} />
        )}

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
            {allCategories.map((category) => (
              <li key={category.name} className="mb-3">
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => handleCategoryClick(category._id, category.name)}
                    className={`block font-semibold 
                      ${category.disabled ? "pointer-not-allowed text-gray-500" : "cursor-pointer"} 
                      ${category.name === name ? "text-orange-500" : "text-gray-700"}`}
                  >
                    {category.name}
                  </button>

                  <button
                    className="text-gray-500 text-[0.9rem] cursor-pointer"
                    onClick={() => handleCategoryClick(category._id, category.name)}
                  >
                    {expandedCategory === category.name ? "-" : "+"}
                  </button>
                </div>

                <AnimatePresence>
                  {expandedCategory === category.name && (
                    <motion.ul
                      className="ml-4 mt-2 overflow-hidden"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      {isLoadingSubcategories ? (
                        <div className="text-sm italic text-gray-500 py-2">Loading...</div>
                      ) : (
                        subcategories.map((sub: any) => (
                          <li key={sub._id} className="mb-2">
                            <button
                              onClick={() =>
                                handleNavigation(`/collections/${category.name}/${sub.name}`)
                              }
                              className={`text-sm ${
                                subname === sub.name
                                  ? "text-orange-500 font-semibold"
                                  : "text-gray-600"
                              }`}
                            >
                              {sub.name}
                            </button>
                          </li>
                        ))
                      )}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </li>
            ))}
          </ul>
        </div>

        {/* Product Grid */}
        <div className="w-full md:w-3/4 px-10">
          <h2 className="text-2xl font-bold text-black mb-6">
            {subname && subname !== "undefined"
              ? decodeURIComponent(subname)
              : decodeURIComponent(name)}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {selectedImages.length > 0 ? (
              selectedImages.map((imageData, index) => (
                <div
                  key={index}
                  className="text-center cursor-pointer"
                  onClick={() => router.push(`/products/${imageData.name}`)}
                >
                  <Image
                    src={imageData.image}
                    alt={imageData.name}
                    width={500}
                    height={300}
                    className="rounded-lg w-full h-[20rem]"
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
