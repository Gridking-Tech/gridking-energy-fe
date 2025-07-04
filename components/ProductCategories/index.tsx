"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { productsApi } from "@/api";
import { IProduct } from "@/types";
import defaultImg from "@/public/assets/placeholders/products.png";
import ImagePlaceholder from "@/shared/Placeholders/ImagePlaceholder";

const ProductCategories = () => {
  const { data, isLoading } = productsApi.useGetCategory() as {
    data: { data: IProduct[] };
    isLoading: boolean;
    error: any;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full justify-items-center items-center">
          <ImagePlaceholder count={3} width={400} height={200} />
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 px-4 bg-gray-100">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl mb-12 text-gray-800 border-l-4 border-gray-300 pl-4">
          Powering Homes and Businesses with Excellence
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:-grid-cols-2 lg:grid-cols-3 gap-6 min-h-[300px]">
          {data?.data?.map((category: IProduct, index: number) => (
            <Link href={`/categories/${category._id}`} key={index}>
              <div className="bg-black text-white rounded-lg overflow-hidden shadow-md">
                <div className="p-6">
                  <span className="text-4xl font-bold text-orange-500">
                    0{index + 1}
                  </span>
                  <h3 className="text-xl font-semibold mt-2 mb-4">
                    {category.name}
                  </h3>
                  <div className="relative w-full h-70 mb-4">
                    <Image
                      fill
                      className="rounded"
                      alt={category.slug}
                      style={{ objectFit: "cover" }}
                      src={category.primaryImage?.url || defaultImg}
                    />
                  </div>
                  <p className="text-sm">{category.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCategories;
