"use client";
import React, { useEffect, useState } from "react";
import { navLinks } from "../../constants/constants";
import { motion, useAnimation } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { Logo } from "../Icons";
import ThemeToggle from "@/components/ThemeToggle";
import { productsApi } from "@/api";

export default function DesktopHeader({
  isBannerPage = false,
}: {
  isBannerPage?: boolean;
}) {
  const [isCategories, setIscategories] = useState(false);
  const pathname = usePathname();
  const [activeCategory, setActiveCategory] = useState<any>(null);
  const routes = useRouter();
  const [dropdownPosition, setDropdownPosition] = useState({
    left: 0,
    width: 0,
  });

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const controls = useAnimation();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!hasMounted) return;
      if (window.scrollY > 15) {
        controls.start({
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
  }, [controls, hasMounted]);

  const getDropdownWidth = () => {
    const itemCount = activeCategory?.length || 0;
    if (itemCount > 4) return "w-[97%] min-h-[15rem] rounded-[1.5rem]";
    if (itemCount > 2) return "w-[25rem] min-h-[10rem] p-4 rounded-[0.8rem]";
    return "w-[15rem] min-h-[6rem] p-4  rounded-[0.8rem]";
  };

  const Hamburger = ({
    open,
    onClick,
    isBannerPage,
  }: {
    open: boolean;
    onClick: () => void;
    isBannerPage: boolean;
  }) => (
    <button
      className="md:hidden flex flex-col justify-center items-center w-10 h-10 focus:outline-none"
      aria-label="Toggle menu"
      onClick={onClick}
    >
      <span
        className={`block h-0.5 w-6 transform transition duration-300 ease-in-out ${
          open ? "rotate-45 translate-y-1.5" : ""
        } ${isBannerPage ? "bg-white" : "bg-current"}`}
      />
      <span
        className={`block h-0.5 w-6 my-1 transition-all duration-300 ease-in-out ${
          open ? "opacity-0" : ""
        } ${isBannerPage ? "bg-white" : "bg-current"}`}
      />
      <span
        className={`block h-0.5 w-6 transform transition duration-300 ease-in-out ${
          open ? "-rotate-45 -translate-y-1.5" : ""
        } ${isBannerPage ? "bg-white" : "bg-current"}`}
      />
    </button>
  );

  const { data: categoriesData } = productsApi.useGetCategory() as {
    data: { data: any[] };
    isLoading: boolean;
    error: any;
  };

  const normalize = (str: string) =>
    str
      ?.toString()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
  const getCategoryIdBySlugOrName = (slugOrName: string) => {
    if (!slugOrName) return null;
    const norm = normalize(slugOrName);
    return (
      categoriesData?.data?.find(
        (cat) => normalize(cat.slug) === norm || normalize(cat.name) === norm
      )?._id || null
    );
  };

  return (
    <div>
      <div
        className={`flex-col justify-center flex items-center pt-4 pb-8 ${
          isBannerPage ? "bg-black" : "bg-[#F8F8F8]"
        }`}
      >
        <div className="w-5/6 h-[10vh] rounded-[0.5rem] flex justify-between items-center relative">
          <div
            className={`text-xl font-bold cursor-pointer ${
              isBannerPage ? "text-white" : "text-black"
            } md:static md:left-0 md:top-0 md:translate-y-0 absolute left-0 top-1/2 -translate-y-1/2`}
            onClick={() => routes.push("/")}
          >
            <Logo />
          </div>
          {/* Desktop nav */}
          <div className="hidden md:block">
            <ul
              className={`flex gap-10 ${
                isBannerPage ? "text-white" : "text-black"
              }`}
            >
              {navLinks.map((link, index) => {
                const isActive = pathname === link.href;
                return (
                  <li
                    key={index}
                    onClick={() => routes.push(`${link.href}`)}
                    className={`text-[0.95rem] cursor-pointer hover:text-[#F47A2B]/70 ${
                      isActive
                        ? "text-[#F47A2B] border-orange-500 font-bold"
                        : isBannerPage
                        ? "text-white"
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
          <div className="md:hidden flex items-center absolute right-0 top-1/2 -translate-y-1/2">
            <Hamburger
              open={mobileMenuOpen}
              onClick={() => setMobileMenuOpen((v) => !v)}
              isBannerPage={isBannerPage}
            />
          </div>
          <div className="flex items-center gap-8">
            <div className="hidden md:flex items-center gap-8">
              <ThemeToggle />
              <Link
                href={"/contact"}
                className="px-5 py-3 bg-[#F47A2B] text-white text-1xl rounded w-max hover:bg-[#e66c23] transition duration-300 hover:cursor-pointer"
              >
                {`LET'S CONNECT`}
              </Link>
            </div>
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
                {activeCategory?.map((category: any, index: any) => (
                  <div
                    key={index}
                    className="flex flex-col items-start flex-1 min-w-[20%] space-y-2"
                  >
                    <li
                      className={`text-black text-[1.04rem] font-black mb-2 ${
                        category.disabled
                          ? "cursor-not-allowed opacity-53"
                          : "hover:text-orange-500 cursor-pointer"
                      }`}
                      onClick={() => {
                        if (!category.disabled) {
                          const catId = getCategoryIdBySlugOrName(
                            category.slug || category.name
                          );
                          if (catId) {
                            routes.push(`/categories/${catId}`);
                            setIscategories(false);
                          }
                        }
                      }}
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
                          onClick={() => {
                            if (!sub.disabled) {
                              const subId = getCategoryIdBySlugOrName(
                                sub.slug || sub.name
                              );
                              if (subId) {
                                routes.push(`/categories/${subId}`);
                                setIscategories(false);
                              }
                            }
                          }}
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

        {mobileMenuOpen && (
          <div className="fixed inset-0 z-[200] md:hidden">
            <div
              className="absolute inset-0"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.25 }}
              className="fixed top-0 left-0 h-full w-full bg-white shadow-lg z-[201] flex flex-col"
            >
              <div className="flex items-center justify-between px-4 py-4 border-b">
                <div
                  className="text-xl font-bold cursor-pointer"
                  onClick={() => {
                    routes.push("/");
                    setMobileMenuOpen(false);
                  }}
                >
                  <Logo />
                </div>
                <button
                  className="w-8 h-8 flex items-center justify-center"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <span className="text-2xl">&times;</span>
                </button>
              </div>
              <nav className="flex-1 px-4 py-6 w-full">
                <ul className="flex flex-col gap-6">
                  {navLinks.map((link, idx) => (
                    <React.Fragment key={idx}>
                      <li>
                        <button
                          className={`w-full text-left text-lg py-2 px-2 rounded hover:bg-gray-100 ${
                            pathname === link.href
                              ? "text-[#F47A2B] font-bold"
                              : "text-[#1E1E1E]"
                          }`}
                          onClick={() => {
                            setMobileMenuOpen(false);
                            routes.push(link.href);
                          }}
                        >
                          {link.name}
                        </button>
                        {link.constant && Array.isArray(link.constant) && (
                          <ul className="ml-4 mt-1 flex flex-col gap-2">
                            {link.constant.map((cat: any, catIdx: number) => (
                              <li key={catIdx}>
                                <button
                                  className={`w-full text-left text-base py-1 px-2 rounded hover:bg-gray-50 ${
                                    cat.disabled
                                      ? "opacity-50 cursor-not-allowed"
                                      : ""
                                  }`}
                                  disabled={cat.disabled}
                                  onClick={() => {
                                    if (!cat.disabled) {
                                      setMobileMenuOpen(false);
                                      const catId = getCategoryIdBySlugOrName(
                                        cat.slug || cat.name
                                      );
                                      if (catId) {
                                        routes.push(`/categories/${catId}`);
                                      }
                                    }
                                  }}
                                >
                                  {cat.name}
                                </button>
                                {cat.subcategories &&
                                  Array.isArray(cat.subcategories) && (
                                    <ul className="ml-4 mt-1 flex flex-col gap-1">
                                      {cat.subcategories.map(
                                        (sub: any, subIdx: number) => (
                                          <li key={subIdx}>
                                            <button
                                              className={`w-full text-left text-sm py-1 px-2 rounded hover:bg-gray-50 ${
                                                sub.disabled
                                                  ? "opacity-50 cursor-not-allowed"
                                                  : ""
                                              }`}
                                              disabled={sub.disabled}
                                              onClick={() => {
                                                if (!sub.disabled) {
                                                  setMobileMenuOpen(false);
                                                  const subId =
                                                    getCategoryIdBySlugOrName(
                                                      sub.slug || sub.name
                                                    );
                                                  if (subId) {
                                                    routes.push(
                                                      `/categories/${subId}`
                                                    );
                                                  }
                                                }
                                              }}
                                            >
                                              {sub.name}
                                            </button>
                                          </li>
                                        )
                                      )}
                                    </ul>
                                  )}
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                      {link.name === "About Us" && (
                        <li>
                          <Link
                            href="/contact"
                            className="block w-full text-center bg-[#F47A2B] text-white py-2 rounded hover:bg-[#e66c23] transition"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {`LET'S CONNECT`}
                          </Link>
                        </li>
                      )}
                    </React.Fragment>
                  ))}
                </ul>
              </nav>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
