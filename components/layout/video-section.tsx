"use client";

import { motion } from "framer-motion";
import { Play, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function VideoSection() {
    return (
        <section className="bg-[#f5f5f7] pt-24 pb-0">
            <div className="max-w-[1280px] 2xl:max-w-[1440px] mx-auto w-full">
                <div className="relative h-[800px] w-full overflow-hidden bg-black text-white">
                    <Image
                        src="/assets/branding/splash-image-020.jpg"
                        alt="Radiant Rise Video Background"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/30 z-0" />

                    {/* Main Content */}
                    <div className="absolute inset-0 z-10 h-full flex flex-col justify-center px-6 md:px-12 max-w-[1280px] 2xl:max-w-[1440px] mx-auto w-full">
                        <motion.div
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: false, amount: 0.2 }}
                            variants={{
                                hidden: {},
                                show: {
                                    transition: {
                                        staggerChildren: 0.15,
                                        delayChildren: 0.1
                                    }
                                }
                            }}
                            className="max-w-4xl"
                        >
                            <motion.div
                                variants={{
                                    hidden: { opacity: 0, y: 20 },
                                    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] } }
                                }}
                                className="mb-8"
                            >
                                <h2 className="text-5xl md:text-6xl font-semibold text-white tracking-tight">
                                    Radiant Rise
                                </h2>
                            </motion.div>
                            <motion.p
                                variants={{
                                    hidden: { opacity: 0, y: 20 },
                                    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] } }
                                }}
                                className="text-white text-lg md:text-xl font-medium leading-relaxed max-w-2xl"
                            >
                                Dedicated to breaking cycles of poverty by equipping young mothers and youths with the vocational skills, spiritual foundation, and resilience needed to thrive.
                            </motion.p>
                        </motion.div>
                    </div>

                    {/* Bottom Bar */}
                    <div className="absolute bottom-0 left-0 w-full z-20 border-t border-white/10 bg-black/20 backdrop-blur-xl">
                        <div className="max-w-[1280px] 2xl:max-w-[1440px] mx-auto px-6 md:px-12 py-8 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16">
                            {/* Play Trailer Button */}
                            <button className="flex items-center gap-6 group hover:opacity-80 transition-opacity">
                                <div className="w-16 h-16 rounded-full border border-white/30 flex items-center justify-center bg-[#f5f5f7]/5 group-hover:bg-orange-600 group-hover:border-orange-600 transition-colors duration-300">
                                    <Play size={24} fill="currentColor" className="ml-1" />
                                </div>
                                <span className="text-sm font-mono uppercase tracking-widest text-white/80">Play Trailer</span>
                            </button>

                            {/* Info Points */}
                            <motion.div
                                initial="hidden"
                                whileInView="show"
                                viewport={{ once: false, amount: 0.2 }}
                                variants={{
                                    hidden: {},
                                    show: {
                                        transition: {
                                            staggerChildren: 0.2,
                                            delayChildren: 0.3
                                        }
                                    }
                                }}
                                className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12"
                            >
                                <motion.div
                                    variants={{
                                        hidden: { opacity: 0, y: 20 },
                                        show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] } }
                                    }}
                                    className="flex gap-6 items-start"
                                >
                                    <div className="w-10 h-16 rounded-full border border-white/20 bg-[#f5f5f7]/5 flex items-center justify-center text-sm font-mono text-white/60 mt-1 shrink-0">1</div>
                                    <p className="text-sm text-white/70 leading-relaxed theme-transition:text-white pt-[5px]">
                                        To provide holistic empowerment that addresses not just economic needs, but emotional and spiritual well-being for lasting transformation.
                                    </p>
                                </motion.div>
                                <motion.div
                                    variants={{
                                        hidden: { opacity: 0, y: 20 },
                                        show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] } }
                                    }}
                                    className="flex gap-6 items-start"
                                >
                                    <div className="w-10 h-16 rounded-full border border-white/20 bg-[#f5f5f7]/5 flex items-center justify-center text-sm font-mono text-white/60 mt-1 shrink-0">2</div>
                                    <p className="text-sm text-white/70 leading-relaxed pt-[5px]">
                                        To build sustainable futures where every participant becomes a pillar of strength, driving self-reliance and prosperity within their community.
                                    </p>
                                </motion.div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
