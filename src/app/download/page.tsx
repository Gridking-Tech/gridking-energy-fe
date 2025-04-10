'use client'
import { homePageApi, productsApi } from '@/src/api'
import NavBar from '@/src/shared/NavBar/NavBar'
import ImagePlaceholder from '@/src/shared/Placeholders/ImagePlaceholder'
import React from 'react'
import Image from 'next/image'
import Footer from '@/src/shared/Footer'

function downloadPage() {
  const { data: downloadData, isLoading } = productsApi.useGetDownload() as {
    data: any[]
    isLoading: boolean
    error: any
  }

  const { data: ImageId, } = homePageApi.useGetCarouselById(
    "67ec910d2d2e858db2b1ca2a"
  ) as {
    data: any;
    isLoading: boolean;
    error: any;
  };


  console.log(downloadData)

  return (
    <div className='w-full h-screen'>
      <div className='h-0'>
        <NavBar />
      </div>
      <div className="w-full">
        {ImageId?.[0]?.url.length > 0 ? (
          <div className="relative w-full h-[25.5rem]">
            <Image
              src={ImageId?.[0]?.url}
              alt="Banner"
              style={{ objectFit: "cover" }}
              fill
              className="absolute w-full h-full"
            />
            <div className="absolute inset-0 bg-black/30"></div>
          </div>
        ) : (
          <ImagePlaceholder height={'25.5rem'} />
        )}
      </div>
      <div className="w-full flex pl-20  font-bold justify-center flex-col  h-[3.5rem] bg-gray-200">
        {'HOME > DOWNLOADS'}
      </div>
      <div className='w-full  flex '>
        <div className='w-1/4 pl-10 overflow-y-hidden  pt-5 text-sm  space-y-4'>
          {downloadData?.map((file) => (
            <a
              key={file._id}
              href={`#${file._id}`}
              className='block text-gray-700  font-black text-lg hover:text-orange-600 transition'
            >
              {file.title}
            </a>
          ))}
        </div>

        <div className='w-3/4 px-10 pl-8 py-6 border-l-2  '>
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="animate-pulse space-y-2">
                  <div className="h-20 w-full bg-gray-300 rounded" />
                  <div className="h-20 w-full bg-gray-200 rounded" />
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-6 w-full h-[40rem]">
              {downloadData?.map((file) => (
                <div
                  key={file._id}
                  id={file._id} // 👈 anchor target
                  className="p-4 border rounded-lg hover:shadow-sm flex w-full justify-between transition-all scroll-mt-20"
                >
                  <div>
                    <div className="font-semibold text-lg text-orange-600">{file.title}</div>
                    <p className="text-gray-600 text-sm mt-1">{file.description}</p>
                    <div className="text-sm text-gray-400 mt-1">
                      {(file.fileSize / (1024 * 1024)).toFixed(2)} MB
                    </div>
                  </div>
                  <div>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={file.url}
                      download
                      className="mt-2 inline-block text-sm text-white bg-orange-500 px-4 py-3 rounded hover:bg-orange-600"
                    >
                      Download PDF
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />

    </div>
  )
}

export default downloadPage