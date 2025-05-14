"use client";
import { homePageApi, productsApi } from "../../../api";
import ProductDetail from "@/components/ProductDetail";
import Footer from "@/shared/Footer";
import DesktopHeader from "@/shared/Header";
import { useParams } from "next/navigation";
import { FadeLoader } from "react-spinners";

function retrieveIdFromTitle(titleStr: string) {
  const match = titleStr.match(/(\d+)$/);
  return match ? parseInt(match[1], 10) : null;
}

const ProductsDescription = () => {
  const { title } = useParams<any>();

  const id = retrieveIdFromTitle(title);
  return (
    <div>
      <DesktopHeader />

      <ProductDetail />
      <Footer />
    </div>
  );
};

export default ProductsDescription;
