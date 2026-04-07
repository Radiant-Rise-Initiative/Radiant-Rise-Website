"use client";

import { MetricStatistics } from "@/components/ui/MetricStatistics";

const stats = [
    {
        topLabel: "Economic Empowerment",
        topValue: "16",
        topModalTitle: "16 Job Placements",
        topDescription: "Radiant Rise Initiative has successfully secured 16 tailoring job placements for young mothers, marking a critical milestone in our income activation phase. By connecting practical vocational training directly to market-aligned employment opportunities, we ensure participants transition effectively from vulnerability to sustained economic stability. This targeted approach to localized job creation in Kampala actively reduces household poverty, decreases economic shocks, and fosters long-term self-reliance within the community.",
        bottomLabel: "Month Program Cycle",
        bottomValue: "6",
        bottomModalTitle: "6-Month Cohort Pathway",
        bottomDescription: "Radiant Rise is formalizing a structured six-month cohort model serving Acholi Quarters to create lasting household stability. This deliberate timeframe allows participants to thoroughly engage in our core sequence: emotional recovery, market-aligned skills development, income activation, and savings retention. It provides the exact sustained support necessary to effectively break long-standing cycles of urban poverty and build measurable, long-term economic resilience for local families.",
    },
    {
        topLabel: "Year Strategic MOU",
        topValue: "5",
        topModalTitle: "5-Year MOU Employer Pipeline",
        topDescription: "To guarantee a sustained employment pipeline for youth and young mothers, Radiant Rise has signed a five-year Memorandum of Understanding with Fine Spinners. This strategic employer partnership bridges the critical gap between initial skills acquisition and formal job placement. By securing long-term commitments from private sector employers, we are building a highly reliable foundation for household economic resilience and reducing irregular income cycles in Uganda.",
        bottomLabel: "Evidence-Based Intervention",
        bottomValue: "2+1",
        bottomModalTitle: "2 Baseline Studies",
        bottomDescription: "Before implementing any core programs, a comprehensive community needs assessment and a detailed feasibility study were systematically conducted in Acholi Quarters. These crucial baseline studies ensured our trauma-informed support and vocational training interventions are culturally appropriate, economically viable, and practical. By actively listening to diverse stakeholders, we guarantee that our initiatives are directly responsive to the unique socio-economic challenges deeply affecting vulnerable youths and young mothers.",
    },
    {
        topLabel: "Local Trust & Buy-In",
        topValue: "90%",
        topModalTitle: "90% Community Approval",
        topDescription: "Following our extensive grassroots mobilization efforts between November 2025 and February 2026, ninety percent of community members formally welcomed the initiative. This overwhelming support from Acholi Quarters, engaged young mothers and surrounding community through needs assessment and discussions, highlights a profound trust in our community-owned model. It firmly demonstrates that the Quarters is fully ready to collaboratively build coordinated economic pathways that replace fragmented support systems and strengthen every household.",
        bottomLabel: "Deep Community Focus",
        bottomValue: "1",
        bottomModalTitle: "1 Target Settlement",
        bottomDescription: "We intentionally concentrate our programmatic efforts within one specific informal urban settlement: Acholi Quarters in Kampala, Uganda. Rather than pursuing rapid geographic expansion, Radiant Rise prioritizes depth, continuity, and measurable impact. Building a disciplined, repeatable resilience model within a single community allows us to profoundly understand and effectively address the intricate convergence of localized youth unemployment, early pregnancy, and the heavy burdens of survival work.",
    },
    {
        topLabel: "Holistic Methodology",
        topValue: "4",
        topModalTitle: "4 Intervention Stages",
        topDescription: "Our household economic resilience model operates through a rigorous pathway featuring four sequential stages: stabilize, build, activate, and reinforce. The sequence matters immensely; if any single element is missing, individual progress collapses. By seamlessly integrating trauma-informed counseling, market-aligned skills training, formal job placement, and structured savings participation, we guarantee a comprehensive ecosystem that effectively moves participants from immediate crisis toward long-term independence.",
        bottomLabel: "Organizational Foundation",
        bottomValue: "2025",
        bottomModalTitle: "Established in 2025",
        bottomDescription: "Radiant Rise Initiative was officially formed in July 2025 in direct response to the urgent need for coordinated economic support in informal urban settlements. Founded by Agnes Oyella, who experienced the harsh realities of Acholi Quarters firsthand, our registered indigenous NGO operates with a clear mandate. We aim to transform historically fragmented aid into sustained household economic resilience for Uganda's most vulnerable youth and young mothers.",
    },
];

export function ImpactStats({ 
    title, 
    description,
    imageSrc,
    overallMetric 
}: { 
    title?: string, 
    description?: string,
    imageSrc?: string,
    overallMetric?: { label: string, value: string }
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
