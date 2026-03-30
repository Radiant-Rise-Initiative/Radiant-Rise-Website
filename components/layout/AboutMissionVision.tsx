"use client";

import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface MissionVisionItemProps {
    label: string;
    statement: string;
    className?: string;
}

function MissionVisionItem({ label, statement, className }: MissionVisionItemProps) {
    return (
        <div className={cn("grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-4 md:gap-16 py-14 border-b border-black/10 last:border-0 first:pt-0 last:pb-0", className)}>
            <div className="pt-1">
                <div className="inline-flex items-center gap-2 bg-black/5 px-3 py-1.5 text-[10px] sm:text-xs font-mono uppercase tracking-widest text-black/60 cursor-default group transition-colors">
                    {label}
                    <ArrowRight className="w-3.5 h-3.5 -mr-1 group-hover:translate-x-1 transition-transform" />
                </div>
            </div>
            <div className="flex flex-col items-start gap-8">
                <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-[#1A1A1A] leading-[1.3] tracking-tighter max-w-[1000px] -ml-1">
                    {statement}
                </h2>
            </div>
        </div>
    );
}

export function AboutMissionVision() {
    return (
        <section id="mission-vision" className="bg-white py-24 border-t border-black/5">
            <div className="max-w-[1280px] 2xl:max-w-[1440px] mx-auto w-full px-4 sm:px-12 lg:px-0">
                <MissionVisionItem 
                    label="OUR VISION"
                    statement="Nurturing Hope, Purpose and Self-Reliance Among Youths and Young Mothers to Rise Above Adversity."
                />
                <MissionVisionItem 
                    label="OUR MISSION"
                    statement="Equipping Youths and Young Mothers with Skills That Empower Them to Uplift Their Communities."
                />
            </div>
        </section>
    );
}
