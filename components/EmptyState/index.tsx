import React from "react";
import { BatteryIcon } from "@/shared/Icons";

interface EmptyStateProps {
  height?: number;
  width?: number;
  text?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  text = "No items to display",
}) => {
  return (
    <div className="flex flex-col w-full bg-gray-50 items-center justify-center p-4 min-h-[120px]">
      <div className="flex justify-center mb-2">
        <BatteryIcon />
      </div>
      <p className="text-center text-gray-500 md:w-[50%] italic">{text}</p>
    </div>
  );
};

export default EmptyState;
