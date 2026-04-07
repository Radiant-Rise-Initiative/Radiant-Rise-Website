"use client";

import { TestimonialSlider, TestimonialItem } from "@/components/ui/TestimonialSlider";

interface ImpactMilestonesProps {
    sectionLabel?: string;
    testimonials?: TestimonialItem[];
}

export function ImpactMilestones({ 
    sectionLabel = "IMPACT MILESTONES", 
    testimonials = [] 
}: ImpactMilestonesProps) {
    return (
        <TestimonialSlider
            id="impact-milestones"
            testimonials={testimonials}
            sectionLabel={sectionLabel}
        />
    );
}
