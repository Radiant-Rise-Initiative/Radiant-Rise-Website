"use client";

import { InfoCarouselComponent, CarouselItem } from "@/components/ui/InfoCarouselComponent";

const stories: CarouselItem[] = [
    {
        id: 1,
        title: "Profiling 105 Mothers for Coordinated Growth",
        tag: "GRASSROOTS DATA",
        description: "Learn how listening to 105 young mothers through community mobilization is helping us replace fragmented aid with a coordinated ecosystem of resilience.",
        image: "/assets/images/stories-images/story_01.jpg",
        linkText: "Read more",
        modal: {
            topTagline: "GRASSROOTS DATA",
            title: "Profiling 105 Mothers for Coordinated Growth",
            text: "Between November 2025 and February 2026, Radiant Rise undertook a massive community mobilization effort to listen before designing our interventions. We successfully registered and profiled 105 young mothers, documenting their specific education status, employment levels, skills, and savings practices to establish a data-driven baseline. We discovered that the pattern of poverty in Acholi Quarters was not a result of individual failure, but of fragmented support—where training, counseling, and jobs existed in isolation. By mapping these lives, we are actively replacing episodic aid with a unified ecosystem of household economic resilience."
        }
    },
    {
        id: 2,
        title: "Conducting the Comprehensive Needs Assessment",
        tag: "COMMUNITY ENGAGEMENT",
        description: "Discover how our September 2025 participatory assessment gave diverse community voices a platform to actively shape inclusive, responsive interventions.",
        image: "/assets/images/stories-images/story_02.jpg",
        linkText: "Read more",
        modal: {
            topTagline: "COMMUNITY ENGAGEMENT",
            title: "Conducting the Comprehensive Needs Assessment",
            text: "On September 12th, 2025, Radiant Rise Initiative conducted a comprehensive needs assessment in Acholi Quarters. This exercise created a participatory platform where diverse voices—including young mothers, male youth, senior men, and religious leaders—could openly share their experiences and aspirations. By deliberately engaging a wide spectrum of stakeholders, we ensured that future interventions are genuinely responsive and community-driven. Through interactive dialogue, participants highlighted critical concerns affecting livelihoods and family stability, ultimately strengthening the trust and collaboration required for sustainable change."
        }
    },
    {
        id: 3,
        title: "Validating Interventions Through Feasibility Studies",
        tag: "EVIDENCE-BASED STRATEGY",
        description: "Learn how our rigorous feasibility study ensured that our proposed community solutions are economically viable, culturally appropriate, and sustainable.",
        image: "/assets/images/stories-images/story_03.jpg",
        linkText: "Read more",
        modal: {
            topTagline: "EVIDENCE-BASED STRATEGY",
            title: "Validating Interventions Through Feasibility Studies",
            text: "Following our initial needs assessment, Radiant Rise conducted a critical feasibility study in Acholi Quarters to analyze the practicality and sustainability of proposed interventions. This crucial step determined whether suggested solutions were culturally appropriate and economically viable. We focused heavily on priority groups, paying particular attention to young mothers aged 14 to 25 to explore their specific challenges and actionable solutions. By actively consulting youths, senior men, and local leadership, we ensured that our resilience model perfectly aligns with existing family dynamics and structural realities before full implementation."
        }
    },
    {
        id: 4,
        title: "Securing 16 Job Placements & A 5-Year Pipeline",
        tag: "ECONOMIC ACTIVATION",
        description: "Discover how our structured pathway secured 16 tailoring job placements and a five-year employer pipeline with Fine Spinners to activate sustained income.",
        image: "/assets/images/stories-images/story_04.jpg",
        linkText: "Read more",
        modal: {
            topTagline: "ECONOMIC ACTIVATION",
            title: "Securing 16 Job Placements & A 5-Year Pipeline",
            text: "Training without opportunity often leads to frustration; therefore, income must be deliberately activated. Radiant Rise has already demonstrated early, concrete movement in bridging the gap between skill acquisition and sustained livelihood. In our initial activation phase, we successfully secured 16 tailoring job placements for young mothers in our community. To ensure this is not just a temporary victory, we also signed a strategic five-year Memorandum of Understanding (MOU) with Fine Spinners. This monumental partnership creates a reliable, sustained employment pipeline, directly reducing household economic shocks and proving that our structured intervention model works."
        }
    }
];

export function ImpactStories() {
    return (
        <InfoCarouselComponent
            id="impact-stories"
            sectionTitle="Impact Stories"
            sectionLinkText="See All Impact Stories"
            sectionHref="#"
            items={stories}
        />
    );
}
