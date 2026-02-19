"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

type Tab = "Partner With Us" | "Join Our Team" | "Give Now";

export function Contact() {
    const [activeTab, setActiveTab] = useState<Tab>("Partner With Us");
    const [donationFrequency, setDonationFrequency] = useState<"once" | "monthly">("monthly");
    const [donationAmount, setDonationAmount] = useState<string>("100");
    const [isHonorGift, setIsHonorGift] = useState(false);

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
                            {(["Partner With Us", "Join Our Team", "Give Now"] as Tab[]).map((tab) => (
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
                            {activeTab !== "Give Now" ? (
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
                                <div className="space-y-6 flex-1 flex flex-col">
                                    {/* Give Once / Recurring Toggle */}
                                    <div className="flex bg-[#f0f2f5] border border-black/5 p-1 rounded-sm">
                                        <button
                                            onClick={() => setDonationFrequency("once")}
                                            className={`flex-1 py-3 text-xs font-bold uppercase tracking-widest transition-colors
                                                ${donationFrequency === "once" ? "bg-white border border-black/5 text-orange-600 shadow-sm" : "text-black/40 hover:text-black/60"}`}
                                        >
                                            Give once
                                        </button>
                                        <button
                                            onClick={() => setDonationFrequency("monthly")}
                                            className={`flex-1 py-3 text-xs font-bold uppercase tracking-widest transition-colors
                                                ${donationFrequency === "monthly" ? "bg-white border border-black/5 text-orange-600 shadow-sm" : "text-black/40 hover:text-black/60"}`}
                                        >
                                            Recurring
                                        </button>
                                    </div>

                                    {/* Selected Amount Display */}
                                    <div className="bg-white border border-black/10 p-6 flex justify-between items-center rounded-sm">
                                        <span className="text-4xl font-semibold text-black tracking-tighter">${donationAmount}</span>
                                        <span className="text-sm font-mono tracking-widest text-black/40 uppercase">USD</span>
                                    </div>

                                    {/* Presets Grid */}
                                    <div className="grid grid-cols-3 gap-3">
                                        {["25", "50", "100", "250", "500", "1,000"].map((amount) => (
                                            <button
                                                key={amount}
                                                onClick={() => setDonationAmount(amount)}
                                                className={`py-4 rounded-sm font-bold border transition-all text-sm tracking-widest
                                                    ${donationAmount === amount
                                                        ? "bg-black text-white border-black"
                                                        : "bg-white border-black/10 text-black/60 hover:border-orange-500/50"}`}
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
                                            <div className={`w-2.5 h-2.5 bg-orange-600 transition-transform ${isHonorGift ? "scale-100" : "scale-0"}`} />
                                        </div>
                                        <span className="text-xs font-medium text-black/60 group-hover:text-black/80 transition-colors uppercase tracking-wider">
                                            Give in honor or memory of someone
                                        </span>
                                    </button>

                                    {/* Next Button */}
                                    <button className="w-full bg-black text-white py-4 font-bold uppercase tracking-widest hover:bg-orange-600 transition-colors duration-300 rounded-sm mt-auto flex items-center justify-center gap-3">
                                        Next <ArrowRight className="w-5 h-5" />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
