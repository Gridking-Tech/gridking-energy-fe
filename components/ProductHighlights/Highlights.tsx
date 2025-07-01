"use client";

import React, { ReactNode } from "react";

interface SustainabilityCardProps {
  icon?: ReactNode;
  title?: string;
  subtitle?: string | ReactNode;
  description?: string;
  bgColor?: string;
}

const SustainabilityCard: React.FC<SustainabilityCardProps> = ({
  icon,
  title,
  subtitle,
  description,
  bgColor = "bg-gray-800",
}) => {
  return (
    <div
      className={`p-8 rounded shadow-lg text-white ${bgColor} h-80 flex flex-col justify-start`}
    >
      <div className="flex items-center mb-6">
        <span className="text-3xl mr-3">{icon}</span>
        <div>
          <h3 className="text-2xl font-bold">{title}</h3>
          <h4 className="text-lg font-light text-gray-300">{subtitle}</h4>
        </div>
      </div>
      <div>
        <p className="text-gray-200">{description}</p>
      </div>
    </div>
  );
};

const Highlights: React.FC = () => {
  return (
    <div className="md:max-w-6xl mx-auto px-4 py-20 mt-20 mt-40 lg:mt-25">
      <h2 className="text-3xl md:text-4xl mb-8 border-l-4 border-gray-300 pl-4">
        Built for Sustainability
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SustainabilityCard
          icon="⚡"
          title="99%"
          subtitle="Efficiency Rates"
          description="Our inverters convert up to 99% of solar energy into usable power — maximizing output, minimizing waste."
          bgColor="bg-gray-800"
        />
        <SustainabilityCard
          icon="⏳"
          title="10+"
          subtitle="Years Lifespan"
          description="Designed with premium, durable components that guarantee over a decade of reliable performance with minimal maintenance."
          bgColor="bg-[#F57B2C]"
        />
        <SustainabilityCard
          icon="🌍"
          title="80%"
          subtitle="Carbon Footprint Reduction"
          description="Switching to GridKing inverters can reduce your energy-related carbon emissions by up to 80%, helping build a cleaner, greener future."
          bgColor="bg-gray-800"
        />
      </div>
    </div>
  );
};

export default Highlights;
