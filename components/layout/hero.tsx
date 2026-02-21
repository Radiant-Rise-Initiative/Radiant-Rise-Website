"use client";

import { HeroUI } from "@/components/ui/Hero";

const images = [
    "/assets/placeholders/image-005.jpg",
    "/assets/placeholders/image-006.jpg",
    "/assets/placeholders/image-007.jpg",
    "/assets/placeholders/image-008.jpg"
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
