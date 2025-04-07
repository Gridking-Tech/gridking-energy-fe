import React, { useState, useEffect } from "react";
import { productsApi } from "@/src/api/product-api";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

interface Category {
  name: string;
}

interface Product {
  name: string;
  id: string;
  images: { url: string }[];
  category: Category;
}

const ProductShowcase = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [imageIndex, setImageIndex] = useState(0);
  const routes = useRouter();

  const {
    data: productsData,
    isLoading,
    error,
  } = productsApi.useGetProducts() as {
    data: { products: Product[] };
    isLoading: boolean;
    error: any;
  };

  useEffect(() => {
    if (Array.isArray(productsData?.products) && productsData.products.length > 0) {
      setSelectedProduct(productsData.products[0]);
    }
  }, [productsData]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (selectedProduct?.images?.length) {
        setImageIndex(
          (prev) => (prev + 1) % (selectedProduct?.images?.length)
        );
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [selectedProduct]);

  const handleTabClick = (product: Product) => {
    setSelectedProduct(product);
    setImageIndex(0);
  };

  // Log category name of the first product
  useEffect(() => {
    if (!isLoading && productsData?.products.length > 0) {
      // console.log("Category name of the first product:", productsData?.products[0]?.category?.name);
    }
  }, [isLoading, productsData]);

  if (isLoading) {
    // console.log('loading');
  }

  return (
    <div className="w-full flex flex-col md:mb-20 mb-10 z-30 relative items-center justify-center h-[70%] md:h-[80%] p-6">
      <div className="text-black font-black text-3xl md:text-5xl text-center mb-16">
        HOT SELL
      </div>
      <div className="flex xl:flex-nowrap flex-wrap justify-center md:space-x-6 mb-6 border-b pb-3">
        {Array.isArray(productsData?.products) &&
          productsData.products.map((product) => (
            <div
              className="flex items-center relative flex-col "
              key={product.id}
            >
              <button
                className={`px-8 md:px-16 py-2 font-bold flex items-center gap-2 cursor-pointer ${selectedProduct?.name === product.name
                  ? "text-orange-500 border-b2 border-orange-500"
                  : "text-gray-700 border-b-transparent"
                  }`}
                onClick={() => handleTabClick(product)}
              >
                <div>{product.category?.name}</div>
              </button>
              <div
                onClick={() => routes.push(`/collections/${product.category?.name}`)}
                className="text-[0.78rem] absolute px-2 rounded-[3px] py-[0.6px] bg-black text-white right-2 cursor-pointer"
              >
                More
              </div>
            </div>
          ))}
      </div>
      <div className="relative w-full md:w-[90%] h-[250px] md:h-[450px] cursor-pointer flex justify-center items-center bg-transparent rounded-lg overflow-hidden" onClick={() => routes.push(`/products/${selectedProduct?.name}`)}>
        {selectedProduct?.images?.length && isLoading ? (
          <div
            className="absolute w-full h-full bg-center bg-cover"
          >
            <p className="text-center text-white text-lg absolute inset-0 flex items-center justify-center">No images available</p>
          </div>
        ) : (
          <div
            className="absolute min-w-full h-full flex flex-nowrap transition-transform duration-700 ease-in-out z-10"
            style={{ transform: `translateX(-${imageIndex * 100}%)` }}
          >
            {selectedProduct?.images?.map((image, i) => (
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: `0` }}
                transition={{ duration: 0.7 }}
                key={i}
                className="w-full text-black flex-shrink-0 pointer-events-auto"
              >
                <img
                  src={image.url}
                  alt={`${selectedProduct.name} - Image ${i + 1}`}
                  className="object-contain w-full h-full"
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductShowcase;
