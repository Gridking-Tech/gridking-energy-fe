import React from "react";
import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/shared/ProductCard";
import { productsApi } from "@/api";
import { IProduct } from "@/types";
import { retrieveIdFromTitle, retrieveTitle } from "@/lib/utils";

const ProductLists = ({ category }: { category: string }) => {
  const inverters = [
    {
      id: 1,
      name: "SP Series Inverter 1kVA 55V-450V",
      rating: 5,
      reviews: 99,
      image: "https://via.placeholder.com/300x300?text=Inverter+1kVA",
      isNew: true,
    },
    {
      id: 2,
      name: "SP Series Inverter 2kVA 55V-450V",
      rating: 4.5,
      reviews: 25,
      image: "https://via.placeholder.com/300x300?text=Inverter+2kVA",
      isNew: false,
    },
    {
      id: 3,
      name: "SP Series Inverter 3kVA 55V-450V",
      rating: 4.7,
      reviews: 45,
      image: "https://via.placeholder.com/300x300?text=Inverter+3kVA",
      isNew: false,
    },
    {
      id: 4,
      name: "SP Series Inverter 4kVA 55V-450V",
      rating: 4.8,
      reviews: 78,
      image: "https://via.placeholder.com/300x300?text=Inverter+4kVA",
      isNew: false,
    },
    {
      id: 5,
      name: "SP Series Inverter 5kVA 55V-450V",
      rating: 4.6,
      reviews: 34,
      image: "https://via.placeholder.com/300x300?text=Inverter+5kVA",
      isNew: false,
    },
    {
      id: 6,
      name: "SP Series Inverter 6kVA 55V-450V",
      rating: 4.9,
      reviews: 56,
      image: "https://via.placeholder.com/300x300?text=Inverter+6kVA",
      isNew: false,
    },
  ];
  const categoryId = retrieveIdFromTitle(category as string);
  const title = retrieveTitle(category as string);
  const { data, isLoading } = productsApi.useGetCategoryById(
    categoryId as string
  );
  // as {
  //   data: { newArrivals: Record<string, IProduct[]> };
  //   isLoading: boolean;
  //   error: any;
  // };

  console.log(data, "data");

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <nav className="text-sm text-gray-600 mb-6">
          <Link href="/categories" className="hover:text-orange-500">
            Home
          </Link>{" "}
          /{" "}
          <span className="text-gray-900 font-medium capitalize">{title}</span>
        </nav>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {inverters.map((i, idx) => (
            <ProductCard
              name={i.name}
              productId={i?.id?.toString()}
              rating={i.rating}
              reviewCount={i.reviews}
              imageUrl={i.image}
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
