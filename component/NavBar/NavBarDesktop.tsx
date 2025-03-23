import { navLinks } from '@/constant/constants'
import { constants } from 'buffer'
import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { CgProfile } from 'react-icons/cg'
import { FaGlobe } from 'react-icons/fa'
import { IoSearch } from 'react-icons/io5';

export default function NavBarDesktop() {
    const [isOpen, setIsOpen] = React.useState(false)
    const [isCategories, setIscategories] = useState(false)
    const [categories, setCategories] = useState([])
    return (
        <div className='h-full w-full flex-col justify-center hidden xl:flex'>
            <div className='w-full md:px-4 h-[3.5rem]  bg-white flex mx-auto justify-between items-center rounded-[0.7rem] shadow'>
                <div className='text-black text-lg font-bold'>GridKing</div>
                <motion.div>
                    <ul className='text-black  flex gap-10  '>
                        {
                            navLinks.map((link, index) => (
                                <li key={index} className='text-[0.9rem] cursor-pointer font-bold text-black' onMouseLeave={() => setIscategories(false)} onMouseOver={() => setIscategories(!isCategories)}>{link.name}</li>
                            ))
                        }
                    </ul>
                </motion.div>
                <div className='flex items-center gap-4'>
                    <IoSearch size={25} color='black' className='cursor-pointer' />
                    <CgProfile size={25} color='black' className='cursor-pointer' />
                    <FaGlobe size={25} color='black' className='cursor-pointer' />
                </div>
            </div>
            <div className='w-full  h-full'>
                {
                    isCategories && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className='w-full h-[20rem] rounded-[2rem]  mt-5 bg-black fixed z-50 flex justify-center items-center shadow-lg'
                        >
                            <ul className=' z-50 space-y-2'>
                                {
                                    navLinks.map(({ link, index }: any) => (
                                        <div>
                                            <li key={index} className='text-2xl text-white'>{link?.name}</li>
                                            {
                                                link?.constant.map((item: any, index: any) => (
                                                    <li key={index} className='text-2xl text-white'>{item}</li>
                                                ))
                                            }
                                        </div>
                                    ))
                                }
                            </ul>
                        </motion.div>
                    )
                }
            </div>
        </div>
    )
}
