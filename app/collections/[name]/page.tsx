'use client'
import NavBar from '@/component/NavBar/NavBar'
import { useParams, useSearchParams } from 'next/navigation'
import React from 'react'

function ProductsPage() {
    const id = useParams()
  return (
    <div className='w-full'>
      <div>
        <NavBar />
      </div>
      <div className='w-full '>
        <div className='w-full'>
          <img src="/assets/images/pexels-kseniachernaya-3965534.jpg" alt="dynamic static img" className='w-full h-[30rem] object-cover'/>
        </div>
        <div className='text-gray-700 flex items-center px-10  w-full bg-gray-300/40 h-[3rem]'>
          {` Home > ${id.name}`}
        </div>
      </div>
    </div>
  )
}

export default ProductsPage