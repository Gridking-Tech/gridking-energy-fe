import React from "react";
import Image, { StaticImageData } from "next/image";
import defaultImg from "../../public/assets/placeholders/products.png";

interface ImagePlaceholderProps {
  width?: string | number;
  height?: string | number;
  src?: string | StaticImageData;
  className?: string;
  count?: number;
}

const ImagePlaceholder: React.FC<ImagePlaceholderProps> = ({
  width = "100%",
  height = "500px",
  src = defaultImg,
  className = "",
  count = 1,
}) => {
  return (
    <>
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          style={{
            width: typeof width === "number" ? `${width}px` : width,
            height: typeof height === "number" ? `${height}px` : height,
          }}
          className={`relative flex items-center justify-center bg-gray-200 overflow-hidden animate-pulse rounded w-full m-2 ${className}`}
        >
          <Image
            src={src}
            alt="Image Placeholder"
            fill
            style={{ objectFit: "cover" }}
            className="absolute"
            sizes="100vw"
          />
        </div>
      ))}
    </>
  );
};

export default ImagePlaceholder;
