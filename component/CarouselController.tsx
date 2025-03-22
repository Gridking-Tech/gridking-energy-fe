const CarouselControls = ({ currentIndex, setCurrentIndex, images }: any) => {
  return (
    <div className="absolute bottom-4 z-50 left-1/2 transform -translate-x-1/2 flex gap-3">
      {images.map((_: any, index: any) => (
        <div
          key={index}
          onClick={() => setCurrentIndex(index)}
          onMouseOver={() => setCurrentIndex(index)}
          className="focus:outline-none "
        >
          <div
            className={`transition-colors cursor-pointer transition-all w-[3.8rem] h-[2.1px] rounded-[20rem] duration-500 
              ${index === currentIndex ? 'bg-white' : 'bg-gray-200 hover:bg-white'}`}
          />
        </div>
      ))}
    </div>
  );
};

export default CarouselControls;
