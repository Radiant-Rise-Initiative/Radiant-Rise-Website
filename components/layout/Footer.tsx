"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface FooterProps {
    topPadding?: boolean;
}

export function Footer({ topPadding = false }: FooterProps) {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");
        
        try {
            const response = await fetch('/api/send', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email,
                    type: 'newsletter'
                })
            });

            if (response.ok) {
                setStatus("success");
                setEmail("");
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
        <footer data-theme="dark" className="bg-black pt-0 pb-0 overflow-hidden text-white font-sans">
            <div className="max-w-[1280px] 2xl:max-w-[1440px] mx-auto w-full px-4 sm:px-12 lg:px-0 py-12 sm:py-24">
                <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1.5fr] gap-24 lg:gap-32">

                    {/* Newsletter Section */}
                    <div className="space-y-12">
                        <div>
                            <h2 className="text-6xl font-medium tracking-tighter mb-4">Join Our Community.</h2>
                            <p className="text-2xl text-white/40 tracking-tight">Stay connected with the movement.</p>
                        </div>

                        <form onSubmit={handleSubscribe} className="relative max-w-lg group">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder={status === "success" ? "Subscribed!" : "Enter Your Email"}
                                required
                                disabled={status === "loading" || status === "success"}
                                className={`w-full bg-transparent border py-5 px-6 pr-16 focus:outline-none transition-colors text-lg
                                    ${status === "success" ? "border-green-500 text-green-500 placeholder:text-green-500/60" : 
                                      status === "error" ? "border-red-500 text-red-500" : 
                                      "border-white/20 focus:border-white text-white"}`}
                            />
                            <button 
                                type="submit"
                                disabled={status === "loading" || status === "success"}
                                className={`absolute right-6 top-1/2 -translate-y-1/2 transition-colors
                                    ${status === "success" ? "text-green-500" : 
                                      status === "loading" ? "text-white/20" : 
                                      "text-white/40 group-focus-within:text-white"}`}
                            >
                                {status === "loading" ? (
                                    <div className="w-6 h-6 border-2 border-white/30 border-t-white animate-spin rounded-full" />
                                ) : status === "success" ? (
                                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                                        <CheckCircle2 className="w-8 h-8" />
                                    </motion.div>
                                ) : (
                                    <ArrowRight className="w-8 h-8" />
                                )}
                            </button>
                            {status === "error" && (
                                <p className="absolute -bottom-6 left-0 text-[10px] font-mono text-red-500">
                                    Subscription failed. Please try again.
                                </p>
                            )}
                        </form>

                        <p className="text-xs text-white/30 leading-relaxed max-w-lg">
                            By submitting this form, you confirm that you agree to the storing and processing of your personal data by Radiant Rise as described in our <Link href="#" className="underline hover:text-white transition-colors">Privacy Notice</Link>
                        </p>
                    </div>

                    {/* Links Sections */}
                    {/* Links Sections */}
                    <div className="flex flex-col sm:flex-row sm:justify-end gap-12 md:gap-24">
                        {/* More Radiant Rise */}
                        <div className="space-y-6">
                            <h3 className="text-xs font-mono tracking-widest text-white/30 uppercase">More Radiant</h3>
                            <div className="flex flex-col gap-4">
                                {[
                                    { label: "Our Impact", target: "our-impact" },
                                    { label: "Our Updates", target: "our-updates" },
                                    { label: "Success Stories", target: "impact-stories" },
                                    { label: "Core Values", target: "who-we-are" },
                                    { label: "Get Involved", target: "connect", action: "join-team" },
                                    { label: "Scroll to Top", target: "top" }
                                ].map((link) => (
                                    <button
                                        key={link.label}
                                        onClick={() => {
                                            if (link.target === "top") {
                                                window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
                                            } else {
                                                const section = document.getElementById(link.target);
                                                if (section) {
                                                    section.scrollIntoView({ behavior: "instant" });
                                                }
                                                if (link.action === "join-team") {
                                                    setTimeout(() => {
                                                        window.dispatchEvent(new CustomEvent("activate-tab", { detail: "Join Our Team" }));
                                                    }, 50);
                                                }
                                            }
                                        }}
                                        className="group flex items-center gap-2 text-xl font-medium hover:text-white/60 transition-all text-left"
                                    >
                                        {link.label}
                                        <ArrowUpRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Learn More */}
                        <div className="space-y-6">
                            <h3 className="text-xs font-mono tracking-widest text-white/30 uppercase">Learn More</h3>
                            <div className="flex flex-col gap-4">
                                {[
                                    { label: "Partner With Us", target: "connect", tab: "Partner With Us" },
                                    { label: "Join Our Team", target: "connect", tab: "Join Our Team" },
                                    { label: "What Others Say", target: "testimonials" },
                                    { label: "Frequently Asked", target: "got-questions" }
                                ].map((link) => (
                                    <button
                                        key={link.label}
                                        onClick={() => {
                                            const section = document.getElementById(link.target);
                                            if (section) {
                                                section.scrollIntoView({ behavior: "instant" });
                                            }
                                            if (link.tab) {
                                                setTimeout(() => {
                                                    window.dispatchEvent(new CustomEvent("activate-tab", { detail: link.tab }));
                                                }, 50);
                                            }
                                        }}
                                        className="group flex items-center gap-2 text-xl font-medium hover:text-white/60 transition-all text-left"
                                    >
                                        {link.label}
                                        <ArrowRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Follow Us */}
                        <div className="space-y-6">
                            <h3 className="text-xs font-mono tracking-widest text-white/30 uppercase">Follow Us</h3>
                            <div className="flex flex-col gap-4">
                                {["YouTube", "Instagram", "Facebook", "X / Twitter"].map((link) => (
                                    <Link key={link} href="#" className="group flex items-center gap-2 text-xl font-medium hover:text-white/60 transition-all">
                                        {link}
                                        <ArrowUpRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
