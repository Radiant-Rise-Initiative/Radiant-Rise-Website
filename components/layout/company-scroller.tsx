"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";

const companies = [
    {
        name: "Ampersand",
        category: "Advanced Transport",
        description: "Paving the way for low-carbon public transportation",
        logo: "AMPERSAND",
        image: "https://images.unsplash.com/photo-1594818822617-670c99a13f28?q=80&w=2671&auto=format&fit=crop",
    },
    {
        name: "Clean Crop Technologies",
        category: "Sustainable Agriculture",
        description: "Using electricity to revolutionize food safety",
        logo: "CLEAN CROP TECHNOLOGIES",
        image: "https://images.unsplash.com/photo-1574943322213-91b0dc3d4b68?q=80&w=2670&auto=format&fit=crop",
    },
    {
        name: "Odyssey",
        category: "Clean Power",
        description: "Eliminate bottlenecks in renewable energy development",
        logo: "ODYSSEY",
        image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=2670&auto=format&fit=crop",
    },
    {
        name: "Open Access Energy",
        category: "Clean Power",
        description: "Bridging the gap between energy producers and consumers",
        logo: "OPEN ACCESS ENERGY",
        image: "https://images.unsplash.com/photo-1466611653911-954ffea1127b?q=80&w=2670&auto=format&fit=crop",
    },
    {
        name: "Some Company",
        category: "Sustainable Agriculture",
        description: "Cutting food waste and improving crop drying",
        logo: "LOGO",
        image: "https://images.unsplash.com/photo-1523348830342-d01f9fc11339?q=80&w=2670&auto=format&fit=crop",
    }
];

export function CompanyScroller() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [scrollProgress, setScrollProgress] = useState(0);

    const handleScroll = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            const progress = (scrollLeft / (scrollWidth - clientWidth)) * 100;
            setScrollProgress(progress);
        }
    };

    const scroll = (direction: "left" | "right") => {
        if (scrollRef.current) {
            const scrollAmount = 400;
            scrollRef.current.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth",
            });
        }
    };

    useEffect(() => {
        const currentRef = scrollRef.current;
        if (currentRef) {
            currentRef.addEventListener("scroll", handleScroll);
        }
        return () => {
            if (currentRef) {
                currentRef.removeEventListener("scroll", handleScroll);
            }
        };
    }, []);

    return (
        <section data-theme="light" className="bg-white py-24">
            <div className="max-w-[1280px] 2xl:max-w-[1440px] mx-auto w-full mb-12">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16">
                    <h2 className="text-5xl md:text-7xl font-semibold text-black tracking-tight">
                        Some of our companies
                    </h2>
                    <Link
                        href="/portfolio"
                        className="text-black font-medium border-b-2 border-black pb-1 hover:text-black/70 hover:border-black/70 transition-colors"
                    >
                        See complete portfolio
                    </Link>
                </div>

                {/* Controls & Progress bar */}
                <div className="flex items-center gap-8 mb-12">
                    <div className="flex-1 h-px bg-black/10 relative">
                        <div
                            className="absolute top-0 left-0 h-0.5 bg-orange-500 transition-all duration-100 -translate-y-1/2"
                            style={{ width: `${scrollProgress}%` }}
                        />
                    </div>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => scroll("left")}
                            className="p-2 border border-black/10 rounded-full hover:bg-black/5 transition-colors"
                            aria-label="Scroll left"
                        >
                            <ArrowLeft size={20} className="text-black" />
                        </button>
                        <button
                            onClick={() => scroll("right")}
                            className="p-2 border border-black/10 rounded-full hover:bg-black/5 transition-colors"
                            aria-label="Scroll right"
                        >
                            <ArrowRight size={20} className="text-black" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Scroller */}
            <div
                ref={scrollRef}
                className="flex overflow-x-auto gap-0 scrollbar-hide snap-x snap-mandatory border-t border-b border-black/10"
            >
                {companies.map((company, index) => (
                    <div
                        key={index}
                        className="flex-none w-[350px] md:w-[400px] snap-start border-r border-black/10 last:border-r-0 h-[500px] relative group cursor-pointer overflow-hidden transition-all duration-500"
                    >
                        {/* Hover Background Image */}
                        <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <Image
                                src={company.image}
                                alt={company.name}
                                fill
                                className="object-cover scale-110 group-hover:scale-100 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-black/60" />
                        </div>

                        <div className="relative z-10 h-full p-8 flex flex-col justify-between">
                            <div className="flex justify-between items-start">
                                <p className="text-xs font-mono uppercase tracking-widest text-black/60 group-hover:text-white transition-colors duration-300">
                                    {company.category}
                                </p>
                                <ArrowUpRight
                                    className="text-white opacity-0 group-hover:opacity-100 -translate-y-2 translate-x-2 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300"
                                    size={24}
                                />
                            </div>

                            <div className="flex-1 flex items-center justify-center py-12">
                                <span className="text-2xl font-bold tracking-tighter text-center text-black group-hover:text-white transition-colors duration-300">
                                    {company.logo}
                                </span>
                            </div>

                            <p className="text-sm leading-relaxed text-black/80 group-hover:text-white/90 transition-colors duration-300">
                                {company.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
