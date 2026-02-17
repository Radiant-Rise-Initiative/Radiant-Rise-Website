"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    // Prevent scrolling when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        }
    }, [isOpen]);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 px-6 sm:px-12 py-6 border-b border-white/10 bg-black/20 backdrop-blur-sm">
            <div className="max-w-[1280px] 2xl:max-w-[1440px] mx-auto w-full flex items-center justify-between">
                <div className="text-xl font-bold tracking-tight text-white z-50 relative">
                    Radiant Rise
                </div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-8">
                    {["About", "Approach", "Learnings"].map((item) => (
                        <Link
                            key={item}
                            href={`#${item.toLowerCase()}`}
                            className="text-sm font-medium text-white/90 hover:text-white transition-colors uppercase tracking-widest"
                        >
                            {item}
                        </Link>
                    ))}
                </div>

                <div className="flex items-center gap-4">
                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden text-white hover:text-white/80 transition-colors z-50 relative p-2 -mr-2"
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>

                    <Button variant="outline" className="hidden md:inline-flex border-white text-white hover:bg-white hover:text-black uppercase tracking-wider bg-transparent">
                        Connect
                    </Button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-40 bg-black/95 backdrop-blur-md pt-24 px-6 sm:px-12 flex flex-col md:hidden"
                    >
                        <div className="flex flex-col gap-8 text-center mt-12">
                            {["About", "Approach", "Learnings"].map((item) => (
                                <Link
                                    key={item}
                                    href={`#${item.toLowerCase()}`}
                                    onClick={() => setIsOpen(false)}
                                    className="text-2xl font-light text-white hover:text-white/70 transition-colors uppercase tracking-widest"
                                >
                                    {item}
                                </Link>
                            ))}
                            <Button
                                variant="outline"
                                className="mt-8 border-white text-white hover:bg-white hover:text-black uppercase tracking-wider bg-transparent w-full py-6 text-lg"
                                onClick={() => setIsOpen(false)}
                            >
                                Connect
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
