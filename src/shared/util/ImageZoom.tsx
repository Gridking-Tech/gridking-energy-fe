import React, { useRef, useState } from "react";
import Image from "next/image";

const ImageZoom = ({ src, alt }: { src: string; alt: string }) => {
  const [isHovering, setIsHovering] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLDivElement>(null);
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = imageRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const boundedX = Math.min(Math.max(x, 100), rect.width - 100);
    const boundedY = Math.min(Math.max(y, 100), rect.height - 100);

    setZoomPosition({ x: boundedX, y: boundedY });
  };

  return (
    <div className="relative w-[70%] mx-auto h-[25rem] group">
      {/* Image Container */}
      <div
        className="w-full h-full rounded-lg overflow-hidden relative"
        ref={imageRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="md:object-cover object-contain"
        />

        {isHovering && (
          <div
            className="absolute pointer-events-none border-2 border-orange-500 rounded-md"
            style={{
              width: "60px",
              height: "60px",
              top: `${zoomPosition.y - 10}px`,
              left: `${zoomPosition.x - 10}px`,
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              transform: "scale(1.1)",
            }}
          />
        )}
      </div>

      {isHovering && (
        <div
          className="absolute top-0 right-[-550px] w-[600px] h-[300px] border border-gray-300 overflow-hidden hidden md:block"
        >
          <Image
            src={src}
            alt={alt}
            width={1000}
            height={1000}
            style={{
              transform: `translate(-${zoomPosition.x * 0}px, -${zoomPosition.y * 1.5}px)`,
              transformOrigin: "top left",
              width: "1000px",
              height: "1000px",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ImageZoom;
