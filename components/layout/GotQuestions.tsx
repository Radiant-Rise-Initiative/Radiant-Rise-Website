import { SectionHeader } from "@/components/ui/SectionHeader";
import { QAInquiries, QAItem } from "@/components/ui/QAInquiries";

const faqItems: QAItem[] = [
    {
        question: "Who can join the program?",
        answer: "We focus on young mothers and vulnerable youths in East Africa, starting with our regional hubs in Uganda, where we prioritize those rising above adversity through faith and self-reliance.",
    },
    {
        question: "How do we measure impact?",
        answer: "We track long-term self-reliance, community leadership roles, and the economic stability of our participants through rigorous, data-driven post-program follow-ups.",
    },
    {
        question: "What skills do we provide?",
        answer: "From high-end textiles and craftsmanship to digital literacy and values-based leadership, we equip our members with globally competitive tools to uplift their communities.",
    },
    {
        question: "Are we faith-based?",
        answer: "Yes, we are a faith-led organization that believes in the inherent dignity of every individual and the power of purpose-driven transformation to create lasting social change.",
    },
    {
        question: "How can I support the initiative?",
        answer: "You can partner with us through mentorship, vocational volunteering, or strategic donations. Every contribution directly funds the tools and training our participants need to achieve total self-reliance.",
    },
    {
        question: "What is the long-term vision?",
        answer: "Our goal is to build a network of self-sustaining communities where young mothers and youths lead the way in economic innovation and social resilience across all of East Africa.",
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
