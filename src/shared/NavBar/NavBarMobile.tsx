import React, { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { motion, AnimatePresence } from "framer-motion";
import { IoSearch } from "react-icons/io5";
import SideBar from "../Modals/SideBar";
import SearchModals from "../Modals/SearchModals";
import { useRouter } from "next/navigation";

export default function NavBarMobile() {
  const [isOpen, setIsOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const routes = useRouter();

  return (
    <div className="  fixed top-0 z-60 w-full">
      <div className="w-full xl:hidden">
        <div className="w-full px-4 h-[4.4rem] bg-white flex justify-between items-center shadow-md">
          <div className="text-black text-2xl font-bold" onClick={() =>routes.push('/')}>GridKing</div>
          <motion.div className="cursor-pointer ">
            <div className="flex items-center gap-2">
              <IoSearch size={30} color="black" onClick={() => setShowSearch(!showSearch)} />
              <RxHamburgerMenu size={30} color="black" onClick={() => setIsOpen(!isOpen)} />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Sidebar & Search Modal */}
      <AnimatePresence>
        {showSearch && <SearchModals showSearch={showSearch} setShowSearch={setShowSearch} />}
      </AnimatePresence>
      {isOpen && <SideBar isOpen={isOpen} setIsOpen={setIsOpen} />}
    </div>
  );
}
