"use client";
import HeroSection from "../components/HeroSection";
import NewArrivals from "../shared/NewArrivals";
import TalkToExpert from "../shared/TalkToExpert";
import { homePageApi } from "@/api";
import { IProduct } from "@/types";
import EnergyCalculator from "@/components/EnergyCalculator";
import { useRef } from "react";
import ProductHighlights from "@/components/ProductHighlights";

export default function Homepage() {
  const { data, isLoading } = homePageApi.useGetHomePageResource() as {
    data: { newArrivals: Record<string, IProduct[]> };
    isLoading: boolean;
    error: any;
  };

  const targetRef = useRef<HTMLDivElement>(null);
  const handleScrollToElement = () => {
    if (targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="w-full">
      <HeroSection handleScrollToElement={handleScrollToElement} />
      <ProductHighlights />
      <div ref={targetRef}>
        <NewArrivals
          newArrivals={data?.newArrivals?.data}
          loading={isLoading}
        />
      </div>
      <EnergyCalculator />
      <TalkToExpert />
    </div>
  );
}
