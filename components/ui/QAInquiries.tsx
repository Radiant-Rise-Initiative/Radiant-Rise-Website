"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";

export interface QAItem {
    question: string;
    answer: string;
}

interface QAInquiriesProps {
    items: QAItem[];
}

const accordionVariants: Variants = {
    collapsed: {
        height: 0,
        opacity: 0,
        transition: { duration: 0.2, ease: "easeInOut" }
    },
    open: {
        height: "auto",
        opacity: 1,
        transition: { duration: 0.3, ease: "easeOut" }
    }
};

export function QAInquiries({ items }: QAInquiriesProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <div className="border-t border-black/10">
            {items.map((item, index) => {
                const isOpen = openIndex === index;
                return (
                    <div
                        key={index}
                        className="border-b border-black/10"
                        style={{ contentVisibility: 'auto' } as React.CSSProperties}
                    >
                        <button
                            onClick={() => setOpenIndex(isOpen ? null : index)}
                            className="w-full py-8 flex justify-between items-center text-left group transition-colors"
                        >
                            <span className={`text-xl md:text-2xl font-medium tracking-tight transition-colors duration-300 ${isOpen ? "text-[#FF4500]" : "text-black group-hover:text-black/70"}`}>
                                {item.question}
                            </span>

                            <div className="flex items-center gap-2">
                                <div className={`flex items-center transition-all duration-300 ${isOpen ? "text-[#FF4500]" : "text-[#FF4500]"}`}>
                                    {isOpen && <span className="text-2xl font-light mr-1">[</span>}
                                    <ChevronDown
                                        size={24}
                                        className={`transition-transform duration-500 ${isOpen ? "rotate-180" : "rotate-0"}`}
                                    />
                                    {isOpen && <span className="text-2xl font-light ml-1">]</span>}
                                </div>
                            </div>
                        </button>

                        <AnimatePresence initial={false}>
                            {isOpen && (
                                <motion.div
                                    key="content"
                                    variants={accordionVariants}
                                    initial="collapsed"
                                    animate="open"
                                    exit="collapsed"
                                    className="overflow-hidden"
                                    style={{
                                        willChange: "height, opacity",
                                        transform: "translateZ(0)"
                                    }}
                                >
                                    <div className="pb-12 pr-12">
                                        <p className="text-lg md:text-xl text-black/70 leading-relaxed max-w-3xl">
                                            {item.answer}
                                        </p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                );
            })}
        </div>
    );
}
