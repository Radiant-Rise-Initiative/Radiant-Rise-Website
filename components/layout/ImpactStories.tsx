"use client";

import { InfoCarouselComponent, CarouselItem } from "@/components/ui/InfoCarouselComponent";

const stories: CarouselItem[] = [
    {
        id: 1,
        title: "The Mukono Project",
        tag: "Empowerment Story",
        description: "See how the Mukono Project achieved a 0% relapse rate in trauma recovery, empowering 200 young mothers to lead their own community-based healing circles and local cooperatives.",
        image: "/assets/images/stories-images/story_01.jpg",
        linkText: "Read more"
    },
    {
        id: 2,
        title: "Sarah's Textile Collective",
        tag: "Success Spotlight",
        description: "From a single vulnerable participant to a 50-person textile powerhouse, Sarah's story demonstrates the power of vocational skills in unlocking global export markets for local craftsmanship.",
        image: "/assets/images/stories-images/story_02.jpg",
        linkText: "Read more"
    },
    {
        id: 3,
        title: "Tech Rise Initiative",
        tag: "Impact Story",
        description: "Learn how Davis transformed from a street youth to a tech leader, founding a digital skills bootcamp that has already placed 500 young mothers in stable, high-paying remote roles.",
        image: "/assets/images/stories-images/story_03.jpg",
        linkText: "Read more"
    },
    {
        id: 4,
        title: "Village Savings Hub",
        tag: "Sustainability Story",
        description: "Our Village Savings and Loans modules have achieved a 100% financial inclusion rate across 12 districts, fostering a culture of self-reliance and community-led economic resilience.",
        image: "/assets/images/stories-images/story_04.jpg",
        linkText: "Read more"
    }
];

export function ImpactStories() {
    return (
        <InfoCarouselComponent
            sectionTitle="Impact Stories"
            sectionLinkText="See All Impact Stories"
            sectionHref="#"
            items={stories}
        />
    );
}
