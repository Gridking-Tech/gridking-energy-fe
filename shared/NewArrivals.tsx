import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import React from "react";
import { IProduct } from "@/types";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ProductCard from "@/shared/ProductCard";

const ProductSection = ({ newArrivals }: { newArrivals: IProduct[] }) => {
  const router = useRouter();

  const handleCardClick = (title_id: string) => {
    router.push(`/products/${title_id?.replace(/\s+/g, "-")}`);
  };

  return (
    <section className="py-8 px-4 bg-[#E7E7E7] dark:bg-[#393939]">
      <div className="md:max-w-6xl mx-auto py-12">
        <h2 className="text-3xl md:text-4xl mb-8 border-l-4 border-gray-300 pl-4">
          Powering Homes and Businesses with Excellence
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newArrivals?.map((p: IProduct, index: number) => (
            <ProductCard
              key={index}
              name={p.name}
              rating={4.5}
              reviewCount={99}
              imageUrl={p.primaryImage.url}
              isNew={p.status === "NEW_ARRIVAL"}
            />
            // <Card
            //   key={index}
            //   className="cursor-pointer  duration-300 relative p-2 bg-none"
            //   onClick={() => handleCardClick(product.name + " " + product._id)}
            // >
            //     {product.status === "NEW_ARRIVAL" && (
            //       <span className="absolute top-1 left-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded">
            //         NEW
            //       </span>
            //     )}
            //   <CardHeader className="relative border h-[70%] hover:shadow-lg transition-shadow bg-white">
            //     <Image
            //     alt={product.slug}
            //     fill
            //       src={product.primaryImage.url}
            //       className="w-full h-38 object-cover rounded-t-xl"
            //     />
            //   </CardHeader>
            //   <CardContent>
            //     <CardTitle className="text-sm mb-2">{product.name}</CardTitle>
            //   </CardContent>
            //   <CardFooter className="justify-center">
            //     <button className="w-full bg-gray-100 text-gray-800 py-2 rounded hover:bg-orange-500 hover:text-white transition-colors">
            //       View Details
            //     </button>
            //   </CardFooter>
            // </Card>
          ))}
        </div>
        <div className="text-left mt-6">
          <button className="bg-orange-500 text-white px-6 py-2 rounded hover:bg-orange-600 transition-colors cursor-pointer hover:shadow-lg">
            Explore Our Products
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
