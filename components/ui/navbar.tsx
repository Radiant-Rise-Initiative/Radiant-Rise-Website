"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface NavItem {
    label: string;
    id: string;
}

interface NavbarProps {
    items: NavItem[];
    logo: {
        src: string;
        alt: string;
        label: string;
    };
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    onGiveNowClick: () => void;
    className?: string;
}

export function NavbarUI({
    items,
    logo,
    isOpen,
    onOpenChange,
    onGiveNowClick,
    className
}: NavbarProps) {
    return (
        <>
            <nav className={cn(
                "fixed top-0 left-0 right-0 z-50 px-6 sm:px-12 backdrop-blur-lg transition-all duration-500",
                isOpen ? "bg-transparent" : "bg-white/70",
                "text-black",
                className
            )}>
                <div className="py-3 md:py-2 max-w-[1280px] 2xl:max-w-[1440px] mx-auto w-full flex items-center justify-between relative z-50">
                    <Link
                        href="/"
                        onClick={() => onOpenChange(false)}
                        className="flex items-center gap-2 text-xl font-bold tracking-tight z-50 relative transition-colors duration-500 text-black"
                    >
                        <div className="relative h-10 w-auto shrink-0 flex items-center">
                            <Image
                                src={logo.src}
                                alt={logo.alt}
                                width={0}
                                height={40}
                                style={{ width: 'auto', height: '40px' }}
                                className="object-contain transition-all duration-500"
                                priority
                            />
                        </div>
                        {logo.label}
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {items.map((item) => (
                            <Link
                                key={item.id}
                                href={`#${item.id}`}
                                className="text-xs font-medium transition-colors duration-500 uppercase tracking-widest text-black/70 hover:text-black"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>

                    <div className="flex items-center gap-4 relative z-50">
                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={() => onOpenChange(!isOpen)}
                            className="md:hidden transition-colors duration-500 z-50 relative p-2 -mr-2 text-black hover:text-black/70"
                            aria-label="Toggle menu"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>

                        <Button
                            variant="outline"
                            onClick={onGiveNowClick}
                            className={cn(
                                "hidden md:inline-flex text-xs uppercase tracking-wider bg-transparent transition-all duration-500 rounded-none border-black text-black hover:bg-black hover:text-white"
                            )}
                        >
                            GIVE NOW
                        </Button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Expansion */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: "-100%" }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: "-100%" }}
                        transition={{ duration: 1.2, ease: [0.1, 1, 0, 1] }}
                        className="fixed inset-0 z-40 bg-white/70 backdrop-blur-lg pt-28 px-6 sm:px-12 flex flex-col md:hidden overflow-y-auto"
                    >
                        <div className="flex-1 flex flex-col justify-center gap-6 text-left mb-8">
                            {[...items, { label: "Give Now", id: "give-now" }].map((item, index) => {
                                const isGiveNow = item.id === "give-now";
                                const content = (
                                    <>
                                        <span className="text-sm font-mono tracking-widest text-black/40 pt-2.25 shrink-0">
                                            {String(index + 1).padStart(2, '0')}
                                        </span>
                                        <span className="text-3xl sm:text-4xl tracking-tight font-medium text-black">
                                            {item.label}
                                        </span>
                                    </>
                                );

                                if (isGiveNow) {
                                    return (
                                        <button
                                            key={item.id}
                                            onClick={() => {
                                                onOpenChange(false);
                                                onGiveNowClick();
                                            }}
                                            className="flex items-start gap-5 text-left hover:opacity-70 transition-opacity group"
                                        >
                                            {content}
                                        </button>
                                    );
                                }

                                return (
                                    <Link
                                        key={item.id}
                                        href={`#${item.id}`}
                                        onClick={() => onOpenChange(false)}
                                        className="flex items-start gap-5 text-left hover:opacity-70 transition-opacity group"
                                    >
                                        {content}
                                    </Link>
                                );
                            })}
                        </div>

                        <div className="shrink-0 pb-10 w-auto flex flex-col gap-4 text-black border-t border-black/10 pt-8 -mx-6 sm:-mx-12 px-6 sm:px-12">
                            <a href="mailto:hello@radiantrise.com" className="text-2xl sm:text-3xl font-medium tracking-tight hover:opacity-70 transition-opacity w-fit border-b-2 border-black pb-1">
                                hello@radiantrise.com
                            </a>
                            <div className="flex gap-4 text-sm font-mono tracking-widest text-black/60 uppercase">
                                <Link href="#" className="hover:text-black transition-colors">IN</Link>
                                <span>/</span>
                                <Link href="#" className="hover:text-black transition-colors">FB</Link>
                                <span>/</span>
                                <Link href="#" className="hover:text-black transition-colors">X</Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
