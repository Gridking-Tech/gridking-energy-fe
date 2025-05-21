import React from "react";
import Link from "next/link";
import { IProduct } from "@/types";
import ProductCard from "@/shared/ProductCard";
import ImagePlaceholder from "./Placeholders/ImagePlaceholder";

const ProductSection = ({
  newArrivals,
  loading,

}: {
  newArrivals: IProduct[];
  loading: boolean;
  
}) => {
  return (
    <section
      className="py-8 px-4 bg-[#E7E7E7] dark:bg-[#393939] md:mb-40"
      id="#new-arrivals"
    >
      <div className="md:max-w-6xl mx-auto py-12">
        <h2 className="text-3xl md:text-4xl mb-8 border-l-4 border-gray-300 pl-4">
          Powering Homes and Businesses with Excellence
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[300px]">
          {loading
            ? Array.from({ length: 3 }).map((_, idx) => (
                <div
                  key={idx}
                  className="flex justify-center items-center min-h-[300px]"
                >
                  <ImagePlaceholder width={400} height={300} />
                </div>
              ))
            : newArrivals?.map((p: IProduct, index: number) => (
                <ProductCard
                  key={index}
                  slug={p?.slug}
                  rating={4.5}
                  name={p?.name}
                  reviewCount={7}
                  productId={p?._id}
                  imageUrl={p?.primaryImage.url}
                  isNew={p?.status === "NEW_ARRIVAL"}
                />
              ))}
        </div>
        <div className="text-left mt-6">
          <Link
            href={"/collections"}
            className="bg-[#F57B2C] text-white px-6 py-2 rounded hover:bg-orange-600 transition-colors cursor-pointer hover:shadow-lg"
          >
            Explore Our Products
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
