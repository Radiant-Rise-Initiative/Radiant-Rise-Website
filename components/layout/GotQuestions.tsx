import { SectionHeader } from "@/components/ui/SectionHeader";
import { QAInquiries, QAItem } from "@/components/ui/QAInquiries";

interface GotQuestionsProps {
    title?: string;
    linkText?: string;
    href?: string;
    items?: QAItem[];
}

export function GotQuestions({ 
    title = "Got Questions?", 
    linkText = "MAKE MORE INQUIRIES", 
    href = "#connect", 
    items = [] 
}: GotQuestionsProps) {
    return (
        <section id="got-questions" data-theme="light" className="bg-[#f5f5f7] py-24 px-4 sm:px-12 lg:px-0">
            <div className="max-w-[1280px] 2xl:max-w-[1440px] mx-auto w-full px-0">
                <SectionHeader
                    title={title}
                    linkText={linkText}
                    href={href}
                    className="mb-16 px-0"
                />
                <QAInquiries items={items} />
            </div>
        </section>
    );
}
