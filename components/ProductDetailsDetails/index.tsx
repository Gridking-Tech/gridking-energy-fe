import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useState } from "react";
const ProductDetailsDetails = ({ product }: { product: any }) => {
  const router = useRouter();

  const [quantity, setQuantity] = useState(0);

  const handleQuantityChange = (change: number) => {
    setQuantity((prev) => Math.max(0, prev + change));
  };

  const handlePassProductToCheckout = (product: any) => {
    const order = {
      productName: product.name,
      productId: product._id,
      quantity,
    };
    localStorage.setItem("checkout_product", JSON.stringify(order));
    router.push("/checkout");
  };

  return (
    <div className="w-full md:w-1/2">
      <CardHeader>
        <CardTitle className="text-2xl">{product?.name}</CardTitle>
        <CardDescription className="flex items-center gap-2 text-sm">
          <span className="text-yellow-500">{product?.rating}</span>
          <span
            className={`${
              product?.inStock ? "text-green-600" : "text-red-600"
            }`}
          >
            {product?.inStock ? "In Stock" : "Out of Stock"}
          </span>
        </CardDescription>
      </CardHeader>

      <CardContent className="mt-4">
        <p className="text-sm text-gray-600 mb-6">{product?.description}</p>
        <div className="flex items-center border border-gray-300 rounded-md overflow-hidden w-fit mb-6">
          <button
            disabled={quantity === 0}
            onClick={() => handleQuantityChange(-1)}
            className="px-4 py-2 text-lg bg-gray-50 hover:bg-gray-100 border-r border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-400 hover:bg-gray-300 disabled:bg-gray-300 disabled:cursor-not-allowed cursor-pointer"
          >
            -
          </button>
          <span className="px-4 py-2 text-lg font-medium text-gray-800">
            {quantity}
          </span>
          <button
            onClick={() => handleQuantityChange(1)}
            className="px-4 py-2 text-lg bg-orange-500 text-white hover:bg-orange-600 focus:outline-none focus:ring-1 focus:ring-orange-400 hover:bg-gray-300 cursor-pointer"
          >
            +
          </button>
        </div>
        <div className="flex flex-col gap-2 mb-6 border border-gray-300 p-4">
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
            <p className="text-sm"> Delivery Policy</p>
          </div>
          <p className="text-sm text-gray-600">
            Our team will contact you shortly after your submission with your
            personalized quote and all relevant installation details.{" "}
          </p>
        </div>
      </CardContent>

      <CardFooter>
        <button
          onClick={() => handlePassProductToCheckout(product)}
          className="p-4 bg-[#F47A2B] text-white py-3 rounded cursor-pointer hover:bg-orange-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          disabled={quantity === 0}
        >
          PROCEED TO CHECKOUT
        </button>
      </CardFooter>
    </div>
  );
};

export default ProductDetailsDetails;
