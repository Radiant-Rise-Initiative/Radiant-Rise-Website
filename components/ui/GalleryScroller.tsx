"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export interface GalleryItem {
    id: string | number;
    title: string;
    category: string;
    description: string;
    image: string;
    link: string;
    modalTitle?: string;
    modalText?: string;
}

interface GalleryScrollerProps {
    items: GalleryItem[];
}

export function GalleryScroller({ items }: GalleryScrollerProps) {
    const [isManualPaused, setIsManualPaused] = useState(false);
    const [isHoverPaused, setIsHoverPaused] = useState(false);
    const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

    const isPaused = isManualPaused || isHoverPaused || !!selectedItem;

    const closeModal = () => setSelectedItem(null);

    // Prevent scrolling when modal is open
    useEffect(() => {
        if (selectedItem) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        }
    }, [selectedItem]);

    return (
        <>
            <div
                onClick={() => setIsManualPaused(!isManualPaused)}
                onPointerEnter={(e) => {
                    if (e.pointerType === 'mouse') setIsHoverPaused(true);
                }}
                onPointerLeave={(e) => {
                    if (e.pointerType === 'mouse') setIsHoverPaused(false);
                }}
                className="w-full overflow-hidden pl-4 sm:pl-12 cursor-pointer"
            >
                <div
                    className="flex w-max animate-marquee [--duration:45s] md:[--duration:240s]"
                    style={{
                        animationPlayState: isPaused ? 'paused' : 'running'
                    } as React.CSSProperties}
                >
                    {[0, 1].map((setIndex) => (
                        <div
                            key={`set-${setIndex}`}
                            className="flex gap-4 sm:gap-6 pr-4 sm:pr-6 shrink-0"
                        >
                            {items.map((item, index) => (
                                <div
                                    key={`${item.id}-${index}`}
                                    className="w-[calc(100vw-2rem)] md:w-[90vw] lg:w-[1152px] h-[580px] relative group shrink-0"
                                >
                                    <div className="relative w-full h-full overflow-hidden">
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                            priority={setIndex === 0}
                                        />

                                        {/* Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                                        {/* Top Right Logo */}
                                        <div className="absolute top-8 right-8 z-30">
                                            <Image
                                                src="/assets/branding/rr-logo-v3.svg"
                                                alt="Radiant Rise"
                                                width={40}
                                                height={40}
                                                className="invert opacity-90"
                                            />
                                        </div>

                                        {/* Bottom Content */}
                                        <div className="absolute bottom-8 left-8 right-8 z-30 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                                            <div className="text-white flex flex-col items-start gap-3">
                                                <span className="inline-block px-3 py-1 bg-[#f5f5f7]/10 text-white/90 text-xs font-mono tracking-widest backdrop-blur-sm uppercase mb-1">
                                                    {item.category}
                                                </span>
                                                <p className="text-xl md:text-3xl font-medium tracking-tight max-w-2xl leading-tight">
                                                    {item.description}
                                                </p>
                                            </div>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setSelectedItem(item);
                                                }}
                                                className="bg-[#f5f5f7] text-black w-full md:w-auto flex justify-center items-center gap-2 px-8 py-3.5 rounded-none text-sm font-mono tracking-widest uppercase hover:bg-[#f5f5f7]/90 transition-colors shadow-lg shrink-0 group/btn"
                                            >
                                                Learn More
                                                <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-1" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {selectedItem && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={closeModal}
                            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100]"
                        />

                        {/* Modal Container */}
                        <div className="fixed inset-0 flex items-center justify-center z-[101] p-4 pointer-events-none">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                                className="bg-[#0a0a0b] text-white p-12 md:p-16 max-w-3xl w-full shadow-2xl pointer-events-auto relative border border-white/5"
                            >
                                {/* Close Button */}
                                <button
                                    onClick={closeModal}
                                    className="absolute top-8 right-8 p-2 text-white/50 hover:text-white rounded-none hover:bg-white/10 transition-colors"
                                >
                                    <X size={20} />
                                </button>

                                <div className="flex flex-col gap-6 pt-4">
                                    <div>
                                        <h3 className="text-sm font-medium text-white/50 leading-tight mb-4">
                                            {selectedItem.category}
                                        </h3>
                                        <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-[1.1]">
                                            {selectedItem.modalTitle || selectedItem.title}
                                        </h2>
                                    </div>
                                    <div className="py-2">
                                        <p className="text-sm md:text-base text-white/70 leading-relaxed">
                                            {selectedItem.modalText || selectedItem.description}
                                        </p>
                                    </div>
                                    <div className="pt-4">
                                        <button
                                            onClick={closeModal}
                                            className="font-medium hover:opacity-80 transition-opacity flex items-center gap-1 text-sm md:text-base underline underline-offset-4 text-[#CD5929]"
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
