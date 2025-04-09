"use client";
import About from "@/src/shared/About";
import Carousel from "@/src/shared/Carousel/Carousel";
import ProductShowcase from "@/src/shared/HotSell";
import NewArrivals from "@/src/shared/NewArrivals";
import NewsShowcase from "@/src/shared/NewShowcase";
import TalkExpert from "../shared/ServiceInquiry";
import Footer from "../shared/Footer";
import LoadCalculator from "../shared/LoadCalculator";

export default function Homepage() {
  return (
    <div className="  w-screen h-screen">
       <Carousel />
      <About /> 
      <NewArrivals />
      <ProductShowcase />
      <TalkExpert />
      <LoadCalculator />
      <NewsShowcase />
      <Footer />
    </div>
  );
}
