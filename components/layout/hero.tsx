"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function Hero() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const textY = useTransform(scrollYProgress, [0, 1], ["0%", "200%"]);
    const opacityOverlay = useTransform(scrollYProgress, [0, 1], [0, 0.5]);

    return (
        <section
            ref={ref}
            data-theme="dark"
            className="relative h-screen w-full overflow-hidden flex items-end px-6 sm:px-12"
        >
            <motion.div
                className="absolute inset-0 z-0 h-[120%]" // Taller than container for parallax
                style={{
                    y: backgroundY,
                }}
            >
                <Image
                    src="https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=2670&auto=format&fit=crop" // Placeholder solar panel/community image
                    alt="Community Impact"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/30 z-10" />
                <motion.div
                    className="absolute inset-0 bg-black z-20"
                    style={{ opacity: opacityOverlay }}
                />
            </motion.div>

            <motion.div
                className="relative z-10 w-full mb-12"
                style={{ y: textY }}
            >
                <div className="@container max-w-[1280px] 2xl:max-w-[1440px] mx-auto w-full">
                    <div className="flex flex-col md:flex-row items-end justify-between gap-8 pb-8 border-b border-white/40">
                        <div className="max-w-xl">
                            <p className="text-white text-lg md:text-xl font-medium leading-relaxed">
                                By bridging the gap between groundbreaking climate technologies and the markets that urgently need them, we accelerate the impact of innovation on economies, communities, and the environment.
                            </p>
                        </div>

                        <div className="flex flex-col items-start">
                            <Button variant="link" className="text-white text-lg p-0 h-auto font-medium hover:text-white/80 transition-colors group">
                                Get to know us
                                <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-primary w-full"></span>
                            </Button>
                        </div>
                    </div>

                    <h1 className="text-[10.5cqi] font-semibold text-white tracking-tighter leading-[0.8] mt-8 uppercase whitespace-nowrap [text-align-last:justify] w-full">
                        RISING TOGETHER
                    </h1>
                </div>
            </motion.div>
        </section>
    );
}
