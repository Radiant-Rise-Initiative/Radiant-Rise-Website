"use client";

import { PurposeStatement } from "@/components/ui/PurposeStatement";

export function PurposeSection() {
    return (
        <PurposeStatement
            title="Radiant Rise"
            description="Dedicated to breaking cycles of poverty by equipping young mothers and youths with the vocational skills, spiritual foundation, and resilience needed to thrive."
            imageSrc="/assets/placeholders/image-004.jpg"
            imageAlt="Radiant Rise Purpose"
            actionText="Play Trailer"
            onActionClick={() => console.log("Play Trailer clicked")}
            infoPoints={[
                "To provide holistic empowerment that addresses not just economic needs, but emotional and spiritual well-being for lasting transformation.",
                "To build sustainable futures where every participant becomes a pillar of strength, driving self-reliance and prosperity within their community."
            ]}
        />
    );
}
