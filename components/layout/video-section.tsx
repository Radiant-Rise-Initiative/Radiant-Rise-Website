"use client";

import { motion } from "framer-motion";
import { Play, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function VideoSection() {
    return (
        <section className="bg-white pt-24 pb-0">
            <div className="max-w-[1280px] 2xl:max-w-[1440px] mx-auto w-full">
                <div className="relative h-[800px] w-full overflow-hidden bg-black text-white">
                    <Image
                        src="/assets/branding/splash-image.jpg"
                        alt="Radiant Rise Video Background"
                        fill
                        className="object-cover"
                        priority
                    />

                    {/* Main Content */}
                    <div className="absolute inset-0 z-10 h-full flex flex-col justify-center px-6 md:px-12 max-w-[1280px] 2xl:max-w-[1440px] mx-auto w-full">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="max-w-4xl"
                        >
                            <h2 className="text-5xl md:text-6xl font-semibold tracking-tight mb-8">
                                Our Purpose
                            </h2>
                            <p className="text-white text-lg md:text-xl font-medium leading-relaxed max-w-2xl">
                                Dedicated to breaking cycles of poverty by equipping young mothers and youths with the vocational skills, spiritual foundation, and resilience needed to thrive.
                            </p>
                        </motion.div>
                    </div>

                    {/* Bottom Bar */}
                    <div className="absolute bottom-0 left-0 w-full z-20 border-t border-white/10 bg-black/20 backdrop-blur-xl">
                        <div className="max-w-[1280px] 2xl:max-w-[1440px] mx-auto px-6 md:px-12 py-8 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16">
                            {/* Play Trailer Button */}
                            <button className="flex items-center gap-6 group hover:opacity-80 transition-opacity">
                                <div className="w-16 h-16 rounded-full border border-white/30 flex items-center justify-center bg-white/5 group-hover:bg-orange-600 group-hover:border-orange-600 transition-colors duration-300">
                                    <Play size={24} fill="currentColor" className="ml-1" />
                                </div>
                                <span className="text-sm font-mono uppercase tracking-widest text-white/80">Play Trailer</span>
                            </button>

                            {/* Info Points */}
                            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                                <div className="flex gap-6 items-start">
                                    <div className="w-10 h-16 rounded-full border border-white/20 bg-white/5 flex items-center justify-center text-xs font-mono text-white/60 mt-1 shrink-0 pt-0.5">1</div>
                                    <p className="text-sm text-white/70 leading-relaxed theme-transition:text-white">
                                        To provide holistic empowerment that addresses not just economic needs, but emotional and spiritual well-being for lasting transformation.
                                    </p>
                                </div>
                                <div className="flex gap-6 items-start">
                                    <div className="w-10 h-16 rounded-full border border-white/20 bg-white/5 flex items-center justify-center text-xs font-mono text-white/60 mt-1 shrink-0 pt-0.5">2</div>
                                    <p className="text-sm text-white/70 leading-relaxed">
                                        To build sustainable futures where every participant becomes a pillar of strength, driving self-reliance and prosperity within their community.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
