import { navLinks } from '@/constant/imageArrayts'
import { motion } from 'framer-motion'
import React from 'react'
import { CgProfile } from 'react-icons/cg'
import { FaGlobe } from 'react-icons/fa'
import { IoSearch } from 'react-icons/io5';

export default function NavBarDesktop() {
    const [isOpen, setIsOpen] = React.useState(false)
    return (
        <div className='h-fullw-full justify-center hidden xl:flex'>
                <div className='w-[90%] px-4 h-[3.5rem]  bg-white flex mx-auto justify-between items-center rounded-[0.7rem] shadow'>
                    <div className='text-black text-lg font-bold'>Logo</div>
                    <motion.div
                        onClick={() => setIsOpen(!isOpen)}
                        whileTap={{ scale: 0.8 }}
                        className='cursor-pointer'
                    >
                        <ul className='text-black  flex gap-10  '>
                            {
                                navLinks.map((link, index) => (
                                    <li key={index} className='text-[0.9rem] font-bold text-black'>{link.name}</li>
                                ))
                            }
                        </ul>
                    </motion.div>
                    <div className='flex items-center gap-4'>
                        <IoSearch size={25} color='black' className='cursor-pointer'/>
                        <CgProfile size={25} color='black' className='cursor-pointer'/>
                        <FaGlobe size={25} color='black' className='cursor-pointer'/>
                    </div>
                </div>
        </div>
    )
}
