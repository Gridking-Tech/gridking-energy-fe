"use client";
import React, { useState, useEffect } from "react";
import RecommendationsModal from "./components/Recommendations";
import EmptyState from "../EmptyState";
import { productsApi } from "@/api";
import toast from "react-hot-toast";

const EnergyCalculator = () => {
  const [totalConsumption, setTotalConsumption] = useState(0.0);
  type SelectedAppliance = { name: string; quantity: number };
  const [selectedAppliances, setSelectedAppliances] = useState<
    SelectedAppliance[]
  >([]);
  const [appliance, setAppliance] = useState("");
  const [quantity, setQuantity] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [recommendations, setRecommendations] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { data: appliancesData, isLoading: isAppliancesLoading } =
    productsApi.useGetAppliances() as {
      data?: { data: { name: string; wattage: number }[] };
      isLoading: boolean;
    };
  const appliancesList = appliancesData?.data || [];
  const appliances = appliancesList.map((item) => item.name);
  const consumptionRates = appliancesList.reduce<Record<string, number>>(
    (acc, item) => {
      acc[item.name] = item.wattage;
      return acc;
    },
    {}
  );

  const recommendationMutation = productsApi.useGetRecommendation();

  const handleAddAppliance = () => {
    const parsedQuantity = parseFloat(quantity);
    if (appliance && parsedQuantity > 0 && !isNaN(parsedQuantity)) {
      const existingIndex = selectedAppliances.findIndex(
        (item) => item?.name === appliance
      );
      let updatedAppliances = [...selectedAppliances];
      if (existingIndex !== -1) {
        updatedAppliances.splice(existingIndex, 1);
      }
      updatedAppliances = [
        { name: appliance, quantity: parsedQuantity },
        ...updatedAppliances,
      ];
      setSelectedAppliances(updatedAppliances);
      setAppliance("");
      setQuantity("");
    }
  };

  interface RemoveApplianceHandler {
    (index: number): void;
  }

  const handleRemoveAppliance: RemoveApplianceHandler = (index) => {
    setSelectedAppliances(selectedAppliances.filter((_, i) => i !== index));
  };

  const handleCalculate = async () => {
    setIsLoading(true);
    try {
      const totalKWh = selectedAppliances.reduce((sum, item) => {
        const wattage = consumptionRates[item?.name] || 0;
        return sum + (item?.quantity * wattage) / 1000;
      }, 0);
      setTotalConsumption(Number(totalKWh?.toFixed(2)));
      const wattagePayload = totalKWh * 1000;

      console.log("Making recommendation request with payload:", {
        totalWattage: wattagePayload,
      });

      const result = await recommendationMutation.mutateAsync({
        totalWattage: wattagePayload,
      });

      setRecommendations(result?.data || result || null);
      setIsModalOpen(true);
    } catch (error: unknown) {
      setRecommendations(null);
      setIsModalOpen(false);
      let errorMessage =
        "An error occurred while calculating recommendations. Please try again later.";
      if (error && typeof error === "object" && "response" in error) {
        const err = error as any;
        errorMessage =
          err?.response?.data?.message ||
          err?.response?.data?.error ||
          err?.message ||
          err?.error ||
          errorMessage;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const consumption = selectedAppliances.reduce((sum, item) => {
      const wattage = consumptionRates[item?.name] || 0;
      return sum + (item?.quantity * wattage) / 1000;
    }, 0);
    setTotalConsumption(Number(consumption?.toFixed(2)));
  }, [selectedAppliances, appliancesList]);

  return (
    <div id="load-calculator-section">
      <h2 className="text-center text-[#F47A2B] text-3xl md:text-6xl dark:text-white mb-8">
        Load Calculator{" "}
      </h2>{" "}
      <div className="bg-white text-gray-900 px-4 py-4 mb-35 mt-20 md:mt-0">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row">
          {/* Energy Usage Summary - always on top for mobile */}
          <div className="w-full md:w-1/2 pr-0 md:pr-8 top-8 order-1 md:order-none mb-8 md:mb-0 flex flex-col items-center md:items-start text-center md:text-left">
            {/* <span className="w-1 h-12 bg-gray-400 mr-4 inline-block md:mr-4 md:inline-block hidden md:block"></span> */}
            <h2
              className="text-3xl md:text-4xl inline gray-600 w-full md:w-auto border-l-4 pl-4 text-black dark:text-white w-full md:w-auto"
              style={{ lineHeight: "1.5" }}
            >
              Not Sure Which Inverter Size is Right for You?{" "}
            </h2>
            <p className="text-sm text-gray-600 mt-2 w-full md:w-auto ">
              Use our easy Energy Usage Calculator to discover exactly what size
              inverter you need based on your daily energy consumption.
            </p>
            <div className="mt-8 w-full md:w-auto">
              <h3 className="text-3xl gray-600">Total Power Consumption</h3>
              <p className="text-6xl font-bold text-orange-500 mt-2">
                {totalConsumption} kW
              </p>
            </div>
          </div>

          {/* Form Section - always below on mobile */}
          <div className="w-full md:w-1/2 pl-0 md:pl-8 sticky top-8 order-2 md:order-none">
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
                  <div className="w-full md:w-1/2">
                    <label className="block font-medium text-gray-700 mb-2">
                      Appliance
                    </label>
                    <select
                      value={appliance}
                      onChange={(e) => setAppliance(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded text-gray-900 cursor-pointer bg-[#F6F6F6]"
                    >
                      <option value="" disabled>
                        {isAppliancesLoading
                          ? "Loading..."
                          : "Select an Appliance"}
                      </option>
                      {appliances.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="w-full md:w-1/2">
                    <label className="block font-medium text-gray-700 mb-2">
                      Quantity
                    </label>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      min="1"
                      step="any"
                      className="w-full p-2 bg-[#F6F6F6] border border-gray-300 rounded text-gray-900 h-[54%]"
                      placeholder="Enter quantity"
                    />
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={handleAddAppliance}
                    className="w-full p-2 bg-white border border-gray-300 rounded text-gray-900 hover:bg-gray-100 cursor-pointer"
                  >
                    + Add Appliance
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <label className="font-medium text-gray-700">
                  Selected Items
                </label>
                <div className="border-t border-gray-400 my-4"></div>

                <div className="mt-2 max-h-40 flex flex-wrap gap-2 overflow-y-auto ">
                  {selectedAppliances.length === 0 ? (
                    <EmptyState text="You need to add an Appliance(s) to calculate energy usage" />
                  ) : (
                    selectedAppliances.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between gap-6 px-2 py-1 rounded w-max mb-1 text-gray-900 bg-[#E7E7E7]"
                      >
                        <span>
                          {item?.name} x {item?.quantity}
                        </span>
                        <button
                          onClick={() => handleRemoveAppliance(index)}
                          className="text-gray-500 hover:text-gray-700 cursor-pointer hover:text-red-600"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <button
                onClick={handleCalculate}
                disabled={
                  isLoading ||
                  recommendationMutation.isPending ||
                  selectedAppliances.length === 0
                }
                className={`w-full mt-4 p-2 bg-[#F57B2C] rounded hover:bg-orange-600 text-white cursor-pointer ${
                  isLoading ||
                  recommendationMutation.isPending ||
                  selectedAppliances.length === 0
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                {isLoading || recommendationMutation.isPending
                  ? "Calculating..."
                  : "CALCULATE ENERGY USAGE"}
              </button>
            </div>
          </div>
        </div>
        {isModalOpen && (
          <RecommendationsModal
            isOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false);
              setSelectedAppliances([]);
            }}
            energyUsage={{
              totalConsumption: totalConsumption + " kWh",
              recommendedInverterRating: recommendations?.requiredKVA
                ? recommendations.requiredKVA + " KVA"
                : "-",
              recommendedBatteryCapacity:
                recommendations?.bestRecommendation?.summary || "-",
              recommendedBatteryCount: recommendations
                ?.recommendedConfigurations?.[0]?.configuration?.totalBatteries
                ? String(
                    recommendations.recommendedConfigurations[0].configuration
                      .totalBatteries
                  )
                : "-",
              recommendedProducts: recommendations?.suitableInverters || [],
              backupTime: recommendations?.bestRecommendation?.totalStandbyTime
                ? recommendations.bestRecommendation.totalStandbyTime + " hours"
                : "-",
              systemVoltage: recommendations?.systemRequirements
                ?.recommendedSystemVoltage
                ? recommendations.systemRequirements.recommendedSystemVoltage +
                  "V"
                : "-",
              loading: isLoading,
            }}
          />
        )}
      </div>
    </div>
  );
};

export default EnergyCalculator;
