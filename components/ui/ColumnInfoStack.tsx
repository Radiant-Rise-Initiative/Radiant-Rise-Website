"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type StackItem = {
    id: string;
    number: string;
    title: string;
    description: string;
    linkText: string;
};

export interface ColumnInfoStackProps {
    title: string;
    description: string;
    items: StackItem[];
    onLinkClick?: (id: string) => void;
    className?: string;
    id?: string;
}

export function ColumnInfoStack({
    title,
    description,
    items,
    onLinkClick,
    className,
    id
}: ColumnInfoStackProps) {
    const [hoveredId, setHoveredId] = useState<string | null>(null);

    return (
        <section id={id} data-theme="dark" className={cn("bg-black text-white py-24 border-t border-white/10", className)}>
            <div className="max-w-[1280px] 2xl:max-w-[1440px] mx-auto w-full px-4 sm:px-12">
                {/* Header Section */}
                <div className="pb-16 max-w-2xl">
                    <h2 className="text-5xl md:text-6xl font-semibold text-white tracking-tight mb-8">
                        {title}
                    </h2>
                    <p className="text-white text-lg md:text-xl font-normal md:font-medium leading-relaxed max-w-2xl">
                        {description}
                    </p>
                </div>

                {/* Interactive Grid */}
                <div className="h-auto md:h-[600px] flex flex-col md:flex-row bg-[#111]">
                    {items.map((item) => {
                        const isHovered = hoveredId === item.id;

                        return (
                            <div
                                key={item.id}
                                onMouseEnter={() => setHoveredId(item.id)}
                                onMouseLeave={() => setHoveredId(null)}
                                onClick={() => setHoveredId(hoveredId === item.id ? null : item.id)}
                                className={cn(
                                    "group relative border-b md:border-r md:border-b-0 border-white/10 p-8 md:p-12 flex flex-col justify-between transition-all duration-500 ease-in-out cursor-pointer overflow-hidden",
                                    "last:border-b-0 md:last:border-r-0",
                                    hoveredId === item.id ? "md:flex-[2.5]" : "md:flex-1",
                                    !hoveredId ? "md:flex-1" : ""
                                )}
                            >
                                {/* Top Content */}
                                <div>
                                    <h3 className="text-xl font-medium tracking-tight mb-8">
                                        {item.title}
                                    </h3>

                                    <div
                                        className={cn(
                                            "overflow-hidden transition-all duration-500 ease-in-out",
                                            isHovered
                                                ? "opacity-100 max-h-[400px] translate-y-0 delay-[300ms]"
                                                : "opacity-0 max-h-0 translate-y-4 delay-0"
                                        )}
                                    >
                                        <p className="text-lg text-white/80 leading-relaxed mb-8 max-w-md">
                                            {item.description}
                                        </p>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onLinkClick?.(item.id);
                                            }}
                                            className="flex items-center gap-2 text-lg font-normal text-orange-500 transition-colors hover:text-orange-400"
                                        >
                                            {item.linkText}
                                            <ArrowRight size={20} />
                                        </button>
                                    </div>
                                </div>

                                {/* Bottom Number */}
                                <div className="mt-8">
                                    <span className={cn(
                                        "block text-6xl md:text-8xl font-light tracking-tighter transition-colors duration-300",
                                        isHovered ? "text-white" : "text-white/20"
                                    )}>
                                        {item.number}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
