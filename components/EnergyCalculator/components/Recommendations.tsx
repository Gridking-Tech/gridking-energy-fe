import React from "react";

interface Iprops {
  isOpen: boolean;
  onClose: () => void;
  energyUsage: {
    totalConsumption: string;
    recommendedInverterRating: string;
    recommendedBatteryCapacity: string;
    recommendedBatteryCount: string;
  };
}

const RecommendationsModal = ({ isOpen, onClose, energyUsage }: Iprops) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#2C2C2E]/70 flex items-center justify-center z-50">
      <div className="relative bg-[#2C2C2E]/80 backdrop-blur-md rounded-[24px] w-[90%] max-w-[520px] px-8 py-10 text-white shadow-xl">
        <h3 className="text-2xl font-bold text-center mb-3">Your Energy Usage</h3>
        <p className="text-base text-center text-gray-300 mb-8">
          Based on the number of appliance(s) selected, here are our recommendations for optimal energy use
        </p>
        <hr className="border-t border-white/30 mb-8" />
        <div className="grid grid-cols-2 gap-5">
          <div className="rounded-xl border border-gray-500 bg-[#1E1E20]/80 backdrop-blur-sm p-4">
            <p className="text-sm text-gray-400">Total Power Consumption</p>
            <p className="text-xl font-semibold mt-1">{energyUsage.totalConsumption}</p>
          </div>
          <div className="rounded-xl border border-gray-500 bg-[#1E1E20]/80 backdrop-blur-sm p-4">
            <p className="text-sm text-gray-400">Recommended Inverter Rating</p>
            <p className="text-xl font-semibold mt-1">{energyUsage.recommendedInverterRating}</p>
          </div>
          <div className="rounded-xl border border-gray-500 bg-[#1E1E20]/80 backdrop-blur-sm p-4">
            <p className="text-sm text-gray-400">Recommended Battery Capacity</p>
            <p className="text-xl font-semibold mt-1">{energyUsage.recommendedBatteryCapacity}</p>
          </div>
          <div className="rounded-xl border border-gray-500 bg-[#1E1E20]/80 backdrop-blur-sm p-4">
            <p className="text-sm text-gray-400">Recommended No. of Battery</p>
            <p className="text-xl font-semibold mt-1">{energyUsage.recommendedBatteryCount}</p>
          </div>
        </div>
        <div className="mt-8 flex justify-center">
          <button
            onClick={onClose}
            className="bg-[#FF6B00] text-white text-base font-semibold px-6 py-3 rounded-md hover:bg-orange-700 transition cursor-pointer"
          >
            GET QUOTE
          </button>
        </div>
        <div className="absolute -bottom-5 left-0 w-full h-5 bg-[#2C2C2E]/80 backdrop-blur-md flex justify-between px-1">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="w-3 h-3 bg-black rounded-full"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecommendationsModal;
