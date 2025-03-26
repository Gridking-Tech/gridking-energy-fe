import React, { useState } from 'react';
import Image from 'next/image';
import { newsItems } from '@/constant/constants';

const NewsShowcase = () => {
  const [activeNews, setActiveNews] = useState(newsItems[0]);

  return (
    <div className="w-full flex flex-col text-black items-center bg-gray-100 p-6">
      <h2 className="md:text-5xl text-3xl font-bold my-20">NEWSROOM</h2>

      <div className="flex flex-col md:flex-row items-center w-[90%] mx-auto gap-6">
        <div className="relative w-full md:w-[65%] h-[250px] md:h-[450px] bg-white shadow-lg rounded-lg overflow-hidden">
          <Image
            src={activeNews.image}
            alt={`News - ${activeNews.id}`}
            width={800}
            height={450}
            className="object-cover w-full h-full"
          />
          <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 to-transparent p-4">
            <p className="text-sm text-orange-400">{activeNews.date}</p>
          </div>
        </div>

        <div className="flex md:flex-col w-full md:w-[35%] gap-4 items-center">
          {newsItems.map((item) => (
            <div
              key={item.id}
              className={`w-[80%] md:w-[85%] h-[100px] md:h-[130px] cursor-pointer rounded-lg overflow-hidden shadow-md border ${
                activeNews.id === item.id ? 'border-orange-500' : 'border-transparent'
              }`}
              onClick={() => setActiveNews(item)}
            >
              <Image
                src={item.image}
                alt={`Thumbnail - ${item.id}`}
                width={150}
                height={100}
                className="object-cover w-full h-full"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsShowcase;
