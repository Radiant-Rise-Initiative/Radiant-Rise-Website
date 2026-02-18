"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";

const originalCompanies = [
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
    },
    {
        name: "EcoFlux",
        category: "Carbon Capture",
        description: "Next-generation direct air capture technology for a cleaner future",
        logo: "ECOFLUX",
        image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?q=80&w=2670&auto=format&fit=crop",
    },
    {
        name: "AgriSense",
        category: "Smart Farming",
        description: "AI-driven sensors optimizing crop yields and water usage",
        logo: "AGRISENSE",
        image: "https://images.unsplash.com/photo-1628352081506-83c43123ed6d?q=80&w=2727&auto=format&fit=crop",
    },
    {
        name: "SolarStack",
        category: "Renewable Energy",
        description: "Modular solar storage solutions for grid independence",
        logo: "SOLARSTACK",
        image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=2672&auto=format&fit=crop",
    }
];

// Triple the list: [Buffer Start] [Main Content] [Buffer End]
const companies = [...originalCompanies, ...originalCompanies, ...originalCompanies];

export function CompanyScroller() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const [scrollProgress, setScrollProgress] = useState(0);

    // Initialize position and padding
    useEffect(() => {
        const updateLayout = () => {
            const container = scrollRef.current;
            const header = headerRef.current;

            if (container && header) {
                const slide = container.querySelector('div');
                if (slide) {
                    const slideWidth = slide.offsetWidth;
                    const setWidth = slideWidth * originalCompanies.length;

                    // Get the left offset of the content container
                    const contentOffset = header.getBoundingClientRect().left;

                    // Apply scroll padding to container so snapping respects the visual offset
                    container.style.scrollPaddingLeft = `${contentOffset}px`;

                    // Start at the 3rd item (index 2) of the middle set
                    const itemOffset = 2 * slideWidth;

                    // We want the item at (setWidth + itemOffset) to be at 'contentOffset' pixels from the left.
                    // With scroll-padding-left set to contentOffset, the snap point IS (setWidth + itemOffset).
                    // Snapping logic: ItemStart (setWidth + itemOffset) aligns with SnapportStart (ScrollLeft + Padding)
                    // (setWidth + itemOffset) = ScrollLeft + contentOffset
                    // ScrollLeft = (setWidth + itemOffset) - contentOffset

                    const targetScroll = (setWidth + itemOffset) - contentOffset;

                    // Only scroll if we haven't already (to avoid fighting user scroll on simple resize? 
                    // actually for "initial" alignment we want to force it, but on resize we might just want to update padding)
                    // For now, let's just do it on mount. 
                }
            }
        };

        // Initial set
        requestAnimationFrame(() => {
            const container = scrollRef.current;
            if (container) {
                // Force layout update logic
                updateLayout();

                // Do the initial scroll here
                const slide = container.querySelector('div');
                const header = headerRef.current;
                if (slide && header) {
                    const slideWidth = slide.offsetWidth;
                    const setWidth = slideWidth * originalCompanies.length;
                    const contentOffset = header.getBoundingClientRect().left;
                    const targetScroll = (setWidth + (2 * slideWidth)) - contentOffset;
                    container.scrollLeft = targetScroll;
                }
            }
        });

        const handleResize = () => {
            updateLayout();
            // Maybe re-adjust scroll position to keep the current item aligned?
            // That's complex. Let's at least update padding so future snaps are correct.
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleScroll = () => {
        const container = scrollRef.current;
        if (!container) return;

        const slide = container.querySelector('div');
        if (!slide) return;

        const slideWidth = slide.offsetWidth;
        const setWidth = slideWidth * originalCompanies.length;
        const { scrollLeft } = container;

        // --- Infinite Loop Logic ---
        // If we scroll past the second set (into the 3rd set aka End Buffer)
        if (scrollLeft >= setWidth * 2) {
            // Reset back to start of second set (Main Content)
            // seamless jump: subtract one setWidth
            container.scrollLeft = scrollLeft - setWidth;
        }
        // If we scroll into the first set (Start Buffer)
        // Check if we are "below" the start of the Main Content (which starts at setWidth)
        else if (scrollLeft < setWidth) {
            // Jump forward to Main Content
            // seamless jump: add one setWidth
            container.scrollLeft = scrollLeft + setWidth;
        }

        // --- Progress Logic ---
        // Calculate effective index based on visual position
        // Since we reset scrollLeft to be within [setWidth, 2*setWidth],
        // we can take (scrollLeft % setWidth) / slideWidth
        const offsetX = container.scrollLeft % setWidth;
        const rawIndex = Math.round(offsetX / slideWidth);
        const normalizedIndex = rawIndex % originalCompanies.length;

        // Progress for 8 items
        const progress = ((normalizedIndex + 1) / originalCompanies.length) * 100;
        setScrollProgress(progress);
    };

    const scroll = (direction: "left" | "right") => {
        const container = scrollRef.current;
        if (!container) return;

        const slide = container.querySelector('div');
        if (!slide) return;

        const slideWidth = slide.offsetWidth;
        const scrollAmount = direction === "left" ? -slideWidth : slideWidth;

        container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    };

    return (
        <section data-theme="light" className="bg-white py-24">
            <div ref={headerRef} className="max-w-[1280px] 2xl:max-w-[1440px] mx-auto w-full mb-12">
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
                    <div className="flex-1 h-1.5 bg-gray-200 rounded-full relative overflow-hidden">
                        <div
                            className="absolute top-0 left-0 h-full bg-orange-500 transition-all duration-300 ease-out rounded-full"
                            style={{ width: `${scrollProgress}%` }}
                        />
                    </div>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => scroll("left")}
                            className="p-3 border border-black/10 rounded-full hover:bg-black/5 transition-colors group/btn"
                            aria-label="Scroll left"
                        >
                            <ArrowLeft size={20} className="text-black transition-transform group-hover/btn:-translate-x-0.5" />
                        </button>
                        <button
                            onClick={() => scroll("right")}
                            className="p-3 border border-black/10 rounded-full hover:bg-black/5 transition-colors group/btn"
                            aria-label="Scroll right"
                        >
                            <ArrowRight size={20} className="text-black transition-transform group-hover/btn:translate-x-0.5" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Scroller */}
            <div className="relative border-y border-black/10 group/scroller">
                <style dangerouslySetInnerHTML={{
                    __html: `
                    .no-scrollbar::-webkit-scrollbar {
                        display: none;
                    }
                    .no-scrollbar {
                        -ms-overflow-style: none;
                        scrollbar-width: none;
                    }
                `}} />
                {/* Added py-10 to allow hover expansion without clipping */}
                <div
                    ref={scrollRef}
                    onScroll={handleScroll}
                    className="flex overflow-x-auto gap-0 scrollbar-hide snap-x snap-mandatory no-scrollbar py-10 -my-10"
                >
                    {companies.map((company, index) => (
                        <div
                            key={index}
                            className="flex-none w-[85vw] md:w-[400px] snap-start border-r border-black/10 last:border-r-0 h-[450px] md:h-[500px] relative group cursor-pointer overflow-hidden transition-all duration-300 hover:scale-[1.0375] hover:z-20 hover:shadow-2xl hover:border-black/0"
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
            </div>
        </section>
    );
}
