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

  return (
    <div className="mx auto min-h-screen bg-gray-100 py-8 px-40">
      <div className="max-w-7xl mx-auto">
        <nav className="text-sm text-gray-600 mb-6">
          <Link href="/categories" className="hover:text-orange-500">
            Home
          </Link>{" "}
          /{" "}
          <span className="text-gray-900 font-medium capitalize">{title}</span>
        </nav>
        <div className="px-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((i, idx) => (
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
      </div>
    </div>
  );
};

export default ProductLists;
