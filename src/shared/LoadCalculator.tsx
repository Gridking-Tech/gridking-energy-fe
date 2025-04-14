import React, { useState } from 'react';
import { LoadAppliances, productCategories } from '../constants/constants';

export default function LoadCalculator() {
  const [appliances, setAppliances] = useState(LoadAppliances);
  const [batteryCapacity, setBatteryCapacity] = useState(220);
  const numberOfBatteries = 2;

  const updateQuantity = (index: number, delta: number) => {
    setAppliances(prev =>
      prev.map((item, i) =>
        i === index ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item
      )
    );
  };

  const totalLoad = appliances.reduce(
    (total, item) => total + item.quantity * item.power,
    0
  );

  const recommendedInverterVA = Math.ceil(totalLoad * 1.4);
  const backupTimeHours =
    totalLoad > 0
      ? ((batteryCapacity * 12 * numberOfBatteries) / totalLoad).toFixed(1)
      : 0;

  return (
    <div className=' mt-20  md:mt-40 mb-20'>
      <div className="flex flex-col gap-2 text-center mb-10 items-center justify-cen mx-auto  max-w-4xl">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-orange-500">Load Calculator</h1>
        <p className="text-base sm:text-lg md:text-xl w-[20rem] xl:w-full font-semibold text-gray-600">
          Know which inverter you need, what it can carry and for how lon
        </p>
      </div>
      <div className="w-[95%] xl:w-[75%] mx-auto min-h-screen relative shadow-md bg-gray-100 backdrop-blur-md flex flex-col items-center justify-center px-4 sm:px-6  border-gray-300   p-5 rounded-lg">


        <div className="w-full flex flex-col xl:flex-row gap-6">
          <div className="xl:w-1/2 w-full bg-white border-2 shadow-md rounded-lg p-6 flex flex-col justify-center items-center gap-6">
            <h2 className="text-2xl font-bold mb-2 text-center">Total Power Consumption</h2>
            <div className="text-4xl md:text-5xl font-extrabold text-green-600">{totalLoad} W</div>
          </div>

          <div className="xl:w-1/2 w-full max-h-[600px] overflow-y-auto p-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
            {appliances.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.name}
                  className="bg-white rounded-xl cursor-pointer shadow-md p-4 flex flex-col justify-between hover:bg-gray-100 relative transition-all duration-300 border border-gray-100"
                >
                  <div className="bg-orange-300 w-8 h-8 md:w-8 md:h-8 flex items-center justify-center rounded-full absolute top-3 left-3">
                    <Icon className="text-black text-sm md:text-base" />
                  </div>
                  <div className="text-right  font-black w-full text-sm sm:text-base mx-auto text-gray-700 mb-6">
                    {item.name}
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <button
                      className="bg-gray-200 px-2 rounded-full text-lg font-bold"
                      onClick={() => updateQuantity(index, -1)}
                    >
                      −
                    </button>
                    <span className="text-xl sm:text-2xl font-bold">{item.quantity}</span>
                    <button
                      className="bg-gray-200 px-2 rounded-full text-lg font-bold"
                      onClick={() => updateQuantity(index, 1)}
                    >
                      +
                    </button>
                  </div>
                  <div className="text-xs sm:text-sm text-gray-500 font-medium text-right mt-2">
                    Load: <span className="font-bold">{item.quantity * item.power}W</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>


        <div className="w-full flex flex-col lg:flex-row border-t mt-12 pt-8 gap-6">
          <div className="lg:w-1/2 flex flex-col sm:flex-row justify-between gap-6">

            <div className="flex-1 border-r sm:border-r-0 lg:border-r-2 px-4 py-6">
              <h3 className="text-xl font-bold mb-2">Recommended Inverter Rating</h3>
              <div className="text-4xl font-black text-green-600">{recommendedInverterVA} VA</div>
            </div>
            <div className="flex-1 px-4 py-6">
              <label className="block mb-1 text-sm font-medium text-gray-900">Choose Battery Capacity</label>
              <select
                className="w-full border border-black px-4 py-2 rounded text-gray-800"
                value={batteryCapacity}
                onChange={e => setBatteryCapacity(Number(e.target.value))}
              >
                <option value={220}>220Ah</option>
                <option value={200}>200Ah</option>
                <option value={150}>150Ah</option>
              </select>
              <p className="mt-4 text-sm font-medium text-gray-600">Your Available Battery Backup Time:</p>
              <p className="text-3xl font-black text-green-600">{backupTimeHours} hrs</p>
            </div>
          </div>


          <div className="lg:w-1/2 px-4 py-6">
            <h3 className="text-lg sm:text-xl font-bold mb-4 text-gray-800">Explore Products</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {productCategories.map(product => {
                const Icon = product.icon;
                return (
                  <a
                    key={product.name}
                    href={product.href}
                    className="shadow-md p-4 rounded-xl hover:scale-105 transition-transform bg-white"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-3 bg-orange-100 text-orange-500 rounded-full">
                        <Icon />
                      </div>
                      <h4 className="text-base font-black text-gray-800">{product.name}</h4>
                    </div>
                    <p className="text-sm text-gray-700">{product.description}</p>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
