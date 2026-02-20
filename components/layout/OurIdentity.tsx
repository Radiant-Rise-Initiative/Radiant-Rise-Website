"use client";

import { ColumnInfoStack, StackItem } from "@/components/ui/ColumnInfoStack";

const identityItems: StackItem[] = [
    {
        id: "healing",
        number: "01",
        title: "Healing Programs",
        description: "We host post-trauma and adversity counseling sessions with mental health experts to support young mothers.",
        linkText: "Learn more",
    },
    {
        id: "community",
        number: "02",
        title: "Community Assessment",
        description: "Our interventions are designed based on community needs assessments to address specific identified gaps.",
        linkText: "Learn more",
    },
    {
        id: "holistic",
        number: "03",
        title: "Holistic Growth",
        description: "Our activities range from storytelling workshops and inspirational sessions to aerobics and wellness programs.",
        linkText: "Learn more",
    },
    {
        id: "economic",
        number: "04",
        title: "Economic Empowerment",
        description: "We connect participants to job opportunities, provide vocational training, and promote financial inclusion.",
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
