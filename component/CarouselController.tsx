import { FaCircle } from "react-icons/fa";

const CarouselControls = ({ currentIndex, setCurrentIndex, images }:any) => {
  return (
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-3">
      {images.map((_:any, index:any) => (
        <button
          key={index}
          onClick={() => setCurrentIndex(index)}
          className="focus:outline-none"
        >
          <FaCircle
            size={12}
            className={`transition-colors duration-300 ${
              index === currentIndex ? 'text-red-500' : 'text-gray-400 hover:text-red-300'
            }`}
          />
        </button>
      ))}
    </div>
  );
};

export default CarouselControls;