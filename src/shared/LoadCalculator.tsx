import React, { useState } from "react";

const LoadCalculator = () => {
  const [voltage, setVoltage] = useState(220);
  const [current, setCurrent] = useState(0);
  const [power, setPower] = useState(0);

  const calculatePower = () => {
    setPower(voltage * current);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold text-gray-800 text-center mb-4">
          Load Calculator
        </h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Voltage (V)</label>
          <input
            type="number"
            value={voltage}
            onChange={(e) => setVoltage(Number(e.target.value))}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Current (A)</label>
          <input
            type="number"
            value={current}
            onChange={(e) => setCurrent(Number(e.target.value))}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <button
          onClick={calculatePower}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Calculate Power
        </button>
        <div className="mt-4 p-3 bg-gray-200 rounded-lg text-center">
          <h3 className="text-lg font-semibold">Power: {power} Watts</h3>
        </div>
      </div>
    </div>
  );
};

export default LoadCalculator;
