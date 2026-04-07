"use client";

import { HeroUI } from "@/components/ui/Hero";

export function Hero({ 
    title = "RISING TOGETHER",
    images,
    description,
    slides,
    imageClassName,
    imageStyle,
    contentStyle
}: { 
    title?: React.ReactNode,
    images?: string[],
    description?: string | string[],
    slides?: { image: string, description: string }[],
    imageClassName?: string,
    imageStyle?: React.CSSProperties,
    contentStyle?: React.CSSProperties
}) {
    // If slides are provided from Supabase (passed via props), use them.
    const finalImages = slides ? slides.map(s => s.image) : (images || []);
    const finalDescription = slides ? slides.map(s => s.description) : (description || []);

    return (
        <HeroUI
            title={title}
            description={finalDescription}
            images={finalImages}
            imageClassName={imageClassName}
            imageStyle={imageStyle}
            contentStyle={contentStyle}
            actionText="Get to know us"
            onActionClick={() => {
                const section = document.getElementById("who-we-are");
                if (section) {
                    section.scrollIntoView({ behavior: "instant" });
                }
            }}
        />
    );
}
