"use client";
import NavBar from "@/src/shared/NavBar/NavBar";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ImagePlaceholder from "@/src/shared/Placeholders/ImagePlaceholder";
import { homePageApi, productsApi } from "../api";
import Footer from "./Footer";
import { useRouter } from "next/navigation";
import {FadeLoader} from "react-spinners";
import SkeletonCard from "./util/SkeletonCard";
import { CapitalizeFirstLetter } from "../utils";

interface ProductsPageProps {
  name: string;
  subname?: string;
}


const ProductsPage: React.FC<ProductsPageProps> = ({ name, subname }) => {
  const router = useRouter();
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [selectedImages, setSelectedImages] = useState<
    { image: string; name: string }[]
  >([]);
  const [allCategories, setAllCategories] = useState<any[]>([]);
  const [subcategories, setSubcategories] = useState<any[]>([]);
  const [isLoadingSubcategories, setIsLoadingSubcategories] = useState(false);
  const [subcategoryCache, setSubcategoryCache] = useState<{
    [key: string]: any[];
  }>({});
  const [isLoadingImages, setIsLoadingImages] = useState(true);



  const { data: productsDataId,isLoading } = homePageApi.useGetCarouselById(
    "67ec910d2d2e858db2b1ca2a"
  ) as {
    data: any;
    isLoading: boolean;
    error: any;
  };

  const { data: ProductsContainer } = productsApi.useGetCategory() as {
    data: any;
    isLoading: boolean;
    error: any;
  };


  const handleNavigation = (path: string) => {
    router.replace(path);
  };

  useEffect(() => {
    if (ProductsContainer?.data) {
      const topLevel = ProductsContainer.data.filter(
        (cat: any) => cat.ancestors.length === 0
      );
      setAllCategories(topLevel);
    }
  }, [ProductsContainer]);

  const handleCategoryClick = async (
    categoryId: string,
    categoryName: string
  ) => {
    const isCurrentlyExpanded = expandedCategory === categoryName;
    setExpandedCategory(isCurrentlyExpanded ? null : categoryName);

    if (subcategoryCache[categoryId]) {
      setSubcategories(subcategoryCache[categoryId]);
      return;
    }

    if (!isCurrentlyExpanded) {
      setIsLoadingSubcategories(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_APP_BASE_URL}/api/category/${categoryId}/children`
        );
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
    const fetchData = async () => {
      if (!ProductsContainer?.data) return;

      setIsLoadingImages(true); // 🔥 Start loading

      const matchingCat = ProductsContainer.data.find(
        (cat: any) => cat.name.toLowerCase() === name?.toLowerCase()
      );
      if (!matchingCat) return;

      setExpandedCategory(matchingCat.name);

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_APP_BASE_URL}/api/category/${matchingCat._id}/children`
        );
        const data = await res.json();
        const subList = data?.data || [];
        setSubcategories(subList);
        setSubcategoryCache((prev) => ({
          ...prev,
          [matchingCat._id]: subList,
        }));

        const combinedImages: { image: string; name: string }[] = [];

        if (subname) {
          const matchingSub = subList.find(
            (sub: any) => sub.name.toLowerCase() === subname.toLowerCase()
          );
          if (matchingSub) {
            const res = await fetch(
              `${process.env.NEXT_PUBLIC_APP_BASE_URL}/api/category/${matchingSub._id}`
            );
            const data = await res.json();
            const product = data?.data?.products?.[0];
            if (product?.primaryImage?.url) {
              combinedImages.push({
                image: product.primaryImage.url,
                name: product.name,
              });
            }
          }
        } else {
          await Promise.all(
            subList.map(async (sub: any) => {
              try {
                const res = await fetch(
                  `${process.env.NEXT_PUBLIC_APP_BASE_URL}/api/category/${sub._id}`
                );
                const data = await res.json();
                const product = data?.data?.products?.[0];
                if (product?.primaryImage?.url) {
                  combinedImages.push({
                    image: product.primaryImage.url,
                    name: product.name,
                  });
                }
              } catch (err) {
                console.error("Failed to fetch product for subcategory", sub.name, err);
              }
            })
          );
        }

        setSelectedImages(combinedImages);
      } catch (err) {
        console.error("Failed to fetch subcategories", err);
      } finally {
        setIsLoadingImages(false);
      }
    };

    fetchData();
  }, [name, subname, ProductsContainer]);

  if (isLoading) return <div className="text-center h-screen w-scren flex justify-center items-center  font-black mt-10">
    <FadeLoader height={15} />
  </div>;


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
            <div className="absolute inset-0 bg-black/30"></div>
          </div>
        ) : (
          <ImagePlaceholder/>
        )}
        <div className="text-gray-700 font-black flex items-center px-10 w-full bg-gray-300/40 h-[3rem]">
          {`Home > ${decodeURIComponent(CapitalizeFirstLetter(name))}`}
          {typeof subname !== "undefined" &&
            subname !== "" &&
            subname !== "undefined"
            ? ` > ${decodeURIComponent(subname)}`
            : ""}
        </div>
      </div>

      <div className="flex flex-col md:flex-row px-4 md:px-10 py-8">
        <div className="w-full md:w-1/4 pr-6 border-r md:block">
          <h3 className="font-bold text-xl text-black mb-4">CATEGORIES</h3>
          <ul>
            {allCategories.map((category) => (
              <li key={category.name} className="mb-3">
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => router.push(`/collections/${category.name}`)}
                    className={`block font-semibold 
                      ${category.disabled
                        ? "pointer-not-allowed text-gray-500"
                        : "cursor-pointer"
                      } 
                      ${category.name === name
                        ? "text-orange-500"
                        : "text-gray-700"
                      }`}
                  >
                    {category.name}
                  </button>

                  <button
                    className="text-gray-500 text-[0.9rem] cursor-pointer"
                    onClick={() =>
                      handleCategoryClick(category._id, category.name)
                    }
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
                        <div className="text-sm italic text-gray-500 py-2">
                          Loading...
                        </div>
                      ) : (
                        subcategories.map((sub: any) => (
                          <li key={sub._id} className="mb-2">
                            <button
                              onClick={() =>
                                handleNavigation(
                                  `/collections/${category.name}/${sub.name}`
                                )
                              }
                              className={`text-sm  cursor-pointer hover:text-orange-500 ${subname === sub.name
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

        <div className="w-full md:w-3/4 px-10">
          <h2 className="text-2xl font-bold text-black mb-6">
            {subname && subname !== "undefined"
              ? decodeURIComponent(subname)
              : decodeURIComponent(CapitalizeFirstLetter(name))}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 xl:h-[40rem]">
            {isLoadingImages ? (
              Array.from({ length: 6 }).map((_, index) => <SkeletonCard key={index} />)
            ) : selectedImages.length > 0 ? (
              selectedImages.map((imageData, index) => (
                <div
                  key={index}
                  className="text-center cursor-pointer "
                  onClick={() => router.push(`/products/${imageData.name}`)}
                >
                  <Image
                    src={imageData.image}
                    alt={imageData.name}
                    width={500}
                    height={200}
                    className="rounded-lg w-full h-[16rem] object-cover"
                  />
                  <div className="text-xl font-bold text-gray-700 mt-2">
                    {imageData.name}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No products found.</p>
            )}

          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductsPage;
