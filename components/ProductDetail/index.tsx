import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Link from 'next/link'
import Image from 'next/image'

const ProductDetail: React.FC = () => {
  const product = {
    id: "sp-series-inverter-80a",
    title: "SP Series Inverter 80A 55V-450V",
    rating: "★★★★★ 99 Reviews",
    price: 960.0,
    inStock: true,
    description:
      "Reliable and efficient. This high-capacity SP Series Inverter delivers 80A output with a wide input range of 55V-450V. Ideal for solar and energy systems, it ensures stable, efficient power performance for both residential and commercial use.",
    images: [
      // "https://via.placeholder.com/300x400?text=Main+Image",
      'https://placehold.co/600x400',
      "https://via.placeholder.com/100x100?text=Thumbnail+1",
      "https://via.placeholder.com/100x100?text=Thumbnail+2",
      "https://via.placeholder.com/100x100?text=Thumbnail+3",
    ],
  };

  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(product.images[0]);

  const handleQuantityChange = (change: number) => {
    setQuantity((prev) => Math.max(1, prev + change));
  };

  const handlePassProductToCheckout = (product: any)=> {
    localStorage.setItem('checkout_product', JSON.stringify(product))
  }

  return (
    <section className="py-32 px-4 bg-gray-100 dark:bg-black/50">
      <div className="max-w-5xl mx-auto">
        <Card className="flex flex-col md:flex-row gap-6">
          <div className="flex flex-col gap-4 w-full md:w-1/2">
            <div className='h-96 w-full relative'>
               <Image
                  fill
                  priority
                  objectFit='cover'
                  src={selectedImage}
                  alt={product.title}
                  objectPosition='center'
                  className="w-full h-96 object-cover rounded-xl"
            />
            </div>
            <div className="flex gap-2">
              {product.images.slice(1).map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 ${
                    selectedImage === image
                      ? "border-orange-500"
                      : "border-transparent"
                  }`}
                  onClick={() => setSelectedImage(image)}
                />
              ))}
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <CardHeader>
              <CardTitle className="text-2xl">{product.title}</CardTitle>
              <CardDescription className="flex items-center gap-2 text-sm">
                <span className="text-yellow-500">{product.rating}</span>
                <span className="text-green-600">
                  {product.inStock ? "In Stock" : "Out of Stock"}
                </span>
              </CardDescription>
            </CardHeader>

            <CardContent className="mt-4">
              <p className="text-3xl font-bold mb-4">
                ${product.price.toFixed(2)}
              </p>
              <p className="text-gray-600 mb-6">{product.description}</p>
              <div className="flex items-center gap-2 mb-6">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300"
                >
                  -
                </button>
                <span className="text-lg">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300"
                >
                  +
                </button>
              </div>
              <div className="flex flex-col gap-2 mb-6">
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p className="text-sm">Free Delivery</p>
                </div>
                <p className="text-sm text-gray-600 pl-7">
                  Enter your postal code for Delivery Availability
                </p>
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4h16M4 4l4 4m12-4l-4 4M4 20h16M4 20l4-4m12 4l-4-4"
                    />
                  </svg>
                  <p className="text-sm">Return Delivery</p>
                </div>
                <p className="text-sm text-gray-600 pl-7">
                  Free 30 Days Returns
                </p>
              </div>
            </CardContent>

            <CardFooter>
              <Link onClick={()=>handlePassProductToCheckout(product)} href={'/checkout'} className="p-4 bg-[#F47A2B] text-white py-3 rounded hover:bg-orange-600 transition-colors">
                PROCEED TO CHECKOUT
              </Link>
            </CardFooter>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default ProductDetail;
