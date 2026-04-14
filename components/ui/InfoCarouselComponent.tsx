"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useInView } from "framer-motion";
import { SectionHeader } from "@/components/ui/SectionHeader";

export interface CarouselItem {
    id: string | number;
    title: string;
    tag: string;
    description: string;
    image: string;
    link?: string;
    linkText?: string;
    modal?: {
        topTagline: string;
        title: string;
        text: string;
    };
}

interface InfoCarouselComponentProps {
    id?: string;
    sectionTitle: string;
    sectionLinkText?: string;
    sectionHref?: string;
    items: CarouselItem[];
}

export function InfoCarouselComponent({
    id,
    sectionTitle,
    sectionLinkText,
    sectionHref,
    items,
}: InfoCarouselComponentProps) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const carouselInViewRef = useRef<HTMLDivElement>(null);
    const isCarouselInView = useInView(carouselInViewRef, { once: false, amount: 0.2 });
    const [activeIndex, setActiveIndex] = useState(0);
    const [selectedModal, setSelectedModal] = useState<CarouselItem["modal"] | null>(null);
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

    const closeModal = () => {
        setSelectedModal(null);
    };

    const scroll = (direction: "left" | "right") => {
        if (!scrollRef.current) return;

        const container = scrollRef.current;
        const maxScroll = container.scrollWidth - container.clientWidth;

        let newIndex = direction === "left" ? activeIndex - 1 : activeIndex + 1;
        newIndex = Math.max(0, Math.min(newIndex, items.length - 1));

        const scrollDest = (newIndex / (items.length - 1)) * maxScroll;
        container.scrollTo({ left: scrollDest, behavior: "smooth" });
    };

    // Update active index on scroll
    useEffect(() => {
        const container = scrollRef.current;
        if (!container) return;

        const handleScroll = () => {
            const scrollPosition = container.scrollLeft;
            const maxScroll = container.scrollWidth - container.clientWidth;

            if (maxScroll <= 0) return;

            const percentage = scrollPosition / maxScroll;
            const newIndex = Math.round(percentage * (items.length - 1));

            if (!isNaN(newIndex)) setActiveIndex(newIndex);
        };

        container.addEventListener("scroll", handleScroll);
        return () => container.removeEventListener("scroll", handleScroll);
    }, [items.length]);

    return (
        <>
            <section id={id} data-theme="light" className="bg-[#f5f5f7] py-24 border-t border-black/10 overflow-hidden">
                {/* Header - Constrained */}
                <div className="max-w-[1280px] 2xl:max-w-[1440px] mx-auto w-full mb-12 px-4 sm:px-12 lg:px-0">
                    <SectionHeader
                        title={sectionTitle}
                        linkText={sectionLinkText}
                        href={sectionHref}
                        className="mb-16"
                    />
                </div>

                {/* Scroller - Full Bleed with calculated padding for alignment */}
                <div
                    ref={(node) => {
                        scrollRef.current = node;
                        (carouselInViewRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
                    }}
                    data-theme="dark"
                    className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 scrollbar-hide px-4 sm:px-[max(3rem,calc((100vw-1280px)/2))] 2xl:px-[max(3rem,calc((100vw-1440px)/2))]"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {items.map((item, index) => (
                        <motion.div
                            key={item.id}
                            animate={isCarouselInView
                                ? { opacity: 1, x: 0 }
                                : { opacity: 0, x: scrollDirection === "down" ? 40 : -40 }
                            }
                            transition={{
                                duration: isCarouselInView ? 0.8 : 0,
                                ease: [0.21, 0.47, 0.32, 0.98],
                                delay: isCarouselInView ? index * 0.1 : 0
                            }}
                            className="flex-none snap-center w-full md:w-[90%] h-[580px] bg-black text-white overflow-hidden relative group cursor-pointer"
                            onClick={() => {
                                if (item.modal) {
                                    setSelectedModal(item.modal);
                                }
                            }}
                        >
                            <div className="absolute inset-0 flex">
                                {/* Left: Content */}
                                <div className="w-full md:w-[60%] p-8 md:p-12 flex flex-col z-10 relative">
                                    <div className="mb-auto">
                                        <span className="inline-block px-3 py-1 bg-[#f5f5f7]/10 text-white/90 text-xs font-mono uppercase tracking-widest mb-8 backdrop-blur-sm">
                                            {item.tag}
                                        </span>
                                        <h3 className="text-4xl md:text-5xl font-medium mb-8 leading-tight">
                                            {item.title}
                                        </h3>
                                    </div>

                                    <div className="mt-auto space-y-8">
                                        <div className="flex gap-4">
                                            <div className="w-1.5 h-1.5 bg-[#f5f5f7] mt-2.5 flex-none" />
                                            <p className="text-lg md:text-xl text-white/90 leading-relaxed font-light">
                                                {item.description}
                                            </p>
                                        </div>

                                        {item.linkText && (
                                            <div className="flex items-center gap-2 text-sm font-mono tracking-widest uppercase group-hover:text-orange-500 transition-colors">
                                                {item.linkText}
                                                <ArrowRight size={16} />
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Right: Image */}
                                <div className="hidden md:block md:w-[40%] h-full relative p-5 group-hover:p-2.5 transition-all duration-500 ease-out">
                                    <div className="relative w-full h-full overflow-hidden">
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                                        />
                                    </div>
                                </div>

                                {/* Mobile Image Background (Overlay) */}
                                <div className="absolute inset-0 md:hidden z-0">
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        className="object-cover opacity-60 group-hover:opacity-75 transition-opacity duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Controls - Constrained */}
                <div data-theme="light" className="max-w-[1280px] 2xl:max-w-[1440px] mx-auto w-full mt-8 px-4 sm:px-12 lg:px-0">
                    <div className="flex justify-between items-center">
                        {/* Progress Bars */}
                        <div className="flex gap-2">
                            {items.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => {
                                        if (scrollRef.current) {
                                            const container = scrollRef.current;
                                            const maxScroll = container.scrollWidth - container.clientWidth;
                                            const scrollDest = (idx / (items.length - 1)) * maxScroll;
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
                                className="p-3 border border-black/10 rounded-none enabled:hover:bg-black enabled:hover:text-white transition-all duration-300 disabled:opacity-100 disabled:text-black/40 disabled:border-black/10 disabled:cursor-not-allowed"
                                aria-label="Scroll left"
                            >
                                <ArrowLeft size={20} />
                            </button>
                            <button
                                onClick={() => scroll("right")}
                                disabled={activeIndex === items.length - 1}
                                className="p-3 border border-black/10 rounded-none enabled:hover:bg-black enabled:hover:text-white transition-all duration-300 disabled:opacity-100 disabled:text-black/40 disabled:border-black/10 disabled:cursor-not-allowed"
                                aria-label="Scroll right"
                            >
                                <ArrowRight size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Modal Overlay */}
            <AnimatePresence>
                {selectedModal && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/80 backdrop-blur-sm cursor-pointer z-[100]"
                            onClick={closeModal}
                        />

                        <div className="fixed inset-0 flex items-center justify-center p-4 z-[101] pointer-events-none">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                                className="relative bg-[#111] p-12 md:p-16 max-w-3xl w-full shadow-2xl pointer-events-auto"
                            >
                                <button
                                    onClick={closeModal}
                                    className="absolute top-8 right-8 p-2 text-white/50 hover:text-white rounded-none hover:bg-white/10 transition-colors"
                                >
                                    <X size={20} />
                                </button>

                                <div className="flex flex-col gap-6 pt-4">
                                    <div>
                                        <h3 className="text-sm font-medium text-white/50 leading-tight mb-4 tracking-widest uppercase font-mono">
                                            {selectedModal.topTagline}
                                        </h3>
                                        <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-[1.1]">
                                            {selectedModal.title}
                                        </h2>
                                    </div>
                                    <div className="py-2">
                                        <p className="text-sm md:text-base text-white/70 leading-relaxed">
                                            {selectedModal.text}
                                        </p>
                                    </div>
                                    <div className="pt-4">
                                        <button
                                            onClick={closeModal}
                                            className="text-orange-500 font-medium hover:text-orange-400 transition-colors flex items-center gap-1 text-sm md:text-base underline underline-offset-4"
                                        >
                                            Close details
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
