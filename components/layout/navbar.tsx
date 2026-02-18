"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isDark, setIsDark] = useState(true);

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

    // Adaptive Theme Detection
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const theme = entry.target.getAttribute("data-theme");
                        if (theme) setIsDark(theme === "dark");
                    } else if (!entry.isIntersecting) {
                        // When an element leaves, we might need to check if there's
                        // another intersecting element to revert to.
                        // For simplicity in a flat section-based site, 
                        // we can just re-check what's at the top.
                        const topElement = document.elementFromPoint(window.innerWidth / 2, 20);
                        const section = topElement?.closest("[data-theme]");
                        if (section) {
                            const theme = section.getAttribute("data-theme");
                            setIsDark(theme === "dark");
                        }
                    }
                });
            },
            {
                rootMargin: "0px 0px -98% 0px", // Detect what's in the top 2% of the screen
                threshold: [0, 0.01],
            }
        );

        const sections = document.querySelectorAll("[data-theme]");
        sections.forEach((section) => observer.observe(section));

        return () => observer.disconnect();
    }, []);

    const navThemeClasses = isDark
        ? "text-white border-white/10 bg-black/5"
        : "text-black border-black/10 bg-white/5";

    return (
        <nav className={cn(
            "fixed top-0 left-0 right-0 z-50 px-6 sm:px-12 py-3.5 border-b backdrop-blur-md transition-all duration-500",
            navThemeClasses
        )}>
            <div className="max-w-[1280px] 2xl:max-w-[1440px] mx-auto w-full flex items-center justify-between">
                <Link href="/" className={cn(
                    "flex items-center gap-0 text-xl font-bold tracking-tight z-50 relative transition-colors duration-500",
                    isDark ? "text-white" : "text-black"
                )}>
                    <div className="relative h-12 w-auto shrink-0 flex items-center">
                        <Image
                            src="/assets/branding/rr-monochrome.svg"
                            alt="Radiant Rise Logo"
                            width={0}
                            height={48}
                            style={{ width: 'auto', height: '48px' }}
                            className={cn(
                                "object-contain transition-all duration-500 scale-110",
                                !isDark && "invert"
                            )}
                            priority
                        />
                    </div>
                    Radiant Rise
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-8">
                    {["About", "Approach", "Learnings"].map((item) => (
                        <Link
                            key={item}
                            href={`#${item.toLowerCase()}`}
                            className={cn(
                                "text-sm font-medium transition-colors duration-500 uppercase tracking-widest",
                                isDark ? "text-white/90 hover:text-white" : "text-black/70 hover:text-black"
                            )}
                        >
                            {item}
                        </Link>
                    ))}
                </div>

                <div className="flex items-center gap-4">
                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className={cn(
                            "md:hidden transition-colors duration-500 z-50 relative p-2 -mr-2",
                            isDark ? "text-white hover:text-white/80" : "text-black hover:text-black/70"
                        )}
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>

                    <Button
                        variant="outline"
                        className={cn(
                            "hidden md:inline-flex uppercase tracking-wider bg-transparent transition-all duration-500 rounded-none",
                            isDark
                                ? "border-white text-white hover:bg-white hover:text-black"
                                : "border-black text-black hover:bg-black hover:text-white"
                        )}
                    >
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
                                className="mt-8 border-white text-white hover:bg-white hover:text-black uppercase tracking-wider bg-transparent w-full py-6 text-lg rounded-none"
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
