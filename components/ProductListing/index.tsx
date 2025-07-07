"use client";
import React from "react";
import Link from "next/link";
import ProductCard from "@/shared/ProductCard";
import { productsApi } from "@/api";
import ImagePlaceholder from "@/shared/Placeholders/ImagePlaceholder";

type CategoryWithProducts = {
  products: any[];
  [key: string]: any;
};

const ProductLists = ({ category }: { category: string }) => {
  const categoryId = category;
  const {
    data: products,
    isLoading,
    error,
  } = productsApi.useGetCategoryById(categoryId) as {
    data: CategoryWithProducts;
    isLoading: boolean;
    error: any;
  };

  const [visibleCount, setVisibleCount] = React.useState(5);
  const handleLoadMore = () => setVisibleCount((prev) => prev + 5);

  const productList: any[] = Array.isArray((products as any)?.data?.products)
    ? (products as any).data.products
    : [];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          <ImagePlaceholder count={3} width={400} height={300} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-2 md:px-40">
      <div className="max-w-7xl mx-auto">
        <nav className="text-sm text-gray-600 mb-6 px-2 md:px-0">
          <Link href="/categories" className="hover:text-orange-500">
            Home
          </Link>{" "}
          /{" "}
          <span className="text-gray-900 font-medium capitalize">
            {categoryId}
          </span>
        </nav>
        <div className="px-0 md:px-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
          {productList.slice(0, visibleCount).map((i: any, idx: number) => (
            <ProductCard
              name={i.name}
              productId={i?._id?.toString()}
              rating={i.rating}
              reviewCount={i.reviews}
              imageUrl={
                i.primaryImage?.url ||
                (typeof i.image === "string" ? i.image : i.image?.src)
              }
              isNew={i.isNew}
              slug={i.slug || i.name}
              key={idx}
            />
          ))}
        </div>
        {productList.length > visibleCount && (
          <div className="flex justify-center mt-8">
            <button
              onClick={handleLoadMore}
              className="px-6 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 font-semibold"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductLists;
