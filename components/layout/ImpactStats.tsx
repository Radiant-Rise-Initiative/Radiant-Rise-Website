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
    overallMetric?: { label: string, value: string, modalTitle?: string },
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
                modalTitle: overallMetric?.modalTitle || "105 Young Mothers Mobilized",
                description: description || "During our critical initial community mobilization phase, one hundred and five young mothers successfully registered and were comprehensively profiled. By rigorously documenting their education status, current employment levels, and savings practices, we established a vital, data-driven baseline for all future programming. Empowering these specific women, who constantly balance caregiving with basic survival work, remains the absolute cornerstone of our mission to nurture intergenerational economic stability across Acholi Quarters."
            }}
        />
    );
}
