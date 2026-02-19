"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";

const stories = [
    {
        id: 1,
        company: "The Mukono Project",
        tag: "Empowerment Story",
        description: "See how the Mukono Project achieved a 0% relapse rate in trauma recovery, empowering 200 young mothers to lead their own community-based healing circles and local cooperatives.",
        image: "/assets/branding/splash-image-007.jpg",
        link: "#"
    },
    {
        id: 2,
        company: "Sarah's Textile Collective",
        tag: "Success Spotlight",
        description: "From a single vulnerable participant to a 50-person textile powerhouse, Sarah's story demonstrates the power of vocational skills in unlocking global export markets for local craftsmanship.",
        image: "/assets/branding/splash-image-008.jpg",
        link: "#"
    },
    {
        id: 3,
        company: "Tech Rise Initiative",
        tag: "Impact Story",
        description: "Learn how Davis transformed from a street youth to a tech leader, founding a digital skills bootcamp that has already placed 500 young mothers in stable, high-paying remote roles.",
        image: "/assets/branding/splash-image-009.jpg",
        link: "#"
    },
    {
        id: 4,
        company: "Village Savings Hub",
        tag: "Sustainability Story",
        description: "Our Village Savings and Loans modules have achieved a 100% financial inclusion rate across 12 districts, fostering a culture of self-reliance and community-led economic resilience.",
        image: "/assets/branding/splash-image-010.jpg",
        link: "#"
    }
];

export function SuccessStories() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const scroll = (direction: "left" | "right") => {
        if (!scrollRef.current) return;

        const container = scrollRef.current;
        const scrollAmount = container.clientWidth * 0.8; // Scroll 80% of view width

        if (direction === "left") {
            container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
        } else {
            container.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }
    };

    // Update active index on scroll
    useEffect(() => {
        const container = scrollRef.current;
        if (!container) return;

        const handleScroll = () => {
            const scrollPosition = container.scrollLeft;

            // Simplified: varying progress based on scroll percentage
            const maxScroll = container.scrollWidth - container.clientWidth;
            // Prevent division by zero
            if (maxScroll <= 0) return;

            const percentage = scrollPosition / maxScroll;
            const newIndex = Math.round(percentage * (stories.length - 1));

            if (!isNaN(newIndex)) setActiveIndex(newIndex);
        };

        container.addEventListener("scroll", handleScroll);
        return () => container.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <section data-theme="light" className="bg-white py-24 border-t border-black/10 overflow-hidden">

            {/* Header - Constrained */}
            <div className="max-w-[1280px] 2xl:max-w-[1440px] mx-auto w-full mb-12 px-0">
                <div className="flex justify-between items-end mb-16">
                    <h2 className="text-5xl md:text-6xl font-semibold text-black tracking-tight">
                        Success Stories
                    </h2>
                    <a
                        href="#"
                        className="text-xs font-medium border-b border-black pb-1 hover:text-black/70 hover:border-black/70 transition-colors uppercase tracking-wider"
                    >
                        See All Success Stories
                    </a>
                </div>
            </div>

            {/* Scroller - Full Bleed with calculated padding for alignment */}
            <div
                ref={scrollRef}
                data-theme="dark"
                className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 scrollbar-hide px-0 sm:px-[max(0px,calc((100vw-1280px)/2))] 2xl:px-[max(0px,calc((100vw-1440px)/2))]"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {stories.map((story) => (
                    <div
                        key={story.id}
                        className="flex-none snap-center w-[85vw] md:w-[90%] h-[640px] bg-black text-white overflow-hidden relative group cursor-pointer border border-white/10"
                    >
                        <div className="absolute inset-0 flex">
                            {/* Left: Content */}
                            <div className="w-full md:w-[60%] p-8 md:p-12 flex flex-col z-10 relative">
                                <div className="mb-auto">
                                    <span className="inline-block px-3 py-1 bg-white/10 text-white/90 text-xs font-mono uppercase tracking-widest mb-8 backdrop-blur-sm">
                                        {story.tag}
                                    </span>
                                    <h3 className="text-4xl md:text-5xl font-medium mb-8 leading-tight">
                                        {story.company}
                                    </h3>
                                </div>

                                <div className="mt-auto space-y-8">
                                    <div className="flex gap-4">
                                        <div className="w-1.5 h-1.5 bg-white mt-2.5 flex-none" />
                                        <p className="text-lg md:text-xl text-white/90 leading-relaxed font-light">
                                            {story.description}
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-2 text-sm font-mono tracking-widest uppercase group-hover:text-orange-500 transition-colors">
                                        Read more
                                        <ArrowRight size={16} />
                                    </div>
                                </div>
                            </div>

                            {/* Right: Image */}
                            <div className="hidden md:block md:w-[40%] h-full relative p-5 group-hover:p-2.5 transition-all duration-500 ease-out">
                                <div className="relative w-full h-full overflow-hidden">
                                    <Image
                                        src={story.image}
                                        alt={story.company}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                </div>
                            </div>

                            {/* Mobile Image Background (Overlay) */}
                            <div className="absolute inset-0 md:hidden z-0">
                                <Image
                                    src={story.image}
                                    alt={story.company}
                                    fill
                                    className="object-cover opacity-40 group-hover:opacity-50 transition-opacity duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/40" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Controls - Constrained */}
            <div data-theme="light" className="max-w-[1280px] 2xl:max-w-[1440px] mx-auto w-full mt-8">
                <div className="flex justify-between items-center">
                    {/* Progress Bars */}
                    <div className="flex gap-2">
                        {stories.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => {
                                    if (scrollRef.current) {
                                        const container = scrollRef.current;
                                        const maxScroll = container.scrollWidth - container.clientWidth;
                                        const scrollDest = (idx / (stories.length - 1)) * maxScroll;
                                        container.scrollTo({ left: scrollDest, behavior: 'smooth' });
                                    }
                                }}
                                className={`h-1 transition-all duration-300 ${idx === activeIndex ? "w-12 bg-black" : "w-6 bg-black/20 hover:bg-black/40"
                                    }`}
                                aria-label={`Go to slide ${idx + 1}`}
                            />
                        ))}
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex gap-4">
                        <button
                            onClick={() => scroll("left")}
                            disabled={activeIndex === 0}
                            className="p-3 border border-black/10 rounded-full enabled:hover:bg-black enabled:hover:text-white transition-all duration-300 disabled:opacity-100 disabled:text-black/40 disabled:border-black/10 disabled:cursor-not-allowed"
                            aria-label="Scroll left"
                        >
                            <ArrowLeft size={20} />
                        </button>
                        <button
                            onClick={() => scroll("right")}
                            disabled={activeIndex === stories.length - 1}
                            className="p-3 border border-black/10 rounded-full enabled:hover:bg-black enabled:hover:text-white transition-all duration-300 disabled:opacity-100 disabled:text-black/40 disabled:border-black/10 disabled:cursor-not-allowed"
                            aria-label="Scroll right"
                        >
                            <ArrowRight size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
