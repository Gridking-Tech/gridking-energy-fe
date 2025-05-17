import React from "react";

interface Iprops {
  isOpen: boolean;
  onClose: boolean;
  recommendations: {
    inverterRating: string;
    battery: string;
    solarPanel: string;
  };
}

const RecommendationsModal = ({ isOpen, onClose, recommendations }: Iprops) => {

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg w-1/2">
        <h3 className="text-2xl font-bold mb-4">Recommendations</h3>
        {recommendations ? (
          <div>
            <p>
              <strong>Inverter Rating:</strong> {recommendations.inverterRating}
            </p>
            <p>
              <strong>Battery:</strong> {recommendations.battery}
            </p>
            <p>
              <strong>Solar Panel:</strong> {recommendations.solarPanel}
            </p>
          </div>
        ) : (
          <p>Loading recommendations...</p>
        )}
        <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="p-2 text-gray-300 hover:text-white"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecommendationsModal;
