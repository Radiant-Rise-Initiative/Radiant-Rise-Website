"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

export interface TestimonialItem {
    id: string;
    category: string;
    quote: string;
    name: string;
    role: string;
    company: string;
    image: string;
}

export interface TestimonialSliderProps {
    testimonials: TestimonialItem[];
    sectionLabel?: string;
    className?: string;
}

export function TestimonialSlider({
    testimonials,
    sectionLabel = "Testimonials",
    className = ""
}: TestimonialSliderProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const scrollRef = useRef<HTMLDivElement>(null);

    const next = () => setActiveIndex((prev) => (prev + 1) % testimonials.length);
    const prev = () => setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

    useEffect(() => {
        if (scrollRef.current) {
            const activeElement = scrollRef.current.children[activeIndex] as HTMLElement;
            if (activeElement) {
                // Prevent scrolling if there's no overflow (desktop locked view) with 2px leniency for sub-pixel math
                if (Math.abs(scrollRef.current.scrollWidth - scrollRef.current.clientWidth) <= 2) return;

                const scrollLeft = activeElement.offsetLeft - (scrollRef.current.clientWidth / 2) + (activeElement.clientWidth / 2);
                scrollRef.current.scrollTo({ left: scrollLeft, behavior: "smooth" });
            }
        }
    }, [activeIndex]);

    if (!testimonials || testimonials.length === 0) return null;

    return (
        <section data-theme="light" className={`bg-[#f5f5f7] pt-24 pb-0 ${className}`}>
            <div className="max-w-[1280px] 2xl:max-w-[1440px] mx-auto w-full px-4 sm:px-12 lg:px-0">
                {/* Header Labels */}
                <div className="flex flex-row justify-between items-center gap-4 mb-12">
                    <p className="text-xs font-mono tracking-widest text-black/60 uppercase">
                        {sectionLabel}
                    </p>
                    <div className="grid grid-cols-1 grid-rows-1">
                        {testimonials.map((t, i) => (
                            <p
                                key={`cat-${t.id}`}
                                className={`col-start-1 row-start-1 text-xs font-mono tracking-widest text-black uppercase transition-opacity duration-500
                                    ${i === activeIndex ? "opacity-100" : "opacity-0"}`}
                            >
                                {t.category}
                            </p>
                        ))}
                    </div>
                </div>

                {/* Quote Area - Grid Stack for stable height */}
                <div className="grid grid-cols-1 grid-rows-1 mb-16 md:mb-32">
                    {testimonials.map((t, i) => (
                        <div
                            key={t.id}
                            className={`col-start-1 row-start-1 flex flex-col justify-start transition-all duration-700 ease-in-out
                                ${i === activeIndex ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}
                        >
                            <h3 className="text-3xl md:text-5xl lg:text-6xl font-semibold text-black leading-tight md:leading-tight lg:leading-tight tracking-tight">
                                {t.quote}
                            </h3>
                        </div>
                    ))}
                </div>
            </div>

            {/* Person Cards Scroller */}
            <div className="w-full border-t border-b border-black/10">
                <div
                    ref={scrollRef}
                    className="flex overflow-x-auto gap-0 scrollbar-hide max-w-[1280px] 2xl:max-w-[1440px] mx-auto w-full px-4 sm:px-12 lg:px-0 snap-x snap-mandatory scroll-pl-4 sm:scroll-pl-12 lg:scroll-pl-0 xl:justify-center xl:overflow-x-hidden"
                >
                    {testimonials.map((person, index) => (
                        <div
                            key={person.id}
                            onClick={() => setActiveIndex(index)}
                            className={`flex-none xl:flex-1 w-[300px] md:w-[350px] xl:w-auto p-8 border-r border-black/10 last:border-r-0 cursor-pointer transition-all duration-300 relative group snap-start
                            ${index === activeIndex ? "bg-black/[0.01]" : "bg-transparent hover:bg-black/[0.02]"}`}
                        >
                            {/* Active Indicator */}
                            <div
                                className={`absolute top-0 left-0 right-0 h-1 bg-orange-500 transition-all duration-300 transform origin-left
                                ${index === activeIndex ? "scale-x-100" : "scale-x-0"}`}
                            />

                            <div className="flex items-center gap-6">
                                <div className="relative w-20 h-20 grayscale brightness-90 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-500 rounded-sm overflow-hidden flex-none">
                                    <Image
                                        src={person.image}
                                        alt={person.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <p className="font-bold text-black tracking-tight leading-tight mb-1">
                                        {person.name}
                                    </p>
                                    <p className="text-[13px] text-black/60 font-medium leading-tight">
                                        {person.role}
                                    </p>
                                    <p className="text-[13px] text-black/60 font-medium leading-tight">
                                        {person.company}
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
