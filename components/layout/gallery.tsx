"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useAnimationFrame, useMotionValue } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

const galleryItems = [
    {
        id: 1,
        title: "Eternity",
        category: "Romance",
        description: "Do you believe in love after life?",
        image: "/assets/branding/splash-image.jpg",
        link: "#"
    },
    {
        id: 2,
        title: "Innovation",
        category: "Technology",
        description: "Shaping the future of process intelligence.",
        image: "/assets/branding/splash-image.jpg",
        link: "#"
    },
    {
        id: 3,
        title: "Sustainability",
        category: "Environment",
        description: "Next-generation energy solutions for a greener planet.",
        image: "/assets/branding/splash-image.jpg",
        link: "#"
    },
    {
        id: 4,
        title: "Advancement",
        category: "Transport",
        description: "Revolutionizing low-carbon public transportation.",
        image: "/assets/branding/splash-image.jpg",
        link: "#"
    }
];

export function Gallery() {
    const [isHovered, setIsHovered] = useState(false);

    // We render multiple sets of items to ensure infinite scrolling
    // 4 sets should be enough to cover wide screens before resetting
    const items = [...galleryItems, ...galleryItems, ...galleryItems, ...galleryItems];

    const containerRef = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);

    // Configurable speeds (pixels per frame approx)
    const baseSpeed = -1.5;
    const hoverSpeed = -0.5;

    useAnimationFrame((t, delta) => {
        const currentSpeed = isHovered ? hoverSpeed : baseSpeed;
        const moveBy = currentSpeed * (delta / 16); // Normalize to 60fps

        let newX = x.get() + moveBy;

        // Reset logic: We need to know when one full set has scrolled past.
        if (containerRef.current) {
            const totalWidth = containerRef.current.scrollWidth;
            const oneSetWidth = totalWidth / 4;

            // If we have scrolled past one full set width
            if (newX <= -oneSetWidth) {
                newX += oneSetWidth;
            }
        }

        x.set(newX);
    });

    return (
        <section className="bg-white pt-24 pb-0 overflow-hidden select-none border-t border-black/10">
            <div className="max-w-[1280px] 2xl:max-w-[1440px] mx-auto w-full mb-12 px-0">
                <div className="flex justify-between items-end mb-16">
                    <h2 className="text-5xl md:text-6xl font-semibold text-black tracking-tight">
                        Our Gallery
                    </h2>
                    <Link
                        href="#"
                        className="text-xs font-medium border-b border-black pb-1 hover:text-black/70 hover:border-black/70 transition-colors uppercase tracking-wider"
                    >
                        Explore Our Stories
                    </Link>
                </div>
            </div>

            <div
                className="w-full h-[400px] md:h-[600px] overflow-hidden"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <motion.div
                    ref={containerRef}
                    className="flex h-full w-max gap-3 pl-3"
                    style={{ x }}
                >
                    {items.map((item, index) => (
                        <div
                            key={`${item.id}-${index}`}
                            className="aspect-video h-full relative group shrink-0"
                        >
                            <div className="relative w-full h-full overflow-hidden">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-cover"
                                    priority={index < 4}
                                />

                                {/* Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                                {/* Top Right Logo (Padding: top-8 right-8) */}
                                <div className="absolute top-8 right-8 z-30">
                                    <Image
                                        src="/assets/branding/rr-logo-v3.svg"
                                        alt="Radiant Rise"
                                        width={40}
                                        height={40}
                                        className="invert opacity-90"
                                    />
                                </div>

                                {/* Bottom Content (Padding: bottom-8 left-8) - MATCHING TOP RIGHT */}
                                <div className="absolute bottom-8 left-8 z-30 flex items-center gap-6">
                                    <Link
                                        href={item.link}
                                        className="bg-white text-black px-8 py-3 rounded-full text-sm font-semibold tracking-wide hover:bg-white/90 transition-colors shadow-lg whitespace-nowrap"
                                    >
                                        Learn More
                                    </Link>
                                    <div className="text-white">
                                        <p className="text-xs font-mono uppercase tracking-[0.2em] opacity-70 mb-1">
                                            {item.category}
                                        </p>
                                        <p className="text-lg md:text-xl font-medium tracking-tight">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
