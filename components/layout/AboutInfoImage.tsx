"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function AboutInfoImage() {
    return (
        <section className="relative w-full overflow-hidden">
            {/* Background Image - Aligned to Bottom */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/assets/images/about_images/About BG.jpg"
                    alt="About background"
                    fill
                    className="object-cover object-bottom"
                    priority
                />
                {/* Overlay increased to 50% for maximum legibility */}
                <div className="absolute inset-0 bg-black/50" />
            </div>

            <div className="relative z-10 w-full max-w-[1280px] 2xl:max-w-[1440px] mx-auto px-4 sm:px-12 lg:px-0 py-24">
                
                {/* 2x2 Grid for Diagonal Layout - Row 1 wraps box, Row 2 wraps mission */}
                <div className="grid grid-cols-[auto_1fr] grid-rows-[auto_auto] w-full items-start">
                    {/* Top Left Quote Box */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
                        className="bg-white p-8 md:p-12 max-w-sm md:max-w-md shadow-[0_30px_60px_-12px_rgba(0,0,0,0.25)] flex flex-col gap-6 col-start-1 row-start-1"
                    >
                        {/* Branded Title Button - Matching Who We Are (#CD5929) and Newsletter Style */}
                        <div className="flex">
                            <div className="inline-flex items-center gap-2 bg-[#CD5929] px-3 py-1.5 text-[10px] sm:text-xs font-mono uppercase tracking-widest text-white/90 group cursor-default transition-colors">
                                HEALING & RISING
                                <ArrowRight className="w-3.5 h-3.5 -mr-1 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>

                        <p className="text-lg md:text-xl text-black leading-relaxed font-medium">
                            "I believe that when a young person heals, they rise, and when they rise, they can transform their families and their communities."
                        </p>

                        <div className="pt-2">
                            <span className="text-[10px] md:text-xs font-mono tracking-[0.3em] uppercase text-black/40">
                                Agnes Oyella, Founder
                            </span>
                        </div>
                    </motion.div>

                    {/* Bottom Statement Row - Placed in the Bottom Right Grid Cell */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
                        className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-12 col-start-2 row-start-2"
                    >
                        {/* Inset Image */}
                        <div className="relative w-32 h-32 md:w-56 md:h-56 shadow-2xl overflow-hidden shrink-0">
                            <Image
                                src="/assets/images/about_images/About CEO.jpg"
                                alt="Founder"
                                fill
                                className="object-cover"
                            />
                        </div>

                        {/* Statement */}
                        <div className="flex flex-col gap-4">
                            <p className="text-white text-lg md:text-xl font-medium leading-relaxed max-w-xl drop-shadow-md">
                                Radiant Rise exists to bridge the gap between hope and reality, between adversity and purpose, between technology and people.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
