"use client";

import { MetricStatistics } from "@/components/ui/metric-statistics";

const stats = [
    {
        topLabel: "Active Programs",
        topValue: "1.2K+",
        topDescription: "Radiant Rise Initiative has scaled its operations to over 1,200 active community-led programs. Our holistic approach ensures that hope and self-reliance are nurtured at every level of society, creating a sustainable path for those rising above adversity through faith-led, values-based leadership.",
        bottomLabel: "Skills Certified",
        bottomValue: "15K+",
        bottomDescription: "We have successfully certified over 15,000 individuals in vocational and technical skills. Operating with a valid permit from the Uganda National NGO Bureau, we provide structured support that empowers participants to uplift their communities and secure their economic future.",
    },
    {
        topLabel: "Partner NGOs",
        topValue: "500+",
        topDescription: "Our network has expanded to include over 500 strategic NGO partnerships globally. We collaborate to create meaningful community impact through post-adversity and trauma healing programs, ensuring our participants have access to a wide range of specialized support services.",
        bottomLabel: "Crisis Support",
        bottomValue: "24/7",
        bottomDescription: "We provide round-the-clock crisis intervention and support for young mothers in distress. Our data-driven approach, informed by comprehensive community needs assessments, allows us to address urgent mental health and safety gaps in real-time.",
    },
    {
        topLabel: "Young Mothers Empowered",
        topValue: "50K+",
        topDescription: "Over 50,000 young mothers have been empowered through our core interventions. We prioritize physical and emotional wellness, hosting wellness sessions and talks that support mothers in their journey toward dignity and independence.",
        bottomLabel: "Empowerment Rate",
        bottomValue: "100%",
        bottomDescription: "Every participant in our program receives a tailored roadmap to self-reliance. We connect individuals to job opportunities, vocational training, and financial inclusion programs, ensuring a culture of saving and long-term economic stability.",
    },
    {
        topLabel: "Volunteer Hours",
        topValue: "12M+",
        topDescription: "Our global community has contributed over 12 million hours of dedicated service. This massive volunteer effort drives our impactful change, providing the mentorship and guidance needed to nurture values-based leadership among the youth we serve.",
        bottomLabel: "Success Ratio",
        bottomValue: "98%",
        bottomDescription: "Our programs maintain a 98% success ratio in participant reintegration and economic stability. By addressing the priorities of our target populations through specialized outreach, we achieve world-class results that transform lives and communities.",
    },
];

export function ImpactStats() {
    return (
        <MetricStatistics
            id="our-impact"
            title="Our Impact"
            linkText="Learn More"
            href="#"
            stats={stats}
            overallMetric={{
                label: "Global Outreach",
                value: "25M+ Lives Touched"
            }}
        />
    );
}
