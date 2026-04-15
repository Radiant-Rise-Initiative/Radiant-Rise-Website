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
    
    // Form States
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [company, setCompany] = useState("");
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");
        
        try {
            const response = await fetch('/api/send', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: `${firstName} ${lastName}`,
                    email,
                    subject: `${activeTab} | Inquiry from ${firstName} ${lastName}`,
                    company,
                    message
                })
            });

            if (response.ok) {
                setStatus("success");
                // Reset form
                setFirstName("");
                setLastName("");
                setEmail("");
                setCompany("");
                setMessage("");
                // Reset status after 5 seconds
                setTimeout(() => setStatus("idle"), 5000);
            } else {
                setStatus("error");
            }
        } catch (error) {
            console.error(error);
            setStatus("error");
        }
    };

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
                    <form onSubmit={handleSubmit} className="space-y-6 flex-1 flex flex-col">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <input
                                type="text"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                placeholder="First Name"
                                required
                                className="w-full bg-[#f5f5f7] border border-black/10 px-4 py-3 rounded-none focus:outline-none focus:border-orange-500/50 transition-colors"
                            />
                            <input
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                placeholder="Last Name"
                                required
                                className="w-full bg-[#f5f5f7] border border-black/10 px-4 py-3 rounded-none focus:outline-none focus:border-orange-500/50 transition-colors"
                            />
                        </div>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email Address"
                            required
                            className="w-full bg-[#f5f5f7] border border-black/10 px-4 py-3 rounded-none focus:outline-none focus:border-orange-500/50 transition-colors"
                        />
                        <input
                            type="text"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            placeholder="Company Name"
                            className="w-full bg-[#f5f5f7] border border-black/10 px-4 py-3 rounded-none focus:outline-none focus:border-orange-500/50 transition-colors"
                        />

                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Message"
                            rows={5}
                            required
                            className="w-full bg-[#f5f5f7] border border-black/10 px-4 py-3 rounded-none focus:outline-none focus:border-orange-500/50 transition-colors resize-none flex-1"
                        />

                        <button
                            type="submit"
                            disabled={status === "loading"}
                            className={`w-full py-4 text-xs font-mono font-medium uppercase tracking-[0.2em] transition-all duration-300 rounded-none mt-auto flex items-center justify-center gap-3 text-white
                                ${status === "success" ? "bg-green-500" : 
                                  status === "error" ? "bg-red-500" : 
                                  "bg-black hover:bg-orange-600"} 
                                ${status === "loading" ? "opacity-70 cursor-wait" : ""}`}
                        >
                            {status === "loading" ? "SENDING..." : 
                             status === "success" ? "MESSAGE SENT!" : 
                             status === "error" ? "ERROR! TRY AGAIN" : 
                             "SEND MESSAGE"}
                        </button>
                        
                         {/* Success message removed as per request to focus color on the button */}
                        {status === "error" && (
                            <p className="text-red-600 text-xs font-mono mt-4 text-center">
                                Something went wrong. Please try again or email us directly at info@radiantriseinitiative.org
                            </p>
                        )}
                    </form>
                ) : (
                    <DonationInterface />
                )}
            </div>
        </div>
    );
}
