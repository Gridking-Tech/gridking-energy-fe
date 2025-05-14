"use client";
import { AnimatePresence, motion } from "framer-motion";
import About from "../shared/About";
import HeroSection from "../components/HeroSection";
import ProductShowcase from "../shared/HotSell";
import NewArrivals from "../shared/NewArrivals";
import NewsShowcase from "../shared/NewShowcase";
import TalkExpert from "../shared/ServiceInquiry";
import Footer from "../shared/Footer";
import LoadCalculator from "../shared/LoadCalculator";
import NavBar from "../shared/NavBar/NavBar";
import DesktopHeader from "@/shared/Header";


export default function Homepage() {
  return (
    <div className="w-screen h-screen">
      <HeroSection />
      <About />
      <NewArrivals />
      {/* <ProductShowcase /> */}
      <TalkExpert />
      {/* <LoadCalculator /> */}
      {/* <NewsShowcase /> */}
      <Footer />
    </div>
  );
}
