import Image from "next/image";
import Link from "next/link";
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

  return (
    <div className="max-w-sm rounded overflow-hidden hover:shadow-md">
      <Link href={`/products/${slug}-${productId}` || goTo}>
        <div
          className="relative w-full bg-white "
          style={{ aspectRatio: "3 / 3.2" }}
        >
          <Image
            fill
            priority
            sizes="100vw"
            alt={`${slug}`}
            objectPosition="center"
            src={imageUrl as string}
            className="object-contain"
            blurDataURL="/assets/placeholders/products.png"
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

        <div className="flex items-center mt-2">
          {renderStars()}
          <span className="ml-2 text-sm text-gray-600">({reviewCount})</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
