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
        id: "healing",
        number: "01",
        title: "Healing Programs",
        description: "We host post-trauma and adversity counseling sessions with mental health experts to support young mothers.",
        linkText: "Learn more",
    },
    {
        id: "community",
        number: "02",
        title: "Community Assessment",
        description: "Our interventions are designed based on community needs assessments to address specific identified gaps.",
        linkText: "Learn more",
    },
    {
        id: "holistic",
        number: "03",
        title: "Holistic Growth",
        description: "Our activities range from storytelling workshops and inspirational sessions to aerobics and wellness programs.",
        linkText: "Learn more",
    },
    {
        id: "economic",
        number: "04",
        title: "Economic Empowerment",
        description: "We connect participants to job opportunities, provide vocational training, and promote financial inclusion.",
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
        <section id="who-we-are" data-theme="dark" className="bg-black text-white py-24 border-t border-white/10">
            <div className="max-w-[1280px] 2xl:max-w-[1440px] mx-auto w-full px-4 sm:px-12">
                {/* Header Section */}
                <div className="mb-16 max-w-2xl">
                    <h2 className="text-2xl font-medium mb-4">Who We Are</h2>
                    <p className="text-xl text-white/60 leading-relaxed font-light">
                        At the heart of the Radiant Rise Initiative are core values that guide every partnership and program we undertake. We serve with compassion and empathy, ensuring the dignity of the young mothers in our care is always respected.
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
