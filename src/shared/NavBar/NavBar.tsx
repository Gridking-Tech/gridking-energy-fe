'use client'
import { useEffect, useState } from 'react';
import NavBarMobile from './NavBarMobile';
import NavBarDesktop from './NavBarDesktop';
import { motion, } from 'framer-motion';

export default function NavBar() {
  const [isMobile, setIsMobile] = useState(false);


  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1280);
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <div className='w-full h-full z-50 relative'>
      {isMobile ?
        <div className='fixed z-30] w-full'>
          <NavBarMobile />
        </div> :
        <motion.div>
          <NavBarDesktop />
        </motion.div>
      }
    </div>
  );
}
