"use client";

import { TestimonialSlider, TestimonialItem } from "@/components/ui/TestimonialSlider";

const testimonialsData: TestimonialItem[] = [
    {
        id: "nakato",
        category: "YOUNG MOTHER",
        quote: "Radiant Rise didn't just give me skills; they gave me back my dignity. I went from feeling hopeless to leading a cooperative that now supports ten other young mothers in my village.",
        name: "Sarah Nakato",
        role: "Program Graduate",
        company: "Radiant Rise Initiative",
        image: "/assets/branding/splash-image-005.jpg",
    },
    {
        id: "babirye",
        category: "DEDICATED MENTOR",
        quote: "Watching these women transform from survivors into business owners is the greatest privilege of my life. The resilience here is unlike anything I've seen in twenty years of social work.",
        name: "Proscovia Babirye",
        role: "Lead Mentor",
        company: "Radiant Rise Initiative",
        image: "/assets/branding/splash-image-005.jpg",
    },
    {
        id: "okello",
        category: "BOARD MEMBER",
        quote: "Our integrity is our foundation. By mapping every intervention to real community needs, we ensure that every life touched by Radiant Rise is a life fundamentally changed for the better.",
        name: "Dr. James Okello",
        role: "Regional Director",
        company: "Radiant Rise Initiative",
        image: "/assets/branding/splash-image-005.jpg",
    },
    {
        id: "namuli",
        category: "COMMUNITY PARTNER",
        quote: "The ripple effect of their work is visible in every corner of our district. When you empower a young mother, you aren't just helping one person — you are uplifting an entire generation.",
        name: "Hon. Grace Namuli",
        role: "Local Council Leader",
        company: "Community Empowerment Hub",
        image: "/assets/branding/splash-image-005.jpg",
    },
];

export function Testimonials() {
    return (
        <TestimonialSlider
            testimonials={testimonialsData}
            sectionLabel="Testimonials"
        />
    );
}
