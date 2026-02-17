"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";

const stories = [
    {
        id: 1,
        company: "PepsiCo",
        tag: "Customer Story",
        description: "See how PepsiCo uses Celonis Process Mining in their transformation journey to become faster, stronger, better – unlocking millions of dollars across the company.",
        image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2664&auto=format&fit=crop", // Business meeting/office context
        link: "#"
    },
    {
        id: 2,
        company: "Florida Crystals",
        tag: "Customer Story",
        description: "With Celonis Process Intelligence, Florida Crystals unlocked millions in Accounts Payable, slashed duplicate payments, and sped up their S/4HANA transformation.",
        image: "https://images.unsplash.com/photo-1560179707-f14e90ef3dab?q=80&w=2670&auto=format&fit=crop", // Industrial/office context
        link: "#"
    },
    {
        id: 3,
        company: "Uber",
        tag: "Customer Story",
        description: "Uber leveraged process intelligence to optimize their customer support operations, reducing resolution times by 15% and improving customer satisfaction scores globally.",
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2669&auto=format&fit=crop", // Modern office
        link: "#"
    },
    {
        id: 4,
        company: "Siemens",
        tag: "Customer Story",
        description: "Siemens utilized digital twin technology to streamline their manufacturing lines, resulting in a 20% increase in output and significant reduction in energy consumption.",
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2670&auto=format&fit=crop", // Tech/Engineer
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
            <div className="max-w-[1280px] 2xl:max-w-[1440px] mx-auto w-full mb-12">
                <div className="flex justify-between items-end">
                    <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-black">
                        Success stories
                    </h2>
                    <a href="#" className="hidden md:flex items-center gap-2 text-sm font-bold uppercase tracking-widest hover:text-orange-600 transition-colors">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        See all
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
                                className={`h-1 transition-all duration-300 rounded-full ${idx === activeIndex ? "w-12 bg-black" : "w-4 bg-black/20 hover:bg-black/40"
                                    }`}
                                aria-label={`Go to slide ${idx + 1}`}
                            />
                        ))}
                    </div>

                    {/* Navigation Buttons */}
                    <div className="flex gap-4">
                        <button
                            onClick={() => scroll("left")}
                            className="p-3 border border-black/10 rounded-full hover:bg-black hover:text-white transition-all duration-300 disabled:opacity-50"
                            aria-label="Scroll left"
                        >
                            <ArrowLeft size={20} />
                        </button>
                        <button
                            onClick={() => scroll("right")}
                            className="p-3 border border-black/10 rounded-full hover:bg-black hover:text-white transition-all duration-300"
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
