"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";

const originalCompanies = [
    {
        name: "USAID",
        category: "International Development",
        description: "Partnering for global health and economic prosperity",
        logo: "USAID",
        image: "/assets/branding/splash-image-011.jpg",
    },
    {
        name: "UNICEF",
        category: "Child Advocacy",
        description: "Protecting the rights of every child and young mother",
        logo: "UNICEF",
        image: "/assets/branding/splash-image-012.jpg",
    },
    {
        name: "Ministry of Gender",
        category: "Government Partner",
        description: "Coordinating national social protection programs",
        logo: "MGLSD",
        image: "/assets/branding/splash-image-013.jpg",
    },
    {
        name: "Global Fund for Children",
        category: "Community Impact",
        description: "Scaling grassroots movements for social change",
        logo: "GFC",
        image: "/assets/branding/splash-image-014.jpg",
    },
    {
        name: "Uganda NGO Bureau",
        category: "Regulatory Partner",
        description: "Ensuring excellence in indigenous NGO operations",
        logo: "NGO BUREAU",
        image: "/assets/branding/splash-image-011.jpg",
    },
    {
        name: "The Mastercard Foundation",
        category: "Economic Empowerment",
        description: "Enabling young people to access dignified work",
        logo: "MASTERCARD",
        image: "/assets/branding/splash-image-012.jpg",
    },
    {
        name: "Save the Children",
        category: "Child Safety",
        description: "Championing the safety and future of every child",
        logo: "SAVE THE CHILDREN",
        image: "/assets/branding/splash-image-013.jpg",
    },
    {
        name: "Comic Relief",
        category: "Philanthropic Partner",
        description: "Driving positive change through creative advocacy",
        logo: "COMIC RELIEF",
        image: "/assets/branding/splash-image-014.jpg",
    }
];

// Triple the list: [Buffer Start] [Main Content] [Buffer End]
const companies = [...originalCompanies, ...originalCompanies, ...originalCompanies];

export function CompanyScroller() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const [scrollProgress, setScrollProgress] = useState(0);

    // Initialize position and padding
    // Initialize position and padding
    useEffect(() => {
        // Initial set
        // Use requestAnimationFrame to ensure layout is stable
        requestAnimationFrame(() => {
            const container = scrollRef.current;
            const header = headerRef.current;
            if (container && header) {
                const slide = container.querySelector('div') as HTMLElement;
                if (slide) {
                    const slideWidth = slide.offsetWidth;
                    const setWidth = slideWidth * originalCompanies.length;

                    // Get the left offset of the content container
                    const contentOffset = header.getBoundingClientRect().left;

                    // Apply scroll padding
                    container.style.scrollPaddingLeft = `${contentOffset}px`;

                    // Start at the 1st item (index 0) of the middle set
                    const itemOffset = 0;

                    // We want the item at (setWidth + itemOffset) to be at 'contentOffset' pixels from the left.
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
    }, []);

    const scrollTimeoutRef = useRef<NodeJS.Timeout>(null);

    const handleScroll = () => {
        const container = scrollRef.current;
        const header = headerRef.current;
        if (!container || !header) return;

        const slide = container.querySelector('div') as HTMLElement;
        if (!slide) return;

        const slideWidth = slide.offsetWidth;
        const setWidth = slideWidth * originalCompanies.length;
        const { scrollLeft } = container;
        const contentOffset = header.getBoundingClientRect().left;

        // --- Progress Logic ---
        const currentVisualPosition = scrollLeft + contentOffset;
        const effectivePosition = (currentVisualPosition + setWidth) % setWidth;
        const rawIndex = Math.round(effectivePosition / slideWidth);
        const normalizedIndex = rawIndex % originalCompanies.length;

        const progress = ((normalizedIndex + 1) / originalCompanies.length) * 100;
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
        const setWidth = slideWidth * originalCompanies.length;

        // Check current position before scrolling
        let currentScroll = container.scrollLeft;

        // PRE-EMPTIVE OFFSET ADJUSTMENT
        // If we are in the buffer zones, snap back to main content INSTANTLY before smoothing.
        // This ensures the smooth scroll animation plays out fully within the safe zone
        // and doesn't hit the onScroll reset triggers.

        if (direction === "right") {
            // If we are in the End Buffer (or entering it), reset to Main Content
            // Threshold: If we are >= 2.0 * setWidth (Start of End Buffer)
            if (currentScroll >= setWidth * 2) {
                currentScroll -= setWidth;
                container.scrollLeft = currentScroll;
            }
        } else {
            // If we are in the Start Buffer (or entering it), reset to Main Content
            // Threshold: If we are <= 1.0 * setWidth (End of Start Buffer / Start of Main)
            if (currentScroll <= setWidth) {
                currentScroll += setWidth;
                container.scrollLeft = currentScroll;
            }
        }

        const scrollAmount = direction === "left" ? -slideWidth : slideWidth;
        container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    };

    return (
        <section data-theme="light" className="bg-[#f5f5f7] pt-24 pb-0">
            <div ref={headerRef} className="max-w-[1280px] 2xl:max-w-[1440px] mx-auto w-full">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-5 md:gap-0 mb-4 px-0">
                    <h2 className="text-5xl md:text-6xl font-semibold text-black tracking-tight -ml-1">
                        Our Partners
                    </h2>
                    <Link
                        href="/partners"
                        className="text-xs font-medium border-b border-black pb-1 hover:text-black/70 hover:border-black/70 transition-colors uppercase tracking-wider w-fit"
                    >
                        See All Partners
                    </Link>
                </div>

                {/* Controls & Progress bar */}
                <div className="flex items-center gap-8 pt-2 mb-24">
                    <div className="flex-1 h-1 bg-black/10 relative">
                        <div
                            className="absolute top-0 left-0 h-full bg-orange-500 transition-all duration-300 ease-out"
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
                            className="flex-none w-[85vw] md:w-[400px] snap-start border-r border-black/10 last:border-r-0 h-[450px] md:h-[500px] relative group cursor-pointer z-0 hover:z-20 transition-colors duration-300 hover:border-transparent"
                        >
                            <div className="w-full h-full relative overflow-hidden transition-transform duration-300 group-hover:scale-[1.0375]">
                                {/* Hover Background Image */}
                                <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    <Image
                                        src={company.image}
                                        alt={company.name}
                                        fill
                                        className="object-cover scale-110 group-hover:scale-100 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-black/30" />
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
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
