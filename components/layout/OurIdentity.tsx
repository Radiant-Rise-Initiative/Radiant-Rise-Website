"use client";

import { ColumnInfoStack, StackItem } from "@/components/ui/ColumnInfoStack";

const identityItems: StackItem[] = [
    {
        id: "stabilize",
        number: "01",
        title: "Stabilize",
        description: "We begin with emotional recovery. Because trauma deeply affects confidence, decision-making, and job retention, we provide trauma-informed counseling and emotional support to create a firm foundation for personal and household stability.",
        linkText: "Learn more",
    },
    {
        id: "build",
        number: "02",
        title: "Build",
        description: "Once stabilized, participants focus on practical empowerment. We provide vocational and enterprise training, alongside financial literacy education, strictly aligned with local economic and employer demand to ensure our skills development is viable and relevant.",
        linkText: "Learn more",
    },
    {
        id: "activate",
        number: "03",
        title: "Activate",
        description: "We actively bridge the gap between training and livelihood. Through strategic employer partnerships, direct job placement, and the provision of structured micro-enterprise toolkits, we activate immediate and sustained income streams for youth and young mothers.",
        linkText: "Learn more",
    },
    {
        id: "reinforce",
        number: "04",
        title: "Reinforce",
        description: "Stability requires continuity. To prevent the collapse of progress and reduce household economic shocks, we reinforce retention through continuous follow-up support, structured savings participation, and long-term problem-solving.",
        linkText: "Learn more",
    },
];

export function OurIdentity() {
    return (
        <ColumnInfoStack
            id="our-identity"
            title="Our Identity"
            description="At the heart of the Radiant Rise Initiative are core values that guide every partnership and program we undertake. We serve with compassion and empathy, ensuring the dignity of the young mothers in our care is always respected."
            items={identityItems}
            onLinkClick={(id) => {
                console.log(`Navigating to identity pillar: ${id}`);
            }}
        />
    );
}
