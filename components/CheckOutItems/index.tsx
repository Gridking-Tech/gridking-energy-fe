"use client";

import { useCheckout } from "@/app/context";
import { CloseIcon } from "@/shared/Icons";
import ImagePlaceholder from "@/shared/Placeholders/ImagePlaceholder";
import { Product } from "@/types";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FaWindowMinimize, FaWindowMaximize } from "react-icons/fa";

const CheckoutItems: React.FC = () => {
  const { checkoutProducts, isLoading, updateQuantity, removeFromCheckout } =
    useCheckout();
  const [isMinimized, setIsMinimized] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Don't render on checkout/pricing page or while loading or if no products
  if (pathname === "/checkout" || isLoading || checkoutProducts.length === 0)
    return null;

  const handleProceed = () => {
    // Save checkout products to localStorage
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "checkout_products",
        JSON.stringify(checkoutProducts)
      );
    }
    router.push("/checkout");
    console.log("Proceeding to checkout with:", checkoutProducts);
  };

  const toggleMinimize = () => {
    setIsMinimized((prev) => !prev);
  };

  // Calculate total items
  const totalItems = checkoutProducts.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <div className="fixed bottom-4 right-4 w-76 bg-white shadow-2xl rounded z-50 drop-shadow-2xl">
      <div className="bg-orange-500 text-white p-4 rounded flex justify-between items-center relative">
        <h2 className="text-base font-bold">
          Checkout Items {`(${checkoutProducts?.length})`}
        </h2>
        <button
          className="text-white text-xl hover:text-gray-200 cursor-pointer"
          onClick={toggleMinimize}
          aria-label={isMinimized ? "Maximize" : "Minimize"}
        >
          {isMinimized ? (
            <FaWindowMaximize size={14} />
          ) : (
            <FaWindowMinimize size={14} />
          )}
        </button>
      </div>

      {!isMinimized && (
        <>
          <div className="p-4 max-h-64 overflow-y-auto ">
            {checkoutProducts?.map((item) => (
              <div
                key={item.productId}
                className="flex items-center border relative rounded-md justify-between mb-4 pb-2 shadow-sm"
              >
                <div className="flex items-center justify-center space-y-3 gap-3 w-full">
                  {item.imageUrl ? (
                    <div className="p-2">
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        width={40}
                        height={40}
                        className="object-contain"
                        placeholder="empty"
                        onError={(e) => {
                          // @ts-ignore
                          e.target.onerror = null;
                          // @ts-ignore
                          e.target.src = "";
                        }}
                        loading="lazy"
                      />
                    </div>
                  ) : (
                    <div
                      className="p-2 flex items-center justify-center"
                      style={{ width: 40, height: 40 }}
                    >
                      <ImagePlaceholder width={40} height={40} />
                    </div>
                  )}
                  <div className="w-full">
                    <p className="text-xs font-medium py-1">{item.name}</p>
                    <div className="flex items-center mt-2  mr-4 float-right">
                      <button
                        onClick={() =>
                          updateQuantity(item.productId, item.quantity - 1)
                        }
                        className="bg-gray-200 text-gray-600 px-2  h-6 rounded-l cursor-pointer"
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span className="bg-gray-100 px-3 h-6 text-sm text-gray-600">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.productId, item.quantity + 1)
                        }
                        className="bg-orange-500 text-white px-2 h-6 rounded-r cursor-pointer"
                        disabled={item.quantity >= 50}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-2 -right-2 rounded-full  h-6 w-6 flex justify-center drop-shadow-xl items-center border shadow-sm">
                  <button
                    onClick={() => removeFromCheckout(item.productId)}
                    className="text-red-500 text-xs hover:text-red-700 cursor-pointer"
                  >
                    <CloseIcon />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Total Items */}
          <div className="px-4 pb-2 flex justify-between items-center text-sm font-semibold">
            <span>Total Items:</span>
            <span>{totalItems}</span>
          </div>

          <div className="p-4 border-t">
            <button
              className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 cursor-pointer"
              onClick={handleProceed}
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CheckoutItems;
