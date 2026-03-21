"use client";

import { HeroUI } from "@/components/ui/Hero";

const images = [
    "/assets/images/hero_images/Hero 01.jpg",
    "/assets/images/hero_images/Hero 02.jpg",
    "/assets/images/hero_images/Hero 07.jpg",
    "/assets/images/hero_images/Hero 03.jpg",
    "/assets/images/hero_images/Hero 04.jpg",
    "/assets/images/hero_images/Hero 05.jpg"
];

const descriptions = [
    "Driven by faith and inclusiveness, we empower young mothers. We build intergenerational economic stability and stronger, self-reliant communities through our indigenous, community-owned model.",
    "Guided by compassion and purpose, we equip young mothers with market-aligned skills. By nurturing hope and self-reliance, we empower them to rise and uplift communities.",
    "Registered and permitted, our faith-driven organization empowers young mothers through renewable MOUs. We build intergenerational economic stability and self-reliant communities through community-owned models.",
    "Replacing fragmented aid with community-owned pathways, we unite emotional recovery and economic activation. We forge lasting household resilience and sustainable livelihoods for young mothers.",
    "Addressing youth unemployment and early pregnancy, we coordinate trauma-informed healing with vocational partnerships. We transition families from daily survival toward sustained, dignified household stability."
];

export function Hero() {
    return (
        <HeroUI
            title="RISING TOGETHER"
            description={descriptions}
            images={images}
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
