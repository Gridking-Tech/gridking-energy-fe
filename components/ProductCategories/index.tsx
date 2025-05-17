import React from "react";
import Image from "next/image";

const ProductCategories = () => {
  const categories = [
    {
      number: "01",
      title: "Inverters",
      description: "Efficient & reliable inverter systems for your power needs.",
      image: "https://via.placeholder.com/300x200?text=Inverter",
    },
    {
      number: "02",
      title: "Batteries",
      description: "Durable batteries for longer power backup.",
      image: "https://via.placeholder.com/300x200?text=Battery",
    },
    {
      number: "03",
      title: "Solar Panels",
      description: "High-performance solar panels to harness the sun.",
      image: "https://via.placeholder.com/300x200?text=Solar+Panel",
    },
  ];

  return (
    <div className="py-16 px-4 bg-gray-100">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-gray-800">
          Powering Homes and Businesses with Excellence
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <div
              key={index}
              className="bg-black text-white rounded-lg overflow-hidden shadow-md"
            >
              <div className="p-6">
                <span className="text-4xl font-bold text-orange-500">
                  {category.number}
                </span>
                <h3 className="text-xl font-semibold mt-2 mb-4">
                  {category.title}
                </h3>
                <div className="relative w-full h-40 mb-4">
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    style={{ objectFit: "cover" }}
                    className="rounded"
                  />
                </div>
                <p className="text-sm">{category.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCategories;