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
<<<<<<< HEAD
                    image_url: "/assets/images/hero_images/hero_006.jpg",
=======
                    image_url: "/assets/images/thumbnails/thumbnail_story.jpg",
>>>>>>> 36bd810 (1.4.9 - Integrate Theory of Change section into CMS and Admin Dashboard)
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
<<<<<<< HEAD
                    metric_value: "105 Young Mothers"
=======
                    metric_value: "105 Young Mothers",
                    stats: [
                        {
                            id: "impact_1_top",
                            label: "Economic Empowerment",
                            value: "16",
                            modalTitle: "16 Job Placements",
                            description: "Radiant Rise Initiative has successfully secured 16 tailoring job placements for young mothers, marking a critical milestone in our income activation phase. By connecting practical vocational training directly to market-aligned employment opportunities, we ensure participants transition effectively from vulnerability to sustained economic stability. This targeted approach to localized job creation in Kampala actively reduces household poverty, decreases economic shocks, and fosters long-term self-reliance within the community."
                        },
                        {
                            id: "impact_1_bottom",
                            label: "Month Program Cycle",
                            value: "6",
                            modalTitle: "6-Month Cohort Pathway",
                            description: "Radiant Rise is formalizing a structured six-month cohort model serving Acholi Quarters to create lasting household stability. This deliberate timeframe allows participants to thoroughly engage in our core sequence: emotional recovery, market-aligned skills development, income activation, and savings retention. It provides the exact sustained support necessary to effectively break long-standing cycles of urban poverty and build measurable, long-term economic resilience for local families."
                        },
                        {
                            id: "impact_2_top",
                            label: "Year Strategic MOU",
                            value: "5",
                            modalTitle: "5-Year MOU Employer Pipeline",
                            description: "To guarantee a sustained employment pipeline for youth and young mothers, Radiant Rise has signed a five-year Memorandum of Understanding with Fine Spinners. This strategic employer partnership bridges the critical gap between initial skills acquisition and formal job placement. By securing long-term commitments from private sector employers, we are building a highly reliable foundation for household economic resilience and reducing irregular income cycles in Uganda."
                        },
                        {
                            id: "impact_2_bottom",
                            label: "Evidence-Based Intervention",
                            value: "2+1",
                            modalTitle: "2 Baseline Studies",
                            description: "Before implementing any core programs, a comprehensive community needs assessment and a detailed feasibility study were systematically conducted in Acholi Quarters. These crucial baseline studies ensured our trauma-informed support and vocational training interventions are culturally appropriate, economically viable, and practical. By actively listening to diverse stakeholders, we guarantee that our initiatives are directly responsive to the unique socio-economic challenges deeply affecting vulnerable youths and young mothers."
                        },
                        {
                            id: "impact_3_top",
                            label: "Local Trust & Buy-In",
                            value: "90%",
                            modalTitle: "90% Community Approval",
                            description: "Following our extensive grassroots mobilization efforts between November 2025 and February 2026, ninety percent of community members formally welcomed the initiative. This overwhelming support from Acholi Quarters, engaged young mothers and surrounding community through needs assessment and discussions, highlights a profound trust in our community-owned model. It firmly demonstrates that the Quarters is fully ready to collaboratively build coordinated economic pathways that replace fragmented support systems and strengthen every household."
                        },
                        {
                            id: "impact_3_bottom",
                            label: "Deep Community Focus",
                            value: "1",
                            modalTitle: "1 Target Settlement",
                            description: "We intentionally concentrate our programmatic efforts within one specific informal urban settlement: Acholi Quarters in Kampala, Uganda. Rather than pursuing rapid geographic expansion, Radiant Rise prioritizes depth, continuity, and measurable impact. Building a disciplined, repeatable resilience model within a single community allows us to profoundly understand and effectively address the intricate convergence of localized youth unemployment, early pregnancy, and the heavy burdens of survival work."
                        },
                        {
                            id: "impact_4_top",
                            label: "Holistic Methodology",
                            value: "4",
                            modalTitle: "4 Intervention Stages",
                            description: "Our household economic resilience model operates through a rigorous pathway featuring four sequential stages: stabilize, build, activate, and reinforce. The sequence matters immensely; if any single element is missing, individual progress collapses. By seamlessly integrating trauma-informed counseling, market-aligned skills training, formal job placement, and structured savings participation, we guarantee a comprehensive ecosystem that effectively moves participants from immediate crisis toward long-term independence."
                        },
                        {
                            id: "impact_4_bottom",
                            label: "Organizational Foundation",
                            value: "2025",
                            modalTitle: "Established in 2025",
                            description: "Radiant Rise Initiative was officially formed in July 2025 in direct response to the urgent need for coordinated economic support in informal urban settlements. Founded by Agnes Oyella, who experienced the harsh realities of Acholi Quarters firsthand, our registered indigenous NGO operates with a clear mandate. We aim to transform historically fragmented aid into sustained household economic resilience for Uganda's most vulnerable youth and young mothers."
                        }
                    ]
