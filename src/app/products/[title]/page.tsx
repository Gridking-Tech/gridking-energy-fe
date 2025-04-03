'use client'
import { useParams } from 'next/navigation'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { ProductsLinks } from '@/src/constants/constants'
import ImagePlaceholder from '@/src/shared/Placeholders/ImagePlaceholder'
import Button from '@/src/shared/util/Button'
import NavBar from '@/src/shared/NavBar/NavBar'
import Input from '@/src/shared/util/Inputs'
import ProductDetailModal from '@/src/shared/Modals/ProductDetailModal'

const ProductDetails = () => {
  const { title } = useParams<any>()
  const titles = decodeURIComponent(title)
  const [product, setProduct] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false) // Modal state

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    country: '',
    email: '',
    phone: '',
    requirements: ''
  })

  useEffect(() => {
    const category = ProductsLinks.find((category) =>
      category.subcategories?.some(sub => sub.name.toLowerCase() === titles.toLowerCase())
    )
    const subcategory = category?.subcategories?.find(
      sub => sub.name.toLowerCase() === titles.toLowerCase()
    )
    setProduct(subcategory || null)
  }, [titles])

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission logic here
    console.log(formData)
    // Close the modal after submission
    setIsModalOpen(false)
  }

  if (!product) {
    return <div className='text-black'>Product not found</div>
  }

  return (
    <div className="text-black">
      <NavBar />
      <div className="mb-6">
        <ImagePlaceholder />
      </div>
      <div className="flex flex-col md:flex-row gap-6 justify-center mx-auto items-center px-4">
        <div className="flex flex-col gap-6 w-full md:w-2/3">
          {product.images?.map((image: string, index: number) => (
            <div key={index} className="text-center">
              <Image
                src={image}
                alt={product.name}
                width={500}
                height={300}
                className="rounded-lg w-[70%] mx-auto h-[25rem] object-cover"
              />
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center md:items-start w-full md:w-1/3 px-4">
          <h1 className="text-3xl md:text-4xl font-black mb-2 text-center md:text-left">{product.name}</h1>
          <Button title="Order Now" onClick={() => setIsModalOpen(true)} />
        </div>
      </div>

      {isModalOpen && (
        <ProductDetailModal
          formData={formData}
          setFormData={setFormData}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </div>
  )
}

export default ProductDetails
