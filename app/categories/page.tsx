"use client";
import Banner from "@/components/Banner";
import ProductCategories from "@/components/ProductCategories";
import DesktopHeader from "@/shared/Header";

const CategoriesPage = () => {
  return (
    <div>
      <DesktopHeader isBannerPage />
      <Banner />
      <ProductCategories />
    </div>
  );
};

export default CategoriesPage;
