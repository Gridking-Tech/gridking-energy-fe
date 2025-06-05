"use client";

import Banner from "@/components/Banner";
import DesktopHeader from "@/shared/Header";

export default function AboutPage() {
  return (
    <div className="bg-white text-black min-h-screen">
      <DesktopHeader isBannerPage />
      <Banner />
      <section className="md:max-w-3xl  mx-auto px-4 py-18 xl:h-[46rem] text-center">
        <h2 className="text-xl md:text-2xl font-bold mb-6">About GridKing</h2>

        <p className="text-gray-500  leading-10 text-sm">
          At GridKing, we&apos;re lighting up the future—literally. We&apos;re a
          next-gen clean energy company laser-focused on photovoltaic power
          generation and energy storage tech. We&apos;re deep in the solar
          researching, building, and delivering high-performance energy
          solutions that power everything from homes to businesses.
        </p>

        <p className="text-gray-500 leading-10  text-sm mt-4">
          We specialize in residential and commercial solar installations,
          helping people tap into renewable energy wherever they are. Whether
          it&apos;s a cozy smart home or a booming business hub, our mission is
          to make clean power accessible, and reliable.
        </p>

        <p className="text-gray-500 leading-10 text-sm mt-4">
          We're not just pushing watts—we're pushing a movement. The planet is
          changing, and we believe clean energy should be at the center of that
          change. So we&apos;re here to bring first-class solar solutions to the
          world, with tech that&apos;s sleek, sustainable, and built to last.
        </p>

        <p className="text-gray-500 leading-7 text-lg mt-4 italic">
          GridKing: Powering hope, one panel at a time.
        </p>
      </section>
    </div>
  );
}
