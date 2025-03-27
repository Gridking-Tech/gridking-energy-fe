import React from "react";
import Image from "next/image";
import GridBanner1 from "../../../public/assets/placeholders/GD001.svg";

interface VideoPlaceholderProps {
  width?: string;
  height?: string;
  src?: string;
}

const VideoPlaceholder: React.FC<VideoPlaceholderProps> = ({
  width = "100%",
  height = "500px",
  src = GridBanner1,
}) => {
  return (
    <div
      style={{ width, height }}
      className="relative flex items-center justify-center bg-gray-200 overflow-hidden"
    >
      <Image
        src={src}
        alt="Video Placeholder"
        layout="fill"
        objectFit="cover"
        className="absolute"
      />
      <div className="absolute w-full h-full bg-black/30 flex items-center justify-center">
        <span className="text-white font-bold text-2xl">Loading Video...</span>
      </div>
    </div>
  );
};

export default VideoPlaceholder;
