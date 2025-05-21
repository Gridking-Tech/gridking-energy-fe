import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ImagePlaceholder from "../Placeholders/ImagePlaceholder"; // Import the placeholder

// Define the props interface
interface ProductCardProps {
  name: string;
  productId: string;
  rating: number;
  reviewCount: number;
  imageUrl?: string; // Optional image URL
  isNew?: boolean; // Optional flag for "NEW" label
  goTo?: string
}

// Reusable ProductCard component
const ProductCard: React.FC<ProductCardProps> = ({
  name,
  rating,
  productId,
  goTo='#',
  reviewCount,
  imageUrl = "/default-product-image.jpg", // Default image if none provided
  isNew = false,
}) => {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

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

  const routeId = (title_id: string) => {
    return `/products/${title_id?.replace(/\s+/g, "-")}`
  };

  // Show placeholder if loading or error or imageUrl is falsy
  const showPlaceholder = !imageUrl || imgError || !imgLoaded;

  return (
    <div className="max-w-sm rounded overflow-hidden">
      {/* Image Section */}
      <Link href={`${routeId(name+" "+productId)}`|| goTo} className="relative w-full bg-white" style={{ aspectRatio: "3 / 3.2" }}>
        {showPlaceholder ? (
          <ImagePlaceholder width={400} height={400} />
        ) : (
          <Image
            fill
            className="object-contain"
            src={imageUrl}
            alt={`${name} image`}
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgError(true)}
          />
        )}
        {isNew && (
          <span className="absolute top-2 left-2 bg-orange-500 text-white text-xs font-semibold px-2 py-1 rounded">
            NEW
          </span>
        )}
      </Link>

      {/* Content Section */}
      <div className="py-4">
        <Link href={`${routeId(name+" "+productId)}`|| goTo}>
          <h3 className="text-lg font-bold text-gray-800 hover:text-[#F57B2C]">{name}</h3>
        </Link>

        <div className="flex items-center mt-2">
          {renderStars()}
          <span className="ml-2 text-sm text-gray-600">({reviewCount})</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;