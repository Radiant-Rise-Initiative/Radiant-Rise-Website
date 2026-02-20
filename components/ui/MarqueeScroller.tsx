"use client";

import { ArrowUpRight } from "lucide-react";

interface MarqueeScrollerProps {
    text: string;
    direction?: 1 | -1;
    speed?: number;
}

export function MarqueeScroller({ text, direction = 1, speed = 40 }: MarqueeScrollerProps) {
    // Duplicate text to ensure seamless loop
    const items = Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="flex items-center gap-12 flex-none py-2">
            <span className="text-[80px] md:text-[120px] font-normal tracking-tighter text-white">
                {text}
            </span>
            <ArrowUpRight className="w-16 h-16 md:w-24 md:h-24 text-white/40" strokeWidth={1.5} />
        </div>
    ));

    return (
        <div className="flex overflow-hidden border-b border-white/10 last:border-b-0 select-none cursor-default">
            <div
                className={`flex w-max flex-nowrap ${direction > 0 ? 'animate-marquee' : 'animate-marquee-reverse'}`}
                style={{ '--duration': `${speed}s` } as React.CSSProperties}
            >
                {/* Two identical containers for perfect looping without gap offsets */}
                <div className="flex flex-none gap-12 pr-12">{items}</div>
                <div className="flex flex-none gap-12 pr-12">{items}</div>
            </div>
        </div>
    );
}
