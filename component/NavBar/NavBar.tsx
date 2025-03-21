import React, { useState } from 'react';
import NavBarMobile from './NavBarMobile';
import { AnimatePresence, motion } from 'framer-motion';
import { navLinks } from '@/constant/imageArrayts';
import { CgProfile } from 'react-icons/cg';
import { FaGlobe } from 'react-icons/fa';
import NavBarDesktop from './NavBarDesktop';

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className='w-full h-full  mt-5'>
      <div>
        <NavBarMobile />
      </div>
      <div>
       <NavBarDesktop/>
      </div>
    </div>
  );
}