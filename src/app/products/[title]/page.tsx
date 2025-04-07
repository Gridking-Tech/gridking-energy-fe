'use client'
import { homePageApi, productsApi } from "@/src/api"; // or your correct path
import ProductDetails from "@/src/shared/util/ProductDetails";
import { useParams } from "next/navigation";

const ProductsDescription = () => {
  const { title } = useParams<any>();

  const {
    data: productsData,
    isLoading,
    error,
  } = productsApi.useGetProducts() as {
    data: { products: any[] };
    isLoading: boolean;
    error: any;
  };

   const { data: ImageData } = homePageApi.useGetCarouselById("67ec90cb2d2e858db2b1ca28") as {
      data: any;
      isLoading: boolean;
      error: any;
    }

  if (isLoading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center mt-10">Error fetching product</div>;

  return (
    <div>
      <ProductDetails productTitle={title} ImageData={ImageData} productsData={productsData.products} />
    </div>
  );
};

export default ProductsDescription;
