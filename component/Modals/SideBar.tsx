import { ProductsLinks, SupportServiceLinks, ContactLinks } from '@/constant/constants';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';
import { CgProfile } from 'react-icons/cg';
import { FaGlobe } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { navLinks } from '@/constant/constants';

const SideBar = ({ isOpen, setIsOpen }: any) => {
  const [expanded, setExpanded] = useState<string | null>(null);

  const handleToggle = (category: any) => {
    setExpanded(expanded === category ? null : category);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50">
          <motion.div
            className="fixed inset-0 bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />

          <motion.div
            className="fixed top-0 right-0 h-full w-[85%] max-w-[400px] bg-white shadow-lg z-50 flex flex-col"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <div className="flex justify-end p-4">
              <button className="text-black text-2xl" onClick={() => setIsOpen(false)}>
                <IoMdClose />
              </button>
            </div>

            <div className="flex items-center px-6 py-4 border-b space-x-3">
              <CgProfile size={24} className="text-gray-600" />
              <span className="text-sm font-medium text-gray-800">Sign In or Sign Up</span>
            </div>

            <motion.ul className="flex flex-col p-4 space-y-4">
              {navLinks.map((navItem) => (
                <div key={navItem.name}>
                  <li className="flex justify-between items-center text-lg text-black font-medium my-2 cursor-pointer" onClick={() => handleToggle(navItem.name)}>
                    <span>{navItem.name}</span>
                    {navItem.constant && (
                      <motion.div animate={{ rotate: expanded === navItem.name ? 90 : 0 }}>
                        <MdKeyboardArrowRight />
                      </motion.div>
                    )}
                  </li>
                  <AnimatePresence>
                    {expanded === navItem.name && navItem.constant && (
                      <motion.ul
                        className="pl-6 space-y-2"
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={{
                          hidden: {},
                          visible: {
                            transition: { staggerChildren: 0.15 } 
                          }
                        }}
                      >
                        {navItem.constant.map((link) => (
                          <motion.li
                            key={link.name}
                            className="text-gray-600 my-4 text-base"
                            variants={{
                              hidden: { opacity: 0, x: -20 }, 
                              visible: { opacity: 1, x: 0, transition: { ease: "easeOut", duration: 0.3 } } 
                            }}
                          >
                            {link.name}
                          </motion.li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>

                </div>
              ))}
            </motion.ul>

            <div className="mt-auto p-4 border-t flex justify-between items-center">
              <span className="text-gray-600">Language</span>
              <FaGlobe size={18} className="text-gray-600" />
              <span className="text-gray-600">EN</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SideBar;
