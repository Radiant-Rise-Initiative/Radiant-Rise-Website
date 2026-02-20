"use client";

import { AutomatedInfoTabs, InfoTab } from "@/components/ui/AutomatedInfoTabs";

const whoWeAreTabs: InfoTab[] = [
    {
        id: "compassion",
        label: "Compassion",
        headline: "Heart-led Transformation.",
        features: [
            { title: "Radical Empathy", text: "We go beyond service, building deep emotional bonds that foster true healing and belonging." },
            { title: "Unwavering Dignity", text: "Every individual is treated with the highest respect, regardless of their past or present circumstances." },
            { title: "Holistic Sanctuary", text: "Creating safe spaces where physical, emotional, and spiritual needs are met with equal intensity." }
        ]
    },
    {
        id: "empowerment",
        label: "Empowerment",
        headline: "Architects of Independence.",
        features: [
            { title: "Market Mastery", text: "Vocational training that competes on the global stage, from advanced textiles to digital excellence." },
            { title: "Financial Dominance", text: "Promoting a culture of aggressive saving and investment through our proprietary inclusion modules." },
            { title: "Sustained Self-Reliance", text: "Ending the cycle of dependency by fostering a rugged mindset of individual and community ownership." }
        ]
    },
    {
        id: "integrity",
        label: "Integrity",
        headline: "Relentless Accountability.",
        features: [
            { title: "Total Transparency", text: "Ensuring every stakeholder can explore how our programs truly run, identify the most impactful use cases for capital, and understand how to prevent problems altogether." },
            { title: "Excellence Protocol", text: "Redesigning the target state of our operations based on high-integrity data. Setting outcomes, guardrails, and success points with best-practice blueprints." },
            { title: "Audit-Ready Impact", text: "Operating our new modules with precision, orchestrating solutions alongside our people and systems to transform and continuously improve community ROI." }
        ]
    },
    {
        id: "inclusiveness",
        label: "Inclusiveness",
        headline: "Universal Empowerment.",
        features: [
            { title: "Barrier-Free Access", text: "Opening doors for vulnerable youths regardless of origin, background, or previous trauma." },
            { title: "Global Sustainability", text: "Building systems that thrive today and scale for generations to come across every network." },
            { title: "Community Synergy", text: "Uniting diverse stakeholders into a single, high-performance ecosystem of mutual growth and support." }
        ]
    },
    {
        id: "faith",
        label: "Faith & Purpose",
        headline: "Purpose-Driven Power.",
        features: [
            { title: "Faith-Led Foundation", text: "Integrating spiritual strength with practical action to build unshakable character and resilience." },
            { title: "Audacious Vision", text: "Setting goals that others call impossible and achieving them through relentless, faith-based effort." },
            { title: "Future Leadership", text: "Transforming participants into mentors who will lead the next wave of Radiant Rise global initiatives." }
        ]
    }
];

export function WhoWeAreTabs() {
    return (
        <AutomatedInfoTabs
            id="who-we-are"
            tabs={whoWeAreTabs}
            durationPerTab={5000}
        />
    );
}
