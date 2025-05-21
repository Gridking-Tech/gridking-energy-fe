"use client";
import { AnimatePresence, motion } from "framer-motion";
import About from "../shared/About";
import HeroSection from "../components/HeroSection";
import ProductShowcase from "../shared/HotSell";
import NewArrivals from "../shared/NewArrivals";
import NewsShowcase from "../shared/NewShowcase";
import TalkToExpert from "../shared/TalkToExpert";
import Footer from "../shared/Footer";
import LoadCalculator from "../shared/LoadCalculator";
import NavBar from "../shared/NavBar/NavBar";
import DesktopHeader from "@/shared/Header";
import { homePageApi, productsApi } from "@/api";
import { IProduct } from "@/types";
import EnergyCalculator from "@/components/EnergyCalculator";

export default function Homepage() {
  const { data, isLoading, error } = homePageApi.useGetHomePageResource() as {
    data: { newArrivals: Record<string, IProduct[]> };
    isLoading: boolean;
    error: any;
  };

  console.log('new arrival', data)

  return (
    <div className="w-screen h-screen">
      <HeroSection />
      <About />
      <NewArrivals newArrivals={data?.newArrivals?.data} loading={isLoading} />
      {/* <ProductShowcase /> */}
      <TalkToExpert />
      <EnergyCalculator />
      {/* <LoadCalculator /> */}
      {/* <NewsShowcase /> */}
      <Footer />
    </div>
  );
}
