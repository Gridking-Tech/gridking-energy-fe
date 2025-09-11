import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { IProduct } from "@/types";
import ProductCard from "@/shared/ProductCard";
import ImagePlaceholder from "./Placeholders/ImagePlaceholder";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const ProductSection = ({
  newArrivals,
  loading,
}: {
  newArrivals: IProduct[];
  loading: boolean;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(5);
  const containerRef = useRef<HTMLDivElement>(null);

  // Removed auto-swipe functionality

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 5);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? (newArrivals?.length || 1) - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === (newArrivals?.length || 1) - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div
      className="py-8 px-4 lg:bg-[#E7E7E7] dark:bg-[#393939] md:mb-40"
      id="#new-arrivals"
    >
      <div className="md:max-w-6xl mx-auto py-12">
        <h2 className="text-3xl md:text-4xl mb-8 border-l-4 border-gray-300 pl-4">
          Powering Homes and Businesses with Excellence
        </h2>
        {/* Mobile Carousel */}
        <div className="block md:hidden">
          <div className="relative">
            {/* Arrow Controls */}
            {!loading && newArrivals?.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-all duration-200"
                  aria-label="Previous product"
                >
                  <FaChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-all duration-200"
                  aria-label="Next product"
                >
                  <FaChevronRight className="w-4 h-4" />
                </button>
              </>
            )}
            <div
              ref={containerRef}
              className="overflow-hidden min-h-[300px] w-full"
            >
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{
                  transform: `translateX(-${currentIndex * 100}%)`,
                }}
              >
                {loading
                  ? Array.from({ length: 3 }).map((_, idx) => (
                      <div
                        key={idx}
                        className="flex-shrink-0 w-full flex justify-center items-center min-h-[300px]"
                      >
                        <ImagePlaceholder width={400} height={300} />
                      </div>
                    ))
                  : newArrivals?.map((p: IProduct, index: number) => (
                      <div
                        key={index}
                        className="flex-shrink-0 w-full flex justify-center"
                      >
                        <ProductCard
                          slug={p?.slug}
                          rating={4.9}
                          name={p?.name}
                          reviewCount={12}
                          productId={p?._id}
                          imageUrl={
                            p?.primaryImage?.url
                              ? p?.primaryImage?.url
                              : p?.images?.find((i) => i.primary === true)
                                  ?.url || ""
                          }
                          isNew={p?.status === "NEW_ARRIVAL"}
                        />
                      </div>
                    ))}
              </div>
            </div>
            {!loading && newArrivals?.length > 1 && (
              <div className="flex justify-center mt-4 space-x-2">
                {newArrivals.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleDotClick(index)}
                    className={`w-3 h-3 rounded-full ${
                      currentIndex === index ? "bg-[#F57B2C]" : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
        {/* Desktop Grid with Load More */}
        <div className="hidden md:block">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[300px] mx-4">
            {loading ? (
              <ImagePlaceholder count={3} width={400} height={300} />
            ) : (
              newArrivals
                ?.slice(0, visibleCount)
                .map((p: IProduct, index: number) => (
                  <div key={index} className="w-full flex justify-center">
                    <ProductCard
                      slug={p?.slug}
                      rating={4.9}
                      name={p?.name}
                      reviewCount={12}
                      productId={p?._id}
                      imageUrl={
                        p?.primaryImage?.url
                          ? p?.primaryImage?.url
                          : p?.images?.find((i) => i.primary === true)?.url ||
                            ""
                      }
                      isNew={p?.status === "NEW_ARRIVAL"}
                    />
                  </div>
                ))
            )}
          </div>
          {!loading && newArrivals?.length > visibleCount && (
            <div className="flex justify-center mt-6">
              <button
                onClick={handleLoadMore}
                className="bg-[#F57B2C] text-white px-6 py-2 rounded hover:bg-orange-600 transition-colors cursor-pointer hover:shadow-lg"
              >
                Load More
              </button>
            </div>
          )}
        </div>
        <div className="text-left mt-6">
          <Link
            href={loading ? "#" : "/categories"}
            className={`bg-[#F57B2C] text-white px-6 py-2 rounded transition-colors cursor-pointer hover:shadow-lg ${
              loading
                ? "opacity-50 pointer-events-none cursor-not-allowed"
                : "hover:bg-orange-600"
            }`}
            tabIndex={loading ? -1 : 0}
            aria-disabled={loading}
          >
            Explore Our Products
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductSection;
