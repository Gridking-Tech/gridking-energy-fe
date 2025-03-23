import React, { useState } from 'react'
import { RxHamburgerMenu } from 'react-icons/rx';
import { motion, AnimatePresence } from 'framer-motion';
import { navLinks } from '@/constant/constants';
import { IoSearch } from 'react-icons/io5';
export default function NavBarMobile() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className='h-full w-full'>
      <div className='w-full xl:hidden'>
        <div className='w-full px-4 h-[3.4rem]  bg-white flex mx-auto justify-between items-center rounded-[0.7rem] shadow'>
          <div className='text-black text-lg font-bold'>GridKing</div>
          <motion.div
            onClick={() => setIsOpen(!isOpen)}
            whileTap={{ scale: 0.8 }}
            className='cursor-pointer'
          >
            <div className='flex items-center gap-2'>
              <IoSearch size={22} color='black' />
              <RxHamburgerMenu size={22} color='black' />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
