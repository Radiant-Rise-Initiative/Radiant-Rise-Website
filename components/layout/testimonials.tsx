"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";

const testimonials = [
    {
        id: "berman",
        category: "FUNDING PARTNER",
        quote: "Factor E's unique and innovative approach to impact investing sets them apart. Over the past decade of our partnership, they have consistently delivered bold, effective approaches to uncovering impactful tech innovations.",
        name: "Jonathan Berman",
        role: "CEO",
        company: "Shell Foundation",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2574&auto=format&fit=crop",
    },
    {
        id: "wider",
        category: "PORTFOLIO CEO",
        quote: "Working with the team has been transformative for our growth. Their deep technical expertise and commitment to our mission made them an invaluable partner from day one.",
        name: "Piper Wider",
        role: "CEO",
        company: "60 Hertz",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2576&auto=format&fit=crop",
    },
    {
        id: "mitchell",
        category: "PORTFOLIO CEO",
        quote: "They don't just provide capital; they provide the strategic tailwinds needed to scale hardware innovations in tough markets. Their support was pivotal for our exit strategy.",
        name: "Julian Mitchell",
        role: "CEO (Former)",
        company: "InspiraFarms",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2670&auto=format&fit=crop",
    },
    {
        id: "mcateer",
        category: "PORTFOLIO CEO",
        quote: "The rigor they bring to impact measurement combined with their entrepreneurial spirit is rare. They are truly building the future of clean energy infrastructure.",
        name: "Emily McAteer",
        role: "CEO",
        company: "Odyssey Energy Solutions",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=2561&auto=format&fit=crop",
    },
];

export function Testimonials() {
    const [activeIndex, setActiveIndex] = useState(0);
    const scrollRef = useRef<HTMLDivElement>(null);

    const next = () => setActiveIndex((prev) => (prev + 1) % testimonials.length);
    const prev = () => setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

    useEffect(() => {
        if (scrollRef.current) {
            const activeElement = scrollRef.current.children[activeIndex] as HTMLElement;
            if (activeElement) {
                const scrollLeft = activeElement.offsetLeft - (scrollRef.current.clientWidth / 2) + (activeElement.clientWidth / 2);
                scrollRef.current.scrollTo({ left: scrollLeft, behavior: "smooth" });
            }
        }
    }, [activeIndex]);

    return (
        <section className="bg-white py-24 border-t border-black/10">
            <div className="max-w-[1280px] 2xl:max-w-[1440px] mx-auto w-full px-6 sm:px-12">
                {/* Header Labels */}
                <div className="flex flex-col md:flex-row gap-8 md:gap-[20%] mb-12">
                    <p className="text-xs font-mono tracking-widest text-black/60 uppercase">
                        Testimonials
                    </p>
                    <p className="text-xs font-mono tracking-widest text-black uppercase">
                        {testimonials[activeIndex].category}
                    </p>
                </div>

                {/* Quote Area */}
                <div className="min-h-[300px] flex flex-col justify-center mb-16">
                    <h3 className="text-3xl md:text-5xl lg:text-6xl font-semibold text-black leading-tight md:leading-tight lg:leading-tight tracking-tight">
                        “{testimonials[activeIndex].quote}”
                    </h3>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-4 mb-12">
                    <button
                        onClick={prev}
                        className="p-1 hover:text-orange-500 transition-colors"
                        aria-label="Previous testimonial"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <button
                        onClick={next}
                        className="p-1 hover:text-orange-500 transition-colors"
                        aria-label="Next testimonial"
                    >
                        <ArrowRight size={20} />
                    </button>
                </div>
            </div>

            {/* Person Cards Scroller */}
            <div
                ref={scrollRef}
                className="flex overflow-x-auto gap-0 scrollbar-hide border-t border-black/10"
            >
                {testimonials.map((person, index) => (
                    <div
                        key={person.id}
                        onClick={() => setActiveIndex(index)}
                        className={`flex-none w-[300px] md:w-[350px] p-8 border-r border-black/10 last:border-r-0 cursor-pointer transition-all duration-300 relative group
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
        </section>
    );
}
