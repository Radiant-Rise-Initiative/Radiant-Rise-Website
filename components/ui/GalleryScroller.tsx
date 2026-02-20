"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface GalleryItem {
    id: string | number;
    title: string;
    category: string;
    description: string;
    image: string;
    link: string;
}

interface GalleryScrollerProps {
    items: GalleryItem[];
}

export function GalleryScroller({ items }: GalleryScrollerProps) {
    const [isManualPaused, setIsManualPaused] = useState(false);
    const [isHoverPaused, setIsHoverPaused] = useState(false);

    const isPaused = isManualPaused || isHoverPaused;

    return (
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
                className="flex w-max animate-marquee [--duration:45s] md:[--duration:80s]"
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
                                        <Link
                                            href={item.link}
                                            className="bg-[#f5f5f7] text-black w-full md:w-auto flex justify-center items-center gap-2 px-8 py-3.5 rounded-full text-sm font-mono tracking-widest uppercase hover:bg-[#f5f5f7]/90 transition-colors shadow-lg shrink-0 group/btn"
                                        >
                                            Learn More
                                            <ArrowRight size={16} className="transition-transform group-hover/btn:translate-x-1" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}
