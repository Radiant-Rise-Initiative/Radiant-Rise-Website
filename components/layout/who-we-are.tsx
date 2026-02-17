"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";

type Item = {
    id: string;
    number: string;
    title: string;
    description: string;
    linkText: string;
};

const items: Item[] = [
    {
        id: "analyze",
        number: "1",
        title: "Analyze",
        description: "Gain complete visibility into your processes to identify inefficiencies and opportunities for value generation.",
        linkText: "Learn more",
    },
    {
        id: "design",
        number: "2",
        title: "Design",
        description: "Redesign the target state of your operations based on the insights gained in analysis. Set outcomes, guardrails, and AI insertion points — with the help of best-practice blueprints.",
        linkText: "Learn more",
    },
    {
        id: "operate",
        number: "3",
        title: "Operate",
        description: "Run your processes intelligently with real-time interventions and automation that ensure peak performance.",
        linkText: "Learn more",
    },
    {
        id: "solutions",
        number: "4",
        title: "Composable Solutions",
        description: "Build custom apps and automation flows tailored to your specific business needs using our flexible platform.",
        linkText: "Learn more",
    },
];

export function WhoWeAre() {
    const [hoveredId, setHoveredId] = useState<string | null>(null);

    // Default to 'design' being expanded if nothing is hovered, or maybe just none?
    // Let's stick to interaction: if none hovered, maybe all equal?
    // Or let's have one default open layout?
    // The prompt implies "expand to reveal", which usually means they are closed (title only) and open on hover.
    // Let's try: default equal width, hover expands one.

    return (
        <section data-theme="dark" className="bg-black text-white py-24 border-t border-white/10">
            <div className="max-w-[1280px] 2xl:max-w-[1440px] mx-auto w-full">
                {/* Header Section */}
                <div className="mb-16 max-w-2xl">
                    <h2 className="text-2xl font-medium mb-4">The Build Experience</h2>
                    <p className="text-xl text-white/60 leading-relaxed font-light">
                        Analyze, design, and operate composable, AI-driven business processes. Build and run new applications that are strategic, operational, and business-critical.
                    </p>
                </div>

                {/* Interactive Grid */}
                <div className="h-[600px] flex flex-col md:flex-row bg-[#111]">
                    {items.map((item) => {
                        const isHovered = hoveredId === item.id;
                        // If something is hovered, and it's this one -> flex-[2] or [3]
                        // If something is hovered, and it's NOT this one -> flex-[1]
                        // If nothing is hovered -> flex-[1]

                        return (
                            <div
                                key={item.id}
                                onMouseEnter={() => setHoveredId(item.id)}
                                onMouseLeave={() => setHoveredId(null)}
                                className={`
                                group relative border-r border-b md:border-b-0 border-white/10 p-8 md:p-12 flex flex-col justify-between transition-all duration-500 ease-in-out cursor-pointer overflow-hidden
                                last:border-r-0 last:border-b-0
                                ${hoveredId === item.id ? "md:flex-[2.5]" : "md:flex-1"}
                                ${!hoveredId ? "md:flex-1" : ""}
                                min-h-[300px] md:min-h-auto
                            `}
                            >
                                {/* Top Content */}
                                <div>
                                    <h3 className="text-xl font-medium tracking-tight mb-8">
                                        {item.title}
                                    </h3>

                                    <div
                                        className={`
                                        overflow-hidden transition-all duration-500 ease-in-out
                                        ${isHovered ? "opacity-100 max-h-[400px] translate-y-0 delay-[300ms]" : "opacity-0 max-h-0 translate-y-4 md:opacity-0 md:max-h-0 delay-0"}
                                    `}
                                    >
                                        <p className="text-lg text-white/80 leading-relaxed mb-8 max-w-md">
                                            {item.description}
                                        </p>
                                        <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-orange-500">
                                            {item.linkText}
                                            <ArrowRight size={16} />
                                        </div>
                                    </div>
                                </div>

                                {/* Bottom Number */}
                                <div className="mt-8">
                                    <span className={`
                                        block text-6xl md:text-8xl font-light tracking-tighter transition-colors duration-300
                                        ${isHovered ? "text-white" : "text-white/20"}
                                    `}>
                                        {item.number}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
