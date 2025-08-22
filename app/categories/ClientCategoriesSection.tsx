"use client";
import Banner from "@/components/Banner";
import ProductCategories from "@/components/ProductCategories";
import DesktopHeader from "@/shared/Header";

export default function ClientCategoriesSection() {
  return (
    <div>
      <DesktopHeader isBannerPage />
      <Banner />
      <ProductCategories />
    </div>
  );
}
