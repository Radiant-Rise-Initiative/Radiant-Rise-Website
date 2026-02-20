"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const images = [
    "/assets/branding/splash-image-022.jpg",
    "/assets/branding/splash-image-023.jpg",
    "/assets/branding/splash-image-024.jpg",
    "/assets/branding/splash-image-025.jpg"
];

export function Hero() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImageIndex((prev) => (prev + 1) % images.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const textY = useTransform(scrollYProgress, [0, 1], ["0%", "200%"]);
    const opacityOverlay = useTransform(scrollYProgress, [0, 1], [0, 0.5]);

    return (
        <section
            ref={ref}
            data-theme="dark"
            className="relative h-screen w-full overflow-hidden flex items-end px-4 sm:px-12"
        >
            <motion.div
                className="absolute inset-0 z-0 h-[120%]" // Taller than container for parallax
                style={{
                    y: backgroundY,
                }}
            >
                <AnimatePresence mode="popLayout">
                    <motion.div
                        key={currentImageIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.5 }}
                        className="absolute inset-0"
                    >
                        <Image
                            src={images[currentImageIndex]}
                            alt="Community Impact"
                            fill
                            className="object-cover"
                            priority={currentImageIndex === 0}
                        />
                    </motion.div>
                </AnimatePresence>
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
                                Nurturing hope, purpose, and self-reliance among youths and young mothers to rise above adversity. Equipping Youths and Young Mothers with skills that empower them to uplift their communities.
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
