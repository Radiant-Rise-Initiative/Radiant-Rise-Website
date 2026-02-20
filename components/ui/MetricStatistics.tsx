"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/ui/SectionHeader";

interface Metric {
    label: string;
    value: string;
    description: string;
}

interface StatPair {
    topLabel: string;
    topValue: string;
    topDescription: string;
    bottomLabel: string;
    bottomValue: string;
    bottomDescription: string;
}

interface MetricStatisticsProps {
    title: string;
    linkText?: string;
    href?: string;
    stats: StatPair[];
    overallMetric?: {
        label: string;
        value: string;
    };
    className?: string;
    id?: string;
}

interface MetricModalProps {
    isOpen: boolean;
    onClose: () => void;
    metric: Metric | null;
}

function MetricModal({ isOpen, onClose, metric }: MetricModalProps) {
    if (!metric) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100]"
                    />
                    <div className="fixed inset-0 flex items-center justify-center z-[101] p-4 pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-[#f5f5f7] p-12 md:p-16 max-w-3xl w-full shadow-2xl pointer-events-auto relative"
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

function MetricItem({ label, value, description, onOpen }: MetricItemProps & { onOpen: (metric: Metric) => void }) {
    return (
        <div
            className="flex flex-col gap-6 lg:justify-between h-full lg:min-h-[220px] group relative cursor-pointer"
            onClick={() => onOpen({ label, value, description })}
        >
            <p className="text-sm font-medium text-black/60 leading-tight transition-colors group-hover:text-black/80">
                {label}
            </p>
            <div className="flex items-end justify-between gap-4">
                <p className="text-6xl sm:text-7xl font-semibold text-black tracking-tighter transition-colors duration-300 group-hover:text-orange-600 -ml-1 leading-[1.0]">
                    {value}
                </p>
                <div
                    className="opacity-100 md:opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-0 md:translate-y-4 group-hover:translate-y-0 bg-black/5 text-black/40 md:bg-black md:text-white p-2 rounded-full z-10 hover:bg-black/80 shrink-0 mb-1"
                >
                    <Plus size={20} />
                </div>
            </div>
        </div>
    );
}

interface MetricItemProps {
    label: string;
    value: string;
    description: string;
}

export function MetricStatistics({
    title,
    linkText,
    href,
    stats,
    overallMetric,
    className,
    id
}: MetricStatisticsProps) {
    const [selectedMetric, setSelectedMetric] = useState<Metric | null>(null);

    return (
        <section
            id={id}
            data-theme="light"
            className={cn("bg-[#f5f5f7] py-24 px-4 sm:px-12 relative", className)}
        >
            <div className="max-w-[1280px] 2xl:max-w-[1440px] mx-auto w-full">
                <SectionHeader
                    title={title}
                    linkText={linkText}
                    href={href}
                    className="mb-16 px-0"
                />

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
                                className={cn(
                                    "flex flex-col border-black/10 transition-colors relative border-b lg:border-b-0",
                                    index % 2 === 0 ? 'md:border-b-0' : '',
                                    index === 0 ? 'pl-0 md:pr-6' :
                                        index === 1 ? 'md:pl-6 lg:pr-6' :
                                            index === 2 ? 'lg:pl-6 md:pl-0 md:pr-6' :
                                                'lg:pl-6 md:pl-6 md:pr-0'
                                )}
                            >
                                <div className={cn(
                                    "absolute -right-px top-0 bottom-0 w-px bg-black/10 hidden",
                                    (index === 0 || index === 2) ? 'md:block' : '',
                                    (index === 1) ? 'lg:block' : '',
                                    (index === 3) ? '!hidden' : ''
                                )} />

                                <div className="flex flex-col h-full">
                                    <div
                                        className={cn(
                                            "group cursor-pointer lg:pt-0 pb-14 lg:pb-8",
                                            index === 0 ? 'pt-0' : 'pt-14'
                                        )}
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
                                            onOpen={setSelectedMetric}
                                        />
                                    </div>

                                    <div className="border-t border-black/10 w-full" />

                                    <div
                                        className="group cursor-pointer pt-14 lg:pt-8 pb-14 lg:pb-0"
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
                                            onOpen={setSelectedMetric}
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {overallMetric && (
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false, amount: 0 }}
                        transition={{ duration: 0.8, delay: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
                        className="max-w-[1280px] 2xl:max-w-[1440px] mx-auto w-full border-t-0 md:border-t border-black/10 transition-colors hover:bg-black/[0.01] mt-14 md:mt-16 pt-0 md:pt-16"
                    >
                        <div className="flex flex-col gap-6">
                            <p className="text-sm font-medium text-black/60 leading-tight">
                                {overallMetric.label}
                            </p>
                            <p className="text-6xl sm:text-7xl font-semibold text-black tracking-tighter -ml-1 leading-[1.0]">
                                {overallMetric.value}
                            </p>
                        </div>
                    </motion.div>
                )}
            </div>

            <MetricModal
                isOpen={!!selectedMetric}
                onClose={() => setSelectedMetric(null)}
                metric={selectedMetric}
            />
        </section>
    );
}
