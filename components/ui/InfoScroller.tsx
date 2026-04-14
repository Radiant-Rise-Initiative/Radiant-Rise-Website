"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { SectionHeader } from "@/components/ui/SectionHeader";

export interface ScrollerItem {
    name: string;
    category: string;
    description: string;
    logo: React.ReactNode | string;
    image: string;
}

interface InfoScrollerProps {
    id?: string;
    sectionTitle: string;
    sectionLinkText?: string;
    sectionHref?: string;
    items: ScrollerItem[];
    className?: string;
}

export function InfoScroller({
    id,
    sectionTitle,
    sectionLinkText,
    sectionHref,
    items,
    className
}: InfoScrollerProps) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const [scrollProgress, setScrollProgress] = useState(0);

    // Triple the list: [Buffer Start] [Main Content] [Buffer End]
    const continuousItems = [...items, ...items, ...items];

    useEffect(() => {
        // Initial set
        requestAnimationFrame(() => {
            const container = scrollRef.current;
            const header = headerRef.current;
            if (container && header) {
                const slide = container.querySelector('div') as HTMLElement;
                if (slide) {
                    const slideWidth = slide.offsetWidth;
                    const setWidth = slideWidth * items.length;

                    // Get the left offset of the content container
                    const contentOffset = header.getBoundingClientRect().left;

                    // Apply scroll padding
                    container.style.scrollPaddingLeft = `${contentOffset}px`;

                    // Start at the 1st item (index 0) of the middle set
                    const itemOffset = 0;

                    // Target scroll to position correctly
                    const targetScroll = (setWidth + itemOffset) - contentOffset;

                    container.scrollLeft = targetScroll;
                }
            }
        });

        const handleResize = () => {
            // Recalculate padding on resize
            const container = scrollRef.current;
            const header = headerRef.current;
            if (container && header) {
                const contentOffset = header.getBoundingClientRect().left;
                container.style.scrollPaddingLeft = `${contentOffset}px`;
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [items.length]);

    const scrollTimeoutRef = useRef<NodeJS.Timeout>(null);

    const handleScroll = () => {
        const container = scrollRef.current;
        const header = headerRef.current;
        if (!container || !header) return;

        const slide = container.querySelector('div') as HTMLElement;
        if (!slide) return;

        const slideWidth = slide.offsetWidth;
        const setWidth = slideWidth * items.length;
        const { scrollLeft } = container;
        const contentOffset = header.getBoundingClientRect().left;

        // --- Progress Logic ---
        const currentVisualPosition = scrollLeft + contentOffset;
        const effectivePosition = (currentVisualPosition + setWidth) % setWidth;
        const rawIndex = Math.round(effectivePosition / slideWidth);
        const normalizedIndex = rawIndex % items.length;

        const progress = ((normalizedIndex + 1) / items.length) * 100;
        setScrollProgress(progress);

        // --- Infinite Loop Logic (Scroll End Debounced) ---
        if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);

        scrollTimeoutRef.current = setTimeout(() => {
            const currentScroll = container.scrollLeft;

            // Optional: temporarily disable snap to prevent visual glitches on Safari
            const oldSnap = container.style.scrollSnapType;
            container.style.scrollSnapType = 'none';

            if (currentScroll >= setWidth * 2.5) {
                container.scrollLeft = currentScroll - setWidth;
            } else if (currentScroll < setWidth * 0.5) {
                container.scrollLeft = currentScroll + setWidth;
            }

            // Restore snap after rendering tick
            requestAnimationFrame(() => {
                container.style.scrollSnapType = oldSnap || '';
            });
        }, 150);
    };

    const scroll = (direction: "left" | "right") => {
        const container = scrollRef.current;
        if (!container) return;

        const slide = container.querySelector('div') as HTMLElement;
        if (!slide) return;

        const slideWidth = slide.offsetWidth;
        const setWidth = slideWidth * items.length;

        // Check current position before scrolling
        let currentScroll = container.scrollLeft;

        // PRE-EMPTIVE OFFSET ADJUSTMENT
        if (direction === "right") {
            if (currentScroll >= setWidth * 2) {
                currentScroll -= setWidth;
                container.scrollLeft = currentScroll;
            }
        } else {
            if (currentScroll <= setWidth) {
                currentScroll += setWidth;
                container.scrollLeft = currentScroll;
            }
        }

        const scrollAmount = direction === "left" ? -slideWidth : slideWidth;
        container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    };

    return (
        <section id={id} data-theme="light" className={`bg-[#f5f5f7] pt-24 pb-0 ${className || ""}`}>
            <div ref={headerRef} className="max-w-[1280px] 2xl:max-w-[1440px] mx-auto w-full px-4 sm:px-12 lg:px-0">
                {/* Header */}
                <SectionHeader
                    title={sectionTitle}
                    linkText={sectionLinkText}
                    href={sectionHref}
                    className="mb-4 px-0"
                />

                {/* Controls & Progress bar */}
                <div className="flex items-center gap-8 pt-2 mb-16">
                    <div className="flex-1 h-1 bg-black/10 relative">
                        <div
                            className="absolute top-0 left-0 h-full bg-orange-500 transition-all duration-300 ease-out"
                            style={{ width: `${scrollProgress}%` }}
                        />
                    </div>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => scroll("left")}
                            className="p-3 border border-black/10 rounded-none hover:bg-black/5 transition-colors group/btn"
                            aria-label="Scroll left"
                        >
                            <ArrowLeft size={20} className="text-black transition-transform group-hover/btn:-translate-x-0.5" />
                        </button>
                        <button
                            onClick={() => scroll("right")}
                            className="p-3 border border-black/10 rounded-none hover:bg-black/5 transition-colors group/btn"
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
                <div
                    ref={scrollRef}
                    onScroll={handleScroll}
                    className="flex overflow-x-auto gap-0 scrollbar-hide snap-x snap-mandatory no-scrollbar py-10 -my-10"
                >
                    {continuousItems.map((item, index) => (
                        <div
                            key={index}
                            className="flex-none w-[calc(100vw-2rem)] sm:w-[calc(100vw-6rem)] md:w-[400px] snap-center md:snap-start border-r border-black/10 last:border-r-0 h-[450px] md:h-[500px] relative group cursor-pointer z-0 hover:z-20 transition-colors duration-300 hover:border-transparent"
                        >
                            <div className="w-full h-full relative overflow-hidden transition-transform duration-300 group-hover:scale-[1.0375]">
                                {/* Hover Background Image */}
                                <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        fill
                                        className="object-cover scale-110 group-hover:scale-100 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-black/30" />
                                </div>

                                <div className="relative z-10 h-full p-8 flex flex-col justify-between">
                                    <div className="flex justify-between items-start">
                                        <span className="inline-block py-1 px-0 transition-all duration-300 text-xs font-mono uppercase tracking-widest text-black/60 bg-transparent group-hover:text-white/90 group-hover:bg-[#f5f5f7]/10 group-hover:backdrop-blur-sm group-hover:px-3">
                                            {item.category}
                                        </span>
                                        <ArrowUpRight
                                            className="text-white opacity-0 group-hover:opacity-100 -translate-y-2 translate-x-2 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300"
                                            size={24}
                                        />
                                    </div>

                                    <div className="absolute inset-0 flex items-center justify-center p-8 pointer-events-none">
                                        <div className="w-[80%] text-2xl font-bold tracking-tighter text-center text-black group-hover:text-white transition-colors duration-300 pointer-events-auto">
                                            {item.logo}
                                        </div>
                                    </div>

                                    <p className="text-sm leading-relaxed text-black/80 group-hover:text-white/90 transition-colors duration-300">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
