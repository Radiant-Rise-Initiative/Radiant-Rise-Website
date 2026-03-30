"use client";

import { HeroUI } from "@/components/ui/Hero";

const defaultImages = [
    "/assets/images/hero_images/hero_001.jpg",
    "/assets/images/hero_images/hero_002.jpg",
    "/assets/images/hero_images/hero_003.jpg",
    "/assets/images/hero_images/hero_004.jpg",
    "/assets/images/hero_images/hero_005.jpg",
    "/assets/images/hero_images/hero_006.jpg"
];

const defaultDescriptions = [
    "Born from the lived realities of Acholi Quarters, a slum in Kampala, the Radiant Rise Initiative is a community-owned movement that empowers young mothers and vulnerable youths through a six-month pathway.",
    "Radiant Rise Initiative pairs post-trauma healing with need-based vocational skills, fostering the emotional and economic recovery needed to lead purposeful, self-reliant lives that rebuild communities and reduce household vulnerability.",
    "Radiant Rise Initiative focuses on breaking cycles of poverty by equipping participants with vocational skills, a spiritual foundation, and resilience. It aims to build intergenerational economic stability and stronger, self-reliant communities.",
    "Radiant Rise Initiative provides holistic, faith-driven empowerment that addresses not just immediate economic needs, but deep emotional and spiritual well-being to ensure lasting transformation from brokenness to stability and self-reliance.",
    "Radiant Rise Initiative is driven by faith, inclusiveness, and an unwavering commitment to human dignity, creating a safe sanctuary where vulnerable youths and young mothers can truly heal, thrive, and lead.",
    "Radiant Rise Initiative is an indigenous non-governmental organisation based in Kampala, fully registered with the Uganda National NGO Bureau with a 5-year renewable permit to operate and empower vulnerable communities."
];

export function Hero({ 
    title = "RISING TOGETHER",
    images = defaultImages,
    description = defaultDescriptions,
    imageClassName,
    imageStyle,
    contentStyle
}: { 
    title?: React.ReactNode,
    images?: string[],
    description?: string | string[],
    imageClassName?: string,
    imageStyle?: React.CSSProperties,
    contentStyle?: React.CSSProperties
}) {
    return (
        <HeroUI
            title={title}
            description={description}
            images={images}
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
