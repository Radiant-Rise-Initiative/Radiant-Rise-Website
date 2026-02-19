"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface DonationInterfaceProps {
    className?: string;
}

export function DonationInterface({ className }: DonationInterfaceProps) {
    const [donationFrequency, setDonationFrequency] = useState<"once" | "monthly">("monthly");
    const [donationAmount, setDonationAmount] = useState<string>("100");
    const [isHonorGift, setIsHonorGift] = useState(false);

    return (
        <div className={cn("space-y-6 flex-1 flex flex-col", className)}>
            {/* Give Once / Recurring Toggle */}
            <div className="flex bg-[#f0f2f5] border border-black/5 p-1 rounded-none">
                <button
                    onClick={() => setDonationFrequency("once")}
                    className={cn(
                        "flex-1 py-3 text-xs font-bold uppercase tracking-widest transition-colors",
                        donationFrequency === "once"
                            ? "bg-white border border-black/5 text-orange-600 shadow-sm"
                            : "text-black/40 hover:text-black/60"
                    )}
                >
                    Give once
                </button>
                <button
                    onClick={() => setDonationFrequency("monthly")}
                    className={cn(
                        "flex-1 py-3 text-xs font-bold uppercase tracking-widest transition-colors",
                        donationFrequency === "monthly"
                            ? "bg-white border border-black/5 text-orange-600 shadow-sm"
                            : "text-black/40 hover:text-black/60"
                    )}
                >
                    Recurring
                </button>
            </div>

            {/* Selected Amount Display */}
            <div className="bg-white border border-black/10 p-6 flex justify-between items-center rounded-none">
                <span className="text-4xl font-semibold text-black tracking-tighter">${donationAmount}</span>
                <span className="text-sm font-mono tracking-widest text-black/40 uppercase">USD</span>
            </div>

            {/* Presets Grid */}
            <div className="grid grid-cols-3 gap-3">
                {["25", "50", "100", "250", "500", "1,000"].map((amount) => (
                    <button
                        key={amount}
                        onClick={() => setDonationAmount(amount)}
                        className={cn(
                            "py-4 rounded-none font-bold border transition-all text-sm tracking-widest",
                            donationAmount === amount
                                ? "bg-black text-white border-black"
                                : "bg-white border-black/10 text-black/60 hover:border-orange-500/50"
                        )}
                    >
                        ${amount}
                    </button>
                ))}
            </div>

            {/* Frequency Text */}
            <p className="text-xs font-mono tracking-widest text-black/40 uppercase">
                Frequency: <span className="text-black border-b border-black/20 pb-0.5 capitalize">{donationFrequency}</span>
            </p>

            {/* Honor Checkbox */}
            <button
                onClick={() => setIsHonorGift(!isHonorGift)}
                className="flex items-center gap-3 cursor-pointer group mt-2 w-fit"
            >
                <div className="w-5 h-5 bg-white border border-black/10 flex items-center justify-center transition-colors group-hover:border-orange-500/50">
                    <div className={cn(
                        "w-2.5 h-2.5 bg-orange-600 transition-transform",
                        isHonorGift ? "scale-100" : "scale-0"
                    )} />
                </div>
                <span className="text-xs font-medium text-black/60 group-hover:text-black/80 transition-colors uppercase tracking-wider">
                    Give in honor or memory of someone
                </span>
            </button>

            {/* Next Button */}
            <button className="w-full bg-black text-white py-4 font-bold uppercase tracking-widest hover:bg-orange-600 transition-colors duration-300 rounded-none mt-auto flex items-center justify-center gap-3">
                Next <ArrowRight className="w-5 h-5" />
            </button>
        </div>
    );
}
