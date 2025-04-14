'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Button from '@/src/shared/util/Button'
import NavBar from '@/src/shared/NavBar/NavBar'
import ProductDetailModal from '@/src/shared/Modals/ProductDetailModal'
import ImagePlaceholder from '@/src/shared/Placeholders/ImagePlaceholder'
import ImageZoom from './ImageZoom'
import Footer from '../Footer'

interface ProductDetailsProps {
  productTitle: string;
  productsData: any[];
  ImageData: any[]
}

const ProductDetails = ({ productTitle, productsData, ImageData }: ProductDetailsProps) => {
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
    if (!productsData) return;

    const found = productsData.find((p) =>
      p.name.toLowerCase() === titles.toLowerCase()
    );
    setProduct(found || null);
  }, [titles, productsData]);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsModalOpen(false)
  }

  if (!product) {
    return (<div className='text-black text-center mt-10'>Product not found</div>)
  }

  return (
    <div className="text-black w-full">
      <NavBar />
      <div className=" w-full text-center">
        {
          productsData?.length > 0 ? (

            <div className="relative w-full h-[32rem]">
              <Image
              src={ImageData?.[0]?.url}
              alt="eds"
              style={{ objectFit: "cover" }}
              fill
              className="absolute w-full h-full"
              />
              <div className="absolute inset-0 bg-black/20"></div>
            </div>
          ) : (
            <ImagePlaceholder />
          )
        }
      </div>
      <div className='bg-gray-200 h-[3rem] flex px-10 items-center w-full'>
        <div className='font-black'>
          {`PRODUCTS > ${product.name}`}
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-6 justify-center mx-auto items-center px-4 h-[100%] md:h-[650px] w-full md:w-[90%]">
        <div className="flex flex-col w-full md:w-1/2">
          {product.images?.length ? (
            <ImageZoom
              src={product.images[0].url}
              alt={product.name}
            />
          ) : (
            <ImagePlaceholder />
          )}
        </div>
        <div className="flex flex-col items-center md:items-start w-full md:w-1/2 px-4">
          <h1 className="text-3xl md:text-4xl font-black mb-2 text-center md:text-left">{product.name}</h1>
          {product.category?.name && (
            <p className="text-lg text-gray-700 mb-2">Category: {product.category.name}</p>
          )}

          {product.description && (
            <p className="text-md text-gray-600 mb-4">{product.description}</p>
          )}

          {product.price && (
            <p className="text-xl font-semibold text-green-600 mb-4">₦{product.price.toLocaleString()}</p>
          )}
          <Button title="Order Now" onClick={() => setIsModalOpen(true)} disabled={false} className='xl:w-[20%] w-full cursor-pointer' />
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
      <Footer />
    </div>
  )
}

export default ProductDetails
