"use client";

import { useState, useEffect } from "react";
import { DonationInterface } from "@/components/layout/DonationInterface";

type Tab = "Partner With Us" | "Join Our Team" | "Support Us";

const tabConfig: Record<Tab, { mobile: string; desktop: string }> = {
    "Partner With Us": { mobile: "PARTNER", desktop: "PARTNER WITH US" },
    "Join Our Team": { mobile: "JOIN US", desktop: "JOIN OUR TEAM" },
    "Support Us": { mobile: "SUPPORT", desktop: "SUPPORT US" }
};

export function TabForm() {
    const [activeTab, setActiveTab] = useState<Tab>("Partner With Us");

    useEffect(() => {
        const handler = (e: CustomEvent<Tab>) => {
            setActiveTab(e.detail);
        };
        window.addEventListener("activate-tab", handler as EventListener);
        return () => window.removeEventListener("activate-tab", handler as EventListener);
    }, []);

    return (
        <div className="bg-[#f8f9fa] rounded-none shadow-2xl overflow-hidden self-start">
            {/* Tabs */}
            <div className="flex border-b border-black/5">
                {(["Partner With Us", "Join Our Team", "Support Us"] as Tab[]).map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`flex-1 py-5 px-1 sm:px-4 text-xs font-mono tracking-widest uppercase transition-all duration-300 relative
                            ${activeTab === tab ? "text-black bg-[#f5f5f7]" : "text-black/40 hover:text-black/60 bg-[#f0f2f5]"}`}
                    >
                        <span className="sm:hidden">{tabConfig[tab].mobile}</span>
                        <span className="hidden sm:inline">{tabConfig[tab].desktop}</span>
                        {activeTab === tab && (
                            <div className="absolute top-0 left-0 right-0 h-1 bg-orange-600" />
                        )}
                    </button>
                ))}
            </div>

            {/* Form Content */}
            <div className="p-8 md:p-12 min-h-[580px] flex flex-col justify-start">
                {activeTab !== "Support Us" ? (
                    <form className="space-y-6 flex-1 flex flex-col">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <input
                                type="text"
                                placeholder="First Name"
                                className="w-full bg-[#f5f5f7] border border-black/10 px-4 py-3 rounded-sm focus:outline-none focus:border-orange-500/50 transition-colors"
                            />
                            <input
                                type="text"
                                placeholder="Last Name"
                                className="w-full bg-[#f5f5f7] border border-black/10 px-4 py-3 rounded-sm focus:outline-none focus:border-orange-500/50 transition-colors"
                            />
                        </div>
                        <input
                            type="email"
                            placeholder="Email Address"
                            className="w-full bg-[#f5f5f7] border border-black/10 px-4 py-3 rounded-sm focus:outline-none focus:border-orange-500/50 transition-colors"
                        />
                        <input
                            type="text"
                            placeholder="Company Name"
                            className="w-full bg-[#f5f5f7] border border-black/10 px-4 py-3 rounded-sm focus:outline-none focus:border-orange-500/50 transition-colors"
                        />

                        <textarea
                            placeholder="Message"
                            rows={5}
                            className="w-full bg-[#f5f5f7] border border-black/10 px-4 py-3 rounded-sm focus:outline-none focus:border-orange-500/50 transition-colors resize-none flex-1"
                        />

                        <button
                            type="submit"
                            className="w-full bg-black text-white py-4 font-bold uppercase tracking-widest hover:bg-orange-600 transition-colors duration-300 rounded-sm mt-auto"
                        >
                            SEND MESSAGE
                        </button>
                    </form>
                ) : (
                    <DonationInterface />
                )}
            </div>
        </div>
    );
}
