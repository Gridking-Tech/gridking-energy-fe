import React, { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { motion, AnimatePresence } from "framer-motion";
import { IoSearch } from "react-icons/io5";
import SideBar from "../Modals/SideBar";
import SearchModals from "../Modals/SearchModals";

export default function NavBarMobile() {
  const [isOpen, setIsOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  return (
    <div className="h-full z-50 w-full">
      <div className="w-full xl:hidden">
        <div className="w-full px-4 h-[3.4rem] bg-white flex justify-between items-center shadow-md">
          <div className="text-black text-lg font-bold">GridKing</div>
          <motion.div className="cursor-pointer">
            <div className="flex items-center gap-2">
              <IoSearch size={25} color="black" onClick={() => setShowSearch(!showSearch)} />
              <RxHamburgerMenu size={25} color="black" onClick={() => setIsOpen(!isOpen)} />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Sidebar & Search Modal */}
      <AnimatePresence>
        {isOpen && <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />}
        {showSearch && <SearchModals showSearch={showSearch} setShowSearch={setShowSearch} />}
      </AnimatePresence>
    </div>
  );
}
