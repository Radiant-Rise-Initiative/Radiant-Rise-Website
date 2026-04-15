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
    const [donorName, setDonorName] = useState("");
    const [donorEmail, setDonorEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");
        
        try {
            const response = await fetch('/api/send', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: donorName,
                    email: donorEmail,
                    subject: `Support Us | Pledge of $${donationAmount} (${donationFrequency})`,
                    message: `A new donation pledge has been submitted from the website.\n\nDonor: ${donorName}\nPledged Amount: $${donationAmount}\nFrequency: ${donationFrequency}\n\nPlease follow up with this donor at the provided email address to arrange payment options.`
                })
            });

            if (response.ok) {
                setStatus("success");
                setDonorName("");
                setDonorEmail("");
                setTimeout(() => setStatus("idle"), 5000);
            } else {
                setStatus("error");
            }
        } catch (error) {
            console.error(error);
            setStatus("error");
        }
    };

    return (
        <form onSubmit={handleSubmit} className={cn("space-y-6 flex-1 flex flex-col", className)}>
            {/* ... frequency and amount sections unchanged ... */}
            {/* (Including previously unchanged parts for context in replacement) */}
            <div className="flex bg-[#f0f2f5] border border-black/5 p-1 rounded-none">
                <button
                    type="button"
                    onClick={() => setDonationFrequency("once")}
                    className={cn(
                        "flex-1 py-3 text-xs font-bold uppercase tracking-widest transition-colors",
                        donationFrequency === "once"
                            ? "bg-[#f5f5f7] border border-black/5 text-orange-600 shadow-sm"
                            : "text-black/40 hover:text-black/60"
                    )}
                >
                    Give once
                </button>
                <button
                    type="button"
                    onClick={() => setDonationFrequency("monthly")}
                    className={cn(
                        "flex-1 py-3 text-xs font-bold uppercase tracking-widest transition-colors",
                        donationFrequency === "monthly"
                            ? "bg-[#f5f5f7] border border-black/5 text-orange-600 shadow-sm"
                            : "text-black/40 hover:text-black/60"
                    )}
                >
                    Recurring
                </button>
            </div>

            <div className="bg-[#f5f5f7] border border-black/10 p-6 flex justify-between items-center rounded-none">
                <span className="text-4xl font-semibold text-black tracking-tighter">${donationAmount}</span>
                <span className="text-sm font-mono tracking-widest text-black/40 uppercase">USD</span>
            </div>

            <div className="grid grid-cols-3 gap-3">
                {["25", "50", "100", "250", "500", "1,000"].map((amount) => (
                    <button
                        key={amount}
                        type="button"
                        onClick={() => setDonationAmount(amount)}
                        className={cn(
                            "py-4 rounded-none font-bold border transition-all text-sm tracking-widest",
                            donationAmount === amount
                                ? "bg-black text-white border-black"
                                : "bg-[#f5f5f7] border-black/10 text-black/60 hover:border-orange-500/50"
                        )}
                    >
                        ${amount}
                    </button>
                ))}
            </div>

            <p className="text-xs font-mono tracking-widest text-black/40 uppercase">
                Frequency: <span className="text-black border-b border-black/20 pb-0.5 capitalize">{donationFrequency}</span>
            </p>

            {/* Action Area: Name, Email + Button */}
            <div className="mt-auto flex flex-col gap-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                        type="text"
                        value={donorName}
                        onChange={(e) => setDonorName(e.target.value)}
                        placeholder="Your Name"
                        required
                        className="w-full bg-[#f5f5f7] border border-black/10 px-4 py-3 rounded-none focus:outline-none focus:border-orange-500/50 transition-colors"
                    />
                    <input
                        type="email"
                        value={donorEmail}
                        onChange={(e) => setDonorEmail(e.target.value)}
                        placeholder="Email Address"
                        required
                        className="w-full bg-[#f5f5f7] border border-black/10 px-4 py-3 rounded-none focus:outline-none focus:border-orange-500/50 transition-colors"
                    />
                </div>

                <button
                    type="submit"
                    disabled={status === "loading"}
                    className={cn(
                        "w-full py-4 text-xs font-mono font-medium uppercase tracking-[0.2em] transition-all duration-300 rounded-none flex items-center justify-center gap-3 text-white",
                        status === "success" ? "bg-green-500" : 
                        status === "error" ? "bg-red-500" : 
                        "bg-black hover:bg-orange-600",
                        status === "loading" && "opacity-70 cursor-wait"
                    )}
                >
                    {status === "loading" ? "SENDING..." : 
                     status === "success" ? "PLEDGE SENT!" : 
                     status === "error" ? "ERROR! TRY AGAIN" : 
                     <>GIVE NOW <ArrowRight className="w-4 h-4 ml-2" /></>}
                </button>
                
                {status === "error" && (
                    <p className="text-red-500 text-xs font-mono text-center mb-0">
                        Something went wrong. Please try again.
                    </p>
                )}
            </div>
        </form>
    );
}
