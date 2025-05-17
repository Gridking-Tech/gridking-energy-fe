import React from "react";

interface EmptyStateProps {
  height?: number;
  width?: number;
  icon?: string;
  text?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  height = 60,
  width = 60,
  icon = "⏳", // Hourglass icon for waiting/action
  text = "No items to display",
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-4 min-h-[120px]">
      <div className="flex justify-center">
        <span style={{ fontSize: `${width}px`, lineHeight: `${height}px` }} className="mb-2">
          {icon}
        </span>
      </div>
      <p className="text-center text-gray-500">{text}</p>
    </div>
  );
};

export default EmptyState;