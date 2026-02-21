"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

const newsItems = [
    {
        id: "vocational-hub",
        category: "INITIATIVE",
        date: "FEB 15, 2024",
        title: "Radiant Rise Launches New Vocational Empowerment Hub for Young Mothers",
        image: "/assets/branding/splash-image-001.jpg",
    },
    {
        id: "trauma-circles",
        category: "IMPACT",
        date: "JAN 28, 2024",
        title: "Healing Through Storytelling: Over 100 Participants Join Our Trauma-Informed Counseling Circles",
        image: "/assets/branding/splash-image-002.jpg",
    },
    {
        id: "community-grant",
        category: "PARTNERSHIP",
        date: "DEC 12, 2023",
        title: "Scaling Grassroots Change: Securing Community Grants to Uplift Vulnerable Youths",
        image: "/assets/branding/splash-image-003.jpg",
    },
];

import { useEffect } from "react";

function NewsItemContent({ item }: { item: typeof newsItems[0] }) {
    const [bgColor, setBgColor] = useState("rgba(0,0,0,0.6)");

    useEffect(() => {
        const img = new window.Image();
        img.crossOrigin = "anonymous";
        img.src = item.image;
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            if (!ctx) return;
            canvas.width = 1;
            canvas.height = 1;
            ctx.drawImage(img, 0, 0, 1, 1);
            const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
            // Slightly darken/mute the color for a more premium feel if it's too bright
            setBgColor(`rgb(${r}, ${g}, ${b})`);
        };
    }, [item.image]);

    return (
        <div className="relative h-full flex flex-col justify-end">
            <div
                className="p-8 transition-colors duration-500 min-h-[220px] flex flex-col justify-start"
                style={{ backgroundColor: bgColor }}
            >
                <div className="flex justify-between items-center mb-6">
                    <span className="text-xs font-mono tracking-[0.2em] text-white/80 uppercase">
                        {item.category}
                    </span>
                    <span className="text-xs font-mono tracking-[0.2em] text-white/80 uppercase">
                        {item.date}
                    </span>
                </div>
                <h3 className="text-2xl font-semibold text-white leading-tight tracking-tight">
                    {item.title}
                </h3>
            </div>
        </div>
    );
}

import { SectionHeader } from "@/components/ui/SectionHeader";

export function RecentNews() {
    const [scrollDirection, setScrollDirection] = useState<"down" | "up">("down");
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() ?? 0;
        if (latest > previous && scrollDirection !== "down") {
            setScrollDirection("down");
        } else if (latest < previous && scrollDirection !== "up") {
            setScrollDirection("up");
        }
    });

    return (
        <section data-theme="light" className="bg-[#f5f5f7] py-24 px-4 sm:px-12 lg:px-0">
            <div className="max-w-[1280px] 2xl:max-w-[1440px] mx-auto w-full">
                {/* Header */}
                <SectionHeader
                    title="Recent News"
                    linkText="See all news"
                    href="/news"
                    className="mb-16"
                />

                {/* News Grid */}
                <motion.div
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: false, amount: 0.2 }}
                    variants={{
                        hidden: {},
                        show: {
                            transition: {
                                staggerChildren: 0.1
                            }
                        }
                    }}
                    data-theme="dark"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-8 -my-8 px-4 -mx-4"
                >
                    {newsItems.map((item) => (
                        <motion.div
                            key={item.id}
                            variants={{
                                hidden: {
                                    opacity: 0,
                                    x: scrollDirection === "down" ? 60 : -60
                                },
                                show: {
                                    opacity: 1,
                                    x: 0,
                                    transition: {
                                        duration: 0.8,
                                        ease: [0.21, 0.47, 0.32, 0.98]
                                    }
                                }
                            }}
                        >
                            <Link
                                href={`/news/${item.id}`}
                                className="relative group h-[500px] block overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.0375] hover:z-10"
                            >
                                {/* Background Image */}
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />

                                <NewsItemContent item={item} />
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
