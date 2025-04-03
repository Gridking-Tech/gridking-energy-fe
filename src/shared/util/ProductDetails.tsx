'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Button from '@/src/shared/util/Button'
import NavBar from '@/src/shared/NavBar/NavBar'
import Input from '@/src/shared/util/Inputs'
import ProductDetailModal from '@/src/shared/Modals/ProductDetailModal'
import ImagePlaceholder from '@/src/shared/Placeholders/ImagePlaceholder'

interface ProductDetailsProps {
  productTitle: string;
  productsData: any[];
}

const ProductDetails = ({ productTitle, productsData }: ProductDetailsProps) => {
  const titles = decodeURIComponent(productTitle)
  const [product, setProduct] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    country: '',
    email: '',
    phone: '',
    requirements: ''
  })

  useEffect(() => {
    const category = productsData.find((category) =>
      category.subcategories?.some((sub: { name: string }) => sub.name.toLowerCase() === titles.toLowerCase())
    )
    const subcategory = category?.subcategories?.find(
      (sub: { name: string }) => sub.name.toLowerCase() === titles.toLowerCase()
    )
    setProduct(subcategory || null)
  }, [titles, productsData])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(formData)
    setIsModalOpen(false)
  }

  if (!product) {
    return <div className='text-black text-center mt-10'>Product not found</div>
  }

  return (
    <div className="text-black">
      <NavBar />
      <div className="mb-6 text-center">
        <ImagePlaceholder />
      </div>

      {/* Product image and details in a left-right layout */}
      <div className="flex flex-col md:flex-row gap-6 justify-center mx-auto items-center px-4">
        {/* Left side: Product image */}
        <div className="flex flex-col w-full md:w-1/2">
          {product.images?.length ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              width={600}
              height={350}
              className="rounded-lg w-[70%] mx-auto h-[25rem] object-cover"
            />
          ) : (
            <ImagePlaceholder />
          )}
        </div>

        {/* Right side: Product details */}
        <div className="flex flex-col items-center md:items-start w-full md:w-1/2 px-4">
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
