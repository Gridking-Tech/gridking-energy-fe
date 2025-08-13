import React from "react";
import { CloseIcon } from "@/shared/Icons";
import { useCheckout } from "@/app/context";
import { useRouter } from "next/navigation";
import { IProps } from "@/types";

const RecommendationsModal = ({ isOpen, onClose, energyUsage }: IProps) => {
  if (!isOpen) return null;
  const { addToCheckout } = useCheckout();
  const router = useRouter();

  const handleGetQuote = () => {
    if (
      energyUsage.recommendedProducts &&
      energyUsage.recommendedProducts.length > 0
    ) {
      addToCheckout(energyUsage.recommendedProducts);
    }
    router.push("/checkout");
    onClose();
  };

  if (energyUsage.loading) {
    return (
      <div className="fixed inset-0 bg-[#2C2C2E]/70 flex items-center justify-center z-50">
        <div className="bg-[#2C2C2E]/80 rounded-[24px] w-[90%] max-w-[520px] px-8 py-10 text-white shadow-xl flex flex-col items-center">
          <span className="loader mb-4" />
          <p>Loading recommendations...</p>
        </div>
      </div>
    );
  }

  if (energyUsage.error) {
    return (
      <div className="fixed inset-0 bg-[#2C2C2E]/70 flex items-center justify-center z-50">
        <div className="bg-[#2C2C2E]/80 rounded-[24px] w-[90%] max-w-[520px] px-8 py-10 text-white shadow-xl flex flex-col items-center">
          <p className="text-red-400 mb-4">{energyUsage.error}</p>
          <button onClick={onClose} className="bg-gray-700 px-4 py-2 rounded">
            Close
          </button>
        </div>
      </div>
    );
  }

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
        className="relative bg-[#2C2C2E]/80 rounded-[24px] w-[90%] max-w-[600px] px-8 py-10 text-white shadow-xl max-h-[90vh] overflow-y-auto"
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

        {/* Main grid - 2x2 for mobile, 3x2 for larger screens */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          <div className="rounded border border-gray-500 p-4">
            <p className="text-sm text-gray-400">Total Power Consumption</p>
            <p className="text-lg md:text-xl font-semibold mt-1">
              {energyUsage.totalConsumption}
            </p>
          </div>
          <div className="rounded border border-gray-500 p-4">
            <p className="text-sm text-gray-400">Required Inverter (KVA)</p>
            <p className="text-lg md:text-xl font-semibold mt-1">
              {energyUsage.recommendedInverterRating}
            </p>
          </div>
          <div className="rounded border border-gray-500 p-4">
            <p className="text-sm text-gray-400">System Voltage</p>
            <p className="text-lg md:text-xl font-semibold mt-1">
              {energyUsage.systemVoltage}
            </p>
          </div>
          <div className="rounded border border-gray-500 p-4">
            <p className="text-sm text-gray-400">No. of Batteries</p>
            <p className="text-lg md:text-xl font-semibold mt-1">
              {energyUsage.recommendedBatteryCount}
            </p>
          </div>
          <div className="rounded border border-gray-500 p-4">
            <p className="text-sm text-gray-400">Backup Time</p>
            <p className="text-lg md:text-xl font-semibold mt-1">
              {energyUsage.backupTime}
            </p>
          </div>
        </div>

        {/* Battery Configuration */}
        <div className="mb-6">
          <div className="rounded border border-gray-500 p-4">
            <p className="text-sm text-gray-400">
              Recommended Battery Configuration
            </p>
            <p className="text-lg md:text-xl font-semibold mt-1">
              {energyUsage.recommendedBatteryCapacity}
            </p>
          </div>
        </div>

        {energyUsage.recommendedProducts &&
          energyUsage.recommendedProducts.length > 0 && (
            <div className="mt-8">
              <h4 className="text-lg font-semibold mb-4 text-center">
                Recommended Products
              </h4>
              <div className="flex flex-col gap-4 max-h-48 overflow-y-auto">
                {energyUsage.recommendedProducts.map((product) => (
                  <div
                    key={product.productId}
                    className="flex items-center gap-4 bg-[#232325] rounded p-3"
                  >
                    <img
                      src={
                        product.imageUrl || "/assets/placeholders/products.png"
                      }
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-xs text-gray-400">{product.slug}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        {/* Note about products */}
        {(!energyUsage.recommendedProducts ||
          energyUsage.recommendedProducts.length === 0) && (
          <div className="mt-6 p-4 bg-yellow-900/30 border border-yellow-600/50 rounded">
            <p className="text-sm text-yellow-200">
              <span className="font-medium">Note:</span> No specific inverter
              products were recommended by the system. Please contact our
              support team{" "}
              <a href="mailto:info@gridking.africa"> (info@gridking.africa) </a>{" "}
              for personalized product recommendations based on your
              requirements.
            </p>
          </div>
        )}

        <div className="mt-8 flex justify-center">
          {energyUsage.recommendedProducts &&
          energyUsage.recommendedProducts.length > 0 ? (
            <button
              onClick={handleGetQuote}
              className="bg-[#FF6B00] text-white text-base font-semibold px-6 py-3 rounded-md hover:bg-orange-700 transition cursor-pointer"
            >
              GET QUOTE
            </button>
          ) : (
            <a
              href="mailto:info@gridking.africa?subject=Energy Calculator - Product Recommendation Request&body=Hello, I used your energy calculator and need personalized product recommendations for my energy requirements. Please contact me to discuss suitable inverter options."
              onClick={onClose}
              className="bg-[#FF6B00] text-white text-base font-semibold px-6 py-3 rounded-md hover:bg-orange-700 transition cursor-pointer inline-block text-center no-underline"
            >
              CONTACT SUPPORT
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecommendationsModal;
