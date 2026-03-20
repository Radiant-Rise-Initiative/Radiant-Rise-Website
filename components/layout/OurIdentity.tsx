"use client";

import { ColumnInfoStack, StackItem } from "@/components/ui/ColumnInfoStack";

const identityItems: StackItem[] = [
    {
        id: "stabilize",
        number: "01",
        title: "Stabilize",
        description: "We begin with emotional recovery. Because trauma deeply affects confidence, decision-making, and job retention, we provide trauma-informed counseling and emotional support to create a firm foundation for personal and household stability.",
        linkText: "Learn more",
        modal: {
            topTagline: "Phase 01: Emotional Recovery",
            title: "Stabilize",
            text: "The journey to household economic resilience in Acholi Quarters begins with emotional recovery. Because unresolved trauma deeply affects a participant's confidence, daily decision-making, and long-term job retention, our first step is providing trauma-informed counseling. By offering safe, supportive spaces for vulnerable youth and young mothers, we ensure they stabilize emotionally before tackling economic challenges, creating a firm foundation for sustainable, intergenerational stability.",
        }
    },
    {
        id: "build",
        number: "02",
        title: "Build",
        description: "Once stabilized, participants focus on practical empowerment. We provide vocational and enterprise training, alongside financial literacy education, strictly aligned with local economic and employer demand to ensure our skills development is viable and relevant.",
        linkText: "Learn more",
        modal: {
            topTagline: "Phase 02: Skills Acquisition",
            title: "Build",
            text: "Once emotionally stabilized, participants focus on practical, market-driven empowerment. Radiant Rise provides targeted vocational skills and enterprise training that is strictly aligned with real employer demand and local economic realities. By coupling this vocational education with comprehensive financial literacy and life skills programs, we equip youths and young mothers with the precise tools needed to unlock their full potential and secure viable livelihood opportunities.",
        }
    },
    {
        id: "activate",
        number: "03",
        title: "Activate",
        description: "We actively bridge the gap between training and livelihood. Through strategic employer partnerships, direct job placement, and the provision of structured micro-enterprise toolkits, we activate immediate and sustained income streams for youth and young mothers.",
        linkText: "Learn more",
        modal: {
            topTagline: "Phase 03: Income Generation",
            title: "Activate",
            text: "Training alone is insufficient without direct pathways to livelihood. In the third phase, we actively bridge the gap between skill acquisition and sustained income generation. Through strategic employer partnerships, formal job placements, and the provision of structured micro-enterprise toolkits, we activate immediate revenue streams for our participants. This deliberate approach drastically reduces economic shocks and moves vulnerable households away from fragile survival work.",
        }
    },
    {
        id: "reinforce",
        number: "04",
        title: "Reinforce",
        description: "Stability requires continuity. To prevent the collapse of progress and reduce household economic shocks, we reinforce retention through continuous follow-up support, structured savings participation, and long-term problem-solving.",
        linkText: "Learn more",
        modal: {
            topTagline: "Phase 04: Sustained Resilience",
            title: "Reinforce",
            text: "True economic resilience requires continuity; if retention is ignored, progress inevitably collapses. The final stage of our six-month cohort model reinforces newly achieved stability through continuous follow-up support, proactive problem-solving, and structured savings participation. By fostering a strong savings culture and maintaining ongoing engagement, Radiant Rise ensures that young mothers and youth in Acholi Quarters maintain their economic gains and build stronger, self-reliant households over time.",
        }
    },
];

export function OurIdentity() {
    return (
        <ColumnInfoStack
            id="who-we-are"
            title="Who We Are"
            description="At the heart of the Radiant Rise Initiative are core values that guide every partnership and program we undertake. We serve with compassion and empathy, ensuring the dignity of the young mothers in our care is always respected."
            items={identityItems}
            onLinkClick={(id) => {
                console.log(`Navigating to identity pillar: ${id}`);
            }}
        />
    );
}
