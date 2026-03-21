"use client";

import { HeroUI } from "@/components/ui/Hero";

const images = [
    "/assets/images/hero_images/hero_01.jpg",
    "/assets/images/hero_images/hero_02.jpg",
    "/assets/images/hero_images/hero_03.jpg",
    "/assets/images/hero_images/hero_04.jpg",
    "/assets/images/hero_images/hero_05.jpg"
];

const descriptions = [
    "Driven by faith and radical inclusiveness, our indigenous organization empowers young mothers to unlock their full potential. Together, we are building intergenerational economic stability and stronger, self-reliant communities.",
    "Guided by compassion and purpose, we equip youth and young mothers with market-aligned skills. By nurturing hope and self-reliance, we empower them to rise above adversity and uplift communities.",
    "Replacing fragmented aid with a community-owned pathway, we seamlessly unite emotional recovery and economic activation. Together, we forge lasting household resilience and sustainable livelihoods for vulnerable young mothers.",
    "Confronting the deep impacts of youth unemployment and early pregnancy, we coordinate trauma-informed healing with strategic vocational partnerships. We actively transition families from daily survival toward sustained, dignified stability."
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
