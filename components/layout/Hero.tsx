"use client";

import { HeroUI } from "@/components/ui/Hero";

const images = [
    "/assets/images/hero_images/hero_01.jpg",
    "/assets/images/hero_images/hero_02.jpg",
    "/assets/images/hero_images/hero_03.jpg",
    "/assets/images/hero_images/hero_04.jpg",
    "/assets/images/hero_images/hero_05.jpg"
];

export function Hero() {
    return (
        <HeroUI
            title="RISING TOGETHER"
            description="Nurturing hope, purpose, and self-reliance among youths and young mothers to rise above adversity. Equipping Youths and Young Mothers with skills that empower them to uplift their communities."
            images={images}
            actionText="Get to know us"
            onActionClick={() => {
                // Future action: scroll to about section or open modal
                console.log("Get to know us clicked");
            }}
        />
    );
}
