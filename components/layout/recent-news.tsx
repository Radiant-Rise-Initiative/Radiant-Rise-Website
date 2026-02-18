"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Lightbulb, Leaf } from "lucide-react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

const newsItems = [
    {
        id: "greenpod",
        category: "NEWS",
        date: "OCT 3, 2024",
        title: "GreenPod Labs Secures $50K Post-Harvest Loss Innovation Prize for Groundbreaking Active Packaging Solution",
        image: "https://images.unsplash.com/photo-1530507629858-e4977d30e9e0?q=80&w=2600&auto=format&fit=crop", // Produce/Labs
        icon: <Leaf className="w-12 h-12 text-black" />,
        logoText: "GREENPOD LABS",
    },
    {
        id: "openaccess",
        category: "PRESS",
        date: "AUG 14, 2024",
        title: "Open Access Energy Secures $750,000, Launching $1.5 Million Seed Round",
        image: "https://images.unsplash.com/photo-1509391366360-fe5bb58351b5?q=80&w=2670&auto=format&fit=crop", // Solar panels
        overlayColor: "bg-black/40",
        icon: null,
    },
    {
        id: "innovation",
        category: "PRESS",
        date: "JUN 26, 2024",
        title: "$50,000 Post-Harvest Loss Innovation Prize",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672&auto=format&fit=crop", // Tech/Blue
        overlayColor: "bg-[#6495ED]/80", // Muted Blue
        icon: <Lightbulb className="w-12 h-12 text-black font-bold" />,
    },
];

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
        <section data-theme="light" className="bg-white py-24 px-6 sm:px-12">
            <div className="max-w-[1280px] 2xl:max-w-[1440px] mx-auto w-full">
                {/* Header */}
                <div className="flex justify-between items-end mb-16">
                    <h2 className="text-5xl md:text-6xl font-semibold text-black tracking-tight">
                        Recent News
                    </h2>
                    <Link
                        href="/news"
                        className="text-xs font-medium border-b border-black pb-1 hover:text-black/70 hover:border-black/70 transition-colors uppercase tracking-wider"
                    >
                        See all news
                    </Link>
                </div>

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

                                {/* Color Overlay */}
                                <div className={`absolute inset-0 transition-opacity duration-300 ${item.overlayColor || 'bg-black/40'}`} />

                                {/* Content */}
                                <div className="relative h-full p-8 flex flex-col">
                                    {/* Top Icon/Logo */}
                                    <div className="flex-1 flex flex-col items-center justify-center">
                                        {item.icon && (
                                            <div className="mb-4">
                                                {item.icon}
                                            </div>
                                        )}
                                        {item.logoText && (
                                            <p className="text-xl font-bold tracking-widest text-black">
                                                {item.logoText}
                                            </p>
                                        )}
                                    </div>

                                    {/* Bottom Meta & Title */}
                                    <div className="mt-auto">
                                        <div className="flex justify-between items-center mb-6">
                                            <span className="text-[10px] font-mono tracking-[0.2em] text-black/80 uppercase">
                                                {item.category}
                                            </span>
                                            <span className="text-[10px] font-mono tracking-[0.2em] text-black/80 uppercase">
                                                {item.date}
                                            </span>
                                        </div>
                                        <h3 className="text-2xl font-semibold text-black leading-tight tracking-tight">
                                            {item.title}
                                        </h3>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
