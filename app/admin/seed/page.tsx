"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { newsItems } from "@/lib/newsData";
import { motion } from "framer-motion";
import { Database, CheckCircle2, AlertCircle, Loader2, Sparkles } from "lucide-react";

export default function AdminSeed() {
    const [status, setStatus] = useState<string>("Ready to migrate data...");
    const [isMigrating, setIsMigrating] = useState(false);
    const [isDone, setIsDone] = useState(false);

    const migrateData = async () => {
        setIsMigrating(true);
        setStatus("Migrating News Archive...");

        // 1. Migrate News Items
        for (const item of newsItems) {
            // Safe date parsing
            let formattedDate = new Date().toISOString().split('T')[0];
            try {
                const parsed = new Date(item.date);
                if (!isNaN(parsed.getTime())) {
                    formattedDate = parsed.toISOString().split('T')[0];
                }
            } catch (e) {
                console.error(`Failed to parse date for ${item.title}:`, item.date);
            }

            const { error } = await supabase
                .from('news_releases')
                .upsert({
                    title: item.title,
                    slug: item.id,
                    date: formattedDate,
                    content: item.content,
                    image_url: item.image,
                    author: item.author,
                    category: item.category,
                    read_time: item.readTime,
                }, { onConflict: 'slug' });
            
            if (error) {
                console.error("Error migrating news:", error.message || error);
                setStatus(`Error: ${error.message || "Archive Migration Failed"}`);
                setIsMigrating(false);
                return;
            }
        }

        setStatus("Migrating Home Sections...");

        // 2. Migrate Home Sections
        const sections = [
            {
                key: 'hero',
                content: {
                    headline: "RISING TOGETHER",
                    slides: [
                        { id: "1", image: "/assets/images/hero_images/hero_001.jpg", description: "Born from the lived realities of Acholi Quarters, a slum in Kampala, the Radiant Rise Initiative is a community-owned movement that empowers young mothers and vulnerable youths through a six-month pathway." },
                        { id: "2", image: "/assets/images/hero_images/hero_002.jpg", description: "Radiant Rise Initiative pairs post-trauma healing with need-based vocational skills, fostering the emotional and economic recovery needed to lead purposeful, self-reliant lives that rebuild communities and reduce household vulnerability." },
                        { id: "3", image: "/assets/images/hero_images/hero_003.jpg", description: "Radiant Rise Initiative focuses on breaking cycles of poverty by equipping participants with vocational skills, a spiritual foundation, and resilience. It aims to build intergenerational economic stability and stronger, self-reliant communities." },
                        { id: "4", image: "/assets/images/hero_images/hero_004.jpg", description: "Radiant Rise Initiative provides holistic, faith-driven empowerment that addresses not just immediate economic needs, but deep emotional and spiritual well-being to ensure lasting transformation from brokenness to stability and self-reliance." },
                        { id: "5", image: "/assets/images/hero_images/hero_005.jpg", description: "Radiant Rise Initiative is driven by faith, inclusiveness, and an unwavering commitment to human dignity, creating a safe sanctuary where vulnerable youths and young mothers can truly heal, thrive, and lead." },
                        { id: "6", image: "/assets/images/hero_images/hero_006.jpg", description: "Radiant Rise Initiative is an indigenous non-governmental organisation based in Kampala, fully registered with the Uganda National NGO Bureau with a 5-year renewable permit to operate and empower vulnerable communities." }
                    ]
                }
            },
            {
                key: 'purpose',
                content: {
                    title: "Radiant Rise",
                    description: "Dedicated to breaking cycles of poverty by equipping young mothers and youths with the vocational skills, spiritual foundation, and resilience needed to thrive.",
                    image_url: "/assets/images/thumbnails/thumbnail_story.jpg",
                    video_url: "/assets/images/video_stories/Radiant Rise Story.mp4",
                    info_point_1: "To provide holistic empowerment that addresses not just economic needs, but emotional and spiritual well-being for lasting transformation.",
                    info_point_2: "To build sustainable futures where every participant becomes a pillar of strength, driving self-reliance and prosperity within their community."
                }
            },
            {
                key: 'theories_of_change',
                content: {
                    title: "Theory of Change",
                    description: "We transform vulnerability into stability through a disciplined, structured six-month pathway. By coordinating trauma-informed stabilization with market-aligned skills and income activation, we move families in Acholi Quarters from survival mode toward sustained, intergenerational economic resilience.",
                    items: [
                        { id: "1", stage: "1", name: "STABILIZE", includes: "Surface emotional ground through trauma-informed counseling. We provide safe spaces for young mothers to recover from adversity and reclaim their sense of purpose." },
                        { id: "2", stage: "2", name: "BUILD", includes: "Establish a strategic foundation through vocational training and financial literacy. We align participants with skills that meet real employer demand in Kampala." },
                        { id: "3", stage: "3", name: "ACTIVATE", includes: "Translate training into income systems. We deploy job placements, employer partnerships (like Fine Spinners), and micro-enterprise toolkits to create immediate economic movement." },
                        { id: "4", stage: "4", name: "REINFORCE", includes: "Finalize household stability through long-term support. We equip participants with savings habits and retention counseling to ensure resilience is sustained and consistent." }
                    ]
                }
            },
            {
                key: 'impact_stats',
                content: {
                    title: "Our Impact",
                    description: "During our critical initial community mobilization phase, one hundred and five young mothers successfully registered and were comprehensively profiled. By rigorously documenting their education status, current employment levels, and savings practices, we established a vital, data-driven baseline for all future programming. Empowering these specific women, who constantly balance caregiving with basic survival work, remains the absolute cornerstone of our mission to nurture intergenerational economic stability across Acholi Quarters.",
                    metric_label: "Grassroots Engagement",
                    metric_value: "105 Young Mothers",
                    stats: [
                        { 
                            id: "impact_1_top", 
                            label: "Economic Empowerment", 
                            value: "16", 
                            modalTitle: "16 Job Placements", 
                            description: "Radiant Rise Initiative has successfully secured 16 tailoring job placements for young mothers." 
                        },
                        { 
                            id: "impact_1_bottom", 
                            label: "Month Program Cycle", 
                            value: "6", 
                            modalTitle: "6-Month Cohort Pathway", 
                            description: "Radiant Rise is formalizing a structured six-month cohort model serving Acholi Quarters." 
                        },
                        {
                            id: "impact_2_top",
                            label: "Year Strategic MOU",
                            value: "5",
                            modalTitle: "5-Year MOU Employer Pipeline",
                            description: "To guarantee a sustained employment pipeline for youth and young mothers, Radiant Rise has signed a five-year Memorandum of Understanding with Fine Spinners."
                        },
                        {
                            id: "impact_2_bottom",
                            label: "Baseline Intervention",
                            value: "2+1",
                            modalTitle: "Baseline Studies",
                            description: "Before implementing any core programs, comprehensive community needs assessment and feasibility studies were conducted."
                        }
                    ]
                }
            },
            {
                key: 'who_we_are',
                content: {
                    title: "Who We Are",
                    description: "At the heart of the Radiant Rise Initiative are core values that guide every partnership and program we undertake.",
                    image_url: "/assets/images/purpose_images/purpose_01.jpg",
                    items: [
                        { 
                            id: "stabilize", 
                            number: "01", 
                            title: "Stabilize", 
                            description: "We begin with emotional recovery.", 
                            modalTitle: "Stabilize", 
                            modalTagline: "Phase 01: Emotional Recovery", 
                            modalText: "The journey begins with emotional recovery." 
                        },
                        {
                            id: "build",
                            number: "02",
                            title: "Build",
                            description: "Once stabilized, participants focus on practical empowerment.",
                            modalTitle: "Build",
                            modalTagline: "Phase 02: Skills Acquisition",
                            modalText: "We establish a strategic foundation through vocational training and financial literacy."
                        }
                    ]
                }
            },
            {
                key: 'our_values',
                content: {
                    title: "Our Values",
                    description: "Born from the lived realities of Acholi Quarters, Radiant Rise Initiative is a community-owned movement defined by deep-rooted values.",
                    tabs: [
                        {
                            id: "compassion",
                            label: "Compassion",
                            bottomTagline: "INITIATIVE",
                            headline: "Heart-led Transformation.",
                            features: [
                                { title: "Radical Empathy", text: "We serve with profound empathy, placing the distinct needs of every individual at the center of our work." },
                                { title: "Unwavering Dignity", text: "Every participant is treated with the highest respect, prioritizing their dignity above all else." }
                            ]
                        },
                        {
                            id: "empowerment",
                            label: "Empowerment",
                            bottomTagline: "OUR DRIVE",
                            headline: "Unlocking Potential.",
                            features: [
                                { title: "Practical Toolkits", text: "We equip youth and young mothers with the tangible tools necessary to unlock their full potential." }
                            ]
                        }
                    ]
                }
            },
            {
                key: 'our_targets',
                content: {
                    title: "Our Targets",
                    linkText: "See All Targets",
                    href: "/targets",
                    items: [
                        { id: "1", name: "PROGRAM RETENTION", logo: "85%\nCOMPLETION", description: "Ensuring our participants achieve high program retention...", image: "/assets/branding/splash-image-011.jpg" },
                        { id: "2", name: "EARLY INTERVENTION", logo: "50-60% EARNING\nIN 3 MONTHS", description: "Accelerating the transition from vulnerability...", image: "/assets/branding/splash-image-012.jpg" },
                        { id: "3", name: "CAREER STABILITY", logo: "70% EARNING\nIN 6 MONTHS", description: "Facilitating long-term job placement and employer partnerships within 6 months.", image: "/assets/branding/splash-image-013.jpg" },
                        { id: "4", name: "REVENUE EXPANSION", logo: "98% INCOME\nINCREASE", description: "Targeting significant financial improvement and revenue expansion.", image: "/assets/branding/splash-image-014.jpg" }
                    ]
                }
            },
            {
                key: 'impact_milestones',
                content: {
                    sectionLabel: "IMPACT MILESTONES",
                    testimonials: [
                        { id: "empowering-mothers", category: "Empowering Young Mothers", quote: "We registered and profiled 105 young mothers...", role: "Community Data", company: "Radiant Rise Initiative", image: "/assets/images/profile_images/Frame 1.jpg" },
                        { id: "formal-employment", category: "Securing Formal Employment", quote: "We secured 16 tailoring job placements...", role: "Economic Activation", company: "Radiant Rise Initiative", image: "/assets/images/profile_images/Frame 2.jpg" }
                    ]
                }
            },
            {
                key: 'gallery',
                content: {
                    items: [
                        { id: "1", title: "Healing Hearts", category: "Counseling", description: "Post-trauma and adversity counseling sessions for young mothers.", image: "/assets/images/gallery_images/01. Healing Hearts.jpg", modal_title: "01. Healing Hearts", modal_text: "Radiant Rise provides trauma-informed counseling as the vital first step toward stability." }
                    ]
                }
            },
            {
                key: 'got_questions',
                content: {
                    title: "Got Questions?",
                    linkText: "MAKE MORE INQUIRIES",
                    href: "#connect",
                    items: [
                        { id: "1", question: "What is the Radiant Rise Initiative?", answer: "Radiant Rise Initiative is a registered indigenous organization located in Acholi Quarters, Kampala, Uganda." },
                        { id: "2", question: "What specific challenges does your organization address?", answer: "In informal urban settlements like Acholi Quarters, early pregnancy and youth unemployment converge." }
                    ]
                }
            }
        ];

        for (const section of sections) {
            const { error } = await supabase.from('site_sections').upsert({
                section_key: section.key,
                content: section.content
            }, { onConflict: 'section_key' });

            if (error) {
                console.error(`Error migrating section ${section.key}:`, error.message || error);
                setStatus(`Error: ${error.message || "Section Migration Failed"}`);
                setIsMigrating(false);
                return;
            }
        }

        setStatus("Migration Complete.");
        setIsMigrating(false);
        setIsDone(true);
    };

    return (
        <div className="flex flex-col items-center justify-center py-24 space-y-12">
            <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-black/[0.02] border border-black/5 rounded-full flex items-center justify-center mx-auto">
                    <Database className="w-6 h-6 text-black/40" />
                </div>
                <h2 className="text-3xl font-semibold tracking-tight">Data Migration</h2>
                <p className="text-black/40 text-sm font-mono tracking-widest uppercase max-w-md mx-auto">
                    Synchronize your hardcoded content with the new Supabase Cloud Database.
                </p>
            </div>

            <div className="w-full max-w-sm space-y-6">
                <div className="p-8 bg-white border border-black/5 text-center space-y-6">
                    <div className="flex items-center justify-center gap-3">
                        {isMigrating ? (
                            <Loader2 className="w-4 h-4 animate-spin text-[#CD5929]" />
                        ) : isDone ? (
                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                        ) : (
                            <Sparkles className="w-4 h-4 text-[#CD5929]" />
                        )}
                        <span className="text-xs font-mono tracking-widest uppercase">{status}</span>
                    </div>

                    {!isDone && (
                        <button 
                            onClick={migrateData}
                            disabled={isMigrating}
                            className="w-full bg-black text-white py-4 px-6 text-xs font-mono uppercase tracking-widest hover:bg-[#CD5929] transition-all duration-500 disabled:opacity-50"
                        >
                            {isMigrating ? "Syncing..." : "Execute Migration"}
                        </button>
                    )}

                    {isDone && (
                        <a 
                            href="/admin/dashboard"
                            className="w-full inline-block bg-black text-white py-4 px-6 text-xs font-mono uppercase tracking-widest hover:bg-[#CD5929] transition-all duration-500"
                        >
                            Back to Dashboard
                        </a>
                    )}
                </div>
                
                <p className="text-[10px] text-center text-black/30 font-mono tracking-tight">
                    * This only needs to be run once to seed your database with your current site content.
                </p>
            </div>
        </div>
    );
}
