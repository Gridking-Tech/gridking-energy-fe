import React, { useState, useEffect } from "react";
import RecommendationsModal from "./components/Recommendations";
import EmptyState from "../EmptyState";

const EnergyCalculator = () => {
  const [totalConsumption, setTotalConsumption] = useState(0.0);
  const [selectedAppliances, setSelectedAppliances] = useState([]);
  const [appliance, setAppliance] = useState("");
  const [quantity, setQuantity] = useState(1.0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [recommendations, setRecommendations] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const appliances = [
    "Air Conditioner (1HP)",
    "Refrigerator",
    "LED TV",
    "Washing Machine",
  ];

  const handleAddAppliance = () => {
    if (appliance && quantity > 0) {
      setSelectedAppliances([
        ...selectedAppliances,
        { name: appliance, quantity },
      ]);
      setAppliance("");
      setQuantity(1.0);
    }
  };

  const handleRemoveAppliance = (index) => {
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
        solarPanel: "300W x 4 Panels",
      };
      setRecommendations(dummyRecommendations);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
      setRecommendations(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const consumption = selectedAppliances.reduce((sum, item) => {
      if (item.name === "Air Conditioner (1HP)") {
        return sum + item.quantity * 0.746;
      }
      return sum;
    }, 0);
    setTotalConsumption(consumption.toFixed(2));
  }, [selectedAppliances]);

  return (
    <div className="bg-white text-gray-900 px-4 py-8 mb-45">
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
            <p className="text-4xl font-bold text-orange-500 mt-2">
              {totalConsumption} kWh
            </p>
          </div>
        </div>
        <div className="w-1/2 pl-8 sticky top-8">
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex space-x-4">
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-700">
                    Appliance
                  </label>
                  <select
                    value={appliance}
                    onChange={(e) => setAppliance(e.target.value)}
                    className="w-full p-2 bg-white border border-gray-300 rounded text-gray-900"
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
                  <label className="block text-sm font-medium text-gray-700">
                    Quantity
                  </label>
                  <select
                    value={quantity}
                    onChange={(e) => setQuantity(parseFloat(e.target.value))}
                    className="w-full p-2 bg-white border border-gray-300 rounded text-gray-900"
                  >
                    {[1.0, 2.0, 3.0, 4.0, 5.0].map((q) => (
                      <option key={q} value={q}>
                        {q}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={handleAddAppliance}
                  className="w-1/2 p-2 bg-white border border-gray-300 rounded text-gray-900 hover:bg-gray-100"
                >
                  + Add Appliance
                </button>
              </div>
            </div>

            <div className="border-t border-gray-400 my-4"></div>
            <div className="space-y-4">
              <h4 className="text-lg font-medium text-gray-900">
                Selected Items
              </h4>
              <div className="mt-2 max-h-40 overflow-y-auto border border-gray-300 rounded p-2 bg-[#E7E7E7]">
                {selectedAppliances.length === 0 ? (
                  <EmptyState text="Add an Appliance(s) to calculate energy usage" />
                ) : (
                  selectedAppliances.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 rounded mb-2 text-gray-900"
                    >
                      <span>
                        {item.name} x {item.quantity}
                      </span>
                      <button
                        onClick={() => handleRemoveAppliance(index)}
                        className="text-gray-500 hover:text-gray-700"
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
              className={`w-full mt-4 p-2 bg-orange-500 rounded hover:bg-orange-600 text-white ${
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

      <RecommendationsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        recommendations={recommendations}
      />
    </div>
  );
};

export default EnergyCalculator;