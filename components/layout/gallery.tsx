"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

const galleryItems = [
    {
        id: 1,
        title: "Healing Hearts",
        category: "Counseling",
        description: "Post-trauma and adversity counseling sessions for young mothers.",
        image: "/assets/branding/splash-image-016.jpg",
        link: "#"
    },
    {
        id: 2,
        title: "Economic Freedom",
        category: "Empowerment",
        description: "Equipping participants with vocational skills and financial inclusion.",
        image: "/assets/branding/splash-image-017.jpg",
        link: "#"
    },
    {
        id: 3,
        title: "Community Synergy",
        category: "Partnership",
        description: "Nurturing hope and self-reliance through values-based leadership.",
        image: "/assets/branding/splash-image-018.jpg",
        link: "#"
    },
    {
        id: 4,
        title: "Stronger Futures",
        category: "Mentorship",
        description: "Uplifting the next generation of youth through structured support.",
        image: "/assets/branding/splash-image-019.jpg",
        link: "#"
    }
];

export function Gallery() {
    return (
        <section className="bg-[#f5f5f7] pt-24 pb-0 overflow-hidden select-none border-t border-black/10">
            <div className="max-w-[1280px] 2xl:max-w-[1440px] mx-auto w-full mb-12 px-0">
                <div className="flex justify-between items-end mb-16">
                    <h2 className="text-5xl md:text-6xl font-semibold text-black tracking-tight">
                        Our Gallery
                    </h2>
                    <Link
                        href="#"
                        className="text-xs font-medium border-b border-black pb-1 hover:text-black/70 hover:border-black/70 transition-colors uppercase tracking-wider"
                    >
                        Explore Our Stories
                    </Link>
                </div>
            </div>

            <div
                className="w-full h-[400px] md:h-[600px] overflow-hidden pl-3 hover:[&>div]:![animation-play-state:paused]"
            >
                <div
                    className="flex h-full w-max animate-marquee"
                    style={{ '--duration': '80s' } as React.CSSProperties}
                >
                    {[0, 1].map((setIndex) => (
                        <div
                            key={`set-${setIndex}`}
                            className="flex h-full gap-3 pr-3 shrink-0"
                        >
                            {galleryItems.map((item, index) => (
                                <div
                                    key={`${item.id}-${index}`}
                                    className="aspect-video h-full relative group shrink-0"
                                >
                                    <div className="relative w-full h-full overflow-hidden">
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            fill
                                            className="object-cover"
                                            priority={setIndex === 0}
                                        />

                                        {/* Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                                        {/* Top Right Logo (Padding: top-8 right-8) */}
                                        <div className="absolute top-8 right-8 z-30">
                                            <Image
                                                src="/assets/branding/rr-logo-v3.svg"
                                                alt="Radiant Rise"
                                                width={40}
                                                height={40}
                                                className="invert opacity-90"
                                            />
                                        </div>

                                        {/* Bottom Content (Padding: bottom-8 left-8) - MATCHING TOP RIGHT */}
                                        <div className="absolute bottom-8 left-8 z-30 flex items-center gap-6">
                                            <Link
                                                href={item.link}
                                                className="bg-[#f5f5f7] text-black px-8 py-3 rounded-full text-sm font-semibold tracking-wide hover:bg-[#f5f5f7]/90 transition-colors shadow-lg whitespace-nowrap"
                                            >
                                                Learn More
                                            </Link>
                                            <div className="text-white">
                                                <p className="text-xs font-mono uppercase tracking-[0.2em] opacity-70 mb-1">
                                                    {item.category}
                                                </p>
                                                <p className="text-lg md:text-xl font-medium tracking-tight">
                                                    {item.description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
