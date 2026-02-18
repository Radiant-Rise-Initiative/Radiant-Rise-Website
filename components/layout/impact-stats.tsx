"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const stats = [
    {
        topLabel: "Investments made",
        topValue: "39",
        topDescription: "We have strategically deployed capital into 39 pioneering companies that are leading the charge in the global transition to a sustainable energy future. Our investment strategy is built upon identifying breakthrough technological advancements within sub-sectors such as advanced grid management systems, long-duration energy storage, and industrial decarbonization. Every potential portfolio company undergoes a rigorous, multi-stage validation process that assesses technical feasibility, commercial scalability, and long-term climate impact potential. By backing these visionary teams at a critical early stage, we are not just investing in financial assets; we are building the cornerstone infrastructure for a resilient, sustainable global economy that possesses the capacity to thrive for generations to come, creating value for both our partners and the planet.",
        bottomLabel: "Successful exits",
        bottomValue: "8",
        bottomDescription: "Our commitment to active operational partnership and deep strategic guidance has facilitated 8 high-value exits to date, delivering exceptional results for our investment partners. These liquidity events serve as powerful, market-based validation of our hands-on investment thesis, demonstrating that mature, scalable energy technologies can achieve significant commercial success. By bridging the critical gap between early-stage laboratory innovation and full-scale commercial deployment, we provide the necessary financial and operational runway for technologies to reach global maturity. These successes reinforce our position as a leader in the infrastructure sector and continue to attract the significant institutional interest required to fund the next wave of decarbonization pioneers on a global scale.",
    },
    {
        topLabel: "Portfolio operating countries",
        topValue: "43",
        topDescription: "Our global reach has expanded to 43 nations, reflecting the truly universal nature of the climate challenge and our steadfast commitment to implementing localized, high-impact solutions. Navigating diverse geopolitical and regulatory landscapes allows us to identify unique market opportunities, from centralized utility-scale infrastructure projects in emerging economies to decentralized, software-led grid optimizations in mature Western markets. This international presence provides us with unparalleled cross-market intelligence, enabling our portfolio companies to scale more effectively by applying proven technological models to new geographies. We believe that modern global infrastructure requires a truly global perspective, and our dedicated team works tirelessly to ensure our impact is felt in every corner of the world, from urban centers to rural communities.",
        bottomLabel: "Leverage",
        bottomValue: "$529M",
        bottomDescription: "We act as a critical catalyst for broader institutional investment, far exceeding our own capital commitments through strategically structured leverage. To date, our initial equity positions have directly unlocked over $529M in additional co-investment from leading global pension funds, sovereign wealth funds, and top-tier venture capital firms. This remarkable 14x leverage ratio is a testament to the trust that global markets place in our technical due diligence and strategic foresight. By significantly amplifying the financial reach of every dollar we deploy, we ensure that the breakthrough technologies our partners support have the massive capitalization required to dominate their respective markets and achieve gigaton-scale emissions reductions on an accelerated timeline that matches the urgency of the climate crisis.",
    },
    {
        topLabel: "Direct full-time jobs created",
        topValue: "2,515",
        topDescription: "The transition to a clean energy economy is one of the most significant engines for global job creation and economic development in the 21st century. Our portfolio companies have directly generated 2,515 high-skilled, full-time positions across the entire global value chain, from advanced R&D and precision manufacturing to field operations and complex project management. We prioritize supporting organizations that invest heavily in local workforce development and specialized training programs, ensuring that the benefits of the new green economy are distributed equibly across the communities where we operate. These are not merely temporary jobs; they are sustainable, future-proof careers that empower individuals, foster innovation, and strengthen the economic fabric of local regions for the long term, creating a more prosperous world for everyone.",
        bottomLabel: "First mover deals",
        bottomValue: "88%",
        bottomDescription: "Identifying value where others only see risk is the core of our investment philosophy, as evidenced by the fact that 88% of our portfolio consists of first-mover deals. These are opportunities where we were the first institutional partner to provide capital, often at a critical inflection point in the technology's technical and commercial development. By entering at this foundational stage, we secure a leading role in corporate governance, strategic direction, and intellectual property protection, maximizing the long-term value creation for our investors. Our ability to validate complex engineering challenges where traditional financiers often hesitate allows us to capture significant early-mover advantages and define the performance standards for the next generation of global energy and infrastructure technologies.",
    },
    {
        topLabel: "Cumulative metric tons of greenhouse gas emissions reduced",
        topValue: "379.7M",
        topDescription: "Our primary measure of success remains the tangible, verifiable reduction of global carbon emissions, with 379.7 million metric tons of CO2 equivalent avoided to date. This massive impact is equivalent to the total annual emissions of a mid-sized industrialized nation or the complete removal of over 85 million internal combustion vehicles from the road for an entire year. Every potential investment is subject to a rigorous climate impact assessment to ensure it has a credible, data-driven pathway to delivering gigaton-scale reductions over its full commercial lifecycle. We don't just invest in 'green' companies; we back the specific technological breakthroughs that possess both the physics and the economics necessary to fundamentally and permanently bend the global emissions curve downward in line with international targets.",
        bottomLabel: "Hardware & software innovations",
        bottomValue: "39",
        bottomDescription: "We believe that solving the most complex challenges of the climate crisis requires a deep, synergistic integration of physical hardware engineering and digital intelligence. Our portfolio of 39 breakthrough innovations represents the perfect convergence of 'atoms' and 'bits,' ranging from novel high-efficiency thermodynamic cycles and electrochemical storage cells to AI-driven predictive maintenance and autonomous grid balancing platforms. This 'full-stack' approach ensures that the physical infrastructure we build is not just robust, but also highly optimized through software for maximum efficiency, longevity, and interoperability. By supporting innovations that bridge the gap between physical systems and digital control, we are creating a more intelligent, responsive, and ultimately more sustainable global infrastructure for the modern age.",
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
                            className="bg-white p-12 md:p-16 max-w-3xl w-full shadow-2xl pointer-events-auto relative rounded-[2rem]"
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
                className="absolute bottom-1 right-0 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0 bg-black text-white p-2 rounded-full z-10"
            >
                <Plus size={20} />
            </div>
        </div>
    );
}

export function ImpactStats() {
    const [selectedMetric, setSelectedMetric] = useState<{ label: string; value: string; description: string } | null>(null);

    return (
        <section data-theme="light" className="bg-white py-24 relative">
            <div className="max-w-[1280px] 2xl:max-w-[1440px] mx-auto w-full">
                <div className="mb-16">
                    <h2 className="text-sm font-mono tracking-[0.2em] text-black uppercase">
                        Real Impact. Real Results.
                    </h2>
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
                            Livelihoods improved
                        </p>
                        <p className="text-6xl sm:text-7xl font-semibold text-black tracking-tighter">
                            +119.6 million
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
