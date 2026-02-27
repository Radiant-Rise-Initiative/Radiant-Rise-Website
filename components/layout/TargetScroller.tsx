"use client";

import { InfoScroller, ScrollerItem } from "@/components/ui/InfoScroller";

const targetEntities: ScrollerItem[] = [
    {
        name: "PROGRAM RETENTION",
        category: "PROGRAM RETENTION",
        logo: <>85%<br />COMPLETION</>,
        description: "Ensuring our participants achieve high program retention and successfully navigate the full six-month structured pathway to stability.",
        image: "/assets/branding/splash-image-011.jpg",
    },
    {
        name: "EARLY INTERVENTION",
        category: "EARLY INTERVENTION",
        logo: <>50-60% SECURE INCOME<br />IN 3 MONTHS</>,
        description: "Accelerating the transition from vulnerability to active income through market-aligned vocational training and early intervention.",
        image: "/assets/branding/splash-image-012.jpg",
    },
    {
        name: "CAREER STABILITY",
        category: "CAREER STABILITY",
        logo: <>70% SECURE INCOME<br />IN 6 MONTHS</>,
        description: "Facilitating long-term job placement and employer partnerships within 6 months to reduce household economic shocks.",
        image: "/assets/branding/splash-image-013.jpg",
    },
    {
        name: "REVENUE EXPANSION",
        category: "REVENUE EXPANSION",
        logo: <>25%+ INCOME<br />INCREASE</>,
        description: "Targeting significant financial improvement and revenue expansion for at least half of our program participants.",
        image: "/assets/branding/splash-image-014.jpg",
    },
    {
        name: "ASSET BUILDING",
        category: "ASSET BUILDING",
        logo: <>MAJORITY<br />IN SAVINGS</>,
        description: "Reinforcing economic resilience by participating in structured savings groups and financial literacy education to build assets.",
        image: "/assets/branding/splash-image-011.jpg",
    },
    {
        name: "COMMUNITY REACH",
        category: "COMMUNITY REACH",
        logo: <>200 SERVED<br />ANNUALLY</>,
        description: "Scaling our community reach within Acholi Quarters to serve up to 200 young mothers and youth every year.",
        image: "/assets/branding/splash-image-012.jpg",
    },
    {
        name: "CURRENT ENGAGEMENT",
        category: "CURRENT ENGAGEMENT",
        logo: <>130 MOTHERS<br />RECRUITED</>,
        description: "Actively engaging and supporting a growing cohort of 130 young mothers through our registered indigenous organization.",
        image: "/assets/branding/splash-image-013.jpg",
    },
    {
        name: "COMMUNITY OWNERSHIP",
        category: "COMMUNITY OWNERSHIP",
        logo: <>15+ DEDICATED<br />VOLUNTEERS</>,
        description: "Building community ownership by leveraging dedicated volunteers' local talent and hearts to drive our mission and operations.",
        image: "/assets/branding/splash-image-014.jpg",
    },
    {
        name: "COST EFFECTIVENESS",
        category: "COST EFFECTIVENESS",
        logo: <>$300-$350 PER<br />PARTICIPANT</>,
        description: "Optimizing resources as a cost-effective investment to deliver trauma-informed counseling and vocational skills development.",
        image: "/assets/branding/splash-image-011.jpg",
    },
    {
        name: "OPERATIONAL CAPACITY",
        category: "OPERATIONAL CAPACITY",
        logo: <>$65K ANNUAL<br />BUDGET</>,
        description: "Maintaining an operational capacity supported by a $65,000 annual operating budget to serve approximately 150 participants.",
        image: "/assets/branding/splash-image-012.jpg",
    },
    {
        name: "EMPLOYMENT PIPELINE",
        category: "EMPLOYMENT PIPELINE",
        logo: <>16 TAILORING<br />PLACEMENTS</>,
        description: "Demonstrating a strong employment pipeline through 16 successful job placements and long-term industry partnerships.",
        image: "/assets/branding/splash-image-013.jpg",
    },
    {
        name: "STRUCTURED SUCCESS",
        category: "STRUCTURED SUCCESS",
        logo: <>6-MONTH COHORT<br />MODEL</>,
        description: "Implementing a structured six-month cohort model to move participants from trauma stabilization to income activation in one community ecosystem.",
        image: "/assets/branding/splash-image-014.jpg",
    }
];

export function TargetScroller() {
    return (
        <InfoScroller
            sectionTitle="Our Targets"
            sectionLinkText="See All Targets"
            sectionHref="/targets"
            items={targetEntities}
        />
    );
}
