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
                    image_url: "/assets/images/hero_images/hero_006.jpg",
                    video_url: "/assets/images/video_stories/Radiant Rise Story.mp4",
                    info_point_1: "To provide holistic empowerment that addresses not just economic needs, but emotional and spiritual well-being for lasting transformation.",
                    info_point_2: "To build sustainable futures where every participant becomes a pillar of strength, driving self-reliance and prosperity within their community."
                }
            },
            {
                key: 'impact_stats',
                content: {
                    title: "Our Impact",
                    description: "During our critical initial community mobilization phase, one hundred and five young mothers successfully registered and were comprehensively profiled...",
                    image_url: "/assets/images/gallery_images/01. Healing Hearts.jpg",
                    metric_label: "Grassroots Engagement",
                    metric_value: "105 Young Mothers"
                }
            },
            {
                key: 'who_we_are',
                content: {
                    title: "Who We Are",
                    description: "At the heart of the Radiant Rise Initiative are core values that guide every partnership and program we undertake. We serve with compassion and empathy...",
                    image_url: "/assets/images/purpose_images/purpose_01.jpg"
                }
            },
            {
                key: 'values',
                content: {
                    title: "Our Values",
                    description: "We are driven by a commitment to human dignity, creating a safe sanctuary where vulnerable youths and young mothers can truly heal and lead.",
                    image_url: "/assets/images/news_images/newsletter_03.jpg"
                }
            },
            {
                key: 'gallery',
                content: {
                    items: [
                        { id: "1", title: "Healing Hearts", category: "Counseling", description: "Post-trauma and adversity counseling sessions for young mothers.", image: "/assets/images/gallery_images/01. Healing Hearts.jpg", modal_title: "01. Healing Hearts", modal_text: "Radiant Rise provides trauma-informed counseling as the vital first step toward stability. By addressing the social stigma and unresolved trauma faced by young mothers aged 14–25, these sessions restore confidence and decision-making. This emotional recovery ensures participants are mentally prepared to transition into vocational training." },
                        { id: "2", title: "Community Synergy", category: "Empowerment", description: "Equipping participants with vocational skills and financial inclusion.", image: "/assets/images/gallery_images/02. Community Synergy.jpg", modal_title: "02. Community Synergy", modal_text: "We empower youths and young mothers through market-aligned vocational training and intensive financial literacy. Beyond technical skills, the program fosters financial inclusion by integrating participants into savings groups and cooperatives. This dual approach ensures graduates possess both practical expertise and the tools for a sustainable livelihood." },
                        { id: "3", title: "Stronger Futures", category: "Resilience", description: "Nurturing hope and self-reliance through values-based leadership.", image: "/assets/images/gallery_images/03. Stronger Futures.jpg", modal_title: "03. Stronger Futures", modal_text: "Our vision is to nurture hope and self-reliance among those rising above adversity. Guided by faith and purpose, Radiant Rise cultivates values-based leadership to help youths unlock their full potential. By grounding development in ethical principles, we inspire participants to take ownership of their growth and community." },
                        { id: "4", title: "Skills Training", category: "Vocational", description: "Dedicated workshops to build practical and marketable skills.", image: "/assets/images/gallery_images/04. Skills Training.jpg", modal_title: "04. Skills Training", modal_text: "Our \"Build\" phase features dedicated workshops that align skills with real employer demand. From tailoring to enterprise management, these practical sessions focus on high-demand vocations. By ensuring training is market-aligned, we facilitate direct income activation through job placements or structured micro-enterprise toolkits for every participant." },
                        { id: "5", title: "Spiritual Foundation", category: "Faith", description: "Building resilience on strong, enduring values.", image: "/assets/images/gallery_images/05. Spiritual Foundation.jpg", modal_title: "05. Spiritual Foundation", modal_text: "Resilience at Radiant Rise is built on a bedrock of seven core values: compassion, empowerment, integrity, inclusiveness, excellence, faith, and sustainability . We serve with empathy while maintaining transparency in every program. These principles ensure that interventions remain community-owned and capable of generating meaningful impact." },
                        { id: "6", title: "Leadership Focus", category: "Leadership", description: "Fostering community leaders to inspire systemic change.", image: "/assets/images/gallery_images/06. Leadership Focus.jpg", modal_title: "06. Leadership Focus", modal_text: "We engage religious, local council, and ethnic leaders to foster a community-driven environment for change. By advocating for social, economic, and gender equity, Radiant Rise influences local policies and raises awareness on issues affecting vulnerable groups. This collaboration ensures that systemic barriers are addressed through inclusive development." },
                        { id: "7", title: "Collaborative Growth", category: "Partnership", description: "Achieving more through united community efforts.", image: "/assets/images/gallery_images/07. Collaborative Growth.jpg", modal_title: "07. Collaborative Growth", modal_text: "We believe sustainable impact is achieved through collaboration with government, private sectors, and civil society. By building a community-owned model that engages 90% of local members, Radiant Rise ensures every intervention is responsive. United efforts strengthen trust and foster a collective commitment to uplifting vulnerable households." },
                        { id: "8", title: "Health & Wellness", category: "Care", description: "Holistic well-being approaches for lasting impacts.", image: "/assets/images/gallery_images/08. Health & Wellness.jpg", modal_title: "08. Health & Wellness", modal_text: "Radiant Rise adopts a holistic \"Theory of Change\" that integrates emotional stabilization, vocational training, and financial reinforcement. By addressing the interconnected needs of trauma recovery and income activation, we create a complete ecosystem for growth. This comprehensive approach ensures that impact is both deep and enduring." }
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
