"use client";

import Banner from "@/components/Banner";
import { useParams } from "next/navigation";
import { retrieveIdFromTitle } from "@/lib/utils";
import ProductLists from "@/components/ProductListing";

export default function CategoriesPage() {
  const params = useParams();
  const { category } = params;
  const categoryId = retrieveIdFromTitle(category as string);

  return (
    <div>
      <Banner />
      <ProductLists category={category as string} />
    </div>
  );
}
