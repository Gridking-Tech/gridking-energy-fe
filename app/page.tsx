"use client";
import About from "../shared/About";
import HeroSection from "../components/HeroSection";
import NewArrivals from "../shared/NewArrivals";
import TalkToExpert from "../shared/TalkToExpert";
import Footer from "../shared/Footer";
import { homePageApi } from "@/api";
import { IProduct } from "@/types";
import EnergyCalculator from "@/components/EnergyCalculator";
import { useRef } from "react";

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
  console.log("new arrival", data);

  return (
    <div className="w-screen h-screen">
      <HeroSection handleScrollToElement={handleScrollToElement} />
      <About />
      <div ref={targetRef}>
        <NewArrivals
          newArrivals={data?.newArrivals?.data}
          loading={isLoading}
        />
      </div>
      <TalkToExpert />
      <EnergyCalculator />
      <Footer />
    </div>
  );
}
