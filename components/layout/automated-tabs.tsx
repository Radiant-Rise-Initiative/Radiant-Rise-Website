"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const tabs = [
    {
        id: "ai",
        label: "Artificial Intelligence (AI)",
        headline: "Intelligence that acts.",
        description: "Transform your business with AI that doesn't just analyze, but acts. Drive automation, predict outcomes, and optimize processes in real-time.",
        features: [
            { title: "Predict", text: "Forecast future trends and behaviors with high accuracy." },
            { title: "Automate", text: "Eliminate manual tasks with intelligent process automation." },
            { title: "Optimize", text: "Continuously improve performance with self-learning algorithms." }
        ]
    },
    {
        id: "supply-chain",
        label: "Supply Chain",
        headline: "Resilience in motion.",
        description: "Build a supply chain that bends but never breaks. Gain end-to-end visibility and meaningful control over every link in your value chain.",
        features: [
            { title: "Visibility", text: "See your entire supply chain in real-time, from source to customer." },
            { title: "Agility", text: "Respond instantly to disruptions and changing market demands." },
            { title: "Sustainability", text: "Track and reduce your carbon footprint across the network." }
        ]
    },
    {
        id: "process",
        label: "Process Excellence",
        headline: "Everything works with us.",
        description: "Unlock the full potential of your operations. We help you identify inefficiencies, redesign workflows, and implement lasting improvements.",
        features: [
            { title: "Analyze", text: "Explore how your processes truly run, identify the most impactful and strategic use cases for AI, and understand not just how to fix prevent problems but prevent them altogether." },
            { title: "Design", text: "Redesign the target state of your operations based on the insights gained in analysis. Set outcomes, guardrails, and AI insertion points – with the help of best-practice blueprints." },
            { title: "Operate", text: "Operate your new process, orchestrating AI solutions alongside your people and systems to transform and continuously improve operations and generate tangible RoAI." }
        ]
    },
    {
        id: "finance",
        label: "Finance and Shared Services",
        headline: "Precision at scale.",
        description: "Modernize your financial operations for the digital age. specific solutions for accounts payable, receivable, and treasury management.",
        features: [
            { title: "Control", text: "Ensure compliance and reduce risk with automated governance." },
            { title: "Efficiency", text: "Accelerate closing cycles and reduce transaction costs." },
            { title: "Insight", text: "Turn financial data into strategic business intelligence." }
        ]
    },
    {
        id: "it",
        label: "IT",
        headline: "The backbone of innovation.",
        description: "Empower your organization with a robust, scalable, and secure IT infrastructure that drives digital transformation.",
        features: [
            { title: "Modernize", text: "Upgrade legacy systems to cloud-native architectures." },
            { title: "Secure", text: "Protect your digital assets with advanced cybersecurity protocols." },
            { title: "Scale", text: "Support growth with flexible and resilient IT foundations." }
        ]
    }
];

export function AutomatedTabs() {
    const [activeTab, setActiveTab] = useState(0);
    const [progress, setProgress] = useState(0);
    const duration = 5000; // 5 seconds per tab

    useEffect(() => {
        const intervalTime = 50; // Update every 50ms
        const steps = duration / intervalTime;
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
    }, [activeTab]);

    const handleTabClick = (index: number) => {
        setActiveTab(index);
        setProgress(0); // Reset progress on manual click
    };

    return (
        <section className="bg-black text-white py-24 overflow-hidden">
            <div className="max-w-[1280px] 2xl:max-w-[1440px] mx-auto px-0">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32">

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
                                    <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/10" />

                                    {/* Active Progress Bar */}
                                    {activeTab === index && (
                                        <motion.div
                                            className="absolute bottom-0 left-0 h-[1px] bg-white"
                                            initial={{ width: "0%" }}
                                            animate={{ width: `${progress}%` }}
                                            transition={{ ease: "linear", duration: 0.05 }}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Dynamic Bottom Headline section */}
                        <div className="mt-20 lg:mt-auto pt-10 grid">
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
                                    <div className="inline-block bg-white/10 px-3 py-1 text-xs font-mono uppercase tracking-widest text-white/80 mb-6">
                                        Initiative
                                    </div>
                                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tighter leading-[1.1]">
                                        {tab.headline}
                                    </h2>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Dynamic Content */}
                    <div className="grid pt-5">
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

                                <Link
                                    href="#"
                                    className="inline-flex items-center gap-2 text-white hover:text-white/70 transition-colors group"
                                >
                                    <span className="text-lg">Learn more</span>
                                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                                </Link>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
}
