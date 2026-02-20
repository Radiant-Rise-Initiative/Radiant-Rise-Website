"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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

interface MetricModalProps {
    isOpen: boolean;
    onClose: () => void;
    metric: {
        label: string;
        value: string;
        description: string;
    } | null;
}

function MetricModal({ isOpen, onClose, metric }: MetricModalProps) {
    if (!metric) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-md z-50"
                    />
                    {/* Modal */}
                    <div className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-[#f5f5f7] p-12 md:p-16 max-w-3xl w-full shadow-2xl pointer-events-auto relative rounded-[2rem]"
                        >
                            <button
                                onClick={onClose}
                                className="absolute top-8 right-8 p-2 bg-black text-white rounded-full hover:bg-black/80 transition-colors"
                            >
                                <X size={20} />
                            </button>
                            <div className="flex flex-col gap-6 pt-4">
                                <div>
                                    <h3 className="text-sm font-semibold text-black mb-4">
                                        {metric.label}
                                    </h3>
                                    <h2 className="text-4xl md:text-5xl font-bold text-black tracking-tight leading-[1.1]">
                                        {metric.value} {metric.label.toLowerCase()}
                                    </h2>
                                </div>
                                <div className="py-2">
                                    <p className="text-sm md:text-base text-black/70 leading-relaxed">
                                        {metric.description}
                                    </p>
                                </div>
                                <div className="pt-4">
                                    <button
                                        onClick={onClose}
                                        className="text-orange-600 font-medium hover:text-orange-700 transition-colors flex items-center gap-1 text-sm md:text-base underline underline-offset-4"
                                    >
                                        Close details
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}

interface MetricItemProps {
    label: string;
    value: string;
    description: string;
    onOpen: (metric: { label: string; value: string; description: string }) => void;
}

function MetricItem({ label, value, description, onOpen }: MetricItemProps) {
    return (
        <div
            className="flex flex-col justify-between h-full min-h-[220px] group relative cursor-pointer"
            onClick={() => onOpen({ label, value, description })}
        >
            <p className="text-sm font-medium text-black/60 leading-tight mb-8 transition-colors group-hover:text-black/80">
                {label}
            </p>
            <p className="text-6xl sm:text-7xl font-semibold text-black tracking-tighter transition-colors duration-300 group-hover:text-orange-600">
                {value}
            </p>

            {/* Plus Icon Button - Appears on Group Hover */}
            <div
                className="absolute bottom-1 right-0 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0 bg-black text-white p-2 rounded-full z-10 hover:bg-black/80"
            >
                <Plus size={20} />
            </div>
        </div>
    );
}

export function ImpactStats() {
    const [selectedMetric, setSelectedMetric] = useState<{ label: string; value: string; description: string } | null>(null);

    return (
        <section id="our-impact" data-theme="light" className="bg-[#f5f5f7] py-24 relative">
            <div className="max-w-[1280px] 2xl:max-w-[1440px] mx-auto w-full">
                <div className="flex justify-between items-end mb-16 px-0">
                    <h2 className="text-5xl md:text-6xl font-semibold text-black tracking-tight">
                        Our Impact
                    </h2>
                    <a
                        href="#"
                        className="text-xs font-medium border-b border-black pb-1 hover:text-black/70 hover:border-black/70 transition-colors uppercase tracking-wider"
                    >
                        Learn More
                    </a>
                </div>

                <motion.div
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: false, amount: 0.1 }}
                    variants={{
                        hidden: {},
                        show: {
                            transition: {
                                staggerChildren: 0.1,
                                delayChildren: 0.2
                            }
                        }
                    }}
                    className="relative"
                >
                    {/* Content Grid - Gaps removed to allow for padding-based hit areas */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                variants={{
                                    hidden: { opacity: 0, y: 40 },
                                    show: {
                                        opacity: 1,
                                        y: 0,
                                        transition: {
                                            duration: 0.8,
                                            ease: [0.21, 0.47, 0.32, 0.98]
                                        }
                                    }
                                }}
                                className={`flex flex-col border-black/10 transition-colors relative
                                    border-b lg:border-b-0
                                    ${index % 2 === 0 ? 'md:border-b-0' : ''} 
                                    py-12 lg:py-0
                                    
                                    /* Responsive Hit Area Padding / Flush Logic */
                                    ${index === 0 ? 'pl-0 pr-6' :
                                        index === 1 ? 'pl-6 lg:pr-6 md:pr-0' :
                                            index === 2 ? 'pr-6 lg:pl-6 md:pl-0' :
                                                'pr-0 pl-6'}
                                `}
                            >
                                {/* Vertical Divider - Absolute Positioned in the gap to the right */}
                                <div className={`absolute -right-px top-0 bottom-0 w-px bg-black/10 hidden
                                    ${(index === 0 || index === 2) ? 'md:block' : ''}
                                    ${(index === 1) ? 'lg:block' : ''}
                                    ${(index === 3) ? '!hidden' : ''} 
                                `} />

                                <div className="flex flex-col h-full">
                                    {/* Top Stat Container - Acts as the hit area */}
                                    <div
                                        className="group cursor-pointer pb-8"
                                        onClick={() => setSelectedMetric({
                                            label: stat.topLabel,
                                            value: stat.topValue,
                                            description: stat.topDescription
                                        })}
                                    >
                                        <MetricItem
                                            label={stat.topLabel}
                                            value={stat.topValue}
                                            description={stat.topDescription}
                                            onOpen={() => { }} /* Wrapper handles interaction */
                                        />
                                    </div>

                                    {/* Inset Horizontal Divider */}
                                    <div className="border-t border-black/10 w-full" />

                                    {/* Bottom Stat Container - Acts as the hit area */}
                                    <div
                                        className="group cursor-pointer pt-8"
                                        onClick={() => setSelectedMetric({
                                            label: stat.bottomLabel,
                                            value: stat.bottomValue,
                                            description: stat.bottomDescription
                                        })}
                                    >
                                        <MetricItem
                                            label={stat.bottomLabel}
                                            value={stat.bottomValue}
                                            description={stat.bottomDescription}
                                            onOpen={() => { }} /* Wrapper handles interaction */
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Overall Metric */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0 }}
                    transition={{ duration: 0.8, delay: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
                    className="max-w-[1280px] 2xl:max-w-[1440px] mx-auto w-full border-t border-black/10 transition-colors hover:bg-black/[0.01] mt-16 pt-16"
                >
                    <div className="flex flex-col">
                        <p className="text-sm font-medium text-black/60 leading-tight mb-8">
                            Global Outreach
                        </p>
                        <p className="text-6xl sm:text-7xl font-semibold text-black tracking-tighter">
                            25M+ Lives Touched
                        </p>
                    </div>
                </motion.div>
            </div>

            <MetricModal
                isOpen={!!selectedMetric}
                onClose={() => setSelectedMetric(null)}
                metric={selectedMetric}
            />
        </section>
    );
}
