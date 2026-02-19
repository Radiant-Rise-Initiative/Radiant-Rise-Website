"use client";

import { useState } from "react";
import Image from "next/image";
import { DonationInterface } from "./donation-interface";

type Tab = "Partner With Us" | "Join Our Team" | "Support Radiant Rise";

export function Contact() {
    const [activeTab, setActiveTab] = useState<Tab>("Partner With Us");

    return (
        <section data-theme="dark" className="relative min-h-[800px] flex items-center pt-24 pb-0 select-none">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/assets/branding/splash-image.jpg"
                    alt="Radiant Rise Community"
                    fill
                    className="object-cover brightness-[0.4]"
                />
                <div className="absolute inset-0 bg-green-900/20 mix-blend-multiply" />
                {/* Bottom Gradient Fade - Increased height for smoother transition */}
                <div className="absolute inset-x-0 bottom-0 h-[50%] bg-gradient-to-t from-black to-transparent" />
            </div>

            <div className="max-w-[1280px] 2xl:max-w-[1440px] mx-auto w-full relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 items-stretch">

                    {/* Left Side: Title */}
                    <div className="flex flex-col @container sticky top-44 self-start py-8 sm:py-0">
                        <h1 className="text-[18cqi] font-semibold text-white tracking-tighter leading-[0.8] uppercase whitespace-nowrap">
                            CONNECT
                        </h1>
                    </div>

                    {/* Right Side: Tabbed Form */}
                    <div className="bg-[#f8f9fa] rounded-none shadow-2xl overflow-hidden self-start">
                        {/* Tabs */}
                        <div className="flex border-b border-black/5">
                            {(["Partner With Us", "Join Our Team", "Support Radiant Rise"] as Tab[]).map((tab) => (
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
                        <div className="p-8 md:p-12 min-h-[580px] flex flex-col justify-start">
                            {activeTab !== "Support Radiant Rise" ? (
                                <form className="space-y-6 flex-1 flex flex-col">
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

                                    <textarea
                                        placeholder="Message"
                                        rows={5}
                                        className="w-full bg-white border border-black/10 px-4 py-3 rounded-sm focus:outline-none focus:border-orange-500/50 transition-colors resize-none flex-1"
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
                </div>
            </div>
        </section>
    );
}
