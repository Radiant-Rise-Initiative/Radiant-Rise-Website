"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function AboutInfoImage() {
    return (
        <section className="relative w-full min-h-[600px] md:h-[800px] flex flex-col justify-between overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/assets/images/about/about-info-bg.png"
                    alt="Agricultural landscape"
                    fill
                    className="object-cover"
                    priority
                />
                {/* Subtle overlay to help text readability if needed */}
                <div className="absolute inset-0 bg-black/10" />
            </div>

            <div className="relative z-10 w-full max-w-[1280px] 2xl:max-w-[1440px] mx-auto px-4 sm:px-12 lg:px-0 py-12 md:py-24 h-full flex flex-col justify-between items-start">
                
                {/* Top Left Quote Box */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
                    className="bg-white p-8 md:p-12 max-w-sm md:max-w-md shadow-[0_30px_60px_-12px_rgba(0,0,0,0.25)] flex flex-col gap-6"
                >
                    {/* Branded Icon - Vertical Orange Bar */}
                    <div className="w-2.5 h-10 bg-[#FF5C35] relative">
                         <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-px h-6 bg-white/40 rotate-12" />
                         </div>
                    </div>

                    <p className="text-lg md:text-xl text-black leading-relaxed font-medium">
                        "Valuable solutions seldom arrive at the same time as the problems they solve, they seldom arrive to the people working on those problems, and they seldom arrive in forms that are readily recognizable or easily adaptable."
                    </p>

                    <div className="pt-2">
                        <span className="text-[10px] md:text-xs font-mono tracking-[0.3em] uppercase text-black/40">
                            Andrew Hargadon
                        </span>
                    </div>
                </motion.div>

                {/* Bottom Statement Row */}
                <motion.div 
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
                    className="flex flex-col md:flex-row items-start md:items-end gap-6 md:gap-12 mt-12 md:mt-0"
                >
                    {/* Inset Image */}
                    <div className="relative w-32 h-32 md:w-48 md:h-48 shadow-2xl overflow-hidden shrink-0">
                        <Image
                            src="/assets/images/about/about-info-inset.png"
                            alt="Impact detail"
                            fill
                            className="object-cover"
                        />
                    </div>

                    {/* Statement */}
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-[1.1] tracking-tight max-w-2xl drop-shadow-lg">
                        Radiant Rise exists to bridge the gap between hope and reality, between adversity and purpose, between technology and people.
                    </h2>
                </motion.div>
            </div>
        </section>
    );
}
