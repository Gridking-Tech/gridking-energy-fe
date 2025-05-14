"use client";
import About from "../shared/About";
import Carousel from "../shared/Carousel/Carousel";
import ProductShowcase from "../shared/HotSell";
import NewArrivals from "../shared/NewArrivals";
import NewsShowcase from "../shared/NewShowcase";
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
