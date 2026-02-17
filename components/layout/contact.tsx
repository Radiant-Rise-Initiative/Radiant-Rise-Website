"use client";

import { useState } from "react";
import Image from "next/image";

type Tab = "Partner With Us" | "Pitch Us" | "Media";

export function Contact() {
    const [activeTab, setActiveTab] = useState<Tab>("Partner With Us");

    return (
        <section className="relative min-h-[800px] flex items-center py-24 select-none">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=2670&auto=format&fit=crop"
                    alt="Energy Infrastructure"
                    fill
                    className="object-cover brightness-[0.4]"
                />
                <div className="absolute inset-0 bg-green-900/20 mix-blend-multiply" />
            </div>

            <div className="max-w-[1280px] 2xl:max-w-[1440px] mx-auto w-full relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 items-stretch">

                    {/* Left Side: Title */}
                    <div className="flex flex-col justify-center @container">
                        <h1 className="text-[18cqi] font-semibold text-white tracking-tighter leading-[0.8] uppercase whitespace-nowrap [text-align-last:justify] -ml-[0.08em] -mr-[0.04em] w-full">
                            <span className="inline-block mr-[0.05em]">[</span>
                            <span className="relative top-[0.04em]">CONNECT</span>
                            <span className="inline-block ml-[0.05em]">]</span>
                        </h1>
                    </div>

                    {/* Right Side: Tabbed Form */}
                    <div className="bg-[#f8f9fa] rounded-sm shadow-2xl overflow-hidden self-center">
                        {/* Tabs */}
                        <div className="flex border-b border-black/5">
                            {(["Partner With Us", "Pitch Us", "Media"] as Tab[]).map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`flex-1 py-5 px-4 text-sm font-medium transition-all duration-300 relative
                                        ${activeTab === tab ? "text-black bg-white" : "text-black/40 hover:text-black/60 bg-[#f0f2f5]"}`}
                                >
                                    {tab}
                                    {activeTab === tab && (
                                        <div className="absolute top-0 left-0 right-0 h-1 bg-orange-600" />
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* Form Content */}
                        <div className="p-8 md:p-12">
                            <form className="space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <input
                                        type="text"
                                        placeholder="First Name"
                                        className="w-full bg-white border border-black/10 px-4 py-3 rounded-sm focus:outline-none focus:border-orange-500/50 transition-colors"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Last Name"
                                        className="w-full bg-white border border-black/10 px-4 py-3 rounded-sm focus:outline-none focus:border-orange-500/50 transition-colors"
                                    />
                                </div>
                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    className="w-full bg-white border border-black/10 px-4 py-3 rounded-sm focus:outline-none focus:border-orange-500/50 transition-colors"
                                />
                                <input
                                    type="text"
                                    placeholder="Company Name"
                                    className="w-full bg-white border border-black/10 px-4 py-3 rounded-sm focus:outline-none focus:border-orange-500/50 transition-colors"
                                />

                                {activeTab === "Partner With Us" && (
                                    <div className="space-y-4">
                                        <p className="text-sm font-bold text-black mb-2">What type of partner are you?</p>
                                        <div className="space-y-3">
                                            {["Funding Partner", "Innovation Partner", "Co-investor (Venture Capital or Studio)"].map((type) => (
                                                <label key={type} className="flex items-center gap-3 cursor-pointer group">
                                                    <input type="checkbox" className="w-5 h-5 accent-orange-600 rounded-sm border-black/10" />
                                                    <span className="text-sm text-black/60 group-hover:text-black/80 transition-colors">{type}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <textarea
                                    placeholder="Message"
                                    rows={5}
                                    className="w-full bg-white border border-black/10 px-4 py-3 rounded-sm focus:outline-none focus:border-orange-500/50 transition-colors resize-none"
                                />

                                <button
                                    type="submit"
                                    className="w-full bg-black text-white py-4 font-bold uppercase tracking-widest hover:bg-orange-600 transition-colors duration-300 rounded-sm"
                                >
                                    SEND MESSAGE
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
