"use client";
import { productsApi } from "../../../api";
import ProductDetail from "@/components/ProductDetail";
import { useParams } from "next/navigation";
import { IProduct } from "@/types";

function retrieveIdFromTitle(titleStr: string) {
  const parts = titleStr.split("-");
  console.log(parts, "parts");
  const lastPart = parts[parts.length - 1];
  console.log(lastPart, "lastPart");

  return lastPart || null;
}

const ProductsDescription = () => {
  const { title } = useParams<any>();
  const id = retrieveIdFromTitle(title);
  const { data } = productsApi.useGetProductsById(id as string);

  return (
    <div>
      <ProductDetail product={data as IProduct} />
    </div>
  );
};

export default ProductsDescription;
