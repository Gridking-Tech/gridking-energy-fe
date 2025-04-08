'use client'
import ProductsPage from "@/src/shared/ProductsPage";
import { useParams, useRouter } from "next/navigation";

const CategoryPage = () => {
  const { name, subname } = useParams<{ name: string; subname: string }>();
  return (
    <div>
      <ProductsPage
        name={decodeURIComponent(name)}

      />

    </div>
  );
};

export default CategoryPage;
