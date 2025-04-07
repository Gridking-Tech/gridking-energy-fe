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
    <div className="w-full h-screen  relative flex flex-col xl:my-20 items-center justify-center px-8 ">
      {/* Header */}
      <div className="flex items-center flex-col gap-2 text-center mb-12 max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-black text-orange-500">Load Calculator</h1>
        <div className="text-xl md:text-xl tracking-[0px] font-semibold text-gray-600">Know which inverter you need, what it can carry and for how long</div>
      </div>
      <div className="w-full xl:max-w-full sm:max-w-6xl md:max-w-[80%] flex flex-col md:flex-row bg-white text-black rounded-xl mt-6 overflow-hidden">
        <div className="md:w-1/2 w-full p-6 flex flex-col justify-center items-start gap-6">
          <div className="text-left">
            <h2 className="text-2xl md:text-2xl font-bold mb-2">Total Power Consumption</h2>
            <div className="text-4xl text-green-600 md:text-5xl font-extrabold mb-2">{totalLoad} W</div>
          </div>
          <div className="w-full text-center">
            {/* <h3 className="text-xl font-bold">Estimate Your Battery Back Up Time</h3>
            <label className="block mt-2 text-sm text-gray-700 font-medium">Choose Battery Capacity</label>
            <select
              className="mt-1 border px-4 py-2 rounded text-gray-800"
              value={batteryCapacity}
              onChange={e => setBatteryCapacity(Number(e.target.value))}
            >
              <option value={220}>220Ah</option>
              <option value={200}>200Ah</option>
              <option value={150}>150Ah</option>
            </select> */}
            {/* <p className="mt-4 text-sm font-medium text-gray-600">Your Available Battery Back Up Time:</p>
            <p className="text-2xl font-bold text-blue-600">
              {backupTimeHours} hrs
            </p>
            <p className="text-xs mt-2 text-gray-500">
              *Backup time estimate is based on 12V batteries and may vary depending on usage.
            </p> */}
          </div>
        </div>
        <div className="md:w-1/2 w-full max-h-[600px] md:max-h-[90%] overflow-y-auto p-4 grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {appliances.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.name}
                className="bg-white rounded-xl shadow p-4 flex flex-col justify-between h-[180px] hover:bg-gray-100 relative transition-all duration-300 border border-gray-100"
              >
                <div className="bg-orange-300 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full absolute top-3 left-3">
                  <Icon className="text-black text-sm md:text-base" />
                </div>
                <div className="text-right md:text-sm font-black w-[10rem] mx-auto text-gray-700 mb-6">{item.name}</div>
                <div className="flex justify-between items-center mt-1">
                  <button
                    className="bg-gray-200 px-2 rounded-full text-lg font-bold cursor-pointer"
                    onClick={() => updateQuantity(index, -1)}
                  >
                    −
                  </button>
                  <span className="text-2xl md:text-3xl font-bold">{item.quantity}</span>
                  <button
                    className="bg-gray-200 px-2 rounded-full text-lg font-bold cursor-pointer"
                    onClick={() => updateQuantity(index, 1)}
                  >
                    +
                  </button>
                </div>
                <div className="text-xs md:text-sm text-gray-500 font-medium text-right mt-2">
                  Load: <span className="font-bold">{item.quantity * item.power}W</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
      <div className='w-full  border-t-1  rounded-[1rem] xl:flex hidden justify-center flex flex-row items-center border-gray-400 h-[32rem]'>
        <div className="w-[50%] text-left ">
          <h3 className="text-2xl font-bold">Recommended Inverter Rating</h3>
          <div className="text-4xl font-black text-green-600 mt-1">{recommendedInverterVA} VA</div>
        </div>
        <div className="w-[50%] h-full text-left px-4 py-6 ">
          <h3 className="text-xl font-bold mb-4 text-gray-800">Explore Products</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {productCategories.map((product) => {
              const Icon = product.icon;
              return (
                <a
                  href={product.href}
                  key={product.name}
                  className="border border-b-0 p-4 border-black/50  rounded-xl h-[10rem]  hover:scale-105   transition-all  bg-white"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-3 bg-orange-100 text-orange-500 rounded-full">
                      <Icon className="text" />
                    </div>
                    <h4 className="text-lg font-black text-gray-800">{product.name}</h4>
                  </div>
                  <p className="text-sm mt-6 text-gray-700 font-medium">{product.description}</p>
                </a>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
