"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const MarqueeLine = ({ text, direction = 1, speed = 40 }: { text: string; direction?: 1 | -1; speed?: number }) => {
    const [isHovered, setIsHovered] = useState(false);

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
        <div
            className="flex overflow-hidden border-b border-white/10 last:border-b-0 select-none cursor-default"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <motion.div
                className="flex flex-nowrap"
                animate={{
                    x: direction > 0 ? ["-50%", "0%"] : ["0%", "-50%"],
                }}
                transition={{
                    duration: isHovered ? 120 : speed,
                    repeat: Infinity,
                    ease: "linear",
                }}
            >
                {/* Two identical containers for perfect looping without gap offsets */}
                <div className="flex flex-none gap-12 pr-12">{items}</div>
                <div className="flex flex-none gap-12 pr-12">{items}</div>
            </motion.div>
        </div>
    );
};

export function Footer() {
    return (
        <footer data-theme="dark" className="bg-black pt-24 pb-12 overflow-hidden text-white font-sans">
            {/* Scrolling Lines */}
            <div className="mb-32">
                <MarqueeLine text="Let's Rise" speed={60} direction={1} />
                <MarqueeLine text="Together" speed={60} direction={-1} />
            </div>

            <div className="max-w-[1280px] 2xl:max-w-[1440px] mx-auto w-full">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-24 lg:gap-32">

                    {/* Newsletter Section */}
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-6xl font-medium tracking-tighter mb-4">Newsletter.</h2>
                            <p className="text-2xl text-white/40 tracking-tight">Monthly news and updates.</p>
                        </div>

                        <div className="relative max-w-md group">
                            <input
                                type="email"
                                placeholder="Work Email"
                                className="w-full bg-transparent border border-white/20 py-5 px-6 pr-16 focus:outline-none focus:border-white transition-colors text-lg"
                            />
                            <button className="absolute right-6 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-white transition-colors">
                                <ArrowRight className="w-8 h-8" />
                            </button>
                        </div>

                        <p className="text-xs text-white/30 leading-relaxed max-w-sm">
                            By submitting this form, you confirm that you agree to the storing and processing of your personal data by Radiant Rise as described in our <Link href="#" className="underline hover:text-white transition-colors">Privacy Notice</Link>
                        </p>
                    </div>

                    {/* Links Sections */}
                    {/* Links Sections */}
                    <div className="flex flex-col sm:flex-row sm:justify-end gap-12 md:gap-24">
                        {/* More Radiant Rise */}
                        <div className="space-y-6">
                            <h3 className="text-[10px] font-mono tracking-widest text-white/30 uppercase">More Radiant</h3>
                            <div className="flex flex-col gap-4">
                                {["Portfolio", "Impact", "News", "Team", "Careers", "Approach", "Learnings"].map((link) => (
                                    <Link key={link} href="#" className="group flex items-center gap-2 text-xl font-medium hover:text-white/60 transition-all">
                                        {link}
                                        <ArrowUpRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Any Questions */}
                        <div className="space-y-6">
                            <h3 className="text-[10px] font-mono tracking-widest text-white/30 uppercase">Any Questions?</h3>
                            <div className="flex flex-col gap-4">
                                <Link href="#" className="group flex items-center gap-2 text-xl font-medium hover:text-white/60 transition-all">
                                    Talk to an expert
                                    <ArrowRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                </Link>
                                <Link href="#" className="group flex items-center gap-2 text-xl font-medium hover:text-white/60 transition-all">
                                    Support
                                    <ArrowUpRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                </Link>
                                <Link href="#" className="group flex items-center gap-2 text-xl font-medium hover:text-white/60 transition-all">
                                    FAQs
                                    <ArrowRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                </Link>
                                <Link href="#" className="group flex items-center gap-2 text-xl font-medium hover:text-white/60 transition-all">
                                    Glossary
                                    <ArrowRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                </Link>
                            </div>
                        </div>

                        {/* Follow Us */}
                        <div className="space-y-6">
                            <h3 className="text-[10px] font-mono tracking-widest text-white/30 uppercase">Follow Us</h3>
                            <div className="flex flex-col gap-4">
                                {["LinkedIn", "YouTube", "Instagram", "Facebook", "X / Twitter"].map((link) => (
                                    <Link key={link} href="#" className="group flex items-center gap-2 text-xl font-medium hover:text-white/60 transition-all">
                                        {link}
                                        <ArrowUpRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
