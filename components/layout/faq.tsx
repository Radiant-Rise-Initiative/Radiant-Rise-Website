"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";

const faqItems = [
    {
        question: "Who can join the program?",
        answer: "We focus on young mothers and vulnerable youths in East Africa, starting with our regional hubs in Uganda, where we prioritize those rising above adversity through faith and self-reliance.",
    },
    {
        question: "How do we measure impact?",
        answer: "We track long-term self-reliance, community leadership roles, and the economic stability of our participants through rigorous, data-driven post-program follow-ups.",
    },
    {
        question: "What skills do we provide?",
        answer: "From high-end textiles and craftsmanship to digital literacy and values-based leadership, we equip our members with globally competitive tools to uplift their communities.",
    },
    {
        question: "Are we faith-based?",
        answer: "Yes, we are a faith-led organization that believes in the inherent dignity of every individual and the power of purpose-driven transformation to create lasting social change.",
    },
    {
        question: "How can I support the initiative?",
        answer: "You can partner with us through mentorship, vocational volunteering, or strategic donations. Every contribution directly funds the tools and training our participants need to achieve total self-reliance.",
    },
    {
        question: "What is the long-term vision?",
        answer: "Our goal is to build a network of self-sustaining communities where young mothers and youths lead the way in economic innovation and social resilience across all of East Africa.",
    },
];

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

export function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section data-theme="light" className="bg-[#f5f5f7] py-24 px-6 sm:px-12">
            <div className="max-w-[1280px] 2xl:max-w-[1440px] mx-auto w-full px-0">
                <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-5 md:gap-0 mb-16 px-0">
                    <h2 className="text-5xl md:text-6xl font-semibold text-black tracking-tight -ml-1">
                        Got Questions?
                    </h2>
                    <a
                        href="/contact"
                        className="text-xs font-medium border-b border-black pb-1 hover:text-black/70 hover:border-black/70 transition-colors uppercase tracking-wider w-fit"
                    >
                        MAKE MORE INQUIRIES
                    </a>
                </div>

                <div className="border-t border-black/10">
                    {faqItems.map((item, index) => {
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
            </div>
        </section>
    );
}
