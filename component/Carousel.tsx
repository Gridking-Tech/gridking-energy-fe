import { imagesArr } from '@/constant/constants'
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
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 15) {
        controls.start({ 
          width: "100%", 
          top: 0, 
          borderRadius: 0,
          transition: { duration: 0.4, ease: "easeIn" } 
        });
      } else {
        controls.start({ 
          width: "90%", 
          top: "10px", 
          borderRadius: "0.7rem",
          transition: { duration: 0.4, ease: "easeOut" } 
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [controls, window.scrollY]);

  return (
    <div className='relative w-full h-[100%]'>
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
                priority={true}
                layout="fill"
                objectFit="cover"
                className="absolute h-full w-full z-10"
              />
              <div className="absolute w-full h-full bg-black/40"></div>
              <CarouselControls
                currentIndex={currentIndex}
                setCurrentIndex={setCurrentIndex}
                images={imagesArr}
              />
            </motion.div>
          )
        ))}
      </AnimatePresence>

      {/* Navbar Animation */}
      <motion.div 
        className="fixed left-1/2 transform -translate-x-1/2 z-20 bg-white shadow-lg "
        initial={{ width: "90%", top: "10px",borderRadius: "0.5rem" }}
        animate={controls}
      >
        <NavBar />
      </motion.div>
    </div>
  )
}

export default Carousel;
