import { SectionHeader } from "@/components/ui/SectionHeader";
import { QAInquiries, QAItem } from "@/components/ui/QAInquiries";

const faqItems: QAItem[] = [
    {
        question: "What is the Radiant Rise Initiative?",
        answer: (
            <>
                <p>Radiant Rise Initiative is a registered indigenous organization located in Acholi Quarters, Kampala, Uganda. Founded in July 2025, it operates as a community-owned household economic resilience model. Our primary mission is to equip youths and young mothers with the skills needed to empower them to uplift their communities and rise above adversity.</p>
            </>
        ),
    },
    {
        question: "What specific challenges does your organization address?",
        answer: (
            <>
                <p>In informal urban settlements like Acholi Quarters, early pregnancy and youth unemployment converge, creating immense pressure that destabilizes entire households. We address the core problem of fragmented support systems, where vocational training, counseling, and job opportunities often exist in isolation. By replacing episodic aid with coordinated economic pathways, we help reduce vulnerability and unresolved trauma.</p>
            </>
        ),
    },
    {
        question: "How does your empowerment program work?",
        answer: (
            <>
                <p>We operate a structured six-month cohort pathway designed around a specific Theory of Change. The pathway consists of four integrated stages:</p>
                <p><strong>Stabilize:</strong> Providing trauma-informed counseling for emotional recovery.</p>
                <p><strong>Build:</strong> Delivering market-aligned vocational skills and financial literacy.</p>
                <p><strong>Activate:</strong> Facilitating job placements and providing start-up toolkits.</p>
                <p><strong>Reinforce:</strong> Supporting retention through savings participation and continuous follow-up.</p>
            </>
        ),
    },
    {
        question: "Who benefits directly from your interventions?",
        answer: (
            <>
                <p>Our primary beneficiaries are young mothers (aged 14–25), vulnerable youth, teenagers, and school dropouts residing in Acholi Quarters. Currently, we have actively recruited over 130 young mothers into our programs. We also actively engage male youth, community elders, and religious leaders to ensure our interventions promote inclusive, community-wide development.</p>
            </>
        ),
    },
    {
        question: "Why do you focus exclusively on Acholi Quarters instead of expanding rapidly?",
        answer: (
            <>
                <p>Radiant Rise is intentionally not seeking rapid geographic expansion. Instead, we prioritize building a disciplined, repeatable household economic resilience model within one defined community. By focusing heavily on depth, continuity, and measurable impact, we ensure that our interventions genuinely strengthen multiple lives and build intergenerational stability.</p>
            </>
        ),
    },
    {
        question: "How do you ensure participants find employment after their training?",
        answer: (
            <>
                <p>We actively bridge the gap between skills acquisition and actual livelihood through direct employer engagement and strategic partnerships. For instance, we successfully signed a five-year Memorandum of Understanding with Fine Spinners to create a sustained employment pipeline for our graduates. For those entering entrepreneurship, we provide structured micro-enterprise toolkits to activate immediate income generation.</p>
            </>
        ),
    },
    {
        question: "How do you measure the success of your programs?",
        answer: (
            <>
                <p>We track rigorous, data-driven targets for each cohort of 30 participants. Our core metrics for success include an 85% program completion rate and seeing 70% of participants secure a steady income within six months. Furthermore, our goal is for at least 50% of our participants to increase their income by 25% or more while actively participating in structured savings practices.</p>
            </>
        ),
    },
    {
        question: "Is Radiant Rise a registered entity, and how is it supported?",
        answer: (
            <>
                <p>Yes, Radiant Rise Initiative is fully registered with the Uganda National NGO Bureau and operates under a valid permit. Our daily operations are supported by a local board of four members, 15 dedicated community volunteers, and international well-wishers who believe in our mission. It requires an estimated investment of just $300 to $350 to support one participant through our comprehensive six-month pathway.</p>
            </>
        ),
    },
];

export function GotQuestions() {
    return (
        <section data-theme="light" className="bg-[#f5f5f7] py-24 px-4 sm:px-12 lg:px-0">
            <div className="max-w-[1280px] 2xl:max-w-[1440px] mx-auto w-full px-0">
                <SectionHeader
                    title="Got Questions?"
                    linkText="MAKE MORE INQUIRIES"
                    href="/contact"
                    className="mb-16 px-0"
                />
                <QAInquiries items={faqItems} />
            </div>
        </section>
    );
}
