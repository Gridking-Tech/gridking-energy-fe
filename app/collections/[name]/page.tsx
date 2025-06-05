"use client";
import DesktopHeader from "@/shared/Header";
import ProductsPage from "../../../shared/ProductsPage";
import { useParams, useRouter } from "next/navigation";

const CategoryPage = () => {
  const params = useParams<{ name: string; subname: string }>();
  const name = params?.name || "";
  const subname = params?.subname || "";
  return (
    <div>
      <DesktopHeader isBannerPage/>
      <ProductsPage name={decodeURIComponent(name)} />
    </div>
  );
};

export default CategoryPage;
