"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function AboutStory() {
    return (
        <section id="our-story" className="bg-white py-24 border-t border-black/5">
            <div className="max-w-[1280px] 2xl:max-w-[1440px] mx-auto w-full px-4 sm:px-12 lg:px-0">
                
                <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1.5fr] gap-24 lg:gap-32 items-stretch h-full">
                    
                    {/* Left Column: Title & Tagline & Subscription - Should Remain in View (Sticky) */}
                    <div className="lg:sticky lg:top-32 self-start space-y-12 pb-24 z-20">
                        {/* Section Title matched to SectionHeader/Our Impact style */}
                        <div className="space-y-8">
                            <h2 className="text-5xl md:text-6xl font-semibold text-black tracking-tight -ml-1">
                                Our Story
                            </h2>
                            <p className="text-2xl md:text-3xl font-medium leading-tight tracking-tight text-black">
                                Rising from trauma to purpose, restoring dignity, unlocking potential, and building self-reliant futures.
                            </p>
                        </div>

                        {/* Subscription Box Section - No Title or Divider */}
                        <div className="space-y-10">
                            <div>
                                <p className="text-xl text-black/40 tracking-tight">Stay connected with the movement.</p>
                            </div>
                            <div className="relative max-w-lg group">
                                <input
                                    type="email"
                                    placeholder="Work Email"
                                    className="w-full bg-transparent border border-black/10 py-5 px-6 pr-16 focus:outline-none focus:border-black transition-colors text-base md:text-lg"
                                />
                                <button className="absolute right-6 top-1/2 -translate-y-1/2 text-black/20 group-focus-within:text-black transition-colors">
                                    <ArrowRight className="w-8 h-8" />
                                </button>
                            </div>

                            <p className="text-xs text-black/40 leading-relaxed max-w-lg">
                                By submitting this form, you confirm that you agree to the storing and processing of your personal data by Radiant Rise as described in our <Link href="#" className="underline hover:text-black/60 transition-colors">Privacy Notice</Link>
                            </p>
                        </div>
                    </div>

                    {/* Right Column: Narrative & Quotes - Should Scroll Away */}
                    <div className="space-y-12 text-lg md:text-xl leading-[1.6] text-black/80">
                        
                        <p>
                            Our story is deeply rooted in the lived realities of Acholi Quarters, a community shaped by resilience in the face of hardship. Many families in this area were displaced during the Lord’s Resistance Army insurgency in the Northern Part of Uganda and continue to navigate the long-term effects of poverty, trauma, and limited access to opportunities.
                        </p>

                        <p>
                            Our founder, <span className="text-black font-semibold">Agnes Oyella</span>, was born and raised in this community and experienced these challenges firsthand.
                        </p>

                        {/* Agnes Oyella Quote Block - Image Inspired Design */}
                        <div className="relative pl-10 md:pl-16 py-2 group">
                            {/* Vertical Accent Bar */}
                            <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-[#FF5C35]" />
                            
                            <div className="space-y-12">
                                <p className="text-xl md:text-2xl font-medium leading-tight tracking-tight text-black">
                                    I grew up seeing families struggle to survive. Many of us had to work in stone quarries just to get by. Education felt like a distant dream, and for many young people, dropping out of school seemed inevitable.
                                </p>
                                <p className="text-xl md:text-2xl font-medium leading-tight tracking-tight text-black">
                                    What broke my heart most was seeing how deeply trauma affected us, how it silenced dreams and limited what young people believed was possible for their lives. I knew something had to change.
                                </p>
                                <p className="text-xl md:text-2xl font-medium leading-tight tracking-tight text-black">
                                    God placed a burden in my heart to act. Together with friends, we started Radiant Rise to walk alongside these young people, to help them heal, to rediscover their worth, and to rise into self-reliance.
                                </p>
                            </div>

                            <div className="mt-12 text-black/60 font-mono text-xs md:text-sm tracking-normal uppercase">
                                Agnes Oyella, Founder
                            </div>
                        </div>

                        <p className="text-black/60">
                            At the heart of Radiant Rise is a commitment to support vulnerable youth and young mothers to heal from trauma, rediscover their worth, and grow into self-reliant individuals. Through a holistic and faith-driven approach, we provide trauma-informed emotional and psychosocial support, helping participants process their experiences and rebuild inner strength.
                        </p>

                        <p>
                            We complement this healing journey with practical interventions including life skills development, vocational training, and mentorship as well as Financial and digital Literacy. Our six-month model program is intentionally designed to guide participants from brokenness to stability, and from dependence to self-reliance.
                        </p>

                        {/* Final Impact Quote - Shadow Removed, 1px Border, Subtext Style */}
                        <div className="bg-[#f9f9f8] p-10 md:p-14 border border-black/10 shadow-none">
                            <p className="text-xl md:text-2xl font-medium leading-tight tracking-tight text-black">
                                I believe that when a young person heals, they rise, and when they rise, they can transform their families and their communities. Radiant Rise is here to make that journey possible.
                            </p>
                            <p className="mt-8 text-sm font-mono tracking-normal uppercase text-black/60">
                                AGNES OYELLA, FOUNDER
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
