"use client";

import { AutomatedInfoTabs, InfoTab } from "@/components/ui/AutomatedInfoTabs";

const whoWeAreTabs: InfoTab[] = [
    {
        id: "compassion",
        label: "Compassion",
        bottomTagline: "INITIATIVE",
        headline: "Heart-led Transformation.",
        features: [
            { title: "Radical Empathy", text: "We serve with profound empathy, placing the distinct needs of every individual at the absolute center of our work." },
            { title: "Unwavering Dignity", text: "Every participant is treated with the highest respect, prioritizing their dignity above all else as they navigate their healing journey." },
            { title: "Holistic Sanctuary", text: "We create safe, supportive spaces where emotional recovery and physical well-being are nurtured with equal intensity." }
        ]
    },
    {
        id: "empowerment",
        label: "Empowerment",
        bottomTagline: "OUR DRIVE",
        headline: "Unlocking Potential.",
        features: [
            { title: "Practical Toolkits", text: "We equip youth and young mothers with the tangible tools and opportunities necessary to unlock their full potential." },
            { title: "Sustainable Livelihoods", text: "Our focus extends beyond temporary relief, offering mentorship and entrepreneurship skills for resilient, long-term stability." },
            { title: "Community Uplift", text: "By empowering individuals to rise above adversity, we build their capacity to actively uplift and transform their own communities." }
        ]
    },
    {
        id: "inclusiveness",
        label: "Inclusiveness",
        bottomTagline: "OUR CULTURE",
        headline: "Amplifying Voices.",
        features: [
            { title: "Embracing Diversity", text: "We intentionally embrace diversity, welcoming vulnerable youths, teenagers, and young mothers from all backgrounds and circumstances." },
            { title: "Participatory Dialogue", text: "We ensure all voices are heard by maintaining open, participatory platforms where the community can openly share their experiences and aspirations." },
            { title: "Social Equity", text: "We fiercely advocate for gender and social equity, raising awareness on the most pressing issues affecting vulnerable groups." }
        ]
    },
    {
        id: "integrity",
        label: "Integrity",
        bottomTagline: "OUR PROMISE",
        headline: "Rooted in Trust.",
        features: [
            { title: "Absolute Transparency", text: "We act with unwavering honesty and transparency across all our community partnerships, interventions, and programs." },
            { title: "Strict Accountability", text: "Our operations are guided by a deep commitment to accountability, ensuring every resource creates genuine, measurable impact." },
            { title: "Uncompromising Quality", text: "We constantly strive for excellence and the highest possible quality in our program delivery, daily operations, and community outcomes." }
        ]
    },
    {
        id: "faith",
        label: "Faith & Purpose",
        bottomTagline: "OUR ANCHOR",
        headline: "Guided by Belief.",
        features: [
            { title: "Purpose-Driven Action", text: "We are deeply guided by purpose, ensuring every single intervention aligns with our mission to nurture hope and self-reliance." },
            { title: "Inspired by Faith", text: "Inspired by faith, we operate with a steadfast commitment to serving and stabilizing the households of Acholi Quarters." },
            { title: "Values-Based Leadership", text: "We do not just teach skills; we actively nurture values-based leadership to foster moral and economic growth among our youth." }
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
