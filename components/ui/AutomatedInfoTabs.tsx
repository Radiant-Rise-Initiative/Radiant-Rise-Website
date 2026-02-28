"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export interface InfoTabFeature {
    title: string;
    text: string;
}

export interface InfoTab {
    id: string;
    label: string;
    headline: string;
    bottomTagline?: string;
    features: InfoTabFeature[];
}

interface AutomatedInfoTabsProps {
    id?: string;
    title?: string;
    description?: string;
    tabs: InfoTab[];
    durationPerTab?: number;
    className?: string;
}

export function AutomatedInfoTabs({
    id,
    title,
    description,
    tabs,
    durationPerTab = 5000,
    className
}: AutomatedInfoTabsProps) {
    const [activeTab, setActiveTab] = useState(0);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const intervalTime = 50; // Update every 50ms
        const steps = durationPerTab / intervalTime;
        let currentStep = 0;

        const timer = setInterval(() => {
            currentStep++;
            const newProgress = (currentStep / steps) * 100;

            if (newProgress >= 100) {
                // Move to next tab
                setActiveTab((prev) => (prev + 1) % tabs.length);
                currentStep = 0;
                setProgress(0);
            } else {
                setProgress(newProgress);
            }
        }, intervalTime);

        return () => clearInterval(timer);
    }, [activeTab, durationPerTab, tabs.length]);

    const handleTabClick = (index: number) => {
        setActiveTab(index);
        setProgress(0); // Reset progress on manual click
    };

    return (
        <section id={id} className={cn("bg-black text-white py-24 border-t border-white/10", className)}>
            <div className="max-w-[1280px] 2xl:max-w-[1440px] mx-auto px-4 sm:px-12 lg:px-0 w-full">
                {/* Header Section */}
                {title && description && (
                    <div className="pb-11 max-w-2xl">
                        <h2 className="text-5xl md:text-6xl font-semibold text-white tracking-tight mb-8">
                            {title}
                        </h2>
                        <p className="text-white text-lg md:text-xl font-normal md:font-medium leading-relaxed max-w-2xl">
                            {description}
                        </p>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 lg:min-h-[600px]">

                    {/* Left Column: Tabs & Headline */}
                    <div className="flex flex-col justify-between h-full">
                        {/* Tabs List */}
                        <div className="space-y-0">
                            {tabs.map((tab, index) => (
                                <div
                                    key={tab.id}
                                    className="relative cursor-pointer group"
                                    onClick={() => handleTabClick(index)}
                                >
                                    <div className={cn(
                                        "py-5 transition-colors duration-300 text-xl font-medium",
                                        activeTab === index
                                            ? "text-white"
                                            : "text-white/40 group-hover:text-white/70"
                                    )}>
                                        {tab.label}
                                    </div>

                                    {/* Progress Bar Background (Line) */}
                                    <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#f5f5f7]/10 rounded-none" />

                                    {/* Active Progress Bar */}
                                    {activeTab === index && (
                                        <motion.div
                                            className="absolute bottom-0 left-0 h-[2px] bg-[#f5f5f7] rounded-none"
                                            initial={{ width: "0%" }}
                                            animate={{ width: `${progress}%` }}
                                            transition={{ ease: "linear", duration: 0.05 }}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Dynamic Bottom Headline section */}
                        {/* Gap below last progress bar adjusted to 64px (mt-16) */}
                        <div className="mt-16 lg:mt-auto pt-0 grid">
                            {tabs.map((tab, index) => (
                                <div
                                    key={tab.id}
                                    className={cn(
                                        "col-start-1 row-start-1 transition-all duration-500",
                                        activeTab === index
                                            ? "opacity-100 translate-y-0 pointer-events-auto"
                                            : "opacity-0 translate-y-4 pointer-events-none"
                                    )}
                                >
                                    <div className="inline-block bg-[#f5f5f7]/10 px-3 py-1 text-xs font-mono uppercase tracking-widest text-white/80 mb-6">
                                        {tab.bottomTagline || "Initiative"}
                                    </div>
                                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tighter leading-[1.1]">
                                        {tab.headline}
                                    </h2>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Dynamic Content */}
                    <div className="grid pt-0 lg:pt-5">
                        {tabs.map((tab, index) => (
                            <div
                                key={tab.id}
                                className={cn(
                                    "col-start-1 row-start-1 space-y-12 transition-all duration-500",
                                    activeTab === index
                                        ? "opacity-100 translate-x-0 pointer-events-auto"
                                        : "opacity-0 translate-x-8 pointer-events-none"
                                )}
                            >
                                <div className="space-y-10">
                                    {tab.features.map((feature, i) => (
                                        <div key={i} className="space-y-3">
                                            <h3 className="text-2xl font-medium text-white">{feature.title}</h3>
                                            <p className="text-lg text-white/50 leading-relaxed">
                                                {feature.text}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
}
