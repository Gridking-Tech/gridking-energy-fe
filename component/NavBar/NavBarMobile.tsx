import React, { useState } from 'react'
import { RxHamburgerMenu } from 'react-icons/rx';
import { motion, AnimatePresence } from 'framer-motion';
import { navLinks } from '@/constant/imageArrayts';
import { IoSearch } from 'react-icons/io5';
export default function NavBarMobile() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className='h-full w-full'>
      <div className='w-full xl:hidden'>
        <div className='w-[90%] px-2 h-[3.4rem]  bg-white flex mx-auto justify-between items-center rounded-[0.7rem] shadow'>
          <div className='text-black text-lg font-bold'>Logo</div>
          <motion.div
            onClick={() => setIsOpen(!isOpen)}
            whileTap={{ scale: 0.8 }}
            className='cursor-pointer'
          >
            <div className='flex items-center gap-2'>
              <IoSearch size={25} color='black' />
              <RxHamburgerMenu size={25} color='black' />
            </div>
          </motion.div>
        </div>
      </div>
      <AnimatePresence >
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
            className='w-full h-full bg-white flex justify-center items-center shadow-lg'
          >
            <ul className='text-black space-y-2'>
              {
                navLinks.map(({ link, index }: any) => (
                  <li key={index} className='text-2xl text-black'>{link}</li>
                ))
              }
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
