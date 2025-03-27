'use client';
import NavBar from '@/component/NavBar/NavBar';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { ProductsLinks } from '@/constant/constants';
import { motion, AnimatePresence } from 'framer-motion';

function ProductsPage() {
  const { name } = useParams<any>();
  const router = useRouter();
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [expandedSubcategory, setExpandedSubcategory] = useState<string | null>(null);
  const [activeSubcategory, setActiveSubcategory] = useState<string | null>(null);
  
  useEffect(() => {
    let foundParent: string | null = null;
    let foundSubcategory: string | null = null;

    ProductsLinks.forEach((category) => {
      if (category.name.toLowerCase() === (Array.isArray(name) ? name[0].toLowerCase() : name?.toLowerCase())) {
        foundParent = category.name;
      }

      category.subcategories?.forEach((sub) => {
        if (sub.name.toLowerCase() === (Array.isArray(name) ? name[0].toLowerCase() : name?.toLowerCase())) {
          foundParent = category.name;
          foundSubcategory = sub.name;
        }
      });
    });

    if (foundParent) {
      setExpandedCategory(foundParent);
    }
    if (foundSubcategory) {
      setActiveSubcategory(foundSubcategory);
    }
  }, [name]);

  const toggleCategory = (categoryName: string) => {
    setExpandedCategory((prev) => (prev === categoryName ? null : categoryName));
  };

  const toggleSubcategory = (subcategoryName: string) => {
    setExpandedSubcategory((prev) => (prev === subcategoryName ? null : subcategoryName));
  };

  const handleNavigation = (path: string, isSubcategory = false) => {
    router.push(path);
    if (isSubcategory) {
      setActiveSubcategory(path.split('/').pop() || null);
    } else {
      setActiveSubcategory(null);
    }
  };

  return (
    <div className="w-full">
      <NavBar />
      <div className="w-full">
        <Image
          src="/assets/images/pexels-kseniachernaya-3965534.jpg"
          alt="Category Banner"
          width={1920}
          height={600}
          className="w-full h-[30rem] object-cover"
        />
        <div className="text-gray-700 flex items-center px-10 w-full bg-gray-300/40 h-[3rem]">
          {`Home > ${name}`}
        </div>
      </div>

      <div className="flex flex-col md:flex-row px-4 md:px-10 py-8">
        <div className="w-full md:w-1/4 pr-6 border-r md:block">
          <h3 className="font-bold text-xl text-black mb-4">CATEGORIES</h3>
          <ul>
            {ProductsLinks.map((category) => (
              <li key={category.name} className="mb-3">
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => handleNavigation(`/collections/${category.name}`)}
                    className={`block font-semibold ${category.name ===  decodeURIComponent(name) ? 'text-orange-500' : 'text-gray-700'}`}
                  >
                    {category.name}
                  </button>
                  {category.subcategories && (
                    <button
                      className="text-gray-500 text-[0.9rem] cursor-pointer focus:outline-none"
                      onClick={() => toggleCategory(category.name)}
                    >
                      {expandedCategory === category.name ? '-' : '+'}
                    </button>
                  )}
                </div>


                <AnimatePresence>
                  {category.subcategories && expandedCategory === category.name && (
                    <motion.ul
                      className="ml-4 mt-2 overflow-hidden"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      {category.subcategories.map((sub) => (
                        <li key={sub.name} className="mb-2">
                          <div className="flex justify-between items-center">
                            <button
                              onClick={() => handleNavigation(`/collections/${sub.name}`, true)}
                              className={`text-sm ${activeSubcategory === sub.name ? 'text-orange-500 font-semibold' : 'text-gray-600'}`}
                            >
                              {sub.name}
                            </button>
                            {/* <button
                              className="text-gray-500 text-[0.8rem] cursor-pointer focus:outline-none"
                              onClick={() => toggleSubcategory(sub.name)}
                            >
                              {expandedSubcategory === sub.name ? '-' : '+'}
                            </button> */}
                          </div>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </li>
            ))}
          </ul>
        </div>

        {/* Products Section */}
        <div className="w-full md:w-3/4">
          <h2 className="text-2xl text-bold text-black font-bold mb-6">{decodeURIComponent(name)}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ProductsLinks.find(cat => cat.name.toLowerCase() === (Array.isArray(name) ? name[0].toLowerCase() : name?.toLowerCase()))?.subcategories?.length ? (
              ProductsLinks.find(cat => cat.name.toLowerCase() === (Array.isArray(name) ? name[0].toLowerCase() : name?.toLowerCase()))?.subcategories?.map((subcategory) => (
                <div key={subcategory.name} className="border p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">{subcategory.name}</h3>
                  {subcategory.images && subcategory.images.length > 0 ? (
                    <div className="grid grid-cols-1 gap-2">
                      {subcategory.images.map((image, index) => (
                        <Image
                          key={index}
                          src={image}
                          alt={subcategory.name}
                          width={300}
                          height={200}
                          className="rounded w-full h-auto"
                        />
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm">No images available.</p>
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-500">No products available for this category.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductsPage;
