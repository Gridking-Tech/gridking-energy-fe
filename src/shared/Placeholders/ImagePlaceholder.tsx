import React from "react";
import Image from "next/image";
import GridBanner3 from "../../../public/assets/placeholders/GD003.svg";

interface ImagePlaceholderProps {
  width?: string | number;
  height?: string | number;
  src?: string;
}

const ImagePlaceholder: React.FC<ImagePlaceholderProps> = ({
  width = "100%",
  height = "500px",
  src = GridBanner3,
}) => {
  return (
    <div
      style={{
        width: typeof width === "number" ? `${width}px` : width,
        height: typeof height === "number" ? `${height}px` : height,
      }}
      className="relative flex items-center justify-center bg-gray-200 overflow-hidden"
    >
      <Image
        src={src}
        alt="Image Placeholder"
        fill
        style={{ objectFit: "cover" }}
        className="absolute"
        sizes="100vw"
      />
      <div className="absolute w-full h-full bg-black/20 flex items-center justify-center">
        <span className="text-white font-bold text-xl italic">Oops, no pic here!</span>
      </div>
    </div>
  );
};

export default ImagePlaceholder;
