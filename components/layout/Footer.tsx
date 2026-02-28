"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function Footer() {
    return (
        <footer data-theme="dark" className="bg-black pt-0 pb-0 overflow-hidden text-white font-sans">
            <div className="max-w-[1280px] 2xl:max-w-[1440px] mx-auto w-full px-4 sm:px-12 lg:px-0 pb-12 sm:pb-24">
                <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1.5fr] gap-24 lg:gap-32">

                    {/* Newsletter Section */}
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-6xl font-medium tracking-tighter mb-4">Join our Community.</h2>
                            <p className="text-2xl text-white/40 tracking-tight">Stay connected with the movement.</p>
                        </div>

                        <div className="relative max-w-lg group">
                            <input
                                type="email"
                                placeholder="Work Email"
                                className="w-full bg-transparent border border-white/20 py-5 px-6 pr-16 focus:outline-none focus:border-white transition-colors text-lg"
                            />
                            <button className="absolute right-6 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-white transition-colors">
                                <ArrowRight className="w-8 h-8" />
                            </button>
                        </div>

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
                                    { label: "Recent News", target: "recent-news" },
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
                                {["LinkedIn", "YouTube", "Instagram", "Facebook", "X / Twitter"].map((link) => (
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
