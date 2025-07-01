import React from "react";
import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/shared/ProductCard";
import { productsApi } from "@/api";
import { IProduct } from "@/types";
import { retrieveIdFromTitle, retrieveTitle } from "@/lib/utils";
import defaultImg from "@/public/assets/placeholders/products.png";
 

const ProductLists = ({ category }: { category: string }) => {
  const products = [
    {
      id: 1,
      name: "2kVA Inverter 55V-450V:Sample Product",
      rating: 4.8,
      reviews: 9,
      image: defaultImg,
      isNew: true,
    },
    {
      id: 2,
      name: "3kVA Inverter 55V-450V: Sample Product",
      rating: 5,
      reviews: 7,
      image: defaultImg,
      isNew: true,
    },
    {
      id: 3,
      name: "12V Gel Battery: Sample Product",
      rating: 4,
      reviews: 5,
      image: defaultImg,
      isNew: true,
    },
  ];
  const categoryId = retrieveIdFromTitle(category as string);
  const title = retrieveTitle(category as string);
  const { data, isLoading } = productsApi.useGetCategoryById(
    categoryId as string
  );

  console.log(data, "data");

  const [visibleCount, setVisibleCount] = React.useState(5);
  const handleLoadMore = () => setVisibleCount((prev) => prev + 5);

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-2 md:px-40">
      <div className="max-w-7xl mx-auto">
        <nav className="text-sm text-gray-600 mb-6 px-2 md:px-0">
          <Link href="/categories" className="hover:text-orange-500">
            Home
          </Link>{" "}/ {" "}
          <span className="text-gray-900 font-medium capitalize">{title}</span>
        </nav>
        <div className="px-0 md:px-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
          {products.slice(0, visibleCount).map((i, idx) => (
            <ProductCard
              name={i.name}
              productId={i?.id?.toString()}
              rating={i.rating}
              reviewCount={i.reviews}
              imageUrl={typeof i.image === "string" ? i.image : i.image.src}
              isNew={i.isNew}
              slug={i.name}
              key={idx}
            />
          ))}
        </div>
        {products.length > visibleCount && (
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
