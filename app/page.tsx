'use client';
import About from "@/component/About";
import Carousel from "@/component/Carousel/Carousel";
import ProductShowcase from "@/component/HotSell";
import NewArrivals from "@/component/NewArrivals";
import NewsShowcase from "@/component/NewShowcase";

export default function HeroCarousel() {
  return (
    <div className="relative  w-screen h-screen">
      <Carousel/>
      <About/>
      <NewArrivals/>
      <ProductShowcase/>
      <NewsShowcase />
    </div>
  );
}
