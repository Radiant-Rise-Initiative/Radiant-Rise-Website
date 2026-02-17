"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
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
        <footer data-theme="dark" className="bg-black pt-24 pb-12 overflow-hidden">
            {/* Scrolling Lines */}
            <div className="mb-24">
                <MarqueeLine text="Let's Rise" speed={60} direction={1} />
                <MarqueeLine text="Together" speed={60} direction={-1} />
            </div>

            {/* Bottom Content Area */}
            <div className="max-w-[1280px] 2xl:max-w-[1440px] mx-auto w-full">
                {/* CTA Buttons - Matching Inspo */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-32">
                    <button className="flex items-center justify-center py-6 px-12 bg-white text-black text-lg font-bold hover:bg-white/90 transition-all duration-300">
                        Work with us
                    </button>
                    <button className="flex items-center justify-center py-6 px-12 border border-white/20 text-white text-lg font-bold hover:bg-white/10 transition-all duration-300">
                        Pitch us
                    </button>
                </div>

                {/* Actual Footer Info */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12 pt-12 border-t border-white/10">
                    <div className="space-y-8">
                        <div className="text-white font-bold tracking-tighter text-2xl">
                            RADIANT RISE.
                        </div>
                        <p className="text-sm text-white/40 max-w-sm leading-relaxed">
                            Investing in the hardware and software tailwinds that scale industrial impact in emerging markets.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-24">
                        <div className="space-y-4">
                            <p className="text-[10px] font-mono tracking-widest text-white/30 uppercase">Platform</p>
                            <nav className="flex flex-col gap-2">
                                <Link href="#" className="text-sm text-white/60 hover:text-white transition-colors">Portfolio</Link>
                                <Link href="#" className="text-sm text-white/60 hover:text-white transition-colors">Impact</Link>
                                <Link href="#" className="text-sm text-white/60 hover:text-white transition-colors">News</Link>
                            </nav>
                        </div>
                        <div className="space-y-4">
                            <p className="text-[10px] font-mono tracking-widest text-white/30 uppercase">Company</p>
                            <nav className="flex flex-col gap-2">
                                <Link href="#" className="text-sm text-white/60 hover:text-white transition-colors">About</Link>
                                <Link href="#" className="text-sm text-white/60 hover:text-white transition-colors">Team</Link>
                                <Link href="#" className="text-sm text-white/60 hover:text-white transition-colors">Careers</Link>
                            </nav>
                        </div>
                        <div className="space-y-4">
                            <p className="text-[10px] font-mono tracking-widest text-white/30 uppercase">Legal</p>
                            <nav className="flex flex-col gap-2">
                                <Link href="#" className="text-sm text-white/60 hover:text-white transition-colors">Privacy</Link>
                                <Link href="#" className="text-sm text-white/60 hover:text-white transition-colors">Terms</Link>
                            </nav>
                        </div>
                    </div>
                </div>

                {/* Final Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 mt-24 pt-8 border-t border-white/5 text-[10px] font-mono tracking-widest text-white/20 uppercase">
                    <p>© 2024 Radiant Rise Venture Capital. All rights reserved.</p>
                    <div className="flex gap-8">
                        <Link href="#" className="hover:text-white transition-colors text-white/20">LinkedIn</Link>
                        <Link href="#" className="hover:text-white transition-colors text-white/20">X / Twitter</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
