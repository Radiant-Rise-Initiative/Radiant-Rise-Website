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
        <nav className={cn(
            "fixed top-0 left-0 right-0 z-50 px-6 sm:px-12 py-2 border-b backdrop-blur-md transition-all duration-500",
            "text-black border-black/10 bg-white/80"
        )}>
            <div className="max-w-[1280px] 2xl:max-w-[1440px] mx-auto w-full flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-tight z-50 relative transition-colors duration-500 text-black">
                    <div className="relative h-10 w-auto shrink-0 flex items-center">
                        <Image
                            src="/assets/branding/rr-logo-v3.svg"
                            alt="Radiant Rise Logo"
                            width={0}
                            height={40}
                            style={{ width: 'auto', height: '40px' }}
                            className="object-contain transition-all duration-500"
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
                            className="text-sm font-medium transition-colors duration-500 uppercase tracking-widest text-black/70 hover:text-black"
                        >
                            {item}
                        </Link>
                    ))}
                </div>

                <div className="flex items-center gap-4">
                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden transition-colors duration-500 z-50 relative p-2 -mr-2 text-black hover:text-black/70"
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>

                    <Button
                        variant="outline"
                        className={cn(
                            "hidden md:inline-flex uppercase tracking-wider bg-transparent transition-all duration-500 rounded-none border-black text-black hover:bg-black hover:text-white"
                        )}
                    >
                        GIVE NOW
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
                        className="fixed inset-0 z-40 bg-white/95 backdrop-blur-md pt-24 px-6 sm:px-12 flex flex-col md:hidden"
                    >
                        <div className="flex flex-col gap-8 text-center mt-12">
                            {["About", "Approach", "Learnings"].map((item) => (
                                <Link
                                    key={item}
                                    href={`#${item.toLowerCase()}`}
                                    onClick={() => setIsOpen(false)}
                                    className="text-2xl font-light text-black hover:text-black/70 transition-colors uppercase tracking-widest"
                                >
                                    {item}
                                </Link>
                            ))}
                            <Button
                                variant="outline"
                                className="mt-8 border-black text-black hover:bg-black hover:text-white uppercase tracking-wider bg-transparent w-full py-6 text-lg rounded-none"
                                onClick={() => setIsOpen(false)}
                            >
                                GIVE NOW
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav >
    );
}
