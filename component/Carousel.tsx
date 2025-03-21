import { imagesArr } from '@/constant/imageArrayts'
import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'
import CarouselControls from './CarouselController'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import NavBar from './NavBar/NavBar'

function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % imagesArr.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);
  return (
    <div className='h-[50%]  w-full'>
      <AnimatePresence>
        {imagesArr.map((src, index) => (
          index === currentIndex && (
            <motion.div
              key={src}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 1 }}
              className="absolute w-full  md:h-[85%]"
            >
              <Image src={src} alt={`Image ${index}`} layout="fill" objectFit="cover" />
              <CarouselControls currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} images={imagesArr} />
            </motion.div>
          )
        ))}
        
        <div className='absolute w-full h-full'>
          <NavBar />
        </div>
      </AnimatePresence>

    </div>
  )
}

export default Carousel