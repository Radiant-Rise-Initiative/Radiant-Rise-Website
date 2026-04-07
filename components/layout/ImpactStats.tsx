"use client";

import { MetricStatistics } from "@/components/ui/MetricStatistics";

interface Metric {
    id: string;
    label: string;
    value: string;
    modalTitle: string;
    description: string;
}


export function ImpactStats({ 
    title, 
    description,
    overallMetric,
    stats = []
}: { 
    title?: string, 
    description?: string,
    overallMetric?: { label: string, value: string },
    stats?: Metric[]
}) {
    return (
        <MetricStatistics
            id="our-impact"
            title={title || ""}
            linkText="Learn More"
            href="#"
            stats={stats}
            overallMetric={{
                label: overallMetric?.label || "Grassroots Engagement",
                value: overallMetric?.value || "105 Young Mothers",
                modalTitle: "105 Young Mothers Mobilized",
                description: description || ""
            }}
        />
    );
}
