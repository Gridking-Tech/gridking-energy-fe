'use client'
import { ProductsLinks } from "@/src/constants/constants"
import ProductDetails from "@/src/shared/util/ProductDetails"
import { useParams } from "next/navigation"

const ProductsDescription = () => {
  const {title} = useParams<any>()

  return (
    <div>
      <ProductDetails productTitle={title} productsData={ProductsLinks} />
    </div>
  )
}

export default ProductsDescription
