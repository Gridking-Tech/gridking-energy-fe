"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { homePageApi } from "@/api";
import { IProduct } from "@/types";

const ProductCategories = () => {
  const { data, isLoading } = homePageApi.useGetHomePageResource() as {
    data: { categories: IProduct[] };
    isLoading: boolean;
    error: any;
  };
  console.log(data, "data");

  return (
    <div className="py-16 px-4 bg-gray-100">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-gray-800">
          Powering Homes and Businesses with Excellence
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {data?.categories?.map((category, index) => (
            <Link
              href={`categories/${category.slug}-${category._id}`}
              key={index}
            >
              <div className="bg-black text-white rounded-lg overflow-hidden shadow-md">
                <div className="p-6">
                  <span className="text-4xl font-bold text-orange-500">
                    0{index + 1}
                  </span>
                  <h3 className="text-xl font-semibold mt-2 mb-4">
                    {category.name}
                  </h3>
                  <div className="relative w-full h-40 mb-4">
                    <Image
                      fill
                      className="rounded"
                      alt={category.slug}
                      style={{ objectFit: "cover" }}
                      src={category.primaryImage?.url}
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
