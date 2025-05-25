import React from "react";
import { CloseIcon } from "@/shared/Icons";
import { useCheckout } from "@/app/context";
import { useRouter } from "next/navigation";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  energyUsage: {
    totalConsumption: string;
    recommendedInverterRating: string;
    recommendedBatteryCapacity: string;
    recommendedBatteryCount: string;
  };
}
interface Product {
  productId: string;
  name: string;
  slug: string;
  imageUrl?: string;
  quantity: number;
}

const RecommendationsModal = ({ isOpen, onClose, energyUsage }: IProps) => {
  if (!isOpen) return null;
  const { addToCheckout } = useCheckout();
  const router = useRouter()

  const handleGetQuote = () => {
    const selectedProducts: Omit<Product, "quantity">[] = [
      {
        productId: "123",
        name: "Product 1",
        slug: "product-1",
        imageUrl: "/assets/placeholders/products.png",
      },
      {
        productId: "456",
        name: "Product 2",
        slug: "product-2",
        imageUrl: "/assets/placeholders/products.png",
      },
    ];
    addToCheckout(selectedProducts);

    router.push('/checkout')

    onClose();
  };
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-[#2C2C2E]/70 flex items-center justify-center z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundImage: `url(/assets/placeholders/recommend.png)`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "bottom",
        }}
        className="relative bg-[#2C2C2E]/80 rounded-[24px] w-[90%] max-w-[520px] px-8 py-10 text-white shadow-xl"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-300 hover:text-white transition cursor-pointer"
          aria-label="Close modal"
        >
          <CloseIcon />
        </button>
        <h3 className="text-2xl font-bold text-center mb-3">
          Your Energy Usage
        </h3>
        <p className="text-base text-center text-gray-300 mb-8">
          Based on the number of appliance(s) selected, here are our
          recommendations for optimal energy use
        </p>
        <hr className="border-t border-white/30 mb-8" />
        <div className="grid grid-cols-2 gap-5">
          <div className="rounded border border-gray-500 p-4">
            <p className="text-sm text-gray-400">Total Power Consumption</p>
            <p className="text-xl font-semibold mt-1">
              {energyUsage.totalConsumption}
            </p>
          </div>
          <div className="rounded border border-gray-500 p-4">
            <p className="text-sm text-gray-400">Recommended Inverter Rating</p>
            <p className="text-xl font-semibold mt-1">
              {energyUsage.recommendedInverterRating}
            </p>
          </div>
          <div className="rounded border border-gray-500 p-4">
            <p className="text-sm text-gray-400">
              Recommended Battery Capacity
            </p>
            <p className="text-xl font-semibold mt-1">
              {energyUsage.recommendedBatteryCapacity}
            </p>
          </div>
          <div className="rounded border border-gray-500 p-4">
            <p className="text-sm text-gray-400">Recommended No. of Battery</p>
            <p className="text-xl font-semibold mt-1">
              {energyUsage.recommendedBatteryCount}
            </p>
          </div>
        </div>
        <div className="mt-8 flex justify-center">
          <button
            onClick={handleGetQuote}
            className="bg-[#FF6B00] text-white text-base font-semibold px-6 py-3 rounded-md hover:bg-orange-700 transition cursor-pointer"
          >
            GET QUOTE
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecommendationsModal;
