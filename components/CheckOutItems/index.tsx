"use client";

import { useCheckout } from "@/app/context";
import { CloseIcon } from "@/shared/Icons";
import { Product } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaWindowMinimize, FaWindowMaximize } from "react-icons/fa";

const CheckoutItems: React.FC = () => {
  const { checkoutProducts, updateQuantity, removeFromCheckout } =
    useCheckout();
  const [open, setOpen] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const router = useRouter();
  const [selectedProduct, setSelectedProduct] = useState<Product[]>([]);

  useEffect(() => {
    setSelectedProduct(checkoutProducts);
  }, [checkoutProducts]);

  if (!open || checkoutProducts.length === 0) return null;

  const handleProceed = () => {
    router.push("/checkout");
    console.log("Proceeding to checkout with:", checkoutProducts);
  };

  const toggleMinimize = () => {
    setIsMinimized((prev) => !prev);
  };

  return (
    <div className="fixed bottom-4 right-4 w-76 bg-white shadow-2xl rounded z-50 drop-shadow-2xl">
      <div className="bg-orange-500 text-white p-4 rounded flex justify-between items-center relative">
        <h2 className="text-base font-bold">Checkout Items {`(${checkoutProducts?.length})`}</h2>
        <button
          className="absolute right-4 top-5 text-white text-xl hover:text-gray-200 cursor-pointer"
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
                  {item.imageUrl && (
                    <div className="p-2">
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        width={40}
                        height={40}
                        className="object-contain"
                      />
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
