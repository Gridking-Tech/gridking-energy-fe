import React from "react";
import Image from "next/image";
// Define the props interface
interface ProductCardProps {
  name: string;
  rating: number;
  reviewCount: number;
  imageUrl?: string; // Optional image URL
  isNew?: boolean; // Optional flag for "NEW" label
}

// Reusable ProductCard component
const ProductCard: React.FC<ProductCardProps> = ({
  name,
  rating,
  reviewCount,
  imageUrl = "/default-product-image.jpg", // Default image if none provided
  isNew = false,
}) => {
  // Generate star rating based on the rating value (1-5)
  const renderStars = () => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={i} className="text-yellow-400">
          ★
        </span>
      );
    }
    if (hasHalfStar) {
      stars.push(
        <span key="half" className="text-yellow-400">
          ☆
        </span>
      ); // Half star representation
    }
    while (stars.length < 5) {
      stars.push(
        <span key={stars.length} className="text-gray-300">
          ☆
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="max-w-sm rounded-md overflow-hidden ">
      {/* Image Section */}
      <div className="relative w-full h-64 bg-white">
        <Image
          fill
          className="object-contain"
          src={imageUrl}
          alt={`${name} image`}
        />
        {isNew && (
          <span className="absolute top-2 left-2 bg-orange-500 text-white text-xs font-semibold px-2 py-1 rounded">
            NEW
          </span>
        )}
        {/* <button className="absolute top-2 right-2 text-gray-600 hover:text-gray-800">
          ♥
        </button> */}
      </div>

      {/* Content Section */}
      <div className="py-4">
        <h3 className="text-lg font-bold text-gray-800">{name}</h3>
        <div className="flex items-center mt-2">
          {renderStars()}
          <span className="ml-2 text-sm text-gray-600">({reviewCount})</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
