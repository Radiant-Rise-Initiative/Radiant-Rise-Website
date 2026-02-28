"use client";

import { useState } from "react";
import { ArrowRight, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export type StackItem = {
    id: string;
    number: string;
    title: string;
    description: string;
    linkText: string;
    modal?: {
        topTagline: string;
        title: string;
        text: string;
    };
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
    const [selectedModal, setSelectedModal] = useState<StackItem["modal"] | null>(null);
    const [activeModalId, setActiveModalId] = useState<string | null>(null);

    const closeModal = () => {
        setSelectedModal(null);
        setActiveModalId(null);
        setHoveredId(null);
    };

    return (
        <>
            <section id={id} data-theme="dark" className={cn("bg-black text-white py-24 border-t border-white/10", className)}>
                <div className="max-w-[1280px] 2xl:max-w-[1440px] mx-auto w-full px-4 sm:px-12 lg:px-0">
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
                            const isHovered = hoveredId === item.id || activeModalId === item.id;
                            const isActiveFlex = hoveredId === item.id || activeModalId === item.id;

                            return (
                                <div
                                    key={item.id}
                                    onMouseEnter={() => {
                                        if (!activeModalId) setHoveredId(item.id);
                                    }}
                                    onMouseLeave={() => {
                                        if (!activeModalId) setHoveredId(null);
                                    }}
                                    onClick={() => {
                                        if (!activeModalId) {
                                            setHoveredId(hoveredId === item.id ? null : item.id);
                                        }
                                    }}
                                    className={cn(
                                        "group relative border-b md:border-r md:border-b-0 border-white/10 p-8 md:p-12 flex flex-col justify-between transition-all duration-500 ease-in-out cursor-pointer overflow-hidden",
                                        "last:border-b-0 md:last:border-r-0",
                                        isActiveFlex ? "md:flex-[2.5]" : "md:flex-1",
                                        (!hoveredId && !activeModalId) ? "md:flex-1" : ""
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
                                                    if (item.modal) {
                                                        setSelectedModal(item.modal);
                                                        setActiveModalId(item.id);
                                                        setHoveredId(item.id);
                                                    }
                                                    onLinkClick?.(item.id);
                                                }}
                                                className="flex items-center gap-2 text-sm font-mono tracking-widest uppercase text-orange-500 transition-colors hover:text-orange-400 group"
                                            >
                                                {item.linkText}
                                                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
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
                                    className="absolute top-8 right-8 p-2 text-white/50 hover:text-white rounded-full hover:bg-white/10 transition-colors"
                                >
                                    <X size={20} />
                                </button>

                                <div className="flex flex-col gap-6 pt-4">
                                    <div>
                                        <h3 className="text-sm font-medium text-white/50 leading-tight mb-4">
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
