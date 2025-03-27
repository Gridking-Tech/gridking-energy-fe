import { imagesArr } from '@/constant/constants'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useState, useEffect } from 'react'
import CarouselControls from './CarouselController'
import Image from 'next/image'
import NavBar from '../NavBar/NavBar'


function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    setScreenWidth(window.innerWidth);
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % imagesArr.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='relative w-full h-[60%] overflow-hidden flex flex-col md:h-[85%]'>
      <AnimatePresence>
        {imagesArr.map((src, index) =>
          index === currentIndex ? (
            <motion.div
              key={src}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 1.5}}
              className="absolute w-full z-10 h-full overflow-hidden pointer-events-none"
            >
              <div className="relative w-full h-full">
                <Image
                  src={src}
                  alt={`Image ${index}`}
                  priority={true}
                  layout="fill"
                  objectFit="cover"
                  className="absolute min-w-full z-50 min-h-full"
                />
              </div>
              {/* <div className="absolute w-full h-full bg-black/40"></div> */}
              <CarouselControls
                currentIndex={currentIndex}
                setCurrentIndex={setCurrentIndex}
                images={imagesArr}
              />
            </motion.div>
          ) : null
        )}
      </AnimatePresence>
      <motion.div>
        <NavBar />
      </motion.div>
    </div>
  )
}

export default Carousel;
