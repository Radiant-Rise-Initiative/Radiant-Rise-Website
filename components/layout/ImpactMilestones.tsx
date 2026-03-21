"use client";

import { TestimonialSlider, TestimonialItem } from "@/components/ui/TestimonialSlider";

const testimonialsData: TestimonialItem[] = [
    {
        id: "empowering-mothers",
        category: "Empowering Young Mothers",
        quote: "We registered and profiled 105 young mothers, documenting their skills and education to create targeted pathways for their emotional and economic stability.",
        role: "Community Data",
        company: "Radiant Rise Initiative",
        image: "/assets/images/profile_images/Frame 1.jpg",
    },
    {
        id: "formal-employment",
        category: "Securing Formal Employment",
        quote: "We secured 16 tailoring job placements and established a five-year partnership with Fine Spinners, creating a sustained employment pipeline through market-aligned skill-building.",
        role: "Economic Activation",
        company: "Radiant Rise Initiative",
        image: "/assets/images/profile_images/Frame 2.jpg",
    },
    {
        id: "healing-stabilization",
        category: "Healing and Stabilization",
        quote: "Because trauma impacts confidence and job retention, our six-month pathway begins with trauma-informed counseling, helping youth stabilize before building market-relevant skills.",
        role: "Emotional Recovery",
        company: "Radiant Rise Initiative",
        image: "/assets/images/profile_images/Frame 3.jpg",
    },
    {
        id: "financial-resilience",
        category: "Fostering Financial Resilience",
        quote: "Because savings are rare and income loss has immediate impacts, we reinforce retention through structured savings participation, building financial cushions to reduce household vulnerability.",
        role: "Household Resilience",
        company: "Radiant Rise Initiative",
        image: "/assets/images/profile_images/Frame 4.jpg",
    },
];

export function ImpactMilestones() {
    return (
        <TestimonialSlider
            id="impact-milestones"
            testimonials={testimonialsData}
            sectionLabel="IMPACT MILESTONES"
        />
    );
}
