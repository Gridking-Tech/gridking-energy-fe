"use client";
import Banner from "@/components/Banner";
import ProductLists from "@/components/ProductListing";
import DesktopHeader from "@/shared/Header";

const CategoriesPage = () => {
  return (
    <div>
      <DesktopHeader />
      <Banner />
      <ProductLists />
    </div>
  );
};

export default CategoriesPage;
