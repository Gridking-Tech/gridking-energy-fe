"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCheckout } from "@/app/context";
import ImagePlaceholder from "@/shared/Placeholders/ImagePlaceholder";

interface ProductCardProps {
  name: string;
  slug: string;
  productId: string;
  rating: number;
  reviewCount: number;
  imageUrl?: string;
  isNew?: boolean;
  goTo?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  name,
  slug,
  rating,
  productId,
  goTo = "#",
  reviewCount,
  imageUrl = "/default-product-image.jpg",
  isNew = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const { addToCheckout } = useCheckout();

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
      );
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

  const handleAddToCheckout = () => {
    addToCheckout({
      productId,
      name,
      slug,
      imageUrl,
    });
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="max-w-sm w-full rounded overflow-hidden hover:shadow-md"
    >
      <Link href={`/products/${slug}-${productId}` || goTo}>
        <div
          className="relative w-full bg-white pt-10"
          style={{ aspectRatio: "3 / 3.2" }}
        >
          {(!imageLoaded || imageError) && (
            <ImagePlaceholder
              width={300}
              height={300}
              className="flex items-center justify-center mx-auto my-auto"
            />
          )}
          <Image
            fill
            priority
            sizes="100vw"
            alt={`${slug}`}
            objectPosition="center"
            src={imageUrl as string}
            className={`object-contain transition-opacity duration-300 ${
              imageLoaded && !imageError ? "opacity-100" : "opacity-0"
            }`}
            blurDataURL="/assets/placeholders/products.png"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
          />
          {isNew && (
            <span className="absolute top-2 left-2 bg-orange-500 text-white text-xs font-semibold px-2 py-1 rounded">
              NEW
            </span>
          )}
        </div>
      </Link>

      <div className="py-4 px-1">
        <Link href={`/products/${slug}-${productId}` || goTo}>
          <h3 className="text-lg font-bold text-gray-800 hover:text-[#F57B2C]">
            {name}
          </h3>
        </Link>

        <div className="mt-2">
          {/* <div className="flex items-center ">
            {renderStars()}
            <span className="ml-2 text-sm text-gray-600">({reviewCount})</span>
          </div> */}

          <div className="w-full">
            {isHovered && (
              <button
                onClick={handleAddToCheckout}
                className="w-full text-l cursor-pointer font-bold border-gray-500 bg-orange-500 hover:bg-orange-700 text-white py-3 px-4 rounded-sm"
              >
                Add to Checkout
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
