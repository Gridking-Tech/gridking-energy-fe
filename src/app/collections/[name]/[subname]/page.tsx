"use client";
import ProductsPage from "@/src/shared/ProductsPage";
import { useParams } from "next/navigation";

const SubCategoryPage = () => {
  const params = useParams<{ name: string; subname: string }>();
  const name = params?.name || "";
  const subname = params?.subname || "";

  return (
    <div>
      <h1 className="text-black"></h1>
      <ProductsPage
        name={decodeURIComponent(name)}
        subname={decodeURIComponent(subname)}
      />
    </div>
  );
};
export default SubCategoryPage;
