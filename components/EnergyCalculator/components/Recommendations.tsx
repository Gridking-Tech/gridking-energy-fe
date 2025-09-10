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
    const products = [];

    if (energyUsage.recommendedInverter) {
      products.push({
        productId: energyUsage.recommendedInverter.productId,
        name: energyUsage.recommendedInverter.productName,
        slug: energyUsage.recommendedInverter.productName
          .toLowerCase()
          .replace(/\s+/g, "-"),
        imageUrl: "/assets/placeholders/products.png",
      });
    }

    if (energyUsage.recommendedBattery) {
      products.push({
        productId: energyUsage.recommendedBattery.productId,
        name: energyUsage.recommendedBattery.productName,
        slug: energyUsage.recommendedBattery.productName
          .toLowerCase()
          .replace(/\s+/g, "-"),
        imageUrl: "/assets/placeholders/products.png",
      });
    }

    if (products.length > 0) {
      addToCheckout(products);
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
        <h3 className="text-3xl font-bold text-center mb-3">
          Energy System Recommendations
        </h3>
        <p className="text-base text-center text-gray-300 mb-8">
          Based on your energy requirements, here are our recommendations for
          optimal system configuration
        </p>
        <hr className="border-t border-white/30 mb-8" />

        {/* System Overview */}
        {/* <div className="mb-8">
          <h4 className="text-2xl font-bold mb-4 text-orange-400">
            System Overview
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="rounded border border-gray-500 p-4">
              <p className="text-sm text-gray-400">Desired Backup Hours</p>
            <p className="text-lg md:text-xl font-semibold mt-1">
                {energyUsage.desiredBackupHours} hours
            </p>
          </div>
          <div className="rounded border border-gray-500 p-4">
              <p className="text-sm text-gray-400">Required KVA</p>
            <p className="text-lg md:text-xl font-semibold mt-1">
                {energyUsage.requiredKVA} KVA
            </p>
          </div>
          <div className="rounded border border-gray-500 p-4">
            <p className="text-sm text-gray-400">System Voltage</p>
            <p className="text-lg md:text-xl font-semibold mt-1">
                {energyUsage.systemVoltage}V
            </p>
            </div>
          </div>
        </div> */}

        {/* Recommended Inverter */}
        {energyUsage.recommendedInverter && (
          <div className="mb-8">
            <h4 className="text-2xl font-bold mb-4 text-orange-400">
              Recommended Inverter
            </h4>
            <div className="bg-[#232325] rounded-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-400">Product Name</p>
                  <p className="text-lg font-semibold mt-1">
                    {energyUsage.recommendedInverter.productName}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Required KVA</p>
                  <p className="text-lg font-semibold mt-1">
                    {energyUsage.recommendedInverter.kva} KVA
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Recommended Batteries */}
        {energyUsage.recommendedBattery && (
          <div className="mb-8">
            <h4 className="text-2xl font-bold mb-4 text-orange-400">
              Recommended Batteries
            </h4>
            <div className="bg-[#232325] rounded-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-400">Product Name</p>
                  <p className="text-lg font-semibold mt-1">
                    {energyUsage.recommendedBattery.productName}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Total Batteries</p>
                  <p className="text-lg font-semibold mt-1">
                    {energyUsage.recommendedBattery.totalBatteries}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Voltage</p>
                  <p className="text-lg font-semibold mt-1">
                    {energyUsage.recommendedBattery.voltage}V
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Capacity (Ah)</p>
                  <p className="text-lg font-semibold mt-1">
                    {energyUsage.recommendedBattery.capacityAh}Ah
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Battery Configurations */}
        {energyUsage.batteryDiagram && (
          <div className="mb-8">
            <h4 className="text-2xl font-bold mb-4 text-orange-400">
              Battery Configurations
            </h4>

            {/* System Details */}
            <div className="mb-6">
              <h5 className="text-lg font-semibold mb-3 text-orange-400">
                System Details
              </h5>
              <div className="bg-[#232325] rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-400">Required Watt Hours</p>
                    <p className="text-lg font-semibold mt-1">
                      {energyUsage.batteryDiagram.requiredWattHours}Wh
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">System Voltage</p>
                    <p className="text-lg font-semibold mt-1">
                      {energyUsage.batteryDiagram.systemVoltage}V
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recommended Configuration */}
            <div className="mb-6">
              <h5 className="text-lg font-semibold mb-3 text-orange-400">
                Recommended Configuration
              </h5>
              <div className="bg-[#232325] rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-400">Configuration</p>
                    <p className="text-lg font-semibold mt-1">
                      {
                        energyUsage.batteryDiagram.recommendedConfig
                          .configuration
                      }
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Parallel Strings</p>
                    <p className="text-lg font-semibold mt-1">
                      {
                        energyUsage.batteryDiagram.recommendedConfig
                          .parallelStrings
                      }
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Series Count</p>
                    <p className="text-lg font-semibold mt-1">
                      {energyUsage.batteryDiagram.recommendedConfig.seriesCount}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">
                      System Capacity (Wh)
                    </p>
                    <p className="text-lg font-semibold mt-1">
                      {
                        energyUsage.batteryDiagram.recommendedConfig
                          .systemCapacityWh
                      }
                      Wh
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Total Batteries</p>
                    <p className="text-lg font-semibold mt-1">
                      {
                        energyUsage.batteryDiagram.recommendedConfig
                          .totalBatteries
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Minimum Configuration */}
            <div className="mb-6">
              <h5 className="text-lg font-semibold mb-3 text-orange-400">
                Minimum Configuration
              </h5>
              <div className="bg-[#232325] rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-400">Configuration</p>
                    <p className="text-lg font-semibold mt-1">
                      {energyUsage.batteryDiagram.minimumConfig.configuration}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Parallel Strings</p>
                    <p className="text-lg font-semibold mt-1">
                      {energyUsage.batteryDiagram.minimumConfig.parallelStrings}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Series Count</p>
                    <p className="text-lg font-semibold mt-1">
                      {energyUsage.batteryDiagram.minimumConfig.seriesCount}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">
                      System Capacity (Wh)
                    </p>
                    <p className="text-lg font-semibold mt-1">
                      {
                        energyUsage.batteryDiagram.minimumConfig
                          .systemCapacityWh
                      }
                      Wh
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Total Batteries</p>
                    <p className="text-lg font-semibold mt-1">
                      {energyUsage.batteryDiagram.minimumConfig.totalBatteries}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Note about products */}
        {!energyUsage.recommendedInverter &&
          !energyUsage.recommendedBattery && (
            <div className="mt-6 p-4 bg-yellow-900/30 border border-yellow-600/50 rounded">
              <p className="text-sm text-yellow-200">
                <span className="font-medium">Note:</span> No specific products
                were recommended by the system. Please contact our support team{" "}
                <a
                  href="mailto:info@gridking.africa"
                  className="text-orange-400 hover:underline"
                >
                  {" "}
                  (info@gridking.africa){" "}
                </a>{" "}
                for personalized product recommendations based on your
                requirements.
              </p>
            </div>
          )}

        <div className="mt-8 flex justify-center">
          {energyUsage.recommendedInverter || energyUsage.recommendedBattery ? (
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
