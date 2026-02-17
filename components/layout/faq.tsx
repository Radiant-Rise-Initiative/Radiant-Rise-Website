"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const faqItems = [
    {
        question: "Do we have a geographic preference?",
        answer: "We focus on companies operating in emerging markets, with a strong emphasis on Sub-Saharan Africa and Southeast Asia, where we believe we can have the greatest impact and uncover the most innovative technical solutions.",
    },
    {
        question: "What stage of companies do we invest in?",
        answer: "We typically invest at the Seed and Series A stages. We look for companies that have a working prototype or MVP and are ready to scale their operations and impact.",
    },
    {
        question: "What industries do we invest in?",
        answer: "We are industry-agnostic but have deep expertise in Sustainable Agriculture, Clean Power, Advanced Transport, and Hardware/Software innovations that drive efficiency in resource-constrained environments.",
    },
    {
        question: "What is our typical deal size?",
        answer: "Our typical initial investment ranges from $500k to $2M, with capital reserved for follow-on rounds to support our portfolio companies as they grow.",
    },
];

export function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(1); // Defaulting to the second item open as per inspiration

    return (
        <section data-theme="light" className="bg-white py-24 px-6 sm:px-12 border-t border-black/10">
            <div className="max-w-[1280px] 2xl:max-w-[1440px] mx-auto w-full">
                <h2 className="text-5xl md:text-7xl font-semibold text-black tracking-tight mb-16">
                    How we invest
                </h2>

                <div className="border-t border-black/10">
                    {faqItems.map((item, index) => {
                        const isOpen = openIndex === index;
                        return (
                            <div key={index} className="border-b border-black/10 overflow-hidden">
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
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
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
