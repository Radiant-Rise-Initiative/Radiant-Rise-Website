"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const tabs = [
    {
        id: "compassion",
        label: "Compassion",
        headline: "Heart-led Transformation.",
        description: "We serve with radical empathy, putting the needs and dignity of every young mother at the center of our global mandate.",
        features: [
            { title: "Radical Empathy", text: "We go beyond service, building deep emotional bonds that foster true healing and belonging." },
            { title: "Unwavering Dignity", text: "Every individual is treated with the highest respect, regardless of their past or present circumstances." },
            { title: "Holistic Sanctuary", text: "Creating safe spaces where physical, emotional, and spiritual needs are met with equal intensity." }
        ]
    },
    {
        id: "empowerment",
        label: "Empowerment",
        headline: "Architects of Independence.",
        description: "We equip the next generation with the high-stakes skills and financial tools needed to dominate their economic futures.",
        features: [
            { title: "Market Mastery", text: "Vocational training that competes on the global stage, from advanced textiles to digital excellence." },
            { title: "Financial Dominance", text: "Promoting a culture of aggressive saving and investment through our proprietary inclusion modules." },
            { title: "Sustained Self-Reliance", text: "Ending the cycle of dependency by fostering a rugged mindset of individual and community ownership." }
        ]
    },
    {
        id: "integrity",
        label: "Integrity",
        headline: "Relentless Accountability.",
        description: "Our commitment to transparency is absolute. We help you identify growth areas, solve bottleneck challenges, and implement lasting community improvements.",
        features: [
            { title: "Total Transparency", text: "Ensuring every stakeholder can explore how our programs truly run, identify the most impactful use cases for capital, and understand how to prevent problems altogether." },
            { title: "Excellence Protocol", text: "Redesigning the target state of our operations based on high-integrity data. Setting outcomes, guardrails, and success points with best-practice blueprints." },
            { title: "Audit-Ready Impact", text: "Operating our new modules with precision, orchestrating solutions alongside our people and systems to transform and continuously improve community ROI." }
        ]
    },
    {
        id: "inclusiveness",
        label: "Inclusiveness",
        headline: "Universal Empowerment.",
        description: "We break down every barrier. Our programs are designed to be radically inclusive, ensuring no one is left behind in our collective rise.",
        features: [
            { title: "Barrier-Free Access", text: "Opening doors for vulnerable youths regardless of origin, background, or previous trauma." },
            { title: "Global Sustainability", text: "Building systems that thrive today and scale for generations to come across every network." },
            { title: "Community Synergy", text: "Uniting diverse stakeholders into a single, high-performance ecosystem of mutual growth and support." }
        ]
    },
    {
        id: "faith",
        label: "Faith & Purpose",
        headline: "Purpose-Driven Power.",
        description: "Fueled by faith and guided by an audacious vision, we nurture leaders who are ready to change the world.",
        features: [
            { title: "Faith-Led Foundation", text: "Integrating spiritual strength with practical action to build unshakable character and resilience." },
            { title: "Audacious Vision", text: "Setting goals that others call impossible and achieving them through relentless, faith-based effort." },
            { title: "Future Leadership", text: "Transforming participants into mentors who will lead the next wave of Radiant Rise global initiatives." }
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