>>>>>>> 02634bd (1.6.0 - Modernize Impact And Identity Grid CMS)
                }
            },
            {
                key: 'who_we_are',
                content: {
                    title: "Who We Are",
                    description: "At the heart of the Radiant Rise Initiative are core values that guide every partnership and program we undertake. We serve with compassion and empathy, ensuring the dignity of the young mothers in our care is always respected.",
                    image_url: "/assets/images/purpose_images/purpose_01.jpg",
                    items: [
                        {
                            id: "stabilize",
                            number: "01",
                            title: "Stabilize",
                            description: "We begin with emotional recovery. Because trauma deeply affects confidence, decision-making, and job retention, we provide trauma-informed counseling and emotional support to create a firm foundation for personal and household stability.",
                            modalTitle: "Stabilize",
                            modalTagline: "Phase 01: Emotional Recovery",
                            modalText: "The journey to household economic resilience in Acholi Quarters begins with emotional recovery. Because unresolved trauma deeply affects a participant's confidence, daily decision-making, and long-term job retention, our first step is providing trauma-informed counseling. By offering safe, supportive spaces for vulnerable youth and young mothers, we ensure they stabilize emotionally before tackling economic challenges, creating a firm foundation for sustainable, intergenerational stability."
                        },
                        {
                            id: "build",
                            number: "02",
                            title: "Build",
                            description: "Once stabilized, participants focus on practical empowerment. We provide vocational and enterprise training, alongside financial literacy education, strictly aligned with local economic and employer demand to ensure our skills development is viable and relevant.",
                            modalTitle: "Build",
                            modalTagline: "Phase 02: Skills Acquisition",
                            modalText: "Once emotionally stabilized, participants focus on practical, market-driven empowerment. Radiant Rise provides targeted vocational skills and enterprise training that is strictly aligned with real employer demand and local economic realities. By coupling this vocational education with comprehensive financial literacy and life skills programs, we equip youths and young mothers with the precise tools needed to unlock their full potential and secure viable livelihood opportunities."
                        },
                        {
                            id: "activate",
                            number: "03",
                            title: "Activate",
                            description: "We actively bridge the gap between training and livelihood. Through strategic employer partnerships, direct job placement, and the provision of structured micro-enterprise toolkits, we activate immediate and sustained income streams for youth and young mothers.",
                            modalTitle: "Activate",
                            modalTagline: "Phase 03: Income Generation",
                            modalText: "Training alone is insufficient without direct pathways to livelihood. In the third phase, we actively bridge the gap between skill acquisition and sustained income generation. Through strategic employer partnerships, formal job placements, and the provision of structured micro-enterprise toolkits, we activate immediate revenue streams for our participants. This deliberate approach drastically reduces economic shocks and moves vulnerable households away from fragile survival work."
                        },
                        {
                            id: "reinforce",
                            number: "04",
                            title: "Reinforce",
                            description: "Stability requires continuity. To prevent the collapse of progress and reduce household economic shocks, we reinforce retention through continuous follow-up support, structured savings participation, and long-term problem-solving.",
                            modalTitle: "Reinforce",
                            modalTagline: "Phase 04: Sustained Resilience",
                            modalText: "True economic resilience requires continuity; if retention is ignored, progress inevitably collapses. The final stage of our six-month cohort model reinforces newly achieved stability through continuous follow-up support, proactive problem-solving, and structured savings participation. By fostering a strong savings culture and maintaining ongoing engagement, Radiant Rise ensures that young mothers and youth in Acholi Quarters maintain their economic gains and build stronger, self-reliant households over time."
                        }
                    ]
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
