"use client";
import { productsApi } from "../../../api";
import ProductDetail from "@/components/ProductDetail";
import { useParams } from "next/navigation";
import { IProduct } from "@/types";
import DesktopHeader from "@/shared/Header";

function retrieveIdFromTitle(titleStr: string) {
  const parts = titleStr.split("-");
  const lastPart = parts[parts.length - 1];

  return lastPart ? decodeURIComponent(lastPart) : null;
}

const ProductsDescription = () => {
  const { title } = useParams<any>();
  const id = retrieveIdFromTitle(title);

  const { data } = productsApi.useGetProductsById(id as string);

  return (
    <div>
      <DesktopHeader />
      <ProductDetail product={data as IProduct} />
    </div>
  );
};

export default ProductsDescription;
