'use client'
import { homePageApi, productsApi } from "../../../api";
import ProductDetails from "../../../shared/util/ProductDetails";
import { useParams } from "next/navigation";
import { FadeLoader } from "react-spinners";

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

   const { data: ImageData } = homePageApi.useGetCarouselById("67ec910d2d2e858db2b1ca2a") as {
      data: any;
      isLoading: boolean;
      error: any;
    }

  if (isLoading) return (
    <div className="text-center h-screen w-scren flex justify-center items-center  font-black mt-10">
        <FadeLoader height={15} />
      </div>
  );
  if (error) return <div className="text-center mt-10">Error fetching product</div>;

  return (
    <div>
      <ProductDetails productTitle={title} ImageData={ImageData} productsData={productsData.products} />
    </div>
  );
};

export default ProductsDescription;
