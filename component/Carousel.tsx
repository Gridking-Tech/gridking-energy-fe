import { imagesArr } from '@/constant/imageArrayts'
import { AnimatePresence, motion, useAnimation } from 'framer-motion'
import React, { useState, useEffect } from 'react'
import CarouselControls from './CarouselController'
import Image from 'next/image'
import NavBar from './NavBar/NavBar'

function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % imagesArr.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const controls = useAnimation();
  const [lastScrollY, setLastScrollY] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        controls.start({ 
          width: "100%", 
          top: 0, 
          transition: { duration: 0.2 } 
        });
      } else {
        controls.start({ 
          width: "90%", 
          top: "10px", 
          transition: { duration: 0.2 } 
        });
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, controls]);



  return (
    <div className='relative w-full h-[70%]'>
      <AnimatePresence>
        {imagesArr.map((src, index) => (
          index === currentIndex && (
            <motion.div
              key={src}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 1 }}
              className="absolute w-full h-full"
            >
              <Image
                src={src}
                alt={`Image ${index}`}
                layout="fill"
                objectFit="cover"
                className="absolute h-full w-full z-10"
              />
              <div className="absolute w-full h-full bg-black/40 "></div>
              <CarouselControls
                currentIndex={currentIndex}
                setCurrentIndex={setCurrentIndex}
                images={imagesArr}
              />
            </motion.div>
          )
        ))}
      </AnimatePresence>

      {/* NavBar should stay on top */}
      <motion.div 
      className="fixed left-1/2 transform -translate-x-1/2 z-20 bg-white shadow-lg rounded-lg"
      initial={{ width: "90%", top: "10px" }}
      animate={controls}
    >
      <NavBar />
    </motion.div>
    </div>
  )
}

export default Carousel;
