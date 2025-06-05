"use client";

import Banner from "@/components/Banner";
import { useParams } from "next/navigation";
import { retrieveIdFromTitle } from "@/lib/utils";
import ProductLists from "@/components/ProductListing";
import DesktopHeader from "@/shared/Header";

export default function CategoriesPage() {
  const params = useParams();
  const { category } = params;
  const categoryId = retrieveIdFromTitle(category as string);

  return (
    <div>
      <DesktopHeader isBannerPage/>
      <Banner />
      <ProductLists category={category as string} />
    </div>
  );
}
