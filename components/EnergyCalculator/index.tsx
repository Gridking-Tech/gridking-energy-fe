import React, { useState, useEffect } from "react";
import RecommendationsModal from "./components/Recommendations";
import EmptyState from "../EmptyState";
import mockData from "@/mockData.json";

const EnergyCalculator = () => {
  const [totalConsumption, setTotalConsumption] = useState(0.0);
  type SelectedAppliance = { name: string; quantity: number };
  const [selectedAppliances, setSelectedAppliances] = useState<SelectedAppliance[]>([]);
  const [appliance, setAppliance] = useState("");
  const [quantity, setQuantity] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  type Recommendations = { inverterRating: string; battery: string; qty: string };
  const [recommendations, setRecommendations] = useState<Recommendations | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const appliancesList = mockData.appliances || [];
  const appliances = appliancesList.map((item) => item.name);
  const consumptionRates = appliancesList.reduce<Record<string, number>>(
    (acc, item) => {
      acc[item.name] = item.wattage;
      return acc;
    },
    {}
  );

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
    setIsModalOpen(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const dummyRecommendations = {
        inverterRating: "3kVA",
        battery: "12V 200Ah",
        qty: "2",
      };
      setRecommendations(dummyRecommendations);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
      setRecommendations(null);
    } finally {
      setIsLoading(false);
      setSelectedAppliances([]);
    }
  };

  useEffect(() => {
    const consumption = selectedAppliances.reduce((sum, item) => {
      const wattage = consumptionRates[item?.name] || 0;
      return sum + (item?.quantity * wattage) / 1000;
    }, 0);

    setTotalConsumption(Number(consumption?.toFixed(2)));
  }, [selectedAppliances]);

  return (
    <div className="bg-white text-gray-900 px-4 py-4 mb-45">
      <div className="max-w-6xl mx-auto flex">
        <div className="w-1/2 pr-8 sticky top-8">
          <span className="w-1 h-12 bg-gray-400 mr-4 inline-block"></span>
          <h2 className="text-3xl font-bold inline text-gray-900">
            Energy Usage Calculator
          </h2>
          <p className="text-sm text-gray-600 mt-2">
            Take the guesswork out of your solar setup. Use our easy Energy
            Usage Calculator to discover exactly what size inverter you need
            based on your daily energy consumption.
          </p>
          <div className="mt-8">
            <h3 className="text-2xl font-semibold text-gray-900">
              Total Power Consumption
            </h3>
            <p className="text-6xl font-bold text-orange-500 mt-2">
              {totalConsumption} kWh
            </p>
          </div>
        </div>
        <div className="w-1/2 pl-8 sticky top-8">
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex space-x-4">
                <div className="w-1/2">
                  <label className="block font-medium text-gray-700 mb-2">
                    Appliance
                  </label>
                  <select
                    value={appliance}
                    onChange={(e) => setAppliance(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded text-gray-900 cursor-pointer bg-[#F6F6F6]"
                  >
                    <option value="" disabled>
                      Select an Appliance
                    </option>
                    {appliances.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="w-1/2">
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
              disabled={isLoading || selectedAppliances.length === 0}
              className={`w-full mt-4 p-2 bg-[#F57B2C] rounded hover:bg-orange-600 text-white cursor-pointer ${
                isLoading || selectedAppliances.length === 0
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              {isLoading ? "Calculating..." : "CALCULATE ENERGY USAGE"}
            </button>
          </div>
        </div>
      </div>
      {isModalOpen && recommendations && (
        <RecommendationsModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          energyUsage={{
            totalConsumption: totalConsumption + " kWh",
            recommendedInverterRating: recommendations.inverterRating,
            recommendedBatteryCapacity: recommendations.battery,
            recommendedBatteryCount: recommendations.qty,
          }}
        />
      )}
    </div>
  );
};

export default EnergyCalculator;
