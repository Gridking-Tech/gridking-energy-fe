'use client'

import React from 'react'
import NavBar from '@/src/shared/NavBar/NavBar'
import Footer from '@/src/shared/Footer'
import { homePageApi } from '@/src/api';
import Image from 'next/image'
import ImagePlaceholder from '@/src/shared/Placeholders/ImagePlaceholder'

export default function AboutPage() {
    const { data: ImageId, } = homePageApi.useGetCarouselById(
        "67ec910d2d2e858db2b1ca2a"
    ) as {
        data: any;
        isLoading: boolean;
        error: any;
    };
    return (
        <div className="bg-white text-black min-h-screen">
            <NavBar />
            <div className="relative w-full h-[550px] overflow-hidden">
                {ImageId?.[0]?.url.length > 0 ? (
                    <div className="relative w-full h-full">
                        <Image
                            src={ImageId?.[0]?.url}
                            alt="Banner"
                            style={{ objectFit: "cover" }}
                            fill
                            className="absolute w-full h-full"
                        />
                        <div className="absolute inset-0 bg-black/30"></div>
                    </div>
                ) : (
                    <ImagePlaceholder height={'550px'} />
                )}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <h1 className="text-white text-5xl font-extrabold tracking-wide text-center px-4">
                        Make Life Bright With GridKing
                    </h1>
                </div>
            </div>

            <div className="max-w-full mx-auto px-4 h-[3rem] bg-gray-200  py-4 text-sm text-gray-600 font-black">
                Home &gt; About Us
            </div>

            <section className="md:max-w-6xl  mx-auto px-4 py-8 xl:h-[46rem] text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                    About GridKing
                </h2>

                <p className="text-gray-700  leading-10 text-lg">
                    At GridKing, we’re lighting up the future—literally. We’re a next-gen clean energy company
                    laser-focused on photovoltaic power generation and energy storage tech. Like our friends over at
                    Felicity Solar, we’re deep in the solar game—researching, building, and delivering high-performance
                    energy solutions that power everything from homes to businesses.
                </p>

                <p className="text-gray-700 leading-10  text-lg mt-4">
                    We specialize in residential and commercial solar applications, helping people tap into renewable
                    energy wherever they are. Whether it’s a cozy smart home or a booming business hub, our mission is
                    to make clean power accessible, reliable, and badass.
                </p>

                <p className="text-gray-700 leading-10 text-lg mt-4">
                    We're not just pushing watts—we're pushing a movement. The planet’s changing, and we believe
                    clean energy should be at the center of that change. So we’re here to bring first-class solar
                    solutions to the world, with tech that’s sleek, sustainable, and built to last.
                </p>

                <p className="text-gray-700 leading-7 text-lg mt-4 font-semibold italic">
                    GridKing: Powering hope, one panel at a time.
                </p>
            </section>

            <Footer />
        </div>
    )
}
