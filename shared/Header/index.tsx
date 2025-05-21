"use client";
import React, { useEffect, useState } from "react";
import { navLinks } from "../../constants/constants";
import { motion, useAnimation } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { Logo } from "../Icons";
import ThemeToggle from "@/components/ThemeToggle";

export default function DesktopHeader() {
  const [isCategories, setIscategories] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const pathname = usePathname();
  const [activeCategory, setActiveCategory] = useState<any>(null);
  const routes = useRouter();
  const [dropdownPosition, setDropdownPosition] = useState({
    left: 0,
    width: 0,
  });

  const controls = useAnimation();
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 15) {
        controls?.start({
          width: "100%",
          top: 0,
          borderRadius: 0,
          transition: { duration: 0.4, ease: "easeIn" },
        });
      } else {
        controls.start({
          width: "90%",
          top: "10px",
          borderRadius: "0.7rem",
          transition: { duration: 0.4, ease: "easeOut" },
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [controls]);

  const getDropdownWidth = () => {
    const itemCount = activeCategory.length;
    if (itemCount > 4) return "w-[97%] min-h-[15rem] rounded-[1.5rem]";
    if (itemCount > 2) return "w-[25rem] min-h-[10rem] p-4 rounded-[0.8rem]";
    return "w-[15rem] min-h-[6rem] p-4  rounded-[0.8rem]";
  };

  return (
    <div>
      <div className="flex-col justify-center flex items-center bg-transparent">
        <div className="w-5/6 h-[10vh] rounded-[0.5rem] flex  justify-between items-center">
          <div
            className="text-black text-xl font-bold cursor-pointer"
            onClick={() => routes.push("/")}
          >
            <Logo />
          </div>
          <div>
            <ul className="text-black flex gap-10">
              {navLinks.map((link, index) => {
                const isActive = pathname === link.href;
                return (
                  <li
                    key={index}
                    onClick={() => routes.push(`${link.href}`)}
                    className={`text-[0.95rem] cursor-pointer  hover:text-[#F47A2B]/70  ${
                      isActive
                        ? "text-[#F47A2B] border-orange-500 font-bold"
                        : "text-[#1E1E1E] dark:text-white"
                    }`}
                    onMouseEnter={(e) => {
                      if (link.constant) {
                        setActiveCategory(link.constant);
                        setIscategories(true);
                        const rect = e.currentTarget.getBoundingClientRect();
                        setDropdownPosition({
                          left: rect.left,
                          width: rect.width,
                        });
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
          </div>
          <div className="flex items-center gap-8">
            <ThemeToggle />
            <Link
              href={"/contact"}
              className=" px-5 py-3 bg-[#F47A2B] text-white text-1xl rounded w-max hover:bg-[#e66c23] transition duration-300 hover:cursor-pointer"
            >
              {`LET'S CONNECT`}
            </Link>
          </div>
        </div>

        <div className="w-[1900px] flex  relative  justify-center  h-full">
          {isCategories && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className={`${getDropdownWidth()} mx-auto h-auto  absolute px-3  mt-2 bg-white z-[100] flex-col items-center shadow-lg justify-center`}
              onMouseLeave={() => setIscategories(false)}
            >
              <ul className="w-full flex flex-wrap gap-8 justify-between">
                {" "}
                {/* Ensure categories are evenly spaced */}
                {activeCategory?.map((category: any, index: any) => (
                  <div
                    key={index}
                    className="flex flex-col items-start flex-1 min-w-[20%] space-y-2"
                  >
                    {" "}
                    {/* Adjusted to allow flexible width for each category */}
                    <li
                      className={`text-black text-[1.04rem] font-black mb-2 ${
                        category.disabled
                          ? "cursor-not-allowed opacity-53"
                          : "hover:text-orange-500 cursor-pointer"
                      }`}
                      onClick={() =>
                        routes.push(
                          !category.routes
                            ? category.href
                            : `/collections/${category.name}`
                        )
                      }
                    >
                      {category.name}
                    </li>
                    {category.subcategories &&
                      category.subcategories.map((sub: any, subIndex: any) => (
                        <li
                          key={subIndex}
                          className={`my-1 text-[0.9rem] text-gray-800 whitespace-nowrap ${
                            sub.disabled
                              ? "cursor-not-allowed opacity-50"
                              : "hover:bg-gray-100 cursor-pointer"
                          }`}
                          onClick={() =>
                            routes.push(
                              `/collections/${category.name}/${sub.name}`
                            )
                          }
                        >
                          {sub.name}
                        </li>
                      ))}
                  </div>
                ))}
              </ul>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
