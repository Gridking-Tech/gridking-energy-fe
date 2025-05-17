import React from "react";
import Image from "next/image";
import Link from "next/link";

const ProductLists = () => {
  const inverters = [
    {
      id: 1,
      name: "SP Series Inverter 1kVA 55V-450V",
      rating: 5,
      reviews: 99,
      image: "https://via.placeholder.com/300x300?text=Inverter+1kVA",
      isNew: true,
    },
    {
      id: 2,
      name: "SP Series Inverter 2kVA 55V-450V",
      rating: 4.5,
      reviews: 25,
      image: "https://via.placeholder.com/300x300?text=Inverter+2kVA",
      isNew: false,
    },
    {
      id: 3,
      name: "SP Series Inverter 3kVA 55V-450V",
      rating: 4.7,
      reviews: 45,
      image: "https://via.placeholder.com/300x300?text=Inverter+3kVA",
      isNew: false,
    },
    {
      id: 4,
      name: "SP Series Inverter 4kVA 55V-450V",
      rating: 4.8,
      reviews: 78,
      image: "https://via.placeholder.com/300x300?text=Inverter+4kVA",
      isNew: false,
    },
    {
      id: 5,
      name: "SP Series Inverter 5kVA 55V-450V",
      rating: 4.6,
      reviews: 34,
      image: "https://via.placeholder.com/300x300?text=Inverter+5kVA",
      isNew: false,
    },
    {
      id: 6,
      name: "SP Series Inverter 6kVA 55V-450V",
      rating: 4.9,
      reviews: 56,
      image: "https://via.placeholder.com/300x300?text=Inverter+6kVA",
      isNew: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <nav className="text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:text-orange-500">
            Home
          </Link>{" "}
          / <span className="text-gray-900 font-medium">Inverters</span>
        </nav>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {inverters.map((inverter) => (
            <div
              key={inverter.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative">
                <Image
                  src={inverter.image}
                  alt={inverter.name}
                  width={300}
                  height={300}
                  className="w-full h-64 object-cover"
                />
                {inverter.isNew && (
                  <span className="absolute top-2 left-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded">
                    NEW
                  </span>
                )}
                <div className="absolute top-2 right-2 text-gray-300">
                  <svg
                    className="w-6 h-6 hover:text-red-500 cursor-pointer"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {inverter.name}
                </h3>
                <div className="flex items-center mt-2">
                  {Array.from({ length: 5 }, (_, i) => (
                    <svg
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(inverter.rating)
                          ? "text-yellow-400"
                          : i < inverter.rating
                          ? "text-yellow-400 opacity-50"
                          : "text-gray-300"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <Link
                    href={`/product/${inverter.id}`}
                    className="ml-2 text-sm text-gray-600 underline hover:bg-gray-200 transition-colors"
                  >
                    View product
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductLists;
