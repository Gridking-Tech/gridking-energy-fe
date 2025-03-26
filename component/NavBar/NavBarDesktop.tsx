import { navLinks } from '@/constant/constants';
import { AnimatePresence, motion, useAnimation } from 'framer-motion';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { CgProfile } from 'react-icons/cg';
import { FaGlobe } from 'react-icons/fa';
import { IoSearch } from 'react-icons/io5';
import SearchModals from '../Modals/SearchModals';


export default function NavBarDesktop() {
    const [isCategories, setIscategories] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const pathname = usePathname();
    const [activeCategory, setActiveCategory] = useState<any>(null);
    const routes = useRouter()

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
    }, [controls]);

    const getDropdownWidth = () => {
        const itemCount = activeCategory.length;
        if (itemCount > 4) return 'w-[97%] min-h-[15rem] rounded-[1.5rem]';
        if (itemCount > 2) return 'w-[25rem] min-h-[10rem] rounded-[0.8rem]';
        return 'w-[15rem] min-h-[8rem] rounded-[0.8rem]';
    };

    return (
        <div className=''>
            <motion.div
                animate={controls}
                initial={{ width: "90%", borderRadius: "0.5rem", top: '17px' }}
                className="  flex-col justify-center flex fixed left-1/2  transform -translate-x-1/2 z-[100] bg-transparent ">
                <motion.div
                    className="w-full md:px-7 h-[3.5rem] bg-white rounded-[0.5rem]   flex mx-auto justify-between items-center shadow">
                    <div className="text-black text-lg font-bold">GridKing</div>
                    <motion.div>
                        <ul className="text-black flex gap-10">
                            {navLinks.map((link, index) => {
                                const isActive = pathname === link.href;
                                return (
                                    <li
                                        key={index}
                                        onClick={() => routes.push('/')}
                                        className={`text-[0.95rem] cursor-pointer hover:text-orange-500 font-bold ${isActive ? 'text-orange-500 border-orange-500' : 'text-black'
                                            }`}
                                        onMouseEnter={() => {
                                            if (link.constant) {
                                                setActiveCategory(link.constant);
                                                setIscategories(true);
                                            } else {
                                                setIscategories(false);
                                            }
                                        }}

                                    >
                                        {link.name}
                                    </li>
                                );
                            })}
                        </ul>
                    </motion.div>
                    <div className="flex items-center gap-7">
                        <IoSearch size={25} color="black" className="cursor-pointer" onClick={() => setShowSearch(!showSearch)} />
                        <CgProfile size={25} color="black" className="cursor-pointer" onClick={() => routes.push('/contact')} />
                        <FaGlobe size={25} color="black" className="cursor-pointer" />
                    </div>
                </motion.div>

                <div className="w-full flex justify-center relative   h-full">
                    {isCategories && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className={`${getDropdownWidth()} mx-auto h-auto  absolute  px-6  mt-2 bg-white fixed z-[100] flex items-center shadow-lg justify-center`}
                            onMouseLeave={() => setIscategories(false)}
                        >
                            <ul className={`w-full flex  justify-between ${activeCategory.length > 4 ? 'flex-wrap' : 'flex-col'}`}>
                                {activeCategory?.map((category: any, index: any) => (
                                    <div key={index} className="flex flex-col items-start">
                                        <li
                                            className="text-black text-[1.04rem] cursor-pointer font-black"
                                            onClick={() => routes.push(`/collections/${category.name}`)}
                                        >
                                            {category.name}
                                        </li>

                                        {category.subcategories &&
                                            category.subcategories.map((sub: any, subIndex: any) => (
                                                <li key={subIndex} className="my-2 text-[0.9rem] cursor-pointer text-gray-800" onClick={() => routes.push(`${sub.href}`)}>
                                                    {sub.name}
                                                </li>
                                            ))}
                                    </div>
                                ))}
                            </ul>
                        </motion.div>
                    )}
                </div>


            </motion.div>
            <div className=''>
                <SearchModals showSearch={showSearch} setShowSearch={setShowSearch} />
            </div>
        </div>
    );
}
