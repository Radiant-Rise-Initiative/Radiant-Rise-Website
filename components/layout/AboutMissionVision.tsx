"use client";

import Link from "next/link";
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
                <span className="text-[10px] md:text-xs font-mono tracking-[0.3em] uppercase text-black">
                    {label}
                </span>
            </div>
            <div className="flex flex-col items-start gap-8">
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-medium text-[#1A1A1A] leading-[1.2] tracking-tighter max-w-[1000px] -ml-1">
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
