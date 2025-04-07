import React, { useRef, useState } from "react";
import Image from "next/image";

const ImageZoom = ({ src, alt }: { src: string; alt: string }) => {
  const [isHovering, setIsHovering] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLDivElement>(null);

  // Calculate position of the lens to follow the mouse pointer.
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = imageRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Bound the lens inside the image dimensions
    const boundedX = Math.min(Math.max(x, 50), rect.width - 50);
    const boundedY = Math.min(Math.max(y, 50), rect.height - 50);

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

        {/* Lens */}
        {isHovering && (
          <div
            className="absolute pointer-events-none border-2 border-orange-500 rounded-md"
            style={{
              width: "100px",
              height: "100px",
              top: `${zoomPosition.y - 50}px`,
              left: `${zoomPosition.x - 50}px`,
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              transform: "scale(1.1)", // Slight zoom for lens
            }}
          />
        )}
      </div>

      {isHovering && (
        <div
          className="absolute top-0 right-[-320px] w-[500px] h-[300px] border border-gray-300 overflow-hidden hidden md:block"
        >
          <Image
            src={src}
            alt={alt}
            width={1000}
            height={1000}
            style={{
              transform: `translate(-${zoomPosition.x * 0}px, -${zoomPosition.y * 2.5}px)`,
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
